import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || user === undefined) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    await prisma.user.create({
      data: {
        id: user.id,
        firstName: user.given_name ?? "",
        email: user.email ?? "",
        lastName: user.family_name ?? "",
      },
    });
    return NextResponse.redirect("http://localhost:3000/");
  } else {
    return NextResponse.redirect("http://localhost:3000/");
  }
}
