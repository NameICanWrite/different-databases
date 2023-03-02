import Sequelize from 'sequelize' 
import sequelize from './db-config.js';

const Book = sequelize.define('book', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING,
  },
  desc: {
    type: Sequelize.STRING,
  },
  cover: {
    type: Sequelize.STRING,
  },
});

export default Book

