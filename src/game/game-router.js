const express = require("express");
const path = require("path");
const GamesService = require("./../services/games-services");
const { jwtAuth } = require("./../auth/jwt-auth");
const gamesRouter = express.Router();
const jsonBodyParser = express.json();

//public enpoint
gamesRouter
  .route("/")
  .get((req, res, next) => {
    GamesService.getAllGames(req.app.get("db"))
      .then((games) => {
        res.json(GamesService.serializeGames(games));
      })
      .catch(next);
  })
  //protected endpoint
  .post(jwtAuth, jsonBodyParser, (req, res, next) => {
    const {
      title,
      description,
      genre,
      rating,
      release_date,
      developer,
      trailer_url,
      image_url_box_art,
      image_url_two,
      image_url_three,
      image_url_four,
      image_url_five,
    } = req.body;

    if (!release_date.includes("Z")) {
      release_date += "Z";
    }

    const newGame = {
      title,
      description,
      genre,
      rating,
      release_date,
      developer,
      trailer_url,
      image_url_box_art,
      image_url_two,
      image_url_three,
      image_url_four,
      image_url_five,
    };

    for (const [key, value] of Object.entries(newGame)) {
      if (
        key === "title" ||
        key === "description" ||
        key === "genre" ||
        key === "rating" ||
        key === "developer" ||
        key === "trailer_url" ||
        key === "image_url_box_art"
      ) {
        if (!value) {
          return res.status(400).json({
            error: `Missing '${key}' in request body`,
          });
        }
      }
    }

    for (let [value] of Object.entries(newGame)) {
      if (typeof value === "undefined") {
        value = null;
      }
    }

    GamesService.insertGame(req.app.get("db"), newGame)
      .then((game) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${game.id}`))
          .json(GamesService.serializeGame(game));
      })
      .catch(next);
  });

gamesRouter
  .route("/:game_id")
  .all(checkGameExists)
  //public endpoint
  .get((req, res) => {
    GamesService.getGameById(
      req.app.get("db"),
      req.params.game_id
    ).then((game) => res.json(GamesService.serializeGame(game)));
  })
  //protected
  .delete(jwtAuth, (req, res, next) => {
    GamesService.removeGameById(req.app.get("db"), req.params.game_id)
      .then((game) =>
        res.status(204).json(GamesService.serializeGame(game)).end()
      ) //doesn't actually return anything
      .catch(next);
  });

/* async/await syntax for promises */
async function checkGameExists(req, res, next) {
  try {
    const game = await GamesService.getGameById(
      req.app.get("db"),
      req.params.game_id
    );
    if (!game)
      return res.status(404).json({
        error: `Game doesn't exist`,
      });
    res.game = game;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = gamesRouter;
