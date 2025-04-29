import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, Clock, User, UserCheck, FileText, CheckCircle2 } from "lucide-react"

interface Appointment {
  id: number
  doctor_id: string
  patient_id: string
  purpose: string
  date: string
  time: string
  type: string
  status: string
  doctor_first_name?: string
  doctor_last_name?: string
  patient_first_name?: string
  patient_last_name?: string
  meet_link?: string
}

interface ViewAppointmentModalProps {
  appointment: Appointment
  isOpen: boolean
  onClose: () => void
}

export function ViewAppointmentModal({ appointment, isOpen, onClose }: ViewAppointmentModalProps) {
  // Format date for display
  const formatDate = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };
  
  // Status color mapping
  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-xl border-none shadow-xl bg-white p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Appointment #{appointment.id}</h2>
          <p className="opacity-90 text-sm">View complete appointment details</p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            <div className="space-y-1">
              <div className="flex items-center text-gray-500 text-sm mb-1">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Date</span>
              </div>
              <p className="font-medium text-gray-900">{formatDate(appointment.date)}</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center text-gray-500 text-sm mb-1">
                <Clock className="h-4 w-4 mr-2" />
                <span>Time</span>
              </div>
              <p className="font-medium text-gray-900">{appointment.time}</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center text-gray-500 text-sm mb-1">
                <UserCheck className="h-4 w-4 mr-2" />
                <span>Doctor</span>
              </div>
              <p className="font-medium text-gray-900">
                {appointment.doctor_first_name && appointment.doctor_last_name 
                  ? `Dr. ${appointment.doctor_first_name} ${appointment.doctor_last_name}`
                  : appointment.doctor_id}
              </p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center text-gray-500 text-sm mb-1">
                <User className="h-4 w-4 mr-2" />
                <span>Patient</span>
              </div>
              <p className="font-medium text-gray-900">
                {appointment.patient_first_name && appointment.patient_last_name 
                  ? `${appointment.patient_first_name} ${appointment.patient_last_name}`
                  : appointment.patient_id}
              </p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center text-gray-500 text-sm mb-1">
                <FileText className="h-4 w-4 mr-2" />
                <span>Purpose</span>
              </div>
              <p className="font-medium text-gray-900">{appointment.purpose || 'Not specified'}</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center text-gray-500 text-sm mb-1">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                <span>Status</span>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                {appointment.status}
              </span>
            </div>
          </div>
          
          {appointment.meet_link && (
            <div className="mt-6">
              <h3 className="text-gray-500 text-sm mb-2">Meeting Link</h3>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <a 
                  href={appointment.meet_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 break-all font-medium"
                >
                  {appointment.meet_link}
                </a>
              </div>
            </div>
          )}
          
          <div className="pt-4">
            <Button 
              onClick={onClose} 
              className="w-full py-2 h-11 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

