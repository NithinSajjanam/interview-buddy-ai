import { Brain, Mic, MessageSquare, TrendingUp, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-2xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 opacity-0 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">AI-Powered Interview Practice</span>
          </div>

          {/* Main heading */}
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-slide-up">
            Ace Your Next
            <span className="text-gradient block mt-2">Tech Interview</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto opacity-0 animate-slide-up stagger-1">
            Practice with an AI interviewer that simulates real interviews, provides instant feedback, and helps you improve.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 opacity-0 animate-slide-up stagger-2">
            <Button variant="hero" size="xl" onClick={onGetStarted}>
              Start Practice Interview
            </Button>
            <Button variant="glass" size="xl">
              Watch Demo
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto opacity-0 animate-slide-up stagger-3">
            {[
              { icon: Brain, label: "AI Interviewer" },
              { icon: Mic, label: "Voice Support" },
              { icon: TrendingUp, label: "Track Progress" },
              { icon: Users, label: "Multiple Roles" },
            ].map((feature, index) => (
              <div
                key={feature.label}
                className="flex flex-col items-center gap-2 p-4 rounded-xl glass-strong hover:border-primary/30 transition-all duration-300"
              >
                <feature.icon className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium text-foreground">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: '1s' }}>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center">
          <div className="w-1.5 h-3 bg-primary rounded-full mt-2 animate-float" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
