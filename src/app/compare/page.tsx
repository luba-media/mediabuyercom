import Link from "next/link";

export default function ComparePage() {
  return (
    <div className="px-4 sm:px-6 py-12 max-w-3xl mx-auto pb-24 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">Compare ads</h1>
      <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
        Pin two or three creatives side by side to study angle, hook and longevity. Pick ads
        from the spy view to start a comparison.
      </p>
      <Link href="/spy" className="inline-block mt-6 px-4 h-9 leading-9 rounded-md border border-border hover:bg-accent transition text-sm">
        Open spy
      </Link>
    </div>
  );
}
