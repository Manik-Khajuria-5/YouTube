import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ChannelChecker } from "@/lib/validators";
import { json, string, success } from "better-auth";
import { ReactServerDOMTurbopackClient } from "next/dist/server/route-modules/app-page/vendored/ssr/entrypoints";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest){
   
    const body = await request.json();
    const session = await auth.api.getSession({
        headers : request.headers
    });
    const userId = session!.session.userId!;

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
                userId : userId,
                deleted : false
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

export async function PATCH(request : NextRequest){
   
       const session = await auth.api.getSession({
        headers : request.headers
    });
    const userId = session!.session.userId!;

    try{
       
        const response = await prisma.channel.update({
            where : {
                userId : userId
            },
            data : {deleted : true}
        })

        return NextResponse.json({
            success : true,
            message : "User channel deleted successfully",
            Channels : response.id
        },{
            status : 200
        })
    }
    catch(err){

        return NextResponse.json({
           message : "Internal Server Error",
           err : "err"
        },{
            status : 500
        })
    }
};

export async function GET(request : NextRequest){
   
       const session = await auth.api.getSession({
        headers : request.headers
    });
    const userId = session!.session.userId!;

    try{
       
        const response = await prisma.channel.findUnique({
            where : {
                userId : userId,
                deleted : false
            }
        })

        if(!response){
                    return NextResponse.json({
            success : false,
            message : "No channel found",
            err : "err"
        },{
            status : 404
        })
        }

        return NextResponse.json({
            success : true,
            message : "Here are the user channel",
            Channels : response
        },{
            status : 200
        })
    }
    catch(err){

        return NextResponse.json({
           message : "Internal Server Error",
           err : "err"
        },{
            status : 500
        })
    }
};


