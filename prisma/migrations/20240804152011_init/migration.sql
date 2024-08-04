/*
  Warnings:

  - You are about to drop the column `userId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_userId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "userId",
ADD COLUMN     "ownerID" TEXT;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_ownerID_fkey" FOREIGN KEY ("ownerID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
