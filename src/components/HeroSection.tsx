import { Brain, Mic, MessageSquare, TrendingUp, Users, Sparkles, CheckCircle, Zap, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <>
      {/* Hero Section */}
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
              Practice interviews
              <span className="text-gradient block mt-2">like the real thing</span>
            </h1>

            {/* Tagline */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto opacity-0 animate-slide-up stagger-1">
              Practice real interviews. Get real feedback. Improve fast.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 opacity-0 animate-slide-up stagger-2">
              <Button variant="hero" size="xl" onClick={onGetStarted}>
                Start Interview
                <ArrowRight className="w-5 h-5 ml-2" />
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
              ].map((feature) => (
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

      {/* How It Works Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Get interview-ready in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choose Your Role",
                description: "Select from Frontend, Data Analyst, SDE, or HR/Behavioral interviews based on your target position.",
                icon: Users,
              },
              {
                step: "02",
                title: "Answer AI Questions",
                description: "Our AI interviewer asks real questions, adapts to your responses, and creates a natural conversation flow.",
                icon: MessageSquare,
              },
              {
                step: "03",
                title: "Get Detailed Feedback",
                description: "Receive instant evaluation on clarity, confidence, and technical accuracy with actionable improvement tips.",
                icon: TrendingUp,
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className="relative group opacity-0 animate-slide-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="p-8 rounded-2xl glass-strong hover:border-primary/30 transition-all duration-300 h-full">
                  <div className="text-6xl font-display font-bold text-primary/20 mb-4">{item.step}</div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow">
                    <item.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                
                {/* Connector line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Is Better Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-gradient">InterviewAI</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Unlike static interview prep, we provide real-time AI interaction and personalized feedback
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Zap,
                title: "Real Interview Simulation",
                description: "Experience authentic interview pressure with AI that responds naturally, asks follow-up questions, and adapts to your answers.",
                color: "text-primary",
              },
              {
                icon: Brain,
                title: "AI-Based Evaluation",
                description: "Get scored on communication, technical depth, confidence, and problem-solving with detailed breakdowns for each answer.",
                color: "text-success",
              },
              {
                icon: TrendingUp,
                title: "Personalized Improvement",
                description: "Receive custom study plans, targeted practice questions, and progress tracking tailored to your weak areas.",
                color: "text-warning",
              },
              {
                icon: Shield,
                title: "Resume-Based Questions",
                description: "Upload your resume and get questions specifically about your projects, experience, and skills.",
                color: "text-primary",
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl glass-strong hover:border-primary/30 transition-all duration-300 opacity-0 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Badges Section */}
      <section className="py-16 px-6 border-t border-border">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">Powered By</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: "Gemini AI", description: "Advanced Language Model" },
              { name: "Google Cloud", description: "Enterprise Infrastructure" },
              { name: "FastAPI", description: "High-Performance Backend" },
              { name: "React", description: "Modern UI Framework" },
            ].map((tech, index) => (
              <div
                key={tech.name}
                className="flex items-center gap-3 px-5 py-3 rounded-full glass hover:border-primary/30 transition-all duration-300 opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CheckCircle className="w-5 h-5 text-primary" />
                <div>
                  <span className="font-medium text-foreground">{tech.name}</span>
                  <span className="text-muted-foreground text-sm ml-2 hidden sm:inline">• {tech.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;