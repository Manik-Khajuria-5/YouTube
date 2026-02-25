/*
  Warnings:

  - A unique constraint covering the columns `[uploadId,userId]` on the table `watchHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "watchHistory_uploadId_userId_key" ON "watchHistory"("uploadId", "userId");
