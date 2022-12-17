const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const SignupUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
   
   console.log(username);
  if (!username && !email && !password) {
    res.json("Please enter the required field");
  }
  const UserExist = await User.findOne({ email });
  if (UserExist) {
    res.json("User Already Exist");
  } else {
    const salt = await bcrypt.genSalt(10);
    const Hashedpassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: Hashedpassword,
    });
    user
    .save()
    .then(() =>
        res.status(200).send({
           success:true,
           message:'user register succesfully!',
          _id: user.id,
          token: genrateToken(user._id),
        }),
        console.log(user)
      )
      .catch((err) => res.status(400).json("Error :" + err));
  }
});

const SigninUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      success:true,
      message:'user login succesfull!',
      _id: user.id,
      token: genrateToken(user._id),
    });
  } else {
    res.status(400).json({
      success:false,
      message:'user login unsuccessfull!',
      _id: user.id,
      token: genrateToken(user._id),
    });
  }
});

const genrateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "10d",
  });
};

const Getme = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});
module.exports = { SignupUser, SigninUser, Getme };