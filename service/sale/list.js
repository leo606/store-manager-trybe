const sale = require('../../models/document')('sales');

module.exports = async () => {
  try {
    const list = await sale.list();
    return list;
  } catch (e) {
    console.log(e);
  }
};