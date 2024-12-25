-- CreateTable
CREATE TABLE "Blog" (
    "_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "heading" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "imageurl" TEXT,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("_id")
);
