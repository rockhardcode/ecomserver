const cartModel = require("../models/cartProduct");

const countCartProducts = async (req, res) => {
    try {
        const userId = req?.userId
        const count = await cartModel.countDocuments({userId : userId})
        res.json({
            data: {count : count},
            message: "ok",
            success: true,
            error: false
        })
      } catch (err) {
        res.status(400).json({
          message: err.message || err,
          error: true,
          success: false,
        });
      }
}

module.exports = countCartProducts