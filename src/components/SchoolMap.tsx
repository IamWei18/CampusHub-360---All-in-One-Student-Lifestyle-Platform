import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Users, 
  Search,
  Utensils,
  BookOpen,
  Car,
  Wifi,
  Coffee,
  Building,
  TreePine
} from 'lucide-react'

const locations = [
  {
    id: 'canteen-a',
    name: 'Canteen A',
    category: 'dining',
    floor: 'Level 2',
    building: 'Student Center',
    status: 'open',
    hours: '7:00 AM - 8:00 PM',
    occupancy: 45,
    features: ['WiFi', 'Air Conditioning', 'Halal Options'],
    coordinates: { x: 40, y: 30 }
  },
  {
    id: 'library',
    name: 'Main Library',
    category: 'academic',
    floor: 'Level 1-4',
    building: 'Academic Block',
    status: 'open',
    hours: '7:00 AM - 10:00 PM',
    occupancy: 65,
    features: ['Study Rooms', 'Computer Lab', '24/7 Study Area'],
    coordinates: { x: 60, y: 40 }
  },
  {
    id: 'lt-205',
    name: 'Lecture Theatre 205',
    category: 'academic',
    floor: 'Level 2',
    building: 'Academic Block',
    status: 'occupied',
    hours: 'Class in session until 3:00 PM',
    occupancy: 85,
    features: ['Projector', 'Audio System', 'Air Conditioning'],
    coordinates: { x: 65, y: 35 }
  },
  {
    id: 'parking-a',
    name: 'Parking Zone A',
    category: 'parking',
    floor: 'Ground Level',
    building: 'Main Campus',
    status: 'available',
    hours: '24 hours',
    occupancy: 30,
    features: ['Covered', 'Security', 'EV Charging'],
    coordinates: { x: 20, y: 60 }
  },
  {
    id: 'parking-student',
    name: 'Student Parking P',
    category: 'parking',
    floor: 'Ground Level',
    building: 'Student Area',
    status: 'available',
    hours: '24 hours',
    occupancy: 45,
    features: ['Student Exclusive', 'Security Cameras', 'Monthly Passes'],
    coordinates: { x: 25, y: 80 }
  },
  {
    id: 'gym',
    name: 'Sports Complex',
    category: 'recreation',
    floor: 'Level 1-2',
    building: 'Sports Center',
    status: 'open',
    hours: '6:00 AM - 10:00 PM',
    occupancy: 25,
    features: ['Swimming Pool', 'Basketball Court', 'Fitness Center'],
    coordinates: { x: 50, y: 50 }
  },
  {
    id: 'prayer-room',
    name: 'Multi-Faith Prayer Room',
    category: 'facilities',
    floor: 'Level 1',
    building: 'Student Center',
    status: 'available',
    hours: '5:00 AM - 11:00 PM',
    occupancy: 10,
    features: ['Quiet Zone', 'Ablution Facilities', 'Prayer Mats'],
    coordinates: { x: 35, y: 25 }
  }
]

const busRoutes = [
  {
    route: 'Campus Shuttle',
    nextArrival: '5 mins',
    destination: 'Student Hostels',
    platform: 'A',
    status: 'on-time'
  },
  {
    route: 'Bus 101',
    nextArrival: '12 mins',
    destination: 'City Center',
    platform: 'B',
    status: 'delayed'
  },
  {
    route: 'Bus 205',
    nextArrival: '8 mins',
    destination: 'Shopping Mall',
    platform: 'C',
    status: 'on-time'
  }
]

const categoryIcons = {
  dining: Utensils,
  academic: BookOpen,
  parking: Car,
  recreation: TreePine,
  facilities: Building
}

const categoryColors = {
  dining: 'bg-orange-500 border-orange-600',
  academic: 'bg-blue-500 border-blue-600',
  parking: 'bg-green-500 border-green-600',
  recreation: 'bg-purple-500 border-purple-600',
  facilities: 'bg-indigo-500 border-indigo-600'
}

const categoryShapes = {
  dining: 'rounded-full',
  academic: 'rounded-sm',
  parking: 'rounded-md',
  recreation: 'rounded-lg',
  facilities: 'rounded-full'
}

const categoryFilters = [
  { id: 'all', label: 'All Locations' },
  { id: 'dining', label: 'Dining' },
  { id: 'academic', label: 'Academic' },
  { id: 'parking', label: 'Parking' },
  { id: 'recreation', label: 'Recreation' },
  { id: 'facilities', label: 'Facilities' }
]

export function SchoolMap() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [showLocationName, setShowLocationName] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.building.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'all' || location.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const selectedLocationData = selectedLocation ? locations.find(l => l.id === selectedLocation) : null

  const handleLocationClick = (locationId: string) => {
    if (window.innerWidth <= 768) { // Mobile check
      if (showLocationName === locationId) {
        // Second click - show full details
        setSelectedLocation(locationId)
        setShowLocationName(null)
      } else {
        // First click - show name only
        setShowLocationName(locationId)
        setSelectedLocation(null)
      }
    } else {
      // Desktop - show details immediately
      setSelectedLocation(locationId)
      setShowLocationName(null)
    }
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768

  return (
    <div className="space-y-6">
      <Tabs defaultValue="map" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="map">Interactive Map</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="transport">Transport</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {isMobile ? (
                    <>
                      Campus Map
                    </>
                  ) : (
                    'Campus Map'
                  )}
                </CardTitle>
                {!isMobile && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Navigation className="h-4 w-4 mr-1" />
                      My Location
                    </Button>
                    <Button variant="outline" size="sm">
                      <Search className="h-4 w-4 mr-1" />
                      Search Route
                    </Button>
                  </div>
                )}
              </div>
              {isMobile && (
                <div className="flex flex-col gap-2 mt-4">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Navigation className="h-4 w-4 mr-2" />
                    My Location
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Search className="h-4 w-4 mr-2" />
                    Search Route
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Simple Campus Map Visualization */}
                <div className="w-full h-96 bg-green-50 rounded-lg border-2 border-green-200 relative overflow-hidden">
                  {/* Buildings - Hidden on mobile */}
                  {!isMobile && (
                    <>
                      <div className="absolute top-8 left-8 w-32 h-24 bg-blue-200 rounded border-2 border-blue-300 flex items-center justify-center">
                        <span className="text-xs font-medium">Academic Block</span>
                      </div>
                      <div className="absolute top-8 right-8 w-24 h-20 bg-orange-200 rounded border-2 border-orange-300 flex items-center justify-center">
                        <span className="text-xs font-medium">Student Center</span>
                      </div>
                      <div className="absolute bottom-8 right-8 w-20 h-16 bg-purple-200 rounded border-2 border-purple-300 flex items-center justify-center">
                        <span className="text-xs font-medium">Sports Center</span>
                      </div>
                    </>
                  )}
                  
                  {/* Mobile buildings - simplified without text */}
                  {isMobile && (
                    <>
                      <div className="absolute top-8 left-8 w-24 h-16 bg-blue-200 rounded border-2 border-blue-300"></div>
                      <div className="absolute top-8 right-8 w-20 h-14 bg-orange-200 rounded border-2 border-orange-300"></div>
                      <div className="absolute bottom-8 right-8 w-16 h-12 bg-purple-200 rounded border-2 border-purple-300"></div>
                    </>
                  )}
                  
                  {/* Location Pins with different shapes and colors */}
                  {filteredLocations.map((location) => {
                    const Icon = categoryIcons[location.category as keyof typeof categoryIcons]
                    const colorClass = categoryColors[location.category as keyof typeof categoryColors]
                    const shapeClass = categoryShapes[location.category as keyof typeof categoryShapes]
                    
                    return (
                      <div key={location.id} className="absolute" style={{ 
                        left: `${location.coordinates.x}%`, 
                        top: `${location.coordinates.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}>
                        <button
                          className={`w-8 h-8 ${shapeClass} ${colorClass} flex items-center justify-center transition-all hover:scale-110 campus-shadow border-2 ${
                            selectedLocation === location.id 
                              ? 'ring-4 ring-campus-orange/50 scale-125' 
                              : showLocationName === location.id
                              ? 'ring-2 ring-campus-gold/50 scale-110'
                              : 'hover:scale-110'
                          }`}
                          onClick={() => handleLocationClick(location.id)}
                        >
                          <Icon className="h-4 w-4 text-white" />
                        </button>
                        
                        {/* Show location name on first click (mobile) */}
                        {showLocationName === location.id && isMobile && (
                          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-lg shadow-lg border z-10 whitespace-nowrap">
                            <p className="text-sm font-medium text-campus-navy">{location.name}</p>
                            <p className="text-xs text-muted-foreground">Tap again for details</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                  
                  {/* Current Location */}
                  <div className="absolute bottom-16 left-16 w-5 h-5 bg-campus-blue-accent rounded-full animate-pulse">
                    <div className="absolute inset-0 bg-campus-blue-accent/60 rounded-full animate-ping opacity-75"></div>
                  </div>
                  <span className="absolute bottom-8 left-12 text-xs bg-white text-black px-3 py-1 rounded-full shadow-lg font-medium">📍 You are here</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mobile Legend */}
          {isMobile && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Map Legend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(categoryIcons).map(([category, Icon]) => {
                    const colorClass = categoryColors[category as keyof typeof categoryColors]
                    const shapeClass = categoryShapes[category as keyof typeof categoryShapes]
                    return (
                      <div key={category} className="flex items-center gap-2">
                        <div className={`w-6 h-6 ${shapeClass} ${colorClass} flex items-center justify-center border-2`}>
                          <Icon className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-xs capitalize">{category}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Location Details */}
          {selectedLocationData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {React.createElement(categoryIcons[selectedLocationData.category as keyof typeof categoryIcons], { className: "h-5 w-5" })}
                  {selectedLocationData.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p>{selectedLocationData.floor}, {selectedLocationData.building}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant={selectedLocationData.status === 'open' ? 'secondary' : 'destructive'}>
                      {selectedLocationData.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Hours</p>
                    <p className="text-sm">{selectedLocationData.hours}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Occupancy</p>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{selectedLocationData.occupancy}%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Features</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedLocationData.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">{feature}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-2">
                  <Button size="sm" className="w-full md:w-auto">
                    <Navigation className="h-4 w-4 mr-1" />
                    Get Directions
                  </Button>
                  <Button size="sm" variant="outline" className="w-full md:w-auto">
                    <Clock className="h-4 w-4 mr-1" />
                    Check Hours
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="locations" className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categoryFilters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeCategory === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(filter.id)}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLocations.map((location) => {
              const Icon = categoryIcons[location.category as keyof typeof categoryIcons]
              return (
                <Card key={location.id} className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedLocation(location.id)}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Icon className="h-5 w-5 mt-1" />
                        <div>
                          <h4>{location.name}</h4>
                          <p className="text-sm text-muted-foreground">{location.building}</p>
                          <p className="text-xs text-muted-foreground mt-1">{location.hours}</p>
                        </div>
                      </div>
                      <Badge variant={location.status === 'open' ? 'secondary' : 'destructive'}>
                        {location.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="transport" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bus Schedule & Live Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {busRoutes.map((bus, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-campus-navy rounded flex items-center justify-center">
                        <span className="text-sm font-medium text-white">{bus.platform}</span>
                      </div>
                      <div>
                        <p className="font-medium">{bus.route}</p>
                        <p className="text-sm text-muted-foreground">to {bus.destination}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{bus.nextArrival}</p>
                      <Badge variant={bus.status === 'on-time' ? 'secondary' : 'destructive'}>
                        {bus.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4 text-blue-600" />
                <p className="text-sm">
                  <strong>NFC & QR Integration:</strong> Scan QR codes at bus stops and building entrances 
                  to get real-time updates and check-in for attendance tracking.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}