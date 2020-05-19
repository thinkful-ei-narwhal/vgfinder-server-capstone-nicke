const app = require("../src/app");
const knex = require("knex");
const helpers = require("./test-helpers");

describe("wishlist Endpoints", function () {
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

  describe("GET /api/wishlists", () => {
    context("No games or users in the database", () => {
      it("responds with 200 and an empty list", () => {
        return supertest(app)
          .get("/api/wishlists")
          .expect(200, []);
      });
    });

    context("Wishlists in the database", () => {
      beforeEach("insert wishlists", () => helpers.seedGamesTables(db, testUsers, testGames, testWishlists));

      it("responds with 200 and all of the wishlists", () => {
        const expectedWishlist = testWishlists.map(wishlist => helpers.makeExpectedWishlist(wishlist));
        return supertest(app).get("/api/wishlists").expect(200, expectedWishlist);
      });
    });
  });

  describe("GET /api/wishlists/users/:user_id", () => {
    context("Given no users", () => {
      it("responds with 404", () => {
        const userId = 123456;
        return supertest(app)
          .get(`/api/wishlists/users/${userId}`)
          .expect(404, { error: "Wishlist doesn't exist" });
      });
    });

    context("Given there are wishlists in the database", () => {
      beforeEach("insert games", () => helpers.seedGamesTables(db, testUsers, testGames, testWishlists));
      const makeExpectedGamesForWishlist = helpers.makeExpectedGamesForUserWishlist(testUsers[0], testGames, testWishlists);

      it("responds with 200 and the specified wishlists", () => {
        const userId = 1;
        return supertest(app)
          .get(`/api/wishlists/users/${userId}`)
          .expect(200, makeExpectedGamesForWishlist);
      });
    });
  });

  describe("Protected endpoints", () => {
    beforeEach("seed users", () => helpers.seedGamesTables(db, testUsers, testGames, testWishlists));

    it("creates a wishlist item for a user, responding with 201", function () {
      return supertest(app).post("/api/wishlists/users/1").set("Authorization", helpers.makeAuthHeader(testUsers[0]))
        .send({ game_id: testWishlists[0].game_id }).expect(201);
    });

    it("deletes an existing wishlist item, responding with 204", function () {
      return supertest(app).delete(`/api/games/${testGames[0].id}`).set("Authorization", helpers.makeAuthHeader(testUsers[0])).expect(204);
    });
  });
});