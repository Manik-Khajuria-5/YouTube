/*
  Warnings:

  - A unique constraint covering the columns `[uploadId,userId]` on the table `likes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "likes_uploadId_userId_key" ON "likes"("uploadId", "userId");
