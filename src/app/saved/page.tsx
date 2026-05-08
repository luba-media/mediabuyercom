import Link from "next/link";

export default function SavedPage() {
  return (
    <div className="px-4 sm:px-6 py-12 max-w-3xl mx-auto pb-24 text-center">
      <div className="inline-flex w-12 h-12 rounded-full bg-accent items-center justify-center mb-4">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
      </div>
      <h1 className="text-2xl font-semibold tracking-tight">Saved ads</h1>
      <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
        Bookmark winning creatives from any spy view. Sign in to start a collection.
      </p>
      <div className="mt-6 flex items-center justify-center gap-2">
        <Link href="/spy" className="px-4 h-9 leading-9 rounded-md border border-border hover:bg-accent transition text-sm">
          Browse spy
        </Link>
        <Link href="/pricing" className="px-4 h-9 leading-9 rounded-md bg-foreground text-background text-sm font-medium">
          See pricing
        </Link>
      </div>
    </div>
  );
}
