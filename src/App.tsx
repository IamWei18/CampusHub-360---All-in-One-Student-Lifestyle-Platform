import { useState } from "react";
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from "./components/ui/sidebar";
import {
  Building,
  MapPin,
  MessageSquare,
  Calendar,
  GraduationCap,
  Users,
  BookOpen,
  Trophy,
  Users2,
  Heart,
  Gift,
} from "lucide-react";
import { CampusManagement } from "./components/CampusManagementEnhanced";
import { SchoolMap } from "./components/SchoolMap";
import { CampusForum } from "./components/CampusForum";
import { ClubsEvents } from "./components/ClubsEvents";
import { FriendFinder } from "./components/FriendFinder";
import { WellnessHub } from "./components/WellnessHub";
import { StudentPerks } from "./components/StudentPerks";
import { StudentCardLanding } from "./components/StudentCardLanding";
import { FloatingAIAssistant } from "./components/FloatingAIAssistant";
import { FloatingAIButton } from "./components/FloatingAIButton";

const menuItems = [
  {
    id: "management",
    title: "Campus Center",
    icon: Building,
    description: "Academic & Administrative Hub",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    id: "map",
    title: "Campus Navigator",
    icon: MapPin,
    description: "Interactive Campus Map & GPS",
    gradient: "from-green-500 to-green-600",
  },
  {
    id: "forum",
    title: "Student Discussions",
    icon: MessageSquare,
    description: "Anonymous Campus Community",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    id: "clubs",
    title: "Clubs & Activities",
    icon: Trophy,
    description: "Events & Student Organizations",
    gradient: "from-orange-500 to-orange-600",
  },
  {
    id: "friends",
    title: "Campus Connections",
    icon: Users2,
    description: "Find & Connect with Peers",
    gradient: "from-pink-500 to-pink-600",
  },
  {
    id: "wellness",
    title: "Wellness Hub",
    icon: Heart,
    description: "Mental Health & Wellbeing",
    gradient: "from-teal-500 to-cyan-600",
  },
  {
    id: "perks",
    title: "Student Perks",
    icon: Gift,
    description: "Rewards & Benefits Program",
    gradient: "from-indigo-500 to-purple-600",
  },
];

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeSection, setActiveSection] =
    useState("management");
  const [isAIAssistantOpen, setIsAIAssistantOpen] =
    useState(false);

  const renderActiveSection = () => {
    switch (activeSection) {
      case "management":
        return <CampusManagement />;
      case "map":
        return <SchoolMap />;
      case "forum":
        return <CampusForum />;
      case "clubs":
        return <ClubsEvents />;
      case "friends":
        return <FriendFinder />;
      case "wellness":
        return <WellnessHub />;
      case "perks":
        return <StudentPerks />;
      default:
        return <CampusManagement />;
    }
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const toggleAIAssistant = () => {
    setIsAIAssistantOpen(!isAIAssistantOpen);
  };

  if (showSplash) {
    return (
      <StudentCardLanding onComplete={handleSplashComplete} />
    );
  }

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-orange-100/50 to-yellow-100/50 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-100/30 to-blue-100/30 rounded-full blur-3xl"></div>
        </div>

        <Sidebar
          variant="inset"
          className="border-r-0 bg-gradient-to-b from-campus-navy/95 to-campus-navy-light/95 backdrop-blur-sm campus-shadow-lg z-10"
        >
          <SidebarHeader className="border-b border-campus-navy/10 px-6 py-6 bg-gradient-to-r from-campus-navy to-campus-navy-light">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-campus-gold rounded-lg pulse-glow">
                <GraduationCap className="h-6 w-6 text-campus-navy-dark" />
              </div>
              <div>
                <h2 className="text-white font-bold text-lg font-['Poppins']">
                  Campus Hub
                </h2>
                <p className="text-blue-100 text-xs">
                  Your Academic Companion
                </p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="bg-transparent overflow-y-auto scrollbar-hide">
            <SidebarMenu className="px-4 pt-6 pb-4 space-y-4">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveSection(item.id)}
                      isActive={activeSection === item.id}
                      className={`w-full justify-start gap-4 px-4 py-4 min-h-[70px] rounded-xl transition-all duration-300 hover-lift group ${
                        activeSection === item.id
                          ? "bg-gradient-to-r from-campus-gold to-campus-gold-light text-campus-navy campus-shadow border border-campus-gold/30"
                          : "hover:bg-white/10 hover:campus-shadow text-white/90 hover:text-white"
                      }`}
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <div
                        className={`p-2.5 rounded-lg transition-all duration-300 ${
                          activeSection === item.id
                            ? "bg-campus-navy text-white"
                            : `bg-gradient-to-r ${item.gradient} text-white group-hover:scale-110`
                        }`}
                      >
                        <Icon className="h-5 w-5 flex-shrink-0" />
                      </div>
                      <div className="flex flex-col items-start text-left">
                        <span
                          className={`text-sm font-semibold font-['Poppins'] ${
                            activeSection === item.id
                              ? "text-campus-navy"
                              : "text-white"
                          }`}
                        >
                          {item.title}
                        </span>
                        <span
                          className={`text-xs leading-tight ${
                            activeSection === item.id
                              ? "text-campus-navy/70"
                              : "text-white/70"
                          }`}
                        >
                          {item.description}
                        </span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>

            {/* Campus Stats Widget */}
            <div className="px-4 pb-6 mt-4">
              <div className="bg-gradient-to-r from-campus-gold/20 to-campus-orange/20 p-4 rounded-xl border border-campus-gold/40 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-campus-gold" />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Welcome Back!
                    </p>
                    <p className="text-xs text-white/80">
                      Fall 2024 Semester
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="flex-1 bg-transparent">
          <header className="flex h-16 shrink-0 items-center gap-4 border-b border-white/20 px-6 bg-white/90 backdrop-blur-md campus-shadow">
            <SidebarTrigger className="hover:bg-campus-navy/10 transition-colors" />
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg bg-gradient-to-r ${menuItems.find((item) => item.id === activeSection)?.gradient || "from-blue-500 to-blue-600"}`}
              >
                {(() => {
                  const ActiveIcon =
                    menuItems.find(
                      (item) => item.id === activeSection,
                    )?.icon || Building;
                  return (
                    <ActiveIcon className="h-4 w-4 text-white" />
                  );
                })()}
              </div>
              <div>
                <h1 className="text-campus-navy font-bold font-['Poppins']">
                  {
                    menuItems.find(
                      (item) => item.id === activeSection,
                    )?.title
                  }
                </h1>
                <p className="text-xs text-muted-foreground">
                  {
                    menuItems.find(
                      (item) => item.id === activeSection,
                    )?.description
                  }
                </p>
              </div>
            </div>
          </header>
          <main className="flex-1 p-6 relative z-10">
            <div className="max-w-7xl mx-auto">
              {renderActiveSection()}
            </div>
          </main>
        </SidebarInset>
      </div>

      {/* Floating AI Assistant Components */}
      <FloatingAIButton
        isOpen={isAIAssistantOpen}
        onClick={toggleAIAssistant}
        hasUnread={false}
      />

      <FloatingAIAssistant
        isOpen={isAIAssistantOpen}
        onToggle={toggleAIAssistant}
        onNavigate={setActiveSection}
      />
    </SidebarProvider>
  );
}