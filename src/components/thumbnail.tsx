"use client";

import { useState } from "react";

export function Thumbnail({
  id,
  src,
  adType,
  className = "",
  big = false,
}: {
  id: string;
  src?: string | null;
  adType?: string;
  className?: string;
  big?: boolean;
}) {
  const [errored, setErrored] = useState(false);
  const seed = parseInt(id.slice(0, 6), 16) || 0;
  const h1 = seed % 360;
  const h2 = (h1 + 60) % 360;
  const showImg = src && !errored;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(135deg, hsl(${h1}, 50%, 18%), hsl(${h2}, 60%, 32%))`,
      }}
    >
      {showImg && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src!}
          alt=""
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setErrored(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {!showImg && (
        <div className="absolute inset-0 flex items-center justify-center text-white/40">
          <svg
            width={big ? 64 : 32}
            height={big ? 64 : 32}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
        </div>
      )}
      <div
        className={`absolute ${big ? "top-3 left-3 px-2 py-1 text-xs" : "top-2 left-2 px-1.5 py-0.5 text-[10px]"} font-mono text-white/95 bg-black/60 backdrop-blur rounded shadow-sm`}
      >
        {big ? id : id.slice(0, 8)}
      </div>
      {adType === "video" && (
        <div
          className={`absolute ${big ? "top-3 right-3 px-2 py-1 text-xs" : "top-2 right-2 px-1.5 py-0.5 text-[10px]"} font-mono text-white bg-red-600/90 rounded shadow-sm`}
        >
          VIDEO
        </div>
      )}
    </div>
  );
}
