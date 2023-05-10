const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('do_an_4', 'root', 'root', {
  host: '127.0.0.1',
  dialect: 'mysql',
  logging: false,
  port: 8889
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = connectDB