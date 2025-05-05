import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Mail, Phone, Award, BookOpen, CreditCard, User, CheckCircle, XCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Doctor {
  id: number
  name?: string
  first_name?: string
  last_name?: string
  specialization: string
  email: string
  phone_number: string
  qualifications?: string
  about?: string
  affiliation?: string
  medical_license_number?: string
  consultation_fee?: number
  image_url?: string
  verified?: boolean
}

interface ViewDoctorModalProps {
  doctor: Doctor
  isOpen: boolean
  onClose: () => void
  onVerify?: (doctorId: number) => Promise<void>
}

export function ViewDoctorModal({ doctor, isOpen, onClose, onVerify }: ViewDoctorModalProps) {
  const fullName = doctor.name || `Dr. ${doctor.first_name || ''} ${doctor.last_name || ''}`;
  
  // Get initials for avatar fallback
  const getInitials = () => {
    if (doctor.first_name && doctor.last_name) {
      return `${doctor.first_name[0]}${doctor.last_name[0]}`.toUpperCase();
    }
    return doctor.name ? doctor.name[0].toUpperCase() : 'D';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-xl border-none shadow-xl bg-white p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-700 to-teal-600 p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20 border-4 border-white/20">
              <AvatarImage src={doctor.image_url} />
              <AvatarFallback className="text-xl bg-blue-200 text-blue-800">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="text-white">
              <h2 className="text-2xl font-bold">{fullName}</h2>
              <p className="opacity-90">{doctor.specialization || 'Specialization not specified'}</p>
              <div className="flex items-center mt-2">
                {doctor.verified || doctor.verified ? (
                  <div className="flex items-center bg-green-500/20 px-2 py-1 rounded text-white text-sm">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span>Verified</span>
                  </div>
                ) : (
                  <div className="flex items-center bg-red-500/20 px-2 py-1 rounded text-white text-sm">
                    <XCircle className="h-4 w-4 mr-1" />
                    <span>Not Verified</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          {doctor.about && (
            <div className="mb-6">
              <h3 className="text-sm text-gray-500 mb-2">About</h3>
              <p className="text-gray-700">{doctor.about}</p>
            </div>
          )}
          
          <div className="space-y-4">
            <div className="flex items-center border-b border-gray-100 pb-3">
              <Mail className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{doctor.email}</p>
              </div>
            </div>
            
            <div className="flex items-center border-b border-gray-100 pb-3">
              <Phone className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">{doctor.phone_number}</p>
              </div>
            </div>
            
            {doctor.qualifications && (
              <div className="flex items-center border-b border-gray-100 pb-3">
                <Award className="h-5 w-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Qualifications</p>
                  <p className="font-medium text-gray-900">{doctor.qualifications}</p>
                </div>
              </div>
            )}
            
            {doctor.affiliation && (
              <div className="flex items-center border-b border-gray-100 pb-3">
                <BookOpen className="h-5 w-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Affiliation</p>
                  <p className="font-medium text-gray-900">{doctor.affiliation}</p>
                </div>
              </div>
            )}
            
            {doctor.consultation_fee !== undefined && (
              <div className="flex items-center border-b border-gray-100 pb-3">
                <CreditCard className="h-5 w-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Consultation Fee</p>
                  <p className="font-medium text-gray-900">${doctor.consultation_fee}</p>
                </div>
              </div>
            )}
            
            {doctor.medical_license_number && (
              <div className="flex items-center border-b border-gray-100 pb-3">
                <User className="h-5 w-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">License Number</p>
                  <p className="font-medium text-gray-900">{doctor.medical_license_number}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex gap-3 mt-4">
            {!doctor.verified && !doctor.verified && onVerify && (
              <Button 
                onClick={() => onVerify(doctor.id)} 
                className="flex-1 py-2 h-11 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all duration-200"
              >
                Verify Doctor
              </Button>
            )}
            <Button 
              onClick={onClose} 
              className="flex-1 py-2 h-11 rounded-lg bg-gradient-to-r from-blue-700 to-teal-600 text-white hover:from-blue-800 hover:to-teal-700 transition-all duration-200"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

