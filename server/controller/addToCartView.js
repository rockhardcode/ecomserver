const cartModel = require("../models/cartProduct")

const addToCartView = async (req, res) => {
    try{
        const currentUser = req?.userId
        const allProduct = await cartModel.find({
            userId: currentUser
        }).populate("productId")
        res.json({
            data: allProduct,
            success: true,
            error: false
        })
     } catch(err){
         res.status(400).json({
             message: err.message || err,
             success: false,
             error: true
         })
     }
}

module.exports = addToCartView