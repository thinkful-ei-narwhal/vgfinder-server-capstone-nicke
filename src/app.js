const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const gamesRouter = require("./game/game-router");
const wishlistsRouter = require("./wishlist/wishlist-router");
const authRouter = require("./auth/auth-router");
const app = express();
const { NODE_ENV } = require("./config");
const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(cors());
app.use(helmet());
app.use(morgan(morganOption));
app.use("/api/wishlists", wishlistsRouter);
app.use("/api/games", gamesRouter);
app.use("/api/auth", authRouter);

// eslint-disable-next-line no-unused-vars
app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    // eslint-disable-next-line no-console
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500);
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});

module.exports = app;
