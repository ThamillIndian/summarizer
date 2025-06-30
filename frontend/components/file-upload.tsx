"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { type File, X, Upload, Sparkles, Music, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface FileUploadProps {
  onFileSelect: (file: File) => void
  selectedFile: File | null
  onRemoveFile: () => void
  onSubmit: () => void
  isProcessing: boolean
}

export function FileUpload({ onFileSelect, selectedFile, onRemoveFile, onSubmit, isProcessing }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  // Helper function to check if file is supported
  const isSupportedFile = (file: File) => {
    const supportedTypes = ["video/mp4", "audio/mp3", "audio/mpeg", "audio/x-mpeg-3", "audio/mpeg3"]
    return (
      supportedTypes.includes(file.type) ||
      file.name.toLowerCase().endsWith(".mp3") ||
      file.name.toLowerCase().endsWith(".mp4")
    )
  }

  // Helper function to get file type for display
  const getFileType = (file: File) => {
    if (file.type.startsWith("video/") || file.name.toLowerCase().endsWith(".mp4")) {
      return "video"
    }
    if (file.type.startsWith("audio/") || file.name.toLowerCase().endsWith(".mp3")) {
      return "audio"
    }
    return "unknown"
  }

  // Helper function to get appropriate icon
  const getFileIcon = (file: File) => {
    const fileType = getFileType(file)
    return fileType === "video" ? Video : Music
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const files = Array.from(e.dataTransfer.files)
      const supportedFile = files.find((file) => isSupportedFile(file))

      if (supportedFile) {
        onFileSelect(supportedFile)
      }
    },
    [onFileSelect],
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file && isSupportedFile(file)) {
        onFileSelect(file)
      }
    },
    [onFileSelect],
  )

  if (selectedFile) {
    const FileIcon = getFileIcon(selectedFile)
    const fileType = getFileType(selectedFile)
    const fileTypeLabel = fileType === "video" ? "Video" : "Audio"

    return (
      <Card className="border-2 border-emerald-400 bg-gradient-to-br from-emerald-50 to-green-100 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileIcon className="w-6 h-6 text-emerald-600" />
              <div>
                <p className="font-medium text-emerald-800">{selectedFile.name}</p>
                <div className="flex items-center gap-2 text-sm text-emerald-600">
                  <span>{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                  <span>•</span>
                  <span>{fileTypeLabel} File</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onRemoveFile}
              disabled={isProcessing}
              className="hover:bg-red-100 hover:text-red-600 text-gray-500 transition-all duration-200"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={onSubmit}
              disabled={isProcessing}
              className={`flex-1 gap-2 text-white font-semibold transition-all duration-300 ${
                isProcessing
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg transform hover:scale-105"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              {isProcessing ? "Processing..." : "Start Processing"}
            </Button>
            <input
              type="file"
              accept="video/mp4,audio/mp3,audio/mpeg"
              onChange={handleFileInput}
              className="hidden"
              id="file-upload-replace"
            />
            <Button
              variant="outline"
              asChild
              disabled={isProcessing}
              className="border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white bg-transparent font-semibold transition-all duration-300 hover:shadow-md"
            >
              <label htmlFor="file-upload-replace" className="cursor-pointer">
                Replace
              </label>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardContent className="p-4">
        <div
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${
            isDragOver
              ? "border-purple-500 bg-purple-100 scale-105 shadow-lg"
              : "border-blue-400 hover:border-purple-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 hover:shadow-md"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
            <Upload className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Upload Meeting Recording</h3>
          <p className="text-gray-600 mb-4">Drag and drop your MP4 or MP3 file here, or click to browse</p>

          {/* Format Examples */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full">
              <Video className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium text-blue-700">MP4 Video</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-100 rounded-full">
              <Music className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-700">MP3 Audio</span>
            </div>
          </div>

          <input
            type="file"
            accept="video/mp4,audio/mp3,audio/mpeg"
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
          />
          <Button
            asChild
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105"
          >
            <label htmlFor="file-upload" className="cursor-pointer">
              Choose File
            </label>
          </Button>
          <p className="text-xs text-gray-500 mt-3">Supports MP4 video and MP3 audio files up to 500MB</p>
        </div>
      </CardContent>
    </Card>
  )
}
