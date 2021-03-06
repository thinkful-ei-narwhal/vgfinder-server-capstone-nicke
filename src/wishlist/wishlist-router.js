const express = require("express");
const path = require("path");
const WishlistService = require("./../services/wishlist-services");
const GameService = require("./../services/games-services");
const UserServices = require("./../services/user-services");
const { jwtAuth } = require("./../auth/jwt-auth");
const wishlistsRouter = express.Router();
const jsonBodyParser = express.json();

wishlistsRouter
  .route("/")
  //unprotected
  .get((req, res, next) => {
    WishlistService.getAllWishlists(req.app.get("db"))
      .then((wishlists) => {
        res.json(WishlistService.serializeWishlists(wishlists));
      })
      .catch(next);
  });

wishlistsRouter
  .route("/users/:user_id")
  //unprotected
  .get(checkUserExists, checkWishlistItemExists, (req, res, next) => {
    WishlistService.getWishlistedGamesByUser(
      req.app.get("db"),
      req.params.user_id
    ).then((wishlist) => {
      if (!wishlist) {
        return res.sendStatus(404);
      }

      return res.status(200).json(GameService.serializeGames(wishlist));
    });
  })
  //protected
  .post(jwtAuth, jsonBodyParser, (req, res, next) => {
    const wishlistObj = {
      user_id: req.params.user_id,
      game_id: req.body.game_id,
    };
    for (const [key, value] of Object.entries(wishlistObj)) {
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`,
        });
    }

    GameService.getGameById(req.app.get("db"), wishlistObj.game_id).then(
      (game) => {
        if (!game)
          return res.status(404).json({
            error: `Game doesn't exist`,
          });
        res.game = game;

        WishlistService.addGameToUserWishlist(req.app.get("db"), wishlistObj)
          .then((wishlist) => {
            res
              .status(201)
              .location(path.posix.join(req.originalUrl, `/${wishlist.id}`))
              .json(WishlistService.serializeWishlist(wishlist));
          })
          .catch(next);
      }
    );
  });

wishlistsRouter
  .route("/:wishlist_id")
  //protected
  .delete(jwtAuth, checkWishlistItemExists, (req, res, next) => {
    WishlistService.removeGameFromUserWishlist(
      req.app.get("db"),
      req.params.wishlist_id
    )
      .then((wishlist) =>
        res.status(204).json(WishlistService.serializeWishlist(wishlist)).end()
      )
      .catch(next);
  });

/* async/await syntax for promises */
async function checkUserExists(req, res, next) {
  try {
    let user;
    if (req.params.user_id) {
      user = await UserServices.getUserWithId(
        req.app.get("db"),
        req.params.user_id
      );
    }

    if (!user) {
      return res.status(404).json({
        error: `User doesn't exist`,
      });
    }

    res.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

/* async/await syntax for promises */
async function checkWishlistItemExists(req, res, next) {
  try {
    let wishlist;
    if (req.params.user_id) {
      wishlist = await WishlistService.getWishlistedGamesByUser(
        req.app.get("db"),
        req.params.user_id
      );
    }
    if (req.params.wishlist_id) {
      wishlist = await WishlistService.getWishlistById(
        req.app.get("db"),
        req.params.wishlist_id
      );
    }

    if (!wishlist) {
      return res.status(404).json({
        error: `Wishlist doesn't exist`,
      });
    }

    res.wishlist = wishlist;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = wishlistsRouter;
