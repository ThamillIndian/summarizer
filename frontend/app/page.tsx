"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Mail, Lock, Sparkles, ArrowRight, Github, Chrome } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate authentication
    await new Promise((resolve) => setTimeout(resolve, 1500))
    // Redirect to dashboard
    router.push("/dashboard")
  }

  const handleSocialSignIn = async (provider: string) => {
    setIsLoading(true)
    // Simulate social authentication
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push("/dashboard")
  }

        return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="w-full max-w-md relative">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 hover:scale-110 transition-transform duration-300">
            <span className="text-white font-bold text-2xl">R</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Recapify</h1>
          <p className="text-gray-600">AI-Powered Meeting Summarization</p>
            </div>
        {/* Sign In Card */}
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-500">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center text-gray-800">Sign In</CardTitle>
            <CardDescription className="text-center text-gray-600">
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Social Sign In Buttons */}
            <div className="space-y-3">
                <Button
                variant="outline"
                className="w-full h-12 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 bg-transparent"
                onClick={() => handleSocialSignIn("google")}
                disabled={isLoading}
              >
                <Chrome className="w-5 h-5 mr-3" />
                Continue with Google
                </Button>
            <Button
              variant="outline"
                className="w-full h-12 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 bg-transparent"
                onClick={() => handleSocialSignIn("github")}
                disabled={isLoading}
            >
                <Github className="w-5 h-5 mr-3" />
                Continue with GitHub
            </Button>
          </div>
            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with email</span>
              </div>
              </div>
            {/* Email/Password Form */}
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                    required
                  />
                </div>
          </div>
                <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                  </div>
              {/* Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-500 font-medium transition-colors duration-200"
                >
                  Forgot password?
                </button>
              </div>
              {/* Sign In Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 mr-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Sign In to Dashboard
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>
            {/* Sign Up Link removed as requested */}
            </CardContent>
          </Card>
        {/* Features Preview */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">Trusted by teams worldwide</p>
          <div className="flex items-center justify-center space-x-6 text-xs text-gray-400">
            <div className="flex items-center">
              <Sparkles className="w-4 h-4 mr-1" />
              AI-Powered
        </div>
            <div className="flex items-center">
              <Lock className="w-4 h-4 mr-1" />
              Secure
      </div>
            <div className="flex items-center">
              <ArrowRight className="w-4 h-4 mr-1" />
              Fast Setup
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
