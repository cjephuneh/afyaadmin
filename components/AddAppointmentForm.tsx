"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import api from "@/utils/api"

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

export function AddAppointmentForm({ onSuccess }: { onSuccess: () => void }) {
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
      await api.post("/appointments", formData)
      toast({
        title: "Success",
        description: "Appointment scheduled successfully",
      })
      onSuccess()
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="appointment_method">Appointment Method</Label>
        <Select
          name="appointment_method"
          onValueChange={(value) => handleSelectChange("appointment_method", value)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select appointment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="in-person">In-person</SelectItem>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="phone">Phone</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="time">Time</Label>
        <Input id="time" name="time" type="time" value={formData.time} onChange={handleChange} required />
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
        <Label htmlFor="purpose">Purpose</Label>
        <Input id="purpose" name="purpose" value={formData.purpose} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="details">Details</Label>
        <Input id="details" name="details" value={formData.details} onChange={handleChange} />
      </div>
      <Button type="submit">Schedule Appointment</Button>
    </form>
  )
}

