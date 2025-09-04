import { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback } from './ui/avatar'
// Dialog components removed as they're no longer needed
import { 
  GraduationCap, 
  QrCode, 
  X,
  Wallet
} from 'lucide-react'

interface StudentData {
  id: string
  name: string
  studentId: string
  major: string
  year: string
  campus: string
  issueDate: string
  expiryDate: string
  profileImage?: string
}

const mockStudentData: StudentData = {
  id: '1',
  name: 'Alex Johnson',
  studentId: 'STU2024001',
  major: 'Computer Science',
  year: '3rd Year',
  campus: 'Main Campus',
  issueDate: 'Sep 2022',
  expiryDate: 'Jul 2025'
}

// Removed tier-related constants as they're no longer needed

interface StudentClubCardProps {
  isPreview?: boolean
  onClose?: () => void
}

export function StudentClubCard({ isPreview = false, onClose }: StudentClubCardProps) {
  const [showQR, setShowQR] = useState(false)
  const student = mockStudentData

  const handleModalClose = () => {
    if (!showQR && onClose) {
      onClose()
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  if (isPreview) {
    return (
      <Card className="relative overflow-hidden bg-white border-2 border-dashed border-campus-navy/20 campus-shadow hover:border-campus-gold/40 transition-all duration-300">
        <CardContent className="p-5">
          {/* Header with University Branding */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-campus-navy to-campus-navy-light rounded-xl flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-campus-navy font-['Poppins']">University</p>
                <p className="text-xs text-campus-navy/60 font-medium">Student Identification</p>
              </div>
            </div>
            <Badge variant="outline" className="border-green-200 text-green-600 bg-green-50 text-xs font-semibold">
              ✓ Active
            </Badge>
          </div>
          
          {/* Student Information */}
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-12 w-12 border-2 border-campus-gold/30">
              <AvatarFallback className="bg-gradient-to-r from-campus-gold/20 to-campus-orange/20 text-campus-navy font-bold text-lg">
                {getInitials(student.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h4 className="font-bold text-campus-navy font-['Poppins'] text-lg">{student.name}</h4>
              <p className="text-sm text-muted-foreground font-semibold">{student.studentId}</p>
              <p className="text-xs text-campus-navy/70 font-medium">{student.major} - {student.year}</p>
            </div>
          </div>
          
          {/* Validity Footer */}
          <div className="text-center pt-3 border-t-2 border-dashed border-campus-navy/15">
            <p className="text-xs text-muted-foreground font-medium">Valid until {student.expiryDate}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50" onClick={handleModalClose}>
      <Card className="w-full max-w-sm relative bg-white border-2 border-dashed border-campus-navy/30 campus-shadow-lg" onClick={(e) => e.stopPropagation()}>
        {/* University Header Background Pattern */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-campus-navy via-campus-navy-light to-campus-blue-accent opacity-10 rounded-t-lg"></div>
        <div className="absolute top-2 left-4 w-16 h-16 bg-campus-gold/10 rounded-full blur-xl"></div>
        <div className="absolute top-4 right-8 w-12 h-12 bg-campus-orange/10 rounded-full blur-lg"></div>
        
        <div className="absolute top-3 right-3 z-10">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={showQR ? undefined : handleModalClose}
            disabled={showQR}
            className={`h-8 w-8 p-0 rounded-full transition-all duration-300 ${
              showQR 
                ? 'opacity-50 cursor-not-allowed bg-gray-100' 
                : 'hover:bg-campus-navy/10 hover:scale-110'
            }`}
          >
            <X className={`h-4 w-4 ${showQR ? 'text-gray-400' : 'text-campus-navy'}`} />
          </Button>
        </div>
        
        {/* University Header with Enhanced Design */}
        <div className="relative p-6 bg-gradient-to-r from-campus-navy via-campus-navy-light to-campus-blue-accent text-white overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-campus-gold/20 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-campus-orange/20 rounded-full blur-xl"></div>
          
          <div className="relative flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-campus-gold to-campus-gold-light rounded-xl flex items-center justify-center campus-shadow-lg pulse-glow">
              <GraduationCap className="h-8 w-8 text-campus-navy-dark" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-['Poppins'] mb-1">Campus University</h3>
              <p className="text-blue-100 text-sm font-medium">Official Student Identification</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-200 font-medium">Verified ✓</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Student Information with University Elements */}
        <CardContent className="p-6 space-y-6 relative">
          {/* Subtle University Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
            <div className="w-full h-full bg-campus-navy rounded-full"></div>
          </div>
          
          {/* Main Student Details */}
          <div className="text-center relative z-10">
            <div className="relative mb-4">
              <Avatar className="h-24 w-24 mx-auto border-4 border-gradient-to-r from-campus-gold to-campus-orange p-1 bg-gradient-to-r from-campus-gold to-campus-orange rounded-full">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-campus-navy font-['Poppins']">
                    {getInitials(student.name)}
                  </span>
                </div>
              </Avatar>
              {/* Student Status Indicator */}
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full border-4 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-campus-navy/5 to-campus-blue-accent/5 p-4 rounded-xl border border-campus-navy/10">
              <h3 className="text-2xl font-bold text-campus-navy font-['Poppins'] mb-2">{student.name}</h3>
              <div className="bg-campus-gold/10 px-4 py-2 rounded-lg border border-campus-gold/20 mb-3">
                <p className="text-lg text-campus-navy font-bold tracking-wider">{student.studentId}</p>
              </div>
              <p className="text-campus-navy font-semibold">{student.major} - {student.year}</p>
            </div>
          </div>
          
          {/* Academic Details with Enhanced Styling */}
          <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-dashed border-campus-navy/20 bg-gradient-to-r from-gray-50/50 to-blue-50/50 rounded-lg px-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">Campus</p>
              <div className="bg-campus-navy/5 p-2 rounded-lg border border-campus-navy/10">
                <p className="text-sm font-bold text-campus-navy">{student.campus}</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">Issued</p>
              <div className="bg-campus-navy/5 p-2 rounded-lg border border-campus-navy/10">
                <p className="text-sm font-bold text-campus-navy">{student.issueDate}</p>
              </div>
            </div>
          </div>
          
          {/* Validity with Prominent Display */}
          <div className="text-center bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border-2 border-green-200">
            <p className="text-sm text-green-600 mb-2 font-semibold uppercase tracking-wide">Valid Until</p>
            <p className="text-2xl font-bold text-green-700">{student.expiryDate}</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 font-medium">Active Status</span>
            </div>
          </div>
          
          {/* QR Code Section with Enhanced Design */}
          <div className="text-center py-4 border-t border-dashed border-campus-navy/20 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-lg">
            <Button 
              variant="outline" 
              onClick={() => setShowQR(!showQR)}
              className={`mb-4 transition-all duration-300 ${
                showQR 
                  ? 'border-red-300 text-red-600 hover:bg-red-50 bg-red-50/50' 
                  : 'border-campus-navy/30 text-campus-navy hover:bg-campus-navy/5 hover:border-campus-navy/50'
              }`}
            >
              <QrCode className="h-4 w-4 mr-2" />
              {showQR ? 'Hide QR Code' : 'Show QR Code'}
            </Button>
            
            {showQR && (
              <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-dashed border-campus-navy/30 rounded-xl p-6 inline-block campus-shadow-lg">
                <div className="w-40 h-40 bg-white border-2 border-campus-navy/20 rounded-xl p-3 campus-shadow">
                  {/* Enhanced QR Code Pattern */}
                  <div className="w-full h-full grid grid-cols-10 gap-px bg-campus-navy/5 rounded-lg overflow-hidden">
                    {Array.from({ length: 100 }, (_, i) => (
                      <div 
                        key={i} 
                        className={`transition-all duration-100 ${
                          // Create a more complex pattern that looks like QR code
                          (i % 3 === 0 || i % 7 === 0 || i % 11 === 0 || i % 13 === 0) ? 'bg-campus-navy' : 'bg-white'
                        }`}
                        style={{ animationDelay: `${i * 10}ms` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-campus-navy font-semibold">🔍 Campus Services Access</p>
                  <p className="text-xs text-muted-foreground">Scan at dining halls, library, and campus facilities</p>
                  <div className="bg-campus-gold/10 px-3 py-1 rounded-lg border border-campus-gold/20">
                    <p className="text-xs text-campus-navy font-bold">Student ID: {student.studentId}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Campus Services Note with University Branding */}
          <div className="text-center bg-gradient-to-r from-campus-gold/15 to-campus-orange/15 p-5 rounded-xl border-2 border-campus-gold/40 relative overflow-hidden">
            {/* University Pattern Background */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-2 left-2 w-8 h-8 border-2 border-campus-navy rounded-full"></div>
              <div className="absolute bottom-2 right-2 w-6 h-6 border-2 border-campus-navy rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-2 border-campus-navy rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-3">
                <GraduationCap className="h-4 w-4 text-campus-navy" />
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-sm text-campus-navy font-bold">OFFICIAL UNIVERSITY ID</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-campus-navy font-semibold leading-relaxed">
                  🏫 Valid for campus services, library access, dining plans
                </p>
                <p className="text-xs text-campus-navy/70">
                  💰 Student discounts at participating local vendors
                </p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">✓ Verified</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">🔒 Secure</span>
                </div>
              </div>
            </div>
          </div>

          {/* Add to Wallet Button */}
          <div className="text-center pt-4 border-t border-dashed border-campus-navy/20">
            <Button 
              className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <Wallet className="h-4 w-4 mr-2" />
              Add to Apple Wallet
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}