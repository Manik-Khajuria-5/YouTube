import { prisma } from "@/lib/db";
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