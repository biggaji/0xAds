import { AdCampaign } from '../types/campaign.js';
import { dateScalarResolver } from './typeDefs.js';
import AdService from '../services/adService.js';
import AuthServiceProvider from '../services/authService.js';
import { GraphQLError } from 'graphql';
import { ErrorCode } from '../@commons/errorHelper.js';

const adService = new AdService();
const authServiceProvider = new AuthServiceProvider();

const resolvers = {
  Query: {
    fetchAdCampaigns: async function (_, args: any, context: any) {
      return await adService.fetchAdCampaigns();
    },
    fetchAdCampaign: async function (_, args: any, context: any) {
      return await adService.fetchAdCampaign(args.query);
    },
    authenticateWithOxhutIdentityProvider: async function (_, args: any, context: any) {
      return await authServiceProvider.authenticateWith0xhutProvider({
        email: args.email,
        password: args.password,
      });
    },
  },

  Mutation: {
    createAdCampaign: async function (root, args: any, context: any) {
      if (!context.id) {
        throw new GraphQLError('please login to continue', {
          extensions: {
            code: ErrorCode.UNAUTHENTICATED,
          },
        });
      }
      return await adService.createAdCampaign(args.adCampaignInput, context.id);
    },
    createAdCampaignCopy: async function (root, args: any, context: any) {
      if (!context.id) {
        throw new GraphQLError('please login to continue', {
          extensions: {
            code: ErrorCode.UNAUTHENTICATED,
          },
        });
      }
      return await adService.attachAdCopyToAdCampaign(args.adCopyInput);
    },
    createAdCampaignTarget: async function (root, args: any, context: any) {
      if (!context.id) {
        throw new GraphQLError('please login to continue', {
          extensions: {
            code: ErrorCode.UNAUTHENTICATED,
          },
        });
      }
      return await adService.attachAdTargetToAdCampaign(args.adTargetInput);
    },
    updateAdCampaign: async function (_, args: any, context: any) {
      if (!context.id) {
        throw new GraphQLError('please login to continue', {
          extensions: {
            code: ErrorCode.UNAUTHENTICATED,
          },
        });
      }
      return await adService.updateAdCampaign(args.adCampaignUpdateInput);
    },
    updateAdCampaignCopy: async function (_, args: any, context: any) {
      if (!context.id) {
        throw new GraphQLError('please login to continue', {
          extensions: {
            code: ErrorCode.UNAUTHENTICATED,
          },
        });
      }
      return await adService.updateAdCopy(args.adCopyUpdateInput);
    },
    updateAdCampaignTarget: async function (_, args: any, context: any) {
      if (!context.id) {
        throw new GraphQLError('please login to continue', {
          extensions: {
            code: ErrorCode.UNAUTHENTICATED,
          },
        });
      }
      return await adService.updateAdTarget(args.adTargetUpdateInput);
    },
    deleteAdCampaign: async function (_, args: any, context: any) {
      if (!context.id) {
        throw new GraphQLError('please login to continue', {
          extensions: {
            code: ErrorCode.UNAUTHENTICATED,
          },
        });
      }
      return await adService.deleteAdCampaign(args.id);
    },
    deActivateAdCampaign: async function (_, args: any, context: any) {
      if (!context.id) {
        throw new GraphQLError('please login to continue', {
          extensions: {
            code: ErrorCode.UNAUTHENTICATED,
          },
        });
      }
      return await adService.deActivateAdCampaign(args.id);
    },
    activateAdCampaign: async function (_, args: any, context: any) {
      if (!context.id) {
        throw new GraphQLError('please login to continue', {
          extensions: {
            code: ErrorCode.UNAUTHENTICATED,
          },
        });
      }
      return await adService.activateAdCampaign(args.id);
    },
  },

  AdCampaign: {
    adsCopy: async function (adCampaign: AdCampaign, args: any, context: any) {
      if (!context.id) {
        throw new GraphQLError('please login to continue', {
          extensions: {
            code: ErrorCode.UNAUTHENTICATED,
          },
        });
      }
      return await adService.findCopyByCampaignId(adCampaign.id);
    },

    targetDelivery: async function (adCampaign: AdCampaign, args: any, context: any) {
      if (!context.id) {
        throw new GraphQLError('please login to continue', {
          extensions: {
            code: ErrorCode.UNAUTHENTICATED,
          },
        });
      }
      return await adService.findTargetByCampaignId(adCampaign.id);
    },
  },

  DateTime: dateScalarResolver,
};

export default resolvers;
