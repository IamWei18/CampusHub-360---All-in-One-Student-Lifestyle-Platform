import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { Bot, MessageCircle } from 'lucide-react'

interface FloatingAIButtonProps {
  isOpen: boolean
  onClick: () => void
  hasUnread?: boolean
}

export function FloatingAIButton({ isOpen, onClick, hasUnread = false }: FloatingAIButtonProps) {
  if (isOpen) return null

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={onClick}
            className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 text-white hover:scale-105 transition-all duration-200 animate-bounce"
            size="sm"
          >
            <div className="relative">
              <Bot className="h-6 w-6" />
              {hasUnread && (
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-gray-900 text-white border-gray-700">
          <p>Open AI Assistant</p>
          <p className="text-xs text-gray-300">Draggable • Click to chat</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}