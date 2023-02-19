const typeDefs = `#graphql
  type User {
    name: String
  }

  type Query {
    user: String
  }

 type Campaign { 
  id: ID!
  active: Boolean!
  budget: Int!
  currency: Currency!
  frequency: Frequency!
  objective: Campaign_objective!
  oxer_id: String
  start_date: String
  end_date: String
  ads_copy: AdsCopy
  target_delivery: AdsTargetDelivery
  created_at: String
  updated_at: String
}

type AdsCopy {
  id: ID!
  medias: [String]!
  type: Ad_copy_type!
  text: String!
  campaign_id: String!
  created_at: String
  updated_at: String
}

type AdsTargetDelivery {
  id: ID!
  gender: Gender_group!
  age_group: Age_group!
  max_age: Int!
  min_age: Int!
  locations: [Locations]
  keywords: [String]
  interests: [Interests]
  languages: [Languages]
  os: [Os]
  campaign_id: String!
  created_at: String
  updated_at: String
}

enum Languages {
  EN,
  YR
}

enum Locations {
  US,
  NG
}

enum Interests {
  POLITICS,
  MUSIC,
  ARTS
}

enum Os {
  ANDRIOD,
  IOS,
  DESKTOP,
  MOBILE_DEVICES,
  ALL
}

enum Ad_copy_type {
  PHOTO,
  VIDEO
}

enum Gender_group {
  MALE,
  FEMALE,
  ALL
}

enum Campaign_objective {
  REACH,
  ENGAGEMENT,
  WEBSITE_TRAFFIC,
  APP_INSTALL
}

enum Frequency {
  DAILY,
  WEEKLY,
  MONTHLY
}

enum Currency {
  NGN,
  PRSH
}

enum Age_group {
  ALL,
  SELECT_AGE
}
`;

export default typeDefs;