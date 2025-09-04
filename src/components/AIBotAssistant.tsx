import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ScrollArea } from './ui/scroll-area'
import { Badge } from './ui/badge'
import { Bot, User, Send, MapPin, DollarSign, Calendar, BookOpen } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  actions?: Array<{
    label: string
    type: 'map' | 'link' | 'schedule'
    data?: any
  }>
}

const predefinedQuestions = [
  "How to go to Canteen A?",
  "Got notes for Lecturer Lee?",
  "Where's my next class?",
  "How to pay school fees?",
  "Library opening hours?",
  "Bus schedule today?"
]

const generateResponse = (question: string): { text: string; actions?: any[] } => {
  const lowerQ = question.toLowerCase()
  
  if (lowerQ.includes('canteen') || lowerQ.includes('cafeteria') || lowerQ.includes('food')) {
    return {
      text: "Canteen A is located on Level 2 of the Student Center. It's currently open until 8:00 PM. Here's the route:",
      actions: [{ label: 'Show on Map', type: 'map', data: { location: 'canteen-a' } }]
    }
  }
  
  if (lowerQ.includes('lecturer') || lowerQ.includes('notes') || lowerQ.includes('material')) {
    return {
      text: "I found materials for Lecturer Lee's Computer Science course. Here are the latest notes and assignments:",
      actions: [{ label: 'View Materials', type: 'link', data: { url: '/materials/lecturer-lee' } }]
    }
  }
  
  if (lowerQ.includes('class') || lowerQ.includes('schedule') || lowerQ.includes('timetable')) {
    return {
      text: "Your next class is Data Structures at 2:00 PM in Room LT-205. You have 45 minutes before it starts.",
      actions: [
        { label: 'View Full Schedule', type: 'schedule' },
        { label: 'Navigate to Room', type: 'map', data: { location: 'lt-205' } }
      ]
    }
  }
  
  if (lowerQ.includes('fee') || lowerQ.includes('payment') || lowerQ.includes('tuition')) {
    return {
      text: "You can pay school fees through the Student Portal. Your current balance is $2,850. Payment deadline: March 15th.",
      actions: [{ label: 'Go to Payment Portal', type: 'link', data: { url: '/finance/payment' } }]
    }
  }
  
  if (lowerQ.includes('library') || lowerQ.includes('book')) {
    return {
      text: "The Main Library is open from 7:00 AM to 10:00 PM on weekdays, 9:00 AM to 6:00 PM on weekends. Current occupancy: 65%",
      actions: [{ label: 'Show Library Map', type: 'map', data: { location: 'library' } }]
    }
  }
  
  if (lowerQ.includes('bus') || lowerQ.includes('transport')) {
    return {
      text: "Next bus to downtown: 2:15 PM (Platform B). Next campus shuttle: 1:45 PM. Bus 101 is running 5 minutes late due to traffic.",
      actions: [{ label: 'View All Routes', type: 'link', data: { url: '/transport' } }]
    }
  }
  
  return {
    text: "I understand you're asking about campus services. Here are some quick links that might help you find what you need:",
    actions: [
      { label: 'Browse Campus Map', type: 'map' },
      { label: 'Check Class Schedule', type: 'schedule' },
      { label: 'Visit Student Portal', type: 'link', data: { url: '/portal' } }
    ]
  }
}

export function AIBotAssistant({ isFloating = false }: { isFloating?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your Campus AI Assistant. I can help you navigate campus, find information about classes, lecturers, and facilities. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [showQuickQuestions, setShowQuickQuestions] = useState(true)

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    const response = generateResponse(inputValue)
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response.text,
      sender: 'bot',
      timestamp: new Date(),
      actions: response.actions
    }

    setMessages(prev => [...prev, userMessage, botMessage])
    setInputValue('')
    setShowQuickQuestions(false)
  }

  const handleQuickQuestion = (question: string) => {
    setInputValue(question)
    setTimeout(() => handleSendMessage(), 100)
  }

  if (isFloating) {
    return (
      <div className="h-full flex flex-col">
        {/* Chat Messages Area */}
        <div className="flex-1 min-h-0">
          <ScrollArea className="h-full w-full p-3">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className="flex-shrink-0">
                      {message.sender === 'user' ? (
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <User className="h-3 w-3 text-primary-foreground" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <Bot className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className={`rounded-lg px-3 py-2 text-xs ${
                        message.sender === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        <p>{message.text}</p>
                      </div>
                      {message.actions && (
                        <div className="flex flex-wrap gap-1">
                          {message.actions.map((action, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="h-6 text-xs px-2"
                            >
                              {action.type === 'map' && <MapPin className="h-2 w-2 mr-1" />}
                              {action.type === 'link' && <BookOpen className="h-2 w-2 mr-1" />}
                              {action.type === 'schedule' && <Calendar className="h-2 w-2 mr-1" />}
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Quick Questions */}
        {showQuickQuestions && (
          <div className="border-t p-3">
            <p className="text-xs text-muted-foreground mb-2">Quick Questions:</p>
            <div className="grid grid-cols-2 gap-1">
              {predefinedQuestions.slice(0, 4).map((question, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer hover:bg-accent text-xs p-1 text-center justify-center"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* Input Area */}
        <div className="border-t p-3">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about campus..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="text-xs"
            />
            <Button onClick={handleSendMessage} size="sm" className="px-3">
              <Send className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Original full-page layout
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Campus AI Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScrollArea className="h-96 w-full rounded border p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className="flex-shrink-0">
                      {message.sender === 'user' ? (
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-primary-foreground" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className={`rounded-lg px-4 py-2 ${
                        message.sender === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        <p>{message.text}</p>
                      </div>
                      {message.actions && (
                        <div className="flex flex-wrap gap-2">
                          {message.actions.map((action, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="h-8 text-xs"
                            >
                              {action.type === 'map' && <MapPin className="h-3 w-3 mr-1" />}
                              {action.type === 'link' && <BookOpen className="h-3 w-3 mr-1" />}
                              {action.type === 'schedule' && <Calendar className="h-3 w-3 mr-1" />}
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything about campus..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {predefinedQuestions.map((question, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="cursor-pointer hover:bg-accent"
                onClick={() => handleQuickQuestion(question)}
              >
                {question}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}