// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { useAuth } from "@/context/AuthContext"
// import { useToast } from "@/hooks/use-toast"

// export function LoginForm() {
//   const [email, setEmail] = useState("mburuelvee19@gmail.com")
//   const [password, setPassword] = useState("Admin")
//   const [isLoading, setIsLoading] = useState(false)
//   const router = useRouter()
//   const { login } = useAuth()

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     const {toast} = useToast()

//     //React.FormEvent was missing HTMLFormElement
//     e.preventDefault()
//     setIsLoading(true)
//     try {
//       const success = await login(email, password)
//       if (success) {
//         toast({
//           title: "Success",
//           description: "Logged in successfully",
//         })
//         router.push("/")
//       } else {
//         toast({
//           title: "Error",
//           description: "Invalid email or password",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "An error occurred during login",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <Label htmlFor="email">Email</Label>
//         <Input
//           id="email"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           disabled={isLoading}
//         />
//       </div>
//       <div>
//         <Label htmlFor="password">Password</Label>
//         <Input
//           id="password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           disabled={isLoading}
//         />
//       </div>
//       <Button type="submit" className="w-full" disabled={isLoading}>
//         {isLoading ? "Logging in..." : "Login"}
//       </Button>
//     </form>
//   )
// }



import React from 'react'

function LoginForm() {
  return (
    <div>LoginForm</div>
  )
}

export default LoginForm