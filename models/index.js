const User = require('./users');
const Children = require('./children');

User.hasMany(Children, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Children.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Children };
