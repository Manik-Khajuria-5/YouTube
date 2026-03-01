import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { watchChecker } from "@/lib/validators";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { success } from "zod";

//post an watch history endpoint
export async function POST(request : NextRequest) {

    const session = await auth.api.getSession({
        headers : request.headers
    });

    const userId = session!.session.userId;

    const body = await request.json();

    const {success,data} = watchChecker.safeParse(body);
   
     if(!success){

        return NextResponse.json({
            message : "Invalid Schema",
            err : "err"
        },{
            status : 403
        });
     }

    try{

        const response = await prisma.watchHistory.create({
           data : {
            uploadId : data.uploadId,
            userId : userId
           } 
        });

        return NextResponse.json({
            message : "Watch History Uploaded successfully",
            WatchHistoryId : response.id
        },{
            status : 201
        });    

    }
    catch(err){
        return NextResponse.json({
            message : "Internal Server Error",
            err : "err"
        },{
            status : 500
        });
    }
    
}

export async function GET(request : NextResponse){
   
    const session = await auth.api.getSession({
        headers : request.headers
    });

    const userId = session!.session.userId;

    try{
        
       const response = await prisma.upload.findMany({
         where : {
            userId : userId
         }
       });

       return NextResponse.json({
          
        message : "Here is the upload history for user",
        uploads : response
       },{
        status : 200
       });

    }
    catch(err){
        return NextResponse.json({
            message : "Internal Server Error",
            err : "err"
        },{
            status : 500
        });
    }
}