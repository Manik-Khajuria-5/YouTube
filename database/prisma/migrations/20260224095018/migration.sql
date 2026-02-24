/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `channel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "channel_userId_key" ON "channel"("userId");
