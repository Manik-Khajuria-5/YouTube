import {z} from "zod";

const ChannelChecker = z.object({
  channelname :  z.string(),
  banner : z.string(), 
  description : z.string(),
  profilepic : z.string(),
  subscriptionCnt :  z.number(),
})

const ChannelGetChecker = z.object({
  channelname : z.string()
})

export {ChannelChecker,ChannelGetChecker}