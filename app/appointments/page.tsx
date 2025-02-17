"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AddAppointmentForm } from "@/components/AddAppointmentForm"
import { ViewAppointmentModal } from "@/components/ViewAppointmentModal"
import { EditAppointmentModal } from "@/components/EditAppointmentModal"
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

export default function AppointmentsPage() {
    const {toast} = useToast()

  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [viewAppointment, setViewAppointment] = useState<Appointment | null>(null)
  const [editAppointment, setEditAppointment] = useState<Appointment | null>(null)

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      const response = await api.get("/appointments")
      setAppointments(response.data)
    } catch (error) {
      console.error("Error fetching appointments:", error)
      toast({
        title: "Error",
        description: "Failed to fetch appointments",
        variant: "destructive",
      })
    }
  }

  const handleAddAppointment = async (newAppointment: Omit<Appointment, "id">) => {
    try {
      await api.post("/appointments", newAppointment)
      toast({
        title: "Success",
        description: "Appointment added successfully",
      })
      fetchAppointments()
      setIsAddDialogOpen(false)
    } catch (error) {
      console.error("Error adding appointment:", error)
      toast({
        title: "Error",
        description: "Failed to add appointment",
        variant: "destructive",
      })
    }
  }

  const handleUpdateAppointment = async (updatedAppointment: Appointment) => {
    try {
      await api.put(`/appointments/${updatedAppointment.id}`, updatedAppointment)
      toast({
        title: "Success",
        description: "Appointment updated successfully",
      })
      fetchAppointments()
      setEditAppointment(null)
    } catch (error) {
      console.error("Error updating appointment:", error)
      toast({
        title: "Error",
        description: "Failed to update appointment",
        variant: "destructive",
      })
    }
  }

  const handleDeleteAppointment = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await api.delete(`/appointments/${id}`)
        toast({
          title: "Success",
          description: "Appointment deleted successfully",
        })
        fetchAppointments()
      } catch (error) {
        console.error("Error deleting appointment:", error)
        toast({
          title: "Error",
          description: "Failed to delete appointment",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Appointments</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Appointment</DialogTitle>
            </DialogHeader>
            <AddAppointmentForm onSubmit={handleAddAppointment} />
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Patient ID</TableHead>
            <TableHead>Doctor ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{appointment.date}</TableCell>
              <TableCell>{appointment.time}</TableCell>
              <TableCell>{appointment.patient_id}</TableCell>
              <TableCell>{appointment.doctor_id}</TableCell>
              <TableCell>{appointment.status}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2" onClick={() => setViewAppointment(appointment)}>
                  View
                </Button>
                <Button variant="outline" size="sm" className="mr-2" onClick={() => setEditAppointment(appointment)}>
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDeleteAppointment(appointment.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {viewAppointment && (
        <ViewAppointmentModal
          appointment={viewAppointment}
          isOpen={!!viewAppointment}
          onClose={() => setViewAppointment(null)}
        />
      )}
      {editAppointment && (
        <EditAppointmentModal
          appointment={editAppointment}
          isOpen={!!editAppointment}
          onClose={() => setEditAppointment(null)}
          onUpdate={handleUpdateAppointment}
        />
      )}
    </div>
  )
}

