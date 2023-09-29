/*
  Warnings:

  - Added the required column `vehicleId` to the `maintenance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plate` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_maintenance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT NOT NULL,
    "mainType" TEXT NOT NULL,
    "vehKm" INTEGER NOT NULL,
    "totalAmout" REAL NOT NULL,
    "vehicleId" TEXT NOT NULL,
    CONSTRAINT "maintenance_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_maintenance" ("date", "id", "mainType", "totalAmout", "vehKm") SELECT "date", "id", "mainType", "totalAmout", "vehKm" FROM "maintenance";
DROP TABLE "maintenance";
ALTER TABLE "new_maintenance" RENAME TO "maintenance";
CREATE TABLE "new_vehicles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "plate" TEXT NOT NULL,
    "currentKM" INTEGER NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "vehType" TEXT NOT NULL,
    "space" TEXT NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_vehicles" ("currentKM", "id", "isArchived", "model", "space", "vehType", "year") SELECT "currentKM", "id", "isArchived", "model", "space", "vehType", "year" FROM "vehicles";
DROP TABLE "vehicles";
ALTER TABLE "new_vehicles" RENAME TO "vehicles";
CREATE UNIQUE INDEX "vehicles_plate_key" ON "vehicles"("plate");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
