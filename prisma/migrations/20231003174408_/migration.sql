/*
  Warnings:

  - Added the required column `plate` to the `vehicles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platformType` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_vehicles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "currentKM" INTEGER NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "vehType" TEXT NOT NULL,
    "space" TEXT NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "plate" TEXT NOT NULL
);
INSERT INTO "new_vehicles" ("currentKM", "id", "isArchived", "model", "space", "vehType", "year") SELECT "currentKM", "id", "isArchived", "model", "space", "vehType", "year" FROM "vehicles";
DROP TABLE "vehicles";
ALTER TABLE "new_vehicles" RENAME TO "vehicles";
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "platformId" TEXT NOT NULL,
    "platformType" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_user" ("avatarUrl", "id", "isAdmin", "login", "name", "platformId") SELECT "avatarUrl", "id", "isAdmin", "login", "name", "platformId" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_platformId_key" ON "user"("platformId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
