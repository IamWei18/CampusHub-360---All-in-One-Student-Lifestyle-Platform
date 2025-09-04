import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { ResumeGenerator } from './ResumeGenerator'
import { StudentClubCard } from './StudentClubCard'
import { 
  GraduationCap, 
  Calendar, 
  User, 
  DollarSign, 
  BookOpen, 
  FileText,
  Clock,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Building,
  TrendingUp,
  X,
  CreditCard,
  Play,
  Download,
  BarChart3,
  Users,
  Search,
  Mic,
  RotateCcw,
  GraduationCapIcon,
  Brain,
  Target,
  Zap
} from 'lucide-react'

const quickActions = [
  {
    title: 'Enrollment',
    description: 'Course registration and enrollment status',
    icon: GraduationCap,
    status: 'active',
    link: '/enrollment'
  },
  {
    title: 'Class Timetable',
    description: 'View and manage your class schedule',
    icon: Calendar,
    status: 'active',
    link: '/timetable'
  },
  {
    title: 'Lecturer Profiles',
    description: 'Browse lecturer information and subjects',
    icon: User,
    status: 'active',
    link: '/lecturers'
  },
  {
    title: 'Fee Payment',
    description: 'Pay tuition fees and view payment history',
    icon: DollarSign,
    status: 'urgent',
    link: '/finance/payment'
  },
  {
    title: 'Academic Records',
    description: 'Transcripts, grades, and academic history',
    icon: FileText,
    status: 'active',
    link: '/records'
  },
  {
    title: 'Library Services',
    description: 'Book reservations and digital resources',
    icon: BookOpen,
    status: 'active',
    link: '/library'
  }
]

const studentInfo = {
  name: 'Alex Chen',
  id: 'S2024001',
  program: 'Computer Science',
  year: '3rd Year',
  gpa: 3.75,
  creditsCompleted: 78,
  creditsRequired: 120,
  semester: 'Fall 2024',
  profileImage: '/api/placeholder/150/150' // Placeholder for profile image
}

// Current semester data with progress tracking
const currentSemester = {
  semester: 'Fall 2024',
  startDate: '2024-09-01',
  endDate: '2024-12-15',
  currentWeek: 12,
  totalWeeks: 16,
  courses: [
    { 
      id: 'CS401',
      name: 'Advanced Algorithms',
      credits: 4,
      instructor: 'Dr. Sarah Johnson',
      weeklyProgress: 12,
      totalWeeks: 16,
      hasRecording: true,
      hasSyllabus: true,
      assessments: [
        { type: 'Quiz', name: 'Sorting Algorithms', score: 95, maxScore: 100, date: '2024-10-15' },
        { type: 'Lab', name: 'Graph Implementation', score: 88, maxScore: 100, date: '2024-11-01' },
        { type: 'Midterm', name: 'Data Structures & Algorithms', score: 92, maxScore: 100, date: '2024-11-15' }
      ]
    },
    { 
      id: 'CS402',
      name: 'Database Systems',
      credits: 4,
      instructor: 'Prof. Michael Chen',
      weeklyProgress: 11,
      totalWeeks: 16,
      hasRecording: true,
      hasSyllabus: true,
      assessments: [
        { type: 'Quiz', name: 'SQL Fundamentals', score: 89, maxScore: 100, date: '2024-10-08' },
        { type: 'Lab', name: 'Database Design', score: 94, maxScore: 100, date: '2024-10-22' },
        { type: 'Test', name: 'Normalization & Indexing', score: 87, maxScore: 100, date: '2024-11-12' }
      ]
    },
    { 
      id: 'CS403',
      name: 'Computer Networks',
      credits: 4,
      instructor: 'Dr. Emily Rodriguez',
      weeklyProgress: 12,
      totalWeeks: 16,
      hasRecording: false,
      hasSyllabus: true,
      assessments: [
        { type: 'Quiz', name: 'TCP/IP Protocols', score: 82, maxScore: 100, date: '2024-10-10' },
        { type: 'Lab', name: 'Network Simulation', score: 91, maxScore: 100, date: '2024-11-05' }
      ]
    },
    { 
      id: 'CS404',
      name: 'Software Engineering',
      credits: 4,
      instructor: 'Dr. James Wilson',
      weeklyProgress: 13,
      totalWeeks: 16,
      hasRecording: true,
      hasSyllabus: true,
      assessments: [
        { type: 'Quiz', name: 'Agile Methodologies', score: 96, maxScore: 100, date: '2024-10-12' },
        { type: 'Project', name: 'Team Development Project', score: 93, maxScore: 100, date: '2024-11-08' }
      ]
    },
    { 
      id: 'CS405',
      name: 'Ethics in Computing',
      credits: 2,
      instructor: 'Prof. Lisa Anderson',
      weeklyProgress: 12,
      totalWeeks: 16,
      hasRecording: false,
      hasSyllabus: true,
      assessments: [
        { type: 'Essay', name: 'AI Ethics Analysis', score: 91, maxScore: 100, date: '2024-10-20' },
        { type: 'Quiz', name: 'Privacy & Security', score: 88, maxScore: 100, date: '2024-11-01' }
      ]
    }
  ]
}

const gpaHistory = [
  {
    semester: 'Fall 2024',
    gpa: 3.75,
    cgpa: 3.75,
    credits: 18,
    courses: [
      { name: 'Advanced Algorithms', grade: 'A', credits: 4 },
      { name: 'Database Systems', grade: 'A-', credits: 4 },
      { name: 'Computer Networks', grade: 'B+', credits: 4 },
      { name: 'Software Engineering', grade: 'A', credits: 4 },
      { name: 'Ethics in Computing', grade: 'A-', credits: 2 }
    ]
  },
  {
    semester: 'Spring 2024',
    gpa: 3.72,
    cgpa: 3.73,
    credits: 17,
    courses: [
      { name: 'Operating Systems', grade: 'A-', credits: 4 },
      { name: 'Machine Learning', grade: 'B+', credits: 4 },
      { name: 'Web Development', grade: 'A', credits: 4 },
      { name: 'Data Structures', grade: 'A', credits: 4 },
      { name: 'Technical Writing', grade: 'B+', credits: 1 }
    ]
  },
  {
    semester: 'Fall 2023',
    gpa: 3.68,
    cgpa: 3.71,
    credits: 18,
    courses: [
      { name: 'Object-Oriented Programming', grade: 'A', credits: 4 },
      { name: 'Computer Architecture', grade: 'B+', credits: 4 },
      { name: 'Linear Algebra', grade: 'B+', credits: 4 },
      { name: 'Statistics', grade: 'A-', credits: 3 },
      { name: 'Digital Logic', grade: 'A-', credits: 3 }
    ]
  },
  {
    semester: 'Spring 2023',
    gpa: 3.65,
    cgpa: 3.69,
    credits: 16,
    courses: [
      { name: 'Programming Fundamentals II', grade: 'A', credits: 4 },
      { name: 'Discrete Mathematics', grade: 'B+', credits: 4 },
      { name: 'Physics II', grade: 'B', credits: 4 },
      { name: 'Calculus II', grade: 'A-', credits: 4 }
    ]
  },
  {
    semester: 'Fall 2022',
    gpa: 3.71,
    cgpa: 3.68,
    credits: 15,
    courses: [
      { name: 'Programming Fundamentals I', grade: 'A', credits: 4 },
      { name: 'Calculus I', grade: 'A-', credits: 4 },
      { name: 'Physics I', grade: 'B+', credits: 4 },
      { name: 'English Composition', grade: 'A-', credits: 3 }
    ]
  }
]

const recentActivities = [
  {
    title: 'Assignment submitted',
    description: 'Data Structures Assignment 3',
    time: '2 hours ago',
    type: 'success'
  },
  {
    title: 'Fee payment reminder',
    description: 'Spring semester fees due March 15',
    time: '1 day ago',
    type: 'warning'
  },
  {
    title: 'New course material',
    description: 'Algorithm Analysis - Lecture 8 slides available',
    time: '2 days ago',
    type: 'info'
  },
  {
    title: 'Enrollment window opens',
    description: 'Summer 2025 course registration begins',
    time: '3 days ago',
    type: 'info'
  }
]

const upcomingDeadlines = [
  {
    title: 'Tuition Fee Payment',
    date: 'March 15, 2024',
    daysLeft: 12,
    type: 'payment'
  },
  {
    title: 'Project Submission',
    date: 'March 20, 2024',
    daysLeft: 17,
    type: 'assignment'
  },
  {
    title: 'Course Registration',
    date: 'April 1, 2024',
    daysLeft: 29,
    type: 'registration'
  }
]

export function CampusManagement() {
  const [isGpaModalOpen, setIsGpaModalOpen] = useState(false)
  const [showStudentCard, setShowStudentCard] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showCourseDetails, setShowCourseDetails] = useState(false)
  const [showAIRecordingSearch, setShowAIRecordingSearch] = useState(false)
  const [recordingSearchQuery, setRecordingSearchQuery] = useState('')
  const [showRetakeTest, setShowRetakeTest] = useState(false)
  const [selectedAssessment, setSelectedAssessment] = useState(null)
  const [showTutorRecommendations, setShowTutorRecommendations] = useState(false)
  const [showPracticalTest, setShowPracticalTest] = useState(false)
  const progressPercentage = (studentInfo.creditsCompleted / studentInfo.creditsRequired) * 100
  const semesterProgress = (currentSemester.currentWeek / currentSemester.totalWeeks) * 100

  const getGradePoints = (grade: string) => {
    const gradeMap: { [key: string]: number } = {
      'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 
      'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0.0
    }
    return gradeMap[grade] || 0.0
  }

  // Mock recording search results
  const searchRecordings = (query: string) => {
    const recordings = [
      { title: 'Sorting Algorithms Deep Dive', timestamp: '15:30', description: 'Covers QuickSort, MergeSort, and HeapSort implementations' },
      { title: 'Graph Algorithms Introduction', timestamp: '22:45', description: 'BFS, DFS, and shortest path algorithms' },
      { title: 'Dynamic Programming Fundamentals', timestamp: '8:15', description: 'Memoization and tabulation techniques' },
      { title: 'Algorithm Complexity Analysis', timestamp: '35:20', description: 'Big O notation and time complexity' }
    ]
    return recordings.filter(recording => 
      recording.title.toLowerCase().includes(query.toLowerCase()) ||
      recording.description.toLowerCase().includes(query.toLowerCase())
    )
  }

  // Mock tutor recommendations based on CGPA
  const getTutorRecommendations = (cgpa: number) => {
    if (cgpa >= 3.5) {
      return [
        { type: 'Advanced Study Group', title: 'Research Methodology Workshop', time: 'Fridays 2-4 PM', spots: 3 },
        { type: 'Peer Tutoring', title: 'Advanced Algorithm Design', time: 'Wednesdays 6-8 PM', spots: 5 }
      ]
    } else if (cgpa >= 3.0) {
      return [
        { type: 'Study Enhancement', title: 'Core Concepts Review', time: 'Tuesdays 4-6 PM', spots: 8 },
        { type: 'Practical Sessions', title: 'Coding Practice Labs', time: 'Saturdays 10-12 PM', spots: 12 }
      ]
    } else {
      return [
        { type: 'Academic Support', title: 'Fundamentals Strengthening', time: 'Daily 3-5 PM', spots: 15 },
        { type: 'One-on-One', title: 'Personal Tutoring Sessions', time: 'Flexible Schedule', spots: 10 },
        { type: 'Study Skills', title: 'Learning Strategies Workshop', time: 'Mondays 5-7 PM', spots: 20 }
      ]
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      {/* Welcome Header */}
      <div className="text-center py-8 px-6 lg:py-12 lg:px-8 lg:bg-none rounded-2xl lg:rounded-none campus-shadow-lg lg:shadow-none text-campus-navy lg:text-white relative overflow-hidden">
        {/* Gradient overlay (desktop only) */}
        <div className="absolute inset-0 lg:bg-gradient-to-r lg:from-campus-navy lg:via-campus-navy-light lg:to-campus-navy"></div>
        <div className="absolute inset-0 lg:bg-gradient-to-r lg:from-campus-gold/10 lg:via-transparent lg:to-campus-orange/10"></div>
        
        <div className="relative z-10">
          {/* Profile Photo and Name */}
          <div className="flex flex-col items-center mb-4">
            <Avatar className="w-20 h-20 mb-4 ring-4 ring-white/20">
              <AvatarImage src={studentInfo.profileImage} alt={studentInfo.name} />
              <AvatarFallback className="bg-campus-gold text-campus-navy text-xl font-bold">
                {studentInfo.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            {/* Title - Navy on mobile, White on desktop */}
            <h2 className="text-3xl lg:text-4xl font-bold font-['Poppins'] mb-2">
              Welcome Back, {studentInfo.name}!
            </h2>
          </div>
          
          {/* Subtitle - Navy on mobile, Light blue on desktop */}
          <p className="text-lg lg:text-xl text-campus-navy/90 lg:text-blue-100">
            Your academic hub awaits • {studentInfo.semester}
          </p>
          
          {/* Program badge - Navy on mobile, Gold on desktop */}
          <div className="mt-4 lg:mt-6 flex justify-center">
            <div className="bg-campus-gold/20 px-4 py-2 rounded-full">
              <span className="font-semibold text-campus-navy lg:text-campus-gold">
                🎓 {studentInfo.program}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Student Card Modal */}
      {showStudentCard && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex justify-end mb-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowStudentCard(false)}
                className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <StudentClubCard isPreview={true} />
            <Button 
              onClick={() => setShowStudentCard(false)}
              className="w-full mt-4"
              variant="outline"
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Student Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 campus-shadow hover-lift bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-xl">
            <CardTitle className="flex items-center gap-3 text-campus-navy">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <User className="h-5 w-5 text-white" />
              </div>
              Student Profile Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-campus-gold/10 to-campus-orange/10 rounded-xl border border-campus-gold/20">              
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16 ring-2 ring-campus-gold/30">
                  <AvatarImage src={studentInfo.profileImage} alt={studentInfo.name} />
                  <AvatarFallback className="bg-campus-gold text-campus-navy font-bold">
                    {studentInfo.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold text-campus-navy font-['Poppins']">{studentInfo.name}</h3>
                  <p className="text-muted-foreground font-semibold">{studentInfo.id} • {studentInfo.program}</p>
                  <Button
                    onClick={() => setShowStudentCard(true)}
                    variant="outline"
                    size="sm"
                    className="mt-2 bg-white hover:bg-gray-50 border-campus-navy/20 text-campus-navy hover:text-campus-navy"
                  >
                    <CreditCard className="h-3 w-3 mr-1" />
                    View Student Card
                  </Button>
                </div>
              </div>
              <Badge className="text-campus-navy px-3 py-1 bg-white border border-campus-navy/20">
                {studentInfo.year}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <Dialog open={isGpaModalOpen} onOpenChange={setIsGpaModalOpen}>
                <DialogTrigger asChild>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 cursor-pointer hover:bg-gradient-to-br hover:from-green-100 hover:to-emerald-100 hover:border-green-300 transition-all duration-300 hover:scale-105 group">
                    <p className="text-sm text-muted-foreground mb-1">Current CGPA</p>
                    <p className="text-3xl font-bold text-green-600 group-hover:text-green-700">{studentInfo.gpa}</p>
                    <div className="mt-2 w-full bg-green-200 rounded-full h-1">
                      <div className="bg-green-500 h-1 rounded-full" style={{width: `${(studentInfo.gpa / 4) * 100}%`}}></div>
                    </div>
                    <div className="flex items-center justify-center gap-1 mt-2 text-xs text-green-600 group-hover:text-green-700">
                      <TrendingUp className="h-3 w-3" />
                      <span>View History</span>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <DialogTitle className="flex items-center gap-3 text-campus-navy">
                          <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                            <TrendingUp className="h-5 w-5 text-white" />
                          </div>
                          Academic Performance History
                        </DialogTitle>
                        <DialogDescription>
                          View detailed semester-wise academic performance and grade history
                        </DialogDescription>
                      </div>
                      <ResumeGenerator studentData={studentInfo} gpaHistory={gpaHistory} />
                    </div>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    {/* Overall CGPA Trend */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                      <h3 className="text-lg font-semibold text-campus-navy mb-4">CGPA Progression</h3>
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Starting CGPA</p>
                          <p className="text-2xl font-bold text-green-600">{gpaHistory[gpaHistory.length - 1].cgpa}</p>
                        </div>
                        <div className="flex-1 mx-6">
                          <div className="h-2 bg-green-200 rounded-full relative">
                            <div 
                              className="h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000"
                              style={{width: `${((studentInfo.gpa - gpaHistory[gpaHistory.length - 1].cgpa) / (4.0 - gpaHistory[gpaHistory.length - 1].cgpa)) * 100}%`}}
                            ></div>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Current CGPA</p>
                          <p className="text-2xl font-bold text-green-600">{studentInfo.gpa}</p>
                        </div>
                      </div>
                    </div>

                    {/* Current Semester Progress */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-campus-navy">Current Semester Progress</h3>
                        <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                          {currentSemester.semester}
                        </Badge>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-campus-navy">Semester Progress</span>
                          <span className="text-sm font-bold text-blue-600">
                            Week {currentSemester.currentWeek} of {currentSemester.totalWeeks}
                          </span>
                        </div>
                        <Progress 
                          value={semesterProgress} 
                          className="h-3 bg-blue-100 [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-indigo-500" 
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          {Math.round(semesterProgress)}% complete • {currentSemester.totalWeeks - currentSemester.currentWeek} weeks remaining
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {currentSemester.courses.map((course) => {
                          const courseProgress = (course.weeklyProgress / course.totalWeeks) * 100;
                          const avgScore = course.assessments.length > 0 
                            ? course.assessments.reduce((sum, assessment) => sum + (assessment.score / assessment.maxScore * 100), 0) / course.assessments.length 
                            : 0;
                          
                          return (
                            <div 
                              key={course.id} 
                              className="p-4 bg-white rounded-lg border border-blue-200 hover:border-blue-300 transition-all duration-300 cursor-pointer hover:shadow-md"
                              onClick={() => {
                                setSelectedCourse(course);
                                setShowCourseDetails(true);
                              }}
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-campus-navy truncate">{course.name}</h4>
                                  <p className="text-xs text-muted-foreground">{course.instructor} • {course.credits} credits</p>
                                </div>
                                <div className="flex items-center gap-1 ml-2">
                                  {course.hasRecording && (
                                    <Badge variant="outline" className="text-xs px-1 py-0 bg-green-50 text-green-600 border-green-200">
                                      <Play className="h-3 w-3 mr-1" />
                                      Rec
                                    </Badge>
                                  )}
                                  {course.hasSyllabus && (
                                    <Badge variant="outline" className="text-xs px-1 py-0 bg-blue-50 text-blue-600 border-blue-200">
                                      <Download className="h-3 w-3 mr-1" />
                                      Syl
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-xs font-medium text-campus-navy">Learning Progress</span>
                                  <span className="text-xs font-bold text-green-600">{Math.round(courseProgress)}%</span>
                                </div>
                                <Progress 
                                  value={courseProgress} 
                                  className="h-1.5 bg-gray-200 [&>div]:bg-gradient-to-r [&>div]:from-green-400 [&>div]:to-green-600" 
                                />
                                
                                <div className="flex justify-between items-center">
                                  <span className="text-xs font-medium text-campus-navy">Average Score</span>
                                  <span className="text-xs font-bold text-purple-600">{Math.round(avgScore)}%</span>
                                </div>
                                <Progress 
                                  value={avgScore} 
                                  className="h-1.5 bg-gray-200 [&>div]:bg-gradient-to-r [&>div]:from-purple-400 [&>div]:to-purple-600" 
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Semester-wise Performance */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-campus-navy">Past Semester Performance</h3>
                      {gpaHistory.map((semester, index) => (
                        <Card key={index} className="bg-white border border-gray-200 hover:border-green-300 transition-all duration-300">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg text-campus-navy">{semester.semester}</CardTitle>
                              <div className="flex items-center gap-4">
                                <div className="text-center">
                                  <p className="text-xs text-muted-foreground">Semester GPA</p>
                                  <p className="text-lg font-bold text-blue-600">{semester.gpa}</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-xs text-muted-foreground">Cumulative GPA</p>
                                  <p className="text-lg font-bold text-green-600">{semester.cgpa}</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-xs text-muted-foreground">Credits</p>
                                  <p className="text-lg font-bold text-purple-600">{semester.credits}</p>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {semester.courses.map((course, courseIndex) => (
                                <div key={courseIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-campus-navy truncate">{course.name}</p>
                                    <p className="text-xs text-muted-foreground">{course.credits} credits</p>
                                  </div>
                                  <Badge 
                                    className={`ml-2 ${
                                      getGradePoints(course.grade) >= 3.7 ? 'bg-green-500' :
                                      getGradePoints(course.grade) >= 3.0 ? 'bg-blue-500' :
                                      getGradePoints(course.grade) >= 2.0 ? 'bg-orange-500' : 'bg-red-500'
                                    } text-white`}
                                  >
                                    {course.grade}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Course Details Modal */}
              <Dialog open={showCourseDetails} onOpenChange={setShowCourseDetails}>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-3 text-campus-navy">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                        <BookOpen className="h-5 w-5 text-white" />
                      </div>
                      {selectedCourse?.name || 'Course Details'}
                    </DialogTitle>
                    <DialogDescription>
                      {selectedCourse?.instructor} • {selectedCourse?.credits} Credits • {selectedCourse?.id}
                    </DialogDescription>
                  </DialogHeader>
                  
                  {selectedCourse && (
                    <div className="space-y-6 py-4">
                      {/* Course Progress Overview */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                          <h4 className="font-semibold text-campus-navy mb-3 flex items-center gap-2">
                            <BarChart3 className="h-4 w-4" />
                            Learning Progress
                          </h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Week {selectedCourse.weeklyProgress} of {selectedCourse.totalWeeks}</span>
                              <span className="text-sm font-bold text-green-600">
                                {Math.round((selectedCourse.weeklyProgress / selectedCourse.totalWeeks) * 100)}%
                              </span>
                            </div>
                            <Progress 
                              value={(selectedCourse.weeklyProgress / selectedCourse.totalWeeks) * 100} 
                              className="h-3 bg-green-100 [&>div]:bg-gradient-to-r [&>div]:from-green-500 [&>div]:to-emerald-500" 
                            />
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                          <h4 className="font-semibold text-campus-navy mb-3 flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" />
                            Assessment Average
                          </h4>
                          <div className="space-y-2">
                            {(() => {
                              const avgScore = selectedCourse.assessments.length > 0 
                                ? selectedCourse.assessments.reduce((sum, assessment) => sum + (assessment.score / assessment.maxScore * 100), 0) / selectedCourse.assessments.length 
                                : 0;
                              return (
                                <>
                                  <div className="flex justify-between">
                                    <span className="text-sm">{selectedCourse.assessments.length} Assessments</span>
                                    <span className="text-sm font-bold text-purple-600">
                                      {Math.round(avgScore)}%
                                    </span>
                                  </div>
                                  <Progress 
                                    value={avgScore} 
                                    className="h-3 bg-purple-100 [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-pink-500" 
                                  />
                                </>
                              );
                            })()}
                          </div>
                        </div>
                      </div>

                      {/* Course Resources */}
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                        <h4 className="font-semibold text-campus-navy mb-3">Course Resources</h4>
                        <div className="flex flex-wrap gap-3">
                          {selectedCourse.hasRecording && (
                            <Button 
                              variant="outline" 
                              onClick={() => setShowAIRecordingSearch(true)}
                              className="flex items-center gap-2 bg-white hover:bg-green-50 border-green-200 text-green-700 hover:text-green-800"
                            >
                              <Play className="h-4 w-4" />
                              AI Recording Search
                            </Button>
                          )}
                          {selectedCourse.hasSyllabus && (
                            <Button 
                              variant="outline" 
                              className="flex items-center gap-2 bg-white hover:bg-blue-50 border-blue-200 text-blue-700 hover:text-blue-800"
                            >
                              <Download className="h-4 w-4" />
                              Download Syllabus
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            className="flex items-center gap-2 bg-white hover:bg-purple-50 border-purple-200 text-purple-700 hover:text-purple-800"
                          >
                            <Users className="h-4 w-4" />
                            Class Discussion
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => setShowTutorRecommendations(true)}
                            className="flex items-center gap-2 bg-white hover:bg-orange-50 border-orange-200 text-orange-700 hover:text-orange-800"
                          >
                            <GraduationCapIcon className="h-4 w-4" />
                            Get Tutor Help
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => setShowPracticalTest(true)}
                            className="flex items-center gap-2 bg-white hover:bg-indigo-50 border-indigo-200 text-indigo-700 hover:text-indigo-800"
                          >
                            <Target className="h-4 w-4" />
                            Practice Test
                          </Button>
                        </div>
                      </div>

                      {/* Assessment Results */}
                      <div>
                        <h4 className="font-semibold text-campus-navy mb-4">Test & Lab Results</h4>
                        <div className="space-y-3">
                          {selectedCourse.assessments.map((assessment, index) => {
                            const percentage = (assessment.score / assessment.maxScore) * 100;
                            return (
                              <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-3">
                                    <Badge 
                                      className={`${
                                        assessment.type === 'Quiz' ? 'bg-blue-500' :
                                        assessment.type === 'Lab' ? 'bg-green-500' :
                                        assessment.type === 'Test' || assessment.type === 'Midterm' ? 'bg-orange-500' :
                                        assessment.type === 'Project' ? 'bg-purple-500' :
                                        'bg-gray-500'
                                      } text-white`}
                                    >
                                      {assessment.type}
                                    </Badge>
                                    <h5 className="font-medium text-campus-navy">{assessment.name}</h5>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-bold text-lg text-campus-navy">
                                      {assessment.score}/{assessment.maxScore}
                                    </p>
                                    <p className={`text-sm font-semibold ${
                                      percentage >= 90 ? 'text-green-600' :
                                      percentage >= 80 ? 'text-blue-600' :
                                      percentage >= 70 ? 'text-orange-600' :
                                      'text-red-600'
                                    }`}>
                                      {Math.round(percentage)}%
                                    </p>
                                    {(assessment.type === 'Test' || assessment.type === 'Midterm' || assessment.type === 'Quiz') && (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                          setSelectedAssessment(assessment);
                                          setShowRetakeTest(true);
                                        }}
                                        className="mt-1 text-xs bg-white hover:bg-blue-50 border-blue-200 text-blue-700"
                                      >
                                        <RotateCcw className="h-3 w-3 mr-1" />
                                        Retake
                                      </Button>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <Progress 
                                    value={percentage} 
                                    className={`h-2 bg-gray-200 flex-1 mr-4 ${
                                      percentage >= 90 ? '[&>div]:bg-green-500' :
                                      percentage >= 80 ? '[&>div]:bg-blue-500' :
                                      percentage >= 70 ? '[&>div]:bg-orange-500' :
                                      '[&>div]:bg-red-500'
                                    }`} 
                                  />
                                  <span className="text-xs text-muted-foreground">{assessment.date}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
              
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <p className="text-sm text-muted-foreground mb-1">Academic Standing</p>
                <p className="text-2xl font-bold text-blue-600">Excellent</p>
                <p className="text-xs text-blue-500 mt-1">Top 15% of class</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-semibold text-campus-navy">Degree Progress</p>
                <p className="text-sm font-semibold text-purple-600">{studentInfo.creditsCompleted}/{studentInfo.creditsRequired} credits</p>
              </div>
              <Progress value={progressPercentage} className="h-3 bg-purple-100 [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-pink-500" />
              <p className="text-xs text-muted-foreground mt-2">{Math.round(progressPercentage)}% Complete • {studentInfo.creditsRequired - studentInfo.creditsCompleted} credits remaining</p>
            </div>
          </CardContent>
        </Card>

        <Card className="campus-shadow hover-lift bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-xl">
            <CardTitle className="flex items-center gap-3 text-campus-navy">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                <Clock className="h-5 w-5 text-white" />
              </div>
              Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className={`flex items-center justify-between p-4 border-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                  deadline.daysLeft <= 15 
                    ? 'border-red-200 bg-gradient-to-r from-red-50 to-orange-50' 
                    : 'border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50'
                }`}>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-campus-navy">{deadline.title}</p>
                    <p className="text-xs text-muted-foreground">{deadline.date}</p>
                  </div>
                  <Badge className={`px-3 py-1 font-semibold ${
                    deadline.daysLeft <= 15 
                      ? "bg-gradient-to-r from-red-500 to-orange-500 text-white" 
                      : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                  }`}>
                    {deadline.daysLeft}d
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="campus-shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-xl">
          <CardTitle className="flex items-center gap-3 text-campus-navy">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
              <Building className="h-5 w-5 text-white" />
            </div>
            Campus Services Hub
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              const gradients = [
                'from-blue-500 to-blue-600',
                'from-green-500 to-green-600', 
                'from-purple-500 to-purple-600',
                'from-orange-500 to-orange-600',
                'from-pink-500 to-pink-600',
                'from-indigo-500 to-indigo-600'
              ]
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-6 flex flex-col items-start space-y-4 transition-all duration-300 bg-white border-2 border-gray-200 text-black hover:bg-gray-50 hover:text-black hover:border-gray-300 hover:font-bold group"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${gradients[index % gradients.length]} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    {action.status === 'urgent' && (
                      <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white pulse-glow">
                        Urgent
                      </Badge>
                    )}
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-gray-600 transition-colors" />
                  </div>
                  <div className="text-left w-full">
                    <h4 className="font-semibold font-['Poppins'] group-hover:text-black transition-colors break-words">{action.title}</h4>
                    <p className="text-sm mt-1 group-hover:text-gray-700 break-words whitespace-normal">{action.description}</p>
                  </div>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card className="campus-shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-t-xl">
          <CardTitle className="flex items-center gap-3 text-campus-navy">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
              <Clock className="h-5 w-5 text-white" />
            </div>
            Recent Campus Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                activity.type === 'success' ? 'border-green-200 bg-gradient-to-r from-green-50 to-emerald-50' :
                activity.type === 'warning' ? 'border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50' :
                'border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50'
              }`}>
                <div className="flex-shrink-0 mt-1">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-orange-500' :
                    'bg-blue-500'
                  }`}>
                    {activity.type === 'success' && (
                      <CheckCircle className="h-4 w-4 text-white" />
                    )}
                    {activity.type === 'warning' && (
                      <AlertCircle className="h-4 w-4 text-white" />
                    )}
                    {activity.type === 'info' && (
                      <Clock className="h-4 w-4 text-white" />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-campus-navy">{activity.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SSO Notice */}
      <Card className="bg-white campus-shadow-lg">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-r from-campus-gold to-campus-orange rounded-full pulse-glow">
              <GraduationCap className="h-6 w-6 text-campus-navy-dark" />
            </div>
            <div>
              <h4 className="font-semibold text-campus-navy font-['Poppins'] mb-2">🔐 Single Sign-On Integration</h4>
              <p className="text-sm text-campus-navy/80 leading-relaxed">
                Access all campus services seamlessly with your student credentials. 
                One login unlocks your entire academic ecosystem - no more juggling multiple passwords!
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-campus-navy font-medium">Connected & Secure</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}