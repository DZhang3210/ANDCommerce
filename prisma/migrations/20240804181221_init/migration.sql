-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_ownerID_fkey";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_ownerID_fkey" FOREIGN KEY ("ownerID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
