"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import api from "@/utils/api"
import { useToast } from "@/hooks/use-toast"
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons"

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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  const fetchFeedbacks = async () => {
    setIsLoading(true)
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
    } finally {
      setIsLoading(false)
    }
  }

  // Function to render star ratings
  const renderRating = (rating: number) => {
    const stars: React.ReactNode[] = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<StarFilledIcon key={i} className="h-4 w-4 text-yellow-400 inline-block" />);
      } else {
        stars.push(<StarIcon key={i} className="h-4 w-4 text-gray-300 inline-block" />);
      }
    }
    return <div className="flex items-center gap-1">{stars}</div>;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <div className="border-b pb-4 mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Patient Feedback</h1>
          <p className="text-gray-500 mt-2">Review and analyze patient feedback and ratings</p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <Table className="w-full rounded-md overflow-hidden border-collapse">
            <TableHeader className="bg-gray-50">
              <TableRow className="border-b border-gray-200">
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Patient ID</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Comment</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Rating</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Upvotes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedbacks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No feedback data available
                  </TableCell>
                </TableRow>
              ) : (
                feedbacks.map((feedback) => (
                  <TableRow key={feedback.id} className="hover:bg-gray-50 border-b border-gray-100">
                    <TableCell className="px-6 py-4 text-sm font-medium text-gray-700">#{feedback.patient_id}</TableCell>
                    <TableCell className="px-6 py-4 text-sm text-gray-600 max-w-md">
                      <div className="line-clamp-2">{feedback.comment}</div>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm text-gray-600">
                      {renderRating(feedback.rating)}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm text-gray-600">{new Date(feedback.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="px-6 py-4 text-sm">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                        {feedback.upvotes}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}

