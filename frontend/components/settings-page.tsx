"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User, Mail, Phone, Building, Calendar, Save, Edit3, Download } from "lucide-react"

// Mock meeting data for PDF generation
const meetingHistoryData = [
  {
    id: "1",
    title: "Q3 Performance Review",
    date: "2024-01-15",
    duration: "45 minutes",
    participants: 4,
    status: "completed",
    keyPoints: [
      "Q3 revenue increased by 15% compared to Q2, exceeding projections by 3%",
      "New user dashboard launched successfully with 40% improvement in page load times",
      "Customer satisfaction improved from 7.2 to 8.1 out of 10",
      "Support ticket response times reduced by 60% with new system",
    ],
    actionItems: [
      "Expand into European market in Q4",
      "Launch mobile app in Q4",
      "Hire additional engineering team members",
      "Improve customer onboarding process",
    ],
  },
  {
    id: "2",
    title: "Product Strategy Meeting",
    date: "2024-01-12",
    duration: "60 minutes",
    participants: 6,
    status: "completed",
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
  },
  {
    id: "3",
    title: "Weekly Team Standup",
    date: "2024-01-10",
    duration: "30 minutes",
    participants: 8,
    status: "completed",
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
  },
  {
    id: "4",
    title: "Client Presentation",
    date: "2024-01-08",
    duration: "90 minutes",
    participants: 5,
    status: "completed",
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
  },
]

export function SettingsPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [personalDetails, setPersonalDetails] = useState({
    fullName: "John Smith",
    email: "john.smith@company.com",
    phone: "+1 (555) 123-4567",
    company: "Tech Solutions Inc.",
    jobTitle: "Product Manager",
    bio: "Experienced product manager with a passion for AI-driven solutions and team collaboration.",
  })

  const handleSave = () => {
    setIsEditing(false)
    console.log("Saving personal details:", personalDetails)
  }

  const handleInputChange = (field: string, value: string) => {
    setPersonalDetails((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const generateMeetingHistoryPDF = async () => {
    setIsGeneratingPDF(true)

    try {
      // Create a new window for PDF generation
      const printWindow = window.open("", "_blank", "width=800,height=600")

      if (!printWindow) {
        alert("Please allow popups to generate the PDF report.")
        return
      }

      const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })

      // Calculate statistics
      const totalMeetings = meetingHistoryData.length
      const totalKeyPoints = meetingHistoryData.reduce((total, meeting) => total + meeting.keyPoints.length, 0)
      const totalActionItems = meetingHistoryData.reduce((total, meeting) => total + meeting.actionItems.length, 0)
      const totalParticipants = meetingHistoryData.reduce((total, meeting) => total + meeting.participants, 0)

      // Create the HTML content for PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Meeting History Report</title>
          <style>
            @page {
              margin: 1in;
              size: A4;
            }
            
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
            }
            
            .header {
              text-align: center;
              border-bottom: 3px solid #3b82f6;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            
            .header h1 {
              color: #1f2937;
              margin: 0;
              font-size: 28px;
              font-weight: bold;
            }
            
            .header p {
              color: #6b7280;
              margin: 5px 0 0 0;
              font-size: 14px;
            }
            
            .user-info {
              background: #f8fafc;
              padding: 15px;
              border-radius: 8px;
              margin-bottom: 30px;
              border-left: 4px solid #3b82f6;
            }
            
            .stats-grid {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 15px;
              margin-bottom: 30px;
            }
            
            .stat-card {
              background: #eff6ff;
              padding: 15px;
              border-radius: 8px;
              text-align: center;
              border: 1px solid #dbeafe;
            }
            
            .stat-number {
              font-size: 24px;
              font-weight: bold;
              color: #1e40af;
              margin-bottom: 5px;
            }
            
            .stat-label {
              font-size: 12px;
              color: #6b7280;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            
            .meeting {
              background: white;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              padding: 20px;
              margin-bottom: 20px;
              box-shadow: 0 1px 3px rgba(0,0,0,0.1);
              page-break-inside: avoid;
            }
            
            .meeting-header {
              border-bottom: 1px solid #e5e7eb;
              padding-bottom: 10px;
              margin-bottom: 15px;
            }
            
            .meeting-title {
              color: #1f2937;
              font-size: 18px;
              font-weight: 600;
              margin: 0 0 5px 0;
            }
            
            .meeting-meta {
              color: #6b7280;
              font-size: 14px;
              display: flex;
              gap: 20px;
              flex-wrap: wrap;
            }
            
            .section {
              margin-bottom: 15px;
            }
            
            .section-title {
              color: #374151;
              font-weight: 600;
              margin-bottom: 8px;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            
            .key-points, .action-items {
              list-style: none;
              padding: 0;
              margin: 0;
            }
            
            .key-points li, .action-items li {
              background: #f9fafb;
              padding: 8px 12px;
              margin-bottom: 5px;
              border-radius: 4px;
              border-left: 3px solid #10b981;
              font-size: 14px;
            }
            
            .action-items li {
              border-left-color: #f59e0b;
            }
            
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              text-align: center;
              color: #6b7280;
              font-size: 12px;
            }
            
            @media print {
              body { margin: 0; }
              .meeting { break-inside: avoid; }
              .stats-grid { break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>📊 Meeting History Report</h1>
            <p>Generated on ${currentDate}</p>
          </div>

          <div class="user-info">
            <strong>Account:</strong> ${personalDetails.fullName} (${personalDetails.email})<br>
            <strong>Company:</strong> ${personalDetails.company}<br>
            <strong>Role:</strong> ${personalDetails.jobTitle}
          </div>

          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-number">${totalMeetings}</div>
              <div class="stat-label">Total Meetings</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">${totalKeyPoints}</div>
              <div class="stat-label">Key Points</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">${totalActionItems}</div>
              <div class="stat-label">Action Items</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">${totalParticipants}</div>
              <div class="stat-label">Total Participants</div>
            </div>
          </div>

          ${meetingHistoryData
            .map(
              (meeting) => `
            <div class="meeting">
              <div class="meeting-header">
                <h2 class="meeting-title">${meeting.title}</h2>
                <div class="meeting-meta">
                  <span>📅 ${new Date(meeting.date).toLocaleDateString()}</span>
                  <span>⏱️ ${meeting.duration}</span>
                  <span>👥 ${meeting.participants} participants</span>
                  <span>✅ ${meeting.status}</span>
                </div>
              </div>

              <div class="section">
                <div class="section-title">🎯 Key Points</div>
                <ul class="key-points">
                  ${meeting.keyPoints.map((point) => `<li>${point}</li>`).join("")}
                </ul>
              </div>

              <div class="section">
                <div class="section-title">📋 Action Items</div>
                <ul class="action-items">
                  ${meeting.actionItems.map((item) => `<li>${item}</li>`).join("")}
                </ul>
              </div>
            </div>
          `,
            )
            .join("")}

          <div class="footer">
            <p>This report was generated by Recapify AI-Powered Meeting Summarizer</p>
            <p>© ${new Date().getFullYear()} Recapify. All rights reserved.</p>
          </div>
        </body>
        </html>
      `

      // Write content to the new window
      printWindow.document.write(htmlContent)
      printWindow.document.close()

      // Wait for content to load, then trigger print dialog
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print()
          // Close the window after printing
          printWindow.onafterprint = () => {
            printWindow.close()
          }
        }, 500)
      }
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Error generating PDF. Please try again.")
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      {/* Personal Details */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Personal Details</h2>
          <Button
            variant="outline"
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="gap-2 hover:shadow-md transition-all duration-200"
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center gap-2 text-gray-700 font-medium">
                  <User className="w-4 h-4" />
                  Full Name
                </Label>
                {isEditing ? (
                  <Input
                    id="fullName"
                    value={personalDetails.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className="hover:border-blue-400 focus:border-blue-500 transition-colors duration-200"
                  />
                ) : (
                  <p className="text-sm bg-gray-50 p-3 rounded-md text-gray-700">{personalDetails.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-gray-700 font-medium">
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={personalDetails.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="hover:border-blue-400 focus:border-blue-500 transition-colors duration-200"
                  />
                ) : (
                  <p className="text-sm bg-gray-50 p-3 rounded-md text-gray-700">{personalDetails.email}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2 text-gray-700 font-medium">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={personalDetails.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="hover:border-blue-400 focus:border-blue-500 transition-colors duration-200"
                  />
                ) : (
                  <p className="text-sm bg-gray-50 p-3 rounded-md text-gray-700">{personalDetails.phone}</p>
                )}
              </div>

              {/* Company */}
              <div className="space-y-2">
                <Label htmlFor="company" className="flex items-center gap-2 text-gray-700 font-medium">
                  <Building className="w-4 h-4" />
                  Company
                </Label>
                {isEditing ? (
                  <Input
                    id="company"
                    value={personalDetails.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    className="hover:border-blue-400 focus:border-blue-500 transition-colors duration-200"
                  />
                ) : (
                  <p className="text-sm bg-gray-50 p-3 rounded-md text-gray-700">{personalDetails.company}</p>
                )}
              </div>

              {/* Job Title */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="jobTitle" className="flex items-center gap-2 text-gray-700 font-medium">
                  <Calendar className="w-4 h-4" />
                  Job Title
                </Label>
                {isEditing ? (
                  <Input
                    id="jobTitle"
                    value={personalDetails.jobTitle}
                    onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                    className="hover:border-blue-400 focus:border-blue-500 transition-colors duration-200"
                  />
                ) : (
                  <p className="text-sm bg-gray-50 p-3 rounded-md text-gray-700">{personalDetails.jobTitle}</p>
                )}
              </div>

              {/* Bio */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="bio" className="text-gray-700 font-medium">
                  Bio
                </Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={personalDetails.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    rows={3}
                    placeholder="Tell us about yourself..."
                    className="hover:border-blue-400 focus:border-blue-500 transition-colors duration-200"
                  />
                ) : (
                  <p className="text-sm bg-gray-50 p-3 rounded-md text-gray-700">{personalDetails.bio}</p>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-2 mt-6 pt-6 border-t">
                <Button
                  onClick={handleSave}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all duration-300 hover:shadow-md"
                >
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Account Actions */}
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-gray-800">Account Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              onClick={generateMeetingHistoryPDF}
              disabled={isGeneratingPDF}
              className="flex-1 bg-transparent hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 disabled:opacity-50"
            >
              {isGeneratingPDF ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download Meeting History
                </>
              )}
            </Button>
            <Button variant="destructive" className="flex-1 hover:bg-red-600 transition-colors duration-200">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
