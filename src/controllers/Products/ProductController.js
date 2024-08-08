const Product = require("../../../models").Product;
const products = async (req, res) => {
  const products = await Product.findAll({});
  if (products.length > 0) {
    res.status(200).json({
      message: "success",
      status: 200,
      products: products,
    });
  } else {
    res.status(404).json({
      message: "not found",
      status: 404,
    });
  }
};
module.exports = { products };
