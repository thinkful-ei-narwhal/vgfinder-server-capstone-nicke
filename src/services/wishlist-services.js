const wishlistsTable = "vgfinder_wishlists";

const WishlistService = {
  getAllWishlists(db) {
    return db(wishlistsTable).select("*");
  },
  getWishlistedGamesByUser(db, user_id) {
    return db(wishlistsTable).select("*").where({ user_id });
  },
  addGameToUserWishlist(db, user_id, game_id) {
    return db.select("*").insert({ user_id, game_id }).into(wishlistsTable).returning("*").then(rows => {
      return rows[0];
    });
  },
  removeGameFromUserWishlist(db, user_id, game_id) {
    return db.select("*").from(wishlistsTable).where({ user_id, game_id }).delete();
  },
};

module.exports = WishlistService;