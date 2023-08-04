import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import { ErrorCode } from "./errorHelper.js";

export async function validateSharedAccessToken(token: string) {
  try {
    const tokenPayload = jwt.verify(token, process.env.OXHUT_AUTH_SERVER_SIGNING_KEY!);
    return tokenPayload;
  } catch (error: any) {
    if (error.name === "JsonWebTokenError") {
      throw new GraphQLError('Invalid or expired shared access token', {
        extensions: {
          code: ErrorCode.FORBIDDEN,
        }
      })
    }
    throw error;
  }
}