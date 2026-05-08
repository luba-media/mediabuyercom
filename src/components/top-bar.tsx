import Link from "next/link";

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="h-14 flex items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-block w-6 h-6 rounded bg-foreground text-background text-xs font-bold grid place-items-center">m</span>
          <span className="hidden sm:inline">mediabuyer</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 text-sm ml-2">
          <NavLink href="/spy">Spy</NavLink>
          <NavLink href="/trends">Trends</NavLink>
          <NavLink href="/networks">Networks</NavLink>
          <NavLink href="/verticals">Verticals</NavLink>
          <NavLink href="/advertisers">Advertisers</NavLink>
          <NavLink href="/countries">Countries</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
        </nav>
        <div className="flex-1" />
        <form action="/spy" className="hidden sm:flex items-center gap-2 bg-muted/60 border border-border rounded-md px-3 h-9 text-sm w-72">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground"><circle cx="11" cy="11" r="7"/><path d="m21 21-3.5-3.5"/></svg>
          <input
            type="search"
            name="q"
            placeholder="Search ads, advertisers"
            className="bg-transparent outline-none flex-1 placeholder:text-muted-foreground"
          />
          <kbd className="text-[10px] font-mono text-muted-foreground border border-border rounded px-1 py-0.5">⌘K</kbd>
        </form>
        <Link
          href="/pricing"
          className="hidden sm:inline-flex items-center px-3 h-9 text-sm font-medium rounded-md bg-foreground text-background hover:opacity-90 transition"
        >
          Get started
        </Link>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition"
    >
      {children}
    </Link>
  );
}
