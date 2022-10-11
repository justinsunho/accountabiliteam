-- AlterTable
ALTER TABLE "Record" ADD COLUMN     "groupId" TEXT;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
