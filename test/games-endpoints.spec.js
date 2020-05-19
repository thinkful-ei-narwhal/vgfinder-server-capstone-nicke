const app = require("../src/app");
const knex = require("knex");
const helpers = require("./test-helpers");

//Note: None of these will work yet because you are not specifying authentication
describe("Games Endpoints", function () {
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

  describe("GET /api/games", () => {
    context("No games in the database", () => {
      it("responds with 200 and an empty list", () => {
        return supertest(app)
          .get("/api/games")
          .expect(200, []);
      });
    });

    context("Games in the database", () => {
      beforeEach("insert games", () => helpers.seedThingsTables(db, testUsers, testGames, testWishlists));

      it("responds with 200 and all of the games", () => {
        const expectedGames = testGames.map(game => helpers.makeExpectedGame(game));
        return supertest(app)
          .get("/api/games")
          .expect(200, expectedGames);
      });
    });

    context("Given an XSS attack game", () => {
      const testUser = helpers.makeUsersArray()[0];
      const { maliciousGame, expectedGame } = helpers.makeMaliciousGame(testUser);

      beforeEach("insert malicious game", () => {
        return helpers.seedMaliciousGame(db, testUser, maliciousGame);
      });

      it("removes XSS attack game", () => {
        return supertest(app)
          .get("/api/games")
          .expect(200)
          .expect(res => {
            expect(res.body[0].title).to.eql(expectedGame.title);
            expect(res.body[0].description).to.eql(expectedGame.description);
          });
      });
    });
  });

  // describe(`GET /api/games/:game_id`, () => {
  //   context(`Given no games`, () => {
  //     it(`responds with 404`, () => {
  //       const gameId = 123456
  //       return supertest(app).get(`/api/games/${gameId}`).expect(404, { error: `Game doesn't exist` })
  //     })
  //   })

  //   context('Given there are games in the database', () => {
  //     beforeEach('insert games', () => helpers.seedGamesTables(db, testUsers, testGames, testWishlists));

  //     it('responds with 200 and the specified game', () => {
  //       const gameId = 2;
  //       const expectedGame = helpers.makeExpectedGame(testGames[gameId - 1]);

  //       return supertest(app).get(`/api/games/${gameId}`).expect(200, expectedGame);
  //     });
  //   });

  //   //   context(`Given an XSS attack thing`, () => {
  //   //     const testUser = helpers.makeUsersArray()[1]
  //   //     const {
  //   //       maliciousThing,
  //   //       expectedThing,
  //   //     } = helpers.makeMaliciousThing(testUser)

  //   //     beforeEach('insert malicious thing', () => {
  //   //       return helpers.seedMaliciousThing(
  //   //         db,
  //   //         testUser,
  //   //         maliciousThing,
  //   //       )
  //   //     })

  //   //     it('removes XSS attack content', () => {
  //   //       return supertest(app)
  //   //         .get(`/api/things/${maliciousThing.id}`)
  //   //         .expect(200)
  //   //         .expect(res => {
  //   //           expect(res.body.title).to.eql(expectedThing.title)
  //   //           expect(res.body.content).to.eql(expectedThing.content)
  //   //         })
  //   //     })
  //   //   })
  //   // })

  //   // describe(`GET /api/things/:thing_id/reviews`, () => {
  //   //   context(`Given no things`, () => {
  //   //     it(`responds with 404`, () => {
  //   //       const thingId = 123456
  //   //       return supertest(app)
  //   //         .get(`/api/things/${thingId}/reviews`)
  //   //         .expect(404, { error: `Thing doesn't exist` })
  //   //     })
  //   //   })

  //   //   context('Given there are reviews for thing in the database', () => {
  //   //     beforeEach('insert things', () =>
  //   //       helpers.seedThingsTables(
  //   //         db,
  //   //         testUsers,
  //   //         testThings,
  //   //         testReviews,
  //   //       )
  //   //     )

  //   //     it('responds with 200 and the specified reviews', () => {
  //   //       const thingId = 1
  //   //       const expectedReviews = helpers.makeExpectedThingReviews(
  //   //         testUsers, thingId, testReviews
  //   //       )

  //   //       return supertest(app)
  //   //         .get(`/api/things/${thingId}/reviews`)
  //   //         .expect(200, expectedReviews)
  //   //     })
  //   //   })
  //   // })
});