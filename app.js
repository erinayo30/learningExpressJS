const express = require("express");
const morgan = require("morgan");
const moviesRouter = require("./Routes/moviesRouter");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
let app = express();
let port = 3000;

const logger = function (req, res, next) {
  console.log("custom middleware call");
  next();
};

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("./public"));
app.use(logger);

app.use("/api/v1/movies", moviesRouter);
app.listen(port, () => {
  console.log("server has startrd ...");
});
