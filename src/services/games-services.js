const gamesTable = "vgfinder_games";
const xss = require("xss");

const GamesService = {
  getAllGames(db) {
    return db(gamesTable).select("*");
  },
  getGameById(db, id) {
    return db(gamesTable).select("*").where({ id }).first();
  },
  insertGame(db, gameObj) {
    return db.select("*").insert(gameObj).into(gamesTable).returning("*").then(rows => {
      return rows[0];
    });
  },
  removeGameById(db, id) {
    return db.select("*").from(gamesTable).where({ id }).delete();
  },
  serializeGames(games) {
    return games.map(game => this.serializeGame(game));
  },
  serializeGame(game) {
    return {
      id: game.id,
      title: xss(game.title),
      description: xss(game.description),
      genre: game.genre,
      rating: game.rating,
      release_date: game.release_date,
      developer: xss(game.developer),
      trailer_url: xss(game.trailer_url),
      image_url_box_art: xss(game.image_url_box_art),
      image_url_two: xss(game.image_url_two),
      image_url_three: xss(game.image_url_three),
      image_url_four: xss(game.image_url_four),
      image_url_five: xss(game.image_url_five)
    };
  },

};

module.exports = GamesService;