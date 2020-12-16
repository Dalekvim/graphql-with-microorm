import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";

(async () => {
  const orm = await MikroORM.init(microConfig);

  const posts = await orm.em.find(Post, {});
  console.log(posts);

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false
    }),
    context: () => ({ em: orm.em })
  });

  apolloServer.applyMiddleware({ app });

  app.get("/", (_req, res) => {
    res.send({ posts: posts });
  });

  const port = 4000;
  app.listen(port, () => {
    console.log(`Server started on localhost: ${port}`);
  });
})();
