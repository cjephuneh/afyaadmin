import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { 
  FileText, 
  Calendar, 
  UserCheck, 
  User, 
  Stethoscope, 
  Pill, 
  LightbulbIcon, 
  ImageIcon 
} from "lucide-react"

interface Report {
  id: number
  appointment_id: number
  doctor_id: number
  patient_id: number
  diagnosis: string
  prescription: string
  recommendations: string | null
  created_at: string
  image_url: string | null
  doctor_name?: string
  patient_name?: string
}

interface ViewReportModalProps {
  report: Report
  isOpen: boolean
  onClose: () => void
}

export function ViewReportModal({ report, isOpen, onClose }: ViewReportModalProps) {
  // Format date for display
  const formatDate = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateStr).toLocaleString(undefined, options);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-xl border-none shadow-xl bg-white p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8" />
            <div>
              <h2 className="text-2xl font-bold">Medical Report #{report.id}</h2>
              <p className="opacity-90">Appointment #{report.appointment_id}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="flex items-center mb-3">
                <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                <h3 className="text-sm font-medium text-gray-700">Created At</h3>
              </div>
              <p className="text-gray-900">{formatDate(report.created_at)}</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="flex items-center mb-3">
                <UserCheck className="h-5 w-5 text-gray-500 mr-2" />
                <h3 className="text-sm font-medium text-gray-700">Doctor</h3>
              </div>
              <p className="text-gray-900">{report.doctor_name || `Doctor #${report.doctor_id}`}</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="flex items-center mb-3">
                <User className="h-5 w-5 text-gray-500 mr-2" />
                <h3 className="text-sm font-medium text-gray-700">Patient</h3>
              </div>
              <p className="text-gray-900">{report.patient_name || `Patient #${report.patient_id}`}</p>
            </div>
          </div>
          
          <div className="space-y-6 mb-6">
            <div>
              <div className="flex items-center mb-3">
                <Stethoscope className="h-5 w-5 text-gray-500 mr-2" />
                <h3 className="text-sm font-medium text-gray-700">Diagnosis</h3>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <p className="text-gray-800 whitespace-pre-line">{report.diagnosis}</p>
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-3">
                <Pill className="h-5 w-5 text-gray-500 mr-2" />
                <h3 className="text-sm font-medium text-gray-700">Prescription</h3>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                <p className="text-gray-800 whitespace-pre-line">{report.prescription}</p>
              </div>
            </div>
            
            {report.recommendations && (
              <div>
                <div className="flex items-center mb-3">
                  <LightbulbIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <h3 className="text-sm font-medium text-gray-700">Recommendations</h3>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                  <p className="text-gray-800 whitespace-pre-line">{report.recommendations}</p>
                </div>
              </div>
            )}
          </div>
          
          {report.image_url && (
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <ImageIcon className="h-5 w-5 text-gray-500 mr-2" />
                <h3 className="text-sm font-medium text-gray-700">Medical Image</h3>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <img 
                  src={report.image_url} 
                  alt="Medical image" 
                  className="w-full object-cover max-h-[300px]" 
                  onError={(e) => {
                    // Handle image loading errors
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
              </div>
            </div>
          )}
          
          <Button 
            onClick={onClose}
            className="w-full py-2 h-11 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

