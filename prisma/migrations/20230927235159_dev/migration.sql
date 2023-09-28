-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_maintenance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT NOT NULL,
    "mainType" TEXT NOT NULL,
    "vehKm" INTEGER NOT NULL,
    "totalAmout" REAL NOT NULL
);
INSERT INTO "new_maintenance" ("date", "id", "mainType", "totalAmout", "vehKm") SELECT "date", "id", "mainType", "totalAmout", "vehKm" FROM "maintenance";
DROP TABLE "maintenance";
ALTER TABLE "new_maintenance" RENAME TO "maintenance";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
