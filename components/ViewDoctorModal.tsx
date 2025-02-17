import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Doctor {
  id: number
  name: string
  specialization: string
  email: string
  phone: string
  qualifications: string
}

interface ViewDoctorModalProps {
  doctor: Doctor
  isOpen: boolean
  onClose: () => void
}

export function ViewDoctorModal({ doctor, isOpen, onClose }: ViewDoctorModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{doctor.name}</DialogTitle>
          <DialogDescription>Doctor Details</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <h3 className="font-semibold">Specialization</h3>
            <p>{doctor.specialization}</p>
          </div>
          <div>
            <h3 className="font-semibold">Email</h3>
            <p>{doctor.email}</p>
          </div>
          <div>
            <h3 className="font-semibold">Phone</h3>
            <p>{doctor.phone}</p>
          </div>
          <div>
            <h3 className="font-semibold">Qualifications</h3>
            <p>{doctor.qualifications}</p>
          </div>
        </div>
        <Button onClick={onClose}>Close</Button>
      </DialogContent>
    </Dialog>
  )
}

