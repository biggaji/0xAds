-- CreateEnum
CREATE TYPE "Languages" AS ENUM ('ENGLISH', 'YORUBA', 'SPANISH');

-- CreateEnum
CREATE TYPE "Interests" AS ENUM ('POLITICS', 'MUSIC', 'TECH', 'CELEBRITIES', 'NEW', 'BUSINESS', 'ARTS');

-- CreateEnum
CREATE TYPE "Os" AS ENUM ('ANDRIOD', 'IOS', 'DESKTOP', 'MOBILE', 'ALL');

-- CreateEnum
CREATE TYPE "AdCopyType" AS ENUM ('PHOTO', 'VIDEO');

-- CreateEnum
CREATE TYPE "GenderGroup" AS ENUM ('MALE', 'FEMALE', 'ANY');

-- CreateEnum
CREATE TYPE "CampaignObjective" AS ENUM ('REACH', 'ENGAGEMENT', 'WEBSITE_TRAFFIC', 'APP_INSTALL');

-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('NGN', 'PRSH');

-- CreateEnum
CREATE TYPE "AgeGroup" AS ENUM ('ALL', 'SELECT_AGE');

-- CreateTable
CREATE TABLE "Campaigns" (
    "id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "dailyBudget" INTEGER NOT NULL,
    "currency" "Currency" NOT NULL,
    "frequency" "Frequency" NOT NULL,
    "objective" "CampaignObjective" NOT NULL,
    "oxerId" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdCopies" (
    "id" TEXT NOT NULL,
    "mediaLink" TEXT NOT NULL,
    "type" "AdCopyType" NOT NULL,
    "websiteUrl" TEXT,
    "text" VARCHAR(280) NOT NULL,
    "campaignId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdCopies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdTargetDeliveries" (
    "id" TEXT NOT NULL,
    "gender" "GenderGroup" NOT NULL,
    "ageGoup" "AgeGroup" NOT NULL,
    "maxAge" INTEGER,
    "minAge" INTEGER,
    "interests" "Interests"[],
    "languages" "Languages"[],
    "os" "Os"[],
    "campaignId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdTargetDeliveries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdCopies_campaignId_key" ON "AdCopies"("campaignId");

-- CreateIndex
CREATE UNIQUE INDEX "AdTargetDeliveries_campaignId_key" ON "AdTargetDeliveries"("campaignId");

-- AddForeignKey
ALTER TABLE "AdCopies" ADD CONSTRAINT "AdCopies_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdTargetDeliveries" ADD CONSTRAINT "AdTargetDeliveries_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
