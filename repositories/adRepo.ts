import db from "../@utils/db.js";
import { AdCampaign, AdCampaignInput, AdCopyInput, AdTargetInput, CampaignQueryCriterial, UpdateAdCampaignInput, UpdateAdCopyInput } from "../types/campaign.js";

// extend the "AdCampaignInput" interface to include extra fields needed to insert into database
interface AdCampaignInputExtension extends AdCampaignInput {
  oxerId: string;
}

/**
 * @class AdRepository
 * Lower access level class to interact with the database
 */
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
   * It search for a campaign via it targetDelivery options - "max and min age", "gender", "intrests", "languages", "os". "os" is required but others are optional filters
   */
  async fetchAdCampaign(query:CampaignQueryCriterial) {
    try {
      const response = await db.campaigns.findFirst({
        where: {
          active: true,
          targetDelivery: {
            is: {
              os: { hasSome:query.os },
              // handle optional filters
              interests: query.interests ? { hasSome: query.interests } : undefined,
              gender: query.gender ? { equals: query.gender } : undefined,
              languages: query.languages ? { hasSome: query.languages } : undefined,
              maxAge: query.maxAge ? { lte: query.maxAge } : undefined,
              minAge: query.minAge ? { gte: query.minAge } : undefined,
            },
          },
        }
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async findAdCampaignById(campaignId: string) {
    try {
      const campaign = await db.campaigns.findUnique({
        where: {
          id: campaignId
        }
      });

      if (campaign === null) {
        return null;
      } else {
        return campaign;
      }
    } catch (error) {
      throw error;
    }
  }

  async findAdTargetByCampaignId(campaignId: string) {
    try {
      const target = await db.adTargetDeliveries.findUnique({
        where: {
          campaignId: campaignId
        }
      });

      if (target === null) {
        return null;
      } else {
        return target;
      }
    } catch (error) {
      throw error;
    }
  }

  async findAdCopyByCampaignId(campaignId: string) {
    try {
      const copy = await db.adCopies.findUnique({
        where: {
          campaignId: campaignId
        }
      });

      if (copy === null) {
        return null;
      } else {
        return copy;
      }
    } catch (error) {
      throw error;
    }
  }

  async fetchAdCampaigns() {
    try {
      const response = await db.campaigns.findMany(
        {
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

  async updateAdCampaign(id: string, payload: UpdateAdCampaignInput) {
    try {
      const constructedUpdatePayload = await this.constructUpdateObject(payload);
      const updatedCampaign = await db.campaigns.update({
        data: constructedUpdatePayload,
        where: {
          id: id
        }
      });
      return updatedCampaign;
    } catch (error) {
      throw error;
    }
  }

  async constructUpdateObject(payload: object) {
    for (const [key, value] of Object.entries(payload)) {
      if (value === undefined || value === null) {
        delete payload[key];
      }
    }
    delete payload["campaignId"];
    return payload;
  }

  async updateAdCampaignCopy(campaignId: string, payload: UpdateAdCopyInput) {
    try {
      const constructedUpdatePayload = await this.constructUpdateObject(payload);
      const updatedCampaign = await db.adCopies.update({
        data: constructedUpdatePayload,
        where: {
          campaignId: campaignId
        }
      });
      return updatedCampaign;
    } catch (error) {
      throw error;
    }
  }

  async updateAdCampaignTarget(campaignId: string, payload: UpdateAdCampaignInput) {
    try {
      const constructedUpdatePayload = await this.constructUpdateObject(payload);
      const updatedCampaignTarget = await db.adTargetDeliveries.update({
        data: constructedUpdatePayload,
        where: {
          campaignId: campaignId
        }
      });
      return updatedCampaignTarget;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 
   * @param campaignId string
   * Uses a transaction to delete the campaign, target and copy at once
   */
  async deleteAdCampaign(campaignId: string) {
    try {
      let deleted = false;
      // start with deleting either from the target or copy table
      
      // delete target data
      const deleteCampaignTarget = db.adTargetDeliveries.delete({
        where: {
          campaignId,
        }
      });
  
      // delete copy data
      const deleteCampaignCopy = db.adCopies.delete({
        where: {
          campaignId,
        }
      });
  
      // delete the actual campaign data
      const deleteCampaign = db.campaigns.delete({
        where: {
          id: campaignId,
        }
      });
  
      const tx = await db.$transaction([deleteCampaignCopy, deleteCampaignTarget, deleteCampaign])
  
      // since the transaction returns the array containing the data in each model, so I check the length to be sure if has all been deleted
      if (tx.length === 3) {
        deleted = true;
      }
  
      return deleted;
    } catch (error) {
      throw error;
    }
  }

  async activateAdCampaign(id: string) {
    try {
      return await db.campaigns.update({
        where: {
          id: id
        },
        data: {
          active: true
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async deActivateAdCampaign(id: string) {
    try {
      return await db.campaigns.update({
        where: {
          id: id
        },
        data: {
          active: false
        }
      });
    } catch (error) {
      throw error;
    }
  }
}