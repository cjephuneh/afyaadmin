"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import api from "@/utils/api"
import { Calendar, Clock, User, UserCheck, FileText, MessageSquare } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

interface AppointmentFormData {
  appointment_method: string
  date: string
  time: string
  status: string
  patient_id: number
  doctor_id: number
  details?: string
  purpose?: string
}

export function AddAppointmentForm() {
  const {toast} = useToast()

  const [formData, setFormData] = useState<AppointmentFormData>({
    appointment_method: "",
    date: "",
    time: "",
    status: "scheduled",
    patient_id: 0,
    doctor_id: 0,
    details: "",
    purpose: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      await api.post("/appointments", formData)
      toast({
        title: "Success",
        description: "Appointment scheduled successfully",
      })
      setFormData({
        appointment_method: "",
        date: "",
        time: "",
        status: "scheduled",
        patient_id: 0,
        doctor_id: 0,
        details: "",
        purpose: "",
      })
    } catch (error) {
      console.error("Error scheduling appointment:", error)
      toast({
        title: "Error",
        description: "Failed to schedule appointment",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-5">
      <div className="space-y-2">
        <Label htmlFor="appointment_method" className="text-sm font-medium text-gray-700 flex items-center">
          <FileText className="h-4 w-4 mr-2 text-gray-500" />
          Appointment Method
        </Label>
        <Select
          name="appointment_method"
          onValueChange={(value) => handleSelectChange("appointment_method", value)}
          required
        >
          <SelectTrigger className="h-12 rounded-lg border-gray-300 bg-white px-4 text-base shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors">
            <SelectValue placeholder="Select appointment method" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200 rounded-lg shadow-lg">
            <SelectItem value="in-person" className="py-3 px-4 hover:bg-blue-50">In-person</SelectItem>
            <SelectItem value="video" className="py-3 px-4 hover:bg-blue-50">Video</SelectItem>
            <SelectItem value="phone" className="py-3 px-4 hover:bg-blue-50">Phone</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="date" className="text-sm font-medium text-gray-700 flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            Date
          </Label>
          <Input 
            id="date" 
            name="date" 
            type="date" 
            value={formData.date} 
            onChange={handleChange} 
            required 
            className="h-12 rounded-lg border-gray-300 bg-white px-4 text-base shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="time" className="text-sm font-medium text-gray-700 flex items-center">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            Time
          </Label>
          <Input 
            id="time" 
            name="time" 
            type="time" 
            value={formData.time} 
            onChange={handleChange} 
            required 
            className="h-12 rounded-lg border-gray-300 bg-white px-4 text-base shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="patient_id" className="text-sm font-medium text-gray-700 flex items-center">
          <User className="h-4 w-4 mr-2 text-gray-500" />
          Patient ID
        </Label>
        <Input
          id="patient_id"
          name="patient_id"
          type="number"
          value={formData.patient_id || ""}
          onChange={handleChange}
          required
          className="h-12 rounded-lg border-gray-300 bg-white px-4 text-base shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="doctor_id" className="text-sm font-medium text-gray-700 flex items-center">
          <UserCheck className="h-4 w-4 mr-2 text-gray-500" />
          Doctor ID
        </Label>
        <Input
          id="doctor_id"
          name="doctor_id"
          type="number"
          value={formData.doctor_id || ""}
          onChange={handleChange}
          required
          className="h-12 rounded-lg border-gray-300 bg-white px-4 text-base shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="purpose" className="text-sm font-medium text-gray-700 flex items-center">
          <FileText className="h-4 w-4 mr-2 text-gray-500" />
          Purpose
        </Label>
        <Input 
          id="purpose" 
          name="purpose" 
          value={formData.purpose} 
          onChange={handleChange}
          className="h-12 rounded-lg border-gray-300 bg-white px-4 text-base shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="details" className="text-sm font-medium text-gray-700 flex items-center">
          <MessageSquare className="h-4 w-4 mr-2 text-gray-500" />
          Details
        </Label>
        <Textarea 
          id="details" 
          name="details" 
          value={formData.details} 
          onChange={handleChange}
          className="min-h-[100px] rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Additional details about the appointment"
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full h-12 mt-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
      >
        Schedule Appointment
      </Button>
    </form>
  )
}

