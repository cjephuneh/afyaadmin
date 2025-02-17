"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import api from "@/utils/api"

interface DoctorFormData {
  first_name: string
  last_name: string
  email: string
  phone_number: string
  gender: string
  specialization: string
  about: string
}

export function AddDoctorForm({ onSuccess }: { onSuccess: () => void }) {
    const {toast} = useToast()

  const [formData, setFormData] = useState<DoctorFormData>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    gender: "",
    specialization: "",
    about: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post("/doctors", formData)
      toast({
        title: "Success",
        description: "Doctor added successfully",
      })
      onSuccess()
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        gender: "",
        specialization: "",
        about: "",
      })
    } catch (error) {
      console.error("Error adding doctor:", error)
      toast({
        title: "Error",
        description: "Failed to add doctor",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="first_name">First Name</Label>
        <Input id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="last_name">Last Name</Label>
        <Input id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="phone_number">Phone Number</Label>
        <Input id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="gender">Gender</Label>
        <Input id="gender" name="gender" value={formData.gender} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="specialization">Specialization</Label>
        <Input
          id="specialization"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="about">About</Label>
        <Textarea id="about" name="about" value={formData.about} onChange={handleChange} required />
      </div>
      <Button type="submit">Add Doctor</Button>
    </form>
  )
}

