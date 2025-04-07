import "dotenv/config";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import expressSession from "express-session";
import prisma from "./prisma.config";

const store = new PrismaSessionStore(prisma, {
  checkPeriod: 2 * 60 * 1000, // 2 mins
  dbRecordIdIsSessionId: true,
  dbRecordIdFunction: undefined,
});

export default expressSession({
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
  secret: process.env.SESSION_KEY || "a santa at nasa",
  resave: true,
  saveUninitialized: true,
  store,
});
