"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Button from "./Button";
import { toast } from "./Toast";

/*
 * NextJS does not allow to pass function from server -> client components,
 * hence this is un-reusable component.
 * we cant use this as both the sign in and sign out button
 */

export default function SignInButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      await signIn("google");
    } catch (error) {
      toast({
        title: "Error signing in",
        message: "Please try again later.",
        type: "error",
      });
    }
  };

  return (
    <Button onClick={signInWithGoogle} isLoading={isLoading}>
      Sign In
    </Button>
  );
}
