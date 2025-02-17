"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import api from "@/utils/api"

interface PatientFormData {
  first_name: string
  last_name: string
  email: string
  phone_number: string
  gender: string
  national_id: string
  date_of_birth: string
}

export function AddPatientForm({ onSuccess }: { onSuccess: () => void }) {
    const {toast} = useToast()

  const [formData, setFormData] = useState<PatientFormData>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    gender: "",
    national_id: "",
    date_of_birth: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post("/patients", formData)
      toast({
        title: "Success",
        description: "Patient added successfully",
      })
      onSuccess()
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        gender: "",
        national_id: "",
        date_of_birth: "",
      })
    } catch (error) {
      console.error("Error adding patient:", error)
      toast({
        title: "Error",
        description: "Failed to add patient",
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
        <Label htmlFor="national_id">National ID</Label>
        <Input id="national_id" name="national_id" value={formData.national_id} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="date_of_birth">Date of Birth</Label>
        <Input
          id="date_of_birth"
          name="date_of_birth"
          type="date"
          value={formData.date_of_birth}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit">Add Patient</Button>
    </form>
  )
}

