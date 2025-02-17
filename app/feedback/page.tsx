"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import api from "@/utils/api"
import { useToast } from "@/hooks/use-toast"

interface Feedback {
  id: number
  comment: string
  rating: number
  patient_id: number
  created_at: string
  upvotes: number
}

export default function FeedbackPage() {
    const {toast} = useToast()

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  const fetchFeedbacks = async () => {
    try {
      const response = await api.get("/feedbacks")
      setFeedbacks(response.data)
    } catch (error) {
      console.error("Error fetching feedbacks:", error)
      toast({
        title: "Error",
        description: "Failed to fetch feedbacks",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Feedback</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient ID</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Upvotes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feedbacks.map((feedback) => (
            <TableRow key={feedback.id}>
              <TableCell>{feedback.patient_id}</TableCell>
              <TableCell>{feedback.comment}</TableCell>
              <TableCell>{feedback.rating}</TableCell>
              <TableCell>{new Date(feedback.created_at).toLocaleDateString()}</TableCell>
              <TableCell>{feedback.upvotes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

