BEGIN;

INSERT INTO vgfinder_users (user_name, full_name, password)
VALUES
  ('dunder', 'Dunder Mifflin', '$2a$12$Sg0seJsOIuQMwQ4sTlsWHeq73HJZKzBfjdP2f0kh7WFwmv5yant8S');

INSERT INTO vgfinder_games (title, description, genre, rating, developer, trailer_url)
VALUES
  ('UnderTale', 'UNDERTALE! The RPG game where you dont have to destroy anyone.', 'RPG', 5, 'Toby Fox', 'https://www.youtube.com/watch?v=1Hojv0m3TqA&ab_channel=FwugRadiation'),
  ('Return of the Obra Dinn', 'Return of the Obra Dinn is a first-person mystery adventure based on exploration and logical deduction.', 'Mystery', 5,'Lucas Pope', 'https://www.youtube.com/watch?v=ILolesm8kFY&ab_channel=dukope1'),
  ('Hollow Knight', 'Forge your own path in Hollow Knight! An epic action adventure through a vast ruined kingdom of insects and heroes. Explore twisting caverns, battle tainted creatures and befriend bizarre bugs, all in a classic, hand-drawn 2D style.', 'Adventure', 4, 'Team Cherry', 'https://www.youtube.com/watch?v=UAO2urG23S4&ab_channel=TeamCherry');

INSERT INTO vgfinder_wishlists (user_id, game_id)
VALUES
  (1, 1),
  (1,2),
  (1,3);

INSERT INTO vgfinder_images (game_id, image_url)
VALUES
  (1,'https://steamuserimages-a.akamaihd.net/ugc/931555591993873963/4DED768130CAE4CA09576986B62756365A16696D/'),
  (2,'https://steamcdn-a.akamaihd.net/steam/apps/653530/ss_996fca2ef1e1f9cf16fd71f06c00919a61b1a2cc.1920x1080.jpg?t=1581420578'),
  (2,'https://obradinn.com/img/shots/People-01.png'),
  (3,'https://steamcdn-a.akamaihd.net/steam/apps/367520/capsule_616x353.jpg?t=1577747500'),
  (3,'https://hollowknight.com/wp-content/uploads/2018/09/false_knight.jpg'),
  (3,'https://i.pinimg.com/originals/35/b6/1e/35b61ecc72dc845891b779b6e6ce79bd.jpg');

COMMIT;