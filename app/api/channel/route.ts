import { auth } from "@/lib/auth";

export async function POST(request : Request){

    const session = await auth.api.getSession({
        headers : request.headers
    });

    const userId = session?.session.userId;
    
}

