import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { success } from "zod";

export async function GET(request : NextRequest){
   
    const userId = request.headers.get("x-user-id")!;

    try{
       
        const response = await prisma.channel.findMany({
            where : {
                userId : userId
            }
        })

        return NextResponse.json({
            success : true,
            message : "Here are the users channel",
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

