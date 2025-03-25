"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Search, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AddDoctorForm } from "@/components/AddDoctorForm"
import { ViewDoctorModal } from "@/components/ViewDoctorModal"
import { EditDoctorModal } from "@/components/EditDoctorModal"
import api from "@/utils/api"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"

export default function DoctorsPage() {
  const { toast } = useToast()

  const [doctors, setDoctors] = useState([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [viewDoctor, setViewDoctor] = useState(null)
  const [editDoctor, setEditDoctor] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchDoctors()
  }, [])

  const fetchDoctors = async () => {
    setIsLoading(true)
    try {
      const response = await api.get("/doctors")
      setDoctors(response.data)
    } catch (error) {
      console.error("Error fetching doctors:", error)
      toast({
        title: "Error",
        description: "Failed to fetch doctors",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddDoctor = async (newDoctor) => {
    try {
      await api.post("/doctors", newDoctor)
      toast({
        title: "Success",
        description: "Doctor added successfully",
      })
      fetchDoctors()
      setIsAddDialogOpen(false)
    } catch (error) {
      console.error("Error adding doctor:", error)
      toast({
        title: "Error",
        description: "Failed to add doctor",
        variant: "destructive",
      })
    }
  }

  const handleUpdateDoctor = async (updatedDoctor) => {
    try {
      await api.put(`/doctors/${updatedDoctor.id}`, updatedDoctor)
      toast({
        title: "Success",
        description: "Doctor updated successfully",
      })
      fetchDoctors()
      setEditDoctor(null)
    } catch (error) {
      console.error("Error updating doctor:", error)
      toast({
        title: "Error",
        description: "Failed to update doctor",
        variant: "destructive",
      })
    }
  }

  const handleDeleteDoctor = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await api.delete(`/doctors/${id}`)
        toast({
          title: "Success",
          description: "Doctor deleted successfully",
        })
        fetchDoctors()
      } catch (error) {
        console.error("Error deleting doctor:", error)
        toast({
          title: "Error",
          description: "Failed to delete doctor",
          variant: "destructive",
        })
      }
    }
  }

  const filteredDoctors = doctors.filter(doctor => 
    `${doctor.first_name} ${doctor.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (doctor.specialization && doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="space-y-8 px-4 py-6 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm border border-blue-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">Doctors Management</h1>
            <p className="text-gray-500">View and manage all doctors in the system</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700 transition-colors shadow-md">
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Doctor
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-xl">Add New Doctor</DialogTitle>
              </DialogHeader>
              <AddDoctorForm onSubmit={handleAddDoctor} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-700">Doctor Directory</h2>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="Search doctors..." 
                className="pl-9 bg-gray-50" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center p-20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <span className="ml-2 text-gray-500">Loading doctors...</span>
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="flex flex-col justify-center items-center p-20 text-center">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <PlusCircle className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700">No doctors found</h3>
            <p className="text-gray-500 mt-1 mb-4 max-w-md">
              {searchQuery ? "Try adjusting your search query" : "Add your first doctor to get started"}
            </p>
            {!searchQuery && (
              <DialogTrigger asChild>
                <Button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add New Doctor
                </Button>
              </DialogTrigger>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</TableHead>
                    <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</TableHead>
                    <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</TableHead>
                    <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Specialization</TableHead>
                    <TableHead className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDoctors.map((doctor) => (
                    <TableRow key={doctor.id} className="hover:bg-gray-50 border-b border-gray-100">
                      <TableCell className="px-6 py-4 text-sm font-medium text-gray-800">{`${doctor.first_name} ${doctor.last_name}`}</TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-600">{doctor.email}</TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-600">{doctor.phone_number}</TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-600">
                        {doctor.specialization ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {doctor.specialization}
                          </span>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-right space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-blue-600" 
                          onClick={() => setViewDoctor(doctor)}
                        >
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-indigo-600" 
                          onClick={() => setEditDoctor(doctor)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-red-600" 
                          onClick={() => handleDeleteDoctor(doctor.id)}
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
                Showing <span className="font-medium">{filteredDoctors.length}</span> of <span className="font-medium">{doctors.length}</span> doctors
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="border-gray-200" disabled>Previous</Button>
                <Button variant="outline" size="sm" className="border-gray-200" disabled>Next</Button>
              </div>
            </div>
          </>
        )}
      </div>
      
      {viewDoctor && <ViewDoctorModal doctor={viewDoctor} isOpen={!!viewDoctor} onClose={() => setViewDoctor(null)} />}
      {editDoctor && (
        <EditDoctorModal
          doctor={editDoctor}
          isOpen={!!editDoctor}
          onClose={() => setEditDoctor(null)}
          onUpdate={handleUpdateDoctor}
        />
      )}
    </div>
  )
}
