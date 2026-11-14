# Respostas — Atividade 12 — TravelBuddy

## 1. Por que useAsyncData recebe () => minhaChamada() e não minhaChamada()?

O `useAsyncData` recebe uma função para que possa executar a requisição no momento adequado e repeti-la quando necessário. Ao passar `() => minhaChamada()`, a chamada fica disponível para execução posterior. Se utilizássemos `minhaChamada()`, a requisição seria executada imediatamente, e o composable receberia o resultado dessa execução, em vez de uma função que pudesse controlar.

## 2. O que é a corrida entre respostas, como ela se manifesta para o usuário e como o lastCallId a evita?

A corrida entre respostas acontece quando duas requisições são iniciadas em sequência, mas a primeira demora mais para terminar do que a segunda. Isso pode fazer com que dados antigos substituam informações mais recentes na tela. No TravelBuddy, esse problema poderia ocorrer ao navegar rapidamente entre perfis ou destinos. O `lastCallId` identifica a requisição mais recente e impede que respostas de chamadas anteriores atualizem o estado do componente.

## 3. Quem avisa o usuário quando uma ação falha, quando uma leitura falha e quando um formulário falha? Por que toast para todo erro seria um erro de design?

Quando uma ação falha, como curtir ou excluir um destino, o interceptor do Axios apresenta um toast de erro. Quando uma leitura falha, como o carregamento do Feed Geral, a própria tela apresenta a mensagem. Nos formulários, como login e cadastro, os erros aparecem dentro do formulário por meio da opção `silent`. Utilizar toast para todos os erros seria inadequado porque mensagens de validação e problemas de carregamento precisam aparecer no contexto em que ocorreram, evitando notificações desnecessárias ou duplicadas.

## 4. Por que a lista de toasts fica fora da função useToast() (singleton) e que vantagem isso traz sobre uma store do Pinia neste caso?

A lista de toasts fica fora da função `useToast()` para que todos os componentes compartilhem o mesmo estado de notificações. Dessa forma, qualquer tela pode adicionar um toast, e o `ToastContainer` consegue exibi-lo sem criar listas independentes. Como esse estado é simples e utilizado apenas para notificações temporárias, um singleton reativo resolve a necessidade sem exigir uma store adicional do Pinia.

## 5. Por que ?limit=-3 era um problema, por que Number.parseInt('abc') >= 1 dá false e por que existe um teto para o limit?

O parâmetro `?limit=-3` era um problema porque permitia enviar um valor inválido para a paginação, podendo provocar erros ou resultados inesperados no banco de dados. A expressão `Number.parseInt('abc') >= 1` retorna `false` porque a conversão produz `NaN`, que não satisfaz a comparação. Isso permite identificar valores inválidos durante a validação. O teto para `limit` impede que o usuário solicite uma quantidade excessiva de registros em uma única requisição, protegendo o desempenho da API. No TravelBuddy, o limite máximo foi definido como 50 registros.

## 6. Por que o miolo da atualização otimista não foi extraído hoje e o que é a regra dos três?

A atualização otimista não foi totalmente extraída porque os componentes de curtida e de seguir usuários possuem estados e regras diferentes. No TravelBuddy, o `LikeButton` atualiza o estado da curtida e seu contador, enquanto o `FollowButton` atualiza o relacionamento entre usuários e a quantidade de seguidores. Foi extraído apenas o comportamento compartilhado de execução da ação e controle de requisições simultâneas. A regra dos três recomenda considerar uma abstração quando uma lógica semelhante aparece pela terceira vez, evitando generalizações prematuras.

## 7. O que pode dar errado quando um Service grava o registro e o contador do autor sem transação?

Sem uma transação, o Service pode criar um destino com sucesso e falhar ao atualizar o contador `destinationsCount` do usuário, deixando os dados inconsistentes. O contrário também poderia acontecer, dependendo da ordem das operações. No TravelBuddy, o cadastro de destinos foi ajustado para executar a criação do registro e a atualização do contador dentro da mesma transação Sequelize. Assim, se uma das operações falhar, ambas são desfeitas, preservando a consistência do banco de dados.