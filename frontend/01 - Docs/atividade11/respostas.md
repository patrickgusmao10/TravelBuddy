# Atividade 11 — Respostas

**Projeto:** TravelBuddy  
**Disciplina:** Programação Web

### 1. Por que utilizar apelidos nas associações da tabela follows?

A tabela `follows` possui duas chaves estrangeiras que apontam para a mesma tabela `users`. Por isso, utilizamos os apelidos `Follower` e `Following` para diferenciar quem segue de quem é seguido. Na função `getFollowers`, buscamos os registros em que `followingId` corresponde ao usuário consultado e retornamos os `Follower`. Já em `getFollowing`, buscamos os registros em que `followerId` corresponde ao usuário consultado e retornamos os `Following`.

### 2. Por que a ordem das colunas no índice composto importa?

O índice único composto por `follower_id` e `following_id` impede que um usuário siga a mesma pessoa mais de uma vez. A ordem importa porque o índice favorece consultas que começam pela coluna `follower_id`. Por isso, também utilizamos um índice separado em `following_id`, melhorando as consultas que precisam identificar os seguidores de determinado usuário.

### 3. Por que é necessário converter o identificador recebido pela URL?

O parâmetro `req.params.userId` chega como texto, enquanto o identificador do usuário autenticado é numérico. Como o operador `===` compara também os tipos, uma comparação entre `3` e `'3'` retornaria `false`, permitindo que um usuário tentasse seguir a si mesmo. Para evitar isso, realizamos a conversão e a validação no controller, antes de encaminhar o identificador ao service.

### 4. Quando utilizar v-model e defineModel?

Utilizamos `v-model` e `defineModel` quando um componente filho precisa compartilhar e atualizar informações que também são utilizadas pelo componente pai. No TravelBuddy, o `FollowButton` compartilha o estado de acompanhamento e o contador de seguidores com o perfil público. Assim, ao seguir ou deixar de seguir uma pessoa, o botão e o contador são atualizados juntos, sem manter estados independentes.

### 5. Por que utilizar uma variável local na atualização otimista?

Com `defineModel`, uma alteração enviada pelo componente filho depende da atualização reativa do componente pai. Por isso, ler imediatamente o valor de `following.value` após modificá-lo pode retornar o estado anterior. Para evitar um cálculo incorreto no contador, utilizamos a variável local `nowFollowing`, que guarda o novo estado e determina se devemos somar ou subtrair um seguidor.

### 6. Por que o feed filtrado retorna um array vazio quando não seguimos ninguém?

O Feed de Seguindo do TravelBuddy consulta os usuários acompanhados e utiliza seus identificadores para buscar os destinos publicados por eles. Quando a lista de usuários seguidos está vazia, retornamos `[]` imediatamente. Isso evita uma consulta desnecessária ao banco de dados e permite que o frontend apresente corretamente a mensagem de que não existem destinos disponíveis nesse feed.