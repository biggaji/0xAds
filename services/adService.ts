import AdRepository from "../repositories/adRepo.js";
import ErrorHelper from "../@commons/errorHelper.js";

const adRepo = new AdRepository();

export default class AdService {
  constructor() {}

  async createAdCampaign() {
    // data validation is done here
  }

  async attachAdCopyToAdCampaign() {}

  async attachAdTargetToAdCampaign() {}

  async fetchAdCampaign() {}

  async fetchAdCampaigns() {}
}