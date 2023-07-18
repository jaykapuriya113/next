import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import resolvers from './resolvers/AnimalResolver';
const prisma = new PrismaClient();

const typeDefs = gql`
  type Animal {
    id: Int
    name: String
    height: Int
    width: Int
  }

  type Mutation {
    createAnimal(name: String, height: Int, width: Int): Animal
    updateAnimal(id: Int, name: String, height: Int, width: Int): Animal
    deleteAnimal(id: Int): Animal
  }
  type Query {
    animals: [Animal]
    animalsByHeight(height: Int!): [Animal]
  }
  
`;


async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { prisma },
  });

  await server.start();

  server.applyMiddleware({ app });

  const port = 4000;
  app.listen({ port }, () => {
    console.log(`Server running on http://localhost:${port}/graphql`);
  });
}

startServer().catch((error) => {
  console.error('Error starting the server:', error);
});
