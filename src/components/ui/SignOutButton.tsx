"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import Button from "./Button";
import { toast } from "./Toast";

/*
 * NextJS does not allow to pass function from server -> client components,
 * hence this is un-reusable component.
 * we cant use this as both the sign in and sign out button
 */

export default function SignOutButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signUserOut = async () => {
    try {
      setIsLoading(true);
      await signOut();
    } catch (error) {
      toast({
        title: "Error signing out",
        message: "Please try again later.",
        type: "error",
      });
    }
  };

  return (
    <Button onClick={signUserOut} isLoading={isLoading}>
      Sign Out
    </Button>
  );
}
