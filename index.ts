/**
 * Setup env loader using dotenv package
 * use the package only in development
 */
import { config } from "dotenv";
if (process.env.NODE_ENV !== "production") {
  config();
};

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import resolvers from "./graphql/resolvers.js";
import typeDefs from "./graphql/typeDefs.js";
import ErrorHelper from "./@commons/errorHelper.js";
import { error } from "console";

const server = new ApolloServer({ typeDefs, resolvers,
  // use the formatError hook to modify error before it's sent back to the client
  formatError: (fmtError, origError) => {
    console.log(fmtError)
    return ErrorHelper.ProcessError(fmtError);
  }
});

const PORT = process.env.PORT as unknown as number;

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT }
});

console.log(`🚀  Server ready at: ${url}`);