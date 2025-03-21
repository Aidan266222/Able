// app/auth/callback/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("Processing email confirmation...");

  useEffect(() => {
    async function confirmEmail() {
      // Extract tokens from the URL query parameters.
      const access_token = searchParams.get("access_token");
      const refresh_token = searchParams.get("refresh_token");

      if (!access_token || !refresh_token) {
        setError("Missing tokens");
        setMessage("Email confirmation failed: Missing tokens.");
        return;
      }

      // Use the tokens to set the session on the client.
      const { error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      if (error) {
        setError(error.message);
        setMessage("Email confirmation failed.");
      } else {
        setMessage("Email confirmed successfully!");
        // Redirect to /home after a short delay.
        setTimeout(() => {
          router.push("/home");
        }, 1500);
      }
    }

    confirmEmail();
  }, [searchParams, router]);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {error ? (
        <p style={{ color: "red", fontWeight: "bold" }}>{message}</p>
      ) : (
        <p style={{ fontWeight: "bold" }}>{message}</p>
      )}
    </div>
  );
}
