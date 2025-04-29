"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Stethoscope, Users, Calendar, MessageSquare, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import api from "@/utils/api"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface OverviewData {
  totalDoctors: number
  totalPatients: number
  totalAppointments: number
  totalFeedbacks: number
}

// Sample data for charts - replace with real data in production
const appointmentData = [
  { name: 'Mon', appointments: 4 },
  { name: 'Tue', appointments: 3 },
  { name: 'Wed', appointments: 5 },
  { name: 'Thu', appointments: 7 },
  { name: 'Fri', appointments: 6 },
  { name: 'Sat', appointments: 4 },
  { name: 'Sun', appointments: 2 },
];

const patientGrowthData = [
  { name: 'Jan', patients: 20 },
  { name: 'Feb', patients: 28 },
  { name: 'Mar', patients: 35 },
  { name: 'Apr', patients: 40 },
  { name: 'May', patients: 48 },
  { name: 'Jun', patients: 55 },
];

const appointmentTypeData = [
  { name: 'Consultation', value: 55 },
  { name: 'Follow-up', value: 30 },
  { name: 'Emergency', value: 15 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

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
      const [doctorsCount, appointmentsCount, feedbackCount, patientsCount] = await Promise.all([
        api.get("/doctors/count"),
        api.get("/appointments/count"),
        api.get("/feedback/count"),
        api.get("/patients/count"),
      ])

      setOverviewData({
        totalDoctors: doctorsCount.data.total_doctors,
        totalPatients: patientsCount.data.total_patients,
        totalAppointments: appointmentsCount.data.total_appointments,
        totalFeedbacks: feedbackCount.data.total_feedbacks,
      })
    } catch (error) {
      console.error("Error fetching overview data:", error)
    }
  }

  return (
    <ProtectedRoute>
      <div className="space-y-8 p-6 bg-gray-50 rounded-xl">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-500">Welcome to your telemedicine admin dashboard</p>
        </div>
        
        {/* Stats Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Doctors</CardTitle>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Stethoscope className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{overviewData.totalDoctors}</div>
              <div className="text-xs text-green-600 flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+2.5% from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Patients</CardTitle>
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <Users className="h-4 w-4 text-indigo-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{overviewData.totalPatients}</div>
              <div className="text-xs text-green-600 flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+5.2% from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Appointments</CardTitle>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{overviewData.totalAppointments}</div>
              <div className="text-xs text-red-600 flex items-center mt-1">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                <span>-1.3% from last week</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Feedbacks</CardTitle>
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{overviewData.totalFeedbacks}</div>
              <div className="text-xs text-green-600 flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+8.1% from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Weekly Appointments Chart */}
          <Card className="bg-white border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-800 text-lg">Weekly Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={appointmentData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: 'none', 
                        borderRadius: '8px', 
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                      }} 
                    />
                    <Bar dataKey="appointments" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Patient Growth Chart */}
          <Card className="bg-white border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-800 text-lg">Patient Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={patientGrowthData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: 'none', 
                        borderRadius: '8px', 
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                      }} 
                    />
                    <Line type="monotone" dataKey="patients" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Appointment Type Distribution */}
          <Card className="bg-white border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-800 text-lg">Appointment Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={appointmentTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {appointmentTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: 'none', 
                        borderRadius: '8px', 
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Activity */}
          <Card className="bg-white border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-800 text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      index % 3 === 0 ? 'bg-blue-100' : index % 3 === 1 ? 'bg-green-100' : 'bg-purple-100'
                    }`}>
                      {index % 3 === 0 ? (
                        <Users className={`h-5 w-5 text-blue-600`} />
                      ) : index % 3 === 1 ? (
                        <Calendar className={`h-5 w-5 text-green-600`} />
                      ) : (
                        <MessageSquare className={`h-5 w-5 text-purple-600`} />
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-800">
                        {index % 3 === 0 ? 'New patient registered' : 
                         index % 3 === 1 ? 'Appointment scheduled' : 
                         'New feedback received'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {index === 0 ? '2 minutes ago' : 
                         index === 1 ? '25 minutes ago' : 
                         index === 2 ? '2 hours ago' : 
                         index === 3 ? '5 hours ago' : 
                         'Yesterday'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Home
