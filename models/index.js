const User = require('./user.js');
const Child = require('./child.js');

User.hasMany(Child, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Child.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Child };
