import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { User, Mail, Phone, Award, BookOpen } from "lucide-react"

interface Doctor {
  id: number
  first_name: string
  specialization: string
  email: string
  phone_number: string
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
      description: `${formData.first_name}'s information has been successfully updated.`,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-xl border-none shadow-xl bg-white p-0 overflow-hidden">
        <DialogHeader className="bg-gradient-to-r from-blue-700 to-teal-600 p-6 text-white">
          <DialogTitle className="text-2xl font-bold">Edit Doctor</DialogTitle>
          <p className="text-white/80 text-sm">Update doctor information</p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center">
              <User className="h-4 w-4 mr-2 text-gray-500" />
              Name
            </Label>
            <Input 
              id="name" 
              name="name" 
              value={formData.first_name} 
              onChange={handleChange} 
              required 
              className="h-12 rounded-lg border-gray-300 bg-white px-4 text-base shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="specialization" className="text-sm font-medium text-gray-700 flex items-center">
              <Award className="h-4 w-4 mr-2 text-gray-500" />
              Specialization
            </Label>
            <Input
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
              className="h-12 rounded-lg border-gray-300 bg-white px-4 text-base shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center">
              <Mail className="h-4 w-4 mr-2 text-gray-500" />
              Email
            </Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              className="h-12 rounded-lg border-gray-300 bg-white px-4 text-base shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center">
              <Phone className="h-4 w-4 mr-2 text-gray-500" />
              Phone
            </Label>
            <Input 
              id="phone" 
              name="phone" 
              value={formData.phone_number} 
              onChange={handleChange} 
              required 
              className="h-12 rounded-lg border-gray-300 bg-white px-4 text-base shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="qualifications" className="text-sm font-medium text-gray-700 flex items-center">
              <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
              Qualifications
            </Label>
            <Textarea
              id="qualifications"
              name="qualifications"
              value={formData.qualifications}
              onChange={handleChange}
              required
              className="min-h-[120px] rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          
          <div className="pt-2 flex gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="flex-1 h-12 rounded-lg border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 h-12 rounded-lg bg-gradient-to-r from-blue-700 to-teal-600 text-white hover:from-blue-800 hover:to-teal-700 transition-all duration-200"
            >
              Update Doctor
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

