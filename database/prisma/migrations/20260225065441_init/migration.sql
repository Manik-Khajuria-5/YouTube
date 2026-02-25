/*
  Warnings:

  - You are about to drop the column `userid` on the `upload` table. All the data in the column will be lost.
  - Added the required column `userId` to the `upload` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "upload" DROP CONSTRAINT "upload_userid_fkey";

-- AlterTable
ALTER TABLE "upload" DROP COLUMN "userid",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "upload" ADD CONSTRAINT "upload_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
