"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

type AdminLoginFormProps = {
  defaultEmail: string;
};

export function AdminLoginForm({ defaultEmail }: AdminLoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    const supabase = createBrowserSupabaseClient();

    if (!supabase) {
      setErrorMessage("Supabase environment variables are missing.");
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 rounded-lg border border-stone-200 bg-white p-5 shadow-sm"
    >
      <label className="block">
        <span className="text-sm font-semibold text-stone-900">Email</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="mt-2 w-full rounded-md border border-stone-300 px-3 py-3 text-sm"
        />
      </label>

      <label className="mt-4 block">
        <span className="text-sm font-semibold text-stone-900">Password</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          placeholder="Use your Supabase Auth password"
          className="mt-2 w-full rounded-md border border-stone-300 px-3 py-3 text-sm"
        />
      </label>

      {errorMessage ? (
        <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isLoading}
        className="mt-5 w-full rounded-md bg-stone-950 px-5 py-3 text-sm font-bold text-white hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-400"
      >
        {isLoading ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
}