import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request : NextResponse,{params}:{
    params : Promise<{id : String}>
}){

    const {id} = await params;
    
    if(!id || typeof id !== "string"){
       
        return NextResponse.json({
           message : "Invalid Schema",
           err : "err"
        },{
            status : 403
        })
    }
    
    try{
       
       const response = await prisma.comments.findMany({
         where : {
            uploadId : id,
         }
       })

       return NextResponse.json({
          message : "Here are required Comments",
          comments : response
       },{
        status : 201
       })
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

export async function DELETE(request : NextResponse,{params}:{
    params : Promise<{id : String}>
}){

    const session = await auth.api.getSession({
        headers : request.headers
    });
      
    const userId = session!.session.userId;


    const {id} = await params;
    
    if(!id || typeof id !== "string"){
       
        return NextResponse.json({
           message : "Invalid Schema",
           err : "error"
        },{
            status : 403
        })
    }
    
    try{
       
       const response = await prisma.comments.delete({
         where : {
            userId : userId,
            id : id,
         }
       })

       return NextResponse.json({
          message : "Comment deleted successfully",
          comments : response
       },{
        status : 203
       })
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