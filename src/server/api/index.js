const express = require('express');
const router = express.Router();

router.use("/order", require("./Order"))
router.use("/user", require("./User"))
router.use("/wishlist", require("./Wishlist"))
router.use("/cart", require("./Cart"))
router.use("/watch", require("./Watch"))


module.exports = router;