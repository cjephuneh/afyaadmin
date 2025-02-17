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
  password: string
  phone_number: string
  gender: string
  specialization: string
  about: string
  role: string
  affiliation: string | null
  consultation_fee: number | null
  medical_license_number: string | null
  image_url: string
}

export function AddDoctorForm({ onSuccess }: { onSuccess: () => void }) {
  const { toast } = useToast()

  const [formData, setFormData] = useState<DoctorFormData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "12345678",
    phone_number: "",
    gender: "",
    specialization: "",
    about: "",
    role: "Doctor", // Default to Doctor
    affiliation: "",
    consultation_fee: null,
    medical_license_number: "",
    image_url: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "consultation_fee" ? Number(value) : value,
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
        password: "Admin",
        gender: "",
        specialization: "",
        about: "",
        role: "Doctor",
        affiliation: "",
        consultation_fee: null,
        medical_license_number: "",
        image_url: "",
      })
    } catch (error) {
      console.error("Error adding doctor:", error)
      toast({
        title: "Error",
        description: "Failed to add doctor",
        variant: "destructive",
      })
      console.log("Payload:", formData)

    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <div className="md:col-span-2">
          <Label htmlFor="about">About</Label>
          <Textarea id="about" name="about" value={formData.about} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="role">Role</Label>
          <Input id="role" name="role" value={formData.role} onChange={handleChange} readOnly />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" value={formData.password} onChange={handleChange} readOnly />
        </div>
        <div>
          <Label htmlFor="affiliation">Affiliation</Label>
          <Input id="affiliation" name="affiliation" value={formData.affiliation || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="consultation_fee">Consultation Fee (Ksh)</Label>
          <Input
            id="consultation_fee"
            name="consultation_fee"
            type="number"
            value={formData.consultation_fee || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="medical_license_number">Medical License Number</Label>
          <Input
            id="medical_license_number"
            name="medical_license_number"
            value={formData.medical_license_number || ""}
            onChange={handleChange}
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="image_url">Image URL</Label>
          <Input id="image_url" name="image_url" value={formData.image_url} onChange={handleChange} />
        </div>
      </div>
      <Button type="submit" className="w-full">Add Doctor</Button>
    </form>
  )
}
