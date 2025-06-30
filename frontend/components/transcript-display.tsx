"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Download } from "lucide-react"

interface TranscriptDisplayProps {
  transcript: string
}

export function TranscriptDisplay({ transcript }: TranscriptDisplayProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(transcript)
  }

  const handleDownload = () => {
    const blob = new Blob([transcript], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "meeting-transcript.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-green-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <CardHeader className="bg-gradient-to-r from-emerald-100 to-green-100 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-gray-800 font-bold">Full Transcript</span>
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
      <CardContent className="p-6">
        <div className="max-h-96 overflow-y-auto bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-4 border border-emerald-200 hover:border-emerald-300 transition-all duration-200">
          <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-700 hover:text-gray-800 transition-colors duration-200">
            {transcript}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
