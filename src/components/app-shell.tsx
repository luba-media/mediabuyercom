import Link from "next/link";
import { ReactNode } from "react";
import { TopBar } from "./top-bar";
import { Sidebar } from "./sidebar";
import { MobileNav } from "./mobile-nav";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <TopBar />
      <div className="flex-1 flex">
        <Sidebar />
        <main id="main" className="flex-1 min-w-0">{children}</main>
      </div>
      <Footer />
      <MobileNav />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border mt-12 py-8 text-sm text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">mediabuyer</span>
          <span>·</span>
          <span>Native ad intelligence</span>
        </div>
        <nav className="flex items-center gap-5">
          <Link href="/pricing" className="hover:text-foreground transition">Pricing</Link>
          <Link href="/networks" className="hover:text-foreground transition">Networks</Link>
          <Link href="/glossary" className="hover:text-foreground transition">Glossary</Link>
          <Link href="/legal" className="hover:text-foreground transition">Legal</Link>
        </nav>
      </div>
    </footer>
  );
}
