import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

//post endpoint for likin g a upload
export async function POST(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  const userId = session!.session.userId!;
  const { id } = await params;

  try {
    const response = await prisma.likes.create({
      data: {
        uploadId: id,
        userId: userId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Subscribed successfully",
        SubscriptionId: response.id,
      },
      {
        status: 201,
      },
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: "err",
      },
      {
        status: 500,
      },
    );
  }
}