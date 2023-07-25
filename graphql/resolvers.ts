import { dateScalarType } from "./typeDefs";

const resolvers = {
  Query: {
    user: () => {
      return "Hey 0xAds";
    },
  },
  DateTime: dateScalarType,
}

export default resolvers;