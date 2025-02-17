"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AddPatientForm } from "@/components/AddPatientForm"
import { ViewPatientModal } from "@/components/ViewPatientModal"
import { EditPatientModal } from "@/components/EditPatientModal"
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
}

export default function PatientsPage() {
    const {toast} = useToast()

  const [patients, setPatients] = useState<Patient[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [viewPatient, setViewPatient] = useState<Patient | null>(null)
  const [editPatient, setEditPatient] = useState<Patient | null>(null)

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
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
    }
  }

  const handleAddPatient = async (newPatient: Omit<Patient, "id">) => {
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

  const handleUpdatePatient = async (updatedPatient: Patient) => {
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

  const handleDeletePatient = async (id: number) => {
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Patients</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Patient
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
            </DialogHeader>
            <AddPatientForm onSubmit={handleAddPatient} />
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>National ID</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>{`${patient.first_name} ${patient.last_name}`}</TableCell>
              <TableCell>{patient.email}</TableCell>
              <TableCell>{patient.phone_number}</TableCell>
              <TableCell>{patient.national_id}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2" onClick={() => setViewPatient(patient)}>
                  View
                </Button>
                <Button variant="outline" size="sm" className="mr-2" onClick={() => setEditPatient(patient)}>
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDeletePatient(patient.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {viewPatient && (
        <ViewPatientModal patient={viewPatient} isOpen={!!viewPatient} onClose={() => setViewPatient(null)} />
      )}
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

