const express = require("express");
const cors = require("cors");
// const colore = require("colors");
const fileUpload = require("express-fileupload");
const connectDB = require("./db/db");
const app = express();
require("dotenv").config();
const { errorHandler } = require("./middleware/errorHandler");

//middleware
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(express.json({ extended: false }));
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});
app.use(errorHandler);

// conncet database
connectDB();

const contentRoute = require("./routes/contentRoute");
const authRoute = require("./routes/authRoute");
const subscribeRoute = require("./routes/subscribeRoute");

//routes
app.use("/api", contentRoute);
app.use("/api", authRoute);
app.use("/api", subscribeRoute);

//server
const port = process.env.PORT || 1993;
const host = "0.0.0.0";
app.listen(port, host, () => {
  console.log(`App is running at port ${port}`);
});
