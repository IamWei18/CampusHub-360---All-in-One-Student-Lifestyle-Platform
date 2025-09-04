import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { StudentClubCard } from './StudentClubCard'
import { GraduationCap, CreditCard, X, Wallet, Smartphone, Download, CheckCircle } from 'lucide-react'

interface StudentCardLandingProps {
  onComplete: () => void
}

export function StudentCardLanding({ onComplete }: StudentCardLandingProps) {
  const [showCard, setShowCard] = useState(false)
  const [showWalletPreview, setShowWalletPreview] = useState<'apple' | 'samsung' | null>(null)
  const [isAddedToWallet, setIsAddedToWallet] = useState(false)
  const [countdown, setCountdown] = useState(5)

  // Handle countdown timer - only countdown when card is not shown
  useEffect(() => {
    if (countdown > 0 && !showCard) {
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown, showCard])

  // Handle completion when countdown reaches 0
  useEffect(() => {
    if (countdown === 0 && !showCard) {
      onComplete()
    }
  }, [countdown, showCard, onComplete])

  const handleShowCard = () => {
    setShowCard(true)
  }

  const handleCloseCard = () => {
    setShowCard(false)
    setShowWalletPreview(null)
    setIsAddedToWallet(false)
  }

  const handleGoToCampusHub = () => {
    onComplete()
  }

  const handleAddToWallet = (walletType: 'apple' | 'samsung') => {
    setShowWalletPreview(walletType)
    setTimeout(() => {
      setIsAddedToWallet(true)
    }, 2000)
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
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
      </div>

      {/* Main Content */}
      <div className="text-center mb-8 relative z-10">
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl border border-white/20">
            <GraduationCap className="h-16 w-16 text-indigo-900" />
          </div>
        </div>
        
        <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent mb-4 font-['Poppins'] drop-shadow-lg">
          Campus Hub
        </h1>
        <h2 className="text-2xl text-white/90 mb-6 font-medium drop-shadow-md">
          Digital Student Card
        </h2>
      </div>

      {/* Show Card Button */}
      <div className="relative z-10 mb-8">
        <Button 
          onClick={handleShowCard}
          size="lg"
          className="bg-white hover:bg-gray-100 text-black hover:text-black px-12 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 font-semibold text-lg hover:scale-105"
        >
          <CreditCard className="h-5 w-5 mr-3" />
          Show My Card
        </Button>
      </div>

      {/* Auto redirect countdown - only show when card is not open */}
      {!showCard && (
        <div className="text-center text-white/70 text-sm relative z-10">
          <p>Redirecting to Campus Hub in {countdown} seconds...</p>
        </div>
      )}

      {/* Card opened state */}
      {showCard && !showWalletPreview && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <div className="flex justify-end mb-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleCloseCard}
                className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Student Card Preview */}
            <div className="mb-6">
              <StudentClubCard isPreview={true} />
            </div>
            
            {/* Action buttons */}
            <div className="space-y-3">
              <Button 
                onClick={handleGoToCampusHub}
                size="lg"
                className="w-full bg-campus-navy hover:bg-campus-navy-dark text-black px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg hover:scale-105"
              >
                <GraduationCap className="h-5 w-5 mr-3" />
                Go to Campus Hub
              </Button>
              
              {/* Wallet Integration Buttons (Mobile Only) */}
              {isMobile && (
                <div className="space-y-3 py-2">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-3">Add to Digital Wallet</p>
                  </div>
                  <Button
                    onClick={() => handleAddToWallet('apple')}
                    className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-xl flex items-center justify-center gap-3"
                  >
                    <Wallet className="h-5 w-5" />
                    Add to Apple Wallet
                  </Button>
                  <Button
                    onClick={() => handleAddToWallet('samsung')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-3"
                  >
                    <Smartphone className="h-5 w-5" />
                    Add to Samsung Pay
                  </Button>
                </div>
              )}
              
              <Button 
                onClick={handleCloseCard}
                variant="outline"
                size="lg"
                className="w-full bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 border-2 border-gray-300 hover:border-gray-400 px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg"
              >
                Close Card
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Wallet Preview UI */}
      {showWalletPreview && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full mx-4 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                {isAddedToWallet ? (
                  <CheckCircle className="h-8 w-8 text-white" />
                ) : (
                  <Download className="h-8 w-8 text-white" />
                )}
              </div>
              <h3 className="text-xl font-bold text-campus-navy mb-2">
                {isAddedToWallet ? 'Successfully Added!' : 'Adding to Wallet...'}
              </h3>
              <p className="text-muted-foreground">
                {isAddedToWallet 
                  ? `Your student card is now available in ${showWalletPreview === 'apple' ? 'Apple Wallet' : 'Samsung Pay'}`
                  : `Setting up your digital student card...`
                }
              </p>
            </div>

            {/* Wallet Preview */}
            <div className={`mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg ${
              showWalletPreview === 'apple' ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-gradient-to-br from-blue-600 to-blue-800'
            }`}>
              {/* Apple Wallet Style */}
              {showWalletPreview === 'apple' && (
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white text-sm font-medium">Student Card</span>
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                      <GraduationCap className="h-5 w-5 text-black" />
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-3">
                    <h4 className="text-white font-bold text-lg">Alex Chen</h4>
                    <p className="text-white/80 text-sm">S2024001</p>
                    <p className="text-white/60 text-xs mt-1">Computer Science • 3rd Year</p>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-white/60 text-xs">Campus Hub University</span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                      <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Samsung Pay Style */}
              {showWalletPreview === 'samsung' && (
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-white" />
                      <span className="text-white text-sm font-medium">Student ID</span>
                    </div>
                    <div className="text-white text-xs">Samsung Pay</div>
                  </div>
                  <div className="bg-white/15 backdrop-blur rounded-lg p-3 border border-white/20">
                    <h4 className="text-white font-bold text-lg">Alex Chen</h4>
                    <p className="text-white/90 text-sm">ID: S2024001</p>
                    <div className="mt-2 pt-2 border-t border-white/20">
                      <p className="text-white/80 text-xs">Computer Science</p>
                      <p className="text-white/60 text-xs">Year 3 • CGPA: 3.75</p>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <span className="text-white/60 text-xs">Campus Hub University</span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {isAddedToWallet && (
                <Button
                  onClick={handleGoToCampusHub}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Continue to Campus Hub
                </Button>
              )}
              <Button
                onClick={handleCloseCard}
                variant="outline"
                className="w-full py-3 rounded-xl"
              >
                {isAddedToWallet ? 'Close' : 'Cancel'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}