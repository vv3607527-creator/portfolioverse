"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  LayoutDashboard,
  FolderKanban,
  BarChart3,
  Settings,
  FileText,
  Github,
  Linkedin,
  CreditCard,
  LogOut,
} from "lucide-react";

const sidebarLinks = [
  {
    group: "Main",
    links: [
      { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
      { href: "/dashboard/portfolios", label: "Portfolios", icon: FolderKanban },
      { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
    ],
  },
  {
    group: "Tools",
    links: [
      { href: "/dashboard/resume", label: "Resume", icon: FileText },
      { href: "/dashboard/github", label: "GitHub", icon: Github },
      { href: "/dashboard/linkedin", label: "LinkedIn", icon: Linkedin },
    ],
  },
  {
    group: "Settings",
    links: [
      { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r bg-background">
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-500">
          <span className="text-sm font-bold text-white">P</span>
        </div>
        <span className="text-lg font-bold tracking-tight">PortfolioVerse</span>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        {sidebarLinks.map((group) => (
          <div key={group.group} className="mb-6">
            <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {group.group}
            </h3>
            <ul className="space-y-1">
              {group.links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t p-4">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <UserButton afterSignOutUrl="/" />
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium">
              {user?.fullName || "User"}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {user?.primaryEmailAddress?.emailAddress || ""}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
