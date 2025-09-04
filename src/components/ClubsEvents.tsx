import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Calendar } from './ui/calendar'
import { 
  Users, 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  Search,
  Star,
  Plus,
  ExternalLink,
  Code,
  Palette,
  Music,
  Trophy,
  Camera,
  BookOpen,
  Heart,
  Gamepad2
} from 'lucide-react'

interface Club {
  id: string
  name: string
  category: string
  description: string
  members: number
  meetings: string
  location: string
  contact: string
  tags: string[]
  isJoined: boolean
  rating: number
}

interface Event {
  id: string
  title: string
  club: string
  date: Date
  time: string
  location: string
  description: string
  capacity: number
  registered: number
  isRegistered: boolean
  rsvpRequired: boolean
  tags: string[]
}

const clubs: Club[] = [
  {
    id: '1',
    name: 'Tech Innovation Society',
    category: 'Technology',
    description: 'Building tomorrow\'s technology today. We work on AI projects, mobile apps, and organize hackathons.',
    members: 156,
    meetings: 'Thursdays 7:00 PM',
    location: 'Computer Lab 3',
    contact: 'tech@campus.edu',
    tags: ['programming', 'AI', 'hackathon'],
    isJoined: true,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Creative Arts Collective',
    category: 'Arts',
    description: 'Express your creativity through painting, digital art, and multimedia projects.',
    members: 89,
    meetings: 'Tuesdays 6:30 PM',
    location: 'Art Studio B',
    contact: 'arts@campus.edu',
    tags: ['painting', 'digital art', 'creativity'],
    isJoined: false,
    rating: 4.6
  },
  {
    id: '3',
    name: 'Campus Radio Network',
    category: 'Media',
    description: 'Broadcasting campus news, music, and student voices across the university.',
    members: 45,
    meetings: 'Mondays 5:00 PM',
    location: 'Media Center',
    contact: 'radio@campus.edu',
    tags: ['broadcasting', 'music', 'news'],
    isJoined: false,
    rating: 4.4
  },
  {
    id: '4',
    name: 'Basketball Warriors',
    category: 'Sports',
    description: 'Competitive basketball team representing the university in inter-college tournaments.',
    members: 32,
    meetings: 'Mon/Wed/Fri 6:00 PM',
    location: 'Sports Complex',
    contact: 'basketball@campus.edu',
    tags: ['basketball', 'tournament', 'fitness'],
    isJoined: true,
    rating: 4.7
  },
  {
    id: '5',
    name: 'Photography Guild',
    category: 'Arts',
    description: 'Capturing moments and telling stories through the lens. Weekly photo walks and workshops.',
    members: 67,
    meetings: 'Saturdays 2:00 PM',
    location: 'Various Locations',
    contact: 'photo@campus.edu',
    tags: ['photography', 'workshops', 'storytelling'],
    isJoined: false,
    rating: 4.5
  },
  {
    id: '6',
    name: 'Debate Society',
    category: 'Academic',
    description: 'Sharpening critical thinking and public speaking skills through competitive debates.',
    members: 78,
    meetings: 'Wednesdays 7:30 PM',
    location: 'Lecture Hall 1',
    contact: 'debate@campus.edu',
    tags: ['debate', 'public speaking', 'critical thinking'],
    isJoined: false,
    rating: 4.3
  }
]

const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Spring Hackathon 2024',
    club: 'Tech Innovation Society',
    date: new Date('2024-03-15'),
    time: '9:00 AM - 6:00 PM',
    location: 'Engineering Building',
    description: 'Build innovative solutions to real-world problems. Prizes worth $5,000!',
    capacity: 100,
    registered: 67,
    isRegistered: true,
    rsvpRequired: true,
    tags: ['hackathon', 'coding', 'innovation']
  },
  {
    id: '2',
    title: 'Art Exhibition: "Digital Dreams"',
    club: 'Creative Arts Collective',
    date: new Date('2024-03-20'),
    time: '6:00 PM - 9:00 PM',
    location: 'Student Center Gallery',
    description: 'Showcasing digital artwork created by our members this semester.',
    capacity: 150,
    registered: 89,
    isRegistered: false,
    rsvpRequired: false,
    tags: ['art', 'exhibition', 'digital']
  },
  {
    id: '3',
    title: 'Basketball Championship Finals',
    club: 'Basketball Warriors',
    date: new Date('2024-03-22'),
    time: '7:00 PM - 9:00 PM',
    location: 'Main Gymnasium',
    description: 'Cheer for our team as they compete for the inter-college championship!',
    capacity: 500,
    registered: 234,
    isRegistered: true,
    rsvpRequired: false,
    tags: ['basketball', 'championship', 'sports']
  },
  {
    id: '4',
    title: 'Photography Workshop: Night Photography',
    club: 'Photography Guild',
    date: new Date('2024-03-25'),
    time: '8:00 PM - 11:00 PM',
    location: 'Campus Grounds',
    description: 'Learn techniques for capturing stunning night photos and cityscapes.',
    capacity: 25,
    registered: 18,
    isRegistered: false,
    rsvpRequired: true,
    tags: ['workshop', 'photography', 'night']
  }
]

const categoryIcons = {
  Technology: Code,
  Arts: Palette,
  Media: Music,
  Sports: Trophy,
  Academic: BookOpen,
  Community: Heart,
  Gaming: Gamepad2
}

const categories = [
  'All',
  'Technology',
  'Arts', 
  'Sports',
  'Academic',
  'Media',
  'Community',
  'Gaming'
]

export function ClubsEvents() {
  const [activeTab, setActiveTab] = useState('clubs')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const filteredClubs = clubs.filter(club => {
    const matchesCategory = selectedCategory === 'All' || club.category === selectedCategory
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         club.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const filteredEvents = upcomingEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const handleJoinClub = (clubId: string) => {
    // In a real app, this would update the backend
    console.log('Joining club:', clubId)
  }

  const handleRSVPEvent = (eventId: string) => {
    // In a real app, this would update the backend
    console.log('RSVP to event:', eventId)
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="clubs">Browse Clubs</TabsTrigger>
            <TabsTrigger value="events">Upcoming Events</TabsTrigger>
            <TabsTrigger value="my-clubs">My Clubs</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search clubs and events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
          </div>
        </div>

        <TabsContent value="clubs" className="space-y-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-black text-white border-black font-bold'
                    : 'bg-white text-black border-gray-200 hover:bg-black hover:text-white hover:border-black hover:font-bold'
                }`}
              >
                {category !== 'All' && categoryIcons[category as keyof typeof categoryIcons] && 
                  React.createElement(categoryIcons[category as keyof typeof categoryIcons], { className: "h-4 w-4 mr-1" })
                }
                {category}
              </Button>
            ))}
          </div>

          {/* Clubs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.map((club) => {
              const CategoryIcon = categoryIcons[club.category as keyof typeof categoryIcons] || Users
              return (
                <Card key={club.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <CategoryIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{club.name}</CardTitle>
                          <Badge variant="secondary">{club.category}</Badge>
                        </div>
                      </div>
                      {club.isJoined && (
                        <Badge className="bg-green-100 text-green-800">Joined</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{club.description}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{club.members} members</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{club.rating}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{club.meetings}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{club.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {club.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      {club.isJoined ? (
                        <Button variant="outline" className="flex-1">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View Club
                        </Button>
                      ) : (
                        <Button 
                          onClick={() => handleJoinClub(club.id)}
                          className="flex-1"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Join Club
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Events List */}
            <div className="lg:col-span-2 space-y-4">
              {filteredEvents.map((event) => (
                <Card key={event.id}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4>{event.title}</h4>
                          <p className="text-sm text-muted-foreground">by {event.club}</p>
                        </div>
                        {event.isRegistered && (
                          <Badge className="bg-green-100 text-green-800">Registered</Badge>
                        )}
                      </div>
                      
                      <p className="text-sm">{event.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          <span>{event.date.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{event.registered}/{event.capacity}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {event.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="text-sm text-muted-foreground">
                          {event.rsvpRequired && "RSVP Required"}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <MapPin className="h-4 w-4 mr-1" />
                            Location
                          </Button>
                          {event.isRegistered ? (
                            <Button variant="outline" size="sm">
                              Registered
                            </Button>
                          ) : (
                            <Button 
                              size="sm"
                              onClick={() => handleRSVPEvent(event.id)}
                            >
                              {event.rsvpRequired ? 'RSVP' : 'Attend'}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Calendar Sidebar */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Event Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Clubs</span>
                    <span>{clubs.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">My Memberships</span>
                    <span>{clubs.filter(c => c.isJoined).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Events This Month</span>
                    <span>{upcomingEvents.length}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="my-clubs" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clubs.filter(club => club.isJoined).map((club) => {
              const CategoryIcon = categoryIcons[club.category as keyof typeof categoryIcons] || Users
              return (
                <Card key={club.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            <CategoryIcon className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle>{club.name}</CardTitle>
                          <Badge variant="secondary">{club.category}</Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">{club.description}</p>
                      
                      <div className="text-sm">
                        <p><strong>Next Meeting:</strong> {club.meetings}</p>
                        <p><strong>Location:</strong> {club.location}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">Dashboard</Button>
                        <Button size="sm" variant="outline">Events</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}