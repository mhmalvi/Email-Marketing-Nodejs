const test = async (req, res) => {
    const date = new Date();
    // const seconds = Math.floor(date.getTime() / 1000);
    console.log(date.toString());
};

module.exports = { test };
