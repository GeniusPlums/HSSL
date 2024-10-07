'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronUp, ChevronDown, ThumbsUp, Search, ArrowLeft } from "lucide-react"

// Mock data for teams
const initialTeams = [
  { id: 1, name: "EcoTech Solutions", school: "Green Valley High", votes: 120, description: "Sustainable energy solutions for urban areas", category: "CleanTech", teamMembers: ["Alice Johnson", "Bob Smith", "Charlie Brown"], achievements: ["1st Place in Regional Science Fair", "Featured in Local News"] },
  { id: 2, name: "HealthHub", school: "Wellness Academy", votes: 115, description: "AI-powered personal health assistant", category: "HealthTech", teamMembers: ["Diana Prince", "Clark Kent", "Bruce Wayne"], achievements: ["Best Health Innovation Award", "100,000 Beta Users"] },
  { id: 3, name: "EduConnect", school: "Future Minds Institute", votes: 110, description: "Peer-to-peer tutoring platform", category: "EdTech", teamMembers: ["Eva Green", "Frank Castle", "Grace Hopper"], achievements: ["EdTech Startup of the Year", "1 Million Learning Hours Facilitated"] },
  { id: 4, name: "SafeSpace", school: "Cyber Security High", votes: 105, description: "Secure communication app for teens", category: "Cybersecurity", teamMembers: ["Hank Pym", "Janet van Dyne", "Scott Lang"], achievements: ["Best Cybersecurity Solution", "NIST Recognition"] },
  { id: 5, name: "GreenThumb", school: "Eco Warriors School", votes: 100, description: "Smart urban gardening solution", category: "AgriTech", teamMembers: ["Ivy Pepper", "Jack Frost", "Kate Bishop"], achievements: ["Sustainable Innovation Prize", "10,000 Urban Gardens Created"] },
]

const categories = ["All", "CleanTech", "HealthTech", "EdTech", "Cybersecurity", "AgriTech"]

export default function EnhancedHSSLVotingPlatform() {
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [activeTab, setActiveTab] = useState("pitches")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredTeams, setFilteredTeams] = useState(initialTeams)
  const [teamDetailsId, setTeamDetailsId] = useState<number | null>(null)

  useEffect(() => {
    const filtered = initialTeams.filter((team) => {
      const matchesSearch =
        team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All" || team.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    setFilteredTeams(filtered)
  }, [searchTerm, selectedCategory])

  const handleVote = () => {
    // Implement voting logic here
    console.log(`Voted for team ${selectedTeam}`)
    setSelectedTeam(null)
    setPhoneNumber("")
    setOtp("")
    setIsOtpSent(false)
  }

  const sendOtp = () => {
    // Implement OTP sending logic here
    console.log(`OTP sent to ${phoneNumber}`)
    setIsOtpSent(true)
  }

  const handleTeamDetails = (teamId: number) => {
    setTeamDetailsId(teamId)
    setActiveTab("teamDetails")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Masters&apos; Union High School Startup League - Final Voting
      </h1>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pitches">Video Pitches</TabsTrigger>
          <TabsTrigger value="leaderboard">Live Leaderboard</TabsTrigger>
          <TabsTrigger value="teamDetails" disabled={!teamDetailsId}>Team Details</TabsTrigger>
        </TabsList>
        <TabsContent value="pitches">
          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="space-y-4">
              {filteredTeams.map((team) => (
                <Card key={team.id} className="overflow-hidden">
                  <CardHeader className="bg-primary text-primary-foreground p-4 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{team.name}</CardTitle>
                      <CardDescription className="text-primary-foreground/80">{team.school}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold">{team.votes}</span>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="secondary"
                            size="icon"
                            onClick={() => setSelectedTeam(team.id)}
                          >
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Vote for {team.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Input
                              type="tel"
                              placeholder="Enter your phone number"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            {!isOtpSent ? (
                              <Button onClick={sendOtp}>Send OTP</Button>
                            ) : (
                              <>
                                <Input
                                  type="text"
                                  placeholder="Enter OTP"
                                  value={otp}
                                  onChange={(e) => setOtp(e.target.value)}
                                />
                                <Button onClick={handleVote}>Submit Vote</Button>
                              </>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="aspect-video bg-gray-200 mb-4">
                      {/* Replace with actual video component */}
                      <div className="flex items-center justify-center h-full">
                        Video Pitch Placeholder
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{team.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                        {team.category}
                      </span>
                      <Button variant="link" onClick={() => handleTeamDetails(team.id)}>
                        View Team Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="leaderboard">
          <Card>
            <CardHeader>
              <CardTitle>Live Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Rank</TableHead>
                    <TableHead>Team Name</TableHead>
                    <TableHead>School</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Votes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeams
                    .sort((a, b) => b.votes - a.votes)
                    .map((team, index) => (
                      <TableRow key={team.id}>
                        <TableCell className="font-medium">
                          {index === 0 && <ChevronUp className="inline-block mr-1 text-green-500" />}
                          {index === filteredTeams.length - 1 && <ChevronDown className="inline-block mr-1 text-red-500" />}
                          {index + 1}
                        </TableCell>
                        <TableCell>{team.name}</TableCell>
                        <TableCell>{team.school}</TableCell>
                        <TableCell>{team.category}</TableCell>
                        <TableCell className="text-right">{team.votes}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="teamDetails">
          {teamDetailsId && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Button variant="ghost" size="sm" className="mr-2" onClick={() => setActiveTab("pitches")}>
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  {initialTeams.find(team => team.id === teamDetailsId)?.name} Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">School</h3>
                    <p>{initialTeams.find(team => team.id === teamDetailsId)?.school}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Category</h3>
                    <p>{initialTeams.find(team => team.id === teamDetailsId)?.category}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Description</h3>
                    <p>{initialTeams.find(team => team.id === teamDetailsId)?.description}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Team Members</h3>
                    <ul className="list-disc list-inside">
                      {initialTeams.find(team => team.id === teamDetailsId)?.teamMembers.map((member, index) => (
                        <li key={index}>{member}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold">Achievements</h3>
                    <ul className="list-disc list-inside">
                      {initialTeams.find(team => team.id === teamDetailsId)?.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}