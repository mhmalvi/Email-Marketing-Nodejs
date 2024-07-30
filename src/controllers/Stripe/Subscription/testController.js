const test = async (req, res) => {
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0];
    // const seconds = Math.floor(date.getTime() / 1000);
    
    res.json(formattedDate);
};

module.exports = { test };
