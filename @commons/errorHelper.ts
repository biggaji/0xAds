export enum ErrorCode {
  UNAUTHENTICATED="UNAUTHENTICATED",
  BAD_REQUEST="BAD_REQUEST",
  FORBIDDEN="FORBIDDEN",
  NOT_FOUND="NOT_FOUND",
  INTERNAL_SERVER_ERROR="INTERNAL_SERVER_ERROR",
  BAD_USER_INPUT="BAD_USER_INPUT"
}

type ErrorType = {
  message: string,
  extensions: ErrorExtensionType
}
type ErrorExtensionType = {
  [attr: string]: unknown
  code: ErrorCode
}

type ErrorReturnType = { message: string, code: string, success: boolean , argumentName?: unknown  }

/**
 * @class
 * @description Intercerpts and re-formats the error object into a clean readable response for the client and abstract away any internal error details
 */
export default class ErrorHelper {
  static ProcessError(error): ErrorReturnType {
    switch(error.extensions.code) {
      case ErrorCode.UNAUTHENTICATED:
      case ErrorCode.FORBIDDEN:
      case ErrorCode.NOT_FOUND:
      case ErrorCode.BAD_REQUEST:
        return {
          message: `${error.message}`,
          code: `${error.extensions.code}`,
          success: false
        };
      case ErrorCode.BAD_USER_INPUT:
        return {
          message: `${error.message}`,
          code: `${error.extensions.code}`,
          success: false,
          argumentName: error.extensions.argumentName
        } 
        // set any other error as internal server error
      default:
        return {
          message: `An error occurred on our server while processing your request, try again later`,
          code: `${error.extensions.code}`,
          success: false
        }
    }
  }
}

export class PrismaErrorHelper {
  constructor() {}

  static ProcessError(error:any) {

  } 
}