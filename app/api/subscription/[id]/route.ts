import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { success } from "zod";

//endpoint for subsrcibing to a channel
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
    const response = await prisma.subscription.create({
      data: {
        channelId: id,
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

//get all subsrciption for the channel
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
    const response = await prisma.subscription.count({
      where: {
        channelId: id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Subscribed Cnt are here as follows",
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

//endpoint for delete subscription for a channel
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
    const response = await prisma.subscription.delete({
      where: {
        channelId_userId: {
          channelId: id,
          userId: userId,
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "UnSubscribed successfully",
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
