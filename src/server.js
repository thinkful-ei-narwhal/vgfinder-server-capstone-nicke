const app = require("./app");
const { PORT } = require("./config");
const knex = require("knex");
const db = knex({
  client: "pg",
  connection: process.env.DATABASE_URL,
});

app.set("db", db);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://localhost:${PORT}`);
});
