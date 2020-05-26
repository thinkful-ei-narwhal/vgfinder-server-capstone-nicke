require("dotenv").config();

console.log("TESTING", process.env.SSL, process.env.DATABASE_URL);

module.exports = {
  "migrationsDirectory": "migrations",
  "driver": "pg",
  "connectionString": (process.env.NODE_ENV === "test") ? process.env.DATABASE_TEST_URL : process.env.DATABASE_URL,
  "ssl": !!process.env.SSL,
};