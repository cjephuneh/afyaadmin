import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

interface Doctor {
  id: number
  name: string
  specialization: string
  email: string
  phone: string
  qualifications: string
}

interface EditDoctorModalProps {
  doctor: Doctor
  isOpen: boolean
  onClose: () => void
  onUpdate: (updatedDoctor: Doctor) => void
}

export function EditDoctorModal({ doctor, isOpen, onClose, onUpdate }: EditDoctorModalProps) {
    const {toast} = useToast()

  const [formData, setFormData] = useState(doctor)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(formData)
    toast({
      title: "Doctor Updated",
      description: `${formData.name}'s information has been successfully updated.`,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Doctor</DialogTitle>
          <DialogDescription>Update doctor's information</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="specialization">Specialization</Label>
            <Input
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="qualifications">Qualifications</Label>
            <Textarea
              id="qualifications"
              name="qualifications"
              value={formData.qualifications}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit">Update Doctor</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

