"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import api from "@/utils/api"
import { UserCheck, User, Stethoscope, Pill, LightbulbIcon } from "lucide-react"

interface ReportFormData {
  appointment_id: number
  doctor_id: number
  patient_id: number
  diagnosis: string
  prescription: string
  recommendations: string
}

export function AddReportForm({ onSuccess }: { onSuccess: () => void }) {
  const {toast} = useToast()

  const [formData, setFormData] = useState<ReportFormData>({
    appointment_id: 0,
    doctor_id: 0,
    patient_id: 0,
    diagnosis: "",
    prescription: "",
    recommendations: "",
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
      await api.post("/reports", formData)
      toast({
        title: "Success",
        description: "Report added successfully",
      })
      onSuccess()
      setFormData({
        appointment_id: 0,
        doctor_id: 0,
        patient_id: 0,
        diagnosis: "",
        prescription: "",
        recommendations: "",
      })
    } catch (error) {
      console.error("Error adding report:", error)
      toast({
        title: "Error",
        description: "Failed to add report",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-5">
      <div className="space-y-2">
        <Label htmlFor="appointment_id" className="text-sm font-medium text-gray-700">Appointment ID</Label>
        <Input
          id="appointment_id"
          name="appointment_id"
          type="number"
          value={formData.appointment_id || ""}
          onChange={handleChange}
          required
          className="h-12 rounded-lg border-gray-300 bg-white px-4 text-base shadow-sm focus:ring-green-500 focus:border-green-500 transition-colors"
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
          className="h-12 rounded-lg border-gray-300 bg-white px-4 text-base shadow-sm focus:ring-green-500 focus:border-green-500 transition-colors"
        />
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
          className="h-12 rounded-lg border-gray-300 bg-white px-4 text-base shadow-sm focus:ring-green-500 focus:border-green-500 transition-colors"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="diagnosis" className="text-sm font-medium text-gray-700 flex items-center">
          <Stethoscope className="h-4 w-4 mr-2 text-gray-500" />
          Diagnosis
        </Label>
        <Textarea 
          id="diagnosis" 
          name="diagnosis" 
          value={formData.diagnosis} 
          onChange={handleChange} 
          required 
          className="min-h-[100px] rounded-lg border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 transition-colors"
          placeholder="Enter detailed diagnosis"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="prescription" className="text-sm font-medium text-gray-700 flex items-center">
          <Pill className="h-4 w-4 mr-2 text-gray-500" />
          Prescription
        </Label>
        <Textarea
          id="prescription"
          name="prescription"
          value={formData.prescription}
          onChange={handleChange}
          required
          className="min-h-[100px] rounded-lg border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 transition-colors"
          placeholder="Enter medication and dosage details"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="recommendations" className="text-sm font-medium text-gray-700 flex items-center">
          <LightbulbIcon className="h-4 w-4 mr-2 text-gray-500" />
          Recommendations
        </Label>
        <Textarea
          id="recommendations"
          name="recommendations"
          value={formData.recommendations}
          onChange={handleChange}
          className="min-h-[100px] rounded-lg border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 transition-colors"
          placeholder="Any additional recommendations for the patient"
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full h-12 mt-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
      >
        Add Report
      </Button>
    </form>
  )
}

