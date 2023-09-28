-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_vehicles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "currentKM" INTEGER NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "vehType" TEXT NOT NULL,
    "space" TEXT NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_vehicles" ("currentKM", "id", "model", "space", "vehType", "year") SELECT "currentKM", "id", "model", "space", "vehType", "year" FROM "vehicles";
DROP TABLE "vehicles";
ALTER TABLE "new_vehicles" RENAME TO "vehicles";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
