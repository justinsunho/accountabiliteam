-- CreateTable
CREATE TABLE "_HabitToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_HabitToUser_AB_unique" ON "_HabitToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_HabitToUser_B_index" ON "_HabitToUser"("B");

-- AddForeignKey
ALTER TABLE "_HabitToUser" ADD CONSTRAINT "_HabitToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Habit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HabitToUser" ADD CONSTRAINT "_HabitToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
