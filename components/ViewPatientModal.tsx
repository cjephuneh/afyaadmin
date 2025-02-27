import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Patient {
  id: number
  name: string
  date_of_birth: string
  email: string
  phone_number: string
  address: string
  medicalHistory: string
  national_id: string
  first_name: string
  gender: string
}

interface ViewPatientModalProps {
  patient: Patient
  isOpen: boolean
  onClose: () => void
}

export function ViewPatientModal({ patient, isOpen, onClose }: ViewPatientModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{patient.name}</DialogTitle>
          <DialogDescription>Patient Details</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <h3 className="font-semibold">Name</h3>
            <p>{patient.first_name}</p>
          </div>
          <div>
            <h3 className="font-semibold">Date of Birth</h3>
            <p>{patient.date_of_birth}</p>
          </div>
          <div>
            <h3 className="font-semibold">Date of Birth</h3>
            <p>{patient.gender}</p>
          </div>
          <div>
            <h3 className="font-semibold">Email</h3>
            <p>{patient.email}</p>
          </div>
          <div>
            <h3 className="font-semibold">Phone</h3>
            <p>{patient.phone_number}</p>
          </div>
          <div>
            <h3 className="font-semibold">National ID</h3>
            <p>{patient.national_id}</p>
          </div>
         
        </div>
        <Button onClick={onClose}>Close</Button>
      </DialogContent>
    </Dialog>
  )
}

