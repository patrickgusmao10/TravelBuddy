# Atividade 14 — Respostas

## 1. Por que a notificação é criada dentro da mesma transação da curtida, comentário ou seguida?

A notificação deve ser criada dentro da mesma transação da ação que a originou para garantir a consistência dos dados. Assim, se uma curtida, comentário ou seguida falhar, a notificação também não será registrada. Caso a transação não seja repassada ao serviço de notificações, a operação pode tentar executar uma gravação independente enquanto a transação principal mantém registros bloqueados, causando um erro de tempo limite, como `Lock wait timeout exceeded`.

## 2. Quais são as regras para uma notificação verdadeira?

Uma notificação deve representar uma interação real de outro usuário. Por isso, o TravelBuddy não gera notificações quando alguém interage com o próprio destino ou segue a si mesmo. Ao descurtir um destino ou deixar de seguir alguém, a notificação correspondente é removida, pois a interação deixou de existir. Já os comentários permanecem registrados, uma vez que não foi implementada uma funcionalidade de desfazer comentários nesta atividade.

## 3. Por que existe uma rota unread-count separada da listagem e para que servem os índices?

A rota `unread-count` permite consultar apenas a quantidade de notificações não lidas, sem precisar carregar a lista completa a cada atualização do sino. O índice composto por `user_id` e `is_read` acelera a contagem das notificações não lidas de um usuário. Já o índice em `destination_id` facilita a localização das notificações relacionadas a um destino, especialmente durante operações de consulta e exclusão.

## 4. Por que uma denúncia repetida retorna 409 e como a duplicidade é impedida?

Uma denúncia repetida retorna HTTP 409 porque representa um conflito com um registro que já existe. Diferentemente de adicionar um destino a uma coleção, denunciar novamente o mesmo destino não deve ser tratado como uma operação bem-sucedida e repetível. O índice único formado por `user_id` e `destination_id` impede que o mesmo usuário registre duas denúncias para o mesmo destino, inclusive quando duas requisições são enviadas simultaneamente.

## 5. Quais são as duas validações do motivo da denúncia e por que existem chaves e rótulos?

O motivo da denúncia é validado em duas camadas: o validator da API verifica se o valor enviado pertence à lista de motivos permitidos, enquanto o ENUM do MySQL restringe os valores que podem ser armazenados no banco. Essa proteção evita registros inválidos mesmo quando alguém tenta contornar a interface. O banco armazena chaves padronizadas, como `inappropriate_content` e `spam`, enquanto a interface apresenta rótulos mais compreensíveis, como "Conteúdo impróprio" e "Spam ou golpes".

## 6. Qual é a diferença entre CASCADE, NO ACTION e SET NULL ao excluir um destino?

O comportamento `CASCADE` exclui automaticamente os registros dependentes quando o registro principal é removido. O `NO ACTION` impede a exclusão quando existem registros relacionados que violariam a chave estrangeira. Já o `SET NULL` mantém o registro dependente, mas remove sua referência ao destino excluído. Nos testes de controle do TravelBuddy, a tabela `reports` impediu a exclusão direta de um destino denunciado, enquanto a tabela `notifications` possui a configuração `ON DELETE SET NULL`, permitindo que a referência ao destino seja anulada.

## 7. Como o polling das notificações funciona corretamente?

O polling consulta periodicamente a quantidade de notificações não lidas, utilizando um intervalo de 30 segundos para manter o contador atualizado sem realizar requisições excessivas. Ele é iniciado quando o usuário entra na conta e interrompido ao sair. A condição `if (timerId !== null)` impede a criação de múltiplos intervalos simultâneos. Além disso, quando a aba do navegador está escondida, as consultas periódicas são ignoradas, sendo realizada uma atualização quando a aba volta a ficar visível.

## 8. O que é a condição de corrida do contador e por que lastRefreshId é atualizado?

A condição de corrida ocorre quando uma consulta antiga do polling demora para responder e acaba sobrescrevendo um contador que já foi atualizado por uma ação mais recente. Por exemplo, depois de marcar uma notificação como lida, uma resposta antiga poderia restaurar incorretamente a quantidade anterior. Para evitar isso, cada atualização recebe um identificador, e somente a resposta mais recente pode alterar o estado. A função `setUnreadCount` também incrementa `lastRefreshId` para invalidar respostas antigas que ainda estejam pendentes.

## 9. O que muda no quarto uso de runOptimistic e por que o rollback do contador é relativo?

Na Aula 14, `runOptimistic` é reutilizado para marcar notificações como lidas, sem alterar sua implementação original. A interface atualiza imediatamente o estado da notificação e diminui o contador do sino antes da confirmação da API. Se a requisição falhar, a função de desfazer restaura a notificação e incrementa o contador em uma unidade. Esse rollback é relativo porque outras notificações podem ter sido recebidas durante a operação; restaurar um número absoluto antigo poderia apagar atualizações legítimas.

## 10. Por que o erro 400 do logout aparecia como erro de CORS e qual é a importância da ordem dos middlewares?

O problema ocorria porque uma requisição de logout com dados inválidos podia gerar uma resposta HTTP 400 antes que os cabeçalhos de CORS fossem aplicados. Nesse caso, o navegador apresentava a falha como um problema de CORS, dificultando a identificação do erro verdadeiro. A ordem dos middlewares no Express é importante porque eles são executados sequencialmente. Ao registrar o middleware de CORS antes dos parsers e dos demais tratamentos, as respostas de erro também recebem os cabeçalhos necessários, permitindo que o navegador identifique corretamente o status retornado pela API.