import Link from "next/link";
import { NavLink } from "./nav-link";
import { getIndex } from "@/lib/data";

function freshness(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const h = Math.max(0, Math.round(ms / 3_600_000));
  if (h < 1) return "just now";
  if (h < 24) return `${h}h ago`;
  const d = Math.round(h / 24);
  return `${d}d ago`;
}

export function TopBar() {
  const idx = getIndex();
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/65">
      <div className="h-14 flex items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span
            aria-hidden="true"
            className="inline-block w-6 h-6 rounded bg-foreground text-background text-xs font-bold grid place-items-center"
          >
            m
          </span>
          <span className="text-sm">mediabuyer</span>
          <span className="sr-only">— Native ad intelligence</span>
        </Link>
        <span
          className="hidden lg:inline-flex items-center gap-1.5 text-[11px] text-muted-foreground border border-border rounded-full pl-1.5 pr-2 py-0.5 ml-1"
          title={`Last data refresh: ${idx.last_updated}`}
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium">live</span>
          <span className="text-muted-foreground/60">·</span>
          <span>{freshness(idx.last_updated)}</span>
        </span>
        <nav aria-label="Primary" className="hidden md:flex items-center gap-1 text-sm ml-2">
          <NavLink href="/spy">Spy</NavLink>
          <NavLink href="/trends">Trends</NavLink>
          <NavLink href="/networks">Networks</NavLink>
          <NavLink href="/verticals">Verticals</NavLink>
          <NavLink href="/advertisers">Advertisers</NavLink>
          <NavLink href="/countries">Countries</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
        </nav>
        <div className="flex-1" />
        <form
          action="/spy"
          role="search"
          className="hidden sm:flex items-center gap-2 bg-muted/60 border border-border rounded-md px-3 h-9 text-sm w-72 focus-within:border-foreground/40 focus-within:bg-muted transition"
        >
          <label htmlFor="topbar-search" className="sr-only">
            Search ads and advertisers
          </label>
          <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-muted-foreground shrink-0"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-3.5-3.5" />
          </svg>
          <input
            id="topbar-search"
            type="search"
            name="q"
            placeholder="Search ads, advertisers"
            className="bg-transparent outline-none flex-1 placeholder:text-muted-foreground"
          />
          <kbd className="text-[10px] font-mono text-muted-foreground border border-border rounded px-1 py-0.5">
            ⌘K
          </kbd>
        </form>
        <Link
          href="/spy"
          aria-label="Search ads"
          className="sm:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition"
        >
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-3.5-3.5" />
          </svg>
        </Link>
        <Link
          href="/pricing"
          className="inline-flex items-center px-3 sm:px-4 h-9 text-sm font-medium rounded-md bg-foreground text-background hover:opacity-90 transition shadow-sm"
        >
          Get started
        </Link>
      </div>
    </header>
  );
}

