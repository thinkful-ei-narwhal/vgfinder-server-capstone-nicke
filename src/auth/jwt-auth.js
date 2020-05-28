const UserService = require("../services/user-services");

function jwtAuth(req, res, next) {
  const authToken = req.get("Authorization") || "";
  let bearerToken;
  let payload;
  if (!authToken.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({ error: "Missing bearer token" });
  } else {
    bearerToken = authToken.split(" ")[1];
  }

  try {
    payload = UserService.verifyJwt(bearerToken);
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized request" });
  }

  UserService.getUserWithUserName(req.app.get("db"), payload.sub)
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Unauthorized request" });
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      next(err);
    });
}

module.exports = { jwtAuth };
