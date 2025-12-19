import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight, 
  RotateCcw, 
  Home,
  Star,
  Target,
  Zap
} from "lucide-react";
import type { InterviewResult } from "./InterviewSession";

interface FeedbackResultsProps {
  results: InterviewResult;
  onRetry: () => void;
  onHome: () => void;
  onViewPlan?: () => void;
}

const FeedbackResults = ({ results, onRetry, onHome, onViewPlan }: FeedbackResultsProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-success";
    if (score >= 70) return "text-primary";
    return "text-warning";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Good";
    return "Needs Work";
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12 opacity-0 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Interview Complete</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Your <span className="text-gradient">Results</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Here's how you performed in your practice interview
          </p>
        </div>

        {/* Overall Score */}
        <Card variant="glass" className="mb-8 p-8 opacity-0 animate-scale-in stagger-1">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <svg className="w-40 h-40 transform -rotate-90">
                <circle
                  className="stroke-secondary"
                  strokeWidth="12"
                  fill="none"
                  r="58"
                  cx="80"
                  cy="80"
                />
                <circle
                  className="stroke-primary transition-all duration-1000"
                  strokeWidth="12"
                  strokeLinecap="round"
                  fill="none"
                  r="58"
                  cx="80"
                  cy="80"
                  strokeDasharray={`${(results.overallScore / 100) * 364} 364`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-4xl font-display font-bold ${getScoreColor(results.overallScore)}`}>
                  {results.overallScore}%
                </span>
                <span className="text-sm text-muted-foreground">{getScoreLabel(results.overallScore)}</span>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="font-display text-2xl font-semibold mb-2">Overall Performance</h2>
              <p className="text-muted-foreground mb-4">
                You demonstrated solid understanding of the topics. Focus on the improvement areas below to boost your score.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10 text-success text-sm">
                  <Target className="w-4 h-4" />
                  Above Average
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm">
                  <Zap className="w-4 h-4" />
                  Quick Learner
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Question breakdown */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {results.questions.map((q, index) => (
            <Card
              key={index}
              variant="elevated"
              className="opacity-0 animate-scale-in"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Question {index + 1}</span>
                  <span className={`font-semibold ${getScoreColor(q.score)}`}>{q.score}%</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground line-clamp-2 mb-3">{q.question}</p>
                <Progress value={q.score} className="h-2" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feedback sections */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Strengths */}
          <Card variant="feature" className="opacity-0 animate-slide-up stagger-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-success">
                <CheckCircle className="w-5 h-5" />
                Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {results.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-success mt-2" />
                    <span className="text-foreground">{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Areas for improvement */}
          <Card variant="feature" className="opacity-0 animate-slide-up stagger-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warning">
                <AlertCircle className="w-5 h-5" />
                Areas for Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {results.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-warning mt-2" />
                    <span className="text-foreground">{improvement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* AI Tips */}
        <Card variant="gradient" className="mb-10 p-6 opacity-0 animate-slide-up stagger-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold mb-2">AI-Generated Tips</h3>
              <ul className="space-y-2">
                {results.feedback.map((tip, index) => (
                  <li key={index} className="flex items-center gap-2 text-muted-foreground">
                    <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="xl" onClick={onRetry} className="gap-2">
            <RotateCcw className="w-5 h-5" />
            Practice Again
          </Button>
          <Button variant="glass" size="xl" onClick={onHome} className="gap-2">
            <Home className="w-5 h-5" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackResults;
