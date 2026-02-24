import { createAuthClient } from "better-auth/client";
const authClient = createAuthClient();

const signInGoogle = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
};

export const { signIn, signUp, useSession } = authClient;
export {signInGoogle};