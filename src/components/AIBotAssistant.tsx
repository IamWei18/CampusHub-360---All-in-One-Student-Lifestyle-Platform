import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ScrollArea } from './ui/scroll-area'
import { Badge } from './ui/badge'
import { Bot, User, Send, MapPin, DollarSign, Calendar, BookOpen, GraduationCap, Users, Clock, Heart, Building } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  actions?: Array<{
    label: string
    type: 'map' | 'link' | 'schedule' | 'navigate'
    data?: any
  }>
  context?: {
    intent: string
    entities: Record<string, string>
  }
}

const predefinedQuestions = [
  "How to go to Canteen A?",
  "Got notes for Lecturer Lee?",
  "Where's my next class?",
  "How to pay school fees?",
  "Library opening hours?",
  "Bus schedule today?",
  "What events are happening?",
  "How to join a club?",
  "Where can I get mental health support?"
]

// Enhanced response generation with better NLP and context awareness
const generateResponse = (question: string, context?: any): { text: string; actions?: any[]; context?: any } => {
  const lowerQ = question.toLowerCase()
  
  // Context-aware responses
  if (context?.lastIntent === 'class_schedule' && (lowerQ.includes('next') || lowerQ.includes('after') || lowerQ.includes('then'))) {
    return {
      text: "After your Data Structures class, you have a break until 4:00 PM when your Software Engineering class begins in Room LT-301.",
      actions: [
        { label: 'View Full Schedule', type: 'schedule' },
        { label: 'Navigate to LT-301', type: 'map', data: { location: 'lt-301' } }
      ],
      context: { intent: 'class_schedule', entities: { class: 'Software Engineering', room: 'LT-301' } }
    }
  }
  
  // Canteen and food related queries
  if (lowerQ.includes('canteen') || lowerQ.includes('cafeteria') || lowerQ.includes('food') || lowerQ.includes('eat') || lowerQ.includes('hungry')) {
    const canteenStatus = "Canteen A is currently open until 8:00 PM with moderate crowds (45% capacity)."
    const recommendations = lowerQ.includes('recommend') || lowerQ.includes('what should') ? 
      "I recommend trying the chicken rice today - it's getting great reviews from students!" : ""
    
    return {
      text: `${canteenStatus} It's located on Level 2 of the Student Center. ${recommendations} Here's the route:`,
      actions: [
        { label: 'Show on Map', type: 'map', data: { location: 'canteen-a' } },
        { label: 'View Menu', type: 'link', data: { url: '/dining/menu' } },
        { label: 'Other Dining Options', type: 'navigate', data: { path: '/dining' } }
      ],
      context: { intent: 'dining', entities: { location: 'canteen-a', type: 'food' } }
    }
  }
  
  // Lecturer and materials queries
  if (lowerQ.includes('lecturer') || lowerQ.includes('professor') || lowerQ.includes('notes') || lowerQ.includes('material') || lowerQ.includes('slide')) {
    const lecturerMatch = lowerQ.match(/(lecturer|professor)\s+(\w+)/) || lowerQ.match(/(\w+)\s+(notes|material|slide)/)
    const lecturerName = lecturerMatch ? lecturerMatch[2] || lecturerMatch[1] : 'Lee'
    
    return {
      text: `I found materials for Lecturer ${lecturerName}'s Computer Science course. The most recent upload was yesterday. Here are the notes and assignments:`,
      actions: [
        { label: 'View Materials', type: 'link', data: { url: `/materials/lecturer-${lecturerName.toLowerCase()}` } },
        { label: 'Contact Lecturer', type: 'link', data: { url: `/directory/lecturer-${lecturerName.toLowerCase()}` } },
        { label: 'Schedule Consultation', type: 'schedule' }
      ],
      context: { intent: 'academic_materials', entities: { lecturer: lecturerName, subject: 'Computer Science' } }
    }
  }
  
  // Class and schedule queries
  if (lowerQ.includes('class') || lowerQ.includes('schedule') || lowerQ.includes('timetable') || lowerQ.includes('next') || lowerQ.includes('where') || lowerQ.includes('when')) {
    const classMatch = lowerQ.match(/(data structures|software engineering|algorithms|database)/i)
    const className = classMatch ? classMatch[0] : 'Data Structures'
    const room = className === 'Data Structures' ? 'LT-205' : 
                className === 'Software Engineering' ? 'LT-301' : 
                className === 'Algorithms' ? 'LT-110' : 'LAB-302'
    
    return {
      text: `Your next class is ${className} at 2:00 PM in Room ${room}. You have 45 minutes before it starts. Don't forget to bring your project proposal today!`,
      actions: [
        { label: 'View Full Schedule', type: 'schedule' },
        { label: `Navigate to ${room}`, type: 'map', data: { location: room.toLowerCase() } },
        { label: 'Class Resources', type: 'link', data: { url: `/classes/${className.toLowerCase().replace(' ', '-')}` } }
      ],
      context: { intent: 'class_schedule', entities: { class: className, room: room, time: '2:00 PM' } }
    }
  }
  
  // Fee and payment queries
  if (lowerQ.includes('fee') || lowerQ.includes('payment') || lowerQ.includes('tuition') || lowerQ.includes('pay') || lowerQ.includes('balance')) {
    const balance = "$2,850.00"
    const deadline = "March 15th"
    const urgency = lowerQ.includes('due') || lowerQ.includes('when') ? 
      `The payment deadline is ${deadline}. You have 12 days remaining.` : ''
    
    return {
      text: `You can pay school fees through the Student Portal. Your current balance is ${balance}. ${urgency}`,
      actions: [
        { label: 'Go to Payment Portal', type: 'navigate', data: { path: '/finance/payment' } },
        { label: 'View Payment History', type: 'link', data: { url: '/finance/history' } },
        { label: 'Financial Aid Info', type: 'navigate', data: { path: '/financial-aid' } }
      ],
      context: { intent: 'finance', entities: { balance: balance, deadline: deadline } }
    }
  }
  
  // Library queries
  if (lowerQ.includes('library') || lowerQ.includes('book') || lowerQ.includes('study') || lowerQ.includes('quiet')) {
    const occupancy = "65%"
    const quietZones = lowerQ.includes('quiet') || lowerQ.includes('silent') ? 
      "The silent study area on Level 3 has available spots." : ""
    
    return {
      text: `The Main Library is open from 7:00 AM to 10:00 PM on weekdays, 9:00 AM to 6:00 PM on weekends. Current occupancy: ${occupancy}. ${quietZones}`,
      actions: [
        { label: 'Show Library Map', type: 'map', data: { location: 'library' } },
        { label: 'Book Study Room', type: 'navigate', data: { path: '/library/booking' } },
        { label: 'Search Catalog', type: 'link', data: { url: '/library/search' } }
      ],
      context: { intent: 'library', entities: { occupancy: occupancy, open: '7:00 AM - 10:00 PM' } }
    }
  }
  
  // Transport and bus queries
  if (lowerQ.includes('bus') || lowerQ.includes('transport') || lowerQ.includes('shuttle') || lowerQ.includes('how to get') || lowerQ.includes('commute')) {
    const nextBus = "2:15 PM (Platform B)"
    const nextShuttle = "1:45 PM"
    const delayInfo = lowerQ.includes('delay') || lowerQ.includes('late') ? 
      "Bus 101 is running 5 minutes late due to traffic." : ""
    
    return {
      text: `Next bus to downtown: ${nextBus}. Next campus shuttle: ${nextShuttle}. ${delayInfo}`,
      actions: [
        { label: 'View All Routes', type: 'link', data: { url: '/transport' } },
        { label: 'Live Bus Tracker', type: 'navigate', data: { path: '/transport/tracker' } },
        { label: 'Campus Map', type: 'map' }
      ],
      context: { intent: 'transport', entities: { next_bus: nextBus, next_shuttle: nextShuttle } }
    }
  }
  
  // Events and activities queries
  if (lowerQ.includes('event') || lowerQ.includes('activity') || lowerQ.includes('happening') || lowerQ.includes('what\'s on')) {
    return {
      text: "There are several events happening this week! Today: Coding Workshop at 4PM, Basketball Tournament at 6PM. Tomorrow: Career Fair all day at the Student Center.",
      actions: [
        { label: 'View All Events', type: 'navigate', data: { path: '/events' } },
        { label: 'Register for Workshop', type: 'link', data: { url: '/events/coding-workshop' } },
        { label: 'Student Clubs', type: 'navigate', data: { path: '/clubs' } }
      ],
      context: { intent: 'events', entities: { timeframe: 'this week' } }
    }
  }
  
  // Clubs and organizations queries
  if (lowerQ.includes('club') || lowerQ.includes('society') || lowerQ.includes('join') || lowerQ.includes('extracurricular')) {
    return {
      text: "Based on your interests in technology, I recommend checking out the Tech Innovation Society or the Coding Club. The Photography Guild is also popular among CS students.",
      actions: [
        { label: 'Browse All Clubs', type: 'navigate', data: { path: '/clubs' } },
        { label: 'Tech Society Page', type: 'link', data: { url: '/clubs/tech' } },
        { label: 'Upcoming Club Events', type: 'navigate', data: { path: '/events/clubs' } }
      ],
      context: { intent: 'clubs', entities: { interest: 'technology' } }
    }
  }
  
  // Wellness and support queries
  if (lowerQ.includes('wellness') || lowerQ.includes('mental') || lowerQ.includes('health') || lowerQ.includes('stress') || lowerQ.includes('counseling')) {
    return {
      text: "The Wellness Center offers confidential support for students. They have open appointments tomorrow. Would you like me to help you schedule a visit or show you some immediate relaxation techniques?",
      actions: [
        { label: 'Wellness Center Info', type: 'navigate', data: { path: '/wellness' } },
        { label: 'Schedule Appointment', type: 'link', data: { url: '/wellness/schedule' } },
        { label: 'Emergency Contacts', type: 'navigate', data: { path: '/wellness/emergency' } },
        { label: 'Relaxation Exercises', type: 'navigate', data: { path: '/wellness/exercises' } }
      ],
      context: { intent: 'wellness', entities: { type: 'support' } }
    }
  }
  
  // Default response with personalized suggestions
  return {
    text: "I understand you're asking about campus services. Based on your interests and schedule, here are some options that might help:",
    actions: [
      { label: 'Browse Campus Map', type: 'map' },
      { label: 'Check Class Schedule', type: 'schedule' },
      { label: 'Visit Student Portal', type: 'navigate', data: { path: '/portal' } },
      { label: 'Wellness Resources', type: 'navigate', data: { path: '/wellness' } },
      { label: 'Campus Events', type: 'navigate', data: { path: '/events' } }
    ],
    context: { intent: 'general_help', entities: {} }
  }
}

export function AIBotAssistant({ isFloating = false, onNavigate }: { isFloating?: boolean; onNavigate?: (section: string) => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your Campus AI Assistant. I can help you navigate campus, find information about classes, lecturers, facilities, events, and more. What would you like to know?",
      sender: 'bot',
      timestamp: new Date(),
      context: { intent: 'welcome', entities: {} }
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [showQuickQuestions, setShowQuickQuestions] = useState(true)
  const [conversationContext, setConversationContext] = useState<Record<string, any>>({})

  const handleSendMessage = useCallback(() => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    const response = generateResponse(inputValue, conversationContext)
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response.text,
      sender: 'bot',
      timestamp: new Date(),
      actions: response.actions,
      context: response.context
    }

    setMessages(prev => [...prev, userMessage, botMessage])
    setInputValue('')
    setShowQuickQuestions(false)
    
    // Update conversation context for future responses
    if (response.context) {
      setConversationContext(prev => ({
        ...prev,
        lastIntent: response.context?.intent,
        lastEntities: response.context?.entities
      }))
    }
  }, [inputValue, conversationContext])

  const handleQuickQuestion = (question: string) => {
    setInputValue(question)
    setTimeout(() => handleSendMessage(), 100)
  }

  const handleActionClick = (action: any) => {
    if (action.type === 'navigate' && action.data?.path) {
      // Navigate to the specified section
      const sectionMap: Record<string, string> = {
        '/portal': 'management',
        '/wellness': 'wellness',
        '/events': 'clubs',
        '/clubs': 'clubs',
        '/map': 'map',
        '/schedule': 'management',
        '/finance/payment': 'management',
        '/financial-aid': 'management',
        '/library/booking': 'management',
        '/transport': 'map',
        '/transport/tracker': 'map'
      }
      const section = sectionMap[action.data.path] || 'management'
      onNavigate?.(section)
    } else if (action.type === 'link' && action.data?.url) {
      // Open external link or show as notification
      console.log('Link action:', action.data.url)
      // In a real app, this would open the link or show relevant information
    } else if (action.type === 'map') {
      // Handle map actions
      console.log('Map action:', action.data)
      onNavigate?.('map')
    } else if (action.type === 'schedule') {
      // Handle schedule actions
      onNavigate?.('management')
    }
  }

  // Add keyboard shortcut to focus input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        document.getElementById('ai-chat-input')?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [])

  const renderActionButton = (action: any, index: number) => {
    let icon = null
    switch (action.type) {
      case 'map':
        icon = <MapPin className="h-3 w-3 mr-1" />
        break
      case 'link':
        icon = <BookOpen className="h-3 w-3 mr-1" />
        break
      case 'schedule':
        icon = <Calendar className="h-3 w-3 mr-1" />
        break
      case 'navigate':
        icon = <Building className="h-3 w-3 mr-1" />
        break
      default:
        icon = null
    }

    return (
      <Button
        key={index}
        variant="outline"
        size="sm"
        className="h-6 text-xs px-2"
        onClick={() => handleActionClick(action)}
      >
        {icon}
        {action.label}
      </Button>
    )
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
                          {message.actions.map((action, index) => renderActionButton(action, index))}
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
              id="ai-chat-input"
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
                          {message.actions.map((action, index) => renderActionButton(action, index))}
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
              id="ai-chat-input"
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