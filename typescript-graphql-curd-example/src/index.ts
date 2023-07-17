// import "reflect-metadata";
// import { createConnection, getConnectionOptions } from "typeorm";
// import express from "express";
// import { ApolloServer } from "apollo-server-express";
// import { buildSchema } from "type-graphql";
// import { HelloWorldResolver } from "./resolvers/HelloWorldResolver";
// import { MovieResolver } from "./resolvers/MovieResolver";

// (async () => {
//   const app = express();

//   const options = await getConnectionOptions(
//     process.env.NODE_ENV || "development"
//   );
//   await createConnection({ ...options, name: "default" });

//   const apolloServer = new ApolloServer({
//     schema: await buildSchema({
//       resolvers: [HelloWorldResolver, MovieResolver],
//       validate: false
//     }),
//     context: ({ req, res }) => ({ req, res })
//   });

//   apolloServer.applyMiddleware({ app, cors: true });
//   const port = process.env.PORT || 4000;
//   app.listen(port, () => {
//     console.log(`server started at http://localhost:${port}/graphql`);
//   });
// })();
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import express from "express";
import { MovieResolver } from "./resolvers/MovieResolver";

async function startServer() {
  const app = express();

  const schema = await buildSchema({
    resolvers: [MovieResolver],
    validate: false
  });

  const server = new ApolloServer({ schema });

  server.applyMiddleware({ app });

  const port = 4000;
  app.listen({ port }, () => {
    console.log(`Server running on http://localhost:${port}/graphql`);
  });
}

startServer();
