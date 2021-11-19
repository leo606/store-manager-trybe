const create = require('./create');
const find = require('./find');
const list = require('./list');
const update = require('./update');
const remove = require('./delete');
const bulk = require('./bulk');

module.exports = (collection) => ({
    create: (entity) => create(collection, entity),
    find: (filter) => find(collection, filter),
    list: (query, projection) => list(collection, query, projection),
    update: (entity) => update(collection, entity),
    remove: (id) => remove(collection, id),
    bulk: (bulkList) => bulk(collection, bulkList),
  });