const User = require('./User');
const Child = require('./Child');

User.hasMany(Child, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Child.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Child };
