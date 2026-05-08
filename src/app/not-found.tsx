import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-4 sm:px-6 py-20 max-w-2xl mx-auto text-center">
      <div className="text-5xl font-semibold tracking-tight">404</div>
      <p className="mt-3 text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <div className="mt-6 flex items-center justify-center gap-2">
        <Link href="/" className="px-4 h-9 leading-9 rounded-md border border-border hover:bg-accent transition text-sm">
          Home
        </Link>
        <Link href="/spy" className="px-4 h-9 leading-9 rounded-md bg-foreground text-background text-sm font-medium">
          Open spy
        </Link>
      </div>
    </div>
  );
}
