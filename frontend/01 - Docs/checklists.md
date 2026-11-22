# Checklist - Aula 01

## Parte A - Backend

- [x] Node.js e npm conferidos
- [x] Pasta travelbuddy-api criada
- [x] package.json criado com npm init -y
- [x] express instalado
- [x] cors instalado
- [x] dotenv instalado
- [x] morgan instalado
- [x] nodemon instalado
- [x] Scripts start e dev configurados
- [x] Pastas bin, config, middlewares, modules e routes criadas
- [x] .gitignore criado
- [x] apiResponse.js criado
- [x] routes/index.js criado
- [x] Campo data.status configurado como online
- [x] .env configurado com PORT e CORS_ORIGIN
- [x] app.js criado
- [x] bin/www criado
- [x] API iniciando sem erros
- [x] GET /api testado com sucesso

## Parte B - Frontend

- [x] API verificada antes da criação do frontend
- [x] Projeto Vue criado com Vite
- [x] vue-router instalado
- [x] axios instalado
- [x] pinia instalado
- [x] Estrutura de pastas criada
- [x] HelloWorld.vue removido
- [x] style.css limpo
- [x] .env configurado com VITE_API_URL
- [x] .gitignore configurado
- [x] Funcionalidades e telas mapeadas
- [x] Telas placeholder criadas
- [x] Vue Router configurado
- [x] Router registrado no main.js
- [x] Rotas testadas
- [x] Página 404 testada
- [x] Navbar criada
- [x] Sidebar criada
- [x] Footer criado
- [x] Layout configurado no App.vue
- [x] Landing Page consumindo a API
- [x] Status da API exibindo online
- [x] Erro de CORS reproduzido
- [x] Configuração de CORS corrigida

# Atualização - Aula 02

## Campo de busca

- Nome do campo da entidade principal (plural, camelCase): `destinations`

# Checklist - Aula 02

## Parte A - Backend

- [x] Pasta modules/search criada
- [x] searchService.js criado
- [x] searchController.js criado
- [x] searchRoutes.js criado
- [x] searchRoutes registrado no app.js
- [x] API reiniciada sem erros
- [x] GET /api/search?q=teste testado
- [x] GET /api/search sem termo testado
- [x] GET /api continua funcionando

## Parte B - Frontend

- [x] api.js criado com Axios e VITE_API_URL
- [x] Interceptor de resposta configurado
- [x] Comentário explicativo adicionado ao api.js
- [x] authService.js criado
- [x] searchService.js criado
- [x] systemService.js criado
- [x] LandingView usando getApiStatus()
- [x] Status da API exibindo online
- [x] Busca temporária testada com sucesso
- [x] Erro de rede testado com a API desligada
- [x] Mensagem amigável do interceptor validada
- [x] Teste temporário search('a') removido

# Ficha de Preparação - TravelBuddy

## Informações do Projeto

- **Nome do projeto:** TravelBuddy
- **Descrição:** Plataforma de dicas de viagem
- **Backend:** Node.js + Express
- **Frontend:** Vue.js
- **Banco de dados:** MySQL
- **ORM:** Sequelize

## Aula 03 - Persistência de Dados

| Dado | Valor |
|---|---|
| Nome do banco de dados MySQL do projeto | travelbuddy_db |
| Nome do campo de contagem de itens publicados | destinationsCount |

# Checklist - Aula 03

## Parte A - Backend

### Etapa 1 - Dependências

- [x] sequelize instalado
- [x] mysql2 instalado
- [x] bcryptjs instalado
- [x] express-validator instalado

### Etapa 2 - Banco de Dados MySQL

- [x] Banco de dados `travelbuddy_db` criado no MySQL
- [x] `.env` atualizado com DB_HOST
- [x] `.env` atualizado com DB_PORT
- [x] `.env` atualizado com DB_NAME
- [x] `.env` atualizado com DB_USER
- [x] `.env` atualizado com DB_PASSWORD
- [x] `config/database.js` criado

### Etapa 3 - Constantes

- [x] `config/constants.js` criado
- [x] USERNAME_MIN configurado como 3
- [x] USERNAME_MAX configurado como 20
- [x] PASSWORD_MIN configurado como 6

### Etapa 4 - Módulo User

- [x] Pasta `modules/user` criada
- [x] `userModel.js` criado
- [x] Campo de contagem configurado como `destinationsCount`
- [x] `userValidator.js` criado
- [x] `userService.js` criado
- [x] `getPublicProfile` configurado com `destinationsCount`
- [x] Senha armazenada utilizando hash com bcryptjs
- [x] Senha e hash não são retornados nas respostas da API

### Tratamento de Erros Assíncronos

- [x] `middlewares/asyncHandler.js` criado
- [x] `middlewares/errorHandler.js` criado

### Controller e Rotas

- [x] `userController.js` criado
- [x] `userRoutes.js` criado
- [x] Rota POST `/api/register` criada
- [x] Rota GET `/api/profile/:username` criada

### Etapa 5 - Integração no app.js

- [x] `userRoutes` importado e registrado no `app.js`
- [x] `errorHandler` importado e registrado no `app.js`
- [x] `errorHandler` configurado como último middleware
- [x] Sequelize configurado com `sync({ alter: true })`
- [x] Banco de dados sincronizado ao iniciar a API
- [x] Tabela `users` criada automaticamente no MySQL
- [x] Tabela `users` possui as colunas definidas no Model

### Etapa 6 - Testes da API

- [x] Cadastro válido testado
- [x] Cadastro válido retorna status 201
- [x] Resposta de cadastro contém id, username e email
- [x] Validação de senha curta testada
- [x] Senha curta retorna status 400
- [x] Cadastro duplicado testado
- [x] Cadastro duplicado retorna status 500 conforme o roteiro
- [x] GET `/api/profile/:username` testado
- [x] Perfil confirma os dados persistidos no banco

---

## Parte B - Frontend

### Etapa 1 - Contrato da API

- [x] Regra de username entre 3 e 20 caracteres conferida
- [x] Regra de e-mail válido conferida
- [x] Regra de senha com mínimo de 6 caracteres conferida
- [x] Regra de confirmação de senha conferida
- [x] Regra de nome completo obrigatório conferida

### Etapa 2 - Navbar

- [x] Link `Criar Conta` disponível na Navbar
- [x] Link permite acessar `/register`

### Etapa 3 - Formulário de Registro

- [x] `RegisterView.vue` criado/configurado
- [x] Campo Nome completo criado
- [x] Campo Usuário criado
- [x] Campo E-mail criado
- [x] Campo Senha criado
- [x] Campo Confirmar senha criado
- [x] Campos ligados ao formulário utilizando `v-model`
- [x] Objeto `errors` configurado
- [x] `apiErrorMessage` configurado
- [x] `isSubmitting` configurado

### Etapa 4 - Validação Client-Side

- [x] Função `validate()` implementada
- [x] Nome completo obrigatório validado
- [x] Username entre 3 e 20 caracteres validado
- [x] Formato do e-mail validado
- [x] Senha mínima de 6 caracteres validada
- [x] Confirmação de senha validada
- [x] Mensagens de erro exibidas abaixo dos campos
- [x] Validação do frontend replica as regras do backend
- [x] Envio vazio não realiza chamada para a API

### Etapa 5 - Integração com a API

- [x] `authService.register()` utilizado
- [x] `handleSubmit()` implementado
- [x] Dados do formulário enviados para POST `/api/register`
- [x] Estado de envio controlado por `isSubmitting`
- [x] Erros da API exibidos através de `apiErrorMessage`
- [x] Cadastro válido redireciona para `/login`
- [x] Cadastro duplicado exibe a mensagem retornada pela API

### Etapa 6 - Testes Práticos

- [x] Formulário vazio testado
- [x] Erros client-side exibidos sem chamada de rede
- [x] Senha curta testada no frontend
- [x] Mensagem de senha curta exibida instantaneamente
- [x] Cadastro válido realizado pela tela
- [x] Após cadastro válido ocorre navegação para `/login`
- [x] Cadastro duplicado testado pela tela
- [x] Network confirma status 500 para cadastro duplicado
- [x] GET `/api/profile/:username` confirma persistência do usuário

---

## Evidências da Aula 03

- [x] Print da tabela `users` no MySQL
- [x] Print do curl de cadastro com sucesso
- [x] Print do curl de erro de validação
- [x] Print do curl de cadastro duplicado
- [x] Print do curl de consulta de perfil
- [x] Print do formulário exibindo erros de validação
- [x] Print da aba Network mostrando cadastro duplicado com status 500

---

## Organização da Entrega

- [x] Evidências da Aula 03 salvas
- [x] Arquivos da Aula 03 organizados
- [x] Checklist da Aula 03 atualizado

---

## Status

**Aula 03 - Desenvolvimento, testes e organização dos arquivos concluídos.**

# Checklist - Aula 04

## Parte A - Backend

- [x] Biblioteca `jsonwebtoken` instalada
- [x] Variáveis `JWT_SECRET` e `JWT_EXPIRES_IN` configuradas no `.env`
- [x] Arquivo `config/jwt.js` criado
- [x] Middleware `isAuthenticated` criado
- [x] Login aceita e-mail ou nome de usuário
- [x] Login compara a senha utilizando bcrypt
- [x] `POST /api/login` gera e retorna JWT válido
- [x] `POST /api/login` retorna também os dados do usuário autenticado
- [x] `GET /api/profile/me` criado e protegido por autenticação
- [x] `POST /api/logout` criado
- [x] Login com credenciais válidas testado
- [x] Login com senha incorreta testado
- [x] Acesso ao perfil sem token testado
- [x] Acesso ao perfil com token válido testado
- [x] Acesso ao perfil com token inválido testado

## Parte B - Frontend

- [x] Pinia instalado
- [x] Pinia registrado antes do Router
- [x] Store de autenticação criada em `stores/auth.js`
- [x] Token e usuário persistidos no `localStorage`
- [x] Interceptor de requisição do Axios envia `Authorization: Bearer <token>`
- [x] Interceptor de resposta trata erro `401`
- [x] Sessão é limpa automaticamente ao receber `401`
- [x] Bootstrap 5 adicionado ao projeto
- [x] `assets/main.css` criado com a cor de marca do TravelBuddy
- [x] Tela de Login estilizada
- [x] Login integrado ao backend
- [x] Redirecionamento após login funcionando
- [x] Rotas protegidas configuradas com `meta.requiresAuth`
- [x] Navigation Guard configurado
- [x] Rota protegida redireciona usuário deslogado para Login com `?redirect=`
- [x] Após login, usuário retorna para a rota originalmente solicitada
- [x] Sessão permanece após atualizar a página
- [x] Navbar reage ao estado de autenticação
- [x] Logout pela Navbar funcionando
- [x] `userService.js` criado com `getMyProfile()`
- [x] Perfil autenticado consultado pela API
- [x] Console exibe `Perfil autenticado OK:`
- [x] Token inválido provoca logout automático e redirecionamento para Login

## Evidências da Aula 04

- [x] `curl-login-sucesso.jpg`
- [x] `curl-login-senha-incorreta.jpg`
- [x] `curl-profile-sem-token.jpg`
- [x] `curl-profile-token-valido.jpg`
- [x] `curl-profile-token-invalido.jpg`
- [x] `login-estilizado.jpg`
- [x] `redirect-rota-protegida.jpg`
- [x] `perfil-autenticado-console.jpg`
- [x] `logout-automatico-token-invalido.jpg`

## Documentação

- [x] `ficha-preparacao.md` atualizada com a cor de marca do projeto
- [x] Revisão final do backend realizada
- [x] Revisão final do frontend realizada
- [x] ZIP do backend gerado sem `node_modules`
- [x] ZIP do frontend gerado sem `node_modules`

# Checklist - Aula 05

## Parte A - Backend

- [x] Pasta `public/uploads/profiles` criada
- [x] Arquivo `default-profile.png` adicionado
- [x] Biblioteca `multer` instalada
- [x] `BIO_MAX` configurado como 255
- [x] `DESCRIPTION_MAX` configurado como 500
- [x] Middleware `profileMulter.js` criado
- [x] Upload limitado a arquivos de imagem
- [x] Limite de upload configurado para 4 MB
- [x] Pasta de uploads disponibilizada publicamente em `/uploads`
- [x] `profileUpdateValidator` criado
- [x] `updateUserProfile` implementado no service
- [x] Foto de perfil antiga removida quando substituída
- [x] `updateProfile` implementado no controller
- [x] Rota `PUT /api/profile/me` criada e protegida por autenticação
- [x] Atualização de perfil sem foto testada
- [x] Atualização de perfil com foto testada
- [x] Acesso público ao `default-profile.png` testado
- [x] Validação de bio com mais de 255 caracteres testada
- [x] Upload de arquivo que não é imagem testado

## Parte B - Frontend

- [x] `VITE_UPLOADS_URL` configurado no `.env`
- [x] `utils/media.js` criado
- [x] `getProfilePictureUrl()` implementado
- [x] `updateProfile()` adicionado ao `userService.js`
- [x] `api.js` mantido com configuração padrão para JSON
- [x] `Content-Type` sobrescrito somente na requisição de `FormData`
- [x] Link `Meu Perfil` adicionado à Navbar autenticada
- [x] Rota `/profile/me` configurada e protegida
- [x] `MyProfileView.vue` criado
- [x] Dados do usuário autenticado carregados no formulário
- [x] Edição de nome completo implementada
- [x] Edição de bio implementada
- [x] Contador de caracteres da bio implementado
- [x] Validação de 255 caracteres da bio implementada
- [x] Seleção de nova foto de perfil implementada
- [x] Preview local da imagem implementado com `FileReader`
- [x] Envio do formulário implementado utilizando `FormData`
- [x] Upload multipart testado com sucesso
- [x] Nova foto persistida após atualizar a página
- [x] Logout testado após as alterações

## Evidências da Aula 05

- [x] `curl-put-sem-foto.jpg`
- [x] `curl-put-com-foto.jpg`
- [x] `curl-default-profile.jpg`
- [x] `curl-bio-mais-255.jpg`
- [x] `curl-arquivo-nao-imagem.jpg`
- [x] `navbar-link-perfil.jpg`
- [x] `perfil-carregado.jpg`
- [x] `preview-local.jpg`
- [x] `upload-multipart.jpg`

## Status

**Aula 05 - Desenvolvimento e testes concluídos.**

# Checklist - Aula 06

## Parte A — Backend: Checkpoint de Consistência (Sem Código Novo)

- [x] Alguma rota (`*Routes.js`) contém lógica de negócio, em vez de só declarar verbo + caminho + middlewares + controller?
- [x] Algum Controller consulta o Model diretamente, sem passar pelo Service?
- [x] Algum Service faz referência a `req` / `res`?
- [x] Todo Controller usa `success()` / `error()` de `apiResponse.js`?
- [x] Toda rota que chama uma função async está envolvida em `asyncHandler`?
- [x] Toda validação de entrada usa `express-validator`, sem nenhum `if` manual escondido?
- [x] `config/constants.js` não tem nenhuma constante solta sem uso, nem nenhum valor de validação fora dela?
- [x] A constante de limite da bio (Aula 05) é usada exatamente uma vez, no lugar certo?

### Checklist desta etapa

- [x] `checkpoint-01.md` criado e respondido
- [x] Todos os endpoints já construídos continuam respondendo como esperado

## Parte B — Frontend: Componentização e Consistência Visual

- [x] `bootstrap-icons` incluído via CDN
- [x] Os três componentes-base (`BaseInput`, `BaseButton` e `FormCard`) criados em `src/components/base/`
- [x] As três telas refatoradas para usar `BaseInput` / `BaseButton` / `FormCard`
- [x] Tela de Registro agora visualmente consistente com Login/Perfil (usando a cor de marca do seu projeto, sem nenhuma cor nova introduzida)
- [x] `composables/useAuth.js` criado
- [x] Guarda de rota atualizado para usar `useAuth()`
- [x] Navbar atualizada para usar `useAuth()`
- [x] Nenhum link novo aponta para uma funcionalidade que seu projeto ainda não construiu

## Checklist de testes

- [x] Cadastro → confirme o redirecionamento ao Login, com a tela agora estilizada.
- [x] Login → confirme o redirecionamento à sua tela principal.
- [x] Navbar → confirme a troca correta entre estado logado/deslogado.
- [x] Edição de Perfil → confirme que os três comportamentos da Atividade 05 (dados reais, edição, upload de foto) continuam funcionando, agora passando pelos componentes-base.
- [x] Guarda de rota → deslogado, tente acessar a URL de uma tela protegida diretamente → confirme o redirecionamento ao Login.
- [x] Console do DevTools sem nenhum erro novo durante todo o teste.

# Checklist - Aula 07

## Parte A — Backend: Upload da Entidade Principal

- [x] Projeto identificado como Grupo B
- [x] Pasta `public/uploads/destinations` criada
- [x] Constante `TITLE_MAX` adicionada em `config/constants.js`
- [x] Model `Destination` criado para a entidade principal
- [x] Tabela `destinations` configurada
- [x] `config/associations.js` criado
- [x] Associação `User.hasMany(Destination)` configurada
- [x] Associação `Destination.belongsTo(User)` configurada
- [x] Associations carregadas antes do `sequelize.sync`
- [x] Campo `destinationsCount` utilizado no `User`
- [x] Middleware `destinationMulter.js` criado
- [x] Upload configurado para aceitar uma imagem com `multer.single`
- [x] Upload limitado a arquivos de imagem
- [x] Limite de upload configurado para 4 MB
- [x] Validator de destinos implementado com `express-validator`
- [x] Service de destinos implementado
- [x] Controller de destinos implementado
- [x] Rota `POST /api/destinations/upload` criada
- [x] Ordem dos middlewares configurada como autenticação → Multer → validação → controller
- [x] Rota de destinos registrada na API
- [x] Tabela `destinations` confirmada no banco com FK para `users`
- [x] Upload válido testado com sucesso
- [x] Arquivo enviado salvo em `public/uploads/destinations`
- [x] Registro do destino criado no banco de dados
- [x] `destinationsCount` incrementado após upload válido
- [x] Upload sem autenticação testado
- [x] Upload sem imagem testado
- [x] Upload sem título testado
- [x] Upload de arquivo que não é imagem testado

## Parte B — Frontend: Upload da Entidade Principal

- [x] Service de destinos criado
- [x] Service recebe `onUploadProgress` como parâmetro
- [x] CSS `.progress-bar` implementado
- [x] CSS `.thumbnail-preview` implementado
- [x] Tela de envio de destino criada
- [x] Rota `/destinos/upload` configurada
- [x] Rota de upload protegida por autenticação
- [x] Link `Enviar Destino` disponível na navegação para usuário autenticado
- [x] Campo de título implementado
- [x] Campo de descrição implementado
- [x] Contador de caracteres da descrição implementado
- [x] Seleção da imagem do destino implementada
- [x] Preview local da imagem implementado com `FileReader`
- [x] Formulário utiliza `FormData`
- [x] Upload integrado ao endpoint `POST /api/destinations/upload`
- [x] Barra de progresso do upload implementada
- [x] Mensagem de sucesso exibida após o envio
- [x] Upload multipart confirmado no DevTools
- [x] `Content-Type: multipart/form-data` com `boundary` confirmado no Network

## Evidências da Aula 07

- [x] `formulario-preenchido.jpg`
- [x] `progresso-upload.mp4`
- [x] `upload-multipart.jpg`
- [x] `link-envio.jpg`
- [x] Print do curl de upload válido
- [x] Print do curl de upload sem autenticação
- [x] Print do curl de upload sem imagem
- [x] Print do curl de upload sem título
- [x] Print do curl de upload de arquivo que não é imagem

## Documentação

- [x] `ficha-preparacao.md` atualizada para a Aula 07
- [x] `checklists.md` atualizado para a Aula 07

## Checklist de alcançabilidade

- [x] A tela de upload é alcançável após a autenticação pelo link `Enviar Destino` disponível na navegação. Ao clicar no link, o Vue Router direciona o usuário para `/destinos/upload` sem recarregar a página. A rota utiliza `meta.requiresAuth`, portanto um usuário não autenticado que tente acessá-la diretamente é redirecionado para a tela de login.

# Checklist - Aula 08

## Parte A — Backend: Detalhe e Feed Paginado

- [x] Projeto identificado como Grupo B
- [x] `middlewares/optionalAuth.js` criado
- [x] `getDestinationDetails` adicionado ao service
- [x] `getFeedDestinations` adicionado ao service
- [x] Detalhe do destino implementado no controller
- [x] Rota `GET /api/destinations/:id` criada com `optionalAuth`
- [x] Dados do autor incluídos no detalhe sem expor a senha
- [x] Campo `views` utilizado para contagem de visualizações
- [x] Visualizações incrementadas ao acessar o detalhe
- [x] `isOwner` retornado pela API
- [x] `getFeed` adicionado ao `userController.js`
- [x] Rota `GET /api/feed` criada e protegida por autenticação
- [x] Feed paginado utilizando `page` e `limit`
- [x] Detalhe sem token testado com sucesso
- [x] Detalhe com token do dono testado com sucesso
- [x] Detalhe de destino inexistente retorna 404
- [x] Feed sem token retorna 401
- [x] Feed com `page=1&limit=1` testado
- [x] Feed com `page=2&limit=1` testado

> Itens de streaming, Range e status 206 não se aplicam ao TravelBuddy por ser um projeto do Grupo B.

## Parte B — Frontend: Feed e Detalhe com Dados Reais

- [x] `getDestinationImageUrl()` adicionado em `utils/media.js`
- [x] Classes de card adicionadas e adaptadas para imagens
- [x] `getDestinationById()` criado no `userService.js`
- [x] `getFeed()` criado no `userService.js`
- [x] Componente reutilizável `DestinationCard.vue` criado
- [x] Feed Geral exibindo destinos reais
- [x] Feed exibido em grade
- [x] Paginação com botão `Carregar mais` funcionando
- [x] Tela de Detalhe exibindo dados reais do destino
- [x] Imagem do destino exibida em resolução real no detalhe
- [x] `isOwner` recebido da API e armazenado no estado da tela
- [x] Navegação do card para o detalhe funcionando sem recarregar a página
- [x] Recarregamento da tela de detalhe incrementa `views`
- [x] Destino inexistente exibe mensagem de erro sem quebrar a tela

## Evidências da Aula 08

- [x] `feed-real.jpg`
- [x] `detalhe-real.jpg`
- [x] Print do curl do detalhe sem token
- [x] Print do curl do detalhe com token do dono
- [x] Print do curl do detalhe de destino inexistente
- [x] Print do curl do feed sem token
- [x] Print do curl do feed `page=1&limit=1`
- [x] Print do curl do feed `page=2&limit=1`

> `range-206.jpg` não se aplica ao TravelBuddy por ser um projeto do Grupo B.

## Documentação

- [x] Evidências da Aula 08 salvas em `01 - Docs/atividade08`
- [x] `checklists.md` atualizado para a Aula 08


# Checklist - Aula 09

## Parte A — Backend: CRUD de Destinos, Perfil Público e Limpeza de Arquivos Órfãos

### Checklist das tarefas

- [x] `reload()` adicionado ao detalhe do destino
- [x] Duas chamadas consecutivas ao detalhe retornam contagens de visualizações atualizadas
- [x] Verificação de erro 404 antes do erro 403 nas funções de autorização
- [x] Ordem banco de dados → disco respeitada na edição e exclusão
- [x] Contador `destinationsCount` decrementado na exclusão
- [x] Quatro handlers implementados no controller: listar meus destinos, buscar para edição, atualizar e excluir
- [x] Quatro rotas implementadas, com Multer antes do validador no PUT
- [x] `getPublicProfile` com `include` e `order` no nível superior
- [x] `isOwner` retornado no perfil público
- [x] Rota `/profile/:username` com `optionalAuth`, após `/profile/me`
- [x] `errorHandler.js` com limpeza de arquivos órfãos e registrado como último middleware

### Checklist dos testes

- [x] GET Meus Destinos: sem token retorna 401; usuário A recebe lista ordenada; usuário B recebe lista vazia
- [x] GET destino para edição: sem token 401; outro usuário 403; destino inexistente 404; proprietário 200 sem alterar visualizações
- [x] PUT somente texto: retorna 200, mantém imagem e quantidade de arquivos
- [x] PUT com nova imagem: retorna 200, substitui o arquivo e mantém a contagem de arquivos
- [x] Limpeza de arquivos órfãos: PUT não autorizado retorna 403 sem aumentar a quantidade de arquivos
- [x] Limpeza de arquivos órfãos: PUT com título vazio retorna 400 sem aumentar a quantidade de arquivos
- [x] DELETE do proprietário retorna 200 e remove a imagem do disco
- [x] DELETE: outro usuário recebe 403; após exclusão retorna 404; contador decrementado
- [x] Perfil público: proprietário, outro usuário, visitante e usuário inexistente validados

## Parte B — Frontend: Perfil Público, Meus Destinos e Edição

### Checklist das tarefas

- [x] `composables/useClickOutside.js` criado
- [x] `components/base/BaseModal.vue` criado
- [x] Funções `getMyDestinations()`, `getDestinationForEdit()`, `updateDestination()` e `deleteDestination()` implementadas
- [x] `getPublicProfile()` implementada
- [x] `DestinationCard.vue` refatorado com autor clicável, opcional e slot de ações
- [x] Feed Geral da Aula 08 continua funcionando
- [x] Menu suspenso do avatar implementado na Navbar
- [x] Perfil Público com comportamento para proprietário, usuário autenticado e visitante
- [x] Tela Meus Destinos com modal de confirmação e remoção local
- [x] Tela Editar Destino com atualização de texto e troca opcional da imagem
- [x] Autor clicável e botão Editar condicional na tela de detalhe
- [x] Link Ver em Meus Destinos adicionado à mensagem de sucesso do upload

### Checklist dos testes

- [x] Menu do avatar abre e fecha ao clicar fora, pressionar Esc ou selecionar um item
- [x] Perfil próprio exibe botão Editar Perfil e destinos publicados
- [x] Perfil de outro usuário exibe botão Seguir e permite navegar pelo autor
- [x] Perfil público funciona em janela anônima, sem botões de edição ou seguir
- [x] Usuário inexistente exibe a mensagem Usuário não encontrado
- [x] Meus Destinos exibe os cards com Editar e Excluir
- [x] Conta sem destinos exibe estado vazio e link para upload
- [x] Modal de exclusão abre corretamente e fecha por Cancelar, X, clique fora e Esc
- [x] Exclusão remove o destino da listagem sem recarregar a página
- [x] Requisição DELETE retorna status 200
- [x] Formulário de edição carrega título, descrição e imagem atual
- [x] Atualização somente de texto mantém a imagem original
- [x] Atualização com nova imagem funciona corretamente
- [x] Título obrigatório validado no formulário
- [x] Requisição PUT utiliza `multipart/form-data` com `boundary`
- [x] Edição de destino pertencente a outro usuário retorna 403
- [x] Edição de destino inexistente retorna 404
- [x] Rota protegida redireciona ao login e retorna após autenticação
- [x] Botão Editar Destino aparece no detalhe do proprietário
- [x] Upload apresenta o link Ver em Meus Destinos
- [x] Feed, detalhe, upload, perfil, login e logout continuam funcionando
- [x] Console do navegador sem erros vermelhos durante os testes
- [x] Ausência de nova requisição quando o título é inválido
- [x] Remoção física da imagem antiga e atualização do contador após exclusão

## Evidências da Aula 09

### Prints de interface exigidos pelo enunciado

- [x] `atividade09/menu-avatar.jpg`
- [x] `atividade09/perfil-publico.jpg`
- [x] `atividade09/modal-exclusao.jpg`
- [x] `atividade09/editar.jpg`

### Evidências do backend

- [x] Prints do Teste 04 — substituição de imagem, contagem de arquivos 4 → 4
- [x] Prints do Teste 05 — exclusão de destino, contagem de arquivos 4 → 3
- [x] Prints do Teste 06 — tentativa de edição não autorizada, erro 403, contagem 3 → 3
- [x] Prints dos demais cURLs exigidos na Parte A, Etapa 6
- [x] Prints das contagens de arquivos antes e depois dos testes 4, 5 e 6
- [x] Prints organizados em `01 - Docs/atividade09`

## Documentação e Entrega

- [x] `checklists.md` atualizado com a Aula 09
- [x] Cinco respostas conceituais redigidas conforme o enunciado
- [x] `respostas.md` criado em `01 - Docs/atividade09`
- [x] Evidências organizadas em `01 - Docs/atividade09`
- [x] ZIP do backend gerado sem `node_modules`
- [x] ZIP do frontend gerado sem `node_modules`

> Projeto TravelBuddy — Grupo B: cada destino possui uma única imagem. Os requisitos específicos de vídeo, áudio, streaming e capa separada não se aplicam.

# Checklist - Aula 10

## Parte A — Backend: Curtidas e Comentários

### Checklist das tarefas

- [x] Projeto identificado como Grupo B — TravelBuddy
- [x] Models `Like` e `Comment` criados
- [x] Associações entre `User`, `Destination`, `Like` e `Comment` configuradas nos dois sentidos
- [x] Campos `likesCount` e `commentsCount` implementados
- [x] Constante `COMMENT_MAX` configurada
- [x] Índice UNIQUE composto por `userId` e `destinationId` configurado
- [x] Tabelas e colunas conferidas no banco de dados
- [x] `likeService.js` e `likeController.js` implementados
- [x] Módulo de curtidas com três rotas configuradas e registradas
- [x] Operações de curtida protegidas por autenticação
- [x] `toggleLike()` implementado com transação
- [x] Incremento e decremento de `likesCount` implementados
- [x] Consulta do estado de curtida implementada
- [x] Listagem de destinos curtidos implementada
- [x] `commentService.js` e `commentController.js` implementados
- [x] Módulo de comentários com duas rotas configuradas e registradas
- [x] Criação e listagem de comentários implementadas
- [x] Validação de comentários com limite de caracteres e tratamento de espaços
- [x] Atualização transacional de `commentsCount` implementada
- [x] Comentário criado retornado com os dados do autor
- [x] Estado `isLiked` e contadores integrados ao detalhe do destino
- [x] Exclusão de destino com limpeza transacional de curtidas e comentários relacionados
- [x] Contadores integrados ao perfil público
- [x] Correção de `.trim()` nos validadores dos campos obrigatórios

### Checklist dos testes

- [x] Curtir destino testado com sucesso
- [x] Descurtir destino testado com sucesso
- [x] Contador de curtidas validado
- [x] Curtida sem autenticação e destino inexistente testados
- [x] Consulta do estado de curtida validada
- [x] Estado `isLiked` validado no detalhe do destino
- [x] Restrição UNIQUE validada diretamente no MySQL
- [x] Listagem de destinos curtidos testada
- [x] Criação de comentário testada
- [x] Validação de comentários inválidos testada
- [x] Listagem pública de comentários testada
- [x] Ordenação dos comentários validada
- [x] Contador de comentários validado
- [x] Exclusão de destino com registros relacionados validada
- [x] Testes `curl` do backend executados
- [x] Evidências dos testes `curl` salvas
- [x] Validação de campos obrigatórios com espaços realizada
- [x] Testes de regressão das funcionalidades anteriores realizados

## Parte B — Frontend: Interações de Curtidas e Comentários

### Checklist das tarefas

- [x] `services/likeService.js` criado
- [x] `services/commentService.js` criado
- [x] `utils/format.js` implementado
- [x] CSS necessário para exibição dos comentários configurado
- [x] Componente `LikeButton.vue` implementado
- [x] Atualização otimista de curtidas implementada
- [x] Rollback da curtida em caso de falha implementado
- [x] Bloqueio de cliques simultâneos durante a requisição implementado
- [x] Tratamento de erro de conexão implementado
- [x] Redirecionamento de visitante para login com retorno ao destino implementado
- [x] Componente `CommentSection.vue` implementado
- [x] Estados de carregamento, erro e lista vazia implementados
- [x] Formulário de comentários integrado à API
- [x] Validação de comentários no formulário implementada
- [x] Listagem de comentários integrada à API
- [x] Novo comentário inserido no topo sem recarregar a lista
- [x] Comentários renderizados com interpolação Vue, sem `v-html`
- [x] Quebras de linha preservadas com `white-space: pre-wrap`
- [x] Contador de comentários integrado
- [x] `DestinationDetailView.vue` atualizado com curtidas e comentários
- [x] `DestinationCard.vue` atualizado com contadores
- [x] Contadores exibidos no Feed Geral
- [x] Contadores exibidos em Meus Destinos
- [x] Contadores integrados aos cards do perfil
- [x] `FavoritesView.vue` integrada à API de destinos curtidos
- [x] Rota `/favoritos` reutilizada e protegida por autenticação
- [x] Tela de Favoritos acessível pelo menu lateral
- [x] Estrutura de resposta da API ajustada ao interceptor Axios existente

# Checklist - Aula 11

## Parte A — Backend: Seguidores e Feed de Seguindo

### Checklist das tarefas

- [x] Model `Follow` criado com `followerId` e `followingId`
- [x] Associações de seguidores e seguindo configuradas com aliases distintos
- [x] Índice UNIQUE composto configurado para impedir seguir o mesmo usuário duas vezes
- [x] Índice para consultas por usuário seguido configurado
- [x] Validação de identificador de usuário implementada
- [x] Regra que impede seguir a si mesmo implementada
- [x] `followService.js` e `followController.js` implementados
- [x] Rota para seguir/deixar de seguir implementada
- [x] Rota para consultar o estado de acompanhamento implementada
- [x] Rotas para listar seguidores e seguindo implementadas
- [x] Rota autenticada do Feed de Seguindo implementada
- [x] Feed de Seguindo paginado com `page` e `limit`
- [x] Contadores de seguidores e seguindo integrados ao perfil público

### Checklist dos testes

- [x] Seguir usuário testado
- [x] Deixar de seguir usuário testado
- [x] Contadores atualizados após seguir e deixar de seguir
- [x] Listagem de seguidores testada
- [x] Listagem de usuários seguidos testada
- [x] Feed de Seguindo testado com publicações de usuário seguido
- [x] Feed de Seguindo vazio testado
- [x] Paginação do Feed de Seguindo testada com `page=1&limit=1` e `page=2&limit=1`
- [x] Restrição UNIQUE da tabela `follows` verificada no MySQL
- [x] Testes de regressão das funcionalidades anteriores realizados

## Parte B — Frontend: Seguir Usuários e Feed de Seguindo

### ADR-012 — Checagem de Alcançabilidade

**Seguir / deixar de seguir:** O usuário acessa o perfil público de outra pessoa e utiliza o botão "Seguir" ou "Seguindo". Caso não esteja autenticado, é redirecionado para a tela de login e retorna ao perfil após entrar.

**Listas de Seguidores / Seguindo:** Os contadores "Seguidores" e "Seguindo" no perfil público são links que permitem acessar as respectivas listas. O usuário pode alternar entre elas pelas abas, retornar ao perfil ou acessar o perfil de outra pessoa selecionando seu nome.

**Feed de Seguindo:** O usuário acessa o feed de destinos publicados pelas pessoas que segue por meio do item "Feed de Seguindo" da Sidebar, que direciona para a rota `/feed/seguindo`. A página exige autenticação.

### Checklist das tarefas

- [x] `followService.js` criado
- [x] Componente `FollowButton.vue` implementado
- [x] Atualização otimista do botão e contador implementada
- [x] Rollback em caso de falha implementado
- [x] Redirecionamento de visitante para login implementado
- [x] Botão de seguir ocultado no próprio perfil
- [x] Perfil público atualizado com contadores de seguidores e seguindo
- [x] Navegação para listas de seguidores e seguindo implementada
- [x] Tela de listagem de seguidores e seguindo implementada
- [x] Tela `FollowingFeedView.vue` implementada
- [x] Feed de Seguindo com paginação e botão `Carregar mais`
- [x] Estado vazio do Feed de Seguindo com link para o Feed Geral
- [x] Navegação para o Feed de Seguindo adicionada à Sidebar

### Checklist dos testes

- [x] Visitante não autenticado redirecionado para login ao tentar seguir
- [x] Atualização otimista validada com throttling na aba Network
- [x] Rollback validado com modo Offline
- [x] Contador atualizado ao deixar de seguir
- [x] Perfil próprio sem botão para seguir a si mesmo
- [x] Navegação entre perfis validada
- [x] Listas de seguidores e seguindo validadas
- [x] Feed de Seguindo com e sem publicações validado
- [x] Feed Geral, destinos, curtidas, comentários e favoritos continuam funcionando
- [x] Upload, edição e exclusão de destinos continuam funcionando
- [x] Console do navegador sem erros vermelhos durante os testes

## Evidências da Aula 11

- [x] `atividade11/seguindo.jpg` — perfil com botão Seguindo e contador atualizado
- [x] `atividade11/otimista.jpg` — atualização otimista com throttling no Network
- [x] `atividade11/rollback.jpg` — mensagem de erro após teste Offline
- [x] `atividade11/seguidores.jpg` — lista de seguidores com abas
- [x] `atividade11/feed-seguindo.jpg` — feed filtrado
- [x] `atividade11/follows.jpg` — tabela `follows`, índices e erro de duplicidade
- [x] Prints `.jpg` dos testes `curl` da Parte A, Etapa 4

## Documentação e Entrega

- [x] `atividade11/respostas.md` criado com seis respostas da Seção 1
- [x] `checklists.md` atualizado com a Aula 11
- [x] Evidências organizadas em `01 - Docs/atividade11`
- [x] ZIP do backend preparado sem `node_modules`
- [x] ZIP do frontend preparado sem `node_modules`

# Checklist - Aula 12

## Parte A - Backend

### Etapa 1 - Leitura Guiada

- [x] Leitura crítica dos módulos da API realizada
- [x] Arquivo `checkpoint-02.md` criado
- [x] Questões dos Blocos 2.1 a 2.6 analisadas
- [x] Três perguntas adicionais do enunciado respondidas
- [x] Testes de IDs inválidos realizados nas rotas equivalentes

### Etapa 2 - Correção da Paginação

- [x] Problema de paginação reproduzido antes da correção
- [x] Constantes `PAGINATION` configuradas em `config/constants.js`
- [x] Arquivo `utils/pagination.js` criado
- [x] Função `parsePagination()` implementada
- [x] Paginação aplicada ao Feed Geral
- [x] Paginação aplicada ao Feed de Seguindo
- [x] Valores fixos de paginação substituídos por constantes
- [x] Testes de paginação realizados com sucesso
- [x] Prints de paginação antes e depois registrados

### Etapa 3 - Transação de Banco de Dados

- [x] Transação Sequelize implementada no cadastro de destinos
- [x] Criação do destino e atualização de `destinationsCount` realizadas na mesma transação
- [x] Criação de destino testada com sucesso
- [x] Contador de destinos atualizado corretamente

### Etapa 4 - Regressão da API

- [x] Perfil público e `isFollowing` validados
- [x] Feed Geral validado
- [x] Feed de Seguindo validado
- [x] Seguir e deixar de seguir validados
- [x] Listagem de seguidores validada
- [x] Listagem de usuários seguindo validada
- [x] Curtidas validadas
- [x] Comentários validados
- [x] Listagem de Meus Destinos validada
- [x] Testes de regressão da API concluídos

---

## Parte B - Frontend

### Etapa 1 - Constantes

- [x] Arquivo `src/config/constants.js` criado
- [x] Chaves de armazenamento centralizadas
- [x] Limites de validação centralizados em `LIMITS`
- [x] Constante `PAGE_SIZE` configurada
- [x] Durações dos toasts centralizadas
- [x] Mensagens de erro padronizadas
- [x] `api.js` e `stores/auth.js` atualizados
- [x] Services dos feeds utilizando constantes

### Etapa 2 - Toasts e Interceptor

- [x] Composable `useToast.js` criado
- [x] Componente `ToastContainer.vue` criado
- [x] `ToastContainer` integrado ao `App.vue`
- [x] Interceptor Axios atualizado
- [x] Tratamento de erros de ações centralizado
- [x] Opção `silent: true` aplicada aos formulários
- [x] Erros de leitura mantidos nas respectivas telas
- [x] Redirecionamento em caso de erro 401 mantido
- [x] Toasts de sucesso e erro implementados
- [x] Tratamento de erros sem mensagens duplicadas

### Etapa 3 - Composables e Refatoração

- [x] Composable `useAsyncData.js` criado
- [x] Proteção contra respostas antigas implementada com `lastCallId`
- [x] Composable `usePaginatedList.js` criado
- [x] `GeneralFeedView.vue` refatorado
- [x] `FollowingFeedView.vue` refatorado
- [x] `DestinationDetailView.vue` refatorado
- [x] `PublicProfileView.vue` refatorado
- [x] `FavoritesView.vue` refatorado
- [x] `MyDestinationsView.vue` refatorado
- [x] `FollowListView.vue` refatorado
- [x] `CommentSection.vue` refatorado
- [x] Estados de carregamento e erro padronizados
- [x] Paginação dos feeds preservada
- [x] Telas refatoradas testadas individualmente
- [x] `MyProfileView.vue` e `EditDestinationView.vue` mantidos com carregamento próprio por preencherem formulários
- [x] Decisão de não extrair o carregamento dos formulários registrada

### Etapa 4 - useAuthenticatedAction

- [x] Composable `useAuthenticatedAction.js` criado
- [x] `LikeButton.vue` refatorado
- [x] `FollowButton.vue` refatorado
- [x] Controle de requisições simultâneas centralizado
- [x] Atualização otimista preservada nos componentes
- [x] Tratamento de erros integrado aos toasts
- [x] Teste de três cliques rápidos realizado com Slow 4G
- [x] Apenas uma requisição enviada durante o teste

### Etapa 5 - Constantes nos Formulários

- [x] `RegisterView.vue` atualizado
- [x] `MyProfileView.vue` atualizado
- [x] `UploadView.vue` atualizado
- [x] `EditDestinationView.vue` atualizado
- [x] Limites de validação substituídos por `LIMITS`
- [x] Constantes de título e descrição adaptadas para destinos
- [x] Contadores de caracteres validados
- [x] Busca por referências `VIDEO_` realizada sem resultados
- [x] Formulários testados após as alterações

### Etapa 6 - Testes de Regressão

- [x] Cadastro de usuário validado
- [x] Login com senha incorreta e correta validado
- [x] Edição de perfil validada
- [x] Upload de destino validado
- [x] Feed Geral e paginação validados
- [x] Detalhes do destino validados
- [x] Edição de destino validada
- [x] Navegação entre destinos e perfis validada
- [x] Curtir e descurtir validados
- [x] Prevenção de requisições duplicadas validada
- [x] Demais testes de regressão considerados aprovados
- [x] Console do navegador verificado sem erros inesperados

---

## Evidências da Aula 12

- [x] `checkpoint-02.md` criado
- [x] Prints de paginação antes e depois salvos
- [x] Prints de regressão da API organizados
- [x] Evidências armazenadas em `01 - Docs/atividade12`
- [x] `toast-erro.jpg` conferido
- [x] `toast-sucesso.jpg` conferido
- [x] `toast-modal.jpg` conferido
- [x] `uma-requisicao.jpg` conferido
- [x] `formulario-sem-toast.jpg` conferido

---

## Documentação e Entrega

- [x] `respostas.md` da Aula 12 criado com as sete respostas
- [x] ADR-013 registrada no `checkpoint-02.md`
- [x] `checklists.md` atualizado com as atividades da Aula 12
- [x] Alterações do código enviadas ao GitHub
- [x] ZIP do backend preparado sem `node_modules`
- [x] ZIP do frontend preparado sem `node_modules`

---

## Status

**Aula 12 — Desenvolvimento, testes de regressão, documentação, evidências e checklist concluídos.**


## Aula 13 — Coleções, Atualização Otimista e Busca com Debounce

### Parte A — Backend

#### Etapa 1 — Constantes, parseId e followController
- [x] Constantes de validação e de busca criadas.
- [x] parseId criado e utilizado pelo followController, sem a função antiga.

#### Etapa 2 — Models e Associações
- [x] Dois models e seis associações implementados.
- [x] Tabelas, índices e chaves estrangeiras conferidos no banco.

#### Etapa 3 — Validator, Service, Controller e Rotas
- [x] Quatro arquivos do módulo de coleções criados e registrados no app.js.
- [x] Operações de escrita e atualização do contador executadas na mesma transação.
- [x] Acesso privado protegido com HTTP 403 e isOwner correto para dona, outra pessoa e visitante.

#### Etapa 4 — Busca Global
- [x] Busca no banco com escape de caracteres especiais, Promise.all e tratamento da entrada.
- [x] Controller com async/await e rota utilizando asyncHandler.

#### Etapa 5 — Exclusão de Destinos
- [x] Exclusão limpa a tabela de junção e desconta o contador das coleções na mesma transação.
- [x] Teste de controle realizado e comportamento descrito no respostas.md.

#### Etapa 6 — Testes da API
- [x] Os onze grupos de testes da API executados com sucesso.

### Parte B — Frontend

#### Checagem de Alcançabilidade
- [x] Minhas Coleções acessível pelo menu do avatar e pela Sidebar.
- [x] Criação e exclusão acessíveis pela tela Minhas Coleções.
- [x] Detalhe da coleção acessível pelo cartão.
- [x] Botão Salvar disponível no detalhe do destino, com redirecionamento para login quando necessário.
- [x] Remoção de destinos disponível no detalhe da coleção para a dona.
- [x] Busca acessível pela Navbar e pela opção Explorar da Sidebar.
- [x] Rotas de coleções e busca configuradas corretamente.

**Decisão de escopo:** coleções públicas de outras pessoas são acessíveis somente por link direto. Não existe uma tela de listagem das coleções públicas de outros usuários, conforme a lacuna conhecida indicada pelo professor.

#### Etapa 1 — Constantes, Service e Home
- [x] Constantes configuradas, collectionService com sete funções e Home sem chamadas de busca de teste.

#### Etapa 2 — Atualização Otimista
- [x] Utilitário runOptimistic criado.
- [x] Botões de curtir e seguir refatorados, sem regressão.

#### Etapa 3 — Minhas Coleções e Detalhe
- [x] Modal de criação, listagem e detalhe funcionando, incluindo tratamento de HTTP 403 e 404 na própria tela.
- [x] Cartão clicável com botão Excluir funcionando sobre o link esticado.

#### Etapa 4 — Modal Salvar
- [x] Modal com caixas marcadas conforme o servidor, atualização otimista, rollback e bloqueio por linha.
- [x] Botão Salvar no detalhe do destino, incluindo comportamento para visitantes.

#### Etapa 5 — Debounce, Busca e Navbar
- [x] Digitar uma palavra inteira sem pausa gera uma requisição de busca no Network.
- [x] Termo persistido na URL; F5 e links funcionam; Navbar encaminha para a busca; Voltar não percorre cada pausa da digitação.

#### Etapa 6 — Teste Prático Completo
- [x] Os seis grupos de testes práticos executados em sequência, utilizando a navegação da aplicação.

### Entrega
- [x] Código do backend e frontend implementado.
- [x] respostas.md da Aula 13 criado com as oito respostas.
- [x] checklists.md atualizado com os itens da Aula 13.
- [x] Lacuna das coleções públicas registrada como decisão de escopo.
- [x] ZIPs do backend e frontend gerados sem node_modules.
- [x] Evidências da Aula 13 organizadas na pasta 01 - Docs/atividade13.


## Aula 14 — Notificações, Denúncias e Correção do Logout

### Parte A — Backend

#### Etapa 1 — Models e Associações

- [x] Models Notification e Report criados.
- [x] Associações entre usuários, destinos, notificações e denúncias configuradas.
- [x] Tabelas notifications e reports criadas no MySQL.
- [x] Índices, chaves estrangeiras e restrições de integridade conferidos.
- [x] Exclusão de destinos com tratamento dos registros relacionados validada.

#### Etapa 2 — Notificações

- [x] Service, Controller e rotas de notificações implementados.
- [x] Listagem paginada de notificações implementada.
- [x] Consulta da quantidade de notificações não lidas implementada.
- [x] Marcação individual de notificações como lidas implementada.
- [x] Notificações integradas às ações de curtir, comentar e seguir.
- [x] Remoção de notificações relacionadas ao desfazer curtidas e seguidores implementada.
- [x] Rotas protegidas por autenticação.

#### Etapa 3 — Denúncias

- [x] Service, Controller, Validator e rota de denúncias implementados.
- [x] Cinco motivos de denúncia configurados.
- [x] Validação de motivo obrigatório implementada.
- [x] Restrição de denúncia do próprio destino implementada.
- [x] Restrição de denúncias duplicadas implementada com HTTP 409.
- [x] Denúncias não geram notificações para o proprietário do destino.

#### Etapa 4 — Integridade e Correções

- [x] Exclusão de destinos com limpeza de notificações e denúncias relacionadas.
- [x] Integridade referencial validada no MySQL.
- [x] Correção da ordem dos middlewares de CORS aplicada.
- [x] API iniciando e sincronizando o banco sem erros.

#### Etapa 5 — Testes da API

- [x] Listagem de notificações testada.
- [x] Contagem de notificações não lidas testada.
- [x] Marcação de notificações como lidas testada.
- [x] Notificações de curtidas, comentários e seguidores testadas.
- [x] Curtir/descurtir e seguir/deixar de seguir validados.
- [x] Envio de denúncia válida testado.
- [x] Tentativa de denúncia duplicada validada.
- [x] Restrições de denúncia do próprio destino validadas.
- [x] Exclusão de destino com registros relacionados testada.
- [x] Consultas de integridade executadas no MySQL.
- [x] Testes de regressão do backend concluídos.

### Parte B — Frontend

#### Etapa 1 — Services, Constantes e Store

- [x] notificationService.js criado.
- [x] reportService.js criado.
- [x] Constantes de notificações e motivos de denúncia configuradas.
- [x] Store de notificações criada com Pinia.
- [x] Polling configurado para 30 segundos.
- [x] Atualização imediata ao iniciar o polling implementada.
- [x] Polling interrompido no logout.
- [x] Polling pausado quando a aba está oculta.
- [x] Proteção contra respostas antigas implementada.

#### Etapa 2 — Navbar e Sino de Notificações

- [x] Sino de notificações integrado à Navbar.
- [x] Sino exibido somente para usuários autenticados.
- [x] Contador de notificações não lidas implementado.
- [x] Exibição de 99+ para contagens superiores a 99.
- [x] Atributo aria-label configurado.
- [x] Polling integrado ao estado de autenticação.
- [x] Prevenção de múltiplos temporizadores implementada.

#### Etapa 3 — Tela de Notificações

- [x] NotificationsView.vue criada.
- [x] Rota /notifications protegida por autenticação.
- [x] Listagem paginada de notificações implementada.
- [x] Notificações não lidas destacadas visualmente.
- [x] Botão Marcar como lida implementado.
- [x] Atualização otimista com runOptimistic implementada.
- [x] Rollback em caso de falha implementado.
- [x] Bloqueio de requisições duplicadas por notificação implementado.
- [x] Navegação para perfil ou detalhe do destino implementada.
- [x] Botão Atualizar implementado.
- [x] Botão Carregar mais notificações implementado.
- [x] Estado vazio da listagem implementado.

#### Etapa 4 — Denúncias de Destinos

- [x] ReportDestinationModal.vue criado.
- [x] Cinco motivos de denúncia apresentados no modal.
- [x] Seleção única de motivo implementada.
- [x] Validação de motivo obrigatório implementada.
- [x] Erros da API exibidos dentro do modal.
- [x] Envio de denúncias configurado com silent: true.
- [x] Botão Denunciar integrado ao detalhe do destino.
- [x] Botão Denunciar ocultado para o proprietário.
- [x] Redirecionamento de visitantes para login implementado.
- [x] Toast de sucesso exibido após denúncia.
- [x] Modal bloqueado durante o envio.
- [x] Formulário reiniciado a cada abertura.

#### Etapa 5 — Correção do Logout

- [x] authService.js atualizado para enviar undefined no lugar de null.
- [x] Configuração silent: true preservada.
- [x] Logout integrado à interrupção do polling.
- [x] Correção do erro de CORS no logout validada.

#### Etapa 6 — Testes do Frontend

- [x] Sino e contador de notificações validados.
- [x] Atualização automática do contador validada.
- [x] Polling após login e logout validado.
- [x] Pausa do polling em aba oculta validada.
- [x] Listagem e paginação de notificações validadas.
- [x] Marcação otimista como lida validada.
- [x] Rollback e prevenção de requisições duplicadas validados.
- [x] Navegação pelas notificações validada.
- [x] Atualização manual da lista validada.
- [x] Modal de denúncia e validação de motivo testados.
- [x] Tratamento de erro e denúncia duplicada testados.
- [x] Toast de sucesso da denúncia validado.
- [x] Visibilidade do botão Denunciar validada.
- [x] Login e logout testados sem erros inesperados.
- [x] Testes de regressão das Aulas 1 a 13 realizados.
- [x] Console do navegador verificado sem erros inesperados.

### Evidências da Aula 14

- [x] Prints dos testes da API registrados.
- [x] Evidências das tabelas notifications e reports registradas.
- [x] Prints da Navbar com notificações registrados.
- [x] Prints da tela de notificações registrados.
- [x] Prints de marcação como lida registrados.
- [x] Prints do modal de denúncia registrados.
- [x] Prints dos testes de denúncia registrados.
- [x] Evidências organizadas em 01 - Docs/atividade14.

### Documentação e Entrega

- [x] Backend da Aula 14 implementado.
- [x] Frontend da Aula 14 implementado.
- [x] Testes previstos no roteiro executados.
- [x] Escopo da Aula 14 revisado, mantendo somente as funcionalidades e os testes previstos no roteiro do professor.
- [x] Constante POLL_MS mantida em 30000.
- [x] Alterações temporárias de testes removidas.
- [x] checklists.md atualizado com a Aula 14.
- [x] Evidências da Aula 14 organizadas.
- [x] Decisão técnica sobre o polling de notificações registrada, justificando o intervalo de 30 segundos, a pausa em abas ocultas e a interrupção no logout.
- [x] Decisão de escopo registrada no respostas.md: somente o contador do sino utiliza polling; a lista de notificações é atualizada manualmente pelo botão Atualizar.

### Status

**Aula 14 — Desenvolvimento, testes, documentação e evidências concluídos.**

## Aula 15 — Painel Administrativo, Autorização e Moderação

### Parte A — Backend

#### Etapa 1 — Preparação e Banco de Dados

- [x] Projeto TravelBuddy identificado como Grupo B.
- [x] Campo isAdmin configurado no model User.
- [x] Campo isBlocked configurado no model User.
- [x] Campo status adicionado ao model Report com valor padrão.
- [x] Campo reviewedAt adicionado ao model Report.
- [x] Índice para consulta de denúncias por situação configurado.
- [x] Estrutura da tabela de denúncias conferida no MySQL.
- [x] Contagem de denúncias por situação validada.

#### Etapa 2 — Autenticação e Autorização

- [x] Middleware isAuthenticated atualizado para consultar o usuário no banco.
- [x] Verificação de contas bloqueadas implementada.
- [x] Verificação de contas excluídas implementada.
- [x] Middleware isAdmin implementado.
- [x] Autorização administrativa baseada nas permissões atuais do banco.
- [x] Ordem isAuthenticated → isAdmin aplicada às rotas administrativas.
- [x] Script scripts/setAdmin.js implementado.
- [x] Promoção administrativa realizada pelo script, sem rota pública.
- [x] Bloqueio de usuário verificado no login.
- [x] Respostas HTTP 401 e 403 tratadas conforme o contexto.

#### Etapa 3 — Módulo Administrativo

- [x] Módulo admin implementado com Service, Controller e Routes.
- [x] Rotas administrativas registradas no app.js.
- [x] Dashboard administrativo implementado.
- [x] Indicadores de usuários, destinos e denúncias implementados.
- [x] Listagem paginada de denúncias implementada.
- [x] Filtro por situação das denúncias implementado.
- [x] Revisão de denúncias implementada.
- [x] Revisão idempotente implementada.
- [x] Atualização do registro com reload() implementada.
- [x] Listagem administrativa de usuários implementada.
- [x] Busca de usuários implementada.
- [x] Bloqueio e desbloqueio de usuários implementados.
- [x] Listagem administrativa de destinos implementada.
- [x] Busca de destinos implementada.
- [x] Contagem de denúncias associadas aos destinos implementada.
- [x] Exclusão administrativa de destinos implementada.
- [x] Limpeza dos registros relacionados à exclusão preservada.
- [x] Utilitário utils/escapeLike.js criado e reutilizado nas buscas.
- [x] Paginação administrativa implementada.

#### Etapa 4 — Testes de Controle e Segurança

- [x] Teste de controle de usuário bloqueado realizado.
- [x] Teste de controle de permissões administrativas realizado.
- [x] Acesso sem autenticação retorna HTTP 401.
- [x] Acesso de usuário comum às rotas administrativas retorna HTTP 403.
- [x] Acesso de administrador autenticado validado.
- [x] Proteção administrativa validada independentemente do frontend.
- [x] Alterações de permissões verificadas no banco de dados.

#### Etapa 5 — Testes da API

- [x] GET /api/admin/dashboard testado.
- [x] GET /api/admin/reports testado.
- [x] PATCH /api/admin/reports/:id/review testado.
- [x] GET /api/admin/users testado.
- [x] PATCH /api/admin/users/:id/block testado.
- [x] GET /api/admin/destinations testado.
- [x] DELETE /api/admin/destinations/:id testado.
- [x] Rota administrativa inexistente testada.
- [x] Testes com ausência de token realizados.
- [x] Testes com usuário comum realizados.
- [x] Testes com administrador realizados.
- [x] Filtros e paginação dos endpoints administrativos validados.

### Parte B — Frontend

#### Etapa 1 — Preparação e Navegação

- [x] adminService.js criado.
- [x] Rotas administrativas configuradas no Vue Router.
- [x] Guarda de navegação administrativa implementada.
- [x] Verificação de isAdmin integrada à navegação.
- [x] Redirecionamento de usuários não autenticados implementado.
- [x] Aviso de falta de permissão para usuários comuns implementado.
- [x] Navegação administrativa integrada ao layout.
- [x] Acesso ao painel disponível para administradores.

#### Etapa 2 — Componentes e Paginação

- [x] Componente ConfirmModal.vue implementado.
- [x] Confirmação de ações administrativas implementada.
- [x] Cancelamento das operações implementado.
- [x] Modal permanece aberto quando a requisição falha.
- [x] Estados de carregamento implementados.
- [x] Bloqueio de ações simultâneas implementado.
- [x] usePaginatedList.js reutilizado nas listagens administrativas.
- [x] Paginação e botão Carregar mais implementados.
- [x] Atualização manual das listagens implementada.
- [x] Busca com debounce implementada.

#### Etapa 3 — Telas Administrativas

- [x] Tela Dashboard implementada.
- [x] Cartões de indicadores exibindo dados reais.
- [x] Denúncias pendentes destacadas no Dashboard.
- [x] Tela Denúncias implementada.
- [x] Filtro de denúncias por situação implementado.
- [x] Motivos de denúncia apresentados em português.
- [x] Selos de situação implementados.
- [x] Ação de revisar denúncia integrada à API.
- [x] Estado Salvando... exibido durante a revisão.
- [x] Tela Usuários implementada.
- [x] Busca de usuários com debounce implementada.
- [x] Bloqueio de usuários com confirmação implementado.
- [x] Desbloqueio de usuários implementado.
- [x] Selos de usuários bloqueados implementados.
- [x] Tela Itens adaptada para os destinos do TravelBuddy.
- [x] Busca administrativa de destinos implementada.
- [x] Contagem de denúncias exibida nos destinos.
- [x] Exclusão de destinos com confirmação implementada.
- [x] Consequências da exclusão descritas no modal.

#### Etapa 4 — Testes do Frontend

- [x] Guarda de rota testada com usuário comum.
- [x] Manipulação de isAdmin no localStorage testada.
- [x] Proteção da API com HTTP 403 validada.
- [x] Dashboard administrativo validado.
- [x] Filtros e listagem de denúncias validados.
- [x] Revisão de denúncia testada com Slow 3G.
- [x] Paginação por offset testada com PAGE_SIZE = 2.
- [x] Limitação de pulo de registros identificada.
- [x] PAGE_SIZE restaurado após o teste.
- [x] Busca de usuários com debounce validada no Network.
- [x] Busca com caracteres especiais testada.
- [x] Cancelamento do bloqueio testado.
- [x] Falha de rede durante bloqueio testada.
- [x] Bloqueio de usuário realizado com sucesso.
- [x] Login de usuário bloqueado testado.
- [x] Desbloqueio de usuário validado.
- [x] Busca administrativa de destinos validada.
- [x] Cancelamento da exclusão testado.
- [x] Falha de rede durante exclusão testada.
- [x] Exclusão administrativa de destino validada.
- [x] Remoção das denúncias relacionadas validada.
- [x] Testes de regressão das funcionalidades anteriores realizados.
- [x] Tratamento de sessão expirada validado.
- [x] Console do navegador verificado sem erros inesperados.

### Evidências da Aula 15

- [x] guarda-comum.jpg registrado.
- [x] guarda-localstorage.jpg registrado.
- [x] dashboard.jpg registrado.
- [x] denuncias-lista.jpg registrado.
- [x] revisar-lenta.jpg registrado.
- [x] pulo-paginacao.jpg registrado.
- [x] usuarios-busca.jpg registrado.
- [x] bloquear-modal.jpg registrado.
- [x] bloqueado-login.jpg registrado.
- [x] itens-excluir.jpg registrado.
- [x] banco-denuncias.jpg registrado.
- [x] controle-bloqueio.jpg registrado.
- [x] controle-isadmin.jpg registrado.
- [x] Prints dos testes curl da Parte A, Etapa 5 registrados.
- [x] Evidências organizadas em 01 - Docs/atividade15.

### Documentação e Entrega

- [x] Backend da Aula 15 implementado.
- [x] Frontend da Aula 15 implementado.
- [x] Testes previstos no roteiro executados.
- [x] respostas.md criado com as dez respostas da Seção 1.
- [x] checklists.md atualizado com a Aula 15.
- [x] Limitação da paginação por offset documentada.
- [x] Evidências da Aula 15 organizadas.
- [x] Alterações temporárias de testes removidas.
- [x] Escopo mantido conforme o roteiro do professor.
- [x] Alterações do backend enviadas ao GitHub.

### Status

**Aula 15 — Desenvolvimento, testes, documentação e evidências concluídos.**