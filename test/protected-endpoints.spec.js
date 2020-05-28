const app = require("../src/app");
const knex = require("knex");
const helpers = require("./test-helpers");

describe("Authorization Endpoints", function () {
  let db;
  const { testUsers, testGames, testWishlists } = helpers.makeGamesFixtures();

  before("Create knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.DATABASE_TEST_URL,
    });
    app.set("db", db);
  });
  before("cleanup", () => helpers.cleanTables(db));
  after("disconnect from db", () => db.destroy());
  afterEach("cleanup", () => helpers.cleanTables(db));

  const protectedEndpoints = [
    {
      name: "POST /api/games",
      path: "/api/games",
    },
    {
      name: "POST /api/wishlists/users/:user_id",
      path: "/api/wishlists/users/1",
    },
    {
      name: "DELETE /api/games/:game_id",
      path: "/api/games/1",
    },
    {
      name: "DELETE /api/wishlists/:wishlist_id",
      path: "/api/wishlists/1",
    },
  ];

  describe("Protected endpoints", () => {
    protectedEndpoints.forEach((endpoint) => {
      describe(endpoint.name, () => {
        beforeEach("insert game", () =>
          helpers.seedGamesTables(db, testUsers, testGames, testWishlists)
        );
        if (endpoint.name.includes("POST")) {
          it("responds 401 'Missing bearer token' when no bearer token", () => {
            return supertest(app)
              .post(endpoint.path)
              .expect(401, { error: "Missing bearer token" });
          });

          it("responds 401 'Unauthorized request' when invalid JWT Token", () => {
            const validUser = testUsers[0];
            const invalidSecret = "bad-secret";
            return supertest(app)
              .post(endpoint.path)
              .set(
                "Authorization",
                helpers.makeAuthHeader(validUser, invalidSecret)
              )
              .expect(401, { error: "Unauthorized request" });
          });

          it("responds 401 'Unauthorized request' when invalid sub in payload", () => {
            const invalidUser = { user_name: "user-not-existy", id: 1 };
            return supertest(app)
              .post(endpoint.path)
              .set("Authorization", helpers.makeAuthHeader(invalidUser))
              .expect(401, { error: "Unauthorized request" });
          });
        }

        if (endpoint.name.includes("DELETE")) {
          it("responds 401 'Missing bearer token' when no bearer token", () => {
            return supertest(app)
              .delete(endpoint.path)
              .expect(401, { error: "Missing bearer token" });
          });

          it("responds 401 'Unauthorized request' when invalid JWT secret", () => {
            const validUser = testUsers[0];
            const invalidSecret = "bad-secret";
            return supertest(app)
              .delete(endpoint.path)
              .set(
                "Authorization",
                helpers.makeAuthHeader(validUser, invalidSecret)
              )
              .expect(401, { error: "Unauthorized request" });
          });

          it("responds 401 'Unauthorized request' when invalid sub in payload", () => {
            const invalidUser = { user_name: "user-not-existy", id: 1 };
            return supertest(app)
              .delete(endpoint.path)
              .set("Authorization", helpers.makeAuthHeader(invalidUser))
              .expect(401, { error: "Unauthorized request" });
          });
        }
      });
    });
  });
});
