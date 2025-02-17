import type React from "react"
import { useFormContext } from "react-hook-form"

interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
}

interface UserPreviewProps {
  user: User
  isSelected: boolean
  onClick: () => void
}

export const UserPreview: React.FC<UserPreviewProps> = ({ user, isSelected, onClick }) => {
  const { formState } = useFormContext()

  return (
    <div
      className={`p-2 rounded-md cursor-pointer transition-colors ${isSelected ? "bg-zinc-700" : "hover:bg-zinc-700"}`}
      onClick={onClick}
    >
      <h4 className="font-semibold text-white">{user.name}</h4>
      <p className="text-sm text-zinc-300">{user.email}</p>
      <div className="flex justify-between text-xs mt-1">
        <span className="text-zinc-400">{user.role}</span>
        <span className={`px-1 rounded ${user.status === "Active" ? "bg-green-500" : "bg-red-500"}`}>
          {user.status}
        </span>
      </div>
      {/* Example of using formState */}
      {formState.isSubmitting && <p className="text-xs text-zinc-400">Updating...</p>}
    </div>
  )
}

