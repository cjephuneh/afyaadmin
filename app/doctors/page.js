"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AddDoctorForm } from "@/components/AddDoctorForm"
import { ViewDoctorModal } from "@/components/ViewDoctorModal"
import { EditDoctorModal } from "@/components/EditDoctorModal"
import api from "@/utils/api"
import { useToast } from "@/hooks/use-toast"

export default function DoctorsPage() {
  const { toast } = useToast()

  const [doctors, setDoctors] = useState([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [viewDoctor, setViewDoctor] = useState(null)
  const [editDoctor, setEditDoctor] = useState(null)

  useEffect(() => {
    fetchDoctors()
  }, [])

  const fetchDoctors = async () => {
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Doctors</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Doctor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Doctor</DialogTitle>
            </DialogHeader>
            <AddDoctorForm onSubmit={handleAddDoctor} />
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors.map((doctor) => (
            <TableRow key={doctor.id}>
              <TableCell>{`${doctor.first_name} ${doctor.last_name}`}</TableCell>
              <TableCell>{doctor.email}</TableCell>
              <TableCell>{doctor.phone_number}</TableCell>
              <TableCell>{doctor.specialization || "N/A"}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2" onClick={() => setViewDoctor(doctor)}>
                  View
                </Button>
                <Button variant="outline" size="sm" className="mr-2" onClick={() => setEditDoctor(doctor)}>
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDeleteDoctor(doctor.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
