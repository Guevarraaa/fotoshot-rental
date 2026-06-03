"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export function AdminLogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);

    const supabase = createBrowserSupabaseClient();

    if (supabase) {
      await supabase.auth.signOut();
    }

    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoading}
      className="rounded-md border border-stone-300 px-4 py-3 text-sm font-bold text-stone-900 hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isLoading ? "Logging out..." : "Log out"}
    </button>
  );
}