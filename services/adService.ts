import AdRepository from "../repositories/adRepo.js";
import ErrorHelper, { ErrorCode } from "../@commons/errorHelper.js";
import { AdCampaignInput, AdCopyInput, AdTargetInput, CampaignQueryCriterial } from "../types/campaign.js";
import { GraphQLError } from "graphql";

const adRepo = new AdRepository();

export default class AdService {
  constructor() {}

  async createAdCampaign(payload: AdCampaignInput) {
    const { currency, dailyBudget, endDate, startDate, frequency, objective } = payload;
    
    try {
      // data validation is done here
      if (!currency) {
        throw new GraphQLError('Choose a valid currency option', {
          extensions: {
            code: ErrorCode.BAD_USER_INPUT,
            argumentName: 'currency'
          }
        })
      }

      if (!dailyBudget || dailyBudget <= 0) {
        throw new GraphQLError('Provide a valid budget amount', {
          extensions: {
            code: ErrorCode.BAD_USER_INPUT,
            argumentName: 'dailyBudget'
          }
        })
      }

      if (!startDate || !endDate) {
        throw new GraphQLError('Provide a valid date format', {
          extensions: {
            code: ErrorCode.BAD_USER_INPUT,
            argumentName: 'startDate || endDate'
          }
        })
      }

      if (!frequency) {
        throw new GraphQLError('Choose a valid frequency option', {
          extensions: {
            code: ErrorCode.BAD_USER_INPUT,
            argumentName: 'frequency'
          }
        })
      }

      if (!objective) {
        throw new GraphQLError('Choose a valid ad objective option', {
          extensions: {
            code: ErrorCode.BAD_USER_INPUT,
            argumentName: 'objective'
          }
        })
      }

      const oxerId = `${Math.floor(Math.random() * 1000) + 1}`;

      // hydrate payload object
      const hydratedCampaignPayload = {
        oxerId,
        frequency,
        objective,
        endDate,
        startDate,
        currency,
        dailyBudget
      };

      const campaign = await adRepo.recordAdCampaign(hydratedCampaignPayload);
      return campaign;
    } catch (error) {
      throw error;
    }
  }

  async attachAdCopyToAdCampaign(payload: AdCopyInput) {
    const { campaignId, mediaLink, text, type, websiteUrl } = payload;
    try {
      // data validation is done here
      if (!campaignId) {
        throw new GraphQLError('campaignId is required', {
          extensions: {
            code: ErrorCode.BAD_USER_INPUT,
            argumentName: 'campaignId'
          }
        })
      }

      // check if campaign exist
      const campaignExist = await adRepo.findAdCampaignById(campaignId);

      if (campaignExist === null) {
        throw new GraphQLError('campaign not found', {
          extensions: {
            code: ErrorCode.NOT_FOUND,
          }
        })
      }

      if (!mediaLink) {
        throw new GraphQLError('mediaLink is required', {
          extensions: {
            code: ErrorCode.BAD_USER_INPUT,
            argumentName: 'mediaLink'
          }
        })
      }

      if (!text || text === '' || text.length > 280) {
        throw new GraphQLError('A valid text input is required and maximum character limit is 280', {
          extensions: {
            code: ErrorCode.BAD_USER_INPUT,
            argumentName: 'text'
          }
        })
      }

      if (!type) {
        throw new GraphQLError('Choose a valid ad type option', {
          extensions: {
            code: ErrorCode.BAD_USER_INPUT,
            argumentName: 'type'
          }
        })
      }

      const websiteRegex = /^https:\/\/[a-zA-Z0-9.-]+\.{1}[a-z]{2,}$/gi;
      if (websiteUrl && !websiteRegex.test(websiteUrl)) {
        throw new GraphQLError('Provide a valid website url string', {
          extensions: {
            code: ErrorCode.BAD_USER_INPUT,
            argumentName: 'websiteUrl'
          }
        })
      }

      // hydrate payload object
      const hydratedCopyPayload = {
        text, type, mediaLink, campaignId, websiteUrl
      };

      const attachedCopyToCampaign = await adRepo.recordAndAttachAdCampaignCopy(hydratedCopyPayload);
      return attachedCopyToCampaign;
    } catch (error) {
      throw error;
    }
  }

  async attachAdTargetToAdCampaign(payload: AdTargetInput) {
    const { ageGroup, campaignId, gender, interests, languages, maxAge, minAge, os } = payload;

    try {
      // data validation is done here
      if (!campaignId) {
        throw new GraphQLError('campaignId is required', {
          extensions: {
            code: ErrorCode.BAD_USER_INPUT,
            argumentName: 'campaignId'
          }
        })
      }

      // check if campaign exist
      const campaignExist = await adRepo.findAdCampaignById(campaignId);

      if (campaignExist === null) {
        throw new GraphQLError('campaign not found', {
          extensions: {
            code: ErrorCode.NOT_FOUND,
          }
        })
      }

      if (!maxAge || !minAge) {
        throw new GraphQLError('Provide a valid max and min age', {
          extensions: {
            code: ErrorCode.BAD_USER_INPUT,
            argumentName: 'maxAge || minAge'
          }
        })
      }

      if (!ageGroup) {
        throw new GraphQLError('Choose a valid ageGroup option', {
          extensions: {
            code: ErrorCode.BAD_USER_INPUT,
            argumentName: 'ageGroup'
          }
        })
      }

      if (!gender) {
        throw new GraphQLError('Choose a valid gender option', {
          extensions: {
            code: ErrorCode.BAD_USER_INPUT,
            argumentName: 'gender'
          }
        })
      }

      if (!os) {
        throw new GraphQLError('Choose a valid operating system target option', {
          extensions: {
            code: ErrorCode.BAD_USER_INPUT,
            argumentName: 'os'
          }
        })
      }

      // hydrate payload object
      const hydratedTargetPayload = {
        ageGroup, maxAge, minAge, os, interests, languages, gender, campaignId
      };

      const attachedCampaignTarget = await adRepo.recordAndAttachAdCampaignTarget(hydratedTargetPayload);
      return attachedCampaignTarget;
    } catch (error) {
      throw error;
    }
  }

  async findTargetByCampaignId(campaignId: string) {
    try {
      const target = await adRepo.findAdTargetByCampaignId(campaignId);
      return target;
    } catch (error) {
      throw error;
    }
  }

  async findCopyByCampaignId(campaignId: string) {
    try {
      const copy = await adRepo.findAdCopyByCampaignId(campaignId);
      return copy;
    } catch (error) {
      throw error;
    }
  }

  async fetchAdCampaign(query: CampaignQueryCriterial) {
    const { os } = query;
    try {
    //   // data validation is done here
      if (!os || os.length === 0) {
        throw new GraphQLError('os is required', {
          extensions: {
            code: ErrorCode.BAD_USER_INPUT,
            argumentName: 'os'
          }
        })
      }

      const campaign = await adRepo.fetchAdCampaign(query);

      if (campaign === null) {
        throw new GraphQLError('campaign not found', {
          extensions: {
            code: ErrorCode.NOT_FOUND,
          }
        })
      }
      
      return campaign;
    } catch (error) {
      throw error;
    }
  }

  async fetchAdCampaigns() {
    try {
      const campaigns = await adRepo.fetchAdCampaigns();
      return campaigns;
    } catch (error) {
      throw error;
    }
  }
}