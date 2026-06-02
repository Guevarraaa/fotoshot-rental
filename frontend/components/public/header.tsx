import Link from "next/link";
import { businessInfo } from "@/lib/constants";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/cameras", label: "Cameras" },
  { href: "/book", label: "Book" },
  { href: "/track", label: "Track" },
  { href: "/admin/login", label: "Admin" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-950 text-sm font-bold text-white">
            FS
          </span>
          <span>
            <span className="block text-lg font-bold tracking-tight text-stone-950">
              {businessInfo.name}
            </span>
            <span className="block text-xs text-stone-500">Camera Rental</span>
          </span>
        </Link>
        <nav className="flex flex-wrap gap-2 text-sm font-medium text-stone-700">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 transition hover:bg-stone-100 hover:text-stone-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

