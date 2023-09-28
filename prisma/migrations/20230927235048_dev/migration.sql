-- CreateTable
CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "currentKM" INTEGER NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "vehType" TEXT NOT NULL,
    "space" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "maintenance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "mainType" TEXT NOT NULL,
    "vehKm" INTEGER NOT NULL,
    "totalAmout" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "part" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_maintenanceTopart" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_maintenanceTopart_A_fkey" FOREIGN KEY ("A") REFERENCES "maintenance" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_maintenanceTopart_B_fkey" FOREIGN KEY ("B") REFERENCES "part" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_maintenanceTopart_AB_unique" ON "_maintenanceTopart"("A", "B");

-- CreateIndex
CREATE INDEX "_maintenanceTopart_B_index" ON "_maintenanceTopart"("B");
