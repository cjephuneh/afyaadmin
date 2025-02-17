import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/Sidebar"
// import { AuthProvider } from "@/context/AuthContext"
// import { ProtectedRoute } from "@/components/ProtectedRoute"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Telemedicine Admin Dashboard",
  description: "Admin dashboard for telemedicine application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <AuthProvider>
          <ProtectedRoute> */}
            <div className="flex h-screen overflow-hidden">
              <Sidebar />
              <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6">{children}</main>
            </div>
          {/* </ProtectedRoute>
        </AuthProvider> */}
      </body>
    </html>
  )
}

