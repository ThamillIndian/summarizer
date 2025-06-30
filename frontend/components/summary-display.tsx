"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Download, Users, Clock, Target } from "lucide-react"

interface SummaryDisplayProps {
  summary: {
    keyPoints: string[]
    actionItems: string[]
    participants: string[]
    duration: string
    topics: string[]
  }
}

export function SummaryDisplay({ summary }: SummaryDisplayProps) {
  const handleCopy = () => {
    const summaryText = `
Key Points:
${summary.keyPoints.map((point) => `• ${point}`).join("\n")}

Action Items:
${summary.actionItems.map((item) => `• ${item}`).join("\n")}

Participants: ${summary.participants.join(", ")}
Duration: ${summary.duration}
Topics: ${summary.topics.join(", ")}
    `.trim()

    navigator.clipboard.writeText(summaryText)
  }

  const handleDownload = () => {
    const summaryText = `
Meeting Summary

Key Points:
${summary.keyPoints.map((point) => `• ${point}`).join("\n")}

Action Items:
${summary.actionItems.map((item) => `• ${item}`).join("\n")}

Meeting Details:
• Participants: ${summary.participants.join(", ")}
• Duration: ${summary.duration}
• Topics Discussed: ${summary.topics.join(", ")}
    `.trim()

    const blob = new Blob([summaryText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "meeting-summary.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <CardHeader className="bg-gradient-to-r from-blue-100 to-purple-100 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="text-gray-800 font-bold">AI Summary</span>
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white bg-transparent font-semibold transition-all duration-300 hover:shadow-md"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white bg-transparent font-semibold transition-all duration-300 hover:shadow-md"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Meeting Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-purple-100 hover:bg-purple-200 transition-all duration-200 hover:shadow-md cursor-pointer">
            <Users className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-800">{summary.participants.length} participants</span>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-100 hover:bg-emerald-200 transition-all duration-200 hover:shadow-md cursor-pointer">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-800">{summary.duration}</span>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-orange-100 hover:bg-orange-200 transition-all duration-200 hover:shadow-md cursor-pointer">
            <Target className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-semibold text-orange-800">{summary.topics.length} topics</span>
          </div>
        </div>

        {/* Topics */}
        <div>
          <h4 className="font-bold mb-3 text-gray-800">Topics Discussed</h4>
          <div className="flex flex-wrap gap-2">
            {summary.topics.map((topic, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200 font-semibold transition-all duration-200 hover:shadow-sm cursor-pointer"
              >
                {topic}
              </Badge>
            ))}
          </div>
        </div>

        {/* Key Points */}
        <div>
          <h4 className="font-bold mb-3 text-gray-800">Key Points</h4>
          <ul className="space-y-2">
            {summary.keyPoints.map((point, index) => (
              <li
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50 transition-all duration-200 hover:shadow-sm cursor-pointer"
              >
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-blue-500" />
                <span className="text-sm text-gray-700 hover:text-blue-700 transition-colors duration-200">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Items */}
        <div>
          <h4 className="font-bold mb-3 text-gray-800">Action Items</h4>
          <ul className="space-y-2">
            {summary.actionItems.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-orange-50 transition-all duration-200 hover:shadow-sm cursor-pointer"
              >
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-orange-500" />
                <span className="text-sm text-gray-700 hover:text-orange-700 transition-colors duration-200">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Participants */}
        <div>
          <h4 className="font-bold mb-3 text-gray-800">Participants</h4>
          <div className="flex flex-wrap gap-2">
            {summary.participants.map((participant, index) => (
              <Badge
                key={index}
                variant="outline"
                className="border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white font-semibold transition-all duration-200 hover:shadow-sm cursor-pointer"
              >
                {participant}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
