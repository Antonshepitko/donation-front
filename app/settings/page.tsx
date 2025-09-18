"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  User,
  Bell,
  Palette,
  Music,
  DollarSign,
  Shield,
  Upload,
  Save,
  Eye,
  EyeOff,
  SettingsIcon,
} from "lucide-react"

export default function SettingsPage() {
  const [showApiKey, setShowApiKey] = useState(false)
  const [donationGoal, setDonationGoal] = useState([1000])
  const [minDonationAmount, setMinDonationAmount] = useState([1])
  const [trackRequestMin, setTrackRequestMin] = useState([20])
  const [alertVolume, setAlertVolume] = useState([75])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-800/30 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-purple-300 hover:text-white hover:bg-purple-800/30">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <SettingsIcon className="h-6 w-6 text-purple-400" />
                <h1 className="text-2xl font-bold text-white">Settings</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10 border-2 border-purple-500">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback className="bg-purple-600 text-white">ST</AvatarFallback>
              </Avatar>
              <div className="text-right">
                <p className="text-white font-medium">StreamerName</p>
                <p className="text-purple-300 text-sm">Premium Account</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 bg-slate-800/50 border border-purple-800/30">
            <TabsTrigger value="profile" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="donations" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <DollarSign className="h-4 w-4 mr-2" />
              Donations
            </TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Bell className="h-4 w-4 mr-2" />
              Alerts
            </TabsTrigger>
            <TabsTrigger
              value="appearance"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              <Palette className="h-4 w-4 mr-2" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="music" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Music className="h-4 w-4 mr-2" />
              Music
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-800/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Profile Information</CardTitle>
                <CardDescription className="text-purple-300">
                  Update your profile details and streaming information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <Avatar className="h-24 w-24 border-4 border-purple-500">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" />
                    <AvatarFallback className="bg-purple-600 text-white text-2xl">ST</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Avatar
                    </Button>
                    <p className="text-purple-300 text-sm">JPG, PNG up to 5MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="displayName" className="text-purple-300">
                      Display Name
                    </Label>
                    <Input
                      id="displayName"
                      defaultValue="StreamerName"
                      className="mt-1 bg-slate-700/50 border-purple-800/30 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="username" className="text-purple-300">
                      Username
                    </Label>
                    <Input
                      id="username"
                      defaultValue="streamername"
                      className="mt-1 bg-slate-700/50 border-purple-800/30 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-purple-300">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="streamer@example.com"
                      className="mt-1 bg-slate-700/50 border-purple-800/30 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="timezone" className="text-purple-300">
                      Timezone
                    </Label>
                    <Select defaultValue="utc">
                      <SelectTrigger className="mt-1 bg-slate-700/50 border-purple-800/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-purple-800/30">
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="est">EST</SelectItem>
                        <SelectItem value="pst">PST</SelectItem>
                        <SelectItem value="msk">MSK</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio" className="text-purple-300">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell your viewers about yourself..."
                    className="mt-1 bg-slate-700/50 border-purple-800/30 text-white placeholder:text-purple-400"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="socialLinks" className="text-purple-300">
                    Social Links
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <Input
                      placeholder="Twitch URL"
                      className="bg-slate-700/50 border-purple-800/30 text-white placeholder:text-purple-400"
                    />
                    <Input
                      placeholder="YouTube URL"
                      className="bg-slate-700/50 border-purple-800/30 text-white placeholder:text-purple-400"
                    />
                    <Input
                      placeholder="Twitter URL"
                      className="bg-slate-700/50 border-purple-800/30 text-white placeholder:text-purple-400"
                    />
                    <Input
                      placeholder="Discord URL"
                      className="bg-slate-700/50 border-purple-800/30 text-white placeholder:text-purple-400"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Donation Settings */}
          <TabsContent value="donations" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-800/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Donation Settings</CardTitle>
                <CardDescription className="text-purple-300">
                  Configure donation amounts, goals, and payment methods
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-purple-300">Minimum Donation Amount: ${minDonationAmount[0]}</Label>
                  <Slider
                    value={minDonationAmount}
                    onValueChange={setMinDonationAmount}
                    max={50}
                    min={1}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="text-purple-300">Track Request Minimum: ${trackRequestMin[0]}</Label>
                  <Slider
                    value={trackRequestMin}
                    onValueChange={setTrackRequestMin}
                    max={100}
                    min={5}
                    step={5}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="text-purple-300">Current Goal: ${donationGoal[0]}</Label>
                  <Slider
                    value={donationGoal}
                    onValueChange={setDonationGoal}
                    max={10000}
                    min={100}
                    step={100}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="goalDescription" className="text-purple-300">
                    Goal Description
                  </Label>
                  <Input
                    id="goalDescription"
                    defaultValue="New Gaming Setup"
                    className="mt-1 bg-slate-700/50 border-purple-800/30 text-white"
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-purple-300">Payment Methods</Label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white">PayPal</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Stripe (Credit Cards)</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Cryptocurrency</span>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-purple-300">Quick Donation Amounts</Label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {[5, 10, 25, 50, 100, 200].map((amount) => (
                      <div key={amount} className="flex items-center space-x-2">
                        <Input
                          defaultValue={amount}
                          className="bg-slate-700/50 border-purple-800/30 text-white text-center"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Alert Settings */}
          <TabsContent value="alerts" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-800/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Alert Settings</CardTitle>
                <CardDescription className="text-purple-300">
                  Customize donation alerts and notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-purple-300">Alert Volume: {alertVolume[0]}%</Label>
                  <Slider
                    value={alertVolume}
                    onValueChange={setAlertVolume}
                    max={100}
                    min={0}
                    step={5}
                    className="mt-2"
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-purple-300">Alert Types</Label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Sound Alerts</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Visual Alerts</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Text-to-Speech</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Screen Animations</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="alertDuration" className="text-purple-300">
                    Alert Duration (seconds)
                  </Label>
                  <Select defaultValue="5">
                    <SelectTrigger className="mt-1 bg-slate-700/50 border-purple-800/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-purple-800/30">
                      <SelectItem value="3">3 seconds</SelectItem>
                      <SelectItem value="5">5 seconds</SelectItem>
                      <SelectItem value="10">10 seconds</SelectItem>
                      <SelectItem value="15">15 seconds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-purple-300">Custom Alert Sound</Label>
                  <div className="mt-2 space-y-2">
                    <Button variant="outline" className="border-purple-800/30 bg-slate-700/30 text-white">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Sound File
                    </Button>
                    <p className="text-purple-400 text-sm">MP3, WAV up to 2MB</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-800/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Appearance Settings</CardTitle>
                <CardDescription className="text-purple-300">
                  Customize the look of your donation page and widgets
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-purple-300">Theme</Label>
                  <Select defaultValue="purple">
                    <SelectTrigger className="mt-1 bg-slate-700/50 border-purple-800/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-purple-800/30">
                      <SelectItem value="purple">Purple (Current)</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="red">Red</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="backgroundColor" className="text-purple-300">
                    Background Color
                  </Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input
                      id="backgroundColor"
                      type="color"
                      defaultValue="#7c3aed"
                      className="w-16 h-10 bg-slate-700/50 border-purple-800/30"
                    />
                    <Input defaultValue="#7c3aed" className="bg-slate-700/50 border-purple-800/30 text-white" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="accentColor" className="text-purple-300">
                    Accent Color
                  </Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input
                      id="accentColor"
                      type="color"
                      defaultValue="#ec4899"
                      className="w-16 h-10 bg-slate-700/50 border-purple-800/30"
                    />
                    <Input defaultValue="#ec4899" className="bg-slate-700/50 border-purple-800/30 text-white" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="fontFamily" className="text-purple-300">
                    Font Family
                  </Label>
                  <Select defaultValue="inter">
                    <SelectTrigger className="mt-1 bg-slate-700/50 border-purple-800/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-purple-800/30">
                      <SelectItem value="inter">Inter</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="opensans">Open Sans</SelectItem>
                      <SelectItem value="poppins">Poppins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="customCSS" className="text-purple-300">
                    Custom CSS
                  </Label>
                  <Textarea
                    id="customCSS"
                    placeholder="/* Add your custom CSS here */"
                    className="mt-1 bg-slate-700/50 border-purple-800/30 text-white placeholder:text-purple-400 font-mono"
                    rows={6}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Music Settings */}
          <TabsContent value="music" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-800/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Music Settings</CardTitle>
                <CardDescription className="text-purple-300">
                  Configure track requests and music integration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-purple-300">Supported Platforms</Label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white">YouTube</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Spotify</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">SoundCloud</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Apple Music</span>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="maxTrackLength" className="text-purple-300">
                    Maximum Track Length (minutes)
                  </Label>
                  <Select defaultValue="10">
                    <SelectTrigger className="mt-1 bg-slate-700/50 border-purple-800/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-purple-800/30">
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="10">10 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="bannedWords" className="text-purple-300">
                    Banned Words/Artists
                  </Label>
                  <Textarea
                    id="bannedWords"
                    placeholder="Enter banned words or artists, separated by commas"
                    className="mt-1 bg-slate-700/50 border-purple-800/30 text-white placeholder:text-purple-400"
                    rows={3}
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-purple-300">Auto-moderation</Label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Skip Explicit Content</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Require Manual Approval</span>
                      <Switch />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-800/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Security Settings</CardTitle>
                <CardDescription className="text-purple-300">
                  Manage your account security and API access
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="currentPassword" className="text-purple-300">
                    Current Password
                  </Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    className="mt-1 bg-slate-700/50 border-purple-800/30 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="newPassword" className="text-purple-300">
                    New Password
                  </Label>
                  <Input
                    id="newPassword"
                    type="password"
                    className="mt-1 bg-slate-700/50 border-purple-800/30 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-purple-300">
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    className="mt-1 bg-slate-700/50 border-purple-800/30 text-white"
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-purple-300">Two-Factor Authentication</Label>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Enable 2FA</span>
                    <Switch />
                  </div>
                </div>

                <div>
                  <Label className="text-purple-300">API Key</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input
                      type={showApiKey ? "text" : "password"}
                      defaultValue="sk_live_abcd1234efgh5678ijkl9012"
                      className="bg-slate-700/50 border-purple-800/30 text-white"
                      readOnly
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="border-purple-800/30 bg-slate-700/30 text-white"
                    >
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="sm" className="border-purple-800/30 bg-slate-700/30 text-white">
                      Regenerate
                    </Button>
                  </div>
                  <p className="text-purple-400 text-sm mt-1">Use this key to integrate with streaming software</p>
                </div>

                <div className="space-y-4">
                  <Label className="text-purple-300">Privacy Settings</Label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Show donation amounts publicly</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Allow anonymous donations</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Show donor leaderboard</span>
                      <Switch />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Save className="h-4 w-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
