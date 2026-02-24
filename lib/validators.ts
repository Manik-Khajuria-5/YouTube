import {z} from "zod";

const ChannelChecker = z.object({
  channelname :  z.string(),
  banner : z.string(), 
  description : z.string(),
  profilepic : z.string(),
  subscriptionCnt :  z.number(),
})

export {ChannelChecker}