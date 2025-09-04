import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { Card, CardContent } from './ui/card'
import { StudentClubCard } from './StudentClubCard'
import { 
  GraduationCap, 
  Sparkles, 
  CreditCard,
  Users,
  Calendar,
  MessageSquare,
  MapPin,
  Bot
} from 'lucide-react'

interface SplashScreenProps {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0)
  const [showCard, setShowCard] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [animationPhase, setAnimationPhase] = useState(0)

  useEffect(() => {
    // Staggered animation phases
    const phaseTimer = setInterval(() => {
      setAnimationPhase(prev => prev + 1)
    }, 200)

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsLoading(false)
          return 100
        }
        return prev + 1.5
      })
    }, 60)

    return () => {
      clearInterval(timer)
      clearInterval(phaseTimer)
    }
  }, [])

  const handleGetStarted = () => {
    onComplete()
  }

  const handleShowCard = () => {
    setShowCard(true)
  }

  const features = [
    { icon: Bot, text: 'AI Assistant' },
    { icon: Users, text: 'Friend Finder' },
    { icon: Calendar, text: 'Events & Clubs' },
    { icon: MessageSquare, text: 'Campus Forum' },
    { icon: MapPin, text: 'Campus Map' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex flex-col relative overflow-hidden">
      {/* Enhanced Vibrant Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-pink-400/40 to-purple-600/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-400/30 to-blue-600/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-full blur-3xl animate-bounce"></div>
        
        {/* Secondary Floating Elements */}
        <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-gradient-to-br from-emerald-400/25 to-teal-500/25 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-gradient-to-r from-rose-400/30 to-pink-500/30 rounded-full blur-2xl animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Animated Floating Particles */}
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* Mesh Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 relative z-10">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className={`relative mb-6 transition-all duration-1000 ${animationPhase >= 1 ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
            <div className="w-36 h-36 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl border border-white/20">
              <GraduationCap className="h-20 w-20 text-indigo-900 animate-bounce" />
            </div>
            <div className="absolute -top-3 -right-3 w-14 h-14 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-spin shadow-lg">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
          </div>
          
          <div className={`transition-all duration-1000 delay-300 ${animationPhase >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent mb-4 font-['Poppins'] drop-shadow-lg">
              Campus Hub
            </h1>
            <p className="text-2xl text-white/90 mb-3 font-medium drop-shadow-md">
              🎓 Your Complete Academic Companion
            </p>
            <p className="text-white/70 mb-8 text-lg">
              Connect • Learn • Thrive • Succeed
            </p>
          </div>
          
          {/* Feature Icons */}
          <div className={`flex items-center justify-center gap-4 mb-8 transition-all duration-1000 delay-500 ${animationPhase >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            {features.map((feature, index) => {
              const Icon = feature.icon
              const gradients = [
                'from-campus-blue-accent to-blue-600',
                'from-campus-green to-green-600', 
                'from-campus-orange to-orange-600',
                'from-purple-500 to-purple-600',
                'from-campus-navy to-campus-navy-light'
              ]
              return (
                <div key={index} className="text-center group">
                  <div className={`w-16 h-16 bg-gradient-to-r ${gradients[index]} rounded-2xl shadow-lg flex items-center justify-center mb-3 border-2 border-white/20 hover:scale-110 transition-all duration-300 campus-shadow hover:campus-shadow-lg`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <p className="text-xs text-white font-semibold drop-shadow-sm">{feature.text}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Loading Progress */}
        {isLoading && (
          <div className={`w-full max-w-md space-y-4 transition-all duration-1000 delay-700 ${animationPhase >= 4 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl campus-shadow-lg">
              <Progress 
                value={progress} 
                className="h-3 bg-campus-navy/10 [&>div]:bg-gradient-to-r [&>div]:from-campus-gold [&>div]:to-campus-orange [&>div]:animate-pulse" 
              />
              <div className="flex justify-between items-center mt-3">
                <p className="text-sm text-campus-navy font-medium">
                  🚀 Initializing your campus experience...
                </p>
                <p className="text-sm text-campus-orange font-semibold">{Math.round(progress)}%</p>
              </div>
            </div>
          </div>
        )}

        {/* Get Started Button */}
        {!isLoading && (
          <div className="animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
            <Button 
              onClick={handleGetStarted}
              size="lg"
              className="gradient-primary hover:scale-105 text-black px-12 py-4 rounded-2xl campus-shadow-lg hover:campus-shadow-lg transition-all duration-300 font-semibold text-lg pulse-glow"
            >
              🎓 Enter Campus Hub
            </Button>
          </div>
        )}
      </div>

      {/* Student Card Section */}
      <div className="px-6 pb-8 relative z-10">
        <Card 
          className={`hover:campus-shadow-lg transition-all duration-300 cursor-pointer bg-white/90 backdrop-blur-sm border-2 border-campus-gold/20 hover:border-campus-gold/40 hover:scale-[1.02] ${animationPhase >= 5 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-1000 delay-1000`}
          onClick={handleShowCard}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center flex-shrink-0 pulse-glow">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-bold text-campus-navy mb-2 font-['Poppins'] text-lg">🎓 Digital Student ID</h3>
                <p className="text-sm text-campus-navy/70 font-medium">
                  Instant access to campus discounts, services & facilities
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600 font-medium">Ready for use</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                className="bg-campus-gold/10 border-campus-gold/30 text-campus-navy hover:bg-campus-gold/20 hover:border-campus-gold/50 font-semibold px-4 py-2"
              >
                Show My Card
              </Button>
            </div>
            
            {/* Preview Card */}
            <div className="mt-6">
              <StudentClubCard isPreview={true} />
            </div>
          </CardContent>
        </Card>
        
        <p className="text-center text-sm text-white/70 mt-4 font-medium drop-shadow-sm">
          💳 Your digital campus companion - works offline too!
        </p>
      </div>

      {/* Full Student Card Modal */}
      {showCard && (
        <StudentClubCard onClose={() => setShowCard(false)} />
      )}
    </div>
  )
}