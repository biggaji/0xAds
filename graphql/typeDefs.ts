import { GraphQLError, GraphQLScalarType, Kind } from "graphql";

export const dateScalarType = new GraphQLScalarType({
  name: "DateTime",
  description: "A custom scalar type representing a date format",
  // converts the date from the back-end format to an int like date in seconds
  serialize(value) {
    if (value instanceof Date) {
      return value.getTime();
    } else {
      throw new GraphQLError("Date serializer expected a `DateTime` object");
    }
  },
    //This function is called when the DateTime type is used in argument as a scalar type and the value is hardcoded
  // converts the value to the back-end date format
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }
    return null;
  },
  //This function is called when the DateTime type is used in a variable as argument type
  // converts the value to the back-end date format
  parseValue(value) {
    if (typeof value === "number") {
      return new Date(value);
    } else {
      throw new GraphQLError("Date scalar parser expected a `number`")
    }
  }
});

const typeDefs = `#graphql
  "DateTime Custom Scalar Type"
  scalar DateTime

  "Ads Campaign Type"
  type AdCampaign { 
    id: ID!
    active: Boolean!
    dailyBudget: Int!
    currency: Currency!
    frequency: Frequency!
    objective: CampaignObjective!
    oxerId: String
    startDate: DateTime!
    endDate: DateTime!
    adsCopy: AdCopy!
    targetDelivery: AdTargetDelivery!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  "Ads Copy Type"
  type AdCopy {
    id: ID!
    mediaLink: String!
    type: AdCopyType!
    text: String!
    websiteUrl: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  "Ads TargetDelivery Type"
  type AdTargetDelivery {
    id: ID!
    gender: GenderGroup!
    ageGroup: AgeGroup!
    maxAge: Int!
    minAge: Int!
    keywords: [String]
    interests: [Interests]
    languages: [Languages]
    os: [Os]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  "Target Language Groups"
  enum Languages {
    ENGLISH,
    YORUBA,
    SPANISH
  }

  "Target Users Intrests"
  enum Interests {
    POLITICS,
    MUSIC,
    ARTS
  }

  "Target Operating System or Devices"
  enum Os {
    ANDRIOD,
    IOS,
    DESKTOP,
    MOBILE,
    ALL
  }

  "Ads Media type"
  enum AdCopyType {
    PHOTO,
    VIDEO
  }

  "Target Gender Group"
  enum GenderGroup {
    MALE,
    FEMALE,
    ANY
  }

  "Ads Campaign Objective"
  enum CampaignObjective {
    REACH,
    ENGAGEMENT,
    WEBSITE_TRAFFIC,
    APP_INSTALL
  }

  "Ads Display Frequency"
  enum Frequency {
    DAILY,
    WEEKLY,
    MONTHLY
  }

  "Accepted Currency Types"
  enum Currency {
    NGN,
    PRSH
  }

  "Target Age Group"
  enum AgeGroup {
    ALL,
    SELECT_AGE
  }

  "Input Types for creating Ad"
  input AdCampaignInput {
    dailyBudget: Int!
    currency: Currency!
    frequency: Frequency!
    objective: CampaignObjective!
    startDate: DateTime!
    endDate: DateTime!
  }

  "Input Type for Attaching the Ad Copy to the AdCampaign"
  input AdCopyInput {
    text: String!
    mediaLink: String!
    websiteUrl: String
    type: AdCopyType!
    campaignId: String!
  }

  "Input Type for Attaching the Ad Target to the AdCampaign"
  input AdTargetInput {
    gender: GenderGroup!
    ageGroup: AgeGroup!
    maxAge: Int
    minAge: Int
    keywords: [String]
    interests: [Interests]
    languages: [Languages]
    os: [Os]
    campaignId: String!
  }

  // Will later create an Interface that each response will extend to compily with DRY principle

  enum ErrorCode {
    UNAUTHORIZED,
    BAD_REQUEST,
    FORBIDDEN,
    NOT_FOUND,
    INTERNAL_SERVER_ERROR
  }

  "AdCampaign creation response"
  type CreateAdCampaignResponse {
    success: Boolean!
    code: ErrorCode!
    message: String!
    adCampaign: AdCampaign
  }

  "AdCopy creation response"
  type CreateAdCopyResponse {
    success: Boolean!
    code: ErrorCode!
    message: String!
    adCopy: AdCopy
  }

  "AdTarget creation response"
  type CreateAdTargetResponse {
    success: Boolean!
    code: ErrorCode!
    message: String!
    adTarget: AdTarget
  }

  type Query {
    fetchAdCampaign(campaignId: String!): AdCampaign!
    fetchAdCampaigns: [AdCampaign]!
  }

  type Mutation {
    createAdCampaign(adCampaignInput: AdCampaignInput): CreateAdCampaignResponse!
    createAdCampaignCopy(adCopyInput: AdCopyInput): CreateAdCopyResponse!
    createAdCampaignTarget(adTargetInput: AdTargetInput): CreateAdTargetResponse!
  }
`;

export default typeDefs;