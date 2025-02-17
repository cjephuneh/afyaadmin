"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

export default function ReportDetailsPage() {
  const { toast } = useToast()
  const { id } = useParams()
  const [report, setReport] = useState<Report | null>(null)

  useEffect(() => {
    fetchReport()
  }, []) // Removed unnecessary dependency 'id'

  const fetchReport = async () => {
    try {
      const response = await api.get(`/reports/${id}`)
      setReport(response.data)
    } catch (error) {
      console.error("Error fetching report:", error)
      toast({
        title: "Error",
        description: "Failed to fetch report details",
        variant: "destructive",
      })
    }
  }

  if (!report) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Report Details</h1>
      <Card>
        <CardHeader>
          <CardTitle>{`Report #${report.id}`}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Appointment ID:</strong> {report.appointment_id}
            </div>
            <div>
              <strong>Doctor ID:</strong> {report.doctor_id}
            </div>
            <div>
              <strong>Patient ID:</strong> {report.patient_id}
            </div>
            <div>
              <strong>Created At:</strong> {new Date(report.created_at).toLocaleString()}
            </div>
          </div>
          <div className="mt-4">
            <strong>Diagnosis:</strong>
            <p>{report.diagnosis}</p>
          </div>
          <div className="mt-4">
            <strong>Prescription:</strong>
            <p>{report.prescription}</p>
          </div>
          {report.recommendations && (
            <div className="mt-4">
              <strong>Recommendations:</strong>
              <p>{report.recommendations}</p>
            </div>
          )}
          {report.image_url && (
            <div className="mt-4">
              <strong>Image:</strong>
              <img src={report.image_url || "/placeholder.svg"} alt="Report Image" className="mt-2 max-w-full h-auto" />
            </div>
          )}
        </CardContent>
      </Card>
      <Button onClick={() => window.history.back()}>Back to Reports List</Button>
    </div>
  )
}

