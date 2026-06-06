import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Users, Wallet, CalendarCheck, Award, FileText, Settings, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { KaratixLogo } from "@/components/karatix-logo";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { to: "/membres", label: "Membres", icon: Users },
  { to: "/paiements", label: "Paiements", icon: Wallet },
  { to: "/presences", label: "Présences", icon: CalendarCheck },
  { to: "/examens", label: "Examens", icon: Award },
  { to: "/observations", label: "Observations", icon: FileText },
  { to: "/club", label: "Mon club", icon: Settings },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const nav_ = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  async function logout() {
    await supabase.auth.signOut();
    toast.success("Déconnecté.");
    nav_({ to: "/" });
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 -translate-x-full border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform lg:static lg:translate-x-0",
        open && "translate-x-0"
      )}>
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-5">
          <KaratixLogo className="[&_span:last-child]:text-sidebar-foreground" />
          <button onClick={() => setOpen(false)} className="lg:hidden"><X className="h-5 w-5" /></button>
        </div>
        <nav className="flex flex-col gap-0.5 p-3">
          {nav.map((item) => {
            const active = path.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent" />}
              </Link>
            );
          })}
        </nav>
        <div className="absolute inset-x-0 bottom-0 border-t border-sidebar-border p-3">
          <button onClick={logout} className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground/70 transition hover:bg-sidebar-accent/50 hover:text-sidebar-foreground">
            <LogOut className="h-4 w-4" /> Déconnexion
          </button>
        </div>
      </aside>

      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 z-30 bg-black/50 lg:hidden" />}

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center gap-3 border-b border-border bg-background px-5 lg:px-8">
          <button onClick={() => setOpen(true)} className="lg:hidden"><Menu className="h-5 w-5" /></button>
          <div className="ml-auto text-sm text-muted-foreground">
            {new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}
          </div>
        </header>
        <main className="flex-1 p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
