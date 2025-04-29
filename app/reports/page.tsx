"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ViewReportModal } from "@/components/ViewReportModal"
import api from "@/utils/api"
import { useToast } from "@/hooks/use-toast"
import { Search, Loader2, FileText, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterBy, setFilterBy] = useState("all")

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    setIsLoading(true)
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
    } finally {
      setIsLoading(false)
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

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.appointment_id.toString().includes(searchQuery) ||
      report.doctor_id.toString().includes(searchQuery) ||
      report.patient_id.toString().includes(searchQuery)
    
    if (filterBy === "all") return matchesSearch
    if (filterBy === "with_image") return matchesSearch && report.image_url !== null
    if (filterBy === "without_image") return matchesSearch && report.image_url === null
    return matchesSearch
  })

  return (
    <div className="space-y-8 px-4 py-6 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl shadow-sm border border-purple-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">Medical Reports</h1>
            <p className="text-gray-500">View and manage all appointment reports</p>
          </div>
          <Button 
            className="rounded-lg bg-purple-600 px-5 py-2.5 text-white hover:bg-purple-700 transition-colors shadow-md"
            onClick={() => fetchReports()}
          >
            Refresh Reports
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-700">Report Listings</h2>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input 
                  placeholder="Search reports..." 
                  className="pl-9 bg-gray-50" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-full sm:w-40 bg-gray-50">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="with_image">With Images</SelectItem>
                  <SelectItem value="without_image">Without Images</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center p-20">
            <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            <span className="ml-2 text-gray-500">Loading reports...</span>
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="flex flex-col justify-center items-center p-20 text-center">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <FileText className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700">No reports found</h3>
            <p className="text-gray-500 mt-1 mb-4 max-w-md">
              {searchQuery ? "Try adjusting your search query or filter" : "There are no medical reports in the system yet"}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</TableHead>
                    <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Appointment</TableHead>
                    <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Doctor ID</TableHead>
                    <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Patient ID</TableHead>
                    <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Diagnosis</TableHead>
                    <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</TableHead>
                    <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Image</TableHead>
                    <TableHead className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id} className="hover:bg-gray-50 border-b border-gray-100">
                      <TableCell className="px-6 py-4 text-sm font-medium text-gray-800">#{report.id}</TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-600">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          #{report.appointment_id}
                        </span>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-600">{report.doctor_id}</TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-600">{report.patient_id}</TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-600">
                        {report.diagnosis.length > 30 
                          ? `${report.diagnosis.substring(0, 30)}...` 
                          : report.diagnosis}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-600">{formatDate(report.created_at)}</TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-600">
                        {report.image_url ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Available
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            None
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-right space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-purple-600" 
                          onClick={() => setViewReport(report)}
                        >
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-red-600" 
                          onClick={() => handleDeleteReport(report.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">{filteredReports.length}</span> of <span className="font-medium">{reports.length}</span> reports
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="border-gray-200" disabled>Previous</Button>
                <Button variant="outline" size="sm" className="border-gray-200" disabled>Next</Button>
              </div>
            </div>
          </>
        )}
      </div>
      
      {viewReport && 
        <ViewReportModal 
          report={viewReport} 
          isOpen={!!viewReport} 
          onClose={() => setViewReport(null)} 
        />
      }
    </div>
  )
}

