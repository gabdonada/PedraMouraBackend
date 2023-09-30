-- CreateTable
CREATE TABLE "scheduledMaintenance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT NOT NULL,
    "mainType" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    CONSTRAINT "scheduledMaintenance_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
