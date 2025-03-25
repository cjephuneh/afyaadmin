"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import api from "@/utils/api"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserPlus, Lock, Bell, Sun, Users, Shield } from "lucide-react"

interface Admin {
  id: number
  first_name: string
  last_name: string
  email: string
  phone_number: string
}

export default function SettingsPage() {
  const { toast } = useToast()
  const [admins, setAdmins] = useState<Admin[]>([])
  const [newAdmin, setNewAdmin] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
  })

  useEffect(() => {
    fetchAdmins()
  }, [])

  const fetchAdmins = async () => {
    try {
      const response = await api.get("/admins")
      setAdmins(response.data)
    } catch (error) {
      console.error("Error fetching admins:", error)
      toast({
        title: "Error",
        description: "Failed to fetch admins",
        variant: "destructive",
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post("/admins", newAdmin)
      toast({
        title: "Success",
        description: "New admin added successfully",
      })
      fetchAdmins()
      setNewAdmin({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        password: "",
      })
    } catch (error) {
      console.error("Error adding new admin:", error)
      toast({
        title: "Error",
        description: "Failed to add new admin",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-8 p-6 bg-gray-50 rounded-xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
        <p className="text-gray-500">Manage your application settings and administrators</p>
      </div>

      <Tabs defaultValue="admins" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="admins" className="flex items-center gap-2">
            <Shield className="h-4 w-4" /> Admins
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <Users className="h-4 w-4" /> Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Sun className="h-4 w-4" /> Appearance
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="admins" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                <UserPlus className="h-5 w-5" /> Add New Admin
              </CardTitle>
              <CardDescription>Create a new administrator account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="first_name" className="text-sm font-medium text-gray-700">First Name</Label>
                    <Input
                      id="first_name"
                      name="first_name"
                      value={newAdmin.first_name}
                      onChange={handleInputChange}
                      className="h-12 rounded-lg border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name" className="text-sm font-medium text-gray-700">Last Name</Label>
                    <Input 
                      id="last_name" 
                      name="last_name" 
                      value={newAdmin.last_name} 
                      onChange={handleInputChange} 
                      className="h-12 rounded-lg border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={newAdmin.email}
                      onChange={handleInputChange}
                      className="h-12 rounded-lg border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone_number" className="text-sm font-medium text-gray-700">Phone Number</Label>
                    <Input
                      id="phone_number"
                      name="phone_number"
                      value={newAdmin.phone_number}
                      onChange={handleInputChange}
                      className="h-12 rounded-lg border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={newAdmin.password}
                        onChange={handleInputChange}
                        className="pl-10 h-12 rounded-lg border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="mt-6 rounded-full bg-blue-600 px-6 py-2.5 text-white hover:bg-blue-700 shadow-md transition-all duration-200"
                >
                  <UserPlus className="mr-2 h-4 w-4" /> Add Admin
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                <Shield className="h-5 w-5" /> Admin List
              </CardTitle>
              <CardDescription>View and manage administrators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</TableHead>
                      <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</TableHead>
                      <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone Number</TableHead>
                      <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {admins.map((admin) => (
                      <TableRow key={admin.id} className="hover:bg-gray-50">
                        <TableCell className="px-6 py-4 text-sm text-gray-600 font-medium">{`${admin.first_name} ${admin.last_name}`}</TableCell>
                        <TableCell className="px-6 py-4 text-sm text-gray-600">{admin.email}</TableCell>
                        <TableCell className="px-6 py-4 text-sm text-gray-600">{admin.phone_number}</TableCell>
                        <TableCell className="px-6 py-4 text-sm">
                          <Button variant="outline" size="sm" className="mr-2 rounded-lg border-gray-300 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-lg border-gray-300 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all">
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Account Settings</CardTitle>
              <CardDescription>Update your account preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Account settings will be available in future updates.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Notification Settings</CardTitle>
              <CardDescription>Configure your notification preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Notification settings will be available in future updates.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Appearance Settings</CardTitle>
              <CardDescription>Customize how the application looks</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Appearance settings will be available in future updates.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

