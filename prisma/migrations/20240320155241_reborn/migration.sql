/*
  Warnings:

  - A unique constraint covering the columns `[id,name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `UserCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserCategory" DROP CONSTRAINT "UserCategory_categoryId_fkey";

-- AlterTable
ALTER TABLE "UserCategory" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_id_name_key" ON "Category"("id", "name");

-- AddForeignKey
ALTER TABLE "UserCategory" ADD CONSTRAINT "UserCategory_categoryId_name_fkey" FOREIGN KEY ("categoryId", "name") REFERENCES "Category"("id", "name") ON DELETE RESTRICT ON UPDATE CASCADE;
