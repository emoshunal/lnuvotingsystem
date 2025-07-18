import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const yearLevels = await prisma.yearLevel.findMany()
    return NextResponse.json(yearLevels);
}