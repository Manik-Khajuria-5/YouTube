import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { success } from "zod";

export async function GET(request : NextRequest,{params}:{
    params : Promise<{id : string}>
}){
   
    const resolvedParams = await params;
    const userId = resolvedParams.id;

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

export async function PATCH(request : NextRequest,{params}:{
    params : Promise<{id : string}>
}){
   
    const resolvedParams = await params;
    const userId = resolvedParams.id;

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

