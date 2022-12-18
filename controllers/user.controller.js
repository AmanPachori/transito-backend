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
      .catch((err) => res.status(400).json({
        success:false,
        message:'user register unsuccessfull!',
      }));
  }
});

const SigninUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email)
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
    });
  }
});

const genrateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "10d",
  });
};
const updateUser = asyncHandler (async (req, res)=>{
  const id = req.params.id;
  const {username, address,image} = req.body;
  const myQuery = {_id:id}
  const myopertn = {$set : {username:username,address:address, image :image}}
  User.updateOne(myQuery, myopertn)
    .then(() => {
      res.status(200).json({
        success: true,
        message: "User data updated Successfully",
      });
    })
    .catch((err) => res.status(400).json(
      {
        success:false,
        message: 'Caught some error'
      }
     ));
})
const Getme = asyncHandler(async (req, res) => {
  const id = req.params.id;
  User.findOne({_id:id})
  .then((re)=>{
    res.status(200).json({
      success:true,
      message: 'User data displayed successfully',
      data : re
    })
  })
   .catch((err) => res.status(400).json(
    {
      success:false,
      message: 'User not Found or Caught some error'
    }
   ));
});
module.exports = { SignupUser, SigninUser, Getme,updateUser };