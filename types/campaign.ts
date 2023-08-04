type AdCampaign = {
  id: string,
  active: boolean,
  dailyBudget: number,
  currency: Currency,
  frequency: Frequency,
  objective: CampaignObjective,
  oxerId: string,
  startDate: Date,
  endDate: Date,
  adsCopy: AdCopy,
  targetDelivery: AdTargetDelivery,
  createdAt: Date,
  updatedAt: Date
}

type AdCopy = {
  id: string,
  mediaLink: string
  type: AdCopyType,
  websiteUrl?: string,
  text: string,
  createdAt: Date,
  updatedAt: Date,
}

type AdTargetDelivery = {
  id: string,
  gender: GenderGroup,
  ageGroup: AgeGroup,
  maxAge?: number,
  minAge?: number,
  interests?: Interests[],
  languages?: Languages[],
  os?: Os[],
  createdAt: Date,
  updatedAt: Date,
}

interface AdCampaignInput {
  dailyBudget: number,
  currency: Currency,
  frequency: Frequency,
  objective: CampaignObjective,
  startDate: string,
  endDate: string
}

type AdCopyInput = {
  text: string,
  mediaLink: string,
  websiteUrl?: string,
  type: AdCopyType,
  campaignId: string,
}

type AdTargetInput = {
  gender: GenderGroup,
  ageGroup: AgeGroup,
  maxAge: number,
  minAge: number
  interests?: Interests[],
  languages?: Languages[],
  os: Os[],
  campaignId: string
}

interface UpdateAdCampaignInput {
  dailyBudget?: number,
  currency?: Currency,
  frequency?: Frequency,
  objective?: CampaignObjective,
  startDate?: string,
  endDate?: string,
  campaignId: string
}

type UpdateAdCopyInput = {
  text?: string,
  mediaLink?: string,
  websiteUrl?: string,
  type?: AdCopyType,
  campaignId: string
}

type UpdateAdTargetInput = {
  gender?: GenderGroup,
  ageGroup?: AgeGroup,
  maxAge?: number,
  minAge?: number
  interests?: Interests[],
  languages?: Languages[],
  os?: Os[],
  campaignId: string
}

type CampaignQueryCriterial = {
  gender?: GenderGroup,
  maxAge?: number,
  minAge?: number,
  interests?: Interests[],
  languages?: Languages[],
  os: Os[],
}

type HydratedUser = {
  id: any,
  email: string,
  firstName: string,
  lastName: string
}

enum Currency {
  PRSH="PRSH",
  NGN="NGN"
}

enum Frequency {
  DAILY="DAILY",
  WEEKLY="WEEKLY",
  MONTHLY="MONTHLY"
}

enum CampaignObjective {
  REACH="REACH",
  ENGAGEMENT="ENGAGEMENT",
  WEBSITE_TRAFFIC="WEBSITE_TRAFFIC",
  APP_INSTALL="APP_INSTALL"
}

enum Languages {
  ENGLISH="ENGLISH",
  YORUBA="YORUBA",
  SPANISH="SPANISH"
}

enum Interests {
  POLITICS="POLITICS",
  MUSIC="MUSIC",
  ARTS="ARTS"
}

enum Os {
  ANDRIOD="ANDRIOD",
  IOS="IOS",
  DESKTOP="DESKTOP",
  MOBILE="MOBILE",
  ALL="ALL"
}

enum AdCopyType {
  PHOTO="PHOTO",
  VIDEO="VIDEO"
}

enum GenderGroup {
  MALE="MALE",
  FEMALE="FEMALE",
  ANY="ANY"
}

enum AgeGroup {
  ALL="ALL",
  SELECT_AGE="SELECT_AGE"
}


export {
  AdCampaign, AdCopy, AdTargetDelivery, AdCopyInput, AdTargetInput, AdCampaignInput, CampaignQueryCriterial, UpdateAdCampaignInput, UpdateAdCopyInput, UpdateAdTargetInput, HydratedUser
}