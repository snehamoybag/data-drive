import { Passport } from "passport";
import {
  Strategy as LocalStrategy,
  VerifyFunction,
  IStrategyOptions,
} from "passport-local";
import prisma from "./prisma.config";
import bcrypt from "bcryptjs";

const passport = new Passport();

const customFields: IStrategyOptions = {
  usernameField: "email",
  passwordField: "password",
};

const verifyCB: VerifyFunction = async (email, password, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return done(null, false, { message: "Email is not registered." });
    }

    const isPasswordMatching = await bcrypt.compare(
      password,
      user.passwordHash,
    );

    if (!isPasswordMatching) {
      return done(null, false, { message: "Incorrect password." });
    }

    return done(null, user);
  } catch (err) {
    if (err instanceof Error) {
      return done(err);
    }

    return done(new Error("Unknown Error."));
  }
};

passport.use(new LocalStrategy(customFields, verifyCB));

// stores the id of the user in the session after successful authentication
// make sure passport.session() is being used in app.ts for it to work
passport.serializeUser((user, done) => {
  // process.nextTick() makes the callback asynchronous but calls it immediately after all currently running tasks
  // means the callback is run, before any ohter async task
  // reason to use?
  // as the deserialize function takes an async cb, making serializeUser cb also async, helps prevent any kind of 'Zalgo' behaviours.
  process.nextTick(() => done(null, user.id));
});

// fetches the full user object from data base using the user.id we stored earlier in the serialize method
passport.deserializeUser(async (userId, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: String(userId) },
    });

    if (!user) {
      new Error(`User with ID ${userId}, doesn't exist in database.`);
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

export default passport;
