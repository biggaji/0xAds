import db from "../@utils/db.js";
import { AdCampaign, AdCampaignInput, AdCopyInput, AdTargetInput } from "../types/campaign.js";

// extend the "AdCampaignInput" interface to include extra fields needed to insert into database
interface AdCampaignInputExtension extends AdCampaignInput {
  oxerId: string;
}

export default class AdRepository {
  constructor() {}

  /**
   * @method recordAdCampaign
   * @memberof AdRepository
   */
  async recordAdCampaign(payload: AdCampaignInputExtension) {
    const { currency, dailyBudget, endDate, startDate, frequency, objective, oxerId } = payload;
    try {
      const response = await db.campaigns.create({
        data: { currency, dailyBudget, endDate, startDate, frequency, objective, oxerId }, include: { adsCopy: true, targetDelivery: true }
      });

      return response;
    } catch (error) {
      throw error;
    }
  }

  async recordAndAttachAdCampaignCopy(payload: AdCopyInput) {
    const { campaignId, mediaLink, text, type, websiteUrl } = payload;
    try {
      const response = await db.adCopies.create({
        data: { mediaLink, text, type, websiteUrl, campaign: {
          connect: { id: campaignId }
        }}
      });

      return response;
    } catch (error) {
      throw error;
    }
  }

  async recordAndAttachAdCampaignTarget(payload: AdTargetInput) {
    const { campaignId, ageGroup, gender, interests, languages, maxAge,  minAge, os  } = payload;
    try {
      const response = await db.adTargetDeliveries.create({
        data: { ageGroup, maxAge, minAge, languages, os, interests, gender, campaign: {
          connect: { id: campaignId }
        }}
      });

      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method fetchAdCampaign
   * @param query ""
   * @memberof AdRepository
   * It search for a campaign via it targetDelivery options - "age", "gender", "intrests", "languages", "os". "os" is required but others are optional
   */
  async fetchAdCampaign(query:any) {
    try {
      const response = await db.campaigns.findFirst({
        where: {
          active: true,
          targetDelivery: {
            is: {
              os: { has: query.os },
            },
            // AND: [{
            //   interests: { hasSome: query.intrests},
            //   languages: { hasSome: query.languages}
            // }]
          },
        },
        include: {
          adsCopy: true,
          targetDelivery: true
        }
      })
    } catch (error) {
      throw error;
    }
  }

  async fetchAdCampaigns() {
    try {
      const response = await db.campaigns.findMany(
        {
          where: {
            active: true
          },
          include: {
            adsCopy: true,
            targetDelivery: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}