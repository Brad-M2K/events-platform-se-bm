/*
  Warnings:

  - A unique constraint covering the columns `[eventId,email]` on the table `Signup` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dateTime" DATETIME NOT NULL,
    "durationMins" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "category" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Event" ("capacity", "category", "createdAt", "dateTime", "description", "durationMins", "id", "imageUrl", "location", "title") SELECT "capacity", "category", "createdAt", "dateTime", "description", "durationMins", "id", "imageUrl", "location", "title" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE INDEX "Event_dateTime_idx" ON "Event"("dateTime");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Signup_eventId_email_key" ON "Signup"("eventId", "email");
