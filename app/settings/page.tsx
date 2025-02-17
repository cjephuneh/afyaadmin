"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import api from "@/utils/api"
import { toast, useToast } from "@/hooks/use-toast"

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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Add New Admin</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                name="first_name"
                value={newAdmin.first_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="last_name">Last Name</Label>
              <Input id="last_name" name="last_name" value={newAdmin.last_name} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={newAdmin.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                name="phone_number"
                value={newAdmin.phone_number}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={newAdmin.password}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <Button type="submit">Add Admin</Button>
        </form>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Admin List</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>{`${admin.first_name} ${admin.last_name}`}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>{admin.phone_number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

