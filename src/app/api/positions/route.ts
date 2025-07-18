import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET() {
    const positions = await prisma.positions.findMany();
    return NextResponse.json(positions);
}