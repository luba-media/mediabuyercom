import { SidebarLink } from "./sidebar-link";

const sections: Array<{ heading: string; items: Array<{ href: string; label: string }> }> = [
  {
    heading: "Discover",
    items: [
      { href: "/spy", label: "Spy" },
      { href: "/trends", label: "Trends" },
      { href: "/pulse", label: "Pulse" },
    ],
  },
  {
    heading: "Reference",
    items: [
      { href: "/networks", label: "Networks" },
      { href: "/verticals", label: "Verticals" },
      { href: "/advertisers", label: "Advertisers" },
      { href: "/countries", label: "Countries" },
      { href: "/glossary", label: "Glossary" },
    ],
  },
  {
    heading: "Account",
    items: [
      { href: "/saved", label: "Saved" },
      { href: "/compare", label: "Compare" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
];

export function Sidebar() {
  return (
    <aside className="hidden lg:block w-56 shrink-0 border-r border-border min-h-[calc(100vh-3.5rem)] py-6 px-3 text-sm">
      <nav className="space-y-6">
        {sections.map((s) => (
          <div key={s.heading}>
            <div className="px-2 mb-2 text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
              {s.heading}
            </div>
            <ul className="space-y-0.5">
              {s.items.map((it) => (
                <li key={it.href}>
                  <SidebarLink href={it.href}>{it.label}</SidebarLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
