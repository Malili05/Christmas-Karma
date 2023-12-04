const sequelize = require('../config/connection');
const { User, Child } = require('../models/index.js');

const userData = require('./userData.json');
const childData = require('./childrenData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const child of childData) {
    await Child.create({
      ...child,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();