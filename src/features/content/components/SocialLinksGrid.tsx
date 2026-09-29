"use client";

import type { SocialProfile } from "./contact-profiles";

export function SocialLinksGrid({ links }: { links: SocialProfile[] }) {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {links.map(({ name, handle, href, Icon, tag }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between rounded-2xl border border-line/80 bg-surface p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:shadow-md"
        >
          <div className="flex items-center gap-3.5">
            <div className="flex size-10 items-center justify-center rounded-xl bg-night/5 text-ink transition-colors duration-300 group-hover:bg-gold group-hover:text-night">
              <Icon size={18} />
            </div>
            <div>
              <p className="text-[13px] font-medium text-ink transition-colors group-hover:text-gold">
                {name}
              </p>
              <p className="text-[11px] text-muted">{handle}</p>
            </div>
          </div>
          <span className="rounded-full bg-shell px-2.5 py-1 text-[10px] font-medium text-muted">
            {tag}
          </span>
        </a>
      ))}
    </div>
  );
}
