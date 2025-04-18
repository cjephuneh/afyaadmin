"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import api from "@/utils/api"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, MessageSquare, User, Filter } from "lucide-react"

interface ContactMessage {
  id: number
  name: string
  email: string
  phone_number: string
  subject: string
  message: string
  status: string
}

export default function ContactPage() {
  const { toast } = useToast()
  
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [allMessages, setAllMessages] = useState<ContactMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    fetchContactMessages()
  }, [])

  useEffect(() => {
    if (statusFilter === "all") {
      setMessages(allMessages)
    } else {
      setMessages(allMessages.filter(message => message.status === statusFilter))
    }
  }, [statusFilter, allMessages])

  const fetchContactMessages = async () => {
    setIsLoading(true)
    try {
      const response = await api.get("https://api.afyamkononi.co.ke/api/v1.0/contact")
      setAllMessages(response.data.messages)
      setMessages(response.data.messages)
    } catch (error) {
      console.error("Error fetching contact messages:", error)
      toast({
        title: "Error",
        description: "Failed to fetch contact messages",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const openMessageModal = (message: ContactMessage) => {
    setSelectedMessage(message)
    setIsModalOpen(true)
  }

  const getStatusBadge = (status: string) => {
    if (status === "replied") {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Replied</Badge>
    }
    return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Unreplied</Badge>
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Contact Messages</h1>
            <p className="text-gray-500 mt-2">Manage messages from the contact form</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Messages</SelectItem>
                <SelectItem value="replied">Replied</SelectItem>
                <SelectItem value="unreplied">Unreplied</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <Table className="w-full rounded-md overflow-hidden border-collapse">
            <TableHeader className="bg-gray-50">
              <TableRow className="border-b border-gray-200">
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Email</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Subject</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No contact messages available
                  </TableCell>
                </TableRow>
              ) : (
                messages.map((message) => (
                  <TableRow key={message.id} className="hover:bg-gray-50 border-b border-gray-100">
                    <TableCell className="px-6 py-4 text-sm font-medium text-gray-700">{message.name}</TableCell>
                    <TableCell className="px-6 py-4 text-sm text-gray-600">{message.email}</TableCell>
                    <TableCell className="px-6 py-4 text-sm text-gray-600">
                      <div className="line-clamp-1">{message.subject}</div>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm text-gray-600">
                      {getStatusBadge(message.status)}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm text-gray-600">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => openMessageModal(message)}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>
      
      {/* Message Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md rounded-xl border-none shadow-xl bg-white p-0 overflow-hidden">
          <DialogHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <DialogTitle className="text-2xl font-bold">Message Details</DialogTitle>
            <p className="text-white/80 text-sm mt-1">{selectedMessage?.subject}</p>
          </DialogHeader>
          
          {selectedMessage && (
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 rounded-lg bg-gray-50">
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Sender</p>
                      <p className="font-medium text-gray-800">{selectedMessage.name}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-lg bg-gray-50">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p className="font-medium text-gray-800 break-all">{selectedMessage.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-gray-50">
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Phone</p>
                        <p className="font-medium text-gray-800">{selectedMessage.phone_number}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-gray-50">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Message</p>
                      <p className="text-gray-800 mt-1">{selectedMessage.message}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <p className="text-sm text-gray-500">Status:</p>
                    {getStatusBadge(selectedMessage.status)}
                  </div>
                  
                  {selectedMessage.status === "unreplied" && (
                    <Button className="bg-green-600 hover:bg-green-700">
                      Mark as Replied
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
