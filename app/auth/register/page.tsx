"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react"
import { authApi } from "@/lib/api"
import { useToast } from "@/components/ui/toast"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  })

  const router = useRouter()
  const { toast, ToastContainer } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!formData.username || !formData.password) {
      toast({
        type: "error",
        title: "Validation Error",
        description: "Please fill in username and password.",
      })
      setIsLoading(false)
      return
    }

    try {
      const registerData = {
        username: formData.username,
        password: formData.password,
      }

      await authApi.register(registerData)

      toast({
        type: "success",
        title: "Registration Successful",
        description: "Your account has been created successfully!",
      })

      setTimeout(() => {
        router.push("/auth/login")
      }, 800)
    } catch (error: any) {
      let errorMessage = error?.message || "An unexpected error occurred."
      if (errorMessage.includes("CORS")) {
        errorMessage = "Server connection issue (CORS). Please contact support."
      } else if (errorMessage.includes("Network error")) {
        errorMessage = "Cannot connect to server. Please check your internet connection."
      } else if (errorMessage.includes("Failed to fetch")) {
        errorMessage = "Server is not responding. Please try again later."
      }

      toast({
        type: "error",
        title: "Registration Failed",
        description: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <ToastContainer />

      <div className="w-full max-w-6xl">
        <Card className="overflow-hidden bg-slate-800/50 border-purple-800/30 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
              {/* Left Side */}
              <div className="relative bg-gradient-to-br from-purple-600 to-purple-800 p-8 flex flex-col justify-between">
                <div>
                  <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-8">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to website
                  </Link>
                  <div className="text-white text-2xl font-bold mb-2">StreamDonate</div>
                </div>

                <div className="relative">
                  <Image
                    src="/images/mountain-bg.png"
                    alt="Mountain landscape"
                    width={500}
                    height={300}
                    className="rounded-lg object-cover w-full h-64"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent rounded-lg" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h2 className="text-2xl font-bold mb-2">Join Our</h2>
                    <h2 className="text-2xl font-bold">Community!</h2>
                  </div>
                </div>

                <div className="flex space-x-2 justify-center">
                  <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                  <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                  <div className="w-6 h-2 bg-white rounded-full"></div>
                </div>
              </div>

              {/* Right Side - Register Form */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="w-full max-w-sm mx-auto">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Create an account</h1>
                    <p className="text-purple-300">
                      Already have an account?{" "}
                      <Link href="/auth/login" className="text-purple-400 hover:text-purple-300 underline">
                        Log in
                      </Link>
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-purple-300">
                          First name
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="Fletcher"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="mt-1 bg-slate-700/50 border-purple-800/30 text-white placeholder:text-purple-400"
                          disabled={isLoading}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-purple-300">
                          Last name
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Last name"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="mt-1 bg-slate-700/50 border-purple-800/30 text-white placeholder:text-purple-400"
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-purple-300">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1 bg-slate-700/50 border-purple-800/30 text-white placeholder:text-purple-400"
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <Label htmlFor="username" className="text-purple-300">
                        Username
                      </Label>
                      <Input
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="mt-1 bg-slate-700/50 border-purple-800/30 text-white placeholder:text-purple-400"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <Label htmlFor="password" className="text-purple-300">
                        Password
                      </Label>
                      <div className="relative mt-1">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="bg-slate-700/50 border-purple-800/30 text-white placeholder:text-purple-400 pr-10"
                          required
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-300"
                          disabled={isLoading}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" className="border-purple-500 data-[state=checked]:bg-purple-600" />
                      <Label htmlFor="terms" className="text-sm text-purple-300">
                        I agree to the{" "}
                        <Link href="/terms" className="text-purple-400 hover:text-purple-300 underline">
                          Terms & Conditions
                        </Link>
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        "Create account"
                      )}
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-purple-800/30" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="bg-slate-800 px-2 text-purple-300">Or register with</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-purple-800/30 bg-slate-700/30 text-white hover:bg-slate-700/50"
                        disabled={isLoading}
                      >
                        Google
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="border-purple-800/30 bg-slate-700/30 text-white hover:bg-slate-700/50"
                        disabled={isLoading}
                      >
                        Apple
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
