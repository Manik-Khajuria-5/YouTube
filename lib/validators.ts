import {z} from "zod";

const ChannelChecker = z.object({
  channelname :  z.string(),
  banner : z.string(), 
  description : z.string(),
  profilepic : z.string(),
  subscriptionCnt :  z.number(),
})

const UploadChecker = z.object({
  videoUrl :  z.string(),
  ThumbnailUrl :  z.string(),
  description : z.string(),
  title : z.string(),
  type : z.enum(["UNLISTED","PRIVATE","PUBLIC"]),
  likeCnt : z.number(),
  Views : z.number(),
  deleted : z.boolean()
})

const CommentChecker = z.object({
   uploadId : z.string(),
   comment : z.string()
});

const watchChecker = z.object({
  uploadId : z.string(),
});


export {ChannelChecker,UploadChecker,watchChecker,CommentChecker};