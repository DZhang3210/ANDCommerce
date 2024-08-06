/*
  Warnings:

  - You are about to drop the column `profileImage` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "profileImage",
ADD COLUMN     "productImage" TEXT NOT NULL DEFAULT '';
