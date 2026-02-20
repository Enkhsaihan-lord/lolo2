import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { email, password, name } = body;
  const saltRound = 10;
  const hashedPassword = await hash(password, saltRound);
  const created = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });
  return NextResponse.json(created);
};
