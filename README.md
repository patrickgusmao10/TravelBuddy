# 🌎 TravelBuddy

<p align="center">
  <strong>Uma plataforma web para conectar viajantes, compartilhar experiências e descobrir novos destinos.</strong>
</p>

<p align="center">
  Projeto Full Stack desenvolvido durante a disciplina de Programação Web.
</p>

---

## 📖 Sobre o projeto

O **TravelBuddy** é uma aplicação web voltada para pessoas que gostam de viajar, conhecer novos lugares e compartilhar experiências.

A proposta do projeto é oferecer uma plataforma na qual usuários possam criar uma conta, autenticar-se no sistema, manter um perfil pessoal e acessar funcionalidades relacionadas a destinos, viajantes, avaliações, relatos e roteiros.

O projeto foi desenvolvido progressivamente durante as atividades da disciplina de **Programação Web**, aplicando conceitos de desenvolvimento Front-end e Back-end, APIs REST, autenticação, banco de dados, validação de dados, upload de arquivos e organização de uma aplicação Full Stack.

---

## ✨ Principais funcionalidades

O TravelBuddy possui funcionalidades como:

- 👤 Cadastro de usuários
- 🔐 Login e autenticação utilizando JWT
- 🛡️ Proteção de rotas privadas
- 🚪 Logout
- 👤 Perfil do usuário
- ✏️ Atualização de informações do perfil
- 🖼️ Upload de imagem de perfil
- 🔎 Consulta de perfis públicos
- 🌍 Visualização de destinos
- ❤️ Área de favoritos
- 🗺️ Área de roteiros de viagem
- ⭐ Avaliações
- 📝 Relatos de viagem
- 👥 Área de viajantes
- ➕ Sistema de usuários seguindo
- 🛠️ Estrutura para funcionalidades administrativas
- ⚠️ Tratamento e validação de erros da API

---

## 🛠️ Tecnologias utilizadas

### Front-end

- **Vue.js**
- **Vite**
- **JavaScript**
- **HTML5**
- **CSS3**
- **Vue Router**
- Consumo de API REST

### Back-end

- **Node.js**
- **Express**
- **JavaScript**
- **JWT (JSON Web Token)**
- **Multer**
- Validação de requisições
- API REST

### Banco de dados

- **MySQL**
- **Sequelize ORM**

### Ferramentas utilizadas

- **Visual Studio Code**
- **MySQL Workbench**
- **Git**
- **GitHub**
- **Postman / ferramentas de teste de API**

---

## 📂 Estrutura do projeto

O repositório está organizado em duas aplicações principais:

```text
TravelBuddy/
│
├── backend/
│   ├── bin/
│   ├── config/
│   ├── middlewares/
│   ├── modules/
│   ├── public/
│   │   └── uploads/
│   ├── routes/
│   ├── app.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── router/
│   │   ├── services/
│   │   ├── stores/
│   │   ├── utils/
│   │   └── views/
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

# 🚀 Instalação e execução

Para executar o TravelBuddy localmente, é necessário configurar o **Back-end**, o **Front-end** e o **MySQL**.

## 1. Pré-requisitos

Antes de começar, tenha instalado:

- Node.js
- npm
- MySQL
- MySQL Workbench (opcional, mas recomendado)
- Git

Para verificar se Node.js e npm estão instalados:

```bash
node --version
npm --version
```

---

## 2. Clonar o repositório

Abra um terminal e execute:

```bash
git clone https://github.com/patrickgusmao10/TravelBuddy.git
```

Entre na pasta do projeto:

```bash
cd TravelBuddy
```

---

# ⚙️ Configuração do Back-end

Entre na pasta:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

---

## 🔐 Configuração das variáveis de ambiente

Por segurança, o arquivo `.env` **não está versionado no GitHub**.

Crie um arquivo chamado:

```text
.env
```

dentro da pasta:

```text
backend/
```

Configure as variáveis necessárias para sua instalação.

Exemplo:

```env
PORT=3000
CORS_ORIGIN=http://localhost:5173

DB_HOST=localhost
DB_PORT=3306
DB_NAME=travelbuddy_db
DB_USER=root
DB_PASSWORD=SUA_SENHA

JWT_SECRET=SUA_CHAVE_SECRETA
```

> ⚠️ Substitua `SUA_SENHA` pela senha do seu MySQL e defina uma chave segura para `JWT_SECRET`.

Nunca publique seu arquivo `.env` ou credenciais reais no GitHub.

---

# 🗄️ Configuração do banco de dados

Abra o MySQL Workbench ou outro cliente MySQL.

Crie o banco:

```sql
CREATE DATABASE travelbuddy_db;
```

Confirme que as informações configuradas no `.env` correspondem ao seu ambiente MySQL.

Exemplo:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=travelbuddy_db
DB_USER=root
DB_PASSWORD=SUA_SENHA
```

A aplicação utiliza **Sequelize** para comunicação com o banco de dados.

---

# ▶️ Executando o Back-end

Dentro da pasta `backend`, execute:

```bash
npm run dev
```

Caso o projeto esteja configurado para execução convencional:

```bash
npm start
```

O servidor deverá iniciar normalmente em:

```text
http://localhost:3000
```

Mantenha esse terminal aberto enquanto estiver utilizando o sistema.

---

# 💻 Configuração do Front-end

Abra **outro terminal**.

A partir da raiz do projeto, entre em:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Depois execute:

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local da aplicação, normalmente:

```text
http://localhost:5173
```

Abra esse endereço no navegador.

---

# 🔄 Resumo da execução

Para utilizar o projeto completo, mantenha dois terminais abertos:

### Terminal 1 — Back-end

```bash
cd backend
npm install
npm run dev
```

### Terminal 2 — Front-end

```bash
cd frontend
npm install
npm run dev
```

Com os dois serviços funcionando:

```text
Front-end → http://localhost:5173
Back-end  → http://localhost:3000
MySQL     → travelbuddy_db
```

---

## 🔐 Autenticação

O sistema utiliza **JWT (JSON Web Token)** para autenticação.

Após realizar login, o usuário recebe um token que é utilizado para acessar endpoints e páginas protegidas.

Entre as funcionalidades protegidas estão áreas como:

- perfil do usuário;
- favoritos;
- roteiros;
- relatos;
- avaliações;
- viajantes;
- funcionalidades administrativas.

Tentativas de acessar recursos protegidos sem autenticação válida são bloqueadas pela aplicação.

---

## 🖼️ Upload de imagem de perfil

O TravelBuddy permite atualizar informações do perfil e enviar uma imagem.

No Back-end, os uploads são tratados utilizando **Multer** e armazenados na estrutura pública da aplicação.

```text
backend/public/uploads/
```

Isso permite que as imagens sejam disponibilizadas posteriormente para o Front-end.

---

## 📚 Documentação acadêmica

Durante o desenvolvimento do TravelBuddy foram produzidos documentos, checklists e evidências das diferentes etapas do projeto.

A documentação das atividades está organizada dentro do projeto para registrar a evolução da aplicação ao longo da disciplina.

O desenvolvimento foi realizado de forma incremental, partindo da estrutura inicial do Front-end e Back-end até recursos como autenticação, persistência em banco de dados, proteção de rotas e gerenciamento de perfil.

---

## 🧪 Testando o projeto

Após iniciar Back-end e Front-end, alguns testes recomendados são:

1. Criar um novo usuário.
2. Realizar login.
3. Verificar o redirecionamento após autenticação.
4. Acessar o perfil.
5. Atualizar as informações do perfil.
6. Realizar upload de uma imagem.
7. Efetuar logout.
8. Tentar acessar uma rota protegida sem autenticação.
9. Testar autenticação com token inválido.

---

## 🔒 Segurança

Algumas práticas aplicadas no projeto:

- autenticação utilizando JWT;
- proteção de rotas;
- validação dos dados recebidos pela API;
- separação das configurações sensíveis utilizando `.env`;
- `.env` ignorado pelo Git;
- tratamento de erros;
- validação de autenticação no Back-end;
- controle de acesso no Front-end.

---

## 📈 Evolução do projeto

O TravelBuddy foi desenvolvido gradualmente durante as atividades da disciplina.

Ao longo das etapas foram implementados:

**Etapa inicial:** estrutura do projeto, API, Vue.js, componentes e navegação.

**Evolução da API:** cadastro, validações, serviços e comunicação entre Front-end e Back-end.

**Banco e autenticação:** integração com MySQL, Sequelize, login, JWT e rotas protegidas.

**Perfil:** consulta do usuário autenticado e gerenciamento das informações pessoais.

**Perfil avançado:** atualização de dados e upload de imagem.

Essa evolução permitiu transformar a estrutura inicial em uma aplicação Full Stack integrada.

---

## 🌱 Próximas evoluções

O projeto pode continuar sendo expandido com funcionalidades como:

- criação e gerenciamento de roteiros;
- sistema completo de favoritos;
- publicação de relatos;
- avaliações de destinos;
- interação entre viajantes;
- sistema de seguidores;
- pesquisa avançada de destinos;
- painel administrativo;
- melhorias de responsividade;
- deploy do Front-end e Back-end.

---

## 👨‍💻 Autor

**Patrick Gonçalves Gusmão**

Estudante de Engenharia de Software.

Projeto desenvolvido para a disciplina de **Programação Web**.

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos e educacionais.