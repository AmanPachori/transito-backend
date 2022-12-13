const router = require("express").Router();
const { VerifyToken } = require("../middleware/user.middleware");
const {
  SignupUser,
  SigninUser,
  Getme,
} = require("../controllers/user.controller");

const transactionDetails = require("../controllers/user.transactiondata")
router.post("/register", SignupUser);
router.post("/login", SigninUser);
router.get("/detail",VerifyToken,transactionDetails);
router.get("/view", VerifyToken, Getme);

module.exports = router;