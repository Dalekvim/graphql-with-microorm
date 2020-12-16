import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { config } from "dotenv";

config();

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+d+\.[tj]s$/
  },
  entities: [Post],
  dbName: "lireddit",
  type: "mongo",
  clientUrl: process.env.MONGO_URI,
  debug: !__prod__
} as Parameters<typeof MikroORM.init>[0];
