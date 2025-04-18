"use client";

import type React from "react";
import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  email: string;
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      console.log("Attempting login with:", email, password);

      const response = await fetch("https://api.afyamkononi.co.ke/admin/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json(); // Parse JSON response

      if (response.ok) {
        setUser(data.user); // Assuming response contains user details
        setIsAuthenticated(true);
        console.log("Login successful, redirecting...");
        router.push("/"); // Redirect on successful login
        return true;
      } else {
        console.error("Login failed:", data?.message || "Invalid credentials");
        return false;
      }
    } catch (error) {
      console.error("Login request error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    router.push("/login"); // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
