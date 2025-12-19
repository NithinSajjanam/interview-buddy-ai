import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  BookOpen, 
  Target,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  MessageSquare,
  Code
} from "lucide-react";

interface ImprovementPlanProps {
  onBack: () => void;
  onStartInterview: () => void;
}

const weeklyPlan = [
  {
    day: "Day 1",
    title: "React Hooks Fundamentals",
    duration: "30 min",
    type: "study",
    tasks: [
      "Review useState and useEffect patterns",
      "Practice custom hooks implementation",
      "Complete 2 mock questions on hooks",
    ],
    completed: true,
  },
  {
    day: "Day 2",
    title: "STAR Method Practice",
    duration: "30 min",
    type: "practice",
    tasks: [
      "Learn STAR response framework",
      "Prepare 3 project stories using STAR",
      "Record and review your responses",
    ],
    completed: true,
  },
  {
    day: "Day 3",
    title: "System Design Basics",
    duration: "45 min",
    type: "study",
    tasks: [
      "Understand scalability concepts",
      "Practice URL shortener design",
      "Review database design patterns",
    ],
    completed: false,
  },
  {
    day: "Day 4",
    title: "Confidence Building",
    duration: "30 min",
    type: "practice",
    tasks: [
      "Voice interview practice session",
      "Focus on speaking pace and clarity",
      "Record and analyze body language",
    ],
    completed: false,
  },
  {
    day: "Day 5",
    title: "Technical Deep Dive",
    duration: "45 min",
    type: "study",
    tasks: [
      "JavaScript advanced concepts",
      "Async/await and promises",
      "Event loop understanding",
    ],
    completed: false,
  },
  {
    day: "Day 6",
    title: "Mock Interview",
    duration: "60 min",
    type: "interview",
    tasks: [
      "Full technical interview simulation",
      "Mixed questions (technical + behavioral)",
      "Detailed feedback review",
    ],
    completed: false,
  },
  {
    day: "Day 7",
    title: "Review & Reflect",
    duration: "30 min",
    type: "review",
    tasks: [
      "Review week's progress",
      "Identify remaining weak areas",
      "Plan next week's focus",
    ],
    completed: false,
  },
];

const focusAreas = [
  { area: "Technical Clarity", improvement: "Use simpler language when explaining concepts", icon: Code },
  { area: "Response Structure", improvement: "Start with summary, then details, then examples", icon: MessageSquare },
  { area: "Confidence", improvement: "Practice power poses, slow down speech by 20%", icon: Sparkles },
];

const ImprovementPlan = ({ onBack, onStartInterview }: ImprovementPlanProps) => {
  const completedDays = weeklyPlan.filter(d => d.completed).length;
  const progress = Math.round((completedDays / weeklyPlan.length) * 100);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="font-display text-2xl font-bold">Improvement Plan</h1>
          <div className="w-24" />
        </div>

        {/* Progress Overview */}
        <Card variant="gradient" className="mb-8 opacity-0 animate-scale-in">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative w-32 h-32 shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    className="stroke-secondary"
                    strokeWidth="10"
                    fill="none"
                    r="54"
                    cx="64"
                    cy="64"
                  />
                  <circle
                    className="stroke-primary transition-all duration-1000"
                    strokeWidth="10"
                    strokeLinecap="round"
                    fill="none"
                    r="54"
                    cx="64"
                    cy="64"
                    strokeDasharray={`${(progress / 100) * 339} 339`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-display font-bold text-foreground">{progress}%</span>
                  <span className="text-xs text-muted-foreground">Complete</span>
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="font-display text-2xl font-bold mb-2">Your Personalized 7-Day Plan</h2>
                <p className="text-muted-foreground mb-4">
                  AI-generated based on your interview performance. Complete daily tasks to see improvement within a week.
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10 text-success text-sm">
                    <CheckCircle className="w-4 h-4" />
                    {completedDays} days completed
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm">
                    <Calendar className="w-4 h-4" />
                    {weeklyPlan.length - completedDays} days remaining
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {focusAreas.map((focus, index) => (
            <Card
              key={focus.area}
              variant="glass"
              className="opacity-0 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <focus.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{focus.area}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{focus.improvement}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Daily Plan */}
        <Card variant="elevated" className="mb-8 opacity-0 animate-slide-up stagger-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Daily Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyPlan.map((day, index) => (
                <div
                  key={day.day}
                  className={`p-4 rounded-xl border transition-all ${
                    day.completed 
                      ? "bg-success/5 border-success/20" 
                      : index === completedDays 
                        ? "bg-primary/5 border-primary/30 shadow-glow" 
                        : "bg-secondary/30 border-border"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        day.completed 
                          ? "bg-success text-success-foreground" 
                          : index === completedDays
                            ? "bg-gradient-primary text-primary-foreground"
                            : "bg-secondary text-muted-foreground"
                      }`}>
                        {day.completed ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <span className="font-display font-bold">{day.day.split(" ")[1]}</span>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-foreground">{day.title}</h4>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            day.type === "study" ? "bg-blue-500/10 text-blue-500" :
                            day.type === "practice" ? "bg-purple-500/10 text-purple-500" :
                            day.type === "interview" ? "bg-primary/10 text-primary" :
                            "bg-green-500/10 text-green-500"
                          }`}>
                            {day.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <Clock className="w-3 h-3" />
                          {day.duration}
                        </div>
                        <ul className="space-y-1">
                          {day.tasks.map((task, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className={`w-1.5 h-1.5 rounded-full ${day.completed ? "bg-success" : "bg-primary"}`} />
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {index === completedDays && !day.completed && (
                      <Button variant="hero" size="sm" className="shrink-0">
                        Start
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Ready to practice today's focus area?</p>
          <Button variant="hero" size="xl" onClick={onStartInterview} className="gap-2">
            Start Practice Interview
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImprovementPlan;