-- CreateEnum
CREATE TYPE "role" AS ENUM ('Admin', 'SuperAdmin', 'user');

-- CreateEnum
CREATE TYPE "set" AS ENUM ('Premium', 'normal');

-- CreateTable
CREATE TABLE "MovieInfo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "MovieInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "role" NOT NULL DEFAULT 'user',
    "set" "set" NOT NULL DEFAULT 'normal',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
