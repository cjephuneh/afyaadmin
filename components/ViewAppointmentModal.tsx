import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Appointment {
  id: number
  doctor_id: string
  patient_id: string
  purpose: string
  date: string
  time: string
  type: string
  status: string
}

interface ViewAppointmentModalProps {
  appointment: Appointment
  isOpen: boolean
  onClose: () => void
}

export function ViewAppointmentModal({ appointment, isOpen, onClose }: ViewAppointmentModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Appointment Details</DialogTitle>
          <DialogDescription>View appointment information</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <h3 className="font-semibold">Doctor</h3>
            <p>{appointment.doctor_id}</p>
          </div>
          <div>
            <h3 className="font-semibold">Patient</h3>
            <p>{appointment.patient_id}</p>
          </div>
          <div>
            <h3 className="font-semibold">Purpose</h3>
            <p>{appointment.purpose}</p>
          </div>
          <div>
            <h3 className="font-semibold">Date</h3>
            <p>{appointment.date}</p>
          </div>
          <div>
            <h3 className="font-semibold">Time</h3>
            <p>{appointment.time}</p>
          </div>
          
          <div>
            <h3 className="font-semibold">Status</h3>
            <p>{appointment.status}</p>
          </div>
        </div>
        <Button onClick={onClose}>Close</Button>
      </DialogContent>
    </Dialog>
  )
}

