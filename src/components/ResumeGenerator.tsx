import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from './ui/dialog'
import { Badge } from './ui/badge'
import { 
  FileText, 
  Download, 
  Image, 
  FileDown,
  GraduationCap,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  Star,
  Sparkles
} from 'lucide-react'

interface ResumeData {
  personalInfo: {
    name: string
    email: string
    phone: string
    address: string
    studentId: string
  }
  education: {
    university: string
    degree: string
    major: string
    year: string
    cgpa: number
    expectedGraduation: string
  }
  academicAchievements: Array<{
    title: string
    description: string
    semester: string
  }>
  skills: Array<{
    category: string
    items: string[]
  }>
  projects: Array<{
    name: string
    description: string
    technologies: string[]
  }>
}

const mockResumeData: ResumeData = {
  personalInfo: {
    name: 'Alex Chen',
    email: 'alex.chen@campushub.edu',
    phone: '+1 (555) 123-4567',
    address: 'Campus Hub University, Academic City',
    studentId: 'S2024001'
  },
  education: {
    university: 'Campus Hub University',
    degree: 'Bachelor of Science',
    major: 'Computer Science',
    year: '3rd Year',
    cgpa: 3.75,
    expectedGraduation: 'May 2025'
  },
  academicAchievements: [
    {
      title: 'Dean\'s List',
      description: 'Achieved GPA above 3.7 for consecutive semesters',
      semester: 'Fall 2023, Spring 2024'
    },
    {
      title: 'Academic Excellence Award',
      description: 'Top 15% of Computer Science cohort',
      semester: 'Spring 2024'
    },
    {
      title: 'Outstanding Programming Project',
      description: 'Best Software Engineering project of the semester',
      semester: 'Fall 2024'
    }
  ],
  skills: [
    {
      category: 'Programming Languages',
      items: ['Python', 'Java', 'JavaScript', 'C++', 'SQL']
    },
    {
      category: 'Web Technologies',
      items: ['React', 'Node.js', 'HTML/CSS', 'MongoDB', 'REST APIs']
    },
    {
      category: 'Tools & Platforms',
      items: ['Git', 'Docker', 'AWS', 'Linux', 'VS Code']
    },
    {
      category: 'Soft Skills',
      items: ['Problem Solving', 'Team Leadership', 'Communication', 'Project Management']
    }
  ],
  projects: [
    {
      name: 'Campus Management System',
      description: 'Full-stack web application for managing student records and course enrollment',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express']
    },
    {
      name: 'AI Study Assistant',
      description: 'Machine learning application that helps students optimize their study schedules',
      technologies: ['Python', 'TensorFlow', 'Flask', 'SQLite']
    },
    {
      name: 'Mobile Task Manager',
      description: 'Cross-platform mobile app for student productivity and task management',
      technologies: ['React Native', 'Firebase', 'TypeScript']
    }
  ]
}

interface ResumeGeneratorProps {
  studentData: any
  gpaHistory: any[]
}

export function ResumeGenerator({ studentData, gpaHistory }: ResumeGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedResume, setGeneratedResume] = useState<ResumeData | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  const generateResume = async () => {
    setIsGenerating(true)
    
    // Simulate AI generation process
    setTimeout(() => {
      // In a real implementation, this would call an AI service
      setGeneratedResume(mockResumeData)
      setIsGenerating(false)
      setShowPreview(true)
    }, 2000)
  }

  const downloadAsPDF = () => {
    // In a real implementation, this would generate and download a PDF
    console.log('Downloading resume as PDF...')
    // For demo, we'll just show a success message
    alert('Resume downloaded as PDF successfully!')
  }

  const downloadAsImage = () => {
    // In a real implementation, this would generate and download an image
    console.log('Downloading resume as image...')
    // For demo, we'll just show a success message
    alert('Resume downloaded as PNG image successfully!')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          size="sm" 
          className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Generate Resume
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-campus-navy">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
            AI Resume Generator
          </DialogTitle>
          <DialogDescription>
            Generate a professional resume automatically using AI and your academic data
          </DialogDescription>
        </DialogHeader>

        {!showPreview ? (
          <div className="space-y-6 py-4">
            {/* Generation Info */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-campus-navy">AI-Powered Resume Generation</h3>
                  <p className="text-sm text-muted-foreground">Generate a professional resume based on your academic records</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-white rounded-lg border">
                  <User className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <p className="text-sm font-medium">Personal Info</p>
                  <p className="text-xs text-muted-foreground">From student profile</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <GraduationCap className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <p className="text-sm font-medium">Academic Records</p>
                  <p className="text-xs text-muted-foreground">GPA, courses, achievements</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <BookOpen className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <p className="text-sm font-medium">Skills & Projects</p>
                  <p className="text-xs text-muted-foreground">Based on coursework</p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
                <h4 className="text-sm font-semibold text-campus-navy mb-2">What will be included:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Personal information and contact details</li>
                  <li>• Educational background with CGPA and coursework</li>
                  <li>• Academic achievements and honors</li>
                  <li>• Technical skills derived from your courses</li>
                  <li>• Relevant projects based on your major</li>
                  <li>• Professional formatting optimized for job applications</li>
                </ul>
              </div>

              {!isGenerating ? (
                <Button 
                  onClick={generateResume}
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white py-3"
                  size="lg"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Generate My Resume with AI
                </Button>
              ) : (
                <div className="text-center py-8">
                  <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-lg font-semibold text-campus-navy">Generating your resume...</p>
                  <p className="text-sm text-muted-foreground">AI is analyzing your academic data</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            {/* Download Options */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Button 
                onClick={downloadAsPDF}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                <FileDown className="h-4 w-4 mr-2" />
                Download as PDF
              </Button>
              <Button 
                onClick={downloadAsImage}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <Image className="h-4 w-4 mr-2" />
                Download as Image
              </Button>
            </div>

            {/* Resume Preview */}
            {generatedResume && (
              <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-lg">
                {/* Header */}
                <div className="text-center mb-8 pb-6 border-b-2 border-gray-200">
                  <h1 className="text-3xl font-bold text-campus-navy mb-2">{generatedResume.personalInfo.name}</h1>
                  <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {generatedResume.personalInfo.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {generatedResume.personalInfo.phone}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {generatedResume.personalInfo.address}
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-campus-navy mb-3 flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Education
                  </h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{generatedResume.education.degree} in {generatedResume.education.major}</h3>
                        <p className="text-muted-foreground">{generatedResume.education.university}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">CGPA: {generatedResume.education.cgpa}</p>
                        <p className="text-sm text-muted-foreground">Expected: {generatedResume.education.expectedGraduation}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Academic Achievements */}
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-campus-navy mb-3 flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Academic Achievements
                  </h2>
                  <div className="space-y-3">
                    {generatedResume.academicAchievements.map((achievement, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{achievement.title}</h4>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          </div>
                          <Badge variant="outline">{achievement.semester}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-campus-navy mb-3 flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Technical Skills
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {generatedResume.skills.map((skillGroup, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-semibold mb-2">{skillGroup.category}</h4>
                        <div className="flex flex-wrap gap-1">
                          {skillGroup.items.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                <div>
                  <h2 className="text-xl font-bold text-campus-navy mb-3 flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Relevant Projects
                  </h2>
                  <div className="space-y-4">
                    {generatedResume.projects.map((project, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-1">{project.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}