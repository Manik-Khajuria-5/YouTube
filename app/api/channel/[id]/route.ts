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

export async function DELETE(request : NextRequest,{params}:{
    params : Promise<{id : string}>
}){
   
    const resolvedParams = await params;
    const userId = resolvedParams.id;

    try{
       
        const response = await prisma.channel.delete({
            where : {
                userId : userId
            }
        })

        return NextResponse.json({
            success : true,
            message : "User channel deleted successfully",
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

