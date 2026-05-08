"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home", icon: "M3 12 12 4l9 8M5 10v10h14V10" },
  { href: "/spy", label: "Spy", icon: "M11 4a7 7 0 1 0 4.95 11.95l3.55 3.55M11 4a7 7 0 0 1 7 7" },
  { href: "/trends", label: "Trends", icon: "M3 17l6-6 4 4 8-8" },
  { href: "/networks", label: "Networks", icon: "M5 7h14M5 12h14M5 17h14" },
  { href: "/pricing", label: "Pricing", icon: "M12 1v22M17 5H9.5a3.5 3.5 0 1 0 0 7h5a3.5 3.5 0 1 1 0 7H6" },
];

export function MobileNav() {
  const pathname = usePathname() ?? "/";
  return (
    <nav
      aria-label="Primary mobile"
      className="md:hidden fixed bottom-0 inset-x-0 z-30 border-t border-border bg-background/95 backdrop-blur pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="grid grid-cols-5">
        {items.map((it) => {
          const isActive = it.href === "/" ? pathname === "/" : pathname.startsWith(it.href);
          return (
            <li key={it.href}>
              <Link
                href={it.href}
                aria-current={isActive ? "page" : undefined}
                className={
                  "flex flex-col items-center justify-center py-2 gap-0.5 text-[10px] font-medium transition " +
                  (isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground")
                }
              >
                <span
                  className={
                    "relative flex items-center justify-center w-9 h-7 rounded-md " +
                    (isActive ? "bg-accent" : "")
                  }
                >
                  <svg
                    aria-hidden="true"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d={it.icon} />
                  </svg>
                </span>
                {it.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
