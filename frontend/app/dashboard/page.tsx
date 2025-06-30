"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { FileUpload } from "@/components/file-upload"
import { ProcessingProgress } from "@/components/processing-progress"
import { TranscriptDisplay } from "@/components/transcript-display"
import { SummaryDisplay } from "@/components/summary-display"
import { SettingsPage } from "@/components/settings-page"
import { MeetingHistory } from "@/components/meeting-history"
import { MeetingSummaryAnalytics } from "@/components/meeting-summary-analytics"
import { Button } from "@/components/ui/button"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, TrendingUp, Users, Upload, BarChart3, Sparkles, Menu } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

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

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("")
  const [transcript, setTranscript] = useState("")
  const [summary, setSummary] = useState<any>(null)
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null)

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setProgress(0)
    setTranscript("")
    setSummary(null)
    setIsProcessing(false)
  }

  const handleSelectMeeting = (meeting: Meeting) => {
    setSelectedMeeting(meeting)
    setCurrentPage("summaries")
  }

  const handleBackToHistory = () => {
    setSelectedMeeting(null)
    setCurrentPage("history")
  }

  const handleStartProcessing = async () => {
    if (!selectedFile) return

    setIsProcessing(true)
    setProgress(0)

    // Simulate processing steps
    const steps = [
      { step: "Uploading file...", duration: 1000 },
      { step: "Extracting audio...", duration: 2000 },
      { step: "Transcribing speech...", duration: 3000 },
      { step: "Generating summary...", duration: 2000 },
      { step: "Complete!", duration: 500 },
    ]

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(steps[i].step)
      setProgress((i + 1) * 20)
      await new Promise((resolve) => setTimeout(resolve, steps[i].duration))
    }

    // Mock transcript and summary data
    setTranscript(`Welcome everyone to today's quarterly review meeting. I'm Sarah, and I'll be leading today's discussion.

First, let's review our Q3 performance metrics. Our revenue increased by 15% compared to Q2, which exceeded our initial projections by 3%. The marketing team's new digital campaign contributed significantly to this growth.

John, could you walk us through the technical achievements this quarter?

Sure, Sarah. We successfully launched the new user dashboard, which has received positive feedback from our beta users. The average page load time improved by 40%, and we resolved 95% of the critical bugs identified in the previous quarter.

That's excellent progress, John. Lisa, how are we doing on the customer satisfaction front?

Customer satisfaction scores have improved from 7.2 to 8.1 out of 10. We implemented the new support ticket system, which reduced response times by 60%. However, we still need to work on improving our onboarding process.

Thank you, Lisa. Looking ahead to Q4, our main priorities will be expanding into the European market, launching the mobile app, and hiring additional team members for the engineering department.

Are there any questions or concerns about these priorities?

I think we should also consider investing more in customer support training, given the upcoming expansion.

That's a great point, Mike. Let's add that to our action items.

Alright, let's wrap up. I'll send out the meeting notes by end of day, and we'll reconvene next week to discuss the detailed Q4 roadmap.`)

    setSummary({
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
      duration: "25 minutes",
      topics: [
        "Q3 Performance Review",
        "Technical Achievements",
        "Customer Satisfaction",
        "Q4 Planning",
        "Team Expansion",
      ],
    })

    setIsProcessing(false)
  }

  const hasResults = transcript && summary

  const renderContent = () => {
    // Settings page
    if (currentPage === "settings") {
      return <SettingsPage />
    }

    // Meeting History page
    if (currentPage === "history") {
      return <MeetingHistory onSelectMeeting={handleSelectMeeting} />
    }

    // Summaries page - shows specific meeting analytics
    if (currentPage === "summaries") {
      if (selectedMeeting) {
        return <MeetingSummaryAnalytics meeting={selectedMeeting} onBack={handleBackToHistory} />
      } else {
        // If no meeting selected, show message to select from history
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Meeting Summaries</h1>
              <p className="text-gray-600">Select a meeting from history to view its detailed summary</p>
            </div>

            <Card className="border-2 border-dashed border-gray-300">
              <CardContent className="p-12 text-center">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No meeting selected</h3>
                <p className="text-gray-500 mb-4">Go to Meeting History to select a meeting and view its summary</p>
                <Button
                  onClick={() => setCurrentPage("history")}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  View Meeting History
                </Button>
              </CardContent>
            </Card>
          </div>
        )
      }
    }

    // Upload Meeting page - ONLY place where upload functionality appears
    if (currentPage === "upload") {
      if (!hasResults) {
        return (
          <div className="max-w-xl mx-auto w-full space-y-4">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-800">Upload Meeting Recording</h2>
              <p className="text-gray-600 text-sm">
                Upload your meeting recording (MP4 video or MP3 audio) and get an instant AI-generated summary and
                insights
              </p>
            </div>

            <Card className="border-2 border-dashed border-blue-300 bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4">
                <FileUpload
                  onFileSelect={handleFileSelect}
                  selectedFile={selectedFile}
                  onRemoveFile={handleRemoveFile}
                  onSubmit={handleStartProcessing}
                  isProcessing={isProcessing}
                />
              </CardContent>
            </Card>

            {/* Submit Button - appears when file is selected */}
            {selectedFile && !isProcessing && (
              <div className="text-center">
                <Button
                  onClick={handleStartProcessing}
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold px-8 py-3 text-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Submit & Process Meeting
                </Button>
              </div>
            )}

            {isProcessing && (
              <ProcessingProgress progress={progress} currentStep={currentStep} isComplete={progress === 100} />
            )}
          </div>
        )
      }

      // Show results after processing on upload page
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Meeting Results</h2>
              <p className="text-gray-600">AI processing completed for {selectedFile?.name}</p>
            </div>
            <Button
              variant="outline"
              onClick={handleRemoveFile}
              className="border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white bg-transparent font-semibold transition-all duration-300 hover:shadow-md"
            >
              Process New Meeting
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SummaryDisplay summary={summary} />
            <TranscriptDisplay transcript={transcript} />
          </div>
        </div>
      )
    }

    // Dashboard content - NEVER shows upload functionality, only statistics and overview
    return (
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your Recapify overview</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card
            className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-blue-200"
            onClick={() => setCurrentPage("upload")}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Upload Meeting</h3>
              <p className="text-sm text-gray-600">Start processing a new recording</p>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-emerald-200"
            onClick={() => setCurrentPage("summaries")}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">View Summaries</h3>
              <p className="text-sm text-gray-600">Browse your AI-generated summaries</p>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-orange-200"
            onClick={() => setCurrentPage("history")}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Meeting History</h3>
              <p className="text-sm text-gray-600">Review past meetings</p>
            </CardContent>
          </Card>
        </div>

        {/* Statistics Overview */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Your Statistics</h2>

          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-500 hover:bg-blue-600 transition-colors duration-200">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">127</p>
                    <p className="text-sm text-gray-600">Total Summaries</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 transition-colors duration-200">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-emerald-600">89.5h</p>
                    <p className="text-sm text-gray-600">Hours Processed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-orange-500 hover:bg-orange-600 transition-colors duration-200">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-orange-600">23</p>
                    <p className="text-sm text-gray-600">This Month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-purple-500 hover:bg-purple-600 transition-colors duration-200">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-600">4.2</p>
                    <p className="text-sm text-gray-600">Avg Participants</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Stats */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-gray-800">Detailed Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Average Meeting Duration</Label>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200 transition-colors duration-200"
                    >
                      42 minutes
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Longest Meeting</Label>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200 transition-colors duration-200"
                    >
                      180 minutes
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Most Active Day</Label>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200 transition-colors duration-200"
                    >
                      Tuesday
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar onNavigate={setCurrentPage} currentPage={currentPage} />
      <SidebarInset className="sidebar-inset content-shift">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="sidebar-trigger -ml-1">
            <Menu className="w-5 h-5" />
            <span className="sr-only">Toggle Sidebar</span>
          </SidebarTrigger>
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-xs">R</span>
            </div>
            <h1 className="font-semibold text-gray-800">Recapify</h1>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">{renderContent()}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
