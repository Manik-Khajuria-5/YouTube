import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { success } from "zod";

export async function GET(request : NextRequest){
   
    const channelname = request.nextUrl.searchParams.get("channelname");
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
                channelname : channelname,
                deleted : false
            },
            select : {
                channelname : true,
                banner : true,
                description : true,
                profilepic : true,
                subscriptionCnt : true
            }
         });

         if(!response){

            return NextResponse.json({
                success : false,
                message : "channel not found",
                err : "err"
            },{
                status : 404
            })
         }

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
