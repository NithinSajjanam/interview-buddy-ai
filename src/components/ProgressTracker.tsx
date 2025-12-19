import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown,
  Target,
  Calendar,
  Award,
  ArrowLeft,
  Zap,
  AlertTriangle
} from "lucide-react";

interface ProgressTrackerProps {
  onBack: () => void;
  onStartInterview: () => void;
}

const mockData = {
  totalInterviews: 24,
  averageScore: 76,
  bestScore: 92,
  currentStreak: 5,
  weeklyProgress: [
    { day: "Mon", score: 68 },
    { day: "Tue", score: 72 },
    { day: "Wed", score: 75 },
    { day: "Thu", score: 71 },
    { day: "Fri", score: 78 },
    { day: "Sat", score: 82 },
    { day: "Sun", score: 85 },
  ],
  skillRadar: [
    { skill: "Communication", score: 78, trend: "up" },
    { skill: "Technical Depth", score: 72, trend: "up" },
    { skill: "Problem Solving", score: 85, trend: "stable" },
    { skill: "Confidence", score: 65, trend: "up" },
    { skill: "Clarity", score: 80, trend: "down" },
    { skill: "Structure", score: 70, trend: "up" },
  ],
  weakAreas: [
    { area: "System Design", score: 55, sessions: 3 },
    { area: "Behavioral (STAR)", score: 62, sessions: 5 },
    { area: "Time Management", score: 58, sessions: 4 },
  ],
  recentTrend: +12,
};

const ProgressTracker = ({ onBack, onStartInterview }: ProgressTrackerProps) => {
  const maxScore = Math.max(...mockData.weeklyProgress.map(d => d.score));
  const minScore = Math.min(...mockData.weeklyProgress.map(d => d.score));

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="font-display text-2xl font-bold">Progress Tracker</h1>
          <Button variant="hero" size="sm" onClick={onStartInterview}>
            New Interview
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Target, label: "Total Interviews", value: mockData.totalInterviews, color: "text-primary" },
            { icon: TrendingUp, label: "Average Score", value: `${mockData.averageScore}%`, color: "text-success" },
            { icon: Award, label: "Best Score", value: `${mockData.bestScore}%`, color: "text-warning" },
            { icon: Zap, label: "Current Streak", value: `${mockData.currentStreak} days`, color: "text-primary" },
          ].map((stat, index) => (
            <Card
              key={stat.label}
              variant="glass"
              className="opacity-0 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
                <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Weekly Progress Chart */}
          <Card variant="elevated" className="opacity-0 animate-slide-up stagger-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Weekly Progress
                </CardTitle>
                <div className="flex items-center gap-1 text-success text-sm font-medium">
                  <TrendingUp className="w-4 h-4" />
                  +{mockData.recentTrend}%
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Simple Bar Chart */}
              <div className="flex items-end justify-between gap-2 h-40">
                {mockData.weeklyProgress.map((day, index) => (
                  <div key={day.day} className="flex flex-col items-center gap-2 flex-1">
                    <div className="relative w-full flex items-end justify-center h-32">
                      <div
                        className="w-full max-w-[40px] rounded-t-lg bg-gradient-primary transition-all duration-500"
                        style={{
                          height: `${((day.score - minScore + 10) / (maxScore - minScore + 20)) * 100}%`,
                          opacity: 0.5 + (index / 10),
                        }}
                      />
                      <span className="absolute -top-6 text-xs font-medium text-muted-foreground">
                        {day.score}%
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">{day.day}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skill Radar */}
          <Card variant="elevated" className="opacity-0 animate-slide-up stagger-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Skill Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.skillRadar.map((skill) => (
                  <div key={skill.skill}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{skill.skill}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{skill.score}%</span>
                        {skill.trend === "up" && <TrendingUp className="w-3 h-3 text-success" />}
                        {skill.trend === "down" && <TrendingDown className="w-3 h-3 text-destructive" />}
                      </div>
                    </div>
                    <Progress value={skill.score} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weak Areas */}
        <Card variant="gradient" className="opacity-0 animate-slide-up stagger-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Focus Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              These areas need the most attention. Practice specifically to improve these skills.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {mockData.weakAreas.map((area, index) => (
                <div
                  key={area.area}
                  className="p-4 rounded-xl bg-secondary/50 border border-warning/20"
                >
                  <h4 className="font-semibold text-foreground mb-1">{area.area}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-warning font-medium">{area.score}%</span>
                    <span className="text-xs text-muted-foreground">{area.sessions} sessions</span>
                  </div>
                  <Progress value={area.score} className="h-1.5 mt-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="mt-10 text-center">
          <p className="text-muted-foreground mb-4">Keep practicing to improve your weak areas!</p>
          <Button variant="hero" size="xl" onClick={onStartInterview} className="gap-2">
            Start Practice Session
            <Zap className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;