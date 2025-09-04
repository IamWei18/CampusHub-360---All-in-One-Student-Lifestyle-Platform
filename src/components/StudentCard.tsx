import { useState } from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Separator } from './ui/separator'
import { 
  MessageCircle, 
  UserPlus, 
  MapPin, 
  GraduationCap, 
  Calendar,
  Languages,
  Heart,
  Music,
  Camera,
  Code,
  Palette,
  BookOpen,
  Trophy,
  Coffee,
  Star,
  Users,
  Phone,
  Mail,
  Globe
} from 'lucide-react'

export interface Student {
  id: string
  name: string
  major: string
  year: string
  bio: string
  location: string
  interests: string[]
  languages: string[]
  clubs: string[]
  courses: string[]
  profileImage?: string
  isOnline: boolean
  mutualFriends: number
  mutualClubs: string[]
  mutualCourses: string[]
  rating: number
  joinDate: string
  email?: string
  phone?: string
  socialLinks?: {
    linkedin?: string
    github?: string
    instagram?: string
  }
  preferences: {
    studyBuddy: boolean
    hangout: boolean
    projectPartner: boolean
    mentor: boolean
  }
}

interface StudentCardProps {
  student: Student
  variant?: 'compact' | 'detailed' | 'suggestion'
  onConnect?: (studentId: string) => void
  onMessage?: (studentId: string) => void
  onViewProfile?: (studentId: string) => void
  showMutuals?: boolean
  actionButton?: 'connect' | 'message' | 'view' | 'both'
}

const interestIcons: Record<string, any> = {
  music: Music,
  photography: Camera,
  coding: Code,
  art: Palette,
  reading: BookOpen,
  sports: Trophy,
  coffee: Coffee,
  gaming: Users,
  travel: Globe,
  fitness: Trophy
}

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const getRandomColor = (name: string) => {
  const colors = [
    'bg-blue-500',
    'bg-green-500', 
    'bg-purple-500',
    'bg-orange-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-red-500'
  ]
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}

export function StudentCard({ 
  student, 
  variant = 'compact',
  onConnect,
  onMessage,
  onViewProfile,
  showMutuals = true,
  actionButton = 'both'
}: StudentCardProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const handleConnect = () => {
    onConnect?.(student.id)
  }

  const handleMessage = () => {
    onMessage?.(student.id)
  }

  const handleViewProfile = () => {
    if (onViewProfile) {
      onViewProfile(student.id)
    } else {
      setIsProfileOpen(true)
    }
  }

  if (variant === 'suggestion') {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="pt-6 pb-4">
          <div className="text-center space-y-3">
            <div className="relative">
              <Avatar className={`h-16 w-16 mx-auto ${getRandomColor(student.name)}`}>
                <AvatarFallback className="text-white">
                  {getInitials(student.name)}
                </AvatarFallback>
              </Avatar>
              {student.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            
            <div>
              <h4 className="font-medium">{student.name}</h4>
              <p className="text-sm text-muted-foreground">{student.major} • {student.year}</p>
            </div>
            
            {showMutuals && student.mutualFriends > 0 && (
              <p className="text-xs text-muted-foreground">
                {student.mutualFriends} mutual friend{student.mutualFriends > 1 ? 's' : ''}
              </p>
            )}
            
            <div className="flex gap-2">
              <Button size="sm" onClick={handleConnect} className="flex-1">
                <UserPlus className="h-3 w-3 mr-1" />
                Connect
              </Button>
              <Button size="sm" variant="outline" onClick={handleMessage}>
                <MessageCircle className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (variant === 'compact') {
    return (
      <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleViewProfile}>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className={`h-12 w-12 ${getRandomColor(student.name)}`}>
                <AvatarFallback className="text-white">
                  {getInitials(student.name)}
                </AvatarFallback>
              </Avatar>
              {student.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium truncate">{student.name}</h4>
                  <p className="text-sm text-muted-foreground">{student.major} • {student.year}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    {student.location}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs">{student.rating}</span>
                </div>
              </div>
              
              {showMutuals && (student.mutualClubs.length > 0 || student.mutualCourses.length > 0) && (
                <div className="mt-2 space-y-1">
                  {student.mutualClubs.length > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Clubs: {student.mutualClubs.join(', ')}
                    </p>
                  )}
                  {student.mutualCourses.length > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Courses: {student.mutualCourses.join(', ')}
                    </p>
                  )}
                </div>
              )}
              
              <div className="flex flex-wrap gap-1 mt-2">
                {student.interests.slice(0, 3).map((interest, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {interest}
                  </Badge>
                ))}
                {student.interests.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{student.interests.length - 3}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              {(actionButton === 'connect' || actionButton === 'both') && (
                <Button 
                  size="sm" 
                  onClick={(e) => { e.stopPropagation(); handleConnect(); }}
                >
                  <UserPlus className="h-3 w-3" />
                </Button>
              )}
              {(actionButton === 'message' || actionButton === 'both') && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={(e) => { e.stopPropagation(); handleMessage(); }}
                >
                  <MessageCircle className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Detailed profile dialog
  return (
    <>
      <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setIsProfileOpen(true)}>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className={`h-16 w-16 ${getRandomColor(student.name)}`}>
                <AvatarFallback className="text-white">
                  {getInitials(student.name)}
                </AvatarFallback>
              </Avatar>
              {student.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium">{student.name}</h4>
                  <p className="text-sm text-muted-foreground">{student.major} • {student.year}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    {student.location}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs">{student.rating}</span>
                </div>
              </div>
              
              <p className="text-sm mt-2">{student.bio}</p>
              
              <div className="flex flex-wrap gap-1 mt-3">
                {student.interests.map((interest, index) => {
                  const Icon = interestIcons[interest.toLowerCase()]
                  return (
                    <Badge key={index} variant="secondary" className="text-xs flex items-center gap-1">
                      {Icon && <Icon className="h-3 w-3" />}
                      {interest}
                    </Badge>
                  )
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Student Profile</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start gap-4">
              <div className="relative">
                <Avatar className={`h-20 w-20 ${getRandomColor(student.name)}`}>
                  <AvatarFallback className="text-white text-xl">
                    {getInitials(student.name)}
                  </AvatarFallback>
                </Avatar>
                {student.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              
              <div className="flex-1">
                <h3>{student.name}</h3>
                <p className="text-muted-foreground">{student.major} • {student.year}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="h-4 w-4" />
                  {student.location}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{student.rating}</span>
                  <span className="text-sm text-muted-foreground ml-2">
                    Joined {student.joinDate}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleConnect}>
                  <UserPlus className="h-4 w-4 mr-1" />
                  Connect
                </Button>
                <Button variant="outline" onClick={handleMessage}>
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Message
                </Button>
              </div>
            </div>
            
            <Separator />
            
            {/* Bio */}
            <div>
              <h4 className="mb-2">About</h4>
              <p className="text-sm text-muted-foreground">{student.bio}</p>
            </div>
            
            {/* Academic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="mb-3 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Academic Info
                </h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Major:</span> {student.major}
                  </div>
                  <div>
                    <span className="font-medium">Year:</span> {student.year}
                  </div>
                  <div>
                    <span className="font-medium">Current Courses:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {student.courses.map((course, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Clubs & Activities
                </h4>
                <div className="flex flex-wrap gap-1">
                  {student.clubs.map((club, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {club}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Languages & Interests */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="mb-3 flex items-center gap-2">
                  <Languages className="h-4 w-4" />
                  Languages
                </h4>
                <div className="flex flex-wrap gap-1">
                  {student.languages.map((language, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="mb-3 flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Interests
                </h4>
                <div className="flex flex-wrap gap-1">
                  {student.interests.map((interest, index) => {
                    const Icon = interestIcons[interest.toLowerCase()]
                    return (
                      <Badge key={index} variant="secondary" className="text-xs flex items-center gap-1">
                        {Icon && <Icon className="h-3 w-3" />}
                        {interest}
                      </Badge>
                    )
                  })}
                </div>
              </div>
            </div>
            
            {/* Looking For */}
            <div>
              <h4 className="mb-3">Looking For</h4>
              <div className="flex flex-wrap gap-2">
                {student.preferences.studyBuddy && (
                  <Badge variant="outline">Study Buddy</Badge>
                )}
                {student.preferences.hangout && (
                  <Badge variant="outline">Hangout Partner</Badge>
                )}
                {student.preferences.projectPartner && (
                  <Badge variant="outline">Project Partner</Badge>
                )}
                {student.preferences.mentor && (
                  <Badge variant="outline">Mentor</Badge>
                )}
              </div>
            </div>
            
            {/* Contact Info */}
            {(student.email || student.phone || student.socialLinks) && (
              <div>
                <h4 className="mb-3">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  {student.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{student.email}</span>
                    </div>
                  )}
                  {student.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{student.phone}</span>
                    </div>
                  )}
                  {student.socialLinks && (
                    <div className="flex gap-2 mt-2">
                      {student.socialLinks.linkedin && (
                        <Button size="sm" variant="outline">LinkedIn</Button>
                      )}
                      {student.socialLinks.github && (
                        <Button size="sm" variant="outline">GitHub</Button>
                      )}
                      {student.socialLinks.instagram && (
                        <Button size="sm" variant="outline">Instagram</Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}