/*
  Warnings:

  - You are about to drop the column `year_level` on the `Voters` table. All the data in the column will be lost.
  - Added the required column `course` to the `Candidate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Candidate` ADD COLUMN `course` VARCHAR(191) NOT NULL,
    ADD COLUMN `partyId` INTEGER NULL,
    ADD COLUMN `yearLevelId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Voters` DROP COLUMN `year_level`,
    ADD COLUMN `yearLevelId` INTEGER NULL;

-- CreateTable
CREATE TABLE `YearLevel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `level` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `YearLevel_level_key`(`level`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Party` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Party_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Admin_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Voters` ADD CONSTRAINT `Voters_yearLevelId_fkey` FOREIGN KEY (`yearLevelId`) REFERENCES `YearLevel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Candidate` ADD CONSTRAINT `Candidate_partyId_fkey` FOREIGN KEY (`partyId`) REFERENCES `Party`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Candidate` ADD CONSTRAINT `Candidate_yearLevelId_fkey` FOREIGN KEY (`yearLevelId`) REFERENCES `YearLevel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
