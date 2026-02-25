/*
  Warnings:

  - A unique constraint covering the columns `[channelId,userId]` on the table `subscription` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "subscription_channelId_userId_key" ON "subscription"("channelId", "userId");
