import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { User, Mail, Phone, Calendar, HomeIcon, FileText } from "lucide-react"

interface Patient {
  id: number
  name: string
  dob: string
  email: string
  phone: string
  address: string
  medicalHistory: string
}

interface EditPatientModalProps {
  patient: Patient
  isOpen: boolean
  onClose: () => void
  onUpdate: (updatedPatient: Patient) => void
}

export function EditPatientModal({ patient, isOpen, onClose, onUpdate }: EditPatientModalProps) {
  const {toast} = useToast()
  const [formData, setFormData] = useState(patient)

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
      title: "Patient Updated",
      description: `${formData.name}'s information has been successfully updated.`,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-xl border-none shadow-xl bg-white p-0 overflow-hidden">
        <DialogHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <DialogTitle className="text-2xl font-bold">Edit Patient</DialogTitle>
          <p className="text-white/80 text-sm">Update patient information</p>
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
              value={formData.name} 
              onChange={handleChange} 
              required 
              className="h-12 rounded-lg border-gray-300 bg-white px-4 text-base shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dob" className="text-sm font-medium text-gray-700 flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              Date of Birth
            </Label>
            <Input 
              id="dob" 
              name="dob" 
              type="date" 
              value={formData.dob} 
              onChange={handleChange} 
              required 
              className="h-12 rounded-lg border-gray-300 bg-white px-4 text-base shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
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
              className="h-12 rounded-lg border-gray-300 bg-white px-4 text-base shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
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
              value={formData.phone} 
              onChange={handleChange} 
              required 
              className="h-12 rounded-lg border-gray-300 bg-white px-4 text-base shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-medium text-gray-700 flex items-center">
              <HomeIcon className="h-4 w-4 mr-2 text-gray-500" />
              Address
            </Label>
            <Input 
              id="address" 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
              required 
              className="h-12 rounded-lg border-gray-300 bg-white px-4 text-base shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="medicalHistory" className="text-sm font-medium text-gray-700 flex items-center">
              <FileText className="h-4 w-4 mr-2 text-gray-500" />
              Medical History
            </Label>
            <Textarea
              id="medicalHistory"
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleChange}
              className="min-h-[120px] rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
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
              className="flex-1 h-12 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
            >
              Update Patient
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

