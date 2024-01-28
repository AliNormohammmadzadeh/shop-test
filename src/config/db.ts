import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USERNAME!, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
  });

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export async function connectDB() {
    sequelize.sync().then(() => {
        console.log('Connection has been established successfully.')
    }).catch((err) => {
        console.error('Unable to connect to the database:', err)
    })
}

export async function closeDB() {
  try {
    await sequelize.close();
    console.log('Connection to the database has been closed.');
  } catch (error) {
    console.error('Error closing the database connection:', error);
    throw error;
  }
}

export default sequelize;