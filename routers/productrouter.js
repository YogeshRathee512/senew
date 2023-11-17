const router = require("express").Router();
const postController = require("../controllers/productController");
const requireUser = require("../middleware/requireUser");
router.post("/add", requireUser, postController.addNewProducts);

module.exports = router;
