"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LayoutDashboard, Stethoscope, Users, Calendar, FileText, Settings, MessageSquare, LogOut } from "lucide-react"
// import { useAuth } from "@/context/AuthContext"

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Stethoscope, label: "Doctors", href: "/doctors" },
  { icon: Users, label: "Patients", href: "/patients" },
  { icon: Calendar, label: "Appointments", href: "/appointments" },
  { icon: FileText, label: "Appointment Reports", href: "/reports" },
  { icon: MessageSquare, label: "Feedback", href: "/feedback" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function Sidebar() {
  const pathname = usePathname()
  // const { logout } = useAuth()

  return (
    <div className="w-64 border-r bg-white dark:bg-gray-800">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-4">
          <Link className="flex items-center gap-2 font-semibold" href="/">
            <Stethoscope className="h-6 w-6" />
            <span>Telemedicine Admin</span>
          </Link>
        </div>
        <ScrollArea className="flex-1">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <div className="space-y-1">
                {sidebarItems.map((item, index) => (
                  <Button
                    key={index}
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="border-t p-4">
          <Button variant="ghost" className="w-full justify-start" >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}

