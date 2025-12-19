import { useState, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import RoleSelection from "@/components/RoleSelection";
import InterviewMode from "@/components/InterviewMode";
import InterviewSession, { type InterviewResult } from "@/components/InterviewSession";
import FeedbackResults from "@/components/FeedbackResults";
import Dashboard from "@/components/Dashboard";
import Navbar from "@/components/Navbar";
import AuthPage from "@/components/AuthPage";
import InterviewSetup, { type InterviewConfig } from "@/components/InterviewSetup";
import ProgressTracker from "@/components/ProgressTracker";
import ImprovementPlan from "@/components/ImprovementPlan";

type View = "home" | "dashboard" | "interview" | "results" | "auth" | "setup" | "progress" | "improvement";

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [interviewConfig, setInterviewConfig] = useState<InterviewConfig | null>(null);
  const [interviewResults, setInterviewResults] = useState<InterviewResult | null>(null);
  
  const roleRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    if (!isAuthenticated) {
      setCurrentView("auth");
    } else {
      setCurrentView("setup");
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentView("setup");
  };

  const handleStartInterview = (config: InterviewConfig) => {
    setInterviewConfig(config);
    setCurrentView("interview");
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
    setInterviewConfig(null);
    setInterviewResults(null);
    setCurrentView("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigate = (view: "home" | "dashboard" | "progress" | "improvement") => {
    setCurrentView(view);
    if (view === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Auth view
  if (currentView === "auth") {
    return <AuthPage onLogin={handleLogin} onBack={handleHome} />;
  }

  // Setup view
  if (currentView === "setup") {
    return <InterviewSetup onStart={handleStartInterview} onBack={handleHome} />;
  }

  // Interview session view
  if (currentView === "interview" && interviewConfig) {
    return (
      <InterviewSession
        role={interviewConfig.role}
        mode={interviewConfig.mode}
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
        onViewPlan={() => setCurrentView("improvement")}
      />
    );
  }

  // Progress view
  if (currentView === "progress") {
    return (
      <ProgressTracker
        onBack={() => setCurrentView("dashboard")}
        onStartInterview={() => setCurrentView("setup")}
      />
    );
  }

  // Improvement plan view
  if (currentView === "improvement") {
    return (
      <ImprovementPlan
        onBack={() => setCurrentView("dashboard")}
        onStartInterview={() => setCurrentView("setup")}
      />
    );
  }

  // Dashboard view
  if (currentView === "dashboard") {
    return (
      <>
        <Navbar currentView={currentView} onNavigate={handleNavigate} />
        <div className="pt-16">
          <Dashboard 
            onStartInterview={() => setCurrentView("setup")}
            onViewProgress={() => setCurrentView("progress")}
            onViewPlan={() => setCurrentView("improvement")}
          />
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
        
        {/* Footer */}
        <footer className="py-12 px-6 border-t border-border">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  © 2024 InterviewAI. Built with AI for aspiring developers.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Google AI Hackathon Project • Team InterviewAI
                </p>
              </div>
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