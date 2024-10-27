"use server";

import { createClient } from "@/util/supabase/server";

const supabase = createClient();

export async function sendOTP(email: string) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      shouldCreateUser: false
    }
  });
}
