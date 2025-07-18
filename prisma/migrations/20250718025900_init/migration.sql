/*
  Warnings:

  - You are about to drop the `Position` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Candidate` DROP FOREIGN KEY `Candidate_positionId_fkey`;

-- DropForeignKey
ALTER TABLE `Vote` DROP FOREIGN KEY `Vote_positionId_fkey`;

-- DropIndex
DROP INDEX `Candidate_positionId_fkey` ON `Candidate`;

-- DropIndex
DROP INDEX `Vote_positionId_fkey` ON `Vote`;

-- DropTable
DROP TABLE `Position`;

-- CreateTable
CREATE TABLE `Positions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `maxSelect` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Candidate` ADD CONSTRAINT `Candidate_positionId_fkey` FOREIGN KEY (`positionId`) REFERENCES `Positions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vote` ADD CONSTRAINT `Vote_positionId_fkey` FOREIGN KEY (`positionId`) REFERENCES `Positions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
