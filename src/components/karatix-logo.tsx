export function KaratixLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground">
        <span className="font-display text-sm font-bold">K</span>
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent" />
      </div>
      <span className="font-display text-lg font-bold tracking-tight">KARATIX</span>
    </div>
  );
}
