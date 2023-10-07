import passport from "passport";
import local from "passport-local";

import { userService } from "../services/services.js";

import { createHash } from "../utils.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, age } = req.body;

          const userExists = await userService.checkExistingUser(username);

          if (userExists) {
            console.log("User already exists");
            return done(null, false);
          }

          const newUser = {
            first_name,
            last_name,
            email: username,
            age,
            password: createHash(password),
          };

          const result = await userService.registerUser(newUser);

          return done(null, result);
        } catch (error) {
          return done(null, false);
        }
      }
    )
  );

};

export default initializePassport;
