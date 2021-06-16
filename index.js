const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

// connect DB
mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoDB is connected"))
  .catch((error) => console.log(error));

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/user"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server is running "));
