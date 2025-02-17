"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import api from "@/utils/api"
import { useToast } from "@/hooks/use-toast"

interface Doctor {
  id: number
  first_name: string
  last_name: string
  email: string
  phone_number: string
  gender: string
  specialization: string | null
  image_url: string
  about: string
  affiliation: string | null
  consultation_fee: number | null
  medical_license_number: string | null
  verified: boolean
}

export default function DoctorDetailsPage() {
    const {toast} = useToast()

  const { id } = useParams()
  const [doctor, setDoctor] = useState<Doctor | null>(null)

  useEffect(() => {
    fetchDoctor()
  }, []) // Updated dependency array

  const fetchDoctor = async () => {
    try {
      const response = await api.get(`/doctors/${id}`)
      setDoctor(response.data)
    } catch (error) {
      console.error("Error fetching doctor:", error)
      toast({
        title: "Error",
        description: "Failed to fetch doctor details",
        variant: "destructive",
      })
    }
  }

  if (!doctor) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Doctor Details</h1>
      <Card>
        <CardHeader>
          <CardTitle>{`${doctor.first_name} ${doctor.last_name}`}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Email:</strong> {doctor.email}
            </div>
            <div>
              <strong>Phone:</strong> {doctor.phone_number}
            </div>
            <div>
              <strong>Gender:</strong> {doctor.gender}
            </div>
            <div>
              <strong>Specialization:</strong> {doctor.specialization || "N/A"}
            </div>
            <div>
              <strong>Affiliation:</strong> {doctor.affiliation || "N/A"}
            </div>
            <div>
              <strong>Consultation Fee:</strong> {doctor.consultation_fee ? `$${doctor.consultation_fee}` : "N/A"}
            </div>
            <div>
              <strong>Medical License Number:</strong> {doctor.medical_license_number || "N/A"}
            </div>
            <div>
              <strong>Verified:</strong> {doctor.verified ? "Yes" : "No"}
            </div>
          </div>
          <div className="mt-4">
            <strong>About:</strong>
            <p>{doctor.about}</p>
          </div>
        </CardContent>
      </Card>
      <Button onClick={() => window.history.back()}>Back to Doctors List</Button>
    </div>
  )
}

