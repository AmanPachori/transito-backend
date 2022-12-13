const axios = require("axios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");

const transactionDetails = asyncHandler(async (req, res) => {
     token = req.headers.authorization.split(" ")[1];
   const decoded = jwt.verify(token, process.env.SECRET_KEY);
   const user = await User.findById(decoded.id).select("-password");
   const address =  user.address.toString();
  let data = JSON.stringify({
    "jsonrpc": "2.0",
    "id": 0,
    "method": "alchemy_getAssetTransfers",
    "params": [
      {
        "fromBlock": "0x0",
        "toAddress": `${address}`,
       "category": ["external", "internal", "erc20", "erc721", "erc1155"],
      }
    ]
  });
  
  
    var requestOptions = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: data,
    };
  
    const apiKey = "maHeTPZbcgUvDgK6L6t96rzqlO4kDN43"
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`;
    const axiosURL = `${baseURL}`;
  
    axios(axiosURL, requestOptions)
      .then(response => {
        res.status(200).send({
                success:true,
                message:"transaction displayed succesfully",
                numberOfTransaction : response.data.result.transfers.length,
                transaction : response.data.result.transfers,
              });
      })
      .catch(error => res.status(400).send({
        success:false,
        message:'transaction displayed unsuccesfully!',
        error:'Error'+error,
      }));
      
});

module.exports=  transactionDetails ;