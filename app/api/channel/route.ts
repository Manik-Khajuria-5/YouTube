import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ChannelChecker } from "@/lib/validators";
import { json, string, success } from "better-auth";
import { ReactServerDOMTurbopackClient } from "next/dist/server/route-modules/app-page/vendored/ssr/entrypoints";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest){
   
    const session = await auth.api.getSession({
        headers : request.headers
    });

    const userId = session?.session.userId;
    const body = await request.json();

    if(!userId){
        return NextResponse.json({
            success : false,
            message : "Session not found",
            err : "err"
        },{
            status : 401
        });
    }

    const {success,data,error} = ChannelChecker.safeParse(body);

    if(!success){
        
        return NextResponse.json({
            success : false,
            message : "Invalid Schema",
            err : "err"
        },{
            status : 422
        })
    }

    try{
        
         const response = await prisma.channel.create({
            data : {
                channelname : data.channelname,
                banner : data.banner,
                description : data.description,
                profilepic : data.profilepic,
                subscriptionCnt : data.subscriptionCnt,
                userId : userId
            }
         });

         return NextResponse.json({
            
            success : true,
            message : "Channel Created",
            ChannelId  : response.id

         },{
            status : 201
         })
    }
    catch(err){
        return NextResponse.json({
            success : false,
            message : "Internal Server Error",
            err : "err"
        },{
            status : 500
        })
    }
}

export async function GET(request : NextRequest){
   
   
    const session = await auth.api.getSession({
        headers : request.headers
    });

    const userId = session?.session.userId;
    const channelname = request.nextUrl.searchParams.get("channelname");

    if(!userId){
        return NextResponse.json({
            success : false,
            message : "Session not found",
            err : "err"
        },{
            status : 401
        });
    }

    if(!channelname || typeof channelname !== "string"){
        
        return NextResponse.json({
            success : false,
            message : "No Channel Name provided",
            err : "err"
        },{
            status : 422
        })
    }

    try{
        
         const response = await prisma.channel.findMany({
            where : {
                channelname : channelname
            },
            select : {
                channelname : true,
                banner : true,
                description : true,
                profilepic : true,
                subscriptionCnt : true
            }
         });

         return NextResponse.json({
            success : true,
            message : "Here are required channels",
            Channels : response
         },{
            status : 200
         })
    }
    catch(err){
        return NextResponse.json({
            success : false,
            message : "Internal Server Error",
            err : "err"
        },{
            status : 500
        })
    }
    
}

