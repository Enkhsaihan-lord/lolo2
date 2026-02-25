import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export const POST = async (req: NextRequest) => {
  const { name, description, url, image } = await req.json();
  const created = await prisma.movieInfo.create({
    data: {
      name,
      description,
      url,
      image,
    },
  });
  if (!name || !description || !url) {
    return NextResponse.json(
      { message: "missing required fields" },
      { status: 400 },
    );
  }
  return NextResponse.json(created);
};
export const GET = async () => {
  const getMovies = await prisma.movieInfo.findMany();
  return NextResponse.json(getMovies);
};
export const DELETE = async (req: NextRequest) => {
  const { movieInfoId } = await req.json();
  const findMovie = await prisma.movieInfo.findUnique({
    where: { id: movieInfoId },
  });
  if (!movieInfoId) {
    return NextResponse.json(
      { error: "id buruu bna Id shalgaad uzeerei" },
      { status: 400 },
    );
  } else {
    const deleted = await prisma.movieInfo.delete({
      where: { id: movieInfoId },
    });
    return NextResponse.json(deleted);
  }
};
