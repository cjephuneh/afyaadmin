"use client"

import { createContext, useContext, useState, useEffect } from "react"
import api from "@/utils/api"

interface AuthContextType {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // const token = localStorage.getItem("authToken")
    // if (token) {
    //   api.defaults.headers.common["Authorization"] = `Bearer ${token}`
    //   setIsAuthenticated(true)
    // }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/signin", { email, password })
      // if (response.data.token) {
      //   localStorage.setItem("authToken", response.data.token)
      //   api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`
      // }
      setIsAuthenticated(true)
      return true
    } catch (error) {
      console.error("Login failed:", error)
      return false
    }
  }

  const logout = () => {
    // localStorage.removeItem("authToken")
    // delete api.defaults.headers.common["Authorization"]
    setIsAuthenticated(false)
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

