import type React from "react"
import Link from "next/link"

interface SidebarItemProps {
  icon: React.ReactElement
  title: string
  href: string
  onClick?: () => void
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon, title, href, onClick }) => {
  return (
    <li className="mb-2">
      <Link
        href={href}
        className="flex items-center gap-x-3 p-2 rounded-md hover:bg-zinc-700 text-white"
        onClick={onClick}
      >
        {icon}
        <span>{title}</span>
      </Link>
    </li>
  )
}

