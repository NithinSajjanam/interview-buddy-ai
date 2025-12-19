import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Calendar, 
  Clock, 
  Target,
  Award,
  ArrowRight,
  ChevronRight
} from "lucide-react";

interface DashboardProps {
  onStartInterview: () => void;
  onViewProgress?: () => void;
  onViewPlan?: () => void;
}

const mockStats = {
  totalSessions: 12,
  averageScore: 78,
  totalTime: "4h 32m",
  streak: 5,
  recentSessions: [
    { date: "Today", role: "Frontend Developer", score: 85, duration: "18 min" },
    { date: "Yesterday", role: "Software Engineer", score: 72, duration: "22 min" },
    { date: "Dec 16", role: "Data Analyst", score: 80, duration: "20 min" },
  ],
  skillProgress: [
    { skill: "React & Frontend", progress: 82 },
    { skill: "System Design", progress: 65 },
    { skill: "Data Structures", progress: 78 },
    { skill: "Communication", progress: 88 },
  ],
};

const Dashboard = ({ onStartInterview, onViewProgress, onViewPlan }: DashboardProps) => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Welcome back, <span className="text-gradient">Learner</span>
            </h1>
            <p className="text-muted-foreground">
              Track your progress and continue improving your interview skills.
            </p>
          </div>
          <Button variant="hero" size="lg" onClick={onStartInterview} className="gap-2">
            Start New Interview
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Target, label: "Total Sessions", value: mockStats.totalSessions, color: "text-primary" },
            { icon: TrendingUp, label: "Average Score", value: `${mockStats.averageScore}%`, color: "text-success" },
            { icon: Clock, label: "Practice Time", value: mockStats.totalTime, color: "text-warning" },
            { icon: Award, label: "Day Streak", value: `${mockStats.streak} days`, color: "text-primary" },
          ].map((stat, index) => (
            <Card
              key={stat.label}
              variant="glass"
              className="opacity-0 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
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

        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Sessions */}
          <Card variant="elevated" className="opacity-0 animate-slide-up stagger-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Recent Sessions
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-primary">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockStats.recentSessions.map((session, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div>
                      <p className="font-medium text-foreground">{session.role}</p>
                      <p className="text-sm text-muted-foreground">
                        {session.date} • {session.duration}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${session.score >= 80 ? "text-success" : "text-primary"}`}>
                        {session.score}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skill Progress */}
          <Card variant="elevated" className="opacity-0 animate-slide-up stagger-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Skill Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockStats.skillProgress.map((skill, index) => (
                  <div key={skill.skill}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{skill.skill}</span>
                      <span className="text-sm text-muted-foreground">{skill.progress}%</span>
                    </div>
                    <Progress value={skill.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Motivational Card */}
        <Card variant="gradient" className="mt-8 p-8 opacity-0 animate-slide-up stagger-4">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shrink-0 shadow-glow">
              <Award className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-xl font-semibold mb-2">Keep up the great work!</h3>
              <p className="text-muted-foreground">
                You're on a {mockStats.streak}-day streak! Practice consistently to improve your interview performance. 
                Every session brings you closer to your dream job.
              </p>
            </div>
            <Button variant="hero" onClick={onStartInterview}>
              Continue Practice
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
