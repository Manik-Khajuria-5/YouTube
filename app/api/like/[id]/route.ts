import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

//post endpoint for liking a upload
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
        message: "liked successfully",
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

//get all like for the channel
export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  const { id } = await params;

  try {
    const response = await prisma.likes.count({
      where: {
        uploadId : id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "like Cnt are here as follows",
        SubscribeCnt: response,
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

//endpoint for delete likes for a channel
export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const userId = session!.session.userId;

  try {
    const response = await prisma.likes.delete({
      where: {
        uploadId_userId: {
          uploadId : id,
          userId: userId,
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "UnLiked successfully",
        SubscribeCnt: response,
      },
      {
        status: 200,
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