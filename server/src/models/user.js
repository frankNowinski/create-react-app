import bookshelf from '../bookshelf';
import Stocks from './stock';

export default bookshelf.Model.extend({
  tableName: 'users',
  stocks: function() {
    return this.hasMany(Stocks)
  }
});
