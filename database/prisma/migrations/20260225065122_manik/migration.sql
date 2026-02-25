/*
  Warnings:

  - Added the required column `userid` to the `upload` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "upload" ADD COLUMN     "userid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "upload" ADD CONSTRAINT "upload_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
