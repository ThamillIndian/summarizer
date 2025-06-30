"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users, Calendar, FileText, ChevronRight, Trash2 } from "lucide-react"

interface Meeting {
  id: string
  title: string
  date: string
  duration: string
  participants: number
  status: "completed" | "processing" | "failed"
  summary?: {
    keyPoints: string[]
    actionItems: string[]
    participants: string[]
    topics: string[]
  }
}

interface MeetingHistoryProps {
  onSelectMeeting: (meeting: Meeting) => void
}

// Mock meeting data
const initialMeetings: Meeting[] = [
  {
    id: "1",
    title: "Q3 Performance Review",
    date: "2024-01-15",
    duration: "45 minutes",
    participants: 4,
    status: "completed",
    summary: {
      keyPoints: [
        "Q3 revenue increased by 15% compared to Q2, exceeding projections by 3%",
        "New user dashboard launched successfully with 40% improvement in page load times",
        "Customer satisfaction improved from 7.2 to 8.1 out of 10",
        "Support ticket response times reduced by 60% with new system",
        "95% of critical bugs from previous quarter were resolved",
      ],
      actionItems: [
        "Expand into European market in Q4",
        "Launch mobile app in Q4",
        "Hire additional engineering team members",
        "Improve customer onboarding process",
        "Invest in customer support training for expansion",
        "Send meeting notes by end of day",
        "Schedule Q4 roadmap discussion for next week",
      ],
      participants: ["Sarah (Meeting Lead)", "John (Technical Lead)", "Lisa (Customer Success)", "Mike (Team Member)"],
      topics: [
        "Q3 Performance Review",
        "Technical Achievements",
        "Customer Satisfaction",
        "Q4 Planning",
        "Team Expansion",
      ],
    },
  },
  {
    id: "2",
    title: "Product Strategy Meeting",
    date: "2024-01-12",
    duration: "60 minutes",
    participants: 6,
    status: "completed",
    summary: {
      keyPoints: [
        "New product roadmap approved for 2024",
        "Mobile app development to start in Q2",
        "User research shows 85% satisfaction with current features",
        "Competitive analysis reveals market opportunity in enterprise segment",
      ],
      actionItems: [
        "Finalize mobile app wireframes by end of month",
        "Conduct user interviews for enterprise features",
        "Prepare budget proposal for additional developers",
        "Schedule follow-up meeting with design team",
      ],
      participants: [
        "Alex (Product Manager)",
        "Sarah (CEO)",
        "David (Designer)",
        "Emma (Developer)",
        "Lisa (Customer Success)",
        "Tom (Marketing)",
      ],
      topics: ["Product Roadmap", "Mobile Development", "User Research", "Market Analysis"],
    },
  },
  {
    id: "3",
    title: "Weekly Team Standup",
    date: "2024-01-10",
    duration: "30 minutes",
    participants: 8,
    status: "completed",
    summary: {
      keyPoints: [
        "Sprint 23 completed successfully with all user stories delivered",
        "New team member onboarding scheduled for next week",
        "Performance improvements deployed to production",
        "Customer feedback integration planned for next sprint",
      ],
      actionItems: [
        "Prepare onboarding materials for new developer",
        "Review and prioritize customer feedback tickets",
        "Schedule performance testing for new features",
        "Update project documentation",
      ],
      participants: [
        "John (Tech Lead)",
        "Emma (Developer)",
        "Mike (Developer)",
        "Anna (QA)",
        "David (Designer)",
        "Lisa (Product)",
        "Tom (DevOps)",
        "Sarah (Manager)",
      ],
      topics: ["Sprint Review", "Team Updates", "Performance", "Customer Feedback"],
    },
  },
  {
    id: "4",
    title: "Client Presentation",
    date: "2024-01-08",
    duration: "90 minutes",
    participants: 5,
    status: "completed",
    summary: {
      keyPoints: [
        "Client approved the proposed solution architecture",
        "Timeline extended by 2 weeks to accommodate additional features",
        "Budget increased by 20% for enhanced security requirements",
        "Weekly check-ins scheduled throughout the project",
      ],
      actionItems: [
        "Send updated project proposal with new timeline",
        "Schedule security audit with third-party vendor",
        "Assign dedicated project manager",
        "Set up weekly client communication cadence",
      ],
      participants: [
        "Sarah (Account Manager)",
        "John (Technical Lead)",
        "Alex (Sales)",
        "David (Solution Architect)",
        "Client Representative",
      ],
      topics: ["Solution Architecture", "Project Timeline", "Security Requirements", "Client Relations"],
    },
  },
  {
    id: "5",
    title: "Marketing Campaign Review",
    date: "2024-01-05",
    duration: "40 minutes",
    participants: 3,
    status: "processing",
    summary: {
      keyPoints: [],
      actionItems: [],
      participants: [],
      topics: [],
    },
  },
]

export function MeetingHistory({ onSelectMeeting }: MeetingHistoryProps) {
  const [meetings, setMeetings] = useState<Meeting[]>(initialMeetings)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "processing":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "failed":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleDeleteMeeting = (meetingId: string, event: React.MouseEvent) => {
    event.stopPropagation() // Prevent triggering the card click
    setMeetings(meetings.filter((meeting) => meeting.id !== meetingId))
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Meeting History</h1>
        <p className="text-gray-600">Review your past meetings and their AI-generated summaries</p>
      </div>

      {/* Meetings List */}
      <div className="space-y-4">
        {meetings.map((meeting) => (
          <Card
            key={meeting.id}
            className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer border-l-4 border-l-blue-500"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1" onClick={() => meeting.status === "completed" && onSelectMeeting(meeting)}>
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">{meeting.title}</h3>
                    <Badge variant="secondary" className={getStatusColor(meeting.status)}>
                      {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{formatDate(meeting.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{meeting.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{meeting.participants} participants</span>
                    </div>
                  </div>

                  {meeting.status === "completed" && meeting.summary && (
                    <div className="flex items-center gap-2 text-emerald-600">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {meeting.summary.keyPoints.length} key points • {meeting.summary.actionItems.length} action
                        items
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 ml-4">
                  {/* Delete Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => handleDeleteMeeting(meeting.id, e)}
                    className="hover:bg-red-100 hover:text-red-600 text-gray-400 transition-all duration-200 hover:shadow-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>

                  {meeting.status === "completed" && (
                    <Button
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation()
                        onSelectMeeting(meeting)
                      }}
                      className="border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white bg-transparent font-semibold transition-all duration-300 hover:shadow-md"
                    >
                      View Summary
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}

                  {meeting.status === "processing" && (
                    <div className="flex items-center gap-2 text-blue-600">
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm font-medium">Processing...</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {meetings.length === 0 && (
        <Card className="border-2 border-dashed border-gray-300">
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No meetings found</h3>
            <p className="text-gray-500 mb-4">Upload your first meeting recording to get started</p>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
              Upload Meeting
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
