CREATE TABLE vgfinder_wishlists (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES vgfinder_users(id),
  game_id INTEGER REFERENCES vgfinder_games(id)
);