import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, MessageSquare, ArrowRight } from "lucide-react";

interface InterviewModeProps {
  selectedMode: "voice" | "text" | null;
  onSelectMode: (mode: "voice" | "text") => void;
  onStartInterview: () => void;
  canStart: boolean;
}

const modes = [
  {
    id: "voice" as const,
    title: "Voice Interview",
    description: "Speak naturally with our AI interviewer. Perfect for practicing verbal communication skills.",
    icon: Mic,
    features: ["Real-time voice recognition", "Natural conversation flow", "Pronunciation feedback"],
    recommended: true,
  },
  {
    id: "text" as const,
    title: "Text Interview",
    description: "Type your responses. Great for structured thinking and detailed technical answers.",
    icon: MessageSquare,
    features: ["Think through answers", "Review before submitting", "Code snippets support"],
    recommended: false,
  },
];

const InterviewMode = ({ selectedMode, onSelectMode, onStartInterview, canStart }: InterviewModeProps) => {
  return (
    <section className="py-20 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Select Interview <span className="text-gradient">Mode</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose how you'd like to interact with your AI interviewer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {modes.map((mode, index) => (
            <Card
              key={mode.id}
              variant="interactive"
              className={`relative overflow-hidden opacity-0 animate-scale-in ${
                selectedMode === mode.id ? "border-primary shadow-glow" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => onSelectMode(mode.id)}
            >
              {mode.recommended && (
                <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-primary text-primary-foreground text-xs font-semibold rounded-bl-lg">
                  Recommended
                </div>
              )}

              <CardHeader>
                <div className="w-14 h-14 rounded-2xl bg-gradient-primary/10 flex items-center justify-center mb-4">
                  <mode.icon className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-xl">{mode.title}</CardTitle>
                <CardDescription>{mode.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-2">
                  {mode.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>

              {selectedMode === mode.id && (
                <div className="absolute top-4 left-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            variant="hero"
            size="xl"
            disabled={!canStart}
            onClick={onStartInterview}
            className="group"
          >
            Start Interview
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InterviewMode;
