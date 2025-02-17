"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import api from "@/utils/api"
import { useToast } from "@/hooks/use-toast"

interface Appointment {
  id: number
  appointment_method: string
  date: string
  time: string
  status: string
  patient_id: number
  doctor_id: number
  details?: string
  purpose?: string
  meet_link?: string
  room_id?: string
}

export default function AppointmentDetailsPage() {
    const {toast} = useToast()

  const { id } = useParams()
  const [appointment, setAppointment] = useState<Appointment | null>(null)

  useEffect(() => {
    fetchAppointment()
  }, []) // Removed unnecessary dependency 'id'

  const fetchAppointment = async () => {
    try {
      const response = await api.get(`/appointments/${id}`)
      setAppointment(response.data)
    } catch (error) {
      console.error("Error fetching appointment:", error)
      toast({
        title: "Error",
        description: "Failed to fetch appointment details",
        variant: "destructive",
      })
    }
  }

  if (!appointment) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Appointment Details</h1>
      <Card>
        <CardHeader>
          <CardTitle>{`Appointment #${appointment.id}`}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Date:</strong> {appointment.date}
            </div>
            <div>
              <strong>Time:</strong> {appointment.time}
            </div>
            <div>
              <strong>Method:</strong> {appointment.appointment_method}
            </div>
            <div>
              <strong>Status:</strong> {appointment.status}
            </div>
            <div>
              <strong>Patient ID:</strong> {appointment.patient_id}
            </div>
            <div>
              <strong>Doctor ID:</strong> {appointment.doctor_id}
            </div>
            <div>
              <strong>Purpose:</strong> {appointment.purpose || "N/A"}
            </div>
            <div>
              <strong>Meet Link:</strong> {appointment.meet_link || "N/A"}
            </div>
            <div>
              <strong>Room ID:</strong> {appointment.room_id || "N/A"}
            </div>
          </div>
          {appointment.details && (
            <div className="mt-4">
              <strong>Details:</strong>
              <p>{appointment.details}</p>
            </div>
          )}
        </CardContent>
      </Card>
      <Button onClick={() => window.history.back()}>Back to Appointments List</Button>
    </div>
  )
}

