# Atividade 15 — Respostas

## 1. Qual é a diferença entre autenticação e autorização?

Autenticação é o processo de verificar a identidade do usuário, enquanto autorização determina quais recursos ele pode acessar. A API retorna 401 quando o usuário não está autenticado, como ao acessar o Dashboard administrativo sem token. Já o 403 ocorre quando o usuário está autenticado, mas não possui permissão. Na Aula 09, isso acontece quando alguém tenta realizar uma operação restrita ao dono de um recurso. Na Aula 15, ocorre quando um usuário comum tenta acessar uma rota administrativa.

## 2. Por que o isAuthenticated passou a consultar o banco de dados?

O middleware passou a consultar o banco para verificar as permissões e a situação atual do usuário, em vez de confiar apenas nas informações armazenadas no JWT. Sem essa consulta, um usuário bloqueado poderia continuar acessando recursos, um administrador rebaixado poderia manter privilégios e uma conta excluída poderia continuar utilizando um token válido. O custo é uma consulta adicional ao banco em cada requisição autenticada. Duas alternativas seriam utilizar tokens com validade curta ou implementar um mecanismo de revogação de tokens, como uma lista de bloqueio ou controle de versão.

## 3. Como um usuário se torna administrador e por que não existe uma rota para isso?

Na Aula 15, a promoção de um usuário para administrador é realizada pelo script `scripts/setAdmin.js`, que altera o campo `isAdmin` no banco de dados. Não existe uma rota pública para essa operação porque a concessão de privilégios administrativos precisa ser controlada. Disponibilizar essa funcionalidade indevidamente poderia permitir que usuários comuns elevassem suas próprias permissões e acessassem recursos restritos.

## 4. Por que a guarda administrativa é aplicada no router.use?

A guarda é aplicada com `router.use` para centralizar a proteção das rotas administrativas, evitando repetir o middleware `isAdmin` em cada endpoint. Isso facilita a manutenção e reduz o risco de alguma rota ficar desprotegida. O `isAdmin` precisa ser executado depois do `isAuthenticated` porque depende da identificação e das informações do usuário autenticado para verificar se ele possui privilégios administrativos.

## 5. Como a coluna status foi adicionada e por que a revisão é idempotente?

A coluna `status` foi adicionada à tabela de denúncias utilizando um valor padrão, permitindo que os registros existentes recebessem uma situação válida sem precisar ser recriados. A revisão é idempotente porque executar a mesma operação novamente não deve modificar uma denúncia já revisada, preservando inclusive o valor de `reviewedAt`. O `reload()` no `reviewReport` permite atualizar o objeto com os dados persistidos no banco, garantindo que a resposta utilize o estado atualizado do registro.

## 6. Por que o bloqueio é verificado no login e no isAuthenticated?

O bloqueio é verificado no login para impedir novas autenticações e no `isAuthenticated` para impedir que tokens emitidos anteriormente continuem permitindo acesso. O login retorna 403 porque a autenticação foi recusada em razão da situação da conta, enquanto as rotas protegidas retornam 401 porque a sessão não pode mais ser utilizada. A verificação no login ocorre depois da senha para evitar revelar a situação de contas a quem não conhece suas credenciais. O bloqueio não exclui a conta, seus dados ou seus relacionamentos, apenas impede o acesso enquanto estiver ativo.

## 7. Por que o escapeLike foi extraído e como funciona a contagem de denúncias?

O `escapeLike` foi extraído nesta aula porque as buscas administrativas precisam tratar caracteres especiais, como `%` e `_`, evitando que sejam interpretados como curingas nas consultas SQL. Centralizar essa lógica permite reutilizá-la em diferentes funcionalidades antes da Aula 18. Na listagem administrativa de destinos, a quantidade de denúncias pendentes é obtida por uma consulta de contagem associada a cada destino, sem depender de um `include` com agrupamento, evitando complicações na paginação e na estrutura dos resultados.

## 8. O que os dois testes de controle demonstraram?

O primeiro teste demonstrou que, ao desativar temporariamente a verificação de `isBlocked`, um usuário bloqueado conseguiu acessar uma rota protegida utilizando um token emitido antes do bloqueio, recebendo HTTP 200. Após restaurar a verificação, o mesmo token passou a receber HTTP 401.

O segundo teste demonstrou que, ao remover temporariamente a guarda `isAdmin`, um usuário comum autenticado conseguiu acessar o dashboard administrativo, recebendo HTTP 200. Após restaurar a guarda, a mesma requisição retornou HTTP 403.

Os testes evidenciaram a importância de consultar o estado atual do usuário no banco de dados e validar suas permissões em cada requisição.

## 9. O que a guarda de rota do frontend protege e o que não protege?

A guarda do frontend impede a navegação normal de usuários sem permissão para as telas administrativas, melhorando a experiência e evitando acessos indevidos pela interface. Entretanto, ela não substitui a autorização no backend, pois os dados do navegador podem ser manipulados. No experimento com o `localStorage`, foi possível falsificar o valor de `isAdmin` e abrir a interface administrativa, mas as requisições à API retornaram 403 Forbidden. Isso demonstrou que a proteção efetiva dos dados permanece no servidor.

## 10. Por que as ações administrativas esperam o servidor e qual é a limitação da paginação por offset?

As ações administrativas aguardam a confirmação do servidor para evitar que a interface apresente uma alteração que ainda não foi persistida ou que possa falhar. Isso é especialmente importante em operações como revisar denúncias, bloquear usuários e excluir destinos. Na paginação por offset, o chamado "pulo" acontece quando um registro é removido ou deixa de atender ao filtro antes de carregar a próxima página, deslocando as posições dos registros restantes. Com `PAGE_SIZE = 2`, foi possível observar que um item não apareceu na sequência da listagem porque seu deslocamento mudou após a atualização dos dados.