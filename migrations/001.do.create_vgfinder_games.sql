CREATE TYPE genre_types AS ENUM (
    'Action',
    'Adventure',
    'Simulation',
    'Strategy',
    'RPG',
    'Sports',
    'Horror',
    'FPS',
    'Third Person',
    'Point And Click',
    'Mystery',
    'RTS',
    'Puzzle'
);

CREATE TABLE vgfinder_games (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  genre genre_types NOT NULL,
  rating NUMERIC(4,2) NOT NULL,
  release_date TIMESTAMPTZ DEFAULT now() NOT NULL,
  developer TEXT NOT NULL,
  trailer_url TEXT NOT NULL
);