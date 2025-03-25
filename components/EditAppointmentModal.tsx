import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, UserCheck, User, FileText, AlertCircle } from "lucide-react"

interface Appointment {
  id: number
  doctorId: string
  patientId: string
  date: string
  time: string
  type: string
  status: string
  details?: string
  doctor_first_name?: string
  doctor_last_name?: string
  patient_first_name?: string
  patient_last_name?: string
}

interface EditAppointmentModalProps {
  appointment: Appointment
  isOpen: boolean
  onClose: () => void
  onUpdate: (updatedAppointment: Appointment) => void
}

export function EditAppointmentModal({ appointment, isOpen, onClose, onUpdate }: EditAppointmentModalProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState(appointment)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      <DialogContent className="max-w-md rounded-xl border-none shadow-xl bg-white p-0 overflow-hidden">
        <DialogHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <DialogTitle className="text-2xl font-bold">Edit Appointment</DialogTitle>
          <p className="text-white/80 text-sm">Update appointment information</p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="doctorName" className="text-sm font-medium text-gray-700 flex items-center">
              <UserCheck className="h-4 w-4 mr-2 text-gray-500" />
              Doctor
            </Label>
            <Select
              name="doctorName"
              onValueChange={(value) => handleSelectChange("doctorName", value)}
              defaultValue={formData.doctorId}
            >
              <SelectTrigger className="h-12 rounded-lg border-gray-300 bg-white px-4 text-base shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors">
                <SelectValue placeholder="Select a doctor" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200 rounded-lg shadow-lg">
                <SelectItem value="1" className="py-3 px-4 hover:bg-blue-50">Dr. John Doe</SelectItem>
                <SelectItem value="2" className="py-3 px-4 hover:bg-blue-50">Dr. Jane Smith</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="patientName" className="text-sm font-medium text-gray-700 flex items-center">
              <User className="h-4 w-4 mr-2 text-gray-500" />
              Patient
            </Label>
            <Select
              name="patientName"
              onValueChange={(value) => handleSelectChange("patientName", value)}
              defaultValue={formData.patientId}
            >
              <SelectTrigger className="h-12 rounded-lg border-gray-300 bg-white px-4 text-base shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors">
                <SelectValue placeholder="Select a patient" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200 rounded-lg shadow-lg">
                <SelectItem value="1" className="py-3 px-4 hover:bg-blue-50">Alice Johnson</SelectItem>
                <SelectItem value="2" className="py-3 px-4 hover:bg-blue-50">Bob Williams</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium text-gray-700 flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                Date
              </Label>
              <div className="relative">
                <Input 
                  id="date" 
                  name="date" 
                  type="date" 
                  value={formData.date} 
                  onChange={handleChange} 
                  required 
                  className="h-12 rounded-lg border-gray-300 bg-white px-4 text-base shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors w-full" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm font-medium text-gray-700 flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                Time
              </Label>
              <div className="relative">
                <Input 
                  id="time" 
                  name="time" 
                  type="time" 
                  value={formData.time} 
                  onChange={handleChange} 
                  required 
                  className="h-12 rounded-lg border-gray-300 bg-white px-4 text-base shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors w-full" 
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type" className="text-sm font-medium text-gray-700 flex items-center">
              <FileText className="h-4 w-4 mr-2 text-gray-500" />
              Appointment Type
            </Label>
            <Select
              name="type"
              onValueChange={(value) => handleSelectChange("type", value)}
              defaultValue={formData.type}
            >
              <SelectTrigger className="h-12 rounded-lg border-gray-300 bg-white px-4 text-base shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors">
                <SelectValue placeholder="Select appointment type" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200 rounded-lg shadow-lg">
                <SelectItem value="consultation" className="py-3 px-4 hover:bg-blue-50">Consultation</SelectItem>
                <SelectItem value="followUp" className="py-3 px-4 hover:bg-blue-50">Follow-up</SelectItem>
                <SelectItem value="emergency" className="py-3 px-4 hover:bg-blue-50">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status" className="text-sm font-medium text-gray-700 flex items-center">
              <AlertCircle className="h-4 w-4 mr-2 text-gray-500" />
              Status
            </Label>
            <Select
              name="status"
              onValueChange={(value) => handleSelectChange("status", value)}
              defaultValue={formData.status}
            >
              <SelectTrigger className="h-12 rounded-lg border-gray-300 bg-white px-4 text-base shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200 rounded-lg shadow-lg">
                <SelectItem value="scheduled" className="py-3 px-4 hover:bg-blue-50">Scheduled</SelectItem>
                <SelectItem value="completed" className="py-3 px-4 hover:bg-blue-50">Completed</SelectItem>
                <SelectItem value="cancelled" className="py-3 px-4 hover:bg-blue-50">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {formData.details !== undefined && (
            <div className="space-y-2">
              <Label htmlFor="details" className="text-sm font-medium text-gray-700">Details (Optional)</Label>
              <Textarea 
                id="details" 
                name="details" 
                value={formData.details} 
                onChange={handleChange} 
                className="min-h-[100px] rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Any additional details about this appointment"
              />
            </div>
          )}
          
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
              className="flex-1 h-12 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
            >
              Update Appointment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

