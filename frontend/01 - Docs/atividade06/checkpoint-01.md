# Checkpoint 01 — Backend

## Revisão da arquitetura

### 1. Alguma rota contém lógica de negócio?
**Não.**

As rotas estão responsáveis apenas por definir o verbo HTTP, caminho, middlewares, validadores e o Controller responsável pela requisição. A lógica de negócio permanece separada nas camadas Controller e Service.

### 2. Algum Controller acessa Model diretamente?
**Não.**

Os Controllers utilizam os Services para executar as operações necessárias. No módulo de usuário, por exemplo, o `userController.js` utiliza o `userService.js`, mantendo a separação entre Controller, Service e Model.

### 3. Algum Service conhece `req` ou `res`?
**Não.**

Os Services recebem apenas os dados necessários como parâmetros e retornam os resultados das operações. Os objetos HTTP `req` e `res` permanecem restritos à camada Controller.

### 4. Algum Controller usa `res.json()` manual em vez de `success()` / `error()`?
**Não.**

Os Controllers revisados utilizam o helper `success()` definido em `apiResponse.js` para padronizar as respostas da API.

### 5. Toda rota que chama função `async` está envolvida em `asyncHandler`?
**Sim.**

As funções assíncronas dos Controllers são utilizadas nas rotas através do middleware `asyncHandler`. A rota de logout não utiliza `asyncHandler` porque sua função no Controller é síncrona.

### 6. Toda validação de entrada usa `express-validator`, sem `if` manual escondido?
**Sim.**

As validações de cadastro, login e atualização de perfil estão centralizadas em `userValidator.js` utilizando `express-validator`. A validação personalizada de confirmação de senha também está implementada através do método `.custom()` do próprio `express-validator`.

### 7. `BIO_MAX` é usado no lugar certo e `DESCRIPTION_MAX` continua reservado?

**Sim.**

`BIO_MAX`, definido com valor 255 em `config/constants.js`, é utilizado na validação da bio do usuário em `profileUpdateValidator`. `DESCRIPTION_MAX`, definido com valor 500, permanece reservado para funcionalidades futuras.

### 8. `config/constants.js` centraliza as constantes de validação utilizadas pelo projeto?

**Sim.**

Os valores utilizados nas validações estão centralizados em `config/constants.js`, evitando valores de validação soltos pelo código. A constante `DESCRIPTION_MAX` permanece definida e reservada para uma funcionalidade futura, conforme previsto no projeto.

## Conclusão

A revisão dos módulos `search` e `user` confirmou que a arquitetura atual mantém a separação de responsabilidades entre Route, Controller, Service e Model. As validações, respostas da API e tratamento das funções assíncronas também seguem o padrão adotado pelo projeto.

Nenhuma alteração estrutural adicional foi necessária neste checkpoint.