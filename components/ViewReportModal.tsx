import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

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
}

interface ViewReportModalProps {
  report: Report
  isOpen: boolean
  onClose: () => void
}

export function ViewReportModal({ report, isOpen, onClose }: ViewReportModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report Details</DialogTitle>
          <DialogDescription>View report information</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <h3 className="font-semibold">Appointment ID</h3>
            <p>{report.appointment_id}</p>
          </div>
          <div>
            <h3 className="font-semibold">Doctor ID</h3>
            <p>{report.doctor_id}</p>
          </div>
          <div>
            <h3 className="font-semibold">Patient ID</h3>
            <p>{report.patient_id}</p>
          </div>
          <div>
            <h3 className="font-semibold">Created At</h3>
            <p>{new Date(report.created_at).toLocaleString()}</p>
          </div>
          <div>
            <h3 className="font-semibold">Diagnosis</h3>
            <p>{report.diagnosis}</p>
          </div>
          <div>
            <h3 className="font-semibold">Prescription</h3>
            <p>{report.prescription}</p>
          </div>
          {report.recommendations && (
            <div>
              <h3 className="font-semibold">Recommendations</h3>
              <p>{report.recommendations}</p>
            </div>
          )}
          {report.image_url && (
            <div>
              <h3 className="font-semibold">Image</h3>
              <img src={report.image_url || "/placeholder.svg"} alt="Report Image" className="mt-2 max-w-full h-auto" />
            </div>
          )}
        </div>
        <Button onClick={onClose}>Close</Button>
      </DialogContent>
    </Dialog>
  )
}

