// services/supabaseAuth.ts

// import { createClient } from "@/util/supabase/client"; // Ensure the correct path
import { redirect } from "next/navigation";
import { createClient } from "@/app/dashboard/utils/supabase/client";

const supabase = createClient();

// Function to generate a random password
function generateRandomPassword(length: number = 12): string {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

function generateRandomName(length: number = 5): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let name = "";
  for (let i = 0; i < length; i++) {
    name += chars.charAt(Math.floor(Math.random() * chars.length)); // Random character from the set
  }
  return name;
}

function generateRandomHexCode(length: number = 5): string {
  let hexCode = "";
  for (let i = 0; i < length; i++) {
    hexCode += Math.floor(Math.random() * 16).toString(16); // Random number from 0 to 15 in hex
  }
  return hexCode;
}

export const signInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
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

      return dataSignInWithOTP;
    }

    return dataSignInWithPassword;
  } catch (error: any) {
    throw new Error(error.message || "An error occurred during sign-in.");
  }
};

export const signInWithOTP = async (email: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true
      }
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || "An error occurred during sign-in.");
  }
};

export const signInWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
        queryParams: {
          access_type: "offline",
          prompt: "consent"
        }
      }
    });

    if (error) {
      throw new Error(error.message);
    }

    redirect(data.url);
  } catch (error: any) {
    throw new Error(error.message || "An error occurred during Google login.");
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  } catch (error: any) {
    throw new Error(error.message || "An error occurred during sign-out.");
  }
};
