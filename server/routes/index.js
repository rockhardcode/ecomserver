const express = require("express");

const router = express.Router();

const userSignUpController = require("../controller/userSignUp");
const userSignInController = require("../controller/userSignIn");
const authToken = require("../middleware/authToken");
const userDetailsController = require("../controller/userDetails");
const userLogout = require("../controller/userLogout");
const allUsers = require("../controller/allUsers");
const updateUser = require("../controller/updateUser");
const uploadProductController = require("../controller/uploadProduct");
const getProductController = require("../controller/getProduct");
const updateProductController = require("../controller/updateProduct");
const getCategoryProduct = require("../controller/getCategoryProduct");
const getAllCategoryProduct = require("../controller/getAllCategoryProduct");
const getProductDetails = require("../controller/getProductDetails");
const addToCartController = require("../controller/addToCardController");
const countCartProducts = require("../controller/countCartProducts");
const addToCartView = require("../controller/addToCartView");
const updateAddToCartProduct = require("../controller/updateAddToCartProduct");
const deleteAddToCartProduct = require("../controller/deleteAddToCartProduct");
const searchProduct = require("../controller/searchProduct");
const filterProductController = require("../controller/filterProduct");

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);

// admin panel
router.get("/all-user", allUsers);
router.post("/update-user", authToken, updateUser);

// Upload product route
router.post("/upload-product", authToken, uploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", updateProductController);
router.get("/get-category-product", getCategoryProduct);
router.post("/category-product", getAllCategoryProduct);
router.post("/product-details", getProductDetails)
router.post("/filter-product",filterProductController)

// user add to cart
router.post("/addToCart", authToken, addToCartController)
router.get("/cart-count", authToken, countCartProducts)
router.get("/view-cart-product", authToken, addToCartView)
router.post("/update-cart-product", authToken, updateAddToCartProduct)
router.post("/dalete-cart-product", authToken, deleteAddToCartProduct)
router.get("/search", searchProduct)

module.exports = router;
