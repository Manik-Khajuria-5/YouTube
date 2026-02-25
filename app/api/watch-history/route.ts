import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { success } from "zod";

export async function POST(request : NextRequest,{params}:{
    params : Promise<{id : string}>
}){

    const session = await auth.api.getSession({
        headers : request.headers
    });

    const userId = session!.session.userId;
    const {id} = await params;

    try{
      
       const response = await prisma.watchHistory.create({
        data : {
            uploadId : id,
            userId : id
        }
       });

       return NextResponse.json({
          success : true,
          message : "Watch History Created Sucessfully",
          err : "err"
       },{
        status : 201
       });

    }
    catch{
      
        return NextResponse.json({
            success : false,
            message : "Internal Server Error",
            err : "err"
        },{
            status : 500
        });
    }
}