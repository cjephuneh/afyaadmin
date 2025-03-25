"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LayoutDashboard, Stethoscope, Users, Calendar, FileText, Settings, MessageSquare, LogOut, Mail } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Stethoscope, label: "Doctors", href: "/doctors" },
  { icon: Users, label: "Patients", href: "/patients" },
  { icon: Calendar, label: "Appointments", href: "/appointments" },
  { icon: FileText, label: "Appointment Reports", href: "/reports" },
  { icon: MessageSquare, label: "Feedback", href: "/feedback" },
  { icon: Mail, label: "Contact Messages", href: "/contact" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function Sidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <div className="w-64 h-screen border-r bg-gradient-to-b from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 shadow-md">
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-20 items-center border-b px-4 bg-white dark:bg-gray-800 shadow-sm">
          <Link className="flex items-center gap-2 font-bold text-gray-800 dark:text-gray-100" href="/">
            <div className="p-1.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg tracking-tight">Afya Mkononi</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Admin Dashboard</span>
            </div>
          </Link>
        </div>

        {/* Scrollable Menu */}
        <ScrollArea className="flex-1 px-3 py-6">
          <div className="space-y-6">
            <div className="space-y-2">
              {sidebarItems.map((item, index) => (
                <Link key={index} href={item.href}>
                  <div
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      pathname === item.href
                        ? "bg-gradient-to-r from-green-100 to-blue-100 text-blue-700 dark:from-green-900/40 dark:to-blue-900/40 dark:text-blue-300 shadow-sm"
                        : "text-gray-700 hover:bg-gray-100/80 dark:text-gray-300 dark:hover:bg-gray-800/50 hover:translate-x-1"
                    }`}
                  >
                    <item.icon className={`h-5 w-5 ${
                      pathname === item.href 
                        ? "text-green-600 dark:text-green-400" 
                        : "text-gray-500 dark:text-gray-400"
                    }`} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t p-4 bg-white/50 dark:bg-gray-800/50">
          <button
            onClick={logout}
            className="flex w-full items-center justify-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-all duration-200"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
}

