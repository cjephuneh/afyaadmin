"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Search, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AddPatientForm } from "@/components/AddPatientForm"
import { ViewPatientModal } from "@/components/ViewPatientModal"
import { EditPatientModal } from "@/components/EditPatientModal"
import api from "@/utils/api"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"

export default function PatientsPage() {
  const { toast } = useToast()

  const [patients, setPatients] = useState([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [viewPatient, setViewPatient] = useState(null)
  const [editPatient, setEditPatient] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    setIsLoading(true)
    try {
      const response = await api.get("/patients")
      setPatients(response.data)
    } catch (error) {
      console.error("Error fetching patients:", error)
      toast({
        title: "Error",
        description: "Failed to fetch patients",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddPatient = async (newPatient) => {
    try {
      await api.post("/patients", newPatient)
      toast({
        title: "Success",
        description: "Patient added successfully",
      })
      fetchPatients()
      setIsAddDialogOpen(false)
    } catch (error) {
      console.error("Error adding patient:", error)
      toast({
        title: "Error",
        description: "Failed to add patient",
        variant: "destructive",
      })
    }
  }

  const handleUpdatePatient = async (updatedPatient) => {
    try {
      await api.put(`/patients/${updatedPatient.id}`, updatedPatient)
      toast({
        title: "Success",
        description: "Patient updated successfully",
      })
      fetchPatients()
      setEditPatient(null)
    } catch (error) {
      console.error("Error updating patient:", error)
      toast({
        title: "Error",
        description: "Failed to update patient",
        variant: "destructive",
      })
    }
  }

  const handleDeletePatient = async (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
        await api.delete(`/patients/${id}`)
        toast({
          title: "Success",
          description: "Patient deleted successfully",
        })
        fetchPatients()
      } catch (error) {
        console.error("Error deleting patient:", error)
        toast({
          title: "Error",
          description: "Failed to delete patient",
          variant: "destructive",
        })
      }
    }
  }

  const filteredPatients = patients.filter(patient => 
    `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (patient.national_id && patient.national_id.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="space-y-8 px-4 py-6 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl shadow-sm border border-emerald-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">Patients Management</h1>
            <p className="text-gray-500">View and manage all patients in the system</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-lg bg-emerald-600 px-5 py-2.5 text-white hover:bg-emerald-700 transition-colors shadow-md">
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-xl">Add New Patient</DialogTitle>
              </DialogHeader>
              <AddPatientForm onSubmit={handleAddPatient} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-700">Patient Directory</h2>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="Search patients..." 
                className="pl-9 bg-gray-50" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center p-20">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
            <span className="ml-2 text-gray-500">Loading patients...</span>
          </div>
        ) : filteredPatients.length === 0 ? (
          <div className="flex flex-col justify-center items-center p-20 text-center">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <PlusCircle className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700">No patients found</h3>
            <p className="text-gray-500 mt-1 mb-4 max-w-md">
              {searchQuery ? "Try adjusting your search query" : "Add your first patient to get started"}
            </p>
            {!searchQuery && (
              <DialogTrigger asChild>
                <Button className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add New Patient
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
                    <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700">National ID</TableHead>
                    <TableHead className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id} className="hover:bg-gray-50 border-b border-gray-100">
                      <TableCell className="px-6 py-4 text-sm font-medium text-gray-800">{`${patient.first_name} ${patient.last_name}`}</TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-600">{patient.email}</TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-600">{patient.phone_number}</TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-600">
                        {patient.national_id ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            {patient.national_id}
                          </span>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-right space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-emerald-600" 
                          onClick={() => setViewPatient(patient)}
                        >
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-teal-600" 
                          onClick={() => setEditPatient(patient)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-red-600" 
                          onClick={() => handleDeletePatient(patient.id)}
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
                Showing <span className="font-medium">{filteredPatients.length}</span> of <span className="font-medium">{patients.length}</span> patients
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="border-gray-200" disabled>Previous</Button>
                <Button variant="outline" size="sm" className="border-gray-200" disabled>Next</Button>
              </div>
            </div>
          </>
        )}
      </div>
      
      {viewPatient && <ViewPatientModal patient={viewPatient} isOpen={!!viewPatient} onClose={() => setViewPatient(null)} />}
      {editPatient && (
        <EditPatientModal
          patient={editPatient}
          isOpen={!!editPatient}
          onClose={() => setEditPatient(null)}
          onUpdate={handleUpdatePatient}
        />
      )}
    </div>
  )
}
