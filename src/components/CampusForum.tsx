import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Badge } from './ui/badge'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import {
  MessageSquare,
  Heart,
  Flag,
  Plus,
  Filter,
  HelpCircle,
  Megaphone,
  Eye,
  EyeOff,
  ArrowLeft,
  GraduationCap,
  Users,
  BookOpen,
  UserCheck
} from 'lucide-react'

// -------------------- Types --------------------
interface ForumPost {
  id: string
  title: string
  content: string
  category: 'question' | 'announcement'
  author: string
  isAnonymous: boolean
  timestamp: Date
  likes: number
  replies: number
  tags: string[]
  isTutor?: boolean
}

interface Forum {
  id: string
  name: string
  description: string
  posts: ForumPost[]
}

// -------------------- Sample Data --------------------
const forums: Forum[] = [
  {
    id: 'spm2024',
    name: 'Software Project Management - Batch 2024',
    description: 'Discussion and tutoring support for Software Project Management',
    posts: [
      {
        id: '1',
        title: 'When is class replacement?',
        content: 'Hi everyone, does anyone know when the replacement for last week’s class will be scheduled?',
        category: 'question',
        author: 'student_01',
        isAnonymous: true,
        timestamp: new Date('2025-08-20T09:30:00'),
        likes: 12,
        replies: 4,
        tags: ['class', 'schedule']
      },
      {
        id: '2',
        title: 'Lab session venue change',
        content: 'Tomorrow’s lab will be held in Lab 302 instead of Lab 201. Please take note.',
        category: 'announcement',
        author: 'lecturer_spm',
        isAnonymous: false,
        timestamp: new Date('2025-08-22T11:00:00'),
        likes: 25,
        replies: 6,
        tags: ['lab', 'venue', 'announcement'],
        isTutor: true
      },
      {
        id: '3',
        title: 'Group project submission',
        content: 'Reminder: The group project report is due next Friday. Submit via the LMS before 11:59 PM.',
        category: 'announcement',
        author: 'lecturer_spm',
        isAnonymous: false,
        timestamp: new Date('2025-08-25T15:45:00'),
        likes: 30,
        replies: 10,
        tags: ['project', 'deadline'],
        isTutor: true
      }
    ]
  },
  {
    id: 'ds2024',
    name: 'Data Science - Batch 2024',
    description: 'Forum for Data Science subject discussions',
    posts: [
      {
        id: '1',
        title: 'Confused about ANOVA test',
        content: 'Can someone explain when to use ANOVA vs Chi-square?',
        category: 'question',
        author: 'student_05',
        isAnonymous: false,
        timestamp: new Date('2025-08-21T14:00:00'),
        likes: 8,
        replies: 3,
        tags: ['statistics', 'test', 'exam']
      }
    ]
  }
]

const categories = [
  { id: 'all', label: 'All Posts', icon: MessageSquare },
  { id: 'question', label: 'Questions', icon: HelpCircle },
  { id: 'announcement', label: 'Announcements', icon: Megaphone }
]

// -------------------- Component --------------------
export function CampusForum() {
  const [selectedForum, setSelectedForum] = useState<Forum | null>(null)
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

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  const handleCreatePost = () => {
    if (!selectedForum) return
    const newPostData: ForumPost = {
      id: String(selectedForum.posts.length + 1),
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      author: 'current_student',
      isAnonymous: newPost.isAnonymous,
      timestamp: new Date(),
      likes: 0,
      replies: 0,
      tags: newPost.tags.split(',').map(t => t.trim()).filter(Boolean)
    }
    selectedForum.posts.unshift(newPostData) // prototype only
    setIsCreating(false)
    setNewPost({ title: '', content: '', category: 'question', isAnonymous: true, tags: '' })
  }

  if (!selectedForum) {
    // Forum Selection Page
    return (
      <div className="space-y-6">
        <div className="text-center py-6 px-4 sm:py-8 sm:px-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl campus-shadow-lg text-white relative overflow-hidden mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-white/20 rounded-full">
                <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-['Poppins']">
                Campus Forums
              </h2>
            </div>
            <p className="text-blue-50 text-base sm:text-lg mb-4">
              Join discussions with peers and tutors across different subjects
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Collaborate with classmates</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Subject-specific discussions</span>
              </div>
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4" />
                <span>Tutor guidance available</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {forums.map(forum => (
            <Card key={forum.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{forum.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{forum.description}</p>
                <Button onClick={() => setSelectedForum(forum)}>Enter Forum</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // Inside a specific forum
  const filteredPosts = selectedForum.posts.filter(post =>
    activeCategory === 'all' || post.category === activeCategory
  ).sort((a, b) => {
    if (sortBy === 'recent') return b.timestamp.getTime() - a.timestamp.getTime()
    if (sortBy === 'popular') return b.likes - a.likes
    if (sortBy === 'replies') return b.replies - a.replies
    return 0
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between p-4 sm:p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl shadow-md mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">{selectedForum.name}</h2>
          <p className="text-white/80">{selectedForum.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setSelectedForum(null)} className="bg-white/20 text-white hover:bg-white/30">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button className="bg-white text-indigo-600 hover:bg-gray-100">
                <Plus className="h-4 w-4 mr-1" /> New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="Post title"
                />
                <Select value={newPost.category} onValueChange={(v: any) => setNewPost({ ...newPost, category: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="question">Question</SelectItem>
                    <SelectItem value="announcement">Announcement</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  value={newPost.tags}
                  onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                  placeholder="Tags (comma separated)"
                />
                <Textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="Write your question or announcement here..."
                />
                <div className="flex justify-between items-center">
                  <Button
                    variant={newPost.isAnonymous ? "default" : "outline"}
                    onClick={() => setNewPost({ ...newPost, isAnonymous: !newPost.isAnonymous })}
                  >
                    {newPost.isAnonymous ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                    {newPost.isAnonymous ? 'Anonymous' : 'With Profile'}
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsCreating(false)}>Cancel</Button>
                    <Button onClick={handleCreatePost}>Post</Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="grid w-full grid-cols-3 lg:w-auto">
                {categories.map(cat => {
                  const Icon = cat.icon
                  return (
                    <TabsTrigger key={cat.id} value={cat.id} className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {cat.label}
                    </TabsTrigger>
                  )
                })}
              </TabsList>
            </Tabs>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
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
        {filteredPosts.map(post => {
          const categoryData = categories.find(c => c.id === post.category)
          const CategoryIcon = categoryData?.icon || MessageSquare
          return (
            <Card key={post.id} className={`hover:shadow-md transition-shadow 
              ${post.author.toLowerCase().includes("lecturer") ? "bg-blue-50 border-blue-200" : ""}`
            }>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <CategoryIcon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h4>{post.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{post.isAnonymous ? 'Anonymous' : post.author}</span>
                        {
                          post.isTutor && 
                          <Badge className="bg-blue-600 text-white flex items-center gap-1">
                            <GraduationCap size={14} />
                            Tutor
                          </Badge>
                        }
                        <span>• {formatTimeAgo(post.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline">{categoryData?.label}</Badge>
                </div>
                <p className="text-sm">{post.content}</p>
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">#{tag}</Badge>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Heart className="h-4 w-4" /> {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <MessageSquare className="h-4 w-4" /> {post.replies}
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm"><Flag className="h-4 w-4" /></Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
