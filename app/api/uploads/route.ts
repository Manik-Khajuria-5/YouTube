import { prisma } from "@/lib/db";
import { UploadChecker } from "@/lib/validators";
import { NextRequest, NextResponse } from "next/server";
import { success } from "zod";

export async function POST(request : NextRequest){

    const userId = request.headers.get("x-user-id")!;
    const body = await request.json();

    const {success,data,error} = UploadChecker.safeParse(body);

    console.log(body);
    
    

    if(!success){
        return NextResponse.json({
              success : false,
              message : "Invalid Schema",
              err : error
        },{
            status : 401
        })
    }

    try{
        
        const channel = await prisma.channel.findFirst({
            where : {
                userId : userId
            }
        })

        if(!channel){

            return NextResponse.json({
                success : false,
                message : "Channel not found",
                err : "err"
            },{
                status : 404
            })
        }

        const response = await prisma.upload.create({
             data : {
                channelId : channel.id,
                videoUrl : data.videoUrl,
                ThumbnailUrl : data.ThumbnailUrl,
                description : data.description,
                title : data.title,
                type : data.type,
                likeCnt : data.likeCnt,
                Views : data.Views,
                deleted : false,
             }
        });

        return NextResponse.json({
            success : true,
            message : "Content posted successfully",
            uploadId : response.id
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
        });
    }
}