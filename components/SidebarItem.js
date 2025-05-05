import Link from "next/link"


export const SidebarItem = ({ href, icon, title, onClick }) => {
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

