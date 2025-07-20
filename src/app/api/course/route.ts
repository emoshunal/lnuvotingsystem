import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const parties = await prisma.course.findMany()
    return NextResponse.json(parties);
}