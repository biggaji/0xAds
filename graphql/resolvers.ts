import { AdCampaign } from "../types/campaign.js";
import { dateScalarResolver } from "./typeDefs.js";
import AdService from "../services/adService.js";

const adService = new AdService();

const resolvers = {
  Query: {
    fetchAdCampaigns: async function(_, args:any, context:any) {
      return await adService.fetchAdCampaigns();
    },
    fetchAdCampaign: async function(_, args:any, context:any) {
      return await adService.fetchAdCampaign(args.query);
    },
  },
  
  Mutation: {
    createAdCampaign: async function(root, args:any, context:any) {
      console.log(args.adCampaignInput)
      return await adService.createAdCampaign(args.adCampaignInput);
    },
    createAdCampaignCopy: async function(root, args:any, context:any) {
      return await adService.attachAdCopyToAdCampaign(args.adCopyInput);
    },
    createAdCampaignTarget: async function(root, args:any, context:any) {
      return await adService.attachAdTargetToAdCampaign(args.adTargetInput);
    },
    updateAdCampaign: async function(_, args:any, context:any) {
      return await adService.updateAdCampaign(args.adCampaignUpdateInput);
    },
    updateAdCampaignCopy: async function(_, args:any, context:any) {
      return await adService.updateAdCopy(args.adCopyUpdateInput);
    },
    updateAdCampaignTarget: async function(_, args:any, context:any) {
      return await adService.updateAdTarget(args.adTargetUpdateInput);
    }
  },

  AdCampaign: {
    adsCopy: async function(adCampaign:AdCampaign, args:any, context:any) {
      return await adService.findCopyByCampaignId(adCampaign.id);
    },

    targetDelivery: async function(adCampaign:AdCampaign, args:any, context:any) {
      return await adService.findTargetByCampaignId(adCampaign.id);
    },
  },

  DateTime: dateScalarResolver,
}

export default resolvers;