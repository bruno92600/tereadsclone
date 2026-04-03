"use client";
import {
  Heart,
  Home,
  LucideIcon,
  Plus,
  Search,
  User,
  LogOut,
} from "lucide-react";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavItem {
  href?: string;
  icon: LucideIcon;
  isAction?: boolean;
}

export const navItems: NavItem[] = [
  { href: "/feed", icon: Home },
  { href: "/search", icon: Search },
  { icon: Plus, isAction: true },
  { href: "/favorites", icon: Heart },
  { href: "/profile", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex items-center justify-between flex-col w-20 fixed z-100 top-0 left-0 h-screen">
      <Logo />

      <div className="flex flex-col gap-4">
        {navItems.map((item, index) => {
          const Icon = item.icon;

          if (item.isAction) {
            return (
              <button
                key={index}
                className="p-4 bg-surface text-white rounded-md hover:opacity-80 transition"
              >
                <Icon size={30} />
              </button>
            );
          }

          const isActive = pathname === item.href;

          return (
            <Link href={item.href!} key={index}>
              <div
                className={`p-4 rounded-md transition ${isActive ? "text-white" : "text-purple-500 hover:bg-white/10"}`}
              >
                <Icon size={30} />
              </div>
            </Link>
          );
        })}
      </div>

      <button className="mb-6 p-4 rounded-md text-text-muted hover:bg-purple-500 hover:text-white transition cursor-pointer">
        <LogOut size={30} />
      </button>
    </aside>
  );
}
