"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/app/dashboard/utils/supabase/server";
const supabase = createClient();

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent"
      }
    }
  });

  if (error) {
    console.log(error);
    redirect("/error");
  }

  redirect(data.url);
}

export const signUpWithEmail = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        firstName,
        lastName
      }
    }
  });

  if (error) {
    throw error;
  }

  return data;
};

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    throw error;
  }

  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
};
