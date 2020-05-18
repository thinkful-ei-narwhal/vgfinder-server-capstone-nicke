CREATE TABLE vgfinder_images (
  id SERIAL PRIMARY KEY,
  game_id INTEGER REFERENCES vgfinder_games(id),
  image_url TEXT NOT NULL
);