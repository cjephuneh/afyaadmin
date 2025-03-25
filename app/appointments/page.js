"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Calendar, Clock, User, UserCheck, Link as LinkIcon, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddAppointmentForm } from "@/components/AddAppointmentForm";
import { ViewAppointmentModal } from "@/components/ViewAppointmentModal";
import { EditAppointmentModal } from "@/components/EditAppointmentModal";
import api from "@/utils/api";
import { useToast } from "@/hooks/use-toast";

export default function AppointmentsPage() {
  const { toast } = useToast();

  const [appointments, setAppointments] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [viewAppointment, setViewAppointment] = useState(null);
  const [editAppointment, setEditAppointment] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.get("/appointments");
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast({
        title: "Error",
        description: "Failed to fetch appointments",
        variant: "destructive",
      });
    }
  };

  const handleAddAppointment = async (newAppointment) => {
    try {
      await api.post("/appointments", newAppointment);
      toast({
        title: "Success",
        description: "Appointment added successfully",
      });
      fetchAppointments();
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Error adding appointment:", error);
      toast({
        title: "Error",
        description: "Failed to add appointment",
        variant: "destructive",
      });
    }
  };

  const handleUpdateAppointment = async (updatedAppointment) => {
    try {
      await api.put(`/appointments/${updatedAppointment.id}`, updatedAppointment);
      toast({
        title: "Success",
        description: "Appointment updated successfully",
      });
      fetchAppointments();
      setEditAppointment(null);
    } catch (error) {
      console.error("Error updating appointment:", error);
      toast({
        title: "Error",
        description: "Failed to update appointment",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAppointment = async (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await api.delete(`/appointments/${id}`);
        toast({
          title: "Success",
          description: "Appointment deleted successfully",
        });
        fetchAppointments();
      } catch (error) {
        console.error("Error deleting appointment:", error);
        toast({
          title: "Error",
          description: "Failed to delete appointment",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="space-y-8 p-6 bg-gray-50 rounded-xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Appointments</h1>
          <p className="text-gray-500">Manage your appointments schedule</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full bg-blue-600 px-6 py-2.5 text-white hover:bg-blue-700 shadow-md transition-all duration-200">
              <PlusCircle className="mr-2 h-5 w-5" /> Add New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] rounded-xl border-none shadow-2xl">
            <DialogHeader className="border-b pb-4">
              <DialogTitle className="text-xl font-semibold text-gray-800">Add New Appointment</DialogTitle>
            </DialogHeader>
            <AddAppointmentForm onSubmit={handleAddAppointment} />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <Table className="w-full border-collapse">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>Date</span>
                </div>
              </TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>Time</span>
                </div>
              </TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span>Patient Name</span>
                </div>
              </TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                <div className="flex items-center space-x-2">
                  <UserCheck className="h-4 w-4 text-gray-500" />
                  <span>Doctor Name</span>
                </div>
              </TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-gray-500" />
                  <span>Status</span>
                </div>
              </TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                <div className="flex items-center space-x-2">
                  <LinkIcon className="h-4 w-4 text-gray-500" />
                  <span>Meet</span>
                </div>
              </TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id} className="hover:bg-blue-50 transition-colors">
                <TableCell className="px-6 py-4 text-sm text-gray-700 font-medium">{appointment.date}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-700">{appointment.time}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-700">{`${appointment.patient_first_name} ${appointment.patient_last_name}`}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-700">{`${appointment.doctor_first_name} ${appointment.doctor_last_name}`}</TableCell>
                <TableCell className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    appointment.status === 'pending' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : appointment.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {appointment.status}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-4 text-sm">
                  {appointment.meet_link ? (
                    <a href={appointment.meet_link} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1">
                      <LinkIcon className="h-3 w-3" /> Link
                    </a>
                  ) : "N/A"}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg border-gray-300 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all"
                      onClick={() => setViewAppointment(appointment)}
                    >
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg border-gray-300 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition-all"
                      onClick={() => setEditAppointment(appointment)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg border-gray-300 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all"
                      onClick={() => handleDeleteAppointment(appointment.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Show empty state if no appointments */}
      {appointments.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No appointments found</h3>
          <p className="mt-2 text-sm text-gray-500">Get started by creating a new appointment.</p>
          <div className="mt-6">
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 shadow-sm transition-all"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Appointment
            </Button>
          </div>
        </div>
      )}

      {/* Modals */}
      {viewAppointment && (
        <ViewAppointmentModal
          appointment={viewAppointment}
          isOpen={!!viewAppointment}
          onClose={() => setViewAppointment(null)}
        />
      )}
      {editAppointment && (
        <EditAppointmentModal
          appointment={editAppointment}
          isOpen={!!editAppointment}
          onClose={() => setEditAppointment(null)}
          onUpdate={handleUpdateAppointment}
        />
      )}
    </div>
  );
}
