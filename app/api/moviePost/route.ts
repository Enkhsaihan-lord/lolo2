import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { name, description, url } = body;

  if (!name || !description || !url) {
    return NextResponse.json(
      { message: "missing required fields" },
      { status: 400 },
    );
  }
  const created = await prisma.movieInfo.create({
    data: {
      name,
      description,
      url,
    },
  });
  return NextResponse.json(created);
};
export const GET = async () => {
  const getMovies = await prisma.movieInfo.findMany();
  return NextResponse.json(getMovies);
};
