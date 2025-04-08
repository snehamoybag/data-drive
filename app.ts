import "dotenv/config";
import express from "express";
import session from "./configs/session.config";
import path from "path";

import indexRoute from "./routes/index.route";
import loginRoute from "./routes/login.route";
import signupRoute from "./routes/signup.route";
import successRoute from "./routes/success.route";

const app = express();

// SET VIEW ENGINE
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// SET FOLDER TO SERVE STATIC FILES FROM
app.use(express.static("public"));

// SET SESSION MIDDLEWARES
app.use(session);

// BODY PARSERS
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.use("/", indexRoute);
app.use("/login", loginRoute);
app.use("/signup", signupRoute);
app.use("/success", successRoute);

// SERVER
const PORT = Number(process.env.SEVER_PORT) || 3000;
const HOST = process.env.SERVER_HOST || "localhost";

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
