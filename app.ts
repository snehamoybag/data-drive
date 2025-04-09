import "dotenv/config";
import express from "express";
import session from "./configs/session.config";
import path from "path";

import indexRoute from "./routes/index.route";
import signupRoute from "./routes/signup.route";
import loginRoute from "./routes/login.route";
import logoutRoute from "./routes/logout.route";
import successRoute from "./routes/success.route";
import errorRequestHandler from "./middlewares/error-request-handler.middleware";
import handler404 from "./middlewares/404-handler.middleware";
import passport from "./configs/passport.config";

const app = express();

// SET VIEW ENGINE
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// SET FOLDER TO SERVE STATIC FILES FROM
app.use(express.static("public"));

// SET SESSION MIDDLEWARES
app.use(session);
app.use(passport.session());

// BODY PARSERS
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.use("/", indexRoute);
app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/logout", logoutRoute);
app.use("/success", successRoute);

// REQUEST ERROR HANDLER
app.use(errorRequestHandler);

// 404 HANDLER
app.use(handler404);

// SERVER
const PORT = Number(process.env.SEVER_PORT) || 3000;
const HOST = process.env.SERVER_HOST || "localhost";

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
