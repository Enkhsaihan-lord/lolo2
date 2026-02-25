import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export const GET = (req: NextRequest) => {
  const getUsers = prisma.user.findMany();
  return NextResponse.json(getUsers);
};
