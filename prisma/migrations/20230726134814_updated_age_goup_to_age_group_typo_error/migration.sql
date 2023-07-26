/*
  Warnings:

  - You are about to drop the column `ageGoup` on the `AdTargetDeliveries` table. All the data in the column will be lost.
  - Added the required column `ageGroup` to the `AdTargetDeliveries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AdTargetDeliveries" DROP COLUMN "ageGoup",
ADD COLUMN     "ageGroup" "AgeGroup" NOT NULL;
