const cartModel = require("../models/cartProduct");

const addToCartController = async (req, res) => {
  try {
    const { productId } = req?.body;
    const currentUser = req.userId;

    const isProductAvailable = await cartModel.findOne({productId : productId})

    if(isProductAvailable) {
        return res.json({
            message : "Product already exist in cart",
            success: false,
            error: true
        })
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };
    const newAddToCart = new cartModel(payload)

    const saveProduct = await newAddToCart.save()
    return res.json({
        data: saveProduct,
        message: "Product added to cart",
        success: true,
        error: false
    })
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
};

module.exports = addToCartController;
