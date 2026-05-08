"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SidebarLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname() ?? "/";
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={
        "block px-2 py-1.5 rounded-md transition " +
        (isActive
          ? "text-foreground bg-accent font-medium"
          : "text-muted-foreground hover:text-foreground hover:bg-accent")
      }
    >
      {children}
    </Link>
  );
}
