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
import ErrorHelper, { ErrorCode } from "./@commons/errorHelper.js";
import { GraphQLError } from "graphql";
import { validateSharedAccessToken } from "./@commons/validateSharedAccessToken.js";
import { HydratedUser } from "./types/campaign.js";

const server = new ApolloServer({ typeDefs, resolvers,
  // use the formatError hook to modify error before it's sent back to the client
  formatError: (fmtError, origError: any) => {
    console.log(origError)
    return ErrorHelper.ProcessError(fmtError);
  }
});

const PORT = process.env.PORT as unknown as number || 3000;

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    const sharedAccessTokenHeader = req.headers.authorization;

    if (!sharedAccessTokenHeader) {
      return;
    }

    const sharedAccessToken = sharedAccessTokenHeader.split(" ")[1];
    const sharedAccessTokenPayload: any = await validateSharedAccessToken(sharedAccessToken);
    // validate token and return an Hydrated User Object
    const hydrateUser: HydratedUser = {
      id: sharedAccessTokenPayload.sub,
      firstName: sharedAccessTokenPayload.firstName,
      lastName: sharedAccessTokenPayload.lastName,
      email: sharedAccessTokenPayload.email
    };

    return hydrateUser;
  },
  listen: { port: PORT }
});

console.log(`🚀  Server ready at: ${url}`);