function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'test-user-1',
      full_name: 'Test user 1',
      password: 'password',
    },
    {
      id: 2,
      user_name: 'test-user-2',
      full_name: 'Test user 2',
      password: 'password',
    },
    {
      id: 3,
      user_name: 'test-user-3',
      full_name: 'Test user 3',
      password: 'password',
    },
    {
      id: 4,
      user_name: 'test-user-4',
      full_name: 'Test user 4',
      password: 'password',

    },
  ]
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.into('vgfinder_users').insert(preppedUsers)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(
        `SELECT setval('vgfinder_users_id_seq', ?)`,
        [users[users.length - 1].id],
      )
    )
}


function makeGamesArray() {
  return [
    {
      id: 1,
      title: "dunderTale",
      description: "test decription",
      genre: "Action",
      rating: "3",
      release_date: "2029-01-22T16:28:32.615Z",
      developer: "Dunder studios",
      trailer_url: "http://placehold.it/500x500",
      image_url_box_art: "http://placehold.it/500x500",
      image_url_two: "http://placehold.it/500x500",
      image_url_three: "http://placehold.it/500x500",
      image_url_four: "http://placehold.it/500x500",
      image_url_five: "http://placehold.it/500x500"
    },
    {
      id: 2,
      title: "bumberDale",
      description: "test decription",
      genre: "Action",
      rating: "3",
      release_date: "2029-01-22T16:28:32.615Z",
      developer: "Dunder studios",
      trailer_url: "http://placehold.it/500x500",
      image_url_box_art: "http://placehold.it/500x500",
      image_url_two: "http://placehold.it/500x500",
      image_url_three: "http://placehold.it/500x500",
      image_url_four: "http://placehold.it/500x500",
      image_url_five: "http://placehold.it/500x500"
    },
    {
      id: 3,
      title: "lumberPale",
      description: "test decription",
      genre: "Action",
      rating: "3",
      release_date: "2029-01-22T16:28:32.615Z",
      developer: "Dunder studios",
      trailer_url: "http://placehold.it/500x500",
      image_url_box_art: "http://placehold.it/500x500",
      image_url_two: "http://placehold.it/500x500",
      image_url_three: "http://placehold.it/500x500",
      image_url_four: "http://placehold.it/500x500",
      image_url_five: "http://placehold.it/500x500"
    },
    {
      id: 4,
      title: "clumberGale",
      description: "test decription",
      genre: "Action",
      rating: "3",
      release_date: "2029-01-22T16:28:32.615Z",
      developer: "Dunder studios",
      trailer_url: "http://placehold.it/500x500",
      image_url_box_art: "http://placehold.it/500x500",
      image_url_two: "http://placehold.it/500x500",
      image_url_three: "http://placehold.it/500x500",
      image_url_four: "http://placehold.it/500x500",
      image_url_five: "http://placehold.it/500x500"
    },
  ]
}

function makeWishlistArray(users, games) {
  return [
    {
      id: 1,
      user_id: users[0].id,
      game_id: games[0].id
    },
    {
      id: 2,
      user_id: users[0].id,
      game_id: games[1].id
    },
    {
      id: 3,
      user_id: users[0].id,
      game_id: games[2].id
    },
    {
      id: 4,
      user_id: users[1].id,
      game_id: games[3].id
    },
    {
      id: 5,
      user_id: users[1].id,
      game_id: games[2].id
    },
    {
      id: 6,
      user_id: users[2].id,
      game_id: games[0].id
    },
    {
      id: 7,
      user_id: users[3].id,
      game_id: games[0].id
    },
  ];
}

function makeExpectedGame(game) {
  return {
    id: game.id,
    title: game.title,
    description: game.decription,
    genre: game.genre,
    rating: game.rating,
    release_date: game.release_date,
    developer: game.developer,
    trailer_url: game.trailer_url,
    image_url_box_art: game.image_url_box_art,
    image_url_two: game.image_url_two,
    image_url_three: game.image_url_three,
    image_url_four: game.image_url_four,
    image_url_five: game.image_url_five
  }
}


function makeMaliciousGame() {
  const maliciousGame = {
    id: 911,
    title: 'Naughty naughty very naughty <script>alert("xss");</script>',
    description: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
    genre: game.genre,
    rating: game.rating,
    release_date: game.release_date,
    developer: "malicious",
    trailer_url: 'http://placehold.it/500x500',
    image_url_box_art: 'http://placehold.it/500x500',
    image_url_two: 'http://placehold.it/500x500',
    image_url_three: 'http://placehold.it/500x500',
    image_url_four: 'http://placehold.it/500x500',
    image_url_five: 'http://placehold.it/500x500'
  }
  const expectedGame = {
    ...makeExpectedGame(maliciousGame),
    title: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    content: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
  }
  return {
    maliciousGame,
    expectedGame,
  }
}

function makeGamesFixtures() {
  const testUsers = makeUsersArray()
  const testGames = makeGamesArray()
  const testWishlists = makeWishlistArray(testUsers, testGames)
  return { testUsers, testGames, testWishlists }
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      vgfinder_wishlists,
      vgfinder_users,
      vgfinder_games
      RESTART IDENTITY CASCADE`
  )
}

function seedGamesTables(db, users, games, wishlists = []) {
  return db
    .into('vgfinder_users')
    .insert(users)
    .then(() =>
      db
        .into('vgfinder_games')
        .insert(games)
    )
    .then(() =>
      wishlist.length && db.into('vgfinder_wishlists').insert(wishlists)
    )
}

function seedMaliciousGame(db, user, game) {
  return db
    .into('vgfinder_users')
    .insert([user])
    .then(() =>
      db
        .into('vgfinder_games')
        .insert([game])
    )
}

module.exports = {
  makeUsersArray,
  makeGamesArray,
  makeWishlistArray,
  makeExpectedGame,
  makeMaliciousGame,
  seedUsers,
  makeGamesFixtures,
  cleanTables,
  seedGamesTables,
  seedMaliciousGame,
}
