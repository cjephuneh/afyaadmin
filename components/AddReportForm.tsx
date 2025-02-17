"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import api from "@/utils/api"

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="appointment_id">Appointment ID</Label>
        <Input
          id="appointment_id"
          name="appointment_id"
          type="number"
          value={formData.appointment_id || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="doctor_id">Doctor ID</Label>
        <Input
          id="doctor_id"
          name="doctor_id"
          type="number"
          value={formData.doctor_id || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="patient_id">Patient ID</Label>
        <Input
          id="patient_id"
          name="patient_id"
          type="number"
          value={formData.patient_id || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="diagnosis">Diagnosis</Label>
        <Textarea id="diagnosis" name="diagnosis" value={formData.diagnosis} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="prescription">Prescription</Label>
        <Textarea
          id="prescription"
          name="prescription"
          value={formData.prescription}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="recommendations">Recommendations</Label>
        <Textarea
          id="recommendations"
          name="recommendations"
          value={formData.recommendations}
          onChange={handleChange}
        />
      </div>
      <Button type="submit">Add Report</Button>
    </form>
  )
}

