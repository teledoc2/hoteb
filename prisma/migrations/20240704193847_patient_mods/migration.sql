/*
  Warnings:

  - You are about to drop the column `customId` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `customId` on the `Report` table. All the data in the column will be lost.
  - Added the required column `pateintId` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_clerkId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_customId_fkey";

-- DropIndex
DROP INDEX "Patient_companyId_clerkId_idx";

-- DropIndex
DROP INDEX "Patient_customId_key";

-- DropIndex
DROP INDEX "Report_customId_clerkId_idx";

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "customId",
ALTER COLUMN "clerkId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "customId",
ADD COLUMN     "pateintId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Patient_companyId_idx" ON "Patient"("companyId");

-- CreateIndex
CREATE INDEX "Report_pateintId_clerkId_idx" ON "Report"("pateintId", "clerkId");

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_pateintId_fkey" FOREIGN KEY ("pateintId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_clerkId_fkey" FOREIGN KEY ("clerkId") REFERENCES "User"("clerkId") ON DELETE SET NULL ON UPDATE CASCADE;
