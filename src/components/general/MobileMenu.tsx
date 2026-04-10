"use client";
import { usePathname } from "next/navigation";
import { navItems } from "./Sidebar";
import Link from "next/link";
import { useModalStore } from "@/store/useModalStore";

export default function MobileMenu() {

    const pathname = usePathname();
    const {openCreatePost} = useModalStore();

  return (
    <nav className="fixed bottom-0 left-0 w-full h-16 bg-background flex items-center justify-around md:hidden">
        {navItems.map((item, index) => {
            const Icon = item.icon;

            if (item.isAction) {
            return (
              <button
                onClick={openCreatePost}
                key={index}
                className="px-6 py-3 bg-surface text-white rounded-md shadow-lg hover:scale-105 transition"
              >
                <Icon size={26} />
              </button>
            );
          }

            const isActive = pathname === item.href;

            return (
                <Link key={index} href={item.href!}>
                    <div className={`p-2 transition ${isActive ? "text-white" : "text-purple-500 hover:bg-white/10"}`}>
                        <Icon size={26} />
                    </div>
                </Link>
            )
        })}
    </nav>
  )
}
