type SectionHeaderProps = {
  id: string;
  title: string;
  subtitle: string;
};

/** Shared heading block used by every home section. */
export function SectionHeader({ id, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="flex w-full flex-col items-center gap-3 text-center">
      <h2
        id={id}
        className="font-serif text-[28px] text-ink sm:text-[40px] lg:text-[48px]"
      >
        {title}
      </h2>
      <p className="text-[11px] text-muted uppercase sm:text-[13px] lg:text-[14px]">
        {subtitle}
      </p>
    </div>
  );
}
