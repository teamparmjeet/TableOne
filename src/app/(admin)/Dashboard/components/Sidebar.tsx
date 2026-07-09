"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Newspaper, MailQuestion, LogOut } from "lucide-react";
import { forceLogout } from "@/app/utils/logout";

const navLinks = [
  {
    name: "Dashboard",
    href: "/Dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Insight",
    href: "/Dashboard/insight",
    icon: Newspaper,
  },
  {
    name: "Request Seat",
    href: "/Dashboard/ContactReq",
    icon: MailQuestion,
  },
];

export default function Sidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white shadow-xl shadow-slate-200/40 transition-transform duration-300 md:static md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex h-20 items-center border-b border-slate-100 px-6">
          <div>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.25em] text-amber-600">
              Admin Panel
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center gap-3 rounded px-2 py-1 text-sm font-semibold transition-all ${isActive
                  ? "bg-amber-500 text-white shadow-lg shadow-amber-500/25"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-xl transition ${isActive
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-500 group-hover:bg-white"
                    }`}
                >
                  <Icon size={18} />
                </span>

                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-100 p-4">


          <button
            onClick={forceLogout}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}