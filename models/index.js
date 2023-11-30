const User = require('./User');
const Children = require('./Children');

User.hasMany(Children, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Children.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Children };
