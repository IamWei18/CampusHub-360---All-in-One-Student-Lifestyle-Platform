import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  Gift, 
  Star, 
  Trophy, 
  Utensils, 
  ShoppingBag, 
  Calendar, 
  Coins,
  TrendingUp,
  ExternalLink,
  Clock,
  MapPin,
  Percent,
  Crown,
  Zap,
  Users,
  BookOpen,
  Coffee,
  Car,
  Gamepad2,
  Plus,
  Minus
} from 'lucide-react'

const loyaltyTiers = [
  { name: 'Bronze', points: 0, color: 'from-orange-400 to-orange-600', perks: 'Basic discounts' },
  { name: 'Silver', points: 500, color: 'from-gray-400 to-gray-600', perks: 'Extra 5% off + early access' },
  { name: 'Gold', points: 1000, color: 'from-yellow-400 to-yellow-600', perks: 'Extra 10% off + exclusive events' },
  { name: 'Platinum', points: 2000, color: 'from-purple-400 to-purple-600', perks: 'Extra 15% off + VIP access' }
]

const studentDiscounts = [
  {
    id: 1,
    title: 'Campus Canteen 20% Off',
    category: 'dining',
    discount: '20%',
    description: 'All meals during lunch hours (11 AM - 3 PM)',
    vendor: 'Campus Dining Services',
    validUntil: '2024-12-31',
    pointsCost: 0,
    location: 'Student Center, Level 2',
    icon: Utensils,
    gradient: 'from-orange-500 to-red-500',
    featured: true
  },
  {
    id: 2,
    title: 'Coffee Shop 15% Off',
    category: 'dining',
    discount: '15%',
    description: 'All beverages and pastries',
    vendor: 'Campus Brew',
    validUntil: '2024-06-30',
    pointsCost: 50,
    location: 'Library Ground Floor',
    icon: Coffee,
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    id: 3,
    title: 'Bookstore Student Deal',
    category: 'academic',
    discount: '25%',
    description: 'Textbooks and study materials',
    vendor: 'Campus Bookstore',
    validUntil: '2024-08-15',
    pointsCost: 100,
    location: 'Academic Block',
    icon: BookOpen,
    gradient: 'from-blue-500 to-indigo-500'
  },
  {
    id: 4,
    title: 'City Mall Student Discount',
    category: 'shopping',
    discount: '10%',
    description: 'Over 50 participating stores',
    vendor: 'Metro Shopping Center',
    validUntil: '2024-12-31',
    pointsCost: 150,
    location: '15 mins by Bus 205',
    icon: ShoppingBag,
    gradient: 'from-pink-500 to-purple-500'
  },
  {
    id: 5,
    title: 'Gaming Lounge Access',
    category: 'entertainment',
    discount: '50%',
    description: 'Gaming sessions and tournaments',
    vendor: 'Campus Game Zone',
    validUntil: '2024-12-31',
    pointsCost: 200,
    location: 'Student Center Basement',
    icon: Gamepad2,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 6,
    title: 'Parking Fee Waiver',
    category: 'transport',
    discount: 'Free',
    description: 'Monthly parking pass',
    vendor: 'Campus Parking Services',
    validUntil: '2024-12-31',
    pointsCost: 300,
    location: 'All campus parking zones',
    icon: Car,
    gradient: 'from-green-500 to-teal-500'
  }
]

const pointsHistory = [
  {
    date: '2024-03-15',
    activity: 'Attended Career Fair',
    points: +150,
    type: 'earned',
    description: 'Event participation bonus'
  },
  {
    date: '2024-03-14',
    activity: 'Coffee Shop Discount',
    points: -50,
    type: 'redeemed',
    description: 'Redeemed 15% off coupon'
  },
  {
    date: '2024-03-12',
    activity: 'Study Group Session',
    points: +75,
    type: 'earned',
    description: 'Academic engagement reward'
  },
  {
    date: '2024-03-10',
    activity: 'Club Meeting Attendance',
    points: +50,
    type: 'earned',
    description: 'Regular participation'
  },
  {
    date: '2024-03-08',
    activity: 'Bookstore Discount',
    points: -100,
    type: 'redeemed',
    description: 'Redeemed textbook discount'
  }
]

const categories = [
  { id: 'all', label: 'All Perks', icon: Gift },
  { id: 'dining', label: 'Food & Dining', icon: Utensils },
  { id: 'academic', label: 'Academic', icon: BookOpen },
  { id: 'shopping', label: 'Shopping', icon: ShoppingBag },
  { id: 'entertainment', label: 'Entertainment', icon: Gamepad2 },
  { id: 'transport', label: 'Transport', icon: Car }
]

export function StudentPerks() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [currentPoints] = useState(1250)
  
  const currentTier = loyaltyTiers.reduce((tier, current) => 
    currentPoints >= current.points ? current : tier
  )
  
  const nextTier = loyaltyTiers.find(tier => tier.points > currentPoints)
  const tierProgress = nextTier 
    ? ((currentPoints - currentTier.points) / (nextTier.points - currentTier.points)) * 100
    : 100

  const filteredDiscounts = activeCategory === 'all' 
    ? studentDiscounts 
    : studentDiscounts.filter(discount => discount.category === activeCategory)

  const redeemPerk = (perkId: number) => {
    const perk = studentDiscounts.find(p => p.id === perkId)
    if (perk && currentPoints >= perk.pointsCost) {
      console.log(`Redeemed: ${perk.title}`)
      // Here you would normally handle the redemption logic
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      {/* Welcome Header */}
      <div className="text-center py-8 px-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-2xl campus-shadow-lg text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-full">
              <Gift className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold font-['Poppins']">Student Perks & Benefits</h2>
          </div>
          <p className="text-pink-50 text-lg mb-4">Earn points, unlock rewards, save money!</p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Coins className="h-4 w-4" />
              <span>Loyalty Points</span>
            </div>
            <div className="flex items-center gap-2">
              <Percent className="h-4 w-4" />
              <span>Exclusive Discounts</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span>Tier Rewards</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Loyalty Status */}
        <Card className="campus-shadow hover-lift bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-t-xl">
            <CardTitle className="flex items-center gap-3 text-campus-navy">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${currentTier.color}`}>
                <Crown className="h-5 w-5 text-white" />
              </div>
              Loyalty Status
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${currentTier.color} flex items-center justify-center`}>
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-campus-navy">{currentTier.name}</h3>
                <p className="text-sm text-muted-foreground">{currentTier.perks}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Current Points</span>
                  <span className="text-lg font-bold text-campus-gold">{currentPoints}</span>
                </div>
                {nextTier && (
                  <>
                    <Progress value={tierProgress} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {nextTier.points - currentPoints} points to {nextTier.name}
                    </p>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="lg:col-span-2 campus-shadow hover-lift bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
            <CardTitle className="flex items-center gap-3 text-campus-navy">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              Your Benefits Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <Coins className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">{currentPoints}</p>
                <p className="text-xs text-muted-foreground">Total Points</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                <Gift className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">12</p>
                <p className="text-xs text-muted-foreground">Perks Redeemed</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <Star className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-600">$248</p>
                <p className="text-xs text-muted-foreground">Money Saved</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200">
                <Zap className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-orange-600">15</p>
                <p className="text-xs text-muted-foreground">Active Offers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Perks & Discounts */}
      <Tabs defaultValue="perks" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="perks" className="data-[state=active]:bg-black data-[state=active]:text-white">Available Perks</TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-black data-[state=active]:text-white">Points History</TabsTrigger>
        </TabsList>

        <TabsContent value="perks" className="space-y-6">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {category.label}
                </Button>
              )
            })}
          </div>

          {/* Perks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDiscounts.map((perk) => {
              const Icon = perk.icon
              const canAfford = currentPoints >= perk.pointsCost
              
              return (
                <Card key={perk.id} className={`relative overflow-hidden transition-all duration-300 hover:scale-105 campus-shadow ${
                  perk.featured ? 'ring-2 ring-campus-gold' : ''
                }`}>
                  {perk.featured && (
                    <div className="absolute top-0 right-0 bg-campus-gold text-campus-navy px-2 py-1 text-xs font-bold">
                      FEATURED
                    </div>
                  )}
                  <CardHeader className={`bg-gradient-to-r ${perk.gradient} text-white`}>
                    <div className="flex items-center justify-between">
                      <Icon className="h-6 w-6" />
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        {perk.discount} OFF
                      </Badge>
                    </div>
                    <CardTitle className="text-white text-lg">{perk.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3">
                    <p className="text-sm text-muted-foreground">{perk.description}</p>
                    
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span>{perk.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span>Valid until {new Date(perk.validUntil).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1">
                        <Coins className="h-4 w-4 text-campus-gold" />
                        <span className="text-sm font-bold">
                          {perk.pointsCost === 0 ? 'FREE' : `${perk.pointsCost} pts`}
                        </span>
                      </div>
                      <Button 
                        size="sm"
                        disabled={!canAfford && perk.pointsCost > 0}
                        onClick={() => redeemPerk(perk.id)}
                        className={perk.pointsCost === 0 ? 'bg-green-600 hover:bg-green-700' : ''}
                      >
                        {perk.pointsCost === 0 ? 'Claim' : 'Redeem'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card className="campus-shadow bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5" />
                Points Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pointsHistory.map((activity, index) => (
                  <div key={index} className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                    activity.type === 'earned' 
                      ? 'border-green-200 bg-gradient-to-r from-green-50 to-emerald-50' 
                      : 'border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50'
                  }`}>
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${
                        activity.type === 'earned' ? 'bg-green-500' : 'bg-orange-500'
                      }`}>
                        {activity.type === 'earned' ? (
                          <Plus className="h-4 w-4 text-white" />
                        ) : (
                          <Minus className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-campus-navy">{activity.activity}</p>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                      </div>
                    </div>
                    <div className={`text-right ${
                      activity.type === 'earned' ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      <p className="font-bold">
                        {activity.type === 'earned' ? '+' : ''}{activity.points}
                      </p>
                      <p className="text-xs">points</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}