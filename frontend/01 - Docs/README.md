# TravelBuddy — Documentação da Aula 1

## Objetivo

O TravelBuddy é uma plataforma web para compartilhamento de experiências, dicas e informações sobre destinos de viagem.

## Estrutura do projeto

O sistema está dividido em duas aplicações:

- Front-end: Vue.js + Vite
- Back-end: Node.js + Express

## Execução

### Back-end

A API é executada na porta 3000:

npm run dev

Endpoint de teste:

http://localhost:3000/api

### Front-end

O front-end é executado com:

npm run dev

Por padrão, o Vite utiliza a porta 5173.

## Integração

O front-end utiliza a variável de ambiente:

VITE_API_URL=http://localhost:3000/api

para realizar a comunicação com a API.

## Documentação

O arquivo `Funcionalidades-e-Telas.md` contém o levantamento das funcionalidades, telas e rotas previstas para o sistema.