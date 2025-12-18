import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, BarChart3, User, Menu, X } from "lucide-react";

interface NavbarProps {
  currentView: "home" | "dashboard" | "interview" | "results";
  onNavigate: (view: "home" | "dashboard") => void;
}

const Navbar = ({ currentView, onNavigate }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (currentView === "interview" || currentView === "results") {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:shadow-glow transition-shadow">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">InterviewAI</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => onNavigate("home")}
              className={`text-sm font-medium transition-colors ${
                currentView === "home" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate("dashboard")}
              className={`text-sm font-medium transition-colors ${
                currentView === "dashboard" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Dashboard
            </button>
            <Button variant="default" size="sm" onClick={() => onNavigate("dashboard")}>
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  onNavigate("home");
                  setIsMenuOpen(false);
                }}
                className={`p-3 rounded-lg text-left font-medium transition-colors ${
                  currentView === "home" ? "bg-secondary text-primary" : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  onNavigate("dashboard");
                  setIsMenuOpen(false);
                }}
                className={`p-3 rounded-lg text-left font-medium transition-colors ${
                  currentView === "dashboard" ? "bg-secondary text-primary" : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
