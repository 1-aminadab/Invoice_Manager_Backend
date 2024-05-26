/*
  Warnings:

  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - Added the required column `discount_added_by` to the `Discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_added_by` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tax_added_by` to the `Tax` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Discount" ADD COLUMN     "discount_added_by" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "product_added_by" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Tax" ADD COLUMN     "tax_added_by" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phone",
ADD COLUMN     "phoneNumber" TEXT;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_product_added_by_fkey" FOREIGN KEY ("product_added_by") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tax" ADD CONSTRAINT "Tax_tax_added_by_fkey" FOREIGN KEY ("tax_added_by") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discount" ADD CONSTRAINT "Discount_discount_added_by_fkey" FOREIGN KEY ("discount_added_by") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
