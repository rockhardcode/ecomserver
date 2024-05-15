const cartModel = require("../models/cartProduct");

const deleteAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req.userId
        const productId = req.body._id
        const deleteProduct = await cartModel.deleteOne({_id: productId})
        res.json({
            message: "Product removed from cart",
            error: false,
            success: true,
            data: deleteProduct
        })
      } catch (err) {
        res.status(400).json({
          message: err.message || err,
          error: true,
          success: false,
        });
      }
}

module.exports = deleteAddToCartProduct