# Respostas — Aula 10

**Projeto:** TravelBuddy  
**Grupo:** B  
**Entidade principal:** Destination

## 1. Por que a regra "uma pessoa só curte uma vez" deve estar no banco e não só no código?

Porque a validação feita apenas no código não garante que duas requisições simultâneas não registrem curtidas duplicadas. No TravelBuddy, o índice UNIQUE composto pelas colunas `userId` e `destinationId` impede que o mesmo usuário curta o mesmo destino mais de uma vez, garantindo a integridade dos dados diretamente no banco.

## 2. Qual é a diferença entre contador guardado e contador calculado? Qual é o risco do primeiro e como a transação o elimina?

O contador guardado mantém a quantidade de curtidas ou comentários em campos como `likesCount` e `commentsCount`, enquanto o contador calculado realiza uma consulta para contar os registros existentes. O contador guardado evita consultas de contagem repetidas, mas pode ficar inconsistente se a curtida ou o comentário for alterado sem atualizar o contador. No TravelBuddy, as transações garantem que as duas operações sejam confirmadas juntas ou desfeitas em caso de erro.

## 3. O que acontece se um comando dentro de `sequelize.transaction` esquecer `{ transaction: t }`?

Se um comando não receber `{ transaction: t }`, ele poderá ser executado fora da transação principal. Assim, caso outra operação falhe, o rollback não necessariamente desfará esse comando, podendo deixar dados inconsistentes. Por isso, todas as operações que precisam ser executadas juntas devem utilizar a mesma transação.

## 4. O que é atualização otimista, quais são seus três passos e quando não usá-la?

Atualização otimista é quando a interface mostra uma alteração antes de receber a confirmação do servidor. Seus três passos são: atualizar imediatamente a interface, enviar a requisição à API e confirmar o resultado ou desfazer a alteração em caso de erro (rollback). No TravelBuddy, utilizamos esse comportamento no botão de curtida. Essa abordagem não é indicada para operações críticas ou difíceis de reverter, como pagamentos e exclusões definitivas.

## 5. Por que o texto de um comentário deve sair com `{{ }}` e nunca com `v-html`?

Porque `{{ }}` exibe o conteúdo como texto, enquanto `v-html` interpreta o conteúdo como HTML. Se um usuário inserir código malicioso em um comentário, o uso de `v-html` poderá permitir ataques de XSS. No TravelBuddy, os comentários são exibidos com `{{ }}`, evitando que tags HTML enviadas pelos usuários sejam executadas pelo navegador.

## 6. Por que `.trim()` precisa vir antes de `.notEmpty()`?

Porque `.trim()` remove os espaços em branco do início e do final de uma string antes da validação. Dessa forma, um campo preenchido apenas com espaços se torna uma string vazia, permitindo que `.notEmpty()` identifique corretamente a ausência de conteúdo. No TravelBuddy, isso evita o cadastro de comentários e outros campos obrigatórios preenchidos somente com espaços.