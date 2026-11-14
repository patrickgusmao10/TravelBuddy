# Checkpoint 02 — TravelBuddy — Aula 12

## Parte A — Etapa 1: leitura guiada da API

### 2.1 Camadas (Rota → Controller → Service → Model)

- **Há lógica de negócio ou consultas nas rotas?** Não. Os seis arquivos de rotas ligam métodos e caminhos a middlewares e controllers.
- **Há `findOne`, `findAll`, `findByPk` ou `create` nos Controllers?** Não.
- **Há acesso a `req` ou `res` nos Services?** Não.

### 2.2 Padrão de resposta e `asyncHandler`

- **Há `res.json()` ou `res.status()` escritos manualmente nos Controllers?** Não. As respostas passam por `success()`.
- **Por que `GET /search` não usa `asyncHandler`?** `searchController.search` é síncrono e não contém `await`.
- **Por que `POST /logout` não usa `asyncHandler`?** `userController.logout` é síncrono e não contém `await`.

### 2.3 Comparação dos toggles

| Pergunta | `likeService.toggleLike` | `followService.toggleFollow` |
|---|---|---|
| Valida o alvo antes de escrever (404)? | Sim | Sim |
| Regra adicional que gera 400? | Não | Sim: não seguir a si mesmo |
| Escritas na transação quando cria | 2: relação e contador | 3: relação e dois contadores |
| Todas as escritas têm `transaction: t`? | Sim | Sim |
| Recarrega o alvo depois da transação? | Sim | Sim |
| Retorna flag e contador? | `{ liked, likesCount }` | `{ isFollowing, followersCount }` |
| Conversão de ID no Controller | Não converte explicitamente | `parseUserId` |
| Status ao criar / desfazer | 201 / 200 | 201 / 200 |

**Seria possível extrair `toggleRelation`?** Em tese, sim, recebendo model, condição `where` e contadores. As regras particulares, como proibir seguir a si mesmo, exigiriam tratamento adicional. A refatoração não foi realizada neste checkpoint, conforme o roteiro: registrar a repetição em vez de abstrair prematuramente.

### 2.4 Transações

- **Quantas chamadas de `sequelize.transaction()` foram encontradas inicialmente em `modules/`?** Quatro: `likeService.toggleLike`, `followService.toggleFollow`, `commentService.addComment` e `destinationService.deleteDestination`.
- **As escritas dessas quatro operações participavam das transações?** Sim. As chamadas de escrita pertinentes recebiam `transaction: t`.
- **Havia escrita dupla fora de transação?** Sim. `destinationService.createDestination` executava `Destination.create` e `User.increment('destinationsCount')` separadamente, em `modules/destination/destinationService.js`, aproximadamente linhas 11–23.

**Achado nº 3:** ausência de transação no cadastro de destinos.

**Correção realizada na Aula 12:** o cadastro de destinos passou a utilizar uma transação para manter a criação do destino e a atualização do contador do usuário na mesma operação transacional. A alteração foi implementada e testada durante a Parte A, Etapa 3.

### 2.5 Erros e validação

- **Quantas atribuições `error.status =` foram encontradas em `modules/`?** 15, nos arquivos: `commentService.js` (1), `commentValidator.js` (1), `destinationController.js` (1), `destinationService.js` (5), `destinationValidator.js` (1), `followController.js` (1), `followService.js` (2), `likeService.js` (1), `userService.js` (1) e `userValidator.js` (1).
- **Os erros com `error.status` possuem status coerentes?** Sim: 400, 403 ou 404. Há ainda exceções sem status explícito, como credenciais incorretas e cadastro duplicado, já previstas no roteiro. `getUserProfile` também lança erro sem `status` caso não encontre o usuário, permanecendo registrado como ponto de atenção.
- **Os três testes de ID inválido respondem com o mesmo status?** Não. Execução confirmada no CMD em 10/11/2026:

| Requisição | Status obtido | Mensagem |
|---|---|---|
| `POST /api/destinations/abc/toggle-like` | 404 | Destino não encontrado. |
| `POST /api/users/abc/toggle-follow` | 400 | Identificador de usuário inválido. |
| `GET /api/destinations/abc` | 404 | Destino não encontrado. |

A inconsistência de contrato foi registrada, não corrigida nesta aula, conforme o roteiro.

Durante os testes de regressão do frontend, também foi observado que uma tentativa de login com senha incorreta apresentou a mensagem adequada dentro do formulário, mas a requisição retornou HTTP 500. O comportamento visual esperado foi confirmado; o status HTTP permanece como ponto de atenção para revisão futura.

### 2.6 Constantes e valores soltos

- **Havia constantes de validação sem uso?** Não. `USERNAME_MIN`, `USERNAME_MAX`, `PASSWORD_MIN` e `BIO_MAX` eram utilizadas em `userValidator.js`; `DESCRIPTION_MAX` e `TITLE_MAX` em `destinationValidator.js`; `COMMENT_MAX` em `commentValidator.js`.
- **O tamanho de página estava repetido?** Sim, quatro vezes: `userController.getFeed` (`|| 12`), `followController.getFollowingDestinations` (`|| 12`), `destinationService.getFeedDestinations` (`limit = 12`) e `destinationService.getFollowingDestinations` (`limit = 12`).
- **A paginação aceitava parâmetros perigosos?** Sim. Os controllers utilizavam `parseInt(...) || 12`, sem rejeitar adequadamente números negativos nem impor um limite máximo.

**Achado nº 1:** duplicação do tamanho padrão de página.

**Achado nº 2:** ausência de validação adequada dos parâmetros de paginação.

**Correções realizadas na Aula 12:** foi criado o grupo `PAGINATION` em `config/constants.js`, com `DEFAULT_PAGE: 1`, `DEFAULT_LIMIT: 12` e `MAX_LIMIT: 50`. A paginação dos feeds passou a utilizar os valores centralizados e o tratamento de parâmetros inválidos.

Os feeds Geral e de Seguindo foram testados após as alterações.

### Perguntas adicionais do enunciado

1. **Quantas vezes aparece o padrão de erro?** Foram identificadas 15 atribuições `error.status =`, nos dez arquivos listados na seção 2.5. A contagem considera o padrão explícito de status, não todos os `throw new Error`.

2. **Outro número solto repetido?** O literal `10` aparece em mais de um arquivo: como base decimal em `parseInt(..., 10)` nos controllers de feed e como fator de custo em `bcrypt.genSalt(10)` em `userService.js`. Apesar de repetido, tem significados distintos e não deve ser unificado numa constante. Os códigos HTTP `400`, `404` e `201` também se repetem, mas representam status padronizados. Não foi identificada outra duplicação de limite de negócio equivalente ao tamanho de página.

3. **Os três curls de ID inválido retornam o mesmo status?** Não: 404, 400 e 404, conforme a tabela da seção 2.5.

## Parte A — Etapas 2 e 3: correções realizadas

### Etapa 2 — Correção da paginação

A leitura guiada identificou que os feeds utilizavam valores padrão de paginação repetidos e não tratavam adequadamente parâmetros negativos ou excessivamente altos.

Foram realizadas as seguintes alterações:

- Criação do grupo `PAGINATION` em `config/constants.js`.
- Centralização dos valores padrão e do limite máximo.
- Adequação da paginação do Feed Geral.
- Adequação da paginação do Feed de Seguindo.
- Testes dos endpoints após a correção.

A correção foi concluída durante a Aula 12.

### Etapa 3 — Transação no cadastro de destinos

A leitura guiada identificou que a criação de um destino e a atualização do contador `destinationsCount` do usuário eram realizadas separadamente.

O método `destinationService.createDestination` foi ajustado para utilizar uma transação, garantindo que as duas operações de banco de dados sejam tratadas de forma atômica.

A alteração foi implementada e testada durante a Aula 12.

## Parte A — Etapa 4: testes de regressão

Após as correções, foram realizados testes de regressão das funcionalidades do backend, incluindo os endpoints relacionados a destinos, usuários, curtidas, comentários e seguidores.

Os testes foram considerados concluídos, sem identificação de regressões nas funcionalidades verificadas.

## Parte B — Refatoração do frontend

### Constantes e tratamento de erros

Foram centralizados os limites dos formulários em `src/config/constants.js`, incluindo:

- `USERNAME_MIN` e `USERNAME_MAX`.
- `PASSWORD_MIN`.
- `BIO_MAX`.
- `DESTINATION_TITLE_MAX`.
- `DESTINATION_DESCRIPTION_MAX`.
- `COMMENT_MAX`.

Também foram centralizadas mensagens de erro, duração dos toasts e o tamanho padrão de página.

Os formulários de cadastro, edição de perfil, upload e edição de destinos foram ajustados para utilizar as constantes correspondentes.

Foi realizada uma busca global no frontend para verificar referências incorretas a constantes `VIDEO_`, sem resultados após as correções.

### Composables

Foram criados e utilizados os seguintes composables:

- `useAsyncData.js`: centralização do carregamento assíncrono, tratamento de estados e prevenção de atualização por respostas antigas.
- `usePaginatedList.js`: centralização da paginação e do carregamento incremental de listagens.
- `useAuthenticatedAction.js`: centralização do comportamento de ações autenticadas, incluindo estado de carregamento e tratamento de falhas.

### Refatoração das telas e componentes

Foram refatorados e testados:

- `GeneralFeedView.vue`.
- `FollowingFeedView.vue`.
- `DestinationDetailView.vue`.
- `PublicProfileView.vue`.
- `FavoritesView.vue`.
- `MyDestinationsView.vue`.
- `FollowListView.vue`.
- `CommentSection.vue`.
- `LikeButton.vue`.
- `FollowButton.vue`.

As alterações buscaram reduzir a repetição de lógica de carregamento, paginação e tratamento de ações, preservando as funcionalidades existentes do TravelBuddy.

### Testes de regressão do frontend

Foram considerados concluídos os testes das funcionalidades de cadastro, login, perfil, destinos, feeds, curtidas, comentários, favoritos, seguidores e exclusão de destinos.

Também foram verificadas as situações de falha de rede e o comportamento das mensagens apresentadas ao usuário.

As seguintes evidências específicas da Aula 12 foram capturadas e validadas:

| Evidência | Comportamento verificado |
|---|---|
| `toast-erro.jpg` | Falha de curtida com rede Offline, toast vermelho e reversão do botão |
| `toast-sucesso.jpg` | Exclusão de destino com toast verde de sucesso |
| `toast-modal.jpg` | Falha de exclusão com rede Offline, mantendo o modal aberto |
| `uma-requisicao.jpg` | Uma única requisição `toggle-like` após três cliques rápidos com Slow 4G |
| `formulario-sem-toast.jpg` | Login com senha incorreta, erro dentro do formulário e ausência de toast |

## Reflexão — ADR-013 (Seção 13 do enunciado)

| O que é | Por que não foi resolvido hoje | Em qual aula será resolvido |
|---|---|---|
| Tratamento de remoção de arquivos com `fs.unlink` repetido em `userService.updateUserProfile` e `destinationService.updateDestination/deleteDestination` | A Aula 12 priorizou as correções de paginação, a transação no cadastro de destinos e a refatoração do frontend. A extração de uma função compartilhada exigiria validar os diferentes caminhos e regras de remoção de fotos de perfil e imagens de destinos. Essa alteração não era necessária para corrigir os problemas identificados nesta aula. | Aula 18 — checkpoint de consolidação técnica, no qual está planejada a revisão e centralização da lógica de remoção de arquivos. |

A decisão registrada é manter o comportamento atual durante a Aula 12 e planejar a extração de uma função compartilhada para a Aula 18, evitando uma refatoração adicional sem a validação específica dos diferentes cenários de remoção de arquivos.

## Estado do checkpoint

- Leitura dos Blocos 2.1–2.6: concluída.
- Perguntas adicionais do enunciado: respondidas.
- Testes de ID inválido: concluídos.
- Correção da paginação: concluída e testada.
- Transação no cadastro de destinos: implementada e testada.
- Testes de regressão do backend: concluídos.
- Refatoração do frontend: concluída.
- Composables e constantes: implementados e utilizados.
- Testes de regressão do frontend: considerados concluídos.
- Cinco evidências específicas de interface: capturadas e validadas.
- ADR-013: registrada, com revisão planejada para a Aula 18.
- Documentação final e organização dos arquivos de entrega: em andamento.