module.exports = async () => {
  // Set test environment
  process.env.NODE_ENV = 'test';
  
  try {
    // Import sequelize after setting environment
    const { sequelize } = require('../models');
    
    // Wait for database connection
    await sequelize.authenticate();
    console.log('Database connection established for testing');
    
    // Sync database with force: true to recreate tables
    await sequelize.sync({ force: true });
    console.log('Test database synced successfully');
  } catch (error) {
    console.error('Error setting up test database:', error);
    throw error;
  }
};