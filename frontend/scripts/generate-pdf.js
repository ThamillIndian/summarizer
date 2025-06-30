// PDF Generation Script for Meeting History
// This script creates a proper PDF using browser APIs

export async function generateMeetingHistoryPDF(personalDetails, meetingHistoryData) {
  try {
    // Create a new window for PDF generation
    const printWindow = window.open("", "_blank", "width=800,height=600")

    if (!printWindow) {
      throw new Error("Popup blocked. Please allow popups for this site.")
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

    return true
  } catch (error) {
    console.error("Error generating PDF:", error)
    throw error
  }
}
