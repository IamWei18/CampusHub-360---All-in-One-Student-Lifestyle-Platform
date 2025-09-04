import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { 
  MessageSquare, 
  Heart, 
  Flag, 
  Plus, 
  Filter,
  TrendingUp,
  AlertTriangle,
  HelpCircle,
  MessageCircle,
  Eye,
  EyeOff,
  Shield
} from 'lucide-react'

interface ForumPost {
  id: string
  title: string
  content: string
  category: 'question' | 'confession' | 'feedback' | 'report'
  author: string
  isAnonymous: boolean
  timestamp: Date
  likes: number
  replies: number
  tags: string[]
  priority?: 'low' | 'medium' | 'high'
}

const forumPosts: ForumPost[] = [
  {
    id: '1',
    title: 'Bus 101 is always late - need better schedule',
    content: 'The 8:00 AM bus is consistently 10-15 minutes late, making students miss their first class. Can we get more reliable timing?',
    category: 'feedback',
    author: 'anonymous_student_123',
    isAnonymous: true,
    timestamp: new Date('2024-03-01T10:30:00'),
    likes: 47,
    replies: 12,
    tags: ['transport', 'schedule', 'punctuality'],
    priority: 'high'
  },
  {
    id: '2',
    title: 'Where to find good study groups for Data Structures?',
    content: 'I\'m struggling with linked lists and trees. Anyone know of active study groups or willing to form one?',
    category: 'question',
    author: 'studying_hard',
    isAnonymous: false,
    timestamp: new Date('2024-03-02T14:20:00'),
    likes: 23,
    replies: 8,
    tags: ['study', 'computer science', 'help']
  },
  {
    id: '3',
    title: 'Swimming pool chlorine levels too high',
    content: 'The pool has been burning eyes and skin lately. I think the chemical balance needs checking.',
    category: 'report',
    author: 'anonymous_swimmer',
    isAnonymous: true,
    timestamp: new Date('2024-03-02T16:45:00'),
    likes: 31,
    replies: 5,
    tags: ['facilities', 'pool', 'health'],
    priority: 'medium'
  },
  {
    id: '4',
    title: 'Feeling overwhelmed with semester workload',
    content: 'Anyone else struggling to balance 6 courses plus part-time work? How do you manage stress?',
    category: 'confession',
    author: 'stressed_student',
    isAnonymous: true,
    timestamp: new Date('2024-03-03T09:15:00'),
    likes: 89,
    replies: 24,
    tags: ['mental health', 'workload', 'advice']
  },
  {
    id: '5',
    title: 'WiFi in Library Level 3 keeps disconnecting',
    content: 'For the past week, WiFi on Level 3 study area drops every 10-15 minutes. IT department aware?',
    category: 'report',
    author: 'tech_frustrated',
    isAnonymous: false,
    timestamp: new Date('2024-03-03T11:30:00'),
    likes: 15,
    replies: 3,
    tags: ['wifi', 'library', 'technical'],
    priority: 'medium'
  }
]

const categories = [
  { id: 'all', label: 'All Posts', icon: MessageSquare },
  { id: 'question', label: 'Questions', icon: HelpCircle },
  { id: 'confession', label: 'Confessions', icon: MessageCircle },
  { id: 'feedback', label: 'Feedback', icon: TrendingUp },
  { id: 'report', label: 'Reports', icon: AlertTriangle }
]

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800'
}

export function CampusForum() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('recent')
  const [isCreating, setIsCreating] = useState(false)
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'question' as const,
    isAnonymous: true,
    tags: ''
  })

  const filteredPosts = forumPosts.filter(post => 
    activeCategory === 'all' || post.category === activeCategory
  ).sort((a, b) => {
    if (sortBy === 'recent') return b.timestamp.getTime() - a.timestamp.getTime()
    if (sortBy === 'popular') return b.likes - a.likes
    if (sortBy === 'replies') return b.replies - a.replies
    return 0
  })

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  const handleCreatePost = () => {
    // In a real app, this would submit to a backend
    console.log('Creating post:', newPost)
    setIsCreating(false)
    setNewPost({
      title: '',
      content: '',
      category: 'question',
      isAnonymous: true,
      tags: ''
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>Campus Forum</h2>
          <p className="text-muted-foreground">A safe space for student voices and community discussion</p>
        </div>
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-1" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Post</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  placeholder="What's on your mind?"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Select value={newPost.category} onValueChange={(value: any) => setNewPost({...newPost, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="question">Question</SelectItem>
                      <SelectItem value="confession">Confession</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="report">Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Tags (comma separated)</label>
                  <Input
                    value={newPost.tags}
                    onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                    placeholder="study, help, technical"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Content</label>
                <Textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  placeholder="Share your thoughts, ask questions, or report issues..."
                  className="min-h-32"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant={newPost.isAnonymous ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNewPost({...newPost, isAnonymous: !newPost.isAnonymous})}
                  >
                    {newPost.isAnonymous ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                    {newPost.isAnonymous ? 'Anonymous' : 'With Profile'}
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsCreating(false)}>Cancel</Button>
                  <Button onClick={handleCreatePost}>Post</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="grid w-full grid-cols-5 lg:w-auto">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{category.label}</span>
                    </TabsTrigger>
                  )
                })}
              </TabsList>
            </Tabs>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recent</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                  <SelectItem value="replies">Most Replies</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts */}
      <div className="space-y-4">
        {filteredPosts.map((post) => {
          const categoryData = categories.find(c => c.id === post.category)
          const CategoryIcon = categoryData?.icon || MessageSquare
          
          return (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Post Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <CategoryIcon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h4>{post.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{post.isAnonymous ? 'Anonymous' : post.author}</span>
                          <span>•</span>
                          <span>{formatTimeAgo(post.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {post.priority && (
                        <Badge className={priorityColors[post.priority]}>
                          {post.priority}
                        </Badge>
                      )}
                      <Badge variant="outline">{categoryData?.label}</Badge>
                    </div>
                  </div>
                  
                  {/* Post Content */}
                  <p className="text-sm">{post.content}</p>
                  
                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Heart className="h-4 w-4" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {post.replies}
                      </Button>
                    </div>
                    
                    <Button variant="ghost" size="sm">
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Moderation Notice */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-green-600" />
            <p className="text-sm">
              <strong>Community Guidelines:</strong> Our AI moderation system and community moderators 
              ensure a safe, respectful environment. Hate speech, bullying, and spam are automatically flagged and removed.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}