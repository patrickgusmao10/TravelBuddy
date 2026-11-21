function escapeLike(text) {
  return text.replace(/[\\%_]/g, '\\$&');
}

module.exports = escapeLike;