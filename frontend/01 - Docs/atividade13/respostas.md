# Respostas — Atividade 13 — TravelBuddy

## 1. Por que uma relação muitos-para-muitos precisa de uma tabela de junção, e por que ela tem dois índices?

No TravelBuddy, uma coleção pode conter vários destinos, e um mesmo destino pode estar em várias coleções. Por isso, utilizamos a tabela de junção `collection_destinations`, que registra os relacionamentos entre as duas entidades.

O índice único composto por `collection_id` e `destination_id` impede que o mesmo destino seja adicionado duas vezes à mesma coleção e facilita a consulta dos destinos pertencentes a uma coleção. Já o índice simples em `destination_id` facilita localizar todas as coleções que contêm determinado destino, especialmente durante sua exclusão.

## 2. O que significa uma ação ser idempotente, e por que adicionar duas vezes responde 200 enquanto remover duas vezes responde 404?

Uma ação idempotente é aquela que, quando repetida, mantém o mesmo resultado final no sistema.

No TravelBuddy, adicionar um destino a uma coleção pela primeira vez retorna HTTP 201, indicando que o relacionamento foi criado. Se a operação for repetida, a API retorna HTTP 200, pois o destino já está na coleção e não deve ser duplicado nem incrementar novamente o contador.

Na remoção, a primeira chamada exclui o relacionamento. Uma segunda tentativa retorna HTTP 404 porque o destino já não pertence à coleção. Embora o estado final continue sendo o mesmo, a API informa que não encontrou o relacionamento solicitado.

## 3. Por que ON DELETE CASCADE não é suficiente para manter o contador correto?

O `ON DELETE CASCADE` remove automaticamente os registros da tabela de junção quando um destino é excluído, mas não atualiza o campo `destinationsCount` das coleções afetadas.

Esse contador é um dado derivado, pois representa a quantidade de relacionamentos existentes. Se o destino for excluído sem descontar o contador, a coleção poderá indicar uma quantidade de destinos maior do que realmente possui.

No TravelBuddy, a exclusão foi ajustada para identificar as coleções afetadas, diminuir seus contadores e remover os relacionamentos dentro da mesma transação. O teste de controle demonstrou o problema de inconsistência do contador antes da aplicação dessa correção.

## 4. Por que a ordem de validação é 400 → 404 → 403, e por que uma coleção privada pode retornar 403 ou 404?

A ordem de validação garante que a API trate os problemas corretamente. Primeiro, verifica se o identificador é válido, retornando HTTP 400 quando estiver incorreto. Depois, verifica se o registro existe, retornando HTTP 404 quando não for encontrado. Por último, verifica se o usuário tem permissão para realizar a operação, retornando HTTP 403 quando o acesso não é autorizado.

Uma coleção privada de outra pessoa pode retornar HTTP 403 para indicar que existe, mas o acesso é proibido. Outra abordagem seria retornar HTTP 404 para não revelar sua existência.

No TravelBuddy, utilizamos HTTP 403 para impedir o acesso de visitantes e de outros usuários às coleções privadas.

## 5. Por que pesquisar %% devolvia todos os registros, como o escape resolve isso e por que verificar typeof?

No SQL, o operador `LIKE` interpreta `%` como qualquer sequência de caracteres e `_` como um único caractere. Portanto, pesquisar `%%` sem tratamento poderia corresponder a praticamente todos os registros, mesmo sem um termo de pesquisa real.

No TravelBuddy, a função `escapeLike` trata os caracteres especiais antes de construir a consulta, permitindo pesquisar os símbolos literalmente em vez de utilizá-los como curingas.

Também verificamos `typeof req.query.q === 'string'`, pois os parâmetros recebidos pela URL podem ser arrays ou objetos, dependendo da forma como foram enviados. Isso evita executar operações de texto, como `trim()`, sobre valores incompatíveis.

## 6. O que muda entre os três casos de atualização otimista e por que apply devolve uma função de desfazer?

Os três casos do TravelBuddy são curtir um destino, seguir um usuário e adicionar ou remover um destino de uma coleção pelo modal.

Todos utilizam a mesma sequência: aplicar a mudança imediatamente na interface, enviar a requisição à API e confirmar o resultado. Se a requisição falhar, a interface retorna ao estado anterior.

O que muda são os dados envolvidos. O botão de curtir altera a curtida e seu contador; o botão de seguir altera o relacionamento e a quantidade de seguidores; e o modal altera a caixa de seleção e a quantidade de destinos da coleção.

A função `apply` devolve uma função `undo` porque ela conhece os valores anteriores à alteração. Assim, `runOptimistic` consegue desfazer qualquer uma dessas mudanças sem precisar conhecer os detalhes de cada componente.

## 7. Qual é a diferença entre debounce e lastCallId?

O debounce reduz a quantidade de requisições durante a digitação. No TravelBuddy, a busca espera 400 milissegundos após a última alteração do texto antes de enviar a pesquisa à API.

Já o `lastCallId`, utilizado pelo `useAsyncData`, evita que respostas antigas sobrescrevam resultados mais recentes. Isso é importante porque uma requisição anterior pode demorar mais do que outra iniciada depois.

Portanto, o debounce evita chamadas desnecessárias, enquanto o `lastCallId` protege a ordem correta de atualização dos resultados na tela. As duas soluções resolvem problemas diferentes e se complementam.

## 8. Por que remover um destino pelo detalhe da coleção é pessimista, enquanto marcar a caixa no modal é otimista?

No modal de coleções, marcar ou desmarcar uma caixa provoca uma alteração pequena e localizada. Por isso, o TravelBuddy atualiza a interface imediatamente e desfaz a mudança caso a API retorne um erro.

Já no detalhe da coleção, remover um destino faz seu cartão desaparecer da listagem. Se essa remoção fosse otimista e a requisição falhasse, o cartão precisaria reaparecer, provocando uma mudança brusca na organização da tela.

Por esse motivo, a remoção pelo detalhe é pessimista: o sistema aguarda a confirmação da API antes de retirar o cartão da interface.