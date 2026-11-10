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

**Seria possível extrair `toggleRelation`?** Em tese, sim, recebendo model, condição `where` e contadores. As regras particulares (como proibir seguir a si mesmo) exigiriam tratamento adicional. A refatoração não é feita neste checkpoint, conforme o roteiro: registrar a repetição em vez de abstrair prematuramente.

### 2.4 Transações

- **Quantas chamadas de `sequelize.transaction()` existem em `modules/`?** Quatro: `likeService.toggleLike`, `followService.toggleFollow`, `commentService.addComment` e `destinationService.deleteDestination`.
- **As escritas dessas quatro operações participam das transações?** Sim; as chamadas de escrita pertinentes recebem `transaction: t`.
- **Há escrita dupla fora de transação?** Sim. `destinationService.createDestination` executa `Destination.create` e `User.increment('destinationsCount')` separadamente, em `modules/destination/destinationService.js`, aproximadamente linhas 11–23. **Achado nº 3:** corrigir na Parte A, Etapa 3.

### 2.5 Erros e validação

- **Quantas atribuições `error.status =` existem em `modules/`?** 15, nos arquivos: `commentService.js` (1), `commentValidator.js` (1), `destinationController.js` (1), `destinationService.js` (5), `destinationValidator.js` (1), `followController.js` (1), `followService.js` (2), `likeService.js` (1), `userService.js` (1), `userValidator.js` (1).
- **Os erros com `error.status` possuem status coerentes?** Sim: 400, 403 ou 404. Há ainda exceções sem status explícito, como credenciais incorretas e cadastro duplicado, já previstas no roteiro; `getUserProfile` também lança erro sem `status` caso não encontre o usuário, devendo ser registrado como ponto de atenção, sem refatoração fora do escopo nesta aula.
- **Os três testes de ID inválido respondem com o mesmo status?** Não. Execução confirmada no CMD em 10/11/2026:

| Requisição | Status obtido | Mensagem |
|---|---|---|
| `POST /api/destinations/abc/toggle-like` | 404 | Destino não encontrado. |
| `POST /api/users/abc/toggle-follow` | 400 | Identificador de usuário inválido. |
| `GET /api/destinations/abc` | 404 | Destino não encontrado. |

A inconsistência de contrato é registrada, não corrigida nesta aula, conforme o roteiro.

### 2.6 Constantes e valores soltos

- **Há constantes de validação sem uso?** Não. `USERNAME_MIN`, `USERNAME_MAX`, `PASSWORD_MIN` e `BIO_MAX` são usadas em `userValidator.js`; `DESCRIPTION_MAX` e `TITLE_MAX` em `destinationValidator.js`; `COMMENT_MAX` em `commentValidator.js`.
- **O tamanho de página está repetido?** Sim, quatro vezes: `userController.getFeed` (`|| 12`), `followController.getFollowingDestinations` (`|| 12`), `destinationService.getFeedDestinations` (`limit = 12`) e `destinationService.getFollowingDestinations` (`limit = 12`). **Achado nº 1.**
- **A paginação aceita parâmetros perigosos?** Sim, os controllers usam `parseInt(...) || 12`, que não rejeita números negativos nem impõe teto. **Achado nº 2.** O comportamento real do banco será registrado nos testes da Parte A, Etapa 2, antes da correção.

### Perguntas adicionais do enunciado

1. **Quantas vezes aparece o padrão de erro?** Há 15 atribuições `error.status =`, nos dez arquivos listados em 2.5. A contagem considera o padrão explícito de status, não todos os `throw new Error`.
2. **Outro número solto repetido?** O literal `10` aparece em mais de um arquivo: como base decimal em `parseInt(..., 10)` nos controllers de feed e como fator de custo em `bcrypt.genSalt(10)` em `userService.js`. Apesar de repetido, tem significados distintos; não deve ser unificado numa constante. Os códigos HTTP `400`, `404` e `201` também se repetem, mas representam status padronizados. Não foi identificada outra duplicação de limite de negócio equivalente ao tamanho de página.
3. **Os três curls de ID inválido retornam o mesmo status?** Não: 404, 400 e 404, conforme a tabela da seção 2.5.

## Reflexão — ADR-013 (Seção 13 do enunciado)

| O que é | Por que não foi resolvido hoje | Em qual aula será resolvido |
|---|---|---|
| Tratamento de remoção de arquivos com `fs.unlink` repetido em `userService.updateUserProfile` e `destinationService.updateDestination/deleteDestination` | A Aula 12 restringe alterações às correções e refatorações expressamente previstas; a extração exigiria testar caminhos e regras diferentes de fotos de perfil e destinos | **Pendente de decisão:** indicar a aula nomeada com base no planejamento do professor antes da entrega, ou resolver nesta aula |

> **Pendência de entrega:** o enunciado não aceita adiar a ADR-013 sem nomear uma aula. Não marcar o checklist da ADR-013 até definir a aula ou resolver a repetição.

## Estado do checkpoint

- Leitura dos Blocos 2.1–2.6: concluída.
- Testes de ID inválido do Bloco 2.5: concluídos.
- Correções de paginação e transação: **não iniciadas** (Partes A, Etapas 2 e 3).
- ADR-013: **pendente de definição da aula ou resolução**, conforme a Seção 13.