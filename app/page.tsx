"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Stethoscope, Users, Calendar, MessageSquare } from "lucide-react"
// import { ProtectedRoute } from "@/components/ProtectedRoute"
import api from "@/utils/api"

interface OverviewData {
  totalDoctors: number
  totalPatients: number
  totalAppointments: number
  totalFeedbacks: number
}

function Home() {
  const [overviewData, setOverviewData] = useState<OverviewData>({
    totalDoctors: 0,
    totalPatients: 0,
    totalAppointments: 0,
    totalFeedbacks: 0,
  })

  useEffect(() => {
    fetchOverviewData()
  }, [])

  const fetchOverviewData = async () => {
    try {
      const [doctorsCount, appointmentsCount, feedbackCount] = await Promise.all([
        api.get("/doctors/count"),
        api.get("/appointments/count"),
        api.get("/feedback/count"),
      ])

      setOverviewData({
        totalDoctors: doctorsCount.data.total_doctors,
        totalPatients: 0, // We don't have an endpoint for this, so leaving it as 0
        totalAppointments: appointmentsCount.data.total_appointments,
        totalFeedbacks: feedbackCount.data.total_feedbacks,
      })
    } catch (error) {
      console.error("Error fetching overview data:", error)
    }
  }

  return (
    // <ProtectedRoute>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Telemedicine Admin Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
              <Stethoscope className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overviewData.totalDoctors}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overviewData.totalPatients}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overviewData.totalAppointments}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Feedbacks</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overviewData.totalFeedbacks}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    // </ProtectedRoute>
  )
}


export default Home