import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export const GET = async (req: NextRequest, res: NextResponse) => {
  const body = req.json;
  const { email, password } = body;
  const user = await prisma.user.findFirst({
    where: { email },
  });
  if (!user) {
    return NextResponse.json({ error: "Хэрэглэгч олдсонгүй" }, { status: 404 });
  }
  if (user.password !== password) {
    return NextResponse.json(
      { message: " nuuts ug buruu bna" },
      { status: 404 },
    );
  }
  return NextResponse.json(
    { message: "Амжилттай нэвтэрлээ", user: { email: user.email } },
    { status: 200 },
  );
};
