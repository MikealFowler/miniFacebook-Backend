-- CreateTable
CREATE TABLE "Pictures" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "uploadedat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pictures_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pictures" ADD CONSTRAINT "Pictures_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
