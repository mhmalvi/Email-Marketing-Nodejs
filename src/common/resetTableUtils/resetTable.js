const resetAutoIncrement = async (model) => {
  try {
    // Start a transaction for safety
    await sequelize.transaction(async (t) => {
      // Find the maximum value of the auto-increment column (e.g., `id`)
      const maxId = await model.max("id", { transaction: t });

      if (maxId) {
        // Use Sequelize's `query` method to run raw SQL for setting the auto-increment
        await sequelize.query(
          `ALTER TABLE your_table AUTO_INCREMENT = ${maxId + 1}`,
          { transaction: t }
        );
        console.log(`Auto-increment reset to start from ${maxId + 1}`);
      } else {
        console.log("Table is empty. Auto-increment remains at default.");
      }
    });
  } catch (error) {
    console.error("Error resetting auto-increment:", error);
  }
};
module.exports = { resetAutoIncrement };
