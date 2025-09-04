import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Checkbox } from './ui/checkbox'
import { Slider } from './ui/slider'
import { StudentCard, Student } from './StudentCard'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Textarea } from './ui/textarea'
import { Alert, AlertDescription } from './ui/alert'
import { 
  Search, 
  Filter, 
  Sparkles, 
  Users, 
  GraduationCap,
  MapPin,
  Languages,
  Heart,
  Settings,
  MessageSquare,
  UserCheck,
  Crown,
  Lightbulb,
  HandHeart,
  Shield,
  Clock,
  Star,
  Phone,
  Video,
  Calendar,
  CheckCircle,
  User
} from 'lucide-react'

// Peer Counselor interface
interface PeerCounselor {
  id: string;
  name: string;
  major: string;
  year: string;
  bio: string;
  aboutApproach: string;
  location: string;
  specialties: string[];
  languages: string[];
  rating: number;
  joinDate: string;
  email: string;
  preferredContact: string[];
  weeklyAvailability: {
    [key: string]: string[];
  };
  totalSessions: number;
  responseTime: string;
  isOnline: boolean;
  verified: boolean;
}

const mockCounselors: PeerCounselor[] = [
  {
    id: 'c1',
    name: 'Priya Patel',
    major: 'Psychology',
    year: '4th Year',
    bio: 'Mental health advocate with 2+ years of peer counseling experience.',
    aboutApproach: 'I believe in creating a safe, judgment-free space where students can openly share their concerns. My approach combines active listening with practical coping strategies that I\'ve learned through my psychology studies and personal experiences.',
    location: 'Dorm Block C',
    specialties: ['Academic Stress', 'Social Anxiety', 'Time Management', 'Homesickness'],
    languages: ['English', 'Hindi', 'Gujarati'],
    rating: 4.9,
    joinDate: 'Sep 2021',
    email: 'priya.counselor@campus.edu',
    preferredContact: ['Secure Campus Chat', 'Video Call'],
    weeklyAvailability: {
      'Monday': ['2:00 PM - 4:00 PM'],
      'Tuesday': ['6:00 PM - 8:00 PM'],
      'Wednesday': ['2:00 PM - 4:00 PM'],
      'Thursday': ['6:00 PM - 8:00 PM'],
      'Friday': ['3:00 PM - 5:00 PM']
    },
    totalSessions: 47,
    responseTime: 'Usually responds within 2 hours',
    isOnline: true,
    verified: true
  },
  {
    id: 'c2',
    name: 'Marcus Johnson',
    major: 'Psychology',
    year: '3rd Year',
    bio: 'Specialized in helping students navigate academic transitions and social challenges.',
    aboutApproach: 'Having experienced my own struggles with academic pressure, I focus on helping students develop resilience and healthy coping mechanisms. I use evidence-based techniques from cognitive behavioral therapy principles.',
    location: 'Graduate Housing',
    specialties: ['Academic Pressure', 'Social Anxiety', 'Self-Confidence', 'Study-Life Balance'],
    languages: ['English', 'Spanish'],
    rating: 4.8,
    joinDate: 'Sep 2022',
    email: 'marcus.counselor@campus.edu',
    preferredContact: ['Secure Campus Chat', 'Phone Call'],
    weeklyAvailability: {
      'Monday': ['7:00 PM - 9:00 PM'],
      'Tuesday': ['4:00 PM - 6:00 PM'],
      'Thursday': ['7:00 PM - 9:00 PM'],
      'Saturday': ['10:00 AM - 12:00 PM']
    },
    totalSessions: 32,
    responseTime: 'Usually responds within 3 hours',
    isOnline: false,
    verified: true
  },
  {
    id: 'c3',
    name: 'Sarah Chen',
    major: 'Counseling Psychology',
    year: 'Graduate Student',
    bio: 'Graduate student in counseling psychology with focus on mindfulness and stress reduction.',
    aboutApproach: 'I integrate mindfulness practices with traditional counseling approaches to help students develop self-awareness and emotional regulation skills. My sessions often include practical exercises you can use in daily life.',
    location: 'Graduate Housing',
    specialties: ['Stress Management', 'Mindfulness', 'Academic Performance', 'Relationship Issues'],
    languages: ['English', 'Mandarin'],
    rating: 4.9,
    joinDate: 'Sep 2020',
    email: 'sarah.counselor@campus.edu',
    preferredContact: ['Video Call', 'Secure Campus Chat'],
    weeklyAvailability: {
      'Tuesday': ['1:00 PM - 3:00 PM'],
      'Wednesday': ['5:00 PM - 7:00 PM'],
      'Friday': ['1:00 PM - 3:00 PM'],
      'Sunday': ['2:00 PM - 4:00 PM']
    },
    totalSessions: 63,
    responseTime: 'Usually responds within 1 hour',
    isOnline: true,
    verified: true
  },
  {
    id: 'c4',
    name: 'Alex Rivera',
    major: 'Social Work',
    year: '4th Year',
    bio: 'Passionate about supporting first-generation college students and those facing identity challenges.',
    aboutApproach: 'As a first-generation college student myself, I understand the unique challenges many students face. I focus on building self-advocacy skills and connecting students with campus resources while providing emotional support.',
    location: 'Off-Campus',
    specialties: ['First-Gen Support', 'Identity Issues', 'Family Conflicts', 'Cultural Adaptation'],
    languages: ['English', 'Spanish'],
    rating: 4.7,
    joinDate: 'Sep 2021',
    email: 'alex.counselor@campus.edu',
    preferredContact: ['Secure Campus Chat', 'Phone Call'],
    weeklyAvailability: {
      'Monday': ['5:00 PM - 7:00 PM'],
      'Wednesday': ['3:00 PM - 5:00 PM'],
      'Friday': ['5:00 PM - 7:00 PM'],
      'Saturday': ['1:00 PM - 3:00 PM']
    },
    totalSessions: 28,
    responseTime: 'Usually responds within 4 hours',
    isOnline: true,
    verified: true
  }
];

const counselorSpecialties = [
  'All', 'Academic Stress', 'Social Anxiety', 'Time Management', 'Homesickness', 
  'Academic Pressure', 'Self-Confidence', 'Study-Life Balance', 'Stress Management',
  'Mindfulness', 'Academic Performance', 'Relationship Issues', 'First-Gen Support',
  'Identity Issues', 'Family Conflicts', 'Cultural Adaptation'
];

const availabilityOptions = ['Any', 'Morning', 'Afternoon', 'Evening', 'Weekend'];

const connectionReasons = [
  'Academic stress and study challenges',
  'Social anxiety and making friends',
  'Homesickness and adjustment issues',
  'Time management and organization',
  'Family and relationship concerns',
  'Self-confidence and identity',
  'General mental health support',
  'Other (please specify in message)'
];

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    major: 'Computer Science',
    year: '3rd Year',
    bio: 'Passionate about AI and machine learning. Love hiking and photography in my free time. Always up for a good coding session or coffee chat!',
    location: 'Dorm Block A',
    interests: ['coding', 'photography', 'hiking', 'coffee', 'AI'],
    languages: ['English', 'Mandarin', 'Python', 'JavaScript'],
    clubs: ['Tech Innovation Society', 'Photography Guild'],
    courses: ['Data Structures', 'Machine Learning', 'Web Development'],
    isOnline: true,
    mutualFriends: 3,
    mutualClubs: ['Tech Innovation Society'],
    mutualCourses: ['Data Structures'],
    rating: 4.8,
    joinDate: 'Sep 2022',
    email: 'sarah.chen@campus.edu',
    preferences: {
      studyBuddy: true,
      hangout: true,
      projectPartner: true,
      mentor: false
    }
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    major: 'Business Administration',
    year: '2nd Year',
    bio: 'Entrepreneur at heart with a passion for sustainable business practices. Love basketball and exploring new cuisines around campus.',
    location: 'Off-Campus',
    interests: ['business', 'basketball', 'cooking', 'travel', 'sustainability'],
    languages: ['English', 'Spanish'],
    clubs: ['Business Club', 'Basketball Warriors'],
    courses: ['Marketing', 'Financial Management', 'Operations'],
    isOnline: false,
    mutualFriends: 1,
    mutualClubs: ['Basketball Warriors'],
    mutualCourses: [],
    rating: 4.5,
    joinDate: 'Sep 2023',
    preferences: {
      studyBuddy: true,
      hangout: true,
      projectPartner: false,
      mentor: false
    }
  },
  {
    id: '3',
    name: 'Priya Patel',
    major: 'Psychology',
    year: '4th Year',
    bio: 'Mental health advocate and research enthusiast. Enjoy reading, yoga, and organizing community events. Happy to mentor underclassmen!',
    location: 'Dorm Block C',
    interests: ['psychology', 'reading', 'yoga', 'community service', 'research'],
    languages: ['English', 'Hindi', 'Gujarati'],
    clubs: ['Psychology Society', 'Community Service Club'],
    courses: ['Cognitive Psychology', 'Research Methods', 'Therapy Techniques'],
    isOnline: true,
    mutualFriends: 0,
    mutualClubs: [],
    mutualCourses: [],
    rating: 4.9,
    joinDate: 'Sep 2021',
    preferences: {
      studyBuddy: false,
      hangout: true,
      projectPartner: false,
      mentor: true
    }
  },
  {
    id: '4',
    name: 'Alex Rivera',
    major: 'Computer Science',
    year: '3rd Year',
    bio: 'Full-stack developer and open source contributor. Love gaming, anime, and building cool projects. Always looking for hackathon teammates!',
    location: 'Dorm Block B',
    interests: ['coding', 'gaming', 'anime', 'music', 'open source'],
    languages: ['English', 'Spanish', 'JavaScript', 'React', 'Node.js'],
    clubs: ['Tech Innovation Society', 'Gaming Club'],
    courses: ['Data Structures', 'Software Engineering', 'Database Systems'],
    isOnline: true,
    mutualFriends: 2,
    mutualClubs: ['Tech Innovation Society'],
    mutualCourses: ['Data Structures', 'Software Engineering'],
    rating: 4.7,
    joinDate: 'Sep 2022',
    preferences: {
      studyBuddy: true,
      hangout: true,
      projectPartner: true,
      mentor: false
    }
  },
  {
    id: '5',
    name: 'Emma Thompson',
    major: 'Art & Design',
    year: '1st Year',
    bio: 'Digital artist and UI/UX enthusiast. Love painting, sketching, and creating beautiful designs. New to campus and excited to meet creative minds!',
    location: 'Dorm Block A',
    interests: ['art', 'design', 'painting', 'photography', 'creativity'],
    languages: ['English', 'French'],
    clubs: ['Creative Arts Collective'],
    courses: ['Design Fundamentals', 'Digital Art', 'Art History'],
    isOnline: false,
    mutualFriends: 0,
    mutualClubs: [],
    mutualCourses: [],
    rating: 4.6,
    joinDate: 'Sep 2024',
    preferences: {
      studyBuddy: true,
      hangout: true,
      projectPartner: true,
      mentor: false
    }
  },
  {
    id: '6',
    name: 'David Kim',
    major: 'Engineering',
    year: '4th Year',
    bio: 'Robotics and automation enthusiast. Captain of the debate team. Love building things and solving complex problems.',
    location: 'Graduate Housing',
    interests: ['robotics', 'debate', 'engineering', 'innovation', 'leadership'],
    languages: ['English', 'Korean', 'C++', 'Python'],
    clubs: ['Robotics Club', 'Debate Society'],
    courses: ['Advanced Robotics', 'Control Systems', 'Project Management'],
    isOnline: true,
    mutualFriends: 1,
    mutualClubs: [],
    mutualCourses: [],
    rating: 4.8,
    joinDate: 'Sep 2021',
    preferences: {
      studyBuddy: false,
      hangout: true,
      projectPartner: true,
      mentor: true
    }
  }
]

const majors = ['All Majors', 'Computer Science', 'Business Administration', 'Psychology', 'Art & Design', 'Engineering', 'Biology', 'Mathematics']
const years = ['All Years', '1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate']
const interests = ['coding', 'art', 'music', 'sports', 'photography', 'reading', 'gaming', 'cooking', 'travel', 'fitness']
const languages = ['English', 'Spanish', 'Mandarin', 'French', 'Hindi', 'Korean', 'Arabic', 'German']

export function FriendFinder() {
  const [activeTab, setActiveTab] = useState('discover')
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    major: 'All Majors',
    year: 'All Years',
    location: '',
    interests: [] as string[],
    languages: [] as string[],
    lookingFor: [] as string[],
    onlineOnly: false,
    rating: [0]
  })
  const [connectedStudents, setConnectedStudents] = useState<string[]>(['1', '4'])
  
  // Peer Counselor states
  const [counselorFilters, setCounselorFilters] = useState({
    specialty: 'All',
    availability: 'Any'
  })
  const [selectedCounselor, setSelectedCounselor] = useState<PeerCounselor | null>(null)
  const [connectionRequest, setConnectionRequest] = useState({
    reason: '',
    message: ''
  })
  const [connectedCounselors, setConnectedCounselors] = useState<string[]>(['c1'])
  const [showRequestDialog, setShowRequestDialog] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  const aiSuggestions = mockStudents.filter(student => 
    student.mutualFriends > 0 || 
    student.mutualClubs.length > 0 || 
    student.mutualCourses.length > 0
  ).slice(0, 3)

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = searchQuery === '' || 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.major.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.bio.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesMajor = filters.major === 'All Majors' || student.major === filters.major
    const matchesYear = filters.year === 'All Years' || student.year === filters.year
    const matchesLocation = filters.location === '' || student.location.toLowerCase().includes(filters.location.toLowerCase())

    
    const matchesInterests = filters.interests.length === 0 || 
      filters.interests.some(interest => student.interests.some(si => si.toLowerCase().includes(interest.toLowerCase())))
    
    const matchesLanguages = filters.languages.length === 0 ||
      filters.languages.some(lang => student.languages.includes(lang))

    return matchesSearch && matchesMajor && matchesYear && matchesLocation && 
           matchesInterests && matchesLanguages
  })

  const handleConnect = (studentId: string) => {
    setConnectedStudents(prev => [...prev, studentId])
    // In a real app, this would make an API call
    console.log('Connecting to student:', studentId)
  }

  const handleMessage = (studentId: string) => {
    // In a real app, this would open a chat interface
    console.log('Messaging student:', studentId)
  }

  const handleInterestToggle = (interest: string) => {
    setFilters(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleLanguageToggle = (language: string) => {
    setFilters(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }))
  }

  const resetFilters = () => {
    setFilters({
      major: 'All Majors',
      year: 'All Years',
      location: '',
      interests: [],
      languages: [],
      lookingFor: [],
      onlineOnly: false,
      rating: [0]
    })
  }

  // Peer Counselor functions
  const filteredCounselors = mockCounselors.filter(counselor => {
    const matchesSpecialty = counselorFilters.specialty === 'All' || 
      counselor.specialties.includes(counselorFilters.specialty);
    
    const matchesAvailability = counselorFilters.availability === 'Any' || 
      Object.values(counselor.weeklyAvailability).some(times => 
        times.some(timeSlot => {
          if (counselorFilters.availability === 'Morning') return timeSlot.includes('AM');
          if (counselorFilters.availability === 'Afternoon') return timeSlot.includes('PM') && !timeSlot.includes('7:00 PM') && !timeSlot.includes('8:00 PM') && !timeSlot.includes('9:00 PM');
          if (counselorFilters.availability === 'Evening') return timeSlot.includes('PM') && (timeSlot.includes('7:00 PM') || timeSlot.includes('8:00 PM') || timeSlot.includes('9:00 PM'));
          return true;
        })
      );
    
    return matchesSpecialty && matchesAvailability;
  });

  const handleCounselorConnect = (counselorId: string) => {
    const counselor = mockCounselors.find(c => c.id === counselorId);
    if (counselor) {
      setSelectedCounselor(counselor);
      setShowRequestDialog(true);
    }
  };

  const handleConnectionSubmit = () => {
    if (selectedCounselor && connectionRequest.reason) {
      setConnectedCounselors(prev => [...prev, selectedCounselor.id]);
      setShowRequestDialog(false);
      setShowSuccessAlert(true);
      setConnectionRequest({ reason: '', message: '' });
      setSelectedCounselor(null);
      
      // Hide success alert after 3 seconds
      setTimeout(() => setShowSuccessAlert(false), 3000);
    }
  };

  const resetCounselorFilters = () => {
    setCounselorFilters({
      specialty: 'All',
      availability: 'Any'
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
            <TabsTrigger value="peer-support" className="flex items-center gap-2">
              <HandHeart className="h-4 w-4" />
              Peer Support
            </TabsTrigger>
            <TabsTrigger value="connections">My Connections</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
          </div>
        </div>

        <TabsContent value="discover" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Major</label>
                  <Select value={filters.major} onValueChange={(value) => setFilters(prev => ({...prev, major: value}))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {majors.map(major => (
                        <SelectItem key={major} value={major}>{major}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Year</label>
                  <Select value={filters.year} onValueChange={(value) => setFilters(prev => ({...prev, year: value}))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map(year => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <Input 
                    placeholder="e.g. Dorm Block A"
                    value={filters.location}
                    onChange={(e) => setFilters(prev => ({...prev, location: e.target.value}))}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Interests</label>
                  <div className="flex flex-wrap gap-2">
                    {interests.map(interest => (
                      <Badge
                        key={interest}
                        variant={filters.interests.includes(interest) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleInterestToggle(interest)}
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Languages</label>
                  <div className="space-y-2">
                    {languages.map(language => (
                      <div key={language} className="flex items-center space-x-2">
                        <Checkbox
                          id={language}
                          checked={filters.languages.includes(language)}
                          onCheckedChange={() => handleLanguageToggle(language)}
                        />
                        <label htmlFor={language} className="text-sm">{language}</label>
                      </div>
                    ))}
                  </div>
                </div>



                <Button variant="outline" onClick={resetFilters} className="w-full">
                  Reset Filters
                </Button>
              </CardContent>
            </Card>

            {/* Students Grid */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Found {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''}
                </p>
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Most Relevant</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="recent">Recently Joined</SelectItem>
                    <SelectItem value="online">Online First</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredStudents.map(student => (
                  <StudentCard
                    key={student.id}
                    student={student}
                    variant="compact"
                    onConnect={handleConnect}
                    onMessage={handleMessage}
                    showMutuals={true}
                    actionButton={connectedStudents.includes(student.id) ? 'message' : 'both'}
                  />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-6">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-600" />
                <p>
                  <strong>AI-Powered Suggestions:</strong> These recommendations are based on your shared courses, 
                  mutual friends, similar interests, and campus activity patterns.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Top Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-yellow-500" />
                Top Matches for You
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aiSuggestions.map(student => (
                  <StudentCard
                    key={student.id}
                    student={student}
                    variant="suggestion"
                    onConnect={handleConnect}
                    onMessage={handleMessage}
                    showMutuals={true}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Suggestion Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Same Major & Year
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockStudents.filter(s => s.major === 'Computer Science' && s.year === '3rd Year').slice(0, 2).map(student => (
                    <div key={student.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm ${
                        student.name.charCodeAt(0) % 2 === 0 ? 'bg-blue-500' : 'bg-green-500'
                      }`}>
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.major}</p>
                      </div>
                      <Button size="sm" variant="outline">Connect</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Similar Interests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockStudents.filter(s => s.interests.includes('coding')).slice(0, 2).map(student => (
                    <div key={student.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm ${
                        student.name.charCodeAt(0) % 2 === 0 ? 'bg-purple-500' : 'bg-orange-500'
                      }`}>
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{student.name}</p>
                        <div className="flex gap-1 mt-1">
                          {student.interests.slice(0, 2).map((interest, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">{interest}</Badge>
                          ))}
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Connect</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Insights */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-green-600" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>• <strong>Peak Activity:</strong> Most students in your major are online between 2-4 PM</p>
                <p>• <strong>Study Groups:</strong> 73% of CS students prefer collaborative learning</p>
                <p>��� <strong>Common Interests:</strong> Photography and coding often go together in your network</p>
                <p>• <strong>Language Match:</strong> You might connect well with Mandarin speakers based on your profile</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="peer-support" className="space-y-6">
          {/* Success Alert */}
          {showSuccessAlert && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Your connection request has been sent to {selectedCounselor?.name}. They will respond soon.
              </AlertDescription>
            </Alert>
          )}

          {/* Header Section */}
          <div className="text-center space-y-3 p-6 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-100">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mb-2">
              <HandHeart className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-campus-navy">
              Find Peer Support
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with verified student counselors for confidential support and guidance. 
              All counselors are trained peers who understand campus life and student challenges.
            </p>
            <Badge className="bg-teal-100 text-teal-800 border-teal-200">
              <Shield className="h-3 w-3 mr-1" />
              Confidential & Safe
            </Badge>
          </div>

          {/* Filters */}
          <Card className="border-teal-200 bg-white campus-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-campus-navy">
                <Filter className="h-5 w-5 text-teal-600" />
                Find the Right Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-end gap-4">
                <div className="flex-1 min-w-48">
                  <label className="text-sm font-medium mb-2 block text-campus-navy">Specialty</label>
                  <Select 
                    value={counselorFilters.specialty} 
                    onValueChange={(value) => setCounselorFilters(prev => ({...prev, specialty: value}))}
                  >
                    <SelectTrigger className="border-teal-200 focus:ring-teal-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {counselorSpecialties.map(specialty => (
                        <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex-1 min-w-40">
                  <label className="text-sm font-medium mb-2 block text-campus-navy">Availability</label>
                  <Select 
                    value={counselorFilters.availability} 
                    onValueChange={(value) => setCounselorFilters(prev => ({...prev, availability: value}))}
                  >
                    <SelectTrigger className="border-teal-200 focus:ring-teal-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {availabilityOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={resetCounselorFilters} variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-50">
                    Reset Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* My Support Connections */}
          {connectedCounselors.length > 0 && (
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Users className="h-5 w-5" />
                  My Support Connections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {mockCounselors
                    .filter(counselor => connectedCounselors.includes(counselor.id))
                    .map(counselor => (
                      <div key={counselor.id} className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                        <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {counselor.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{counselor.name}</p>
                          <p className="text-xs text-muted-foreground">{counselor.major}</p>
                        </div>
                        <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Start Chat
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Counselor Listings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Found {filteredCounselors.length} verified counselor{filteredCounselors.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCounselors.map(counselor => (
                <Card key={counselor.id} className="border-teal-100 hover:border-teal-200 transition-colors hover-lift">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-medium">
                          {counselor.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-campus-navy">{counselor.name}</h4>
                            {counselor.verified && (
                              <Badge className="bg-teal-100 text-teal-800 border-teal-200 text-xs px-2 py-0.5">
                                <Shield className="h-3 w-3 mr-1" />
                                Verified Counselor
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{counselor.major} • {counselor.year}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{counselor.rating}</span>
                            </div>
                            <div className={`w-2 h-2 rounded-full ${counselor.isOnline ? 'bg-green-500' : 'bg-gray-300'}`} />
                            <span className="text-xs text-muted-foreground">
                              {counselor.isOnline ? 'Online' : 'Offline'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-sm text-muted-foreground leading-relaxed">{counselor.bio}</p>

                      {/* Specialties */}
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-2 block">SPECIALTIES</label>
                        <div className="flex flex-wrap gap-1">
                          {counselor.specialties.slice(0, 3).map((specialty, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs bg-teal-50 text-teal-700 border-teal-200">
                              {specialty}
                            </Badge>
                          ))}
                          {counselor.specialties.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{counselor.specialties.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Availability */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{counselor.responseTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{Object.keys(counselor.weeklyAvailability).length} days/week</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Dialog open={showRequestDialog && selectedCounselor?.id === counselor.id} onOpenChange={(open) => {
                        if (!open) {
                          setShowRequestDialog(false);
                          setSelectedCounselor(null);
                          setConnectionRequest({ reason: '', message: '' });
                        }
                      }}>
                        <DialogTrigger asChild>
                          <Button 
                            className="w-full bg-teal-600 hover:bg-teal-700"
                            onClick={() => {
                              setSelectedCounselor(counselor);
                              setShowRequestDialog(true);
                            }}
                            disabled={connectedCounselors.includes(counselor.id)}
                          >
                            {connectedCounselors.includes(counselor.id) ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Connected
                              </>
                            ) : (
                              <>
                                <User className="h-4 w-4 mr-2" />
                                View Profile & Connect
                              </>
                            )}
                          </Button>
                        </DialogTrigger>
                        
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-medium">
                                {selectedCounselor?.name.split(' ').map(n => n[0]).join('') || 'CC'}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span>{selectedCounselor?.name}</span>
                                  {selectedCounselor?.verified && (
                                    <Badge className="bg-teal-100 text-teal-800 border-teal-200">
                                      <Shield className="h-3 w-3 mr-1" />
                                      Verified Counselor
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground font-normal">
                                  {selectedCounselor?.major} • {selectedCounselor?.year}
                                </p>
                              </div>
                            </DialogTitle>
                            <DialogDescription>
                              View detailed profile information and connect with this verified peer counselor for confidential support and guidance.
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-6 pt-4">
                            {selectedCounselor && (
                              <>
                                {/* Rating and Stats */}
                                <div className="grid grid-cols-3 gap-4 p-4 bg-teal-50 rounded-lg">
                                  <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 mb-1">
                                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                      <span className="font-semibold">{selectedCounselor.rating}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">Rating</p>
                                  </div>
                                  <div className="text-center">
                                    <p className="font-semibold">{selectedCounselor.totalSessions}</p>
                                    <p className="text-xs text-muted-foreground">Sessions</p>
                                  </div>
                                  <div className="text-center">
                                    <p className="font-semibold">{selectedCounselor.responseTime.split(' ')[3]}</p>
                                    <p className="text-xs text-muted-foreground">Response Time</p>
                                  </div>
                                </div>

                                {/* About & Approach */}
                                <div>
                                  <h4 className="font-medium mb-2">About Me & Approach</h4>
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {selectedCounselor.aboutApproach}
                                  </p>
                                </div>

                                {/* Specialties */}
                                <div>
                                  <h4 className="font-medium mb-2">Support Specialties</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {selectedCounselor.specialties.map((specialty, idx) => (
                                      <Badge key={idx} variant="secondary" className="bg-teal-50 text-teal-700 border-teal-200">
                                        {specialty}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                {/* Weekly Availability */}
                                <div>
                                  <h4 className="font-medium mb-2">Weekly Availability</h4>
                                  <div className="grid grid-cols-1 gap-2">
                                    {Object.entries(selectedCounselor.weeklyAvailability).map(([day, times]) => (
                                      <div key={day} className="flex justify-between p-2 bg-gray-50 rounded">
                                        <span className="font-medium text-sm">{day}</span>
                                        <span className="text-sm text-muted-foreground">
                                          {times.join(', ')}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Preferred Contact */}
                                <div>
                                  <h4 className="font-medium mb-2">Preferred Contact Method</h4>
                                  <div className="flex gap-2">
                                    {selectedCounselor.preferredContact.map((method, idx) => (
                                      <Badge key={idx} variant="outline" className="flex items-center gap-1">
                                        {method.includes('Video') && <Video className="h-3 w-3" />}
                                        {method.includes('Phone') && <Phone className="h-3 w-3" />}
                                        {method.includes('Chat') && <MessageSquare className="h-3 w-3" />}
                                        {method}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                {/* Connection Form */}
                                {!connectedCounselors.includes(selectedCounselor.id) && (
                                  <div className="space-y-4 pt-4 border-t">
                                    <h4 className="font-medium">Request to Connect</h4>
                                    
                                    <div>
                                      <label className="text-sm font-medium mb-2 block">
                                        Reason for Connection <span className="text-red-500">*</span>
                                      </label>
                                      <Select
                                        value={connectionRequest.reason}
                                        onValueChange={(value) => setConnectionRequest(prev => ({...prev, reason: value}))}
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select a reason..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {connectionReasons.map(reason => (
                                            <SelectItem key={reason} value={reason}>{reason}</SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>

                                    <div>
                                      <label className="text-sm font-medium mb-2 block">
                                        Additional Message (Optional)
                                      </label>
                                      <Textarea
                                        placeholder="Share any specific details about what you're looking for help with..."
                                        value={connectionRequest.message}
                                        onChange={(e) => setConnectionRequest(prev => ({...prev, message: e.target.value}))}
                                        rows={3}
                                      />
                                    </div>

                                    <div className="p-3 bg-blue-50 rounded-lg">
                                      <p className="text-sm text-blue-800 flex items-center gap-2">
                                        <Shield className="h-4 w-4" />
                                        This request and any subsequent conversations are confidential.
                                      </p>
                                    </div>

                                    <div className="flex gap-2">
                                      <Button 
                                        onClick={handleConnectionSubmit}
                                        disabled={!connectionRequest.reason}
                                        className="bg-teal-600 hover:bg-teal-700 flex-1"
                                      >
                                        Send Request
                                      </Button>
                                      <Button 
                                        variant="outline" 
                                        onClick={() => {
                                          setShowRequestDialog(false);
                                          setSelectedCounselor(null);
                                          setConnectionRequest({ reason: '', message: '' });
                                        }}
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="connections" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3>My Connections</h3>
              <p className="text-muted-foreground">Students you've connected with</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{connectedStudents.length} connections</Badge>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-1" />
                Privacy Settings
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockStudents
              .filter(student => connectedStudents.includes(student.id))
              .map(student => (
                <StudentCard
                  key={student.id}
                  student={student}
                  variant="compact"
                  onMessage={handleMessage}
                  actionButton="message"
                  showMutuals={false}
                />
              ))}
          </div>

          {connectedStudents.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h4>No connections yet</h4>
                <p className="text-muted-foreground mb-4">
                  Start connecting with fellow students to build your network!
                </p>
                <Button onClick={() => setActiveTab('discover')}>
                  Discover Students
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}