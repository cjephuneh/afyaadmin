import { LoginForm } from "@/components/LoginForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Stethoscope } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-500 to-blue-600 items-center justify-center p-12">
        <div className="max-w-xl text-white">
          <div className="mb-8 flex items-center space-x-2">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Stethoscope className="h-10 w-10" />
            </div>
            <h1 className="text-3xl font-bold">Afya Mkononi</h1>
          </div>
          <h2 className="text-4xl font-extrabold leading-tight mb-6">Simplify your healthcare administration with our powerful dashboard</h2>
          <p className="text-xl opacity-80 mb-8">Manage patients, doctors, appointments, and more - all from one intuitive interface.</p>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
              <h3 className="font-semibold text-xl mb-2">Easy Scheduling</h3>
              <p className="opacity-80">Manage appointments efficiently with our intuitive calendar interface</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
              <h3 className="font-semibold text-xl mb-2">Patient Management</h3>
              <p className="opacity-80">Keep track of patient information, history, and preferences</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
              <h3 className="font-semibold text-xl mb-2">Doctor Management</h3>
              <p className="opacity-80">Organize doctor profiles, specialties, and availability</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
              <h3 className="font-semibold text-xl mb-2">Analytics & Reports</h3>
              <p className="opacity-80">Gain insights with comprehensive data visualization tools</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md border-none shadow-xl">
          <CardHeader className="space-y-1">
            <div className="flex items-center space-x-2 mb-2">
              <div className="p-1.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Afya Mkononi</span>
            </div>
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>Sign in to access your admin dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

