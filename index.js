require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser')
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const URI = process.env.ATLAS_URL;
const PORT = process.env.PORT || 8000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());
app.use(cors());

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

const User = require("./routes/user"); 

app.use("/user",User);


const connection = mongoose.connection;
connection.once("open", () => {
  console.log("connection conected to mongo DB");
});
