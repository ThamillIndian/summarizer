"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Copy, Download, Users, Clock, Target, Calendar, Share2 } from "lucide-react"

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

interface MeetingSummaryAnalyticsProps {
  meeting: Meeting
  onBack: () => void
}

export function MeetingSummaryAnalytics({ meeting, onBack }: MeetingSummaryAnalyticsProps) {
  const handleCopy = () => {
    if (!meeting.summary) return

    const summaryText = `
Meeting: ${meeting.title}
Date: ${meeting.date}
Duration: ${meeting.duration}

Key Points:
${meeting.summary.keyPoints.map((point) => `• ${point}`).join("\n")}

Action Items:
${meeting.summary.actionItems.map((item) => `• ${item}`).join("\n")}

Participants: ${meeting.summary.participants.join(", ")}
Topics: ${meeting.summary.topics.join(", ")}
    `.trim()

    navigator.clipboard.writeText(summaryText)
  }

  const handleDownload = () => {
    if (!meeting.summary) return

    const summaryText = `
Meeting Summary: ${meeting.title}
Date: ${new Date(meeting.date).toLocaleDateString()}
Duration: ${meeting.duration}

Key Points:
${meeting.summary.keyPoints.map((point) => `• ${point}`).join("\n")}

Action Items:
${meeting.summary.actionItems.map((item) => `• ${item}`).join("\n")}

Meeting Details:
• Participants: ${meeting.summary.participants.join(", ")}
• Topics Discussed: ${meeting.summary.topics.join(", ")}
    `.trim()

    const blob = new Blob([summaryText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${meeting.title.replace(/\s+/g, "-").toLowerCase()}-summary.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (!meeting.summary) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack} className="gap-2 bg-transparent">
            <ArrowLeft className="w-4 h-4" />
            Back to History
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{meeting.title}</h1>
            <p className="text-gray-600">Meeting summary not available</p>
          </div>
        </div>

        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Summary not available</h3>
            <p className="text-gray-500">This meeting is still being processed or failed to generate a summary.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="gap-2 hover:shadow-md transition-all duration-200 bg-transparent"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to History
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800">{meeting.title}</h1>
          <p className="text-gray-600">AI-generated summary and analytics</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleCopy}
            className="border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white bg-transparent font-semibold transition-all duration-300 hover:shadow-md"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
          <Button
            variant="outline"
            onClick={handleDownload}
            className="border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white bg-transparent font-semibold transition-all duration-300 hover:shadow-md"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button
            variant="outline"
            className="border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white bg-transparent font-semibold transition-all duration-300 hover:shadow-md"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Meeting Info */}
      <Card className="border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <Calendar className="w-5 h-5" />
            Meeting Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-100 hover:bg-blue-200 transition-all duration-200">
              <Calendar className="w-4 h-4 text-blue-600" />
              <div>
                <div className="text-sm font-semibold text-blue-800">{formatDate(meeting.date)}</div>
                <div className="text-xs text-blue-600">Meeting Date</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-100 hover:bg-emerald-200 transition-all duration-200">
              <Clock className="w-4 h-4 text-emerald-600" />
              <div>
                <div className="text-sm font-semibold text-emerald-800">{meeting.duration}</div>
                <div className="text-xs text-emerald-600">Duration</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-purple-100 hover:bg-purple-200 transition-all duration-200">
              <Users className="w-4 h-4 text-purple-600" />
              <div>
                <div className="text-sm font-semibold text-purple-800">
                  {meeting.summary.participants.length} people
                </div>
                <div className="text-xs text-purple-600">Participants</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-orange-100 hover:bg-orange-200 transition-all duration-200">
              <Target className="w-4 h-4 text-orange-600" />
              <div>
                <div className="text-sm font-semibold text-orange-800">{meeting.summary.topics.length} topics</div>
                <div className="text-xs text-orange-600">Discussed</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Key Points */}
        <Card className="border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-green-100 hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-emerald-100 to-green-100 border-b">
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              Key Points ({meeting.summary.keyPoints.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="space-y-3">
              {meeting.summary.keyPoints.map((point, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-emerald-50 transition-all duration-200 cursor-pointer"
                >
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-emerald-500" />
                  <span className="text-sm text-gray-700 hover:text-emerald-700 transition-colors duration-200">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Action Items */}
        <Card className="border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-red-100 hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-orange-100 to-red-100 border-b">
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              Action Items ({meeting.summary.actionItems.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="space-y-3">
              {meeting.summary.actionItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-orange-50 transition-all duration-200 cursor-pointer"
                >
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-orange-500" />
                  <span className="text-sm text-gray-700 hover:text-orange-700 transition-colors duration-200">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Topics and Participants */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Topics */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-gray-800">Topics Discussed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {meeting.summary.topics.map((topic, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200 font-semibold transition-all duration-200 hover:shadow-sm cursor-pointer"
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Participants */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-gray-800">Participants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {meeting.summary.participants.map((participant, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white font-semibold transition-all duration-200 hover:shadow-sm cursor-pointer"
                >
                  {participant}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
