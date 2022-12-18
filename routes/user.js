const router = require("express").Router();
const { VerifyToken } = require("../middleware/user.middleware");
const {
  SignupUser,
  SigninUser,
  Getme,
  updateUser
} = require("../controllers/user.controller");

const transactionDetails = require("../controllers/user.transactiondata")
router.post("/register", SignupUser);
router.post("/login", SigninUser);
router.put("/update/:id",updateUser);
router.get("/detail",VerifyToken,transactionDetails);
router.get("/view/:id", Getme);

module.exports = router;