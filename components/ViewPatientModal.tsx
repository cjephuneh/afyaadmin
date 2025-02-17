import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Patient {
  id: number
  name: string
  dob: string
  email: string
  phone: string
  address: string
  medicalHistory: string
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
            <h3 className="font-semibold">Date of Birth</h3>
            <p>{patient.dob}</p>
          </div>
          <div>
            <h3 className="font-semibold">Email</h3>
            <p>{patient.email}</p>
          </div>
          <div>
            <h3 className="font-semibold">Phone</h3>
            <p>{patient.phone}</p>
          </div>
          <div>
            <h3 className="font-semibold">Address</h3>
            <p>{patient.address}</p>
          </div>
          <div>
            <h3 className="font-semibold">Medical History</h3>
            <p>{patient.medicalHistory}</p>
          </div>
        </div>
        <Button onClick={onClose}>Close</Button>
      </DialogContent>
    </Dialog>
  )
}

