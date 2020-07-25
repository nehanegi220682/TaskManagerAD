require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My Routes
const authRoutes = require("./routes/authentication");
const userRoutes = require("./routes/user");
const todoRoutes = require("./routes/todo");
//DB CONNECTION
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//MIDDLEWARES
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//ROUTES
app.use("/api", authRoutes); //prefexing all authentication roues with /api
app.use("/api", userRoutes);
app.use("/api", todoRoutes);

//PORT
const port = process.env.Port || 8000;

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
