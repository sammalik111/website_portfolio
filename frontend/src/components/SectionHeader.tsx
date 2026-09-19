export function SectionHeader({
  tag,
  title,
  description,
}: {
  tag: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--primary))]">
        {tag}
      </div>
      <h2 className="text-gradient text-4xl font-extrabold tracking-tight">{title}</h2>
      {description ? (
        <p className="mt-3 text-[hsl(var(--muted-foreground))]">{description}</p>
      ) : null}
    </div>
  );
}
