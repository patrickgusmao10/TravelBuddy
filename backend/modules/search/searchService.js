/**
 * Camada de acesso a dados do módulo de busca.
 *
 * Na Aula 02 ainda não existe banco de dados.
 * Por isso, a busca retorna listas vazias.
 */
function globalSearch(query) {
    return {
        destinations: [],
        users: []
    };
}

module.exports = { globalSearch };