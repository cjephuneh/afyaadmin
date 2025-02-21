"use client"

// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { AuthProvider } from "@/context/AuthContext";
import { usePathname } from "next/navigation"; // Import usePathname
import type React from "react";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Telemedicine Admin Dashboard",
//   description: "Admin dashboard for telemedicine application",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Get the current route

  // Define routes where the sidebar should NOT appear
  const hideSidebarRoutes = ["/login", "/register", "/forgot-password"];

  // Check if the current route is in the hideSidebarRoutes array
  const shouldHideSidebar = hideSidebarRoutes.includes(pathname);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex h-screen overflow-hidden">
            {/* Render sidebar only if not on login/register pages */}
            {!shouldHideSidebar && <Sidebar />}
            <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
