"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/toast"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ username: "", password: "" })

  const router = useRouter()
  const { toast, ToastContainer } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!formData.username || !formData.password) {
      toast({ type: "error", title: "Validation Error", description: "Please fill in username and password." })
      setIsLoading(false)
      return
    }

    try {
      const r = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!r.ok) {
        const data = await r.json().catch(() => null)
        throw new Error(data?.error || `Login failed (${r.status})`)
      }

      toast({ type: "success", title: "Login Successful", description: `Welcome back, ${formData.username}!` })

      const params = new URLSearchParams(window.location.search)
      const next = params.get('next') || '/'
      setTimeout(() => router.push(next), 600)
    } catch (error: any) {
      toast({ type: "error", title: "Login Failed", description: error?.message || 'Unexpected error' })
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
              <div className="relative bg-gradient-to-br from-purple-600 to-purple-800 p-8 flex flex-col justify-between">
                <div>
                  <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-8">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to website
                  </Link>
                  <div className="text-white text-2xl font-bold mb-2">StreamDonate</div>
                </div>
                <div className="relative">
                  <Image src="/images/mountain-bg.png" alt="Mountain landscape" width={500} height={300}
                         className="rounded-lg object-cover w-full h-64" />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent rounded-lg" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h2 className="text-2xl font-bold mb-2">Welcome Back,</h2>
                    <h2 className="text-2xl font-bold">Streamer!</h2>
                  </div>
                </div>
                <div className="flex space-x-2 justify-center">
                  <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                  <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                  <div className="w-6 h-2 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="w-full max-w-sm mx-auto">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
                    <p className="text-purple-300">
                      Don&apos;t have an account?{' '}
                      <Link href="/auth/register" className="text-purple-400 hover:text-purple-300 underline">
                        Sign up
                      </Link>
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="username" className="text-purple-300">Username</Label>
                      <Input id="username" name="username" placeholder="Enter your username"
                             value={formData.username} onChange={handleInputChange}
                             className="mt-1 bg-slate-700/50 border-purple-800/30 text-white placeholder:text-purple-400"
                             required disabled={isLoading}/>
                    </div>

                    <div>
                      <Label htmlFor="password" className="text-purple-300">Password</Label>
                      <div className="relative mt-1">
                        <Input id="password" name="password" type={showPassword ? "text" : "password"}
                               placeholder="Enter your password" value={formData.password}
                               onChange={handleInputChange}
                               className="bg-slate-700/50 border-purple-800/30 text-white placeholder:text-purple-400 pr-10"
                               required disabled={isLoading}/>
                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-300"
                                disabled={isLoading}>
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <Link href="/auth/forgot-password" className="text-purple-400 hover:text-purple-300">
                          Forgot your password?
                        </Link>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium"
                            disabled={isLoading}>
                      {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Signing In...</>)
                                : 'Sign In'}
                    </Button>
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
