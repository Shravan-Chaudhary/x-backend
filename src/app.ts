import express, { Application } from "express";
import { globalErrorHandler } from "./common/middlewares/globalErrorHandler";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

async function initServer(): Promise<Application> {
    const app = express();
    app.use(express.json());

    const graphqlServer = new ApolloServer({
        typeDefs: `
            type Query {
                hello: String
            }
        `,
        resolvers: {
            Query: {
                hello: () => `Hello, from GraphQL!`,
            },
        },
    });

    await graphqlServer.start();

    app.use("/graphql", expressMiddleware(graphqlServer));
    app.use(globalErrorHandler);

    return app;
}

export default initServer;
