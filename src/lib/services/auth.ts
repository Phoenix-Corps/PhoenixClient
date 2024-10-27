import { createClient } from "@/util/supabase/client";

const supabase = createClient();

export const signInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    let userData;
    const { data: dataSignInWithPassword, error: errorSignInWithPassword } =
      await supabase.auth.signInWithPassword({
        email,
        password
      });

    if (errorSignInWithPassword) {
      const { data: dataSignInWithOTP, error: errorSignInWithOTP } =
        await supabase.auth.verifyOtp({
          email,
          token: password,
          type: "email"
        });

      if (errorSignInWithOTP) {
        throw new Error(errorSignInWithPassword.message);
      }

      userData = dataSignInWithOTP;
    } else {
      userData = dataSignInWithPassword;
    }

    if (!userData.user) {
      throw new Error("An error occurred during sign-in.");
    }

    const { data, error } = await supabase
      .from("user")
      .select("*")
      .eq("id", userData?.user?.id)
      .maybeSingle();

    return data;
  } catch (error: any) {
    throw new Error(error.message || "An error occurred during sign-in.");
  }
};
