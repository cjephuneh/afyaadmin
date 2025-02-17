import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"


interface Appointment {
  id: number
  doctorId: string
  patientId: string
  date: string
  time: string
  type: string
  status: string
}

interface EditAppointmentModalProps {
  appointment: Appointment
  isOpen: boolean
  onClose: () => void
  onUpdate: (updatedAppointment: Appointment) => void
}

export function EditAppointmentModal({ appointment, isOpen, onClose, onUpdate }: EditAppointmentModalProps) {
    const {toast} = useToast()
  const [formData, setFormData] = useState(appointment)

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(formData)
    toast({
      title: "Appointment Updated",
      description: `Appointment has been successfully updated.`,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Appointment</DialogTitle>
          <DialogDescription>Update appointment information</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="doctorId">Doctor</Label>
            <Select
              name="doctorId"
              onValueChange={(value) => handleSelectChange("doctorId", value)}
              defaultValue={formData.doctorId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a doctor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Dr. John Doe</SelectItem>
                <SelectItem value="2">Dr. Jane Smith</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="patientId">Patient</Label>
            <Select
              name="patientId"
              onValueChange={(value) => handleSelectChange("patientId", value)}
              defaultValue={formData.patientId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a patient" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Alice Johnson</SelectItem>
                <SelectItem value="2">Bob Williams</SelectItem>
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
            <Label htmlFor="type">Appointment Type</Label>
            <Select
              name="type"
              onValueChange={(value) => handleSelectChange("type", value)}
              defaultValue={formData.type}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select appointment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="consultation">Consultation</SelectItem>
                <SelectItem value="followUp">Follow-up</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              name="status"
              onValueChange={(value) => handleSelectChange("status", value)}
              defaultValue={formData.status}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Update Appointment</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

