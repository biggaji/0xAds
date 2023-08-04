import axios from "axios";
import { GraphQLError } from "graphql";
import { ErrorCode } from "../@commons/errorHelper.js";

export default class AuthServiceProvider {
  constructor() {}

  async authenticateWith0xhutProvider(payload: { email: string, password: string}) {
    try {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!payload.email || payload.email === "" || !emailRegex.test(payload.email)) {
        throw new GraphQLError('Provide a valid login email address', {
          extensions: {
            code: ErrorCode.BAD_USER_INPUT,
            argumentName: 'email'
          }
        })
      }

      const authRequest = await axios.post(`${process.env.OXHUT_URL}/server/sat/issue`, {
        email: payload.email, password: payload.password
      }, {headers: {
        'Content-Type': 'application/json',
        'X-Signing-K': process.env.OXHUT_AUTH_SERVER_SIGNING_KEY
      }});

      return { sharedAccessToken: authRequest.data.sharedAccessToken };
    } catch (error:any) {
      if (error.name === "AxiosError") {
        throw new GraphQLError('Invalid credentials', {
          extensions: {
            code: ErrorCode.BAD_REQUEST,
          }
        })
      }
      throw error;
    }
  }
}