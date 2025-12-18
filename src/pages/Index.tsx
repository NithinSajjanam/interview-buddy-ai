import { useState, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import RoleSelection from "@/components/RoleSelection";
import InterviewMode from "@/components/InterviewMode";
import InterviewSession, { type InterviewResult } from "@/components/InterviewSession";
import FeedbackResults from "@/components/FeedbackResults";
import Dashboard from "@/components/Dashboard";
import Navbar from "@/components/Navbar";

type View = "home" | "dashboard" | "interview" | "results";

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("home");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<"voice" | "text" | null>(null);
  const [interviewResults, setInterviewResults] = useState<InterviewResult | null>(null);
  
  const roleRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    roleRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleStartInterview = () => {
    if (selectedRole && selectedMode) {
      setCurrentView("interview");
    }
  };

  const handleInterviewEnd = (results: InterviewResult) => {
    setInterviewResults(results);
    setCurrentView("results");
  };

  const handleRetry = () => {
    setInterviewResults(null);
    setCurrentView("interview");
  };

  const handleHome = () => {
    setSelectedRole(null);
    setSelectedMode(null);
    setInterviewResults(null);
    setCurrentView("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigate = (view: "home" | "dashboard") => {
    setCurrentView(view);
    if (view === "home") {
      setSelectedRole(null);
      setSelectedMode(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Interview session view
  if (currentView === "interview" && selectedRole && selectedMode) {
    return (
      <InterviewSession
        role={selectedRole}
        mode={selectedMode}
        onEnd={handleInterviewEnd}
        onBack={handleHome}
      />
    );
  }

  // Results view
  if (currentView === "results" && interviewResults) {
    return (
      <FeedbackResults
        results={interviewResults}
        onRetry={handleRetry}
        onHome={handleHome}
      />
    );
  }

  // Dashboard view
  if (currentView === "dashboard") {
    return (
      <>
        <Navbar currentView={currentView} onNavigate={handleNavigate} />
        <div className="pt-16">
          <Dashboard onStartInterview={() => {
            setCurrentView("home");
            setTimeout(() => {
              roleRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }} />
        </div>
      </>
    );
  }

  // Home view
  return (
    <div className="min-h-screen bg-background">
      <Navbar currentView={currentView} onNavigate={handleNavigate} />
      
      <div className="pt-16">
        <HeroSection onGetStarted={handleGetStarted} />
        
        <div ref={roleRef}>
          <RoleSelection
            selectedRole={selectedRole}
            onSelectRole={setSelectedRole}
          />
        </div>
        
        <InterviewMode
          selectedMode={selectedMode}
          onSelectMode={setSelectedMode}
          onStartInterview={handleStartInterview}
          canStart={!!selectedRole && !!selectedMode}
        />
        
        {/* Footer */}
        <footer className="py-12 px-6 border-t border-border">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                © 2024 InterviewAI. Built with AI for aspiring developers.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
