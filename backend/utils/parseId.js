function parseId(rawValue, label = 'recurso') {
    const id = Number(rawValue);

    if (!Number.isInteger(id) || id <= 0) {
        const error = new Error(`Identificador de ${label} inválido.`);
        error.status = 400;
        throw error;
    }

    return id;
}

module.exports = { parseId };