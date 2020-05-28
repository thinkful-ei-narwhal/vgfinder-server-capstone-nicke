const express = require("express");
const authRouter = express.Router();
const jsonBodyParser = express.json();
const UserService = require("../services/user-services");

authRouter.post("/login", jsonBodyParser, (req, res, next) => {
  const { user_name, password } = req.body;
  const loginUser = { user_name, password };
  for (const [key, value] of Object.entries(loginUser)) {
    if (value == null) {
      return res.status(400).json({
        error: `Missing ${key} in request body`,
      });
    }
  }

  UserService.getUserWithUserName(req.app.get("db"), loginUser.user_name)
    .then((dbUser) => {
      if (!dbUser) {
        res.status(400).json({ error: "Incorrect user_name or password" });
      }

      //compare passwords //dbUser is hashed
      return UserService.comparePasswords(
        loginUser.password,
        dbUser.password
      ).then((compareMatch) => {
        if (!compareMatch) {
          return res
            .status(400)
            .json({ error: "Incorrect user_name or password" });
        }

        const subject = dbUser.user_name;
        const payload = { user_id: dbUser.id };
        res.send({
          authToken: UserService.createJwt(subject, payload),
        });
      });
    })
    .catch(next);
});

module.exports = authRouter;
