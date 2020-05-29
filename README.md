# Application
VGFinder

# Links
You can find the live site here:
https://vgfinder.now.sh/

The back end can be contacted through this api:
https://calm-chamber-73050.herokuapp.com/api/

# How to use the API
The api for this project lets you perform GET, POST, and DELETE requests to fetch from and contribute to the users, wishlists, and games databases
Here are some examples of how to use the API:

  /api/auth/login
 (Unprotected Endpoint)POST https://calm-chamber-73050.herokuapp.com/api/auth/login  > Returns a bearer authentication token for the user
	Example request body: 
	{
		"user_name":"dunder",
		"password":"password"
	}
	
  /api/games
 (Unprotected Endpoint)GET https://calm-chamber-73050.herokuapp.com/api/games > fetches all games in the database
 
 (Unprotected Endpoint)GET https://calm-chamber-73050.herokuapp.com/api/games/<game_id> > fetches the specified game from the database
 
 (Protected Endpoint) POST https://calm-chamber-73050.herokuapp.com/api/games > posts a game to the database
 	Example request body: 
	{
		"user_name":"dunder",
		"password":"password"
	}
	
 (Protected Endpoint) DELETE http://localhost:8000/api/games/<game_id> > Deletes the target game from the database

 /api/wishlists
 (Unprotected Endpoint) GET https://calm-chamber-73050.herokuapp.com/api/wishlists ? Gets all wishlisted games for each user
 
 (Protected Endpoint) DELETE https://calm-chamber-73050.herokuapp.com/api/wishlists/<wishlist_id> > Removes a game from a user's wishlist

 
 /api/wishlists/users
 (Unprotected Endpoint)GET https://calm-chamber-73050.herokuapp.com/api/wishlists/users/<user_id> > Gets a wishlisted game for the specified user
 
 (Protected Endpoint) POST https://calm-chamber-73050.herokuapp.com/api/wishlists/users/<user_id> > Adds a game to the user wishlist
 
# Screen shots


# Summary
VGFinder recommends new indie video game titles for gamers looking to find their new favorite game.
Users can log into the site, browse recommended games, and make wishlist of titles that they are excited to try out.
If you are an indie game enthusiast yourself and know of a game that isn't in the database, you can contribute to the database or delete games that aren't Indie enough to be here.
 
# Technologies used
This project was completed with the following technologies:
1. Node
2. Express
3. PostgreSQL
4. Mocha
5. Chai

## Development Set up
Complete the following steps to use this project VGFinder:

1. Clone this repository to your local machine `git clone NEW-PROJECTS-URL NEW-PROJECTS-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`

## Scripts
Start the application `npm start`
Start nodemon for the application `npm run dev`
Run the tests `npm test`

## Deploying
When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.