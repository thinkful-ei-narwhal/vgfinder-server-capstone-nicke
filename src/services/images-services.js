//Deprecated
// const imagesTable = "vgfinder_images";

// const ImagesService = {
//   getAllImages(db) {
//     return db(imagesTable).select("*");
//   },
//   getImageById(db, id) {
//     return db(imagesTable).select("*").where({ id }).first();
//   },
//   getImagesByGameId(db, game_id) {
//     return db(imagesTable).select("*").where({ game_id });
//   },
//   insertImage(db, game_id, imageURL) {
//     return db.select("*").insert({ game_id, imageURL }).into(imagesTable).returning("*").then(rows => {
//       return rows[0];
//     });
//   },
//   removeImageById(db, id) {
//     return db.select("*").from(imagesTable).where({ id }).delete();
//   },
// };

// module.exports = ImagesService;