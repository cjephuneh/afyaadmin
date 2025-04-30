import { AppointmentDetails } from './appointment-details'
// import api from "@/utils/api"

interface Appointment {
  id: number
  appointment_method: string
  date: string
  time: string
  status: string
  patient_id: number
  doctor_id: number
  details?: string
  purpose?: string
  meet_link?: string
  room_id?: string
}

// This function tells Next.js which dynamic parameter values to pre-render at build time
export async function generateStaticParams() {
  try {
    // Fetch all appointment IDs or use a subset of known IDs
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments`)
    const appointments = await response.json()
    
    // Return an array of objects with the id parameter
    return appointments.map((appointment: Appointment) => ({
      id: appointment.id.toString(),
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    // Return a default set of IDs or an empty array if the API call fails
    return []
  }
}

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function AppointmentDetailsPage({ params }: Props) {
  return <AppointmentDetails id={params.id} />
}

