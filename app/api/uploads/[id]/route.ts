import { prisma } from "@/lib/db";
import { UploadChecker } from "@/lib/validators";
import { promises } from "dns";
import { NextRequest, NextResponse } from "next/server";
import { success } from "zod";

export async function GET(request : NextRequest,{params} : {params : Promise<{id : string}>}){

    const {id} = await params;
    
    if(!id || typeof id !== "string"){
        return NextResponse.json({
              success : false,
              message : "Invalid Id",
              err : "err"
        },{
            status : 401
        })
    }

    try{

        const response = await prisma.upload.findFirst({
            where : {
                id : id
            }
        });

        if(!response){

            return NextResponse.json({
                 success : false,
                 message : "Uploaded Content not found",
                 err : "err"
            },{
                status : 404
            })
        }

        return NextResponse.json({
            success : true,
            message : "Here is required Content",
            uploadId : response
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
        });
    }
}