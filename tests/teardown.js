module.exports = async () => {
  try {
    const { sequelize } = require('../models');
    
    // Close database connection
    await sequelize.close();
    console.log('Database connection closed after testing');
  } catch (error) {
    console.error('Error closing test database:', error);
    // Don't throw error in teardown to avoid masking test results
  }
};