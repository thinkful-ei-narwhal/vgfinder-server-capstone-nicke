const wishlistsTable = "vgfinder_wishlists";

const WishlistService = {
  getAllWishlists(db) {
    return db(wishlistsTable).select("*");
  },
  getWishlistById(db, id) {
    return db(wishlistsTable).select("*").where({ id }).first();
  },
  getWishlistedGamesByUser(db, user_id) {
    return db
      .select("vgfinder_games.*")
      .from(wishlistsTable)
      .join(
        "vgfinder_games",
        "vgfinder_wishlists.game_id",
        "=",
        "vgfinder_games.id"
      )
      .where({ user_id });
  },
  addGameToUserWishlist(db, wishlistObj) {
    return db
      .select("*")
      .insert(wishlistObj)
      .into(wishlistsTable)
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  removeGameFromUserWishlist(db, id) {
    return db.select("*").from(wishlistsTable).where({ id }).delete();
  },
  serializeWishlists(wishlists) {
    return wishlists.map((wishlist) => this.serializeWishlist(wishlist));
  },
  serializeWishlist(wishlist) {
    return {
      id: wishlist.id,
      user_id: wishlist.user_id,
      game_id: wishlist.game_id,
    };
  },
};

module.exports = WishlistService;
