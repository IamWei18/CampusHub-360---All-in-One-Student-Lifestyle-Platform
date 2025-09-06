import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Textarea } from "./ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Alert, AlertDescription } from "./ui/alert";
import { Switch } from "./ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Heart,
  Brain,
  Phone,
  Clock,
  Smile,
  Meh,
  Frown,
  Plus,
  TrendingUp,
  Wind,
  MessageCircle,
  ExternalLink,
  PlayCircle,
  PauseCircle,
  RotateCcw,
  Lightbulb,
  HeartHandshake,
  Users,
  Calendar,
  BookOpen,
  Video,
  HelpCircle,
  Shield,
  Gamepad2,
  Send,
  AlertTriangle,
  UserPlus,
  MapPin,
  Mic,
  Palette,
  Music,
  FileText,
  Download,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle,
  Target,
  Zap,
  Globe,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";

const moodEmojis = [
  {
    emoji: "😢",
    label: "Very Sad",
    value: 1,
    color: "text-red-500",
  },
  {
    emoji: "😕",
    label: "Sad",
    value: 2,
    color: "text-orange-500",
  },
  {
    emoji: "😐",
    label: "Neutral",
    value: 3,
    color: "text-yellow-500",
  },
  {
    emoji: "😊",
    label: "Happy",
    value: 4,
    color: "text-green-500",
  },
  {
    emoji: "😄",
    label: "Very Happy",
    value: 5,
    color: "text-emerald-500",
  },
];

const resources = [
  {
    type: "article",
    title: "Understanding College Stress",
    description:
      "Learn about common sources of stress and how to manage them effectively.",
    readTime: "5 min read",
    category: "Stress Management",
    icon: BookOpen,
  },
  {
    type: "video",
    title: "Meditation for Beginners",
    description:
      "A guided 10-minute meditation session to help you relax and focus.",
    readTime: "10 min watch",
    category: "Mindfulness",
    icon: Video,
  },
  {
    type: "faq",
    title: "Mental Health FAQ",
    description:
      "Common questions about mental health services and resources on campus.",
    readTime: "3 min read",
    category: "Information",
    icon: HelpCircle,
  },
];

const assessmentTools = [
  {
    title: "Stress Level Assessment",
    description:
      "Quick 5-minute assessment to evaluate your current stress levels.",
    questions: 10,
    category: "Stress",
    color: "from-red-500 to-orange-500",
  },
  {
    title: "Anxiety Screening",
    description:
      "Confidential screening to understand your anxiety patterns.",
    questions: 7,
    category: "Anxiety",
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "Depression Check-in",
    description:
      "Self-assessment tool to monitor your emotional wellbeing.",
    questions: 9,
    category: "Depression",
    color: "from-blue-500 to-purple-500",
  },
];

const sharingPosts = [
  {
    id: 1,
    content:
      "Feeling overwhelmed with finals coming up. Anyone else struggling with time management?",
    timestamp: "2 hours ago",
    replies: 8,
    supportCount: 12,
  },
  {
    id: 2,
    content:
      "Just wanted to share that therapy has been really helpful. Don't hesitate to reach out for support.",
    timestamp: "5 hours ago",
    replies: 15,
    supportCount: 24,
  },
  {
    id: 3,
    content:
      "Having trouble sleeping lately. Any tips for better sleep hygiene?",
    timestamp: "1 day ago",
    replies: 6,
    supportCount: 9,
  },
];

const peerSessions = [
  {
    title: "Study Stress Support Circle",
    time: "Today 7:00 PM",
    facilitator: "Sarah M.",
    spots: 3,
    topic: "Managing Academic Pressure",
  },
  {
    title: "Mindful Monday Check-in",
    time: "Tomorrow 6:00 PM",
    facilitator: "Alex K.",
    spots: 5,
    topic: "Week Ahead Mindfulness",
  },
];

const companionRequests = [
  {
    activity: "Visit Counseling Center",
    description:
      "First-time appointment, looking for someone to go with",
    timeNeeded: "1 hour",
    preferredTime: "This week",
    responses: 2,
  },
  {
    activity: "Campus Wellness Walk",
    description:
      "Daily morning walk around campus for mental health",
    timeNeeded: "30 minutes",
    preferredTime: "Weekday mornings",
    responses: 5,
  },
];

const upcomingEvents = [
  {
    title: "Stress Relief Workshop",
    date: "Dec 15",
    time: "3:00 PM",
    location: "Student Center Room 201",
    type: "Workshop",
  },
  {
    title: "Mental Health Awareness Talk",
    date: "Dec 18",
    time: "12:00 PM",
    location: "Main Auditorium",
    type: "Presentation",
  },
];

const diaryEntries = [
  {
    id: 1,
    date: "2024-12-26",
    content: "Had a productive study session today...",
    mood: 4,
    aiScore: 7.5,
  },
  {
    id: 2,
    date: "2024-12-25",
    content: "Christmas with family was nice but...",
    mood: 3,
    aiScore: 6.2,
  },
  {
    id: 3,
    date: "2024-12-24",
    content: "Feeling anxious about upcoming exams...",
    mood: 2,
    aiScore: 4.1,
  },
];

const stressReliefGames = [
  {
    id: "whack",
    title: "Whack-a-Distraction",
    description: "Bonk procrastination away!",
    duration: "2-5 min",
    icon: "🔨",
    color: "from-pink-500 to-rose-500",
    buttonText: "Start Whacking",
  },
  {
    id: "tear",
    title: "To-Do List Tear-Up",
    description: "The most satisfying tear you'll have all day.",
    duration: "1-3 min",
    icon: "✂️",
    color: "from-orange-500 to-amber-500",
    buttonText: "Start Ripping",
  },
  {
    id: "goblin",
    title: "Gratitude Goblin",
    description: "Show this grump some good things.",
    duration: "3-7 min",
    icon: "👺",
    color: "from-green-500 to-emerald-500",
    buttonText: "Help Him",
  },
];

const wellnessNudges = [
  {
    type: "break",
    title: "Time for a Break! 🌟",
    message:
      "You've been focused for 2 hours. Take a 15-minute break to recharge.",
    action: "Start Break Timer",
    icon: Clock,
    gradient: "from-blue-500 to-blue-600",
  },
  {
    type: "quote",
    title: "Daily Inspiration ✨",
    message:
      '"Progress, not perfection, is the goal." - You\'re doing amazing!',
    action: "Share Quote",
    icon: Lightbulb,
    gradient: "from-purple-500 to-purple-600",
  },
  {
    type: "breathing",
    title: "Feeling Stressed? 🧘‍♀️",
    message:
      "Try our 4-7-8 breathing exercise to calm your mind.",
    action: "Start Breathing",
    icon: Wind,
    gradient: "from-green-500 to-green-600",
  },
];

const counselingResources = [
  {
    name: "Campus Counseling Center",
    type: "On-Campus",
    phone: "(555) 123-HELP",
    hours: "Mon-Fri: 8:00 AM - 6:00 PM",
    status: "available",
    description:
      "Professional counseling and mental health services",
  },
  {
    name: "Crisis Helpline",
    type: "Emergency",
    phone: "988",
    hours: "24/7 Available",
    status: "urgent",
    description: "National Suicide Prevention Lifeline",
  },
  {
    name: "Student Wellness Peer Support",
    type: "Peer Support",
    phone: "(555) 123-PEER",
    hours: "Daily: 10:00 AM - 10:00 PM",
    status: "available",
    description: "Confidential peer-to-peer support chat",
  },
  {
    name: "Mindfulness & Meditation Group",
    type: "Group Session",
    phone: "wellness@campus.edu",
    hours: "Tuesdays & Thursdays: 7:00 PM",
    status: "available",
    description:
      "Weekly mindfulness sessions in Student Center",
  },
];

// FAQ Data for Resources tab
const faqData = [
  {
    question: "When should I seek professional help?",
    answer: "If you are experiencing persistent sadness, anxiety, or thoughts of self-harm, please reach out to a mental health professional immediately.",
  },
  {
    question: "Is my information confidential?",
    answer: "Yes, all information shared through our wellness services is kept strictly confidential in accordance with privacy laws.",
  },
  {
    question: "What if I am in crisis?",
    answer: "If you are in immediate danger, call 911. For mental health crises, contact the 988 Suicide & Crisis Lifeline.",
  },
];

// Sample mood history data
const moodHistoryData = [
  { date: "Mon", mood: 3, note: "Stressful exam week" },
  { date: "Tue", mood: 4, note: "Good study session" },
  { date: "Wed", mood: 2, note: "Assignment overload" },
  { date: "Thu", mood: 4, note: "Productive day" },
  { date: "Fri", mood: 5, note: "Weekend vibes!" },
  { date: "Sat", mood: 4, note: "Relaxing day" },
  { date: "Sun", mood: 3, note: "Preparing for week" },
];

// Game Components
function WhackADistractionGame({ onClose }: { onClose: () => void }) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [distractions, setDistractions] = useState<Array<{ id: number; position: number; visible: boolean }>>([]);

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameActive(false);
    }
  }, [gameActive, timeLeft]);

  useEffect(() => {
    if (gameActive) {
      const interval = setInterval(() => {
        const newDistraction = {
          id: Date.now(),
          position: Math.floor(Math.random() * 9),
          visible: true,
        };
        setDistractions(prev => [...prev, newDistraction]);
        
        setTimeout(() => {
          setDistractions(prev => prev.filter(d => d.id !== newDistraction.id));
        }, 1500);
      }, 800);
      
      return () => clearInterval(interval);
    }
  }, [gameActive]);

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setTimeLeft(30);
    setDistractions([]);
  };

  const whackDistraction = (id: number) => {
    setScore(prev => prev + 1);
    setDistractions(prev => prev.filter(d => d.id !== id));
    // Play bonk sound effect (would be actual audio in production)
    console.log("Bonk!");
  };

  return (
    <div className="text-center space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>Score: {score}</div>
        <div>Time: {timeLeft}s</div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 w-64 h-64 mx-auto">
        {Array.from({ length: 9 }).map((_, index) => {
          const distraction = distractions.find(d => d.position === index && d.visible);
          return (
            <div
              key={index}
              className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center border-2 border-gray-300 cursor-pointer hover:bg-gray-100"
              onClick={() => distraction && whackDistraction(distraction.id)}
            >
              {distraction && (
                <div className="text-2xl animate-bounce">
                  📱
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!gameActive && timeLeft === 30 ? (
        <Button onClick={startGame} className="bg-pink-500 hover:bg-pink-600">
          Start Game
        </Button>
      ) : !gameActive && timeLeft === 0 ? (
        <div className="space-y-2">
          <p className="text-lg font-semibold">Game Over!</p>
          <p>Final Score: {score}</p>
          <Button onClick={startGame} className="bg-pink-500 hover:bg-pink-600">
            Play Again
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function TodoTearUpGame({ onClose }: { onClose: () => void }) {
  const [torn, setTorn] = useState(false);
  const [tearProgress, setTearProgress] = useState(0);

  const todoItems = [
    "Study for final exams (5 subjects)",
    "Complete research paper (10 pages)",
    "Finish group project presentation",
    "Submit scholarship applications",
    "Organize dorm room",
    "Call parents back",
    "Exercise (been saying this for weeks)",
    "Grocery shopping",
    "Laundry (pile getting scary)",
    "Fix broken laptop",
    "Plan spring break",
    "Find summer internship",
  ];

  const handleTear = () => {
    if (tearProgress < 100) {
      setTearProgress(prev => Math.min(prev + 10, 100));
      // Play ripping sound effect
      console.log("Rip!");
      
      if (tearProgress + 10 >= 100) {
        setTimeout(() => setTorn(true), 500);
      }
    }
  };

  const resetGame = () => {
    setTorn(false);
    setTearProgress(0);
  };

  return (
    <div className="text-center space-y-4">
      <div className="relative mx-auto w-80 h-96 bg-yellow-50 border border-gray-300 rounded-lg overflow-hidden">
        {!torn ? (
          <div 
            className="p-4 cursor-pointer select-none relative"
            onClick={handleTear}
            style={{
              clipPath: tearProgress > 0 ? `polygon(0 0, ${100 - tearProgress}% 0, ${100 - tearProgress/2}% 100%, 0 100%)` : 'none'
            }}
          >
            <h3 className="font-bold text-lg mb-4 text-red-600">OVERWHELMING TO-DO LIST</h3>
            <div className="text-left text-sm space-y-1">
              {todoItems.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span>•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            
            {tearProgress > 0 && (
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-transparent to-white opacity-50" />
            )}
          </div>
        ) : (
          <div className="p-8 flex flex-col items-center justify-center h-full">
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-xl font-semibold text-green-600">Stress Released!</p>
            <p className="text-sm text-gray-600 mt-2">You've virtually destroyed that overwhelming list</p>
          </div>
        )}
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-orange-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${tearProgress}%` }}
        />
      </div>

      <p className="text-sm text-gray-600">
        {!torn ? "Click to tear up your stress!" : "Feel better?"}
      </p>

      {torn && (
        <Button onClick={resetGame} className="bg-orange-500 hover:bg-orange-600">
          Tear Another List
        </Button>
      )}
    </div>
  );
}

function GratitudeGoblinGame({ onClose }: { onClose: () => void }) {
  const [goblinMood, setGoblinMood] = useState(0); // 0 = grumpy, 1 = neutral, 2 = happy
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const positiveItems = [
    { id: "sun", icon: "☀️", name: "Sunshine" },
    { id: "coffee", icon: "☕", name: "Coffee" },
    { id: "music", icon: "🎵", name: "Music" },
    { id: "friends", icon: "👥", name: "Friends" },
    { id: "pizza", icon: "🍕", name: "Pizza" },
    { id: "books", icon: "📚", name: "Books" },
    { id: "nature", icon: "🌳", name: "Nature" },
    { id: "games", icon: "🎮", name: "Games" },
  ];

  const goblinFaces = ["😠", "😐", "😊"];
  const goblinMessages = [
    "Grumpy goblin needs cheering up...",
    "Goblin is feeling a bit better!",
    "Happy goblin! Great job!"
  ];

  const handleDragStart = (item: string) => {
    setDraggedItem(item);
  };

  const handleDrop = () => {
    if (draggedItem) {
      setScore(prev => prev + 1);
      if (score < 3) {
        setGoblinMood(Math.min(goblinMood + 1, 2));
      }
      // Play happy sound
      console.log("Goblin happy sound!");
      setDraggedItem(null);
    }
  };

  const resetGame = () => {
    setGoblinMood(0);
    setScore(0);
  };

  return (
    <div className="text-center space-y-6">
      <div className="space-y-4">
        {/* Goblin */}
        <div 
          className="w-32 h-32 mx-auto bg-green-100 rounded-full flex items-center justify-center text-6xl cursor-pointer transition-all duration-500 hover:scale-105"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          {goblinFaces[goblinMood]}
        </div>
        
        <p className="text-lg font-semibold">{goblinMessages[goblinMood]}</p>
        <p className="text-sm text-gray-600">Items given: {score}</p>
      </div>

      {/* Positive Items */}
      <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
        {positiveItems.map((item) => (
          <div
            key={item.id}
            className="w-16 h-16 bg-yellow-100 rounded-lg flex flex-col items-center justify-center cursor-grab active:cursor-grabbing hover:bg-yellow-200 transition-colors"
            draggable
            onDragStart={() => handleDragStart(item.id)}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-xs">{item.name}</span>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-600">
        Drag positive items to the goblin to cheer them up!
      </p>

      {goblinMood === 2 && (
        <div className="space-y-2">
          <p className="text-lg font-semibold text-green-600">Mission Accomplished! 🎉</p>
          <Button onClick={resetGame} className="bg-green-500 hover:bg-green-600">
            Help Another Goblin
          </Button>
        </div>
      )}
    </div>
  );
}

export function WellnessHub() {
  const [selectedMood, setSelectedMood] = useState<
    number | null
  >(null);
  const [moodNote, setMoodNote] = useState("");
  const [isBreathingActive, setIsBreathingActive] =
    useState(false);
  const [breathingPhase, setBreathingPhase] = useState<
    "inhale" | "hold" | "exhale"
  >("inhale");
  const [breathingCount, setBreathingCount] = useState(0);
  const [breathingTimer, setBreathingTimer] =
    useState<NodeJS.Timeout | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  // Game Modal States
  const [activeGame, setActiveGame] = useState<string | null>(null);

  // Diary and AI Mood States
  const [diaryContent, setDiaryContent] = useState("");
  const [aiMoodEnabled, setAiMoodEnabled] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [showDiaryEntry, setShowDiaryEntry] = useState(false);
  const [entries, setEntries] = useState(diaryEntries);

  // Sharing Wall States
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState(sharingPosts);

  // Expression States
  const [expressionMode, setExpressionMode] = useState<
    "text" | "draw" | "music"
  >("text");

  // Companion States
  const [companionActivity, setCompanionActivity] =
    useState("");
  const [companionDescription, setCompanionDescription] =
    useState("");

  // For AI Companion
  const [aiConversation, setAiConversation] = useState<{role: "user" | "ai", text: string}[]>([]);
  const [textMessage, setTextMessage] = useState("");
  
  // Example message sender
  const sendMessage = () => {
    if (textMessage.trim()) {
      setAiConversation([...aiConversation, { role: "user", text: textMessage }]);
      // TODO: Call your AI backend (text-to-text or speech-to-text)
      setTimeout(() => {
        setAiConversation((prev) => [
          ...prev,
          { role: "ai", text: "I hear you. That must feel overwhelming, can you tell me more?" },
        ]);
      }, 1000);
      setTextMessage("");
    }
  };
  
  // Voice recording (placeholder functions)
  const startRecording = () => {
    console.log("🎙️ Recording started...");
    // integrate with Web Speech API or recorder.js
  };
  
  const stopRecording = () => {
    console.log("🛑 Recording stopped.");
    // convert speech → text → send to AI → reply
  };

  const openGame = (gameId: string) => {
    setActiveGame(gameId);
  };

  const closeGame = () => {
    setActiveGame(null);
  };

  const startBreathingExercise = () => {
    setIsBreathingActive(true);
    setBreathingPhase("inhale");
    setBreathingCount(0);

    const runCycle = () => {
      // Inhale for 4 seconds
      setBreathingPhase("inhale");
      setTimeout(() => {
        // Hold for 7 seconds
        setBreathingPhase("hold");
        setTimeout(() => {
          // Exhale for 8 seconds
          setBreathingPhase("exhale");
          setTimeout(() => {
            setBreathingCount((prev) => prev + 1);
            if (breathingCount < 4) {
              // 4 cycles
              runCycle();
            } else {
              setIsBreathingActive(false);
            }
          }, 8000);
        }, 7000);
      }, 4000);
    };

    runCycle();
  };

  const stopBreathingExercise = () => {
    setIsBreathingActive(false);
    if (breathingTimer) {
      clearTimeout(breathingTimer);
    }
  };

  const submitMoodEntry = () => {
    if (selectedMood) {
      // Here you would normally save to backend
      console.log("Mood entry:", {
        mood: selectedMood,
        note: moodNote,
        timestamp: new Date(),
      });
      setSelectedMood(null);
      setMoodNote("");
    }
  };

  const saveDiaryEntry = () => {
    if (diaryContent.trim()) {
      const newEntry = {
        id: entries.length + 1,
        date: new Date().toISOString().split("T")[0],
        content: diaryContent.trim(),
        mood: selectedMood || 3,
        aiScore: aiMoodEnabled ? Math.random() * 10 : null,
      };
      setEntries([newEntry, ...entries]);
      setDiaryContent("");
      setShowDiaryEntry(false);

      // Simulate AI mood analysis alert
      if (
        aiMoodEnabled &&
        newEntry.aiScore &&
        newEntry.aiScore <= 3
      ) {
        console.log(
          "Low mood score detected - would alert counseling team",
        );
      }
    }
  };

  const submitSharingPost = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        content: newPost.trim(),
        timestamp: "Just now",
        replies: 0,
        supportCount: 0,
      };
      setPosts([post, ...posts]);
      setNewPost("");
    }
  };

  const submitCompanionRequest = () => {
    if (companionActivity && companionDescription) {
      console.log("Companion request:", {
        activity: companionActivity,
        description: companionDescription,
      });
      setCompanionActivity("");
      setCompanionDescription("");
    }
  };

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const averageMood =
    moodHistoryData.reduce((acc, day) => acc + day.mood, 0) /
    moodHistoryData.length;

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Welcome Header */}
      <div className="text-center py-6 px-4 sm:py-8 sm:px-6 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 rounded-2xl campus-shadow-lg text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-full">
              <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-['Poppins']">
              Wellness Hub
            </h2>
          </div>
          <p className="text-blue-50 text-base sm:text-lg mb-4">
            Your mental health and wellbeing companion
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>Track Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span>AI Wellness Coach</span>
            </div>
            <div className="flex items-center gap-2">
              <HeartHandshake className="h-4 w-4" />
              <span>Get Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation Guide */}
      <Card className="campus-shadow bg-white/90 backdrop-blur-sm border-green-200">
        <CardHeader>
          <CardTitle className="text-center text-campus-navy">
            Quick Navigation Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-pink-50 border-pink-200"
              onClick={() => setActiveTab("talk-listen")}
            >
              <MessageCircle className="h-6 w-6 text-pink-500" />
              <div className="text-center">
                <p className="font-medium">
                  Just want to talk?
                </p>
                <p className="text-xs text-muted-foreground">
                  → Go to Talk & Listen
                </p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-green-50 border-green-200"
              onClick={() => setActiveTab("resources")}
            >
              <Phone className="h-6 w-6 text-green-500" />
              <div className="text-center">
                <p className="font-medium">
                  Need professional help?
                </p>
                <p className="text-xs text-muted-foreground">
                  → Go to Resources
                </p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-red-50 border-red-200"
              onClick={() => setActiveTab("resources")}
            >
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <div className="text-center">
                <p className="font-medium">
                  In crisis or danger?
                </p>
                <p className="text-xs text-muted-foreground">
                  → Go to Support & Resources
                </p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <div className="overflow-x-auto">
          <TabsList
            className="flex w-full h-auto p-1 bg-white/70 backdrop-blur-sm space-x-1 sm:space-x-2 min-w-max"
          >
            <TabsTrigger
              value="overview"
              className="flex flex-col gap-1 py-3 px-2 text-xs sm:text-sm"
            >
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
              <span className="sm:hidden">Home</span>
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              className="flex flex-col gap-1 py-3 px-2 text-xs sm:text-sm"
            >
              <BookOpen className="h-4 w-4" />
              <span>Resources</span>
            </TabsTrigger>
            <TabsTrigger
              value="talk-listen"
              className="flex flex-col gap-1 py-3 px-2 text-xs sm:text-sm"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Talk & Listen</span>
              <span className="sm:hidden">Talk</span>
            </TabsTrigger>
            <TabsTrigger
              value="ai-companion"
              className="flex flex-col gap-1 py-3 px-2 text-xs sm:text-sm"
            >
              <Mic className="h-4 w-4" />
              <span className="hidden sm:inline">AI Companion</span>
              <span className="sm:hidden">AI</span>
            </TabsTrigger>
            <TabsTrigger
              value="community"
              className="flex flex-col gap-1 py-3 px-2 text-xs sm:text-sm"
            >
              <Users className="h-4 w-4" />
              <span>Community</span>
            </TabsTrigger>
            <TabsTrigger
              value="journal"
              className="flex flex-col gap-1 py-3 px-2 text-xs sm:text-sm"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">My Space</span>
              <span className="sm:hidden">Journal</span>
            </TabsTrigger>
            <TabsTrigger
              value="games"
              className="flex flex-col gap-1 py-3 px-2 text-xs sm:text-sm"
            >
              <Gamepad2 className="h-4 w-4" />
              <span className="hidden sm:inline">Relief Games</span>
              <span className="sm:hidden">Games</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Mood Check-in */}
            <Card className="lg:col-span-2 campus-shadow hover-lift bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-t-xl">
                <CardTitle className="flex items-center gap-3 text-campus-navy">
                  <div className="p-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg">
                    <Smile className="h-5 w-5 text-white" />
                  </div>
                  Daily Mood Check-in
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-4 sm:p-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-4">
                    How are you feeling today?
                  </p>
                  <div className="grid grid-cols-5 gap-1 sm:gap-2">
                    {moodEmojis.map((mood) => (
                      <button
                        key={mood.value}
                        onClick={() =>
                          setSelectedMood(mood.value)
                        }
                        className={`flex flex-col items-center p-2 sm:p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                          selectedMood === mood.value
                            ? "border-campus-gold bg-campus-gold/10 ring-2 ring-campus-gold/30"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <span className="text-xl sm:text-3xl mb-1 sm:mb-2">
                          {mood.emoji}
                        </span>
                        <span className="text-xs font-medium text-center">
                          {mood.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedMood && (
                  <div className="space-y-4 animate-in fade-in-50 duration-300">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Tell us more (optional)
                      </label>
                      <Textarea
                        placeholder="What's on your mind today?"
                        value={moodNote}
                        onChange={(e) =>
                          setMoodNote(e.target.value)
                        }
                        className="resize-none"
                        rows={3}
                      />
                    </div>
                    <Button
                      onClick={submitMoodEntry}
                      className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Log Mood Entry
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Breathing Exercise */}
            <Card className="campus-shadow hover-lift bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-t-xl">
                <CardTitle className="flex items-center gap-3 text-campus-navy">
                  <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                    <Wind className="h-5 w-5 text-white" />
                  </div>
                  Breathing Exercise
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="space-y-6">
                  <div
                    className={`w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full border-4 flex items-center justify-center transition-all duration-1000 ${
                      isBreathingActive
                        ? breathingPhase === "inhale"
                          ? "border-green-500 bg-green-50 scale-110"
                          : breathingPhase === "hold"
                            ? "border-yellow-500 bg-yellow-50 scale-110"
                            : "border-blue-500 bg-blue-50 scale-90"
                        : "border-gray-300 bg-gray-50"
                    }`}
                  >
                    <div className="text-center">
                      {isBreathingActive ? (
                        <div>
                          <p className="text-sm font-medium capitalize">
                            {breathingPhase}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Cycle {breathingCount + 1}/4
                          </p>
                        </div>
                      ) : (
                        <Wind className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      4-7-8 Breathing Technique
                    </p>
                    {!isBreathingActive ? (
                      <Button
                        onClick={startBreathingExercise}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                      >
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Start Exercise
                      </Button>
                    ) : (
                      <Button
                        onClick={stopBreathingExercise}
                        variant="outline"
                        className="w-full"
                      >
                        <PauseCircle className="h-4 w-4 mr-2" />
                        Stop
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mood History Chart */}
          <Card className="campus-shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle className="flex items-center gap-3 text-campus-navy">
                  <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  Mood Trends (Last 7 Days)
                </CardTitle>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Average Mood
                  </p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {averageMood.toFixed(1)}/5
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={moodHistoryData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e2e8f0"
                    />
                    <XAxis
                      dataKey="date"
                      stroke="#64748b"
                      fontSize={12}
                    />
                    <YAxis
                      domain={[0, 6]}
                      stroke="#64748b"
                      fontSize={12}
                    />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload[0]) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                              <p className="font-medium">
                                {label}
                              </p>
                              <p className="text-sm text-indigo-600">
                                Mood: {data.mood}/5
                              </p>
                              <p className="text-xs text-gray-500">
                                {data.note}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="mood"
                      stroke="#4f46e5"
                      strokeWidth={3}
                      dot={{
                        fill: "#4f46e5",
                        strokeWidth: 2,
                        r: 4,
                      }}
                      activeDot={{ r: 6, stroke: "#4f46e5" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* AI Wellness Nudges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {wellnessNudges.map((nudge, index) => (
              <Card
                key={index}
                className="campus-shadow hover-lift bg-white/90 backdrop-blur-sm"
              >
                <CardContent className="p-4">
                  <div
                    className={`flex items-center gap-3 mb-3 p-3 rounded-lg bg-gradient-to-r ${nudge.gradient}`}
                  >
                    <nudge.icon className="h-5 w-5 text-white" />
                    <h3 className="text-sm font-semibold text-white">
                      {nudge.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {nudge.message}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                  >
                    {nudge.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          {/* Frequently Asked Questions */}
          <Card className="campus-shadow bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-xl">
              <CardTitle className="flex items-center gap-3 text-campus-navy">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                  <HelpCircle className="h-5 w-5 text-white" />
                </div>
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                    >
                      <span className="font-medium text-campus-navy">
                        {faq.question}
                      </span>
                      {expandedFAQ === index ? (
                        <ChevronUp className="h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                    {expandedFAQ === index && (
                      <div className="p-4 bg-white border-t border-gray-200">
                        <p className="text-gray-700">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resource Library */}
          <Card className="campus-shadow bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
              <CardTitle className="flex items-center gap-3 text-campus-navy">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                Resource Library
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {resources.map((resource, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <resource.icon className="h-5 w-5 text-blue-600" />
                      <Badge
                        variant="secondary"
                        className="text-xs"
                      >
                        {resource.category}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-campus-navy mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {resource.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {resource.readTime}
                      </span>
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Self-Assessment Tools */}
          <Card className="campus-shadow bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-xl">
              <CardTitle className="flex items-center gap-3 text-campus-navy">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                Self-Assessment Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {assessmentTools.map((tool, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300"
                  >
                    <div
                      className={`h-2 bg-gradient-to-r ${tool.color} rounded-full mb-4`}
                    />
                    <Badge
                      variant="outline"
                      className="mb-2"
                    >
                      {tool.category}
                    </Badge>
                    <h3 className="font-semibold text-campus-navy mb-2">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {tool.description}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-gray-500">
                        {tool.questions} questions
                      </span>
                      <span className="text-xs text-gray-500">
                        ~5 minutes
                      </span>
                    </div>
                    <Button
                      size="sm"
                      className="w-full"
                      variant="outline"
                    >
                      Start Assessment
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Professional Support Resources */}
          <Card className="campus-shadow bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-xl">
              <CardTitle className="flex items-center gap-3 text-campus-navy">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                  <HeartHandshake className="h-5 w-5 text-white" />
                </div>
                Support & Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {counselingResources.map((resource, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border transition-all duration-300 ${
                      resource.status === "urgent"
                        ? "bg-red-50/50 border-red-200"
                        : "bg-green-50/50 border-green-200"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-campus-navy mb-1">
                          {resource.name}
                        </h3>
                        <Badge
                          variant={
                            resource.status === "urgent"
                              ? "destructive"
                              : "secondary"
                          }
                          className="text-xs mb-2"
                        >
                          {resource.type}
                        </Badge>
                      </div>
                      <div className="flex gap-2 ml-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                        >
                          <Phone className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {resource.description}
                    </p>
                    <div className="space-y-2 text-sm text-campus-navy">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">Phone:</span>
                        <span className="font-mono">{resource.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">Hours:</span>
                        <span>{resource.hours}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Talk & Listen Tab */}
        <TabsContent value="talk-listen" className="space-y-6">
          {/* Anonymous Sharing Wall */}
          <Card className="campus-shadow bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-t-xl">
              <CardTitle className="flex items-center gap-3 text-campus-navy">
                <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                Anonymous Sharing Wall
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4 mb-6">
                <Textarea
                  placeholder="Share what's on your mind anonymously..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="min-h-20"
                />
                <Button
                  onClick={submitSharingPost}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  disabled={!newPost.trim()}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Share Anonymously
                </Button>
              </div>

              <div className="space-y-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <p className="text-gray-800 mb-3">{post.content}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{post.timestamp}</span>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          {post.replies}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {post.supportCount}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Peer Listening Sessions */}
          <Card className="campus-shadow bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-t-xl">
              <CardTitle className="flex items-center gap-3 text-campus-navy">
                <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                  <Users className="h-5 w-5 text-white" />
                </div>
                Peer Listening Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {peerSessions.map((session, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300"
                  >
                    <h3 className="font-semibold text-campus-navy mb-2">
                      {session.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {session.topic}
                    </p>
                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        <span>{session.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3" />
                        <span>Facilitated by {session.facilitator}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UserPlus className="h-3 w-3" />
                        <span>{session.spots} spots available</span>
                      </div>
                    </div>
                    <Button size="sm" className="w-full mt-3" variant="outline">
                      Join Session
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Expression Area */}
          <Card className="campus-shadow bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-t-xl">
              <CardTitle className="flex items-center gap-3 text-campus-navy">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg">
                  <Palette className="h-5 w-5 text-white" />
                </div>
                Expression Area
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4">
                <div className="flex gap-2 mb-4">
                  {[
                    { id: "text", label: "Write", icon: FileText },
                    { id: "draw", label: "Draw", icon: Palette },
                    { id: "music", label: "Music", icon: Music },
                  ].map((mode) => (
                    <Button
                      key={mode.id}
                      variant={expressionMode === mode.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setExpressionMode(mode.id as any)}
                    >
                      <mode.icon className="h-4 w-4 mr-2" />
                      {mode.label}
                    </Button>
                  ))}
                </div>

                {expressionMode === "text" && (
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Express your thoughts and feelings through writing..."
                      className="min-h-32"
                    />
                    <Button className="w-full" variant="outline">
                      Save Expression
                    </Button>
                  </div>
                )}

                {expressionMode === "draw" && (
                  <div className="space-y-4">
                    <div className="h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <p className="text-gray-500">Drawing canvas would appear here</p>
                    </div>
                    <Button className="w-full" variant="outline">
                      Save Drawing
                    </Button>
                  </div>
                )}

                {expressionMode === "music" && (
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-100 rounded-lg text-center">
                      <Music className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-gray-500">Music expression tools would appear here</p>
                    </div>
                    <Button className="w-full" variant="outline">
                      Save Composition
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Companion */}
        <TabsContent value="ai-companion">
          <Card className="campus-shadow bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-t-xl">
              <CardTitle className="flex items-center gap-3 text-campus-navy">
                <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                  <Users className="h-5 w-5 text-white" />
                </div>
                1-on-1 AI Wellness Companion
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-6">
              <div className="text-start">
                Talk freely about your concerns, anxiety, or stress.  
                The AI listens and responds with support.
              </div>
              {/* Conversation Window */}
              <div className="h-64 overflow-y-auto border rounded-xl p-3 bg-gray-50">
                {aiConversation.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`mb-3 p-2 rounded-lg max-w-[75%] ${
                      msg.role === "user"
                        ? "bg-blue-100 ml-auto text-right"
                        : "bg-green-100 mr-auto text-left"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
        
              {/* Voice Control Buttons */}
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={startRecording}
                >
                  <Mic className="h-5 w-5" /> Start Talking
                </Button>
                <Button
                  variant="destructive"
                  className="flex items-center gap-2"
                  onClick={stopRecording}
                >
                  <div className="h-5 w-5"> Stop </div>
                </Button>
              </div>
        
              {/* Optional Text Input for fallback */}
              <div className="flex gap-2">
                <Input
                  placeholder="Or type your concern..."
                  value={textMessage}
                  onChange={(e) => setTextMessage(e.target.value)}
                />
                <Button onClick={sendMessage}>Send</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Community Tab */}
        <TabsContent value="community" className="space-y-6">
          {/* Companion Feature */}
          <Card className="campus-shadow bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 rounded-t-xl">
              <CardTitle className="flex items-center gap-3 text-campus-navy">
                <div className="p-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg">
                  <HeartHandshake className="h-5 w-5 text-white" />
                </div>
                Find a Companion
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4 mb-6">
                <Input
                  placeholder="What activity do you need support with?"
                  value={companionActivity}
                  onChange={(e) => setCompanionActivity(e.target.value)}
                />
                <Textarea
                  placeholder="Describe what kind of support you're looking for..."
                  value={companionDescription}
                  onChange={(e) => setCompanionDescription(e.target.value)}
                  className="min-h-20"
                />
                <Button
                  onClick={submitCompanionRequest}
                  className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
                  disabled={!companionActivity || !companionDescription}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Request Companion
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-campus-navy">Active Requests</h3>
                {companionRequests.map((request, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <h4 className="font-medium text-campus-navy mb-2">
                      {request.activity}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {request.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {request.timeNeeded}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {request.preferredTime}
                        </span>
                      </div>
                      <Button size="sm" variant="outline">
                        Offer Support
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="campus-shadow bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
              <CardTitle className="flex items-center gap-3 text-campus-navy">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                                    <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-campus-navy">
                        {event.title}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {event.type}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        <span>{event.date} at {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <Button size="sm" className="w-full mt-3" variant="outline">
                      Register
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Support Groups */}
          <Card className="campus-shadow bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-xl">
              <CardTitle className="flex items-center gap-3 text-campus-navy">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                  <Users className="h-5 w-5 text-white" />
                </div>
                Peer Support Groups
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-campus-navy mb-2">
                    Anxiety Support Circle
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    A safe space to share experiences with anxiety
                  </p>
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      <span>15 members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>Wednesday, 5:00 PM</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Join Group
                  </Button>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-campus-navy mb-2">
                    Academic Stress Management
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Strategies for managing academic pressure
                  </p>
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      <span>22 members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>Friday, 4:00 PM</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Join Group
                  </Button>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-campus-navy mb-2">
                    LGBTQ+ Wellness Group
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Mental health support for LGBTQ+ students
                  </p>
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      <span>18 members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>Monday, 6:00 PM</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Join Group
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Journal Tab */}
        <TabsContent value="journal" className="space-y-6">
          {/* Privacy Notice */}
          <Alert className="border-blue-200 bg-blue-50/50">
            <Shield className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Privacy Notice:</strong> Your diary entries are completely private and stored locally. You can export or delete them at any time. AI mood analysis requires your consent and helps identify when you might need support.
            </AlertDescription>
          </Alert>

          {/* Main Journal Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Write it Out Section */}
            <Card className="campus-shadow bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-xl">
                <CardTitle className="flex items-center gap-3 text-campus-navy">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  Write it Out
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-6">
                {/* Mood Selector */}
                <div>
                  <p className="text-sm font-medium mb-3 text-campus-navy">
                    How are you feeling?
                  </p>
                  <div className="flex gap-2 justify-center">
                    {moodEmojis.map((mood) => (
                      <button
                        key={mood.value}
                        onClick={() => setSelectedMood(mood.value)}
                        className={`flex items-center justify-center w-12 h-12 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                          selectedMood === mood.value
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      >
                        <span className="text-2xl">{mood.emoji}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text Area */}
                <div>
                  <Textarea
                    placeholder="Write your thoughts here... This is your private space."
                    value={diaryContent}
                    onChange={(e) => setDiaryContent(e.target.value)}
                    className="min-h-32 resize-none border-gray-200"
                  />
                </div>

                {/* AI Mood Analysis Consent */}
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="aiMoodConsent"
                      checked={aiMoodEnabled}
                      onCheckedChange={setAiMoodEnabled}
                      className="mt-1"
                    />
                    <label htmlFor="aiMoodConsent" className="text-sm text-yellow-800">
                      Enable AI mood analysis for wellness alerts (helps counselors identify when you might need support)
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={saveDiaryEntry}
                    disabled={!diaryContent.trim() && !selectedMood}
                    className="flex-1 bg-gray-500 hover:bg-gray-600"
                  >
                    Save Entry
                  </Button>
                  <Button
                    variant="destructive"
                    className="bg-red-500 hover:bg-red-600"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Need Help Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* My Entries Section */}
            <Card className="campus-shadow bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-xl">
                <CardTitle className="flex items-center justify-between text-campus-navy">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                      <Eye className="h-5 w-5 text-white" />
                    </div>
                    My Entries
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {entries.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-500 mb-1">
                          {new Date(entry.date).toLocaleDateString()}
                        </div>
                        <p className="text-sm text-gray-800 truncate">
                          {entry.content}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-2">
                        <span className="text-lg">
                          {moodEmojis.find(m => m.value === entry.mood)?.emoji}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {entries.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No entries yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Games Tab */}
        <TabsContent value="games" className="space-y-6">
          <Card className="campus-shadow bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-t-xl">
              <CardTitle className="flex items-center gap-3 text-campus-navy">
                <div className="p-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg">
                  <Gamepad2 className="h-5 w-5 text-white" />
                </div>
                Stress Relief Games
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stressReliefGames.map((game) => (
                  <div
                    key={game.id}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300 text-center"
                  >
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${game.color} flex items-center justify-center text-2xl`}
                    >
                      {game.icon}
                    </div>
                    <h3 className="font-semibold text-campus-navy mb-2">
                      {game.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {game.description}
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      Duration: {game.duration}
                    </p>
                    <Button 
                      onClick={() => openGame(game.id)}
                      className={`w-full bg-gradient-to-r ${game.color} hover:opacity-90 text-white`}
                    >
                      <PlayCircle className="h-4 w-4 mr-2" />
                      {game.buttonText}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Game Modals */}
      <Dialog open={activeGame !== null} onOpenChange={closeGame}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {activeGame === "whack" && "Whack-a-Distraction"}
              {activeGame === "tear" && "To-Do List Tear-Up"}
              {activeGame === "goblin" && "Gratitude Goblin"}
            </DialogTitle>
            <DialogDescription>
              {activeGame === "whack" && "Click on the distractions as they appear to whack them away and relieve stress!"}
              {activeGame === "tear" && "Click to tear up your overwhelming to-do list and feel the satisfaction of letting go."}
              {activeGame === "goblin" && "Drag positive items to the grumpy goblin to cheer them up and spread good vibes!"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            {activeGame === "whack" && <WhackADistractionGame onClose={closeGame} />}
            {activeGame === "tear" && <TodoTearUpGame onClose={closeGame} />}
            {activeGame === "goblin" && <GratitudeGoblinGame onClose={closeGame} />}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}