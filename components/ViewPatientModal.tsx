import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Mail, Phone, Calendar, IdCard, User, MapPin } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Patient {
  id: number
  name: string
  date_of_birth: string
  email: string
  phone_number: string
  gender: string
  national_id: string
  first_name: string
  last_name: string
  image_url?: string
  address?: string
}

interface ViewPatientModalProps {
  patient: Patient
  isOpen: boolean
  onClose: () => void
}

export function ViewPatientModal({ patient, isOpen, onClose }: ViewPatientModalProps) {
  const fullName = patient.name || `${patient.first_name} ${patient.last_name || ''}`;
  
  // Get initials for avatar fallback
  const getInitials = () => {
    if (patient.first_name && patient.last_name) {
      return `${patient.first_name[0]}${patient.last_name[0]}`.toUpperCase();
    }
    return patient.name ? patient.name[0].toUpperCase() : 'P';
  };

  // Format date for display
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-xl border-none shadow-xl bg-white p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20 border-4 border-white/20">
              <AvatarImage src={patient.image_url} />
              <AvatarFallback className="text-xl bg-indigo-200 text-indigo-800">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="text-white">
              <h2 className="text-2xl font-bold">{fullName}</h2>
              <p className="opacity-90">Patient #{patient.id}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="space-y-4">
            <div className="flex items-center border-b border-gray-100 pb-3">
              <User className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-medium text-gray-900">{patient.gender || 'Not specified'}</p>
              </div>
            </div>
            
            <div className="flex items-center border-b border-gray-100 pb-3">
              <Calendar className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium text-gray-900">{formatDate(patient.date_of_birth)}</p>
              </div>
            </div>
            
            <div className="flex items-center border-b border-gray-100 pb-3">
              <Mail className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{patient.email || 'Not provided'}</p>
              </div>
            </div>
            
            <div className="flex items-center border-b border-gray-100 pb-3">
              <Phone className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">{patient.phone_number || 'Not provided'}</p>
              </div>
            </div>
            
            <div className="flex items-center border-b border-gray-100 pb-3">
              <IdCard className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">National ID</p>
                <p className="font-medium text-gray-900">{patient.national_id || 'Not provided'}</p>
              </div>
            </div>
            
            {patient.address && (
              <div className="flex items-center border-b border-gray-100 pb-3">
                <MapPin className="h-5 w-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium text-gray-900">{patient.address}</p>
                </div>
              </div>
            )}
          </div>
          
          <Button 
            onClick={onClose} 
            className="w-full mt-4 py-2 h-11 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

