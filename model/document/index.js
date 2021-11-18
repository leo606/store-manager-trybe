const create = require('./create');

module.exports = (collection) => ({
    create: (entity) => create(collection, entity),
  });