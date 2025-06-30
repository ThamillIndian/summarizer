"use client"

import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle } from "lucide-react"

interface ProcessingProgressProps {
  progress: number
  currentStep: string
  isComplete: boolean
}

const steps = [
  "Uploading file...",
  "Extracting audio...",
  "Transcribing speech...",
  "Generating summary...",
  "Complete!",
]

export function ProcessingProgress({ progress, currentStep, isComplete }: ProcessingProgressProps) {
  return (
    <Card className="border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-blue-100 to-purple-100 border-b">
        <CardTitle className="flex items-center gap-2">
          {isComplete ? (
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          ) : (
            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
          )}
          <span className="text-gray-800 font-bold">Processing Meeting</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <Progress value={progress} className="w-full" />
        <div className="space-y-2">
          {steps.map((step, index) => {
            const stepProgress = (index + 1) * 20
            const isCurrentStep = step === currentStep
            const isCompleted = progress >= stepProgress

            return (
              <div
                key={step}
                className={`flex items-center gap-3 text-sm p-2 rounded-lg transition-all duration-200 ${
                  isCurrentStep
                    ? "font-semibold text-blue-700 bg-blue-50"
                    : isCompleted
                      ? "text-emerald-700 bg-emerald-50"
                      : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isCompleted ? "bg-emerald-500" : isCurrentStep ? "bg-blue-500" : "bg-gray-300"
                  }`}
                />
                {step}
              </div>
            )
          })}
        </div>
        <p className="text-sm text-gray-600 font-medium">{progress}% complete</p>
      </CardContent>
    </Card>
  )
}
