# Atividade 09 — Respostas

**1. Qual a diferença entre 401, 403 e 404? Por que verificar se o item existe antes de verificar se pertence ao usuário?**

O erro 401 acontece quando o usuário não está autenticado, ou seja, não possui um token válido. O 403 acontece quando ele está autenticado, mas tenta editar ou excluir um destino que pertence a outra pessoa. Já o 404 significa que o destino solicitado não foi encontrado.

No TravelBuddy, primeiro verificamos se o destino existe e depois se pertence ao usuário, porque não faz sentido verificar a permissão de um registro que nem existe.

**2. Por que atualizar o banco antes de apagar o arquivo do disco? O que poderia acontecer na ordem inversa?**

Primeiro atualizamos ou excluímos o registro no banco de dados e depois removemos a imagem do disco. Isso evita que o destino continue cadastrado apontando para uma imagem que já foi apagada, caso aconteça algum erro durante a operação.

Se apagássemos a imagem primeiro e a atualização do banco falhasse, o destino poderia continuar existindo, mas com a imagem quebrada.

**3. O que é um arquivo órfão? Dê dois exemplos do seu projeto e explique onde acontece a limpeza.**

Um arquivo órfão é uma imagem que ficou salva no servidor, mas não está associada a nenhum registro válido no banco de dados.

No TravelBuddy, isso pode acontecer quando outro usuário tenta editar um destino que não é dele enviando uma imagem nova, ou quando alguém tenta atualizar um destino com o título vazio e uma nova imagem.

Nesses casos, o Multer pode salvar a imagem antes de a requisição ser rejeitada. A limpeza acontece no `errorHandler.js`, que remove o arquivo enviado quando ocorre um erro. Já na substituição ou exclusão normal de um destino, a remoção da imagem antiga acontece no `destinationService.js`.

**4. Por que o botão Excluir não pode ficar dentro de um `<a>`? Por que o modal não pode ficar dentro do card?**

O botão Excluir não deve ficar dentro de um link porque o clique poderia acabar abrindo a página de detalhes do destino em vez de apenas iniciar a exclusão.

Por isso, no TravelBuddy, as ações de editar e excluir ficam separadas da navegação do card.

O modal também fica fora do card para evitar problemas de posicionamento, sobreposição e eventos de clique, permitindo que a confirmação apareça corretamente no centro da tela.

**5. Por que esconder o botão Editar de quem não é dono não é segurança?**

Porque esconder o botão só impede que a pessoa veja a opção na interface, mas não impede que ela tente acessar a rota diretamente ou enviar uma requisição pela API.

No TravelBuddy, além de mostrar o botão Editar apenas para o proprietário, o backend verifica se o usuário autenticado realmente é o dono do destino. Se não for, a API retorna 403 e bloqueia a operação.

---

**Projeto:** TravelBuddy — Grupo B

Cada destino possui uma única imagem. Os requisitos específicos de vídeo, áudio, streaming e capa separada não se aplicam.