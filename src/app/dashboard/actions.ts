"use server";

import jwt from "jsonwebtoken";
import { createClient } from "@/app/dashboard/utils/supabase/server";
import { createAdminClient } from "@/app/dashboard/utils/supabase/admin";
import { verifyMessage } from "viem";
import { revalidatePath } from "next/cache";

const supabase = createClient();

export async function signInWithEmailAndPassword(
  email: string,
  password: string
) {
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

  revalidatePath("/");
  revalidatePath("/sign-in");
  return dataSignInWithPassword;
}

export async function sendOTP(email: string) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      shouldCreateUser: false
    }
  });
}

export async function signInWithWallet({
  message,
  signature,
  address
}: {
  message: string;
  signature: `0x${string}`;
  address: `0x${string}`;
}) {
  if (!message || !signature || !address) {
    throw new Error("Missing required fields");
  }

  const isValidSignature = await verifyMessage({ message, signature, address });

  if (!isValidSignature) {
    throw new Error("Invalid signature");
  }

  const adminSupabase = await createAdminClient();
  const { data: user, error } = await adminSupabase
    .from("user")
    .select("id")
    .eq("wallet_address", address)
    .eq("type", "admin")
    .maybeSingle();

  if (error) {
    throw "Error fetching user";
  }

  if (!user) {
    throw new Error("User not found");
  }

  const token = jwt.sign(
    {
      address,
      sub: user.id,
      role: "authenticated",
      aud: "authenticated"
    },
    process.env.SUPABASE_JWT_SECRET!,
    {
      expiresIn: "6 hours"
    }
  );

  return token;
}

export async function addWalletToUser({
  message,
  signature,
  address
}: {
  message: string;
  signature: `0x${string}`;
  address: `0x${string}`;
}) {
  if (!message || !signature || !address) {
    throw new Error("Missing required fields");
  }

  const isValidSignature = await verifyMessage({ message, signature, address });

  if (!isValidSignature) {
    throw new Error("Invalid signature");
  }

  const adminSupabase = await createAdminClient();

  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const { error } = await adminSupabase
    .from("user")
    .update({
      wallet_address: address
    })
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw new Error("Error updating user");
  }
}
