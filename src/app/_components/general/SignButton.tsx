"use client";
import type { Session } from "better-auth";
import React from "react";
import { useRouter } from "next/navigation";
import { authClient } from "~/server/better-auth/client";

export default function SignButton({ session }: { session: Session }) {
  const router = useRouter();
  const signIn = () => {
    authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
      errorCallbackURL: "/error",
    });
  };
  const signOut = async () => {
    await authClient.signOut();
    router.replace("/");
    router.refresh();
  };
  return (
    <div>
      {!session && (
        <button className="hover:cursor-pointer" onClick={signIn}>
          <span className="material-symbols-outlined">Login</span>Log in
        </button>
      )}
      {session && (
        <button className="hover:cursor-pointer" onClick={signOut}>
          <span className="material-symbols-outlined">Logout</span>Log out
        </button>
      )}
    </div>
  );
}
