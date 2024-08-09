-- CreateTable
CREATE TABLE "DisplayImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "DisplayImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DisplayImage" ADD CONSTRAINT "DisplayImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
