module.exports = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV === "production" ? "tiny" : "common",
  API_TOKEN: process.env.API_TOKEN,
};  