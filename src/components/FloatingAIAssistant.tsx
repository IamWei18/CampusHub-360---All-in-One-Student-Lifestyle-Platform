import { useState, useRef, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Bot, X, Minimize2, Maximize2, GripHorizontal } from 'lucide-react'
import { AIBotAssistant } from './AIBotAssistant'

interface FloatingAIAssistantProps {
  isOpen: boolean
  onToggle: () => void
}

export function FloatingAIAssistant({ isOpen, onToggle }: FloatingAIAssistantProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isHoveringHeader, setIsHoveringHeader] = useState(false)
  const [isFirstOpen, setIsFirstOpen] = useState(true)
  const popupRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  // Initialize position in bottom right corner
  useEffect(() => {
    const updatePosition = () => {
      const width = isMinimized ? 300 : 400
      const height = isMinimized ? 60 : 600
      setPosition({
        x: window.innerWidth - width - 20,
        y: window.innerHeight - height - 20
      })
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    return () => window.removeEventListener('resize', updatePosition)
  }, [isMinimized])

  // Handle first open animation
  useEffect(() => {
    if (isOpen && isFirstOpen) {
      const timer = setTimeout(() => {
        setIsFirstOpen(false)
      }, 3000) // Show hint animation for 3 seconds
      return () => clearTimeout(timer)
    }
  }, [isOpen, isFirstOpen])

  const handleMouseDown = (e: React.MouseEvent) => {
    // Don't allow dragging when clicking on buttons
    if ((e.target as HTMLElement).closest('button')) return
    if (!headerRef.current?.contains(e.target as Node)) return
    
    e.preventDefault()
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    })
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return

    e.preventDefault()
    const newX = e.clientX - dragStart.x
    const newY = e.clientY - dragStart.y

    // Keep popup within viewport bounds with some padding
    const popup = popupRef.current
    if (popup) {
      const padding = 10
      const maxX = window.innerWidth - popup.offsetWidth - padding
      const maxY = window.innerHeight - popup.offsetHeight - padding
      
      setPosition({
        x: Math.max(padding, Math.min(newX, maxX)),
        y: Math.max(padding, Math.min(newY, maxY))
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.userSelect = 'none'
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.userSelect = ''
    }
  }, [isDragging, dragStart])

  if (!isOpen) return null

  return (
    <div
      ref={popupRef}
      className={`fixed z-50 shadow-2xl transition-all duration-200 ${
        isDragging ? 'shadow-3xl scale-[1.02]' : ''
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: isMinimized ? '300px' : '400px',
        height: isMinimized ? '60px' : '600px',
        transition: isDragging ? 'none' : 'all 0.2s ease-out',
      }}
    >
      <Card className={`w-full h-full flex flex-col border-2 bg-white ${
        isDragging ? 'border-blue-400 shadow-lg' : 'border-blue-200'
      }`}>
        {/* Header */}
        <div
          ref={headerRef}
          className={`flex flex-row items-center justify-between p-3 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg select-none transition-all duration-200 ${
            isDragging 
              ? 'cursor-grabbing bg-gradient-to-r from-blue-700 to-purple-700' 
              : isHoveringHeader 
                ? 'cursor-grab bg-gradient-to-r from-blue-500 to-purple-500' 
                : 'cursor-grab'
          }`}
          onMouseDown={handleMouseDown}
          onMouseEnter={() => setIsHoveringHeader(true)}
          onMouseLeave={() => setIsHoveringHeader(false)}
        >
          <div className="flex items-center gap-3">
            <Bot className="h-5 w-5" />
            <h3 className="text-sm font-medium">AI Assistant</h3>
            {/* Drag Handle with hint animation */}
            <div className={`transition-all duration-200 ${
              isHoveringHeader || isDragging 
                ? 'opacity-70' 
                : isFirstOpen 
                  ? 'opacity-60 animate-pulse' 
                  : 'opacity-40'
            }`}>
              <GripHorizontal className="h-4 w-4" />
            </div>
            {isFirstOpen && (
              <div className="text-xs text-white/80 animate-pulse">
                Drag to move
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 text-white hover:bg-white/20 transition-colors"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 text-white hover:bg-white/20 transition-colors"
              onClick={onToggle}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Content */}
        {!isMinimized && (
          <CardContent className="flex-1 p-0 overflow-hidden">
            <div className="h-full">
              <AIBotAssistant isFloating={true} />
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}