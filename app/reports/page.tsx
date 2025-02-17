"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ViewReportModal } from "@/components/ViewReportModal"
import api from "@/utils/api"
import { toast, useToast } from "@/hooks/use-toast"

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

export default function ReportsPage() {
  const { toast } = useToast()
  const [reports, setReports] = useState<Report[]>([])
  const [viewReport, setViewReport] = useState<Report | null>(null)

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    try {
      const response = await api.get("/reports")
      setReports(response.data)
    } catch (error) {
      console.error("Error fetching reports:", error)
      toast({
        title: "Error",
        description: "Failed to fetch reports",
        variant: "destructive",
      })
    }
  }

  const handleDeleteReport = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      try {
        await api.delete(`/reports/${id}`)
        toast({
          title: "Success",
          description: "Report deleted successfully",
        })
        fetchReports()
      } catch (error) {
        console.error("Error deleting report:", error)
        toast({
          title: "Error",
          description: "Failed to delete report",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Appointment Reports</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Appointment ID</TableHead>
            <TableHead>Doctor ID</TableHead>
            <TableHead>Patient ID</TableHead>
            <TableHead>Diagnosis</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.appointment_id}</TableCell>
              <TableCell>{report.doctor_id}</TableCell>
              <TableCell>{report.patient_id}</TableCell>
              <TableCell>{report.diagnosis}</TableCell>
              <TableCell>{new Date(report.created_at).toLocaleString()}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2" onClick={() => setViewReport(report)}>
                  View
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDeleteReport(report.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {viewReport && <ViewReportModal report={viewReport} isOpen={!!viewReport} onClose={() => setViewReport(null)} />}
    </div>
  )
}

