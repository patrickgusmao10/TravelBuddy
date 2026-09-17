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