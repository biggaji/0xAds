import { AdCampaign } from "../types/campaign";
import { dateScalarType } from "./typeDefs";

const resolvers = {
  Query: {
    fetchAdCampaigns: function(_, args:any, context:any) {
      return [];
    },
    fetchAdCampaign: function(_, args:any, context:any) {
      return {};
    }
  },

  Mutation: {
    createAdCampaign: function(root, args:any, context:any) {
      return
    },
    createAdCampaignCopy: function(root, args:any, context:any) {
      return
    },
    createAdCampaignTarget: function(root, args:any, context:any) {
      return
    }
  },

  AdCopy: function(adCampaign:AdCampaign, args:any, context:any) {
    return;
  },

  AdTarget: function(adCampaign:AdCampaign, args:any, context:any) {
    return;
  },
  DateTime: dateScalarType,
}

export default resolvers;