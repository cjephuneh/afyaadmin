"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import api from "@/utils/api"
import { User, Mail, Phone, Calendar, IdCard, CreditCard } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PatientFormData {
  first_name: string
  last_name: string
  email: string
  phone_number: string
  gender: string
  national_id: string
  password: string
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
    password: "Adminaa@123",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
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
        password: "Adminaa@123",
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
    <form onSubmit={handleSubmit} className="p-6 space-y-5">
      <div className="grid grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="first_name" className="text-sm font-medium text-gray-700 flex items-center">
            <User className="h-4 w-4 mr-2 text-gray-500" />
            First Name
          </Label>
          <Input 
            id="first_name" 
            name="first_name" 
            value={formData.first_name} 
            onChange={handleChange} 
            required 
            className="h-12 rounded-lg border-gray-300 bg-white px-4 text-base shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="last_name" className="text-sm font-medium text-gray-700 flex items-center">
            <User className="h-4 w-4 mr-2 text-gray-500" />
            Last Name
          </Label>
          <Input 
            id="last_name" 
            name="last_name" 
            value={formData.last_name} 
            onChange={handleChange} 
            required 
            className="h-12 rounded-lg border-gray-300 bg-white px-4 text-base shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center">
          <Mail className="h-4 w-4 mr-2 text-gray-500" />
          Email
        </Label>
        <Input 
          id="email" 
          name="email" 
          type="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
          className="h-12 rounded-lg border-gray-300 bg-white px-4 text-base shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone_number" className="text-sm font-medium text-gray-700 flex items-center">
          <Phone className="h-4 w-4 mr-2 text-gray-500" />
          Phone Number
        </Label>
        <Input 
          id="phone_number" 
          name="phone_number" 
          value={formData.phone_number} 
          onChange={handleChange} 
          required 
          className="h-12 rounded-lg border-gray-300 bg-white px-4 text-base shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="gender" className="text-sm font-medium text-gray-700 flex items-center">
          <User className="h-4 w-4 mr-2 text-gray-500" />
          Gender
        </Label>
        <Select
          name="gender"
          onValueChange={(value) => handleSelectChange("gender", value)}
          required
        >
          <SelectTrigger className="h-12 rounded-lg border-gray-300 bg-white px-4 text-base shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200 rounded-lg shadow-lg">
            <SelectItem value="Male" className="py-3 px-4 hover:bg-indigo-50">Male</SelectItem>
            <SelectItem value="Female" className="py-3 px-4 hover:bg-indigo-50">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="national_id" className="text-sm font-medium text-gray-700 flex items-center">
          <IdCard className="h-4 w-4 mr-2 text-gray-500" />
          National ID
        </Label>
        <Input 
          id="national_id" 
          name="national_id" 
          value={formData.national_id} 
          onChange={handleChange} 
          required 
          className="h-12 rounded-lg border-gray-300 bg-white px-4 text-base shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="date_of_birth" className="text-sm font-medium text-gray-700 flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
          Date of Birth
        </Label>
        <Input
          id="date_of_birth"
          name="date_of_birth"
          type="date"
          value={formData.date_of_birth}
          onChange={handleChange}
          required
          className="h-12 rounded-lg border-gray-300 bg-white px-4 text-base shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center">
          <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
          Password (Default)
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          disabled
          className="h-12 rounded-lg border-gray-300 bg-gray-50 px-4 text-base shadow-sm cursor-not-allowed"
        />
        <p className="text-xs text-gray-500 mt-1">Default password assigned to new patients</p>
      </div>
      
      <Button 
        type="submit" 
        className="w-full h-12 mt-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
      >
        Add Patient
      </Button>
    </form>
  )
}

