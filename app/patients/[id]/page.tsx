"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import api from "@/utils/api"
import { useToast } from "@/hooks/use-toast"

interface Patient {
  id: number
  first_name: string
  last_name: string
  email: string
  phone_number: string
  gender: string
  national_id: string
  date_of_birth: string | null
  image_url: string
  verified: boolean
}

export default function PatientDetailsPage() {
    const {toast} = useToast()

  const { id } = useParams()
  const [patient, setPatient] = useState<Patient | null>(null)

  useEffect(() => {
    fetchPatient()
  }, []) // Removed unnecessary dependency 'id'

  const fetchPatient = async () => {
    try {
      const response = await api.get(`/patients/${id}`)
      setPatient(response.data)
    } catch (error) {
      console.error("Error fetching patient:", error)
      toast({
        title: "Error",
        description: "Failed to fetch patient details",
        variant: "destructive",
      })
    }
  }

  if (!patient) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Patient Details</h1>
      <Card>
        <CardHeader>
          <CardTitle>{`${patient.first_name} ${patient.last_name}`}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Email:</strong> {patient.email}
            </div>
            <div>
              <strong>Phone:</strong> {patient.phone_number}
            </div>
            <div>
              <strong>Gender:</strong> {patient.gender}
            </div>
            <div>
              <strong>National ID:</strong> {patient.national_id}
            </div>
            <div>
              <strong>Date of Birth:</strong> {patient.date_of_birth || "N/A"}
            </div>
            <div>
              <strong>Verified:</strong> {patient.verified ? "Yes" : "No"}
            </div>
          </div>
        </CardContent>
      </Card>
      <Button onClick={() => window.history.back()}>Back to Patients List</Button>
    </div>
  )
}

