"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Heart, Music, Users, DollarSign, TrendingUp, Copy, ExternalLink, Play } from "lucide-react"
import { useState, useEffect } from "react"

function DonationLinkSection() {
  const [copied, setCopied] = useState(false)
  const donationUrl = "https://donations.app/streamername"

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(donationUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <div className="flex items-center justify-center space-x-4 flex-wrap gap-2">
      <code className="bg-slate-900/50 text-purple-300 px-4 py-2 rounded-lg border border-purple-800/30 text-sm">
        {donationUrl}
      </code>
      <Button onClick={copyToClipboard} className="bg-purple-600 hover:bg-purple-700">
        <Copy className="h-4 w-4 mr-2" />
        {copied ? "Copied!" : "Copy Link"}
      </Button>
      <Link href="/donate/streamername">
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          <ExternalLink className="h-4 w-4 mr-2" />
          Make a Donation
        </Button>
      </Link>
    </div>
  )
}

export default function StreamerDashboard() {
  const [username, setUsername] = useState("StreamerName")

  useEffect(() => {
    const storedUsername = localStorage.getItem("username")
    if (storedUsername) {
      setUsername(storedUsername)
    }
  }, [])

  const recentDonations = [
    {
      id: 1,
      sender: "Alex_Gaming",
      amount: 25,
      currency: "USD",
      message: "Keep up the great work!",
      time: "2 min ago",
      track: "Bohemian Rhapsody - Queen",
    },
    {
      id: 2,
      sender: "StreamFan123",
      amount: 50,
      currency: "USD",
      message: "Love your content! 💜",
      time: "5 min ago",
    },
    {
      id: 3,
      sender: "MusicLover",
      amount: 15,
      currency: "USD",
      message: "Can you play some jazz?",
      time: "8 min ago",
      track: "Take Five - Dave Brubeck",
    },
    {
      id: 4,
      sender: "GamerPro2024",
      amount: 75,
      currency: "USD",
      message: "Amazing gameplay! Thanks for the tips!",
      time: "12 min ago",
    },
    {
      id: 5,
      sender: "RockFan88",
      amount: 30,
      currency: "USD",
      message: "Could you play some classic rock?",
      time: "15 min ago",
      track: "Hotel California - Eagles",
    },
    {
      id: 6,
      sender: "Anonymous",
      amount: 100,
      currency: "USD",
      message: "Keep being awesome! Your streams brighten my day.",
      time: "18 min ago",
    },
    {
      id: 7,
      sender: "TechNinja",
      amount: 20,
      currency: "USD",
      message: "Great setup! What's your streaming software?",
      time: "22 min ago",
    },
    {
      id: 8,
      sender: "CoffeeAddict",
      amount: 10,
      currency: "USD",
      message: "Thanks for the morning stream! ☕",
      time: "25 min ago",
    },
    {
      id: 9,
      sender: "NightOwl",
      amount: 45,
      currency: "USD",
      message: "Late night streams are the best!",
      time: "28 min ago",
      track: "Midnight City - M83",
    },
    {
      id: 10,
      sender: "RetroGamer",
      amount: 35,
      currency: "USD",
      message: "Love the retro game selection!",
      time: "32 min ago",
    },
  ]

  const requestedTracks = [
    { id: 1, track: "Bohemian Rhapsody - Queen", requester: "Alex_Gaming", amount: 25 },
    { id: 2, track: "Take Five - Dave Brubeck", requester: "MusicLover", amount: 15 },
    { id: 3, track: "Hotel California - Eagles", requester: "RockFan88", amount: 30 },
    { id: 4, track: "Midnight City - M83", requester: "NightOwl", amount: 45 },
    { id: 5, track: "Stairway to Heaven - Led Zeppelin", requester: "ClassicRock", amount: 50 },
    { id: 6, track: "Sweet Child O' Mine - Guns N' Roses", requester: "MetalHead", amount: 40 },
    { id: 7, track: "Comfortably Numb - Pink Floyd", requester: "ProgFan", amount: 60 },
    { id: 8, track: "Don't Stop Believin' - Journey", requester: "80sLover", amount: 25 },
    { id: 9, track: "Thunderstruck - AC/DC", requester: "RockStar", amount: 35 },
    { id: 10, track: "November Rain - Guns N' Roses", requester: "Ballads4Life", amount: 55 },
    { id: 11, track: "Imagine - John Lennon", requester: "PeaceLover", amount: 30 },
    { id: 12, track: "Smells Like Teen Spirit - Nirvana", requester: "GrungeKid", amount: 20 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-800/30 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12 border-2 border-purple-500">
                <AvatarImage src="/placeholder.svg?height=48&width=48" />
                <AvatarFallback className="bg-purple-600 text-white">ST</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-white">{username}</h1>
                <p className="text-purple-300">Live • 1,234 viewers</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/donations">
                <Button
                  variant="outline"
                  className="border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white bg-transparent"
                >
                  View All Donations
                </Button>
              </Link>
              <Link href="/settings">
                <Button className="bg-purple-600 hover:bg-purple-700">Settings</Button>
              </Link>
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  className="border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white bg-transparent"
                >
                  Log out
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-purple-800/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-300">Total Donations</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$2,847</div>
              <p className="text-xs text-purple-300">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-800/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-300">This Stream</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$156</div>
              <p className="text-xs text-purple-300">8 donations today</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-800/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-300">Supporters</CardTitle>
              <Users className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">342</div>
              <p className="text-xs text-purple-300">Unique donors</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-800/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-300">Track Requests</CardTitle>
              <Music className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">12</div>
              <p className="text-xs text-purple-300">Pending requests</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Donations */}
          <Card className="bg-slate-800/50 border-purple-800/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Heart className="mr-2 h-5 w-5 text-purple-400" />
                Recent Donations
              </CardTitle>
              <CardDescription className="text-purple-300">Latest support from your community</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {recentDonations.map((donation) => (
                    <div key={donation.id} className="p-4 rounded-lg bg-slate-700/30 border border-purple-800/20">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-purple-600 text-white text-sm">
                            {donation.sender.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-white">{donation.sender}</p>
                              <p className="text-sm text-purple-200 mt-1">{donation.message}</p>
                              {donation.track && (
                                <div className="flex items-center mt-2 text-xs text-purple-300">
                                  <Music className="h-3 w-3 mr-1" />
                                  {donation.track}
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col items-center justify-center space-y-2 ml-4">
                              <span className="text-xs text-purple-300 whitespace-nowrap">{donation.time}</span>
                              <div className="flex items-center space-x-2">
                                <Badge variant="secondary" className="bg-purple-600 text-white text-xs px-2 py-1">
                                  ${donation.amount}
                                </Badge>
                                <Button
                                  size="sm"
                                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-xs px-2 py-1 h-6"
                                >
                                  <Play className="h-2 w-2 mr-1" />
                                  Play
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Requested Tracks */}
          <Card className="bg-slate-800/50 border-purple-800/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Music className="mr-2 h-5 w-5 text-purple-400" />
                Requested Tracks
              </CardTitle>
              <CardDescription className="text-purple-300">Music requests from donations</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {requestedTracks.map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30 border border-purple-800/20"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{request.track}</p>
                        <p className="text-xs text-purple-300">Requested by {request.requester}</p>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Badge variant="outline" className="border-purple-500 text-purple-300">
                          ${request.amount}
                        </Badge>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          Play
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Donation Link */}
        <Card className="mt-8 bg-gradient-to-r from-purple-800/50 to-pink-800/50 border-purple-600/30 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">Support the Stream</h3>
              <p className="text-purple-200 mb-4">Share your donation link with viewers</p>
              <DonationLinkSection />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
