import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mic, MicOff, Send, ArrowLeft, Clock, Brain, Sparkles } from "lucide-react";

interface InterviewSessionProps {
  role: string;
  mode: "voice" | "text";
  onEnd: (results: InterviewResult) => void;
  onBack: () => void;
}

export interface InterviewResult {
  questions: { question: string; answer: string; score: number }[];
  overallScore: number;
  feedback: string[];
  strengths: string[];
  improvements: string[];
}

const mockQuestions = {
  frontend: [
    "Can you explain the difference between useMemo and useCallback in React?",
    "How would you optimize a React application that's rendering slowly?",
    "What is the CSS box model and how does it work?",
  ],
  "data-analyst": [
    "How would you approach analyzing a dataset with millions of rows?",
    "Explain the difference between INNER JOIN and LEFT JOIN.",
    "What statistical methods would you use to find outliers in data?",
  ],
  sde: [
    "What is the time complexity of quicksort and when would it perform worst?",
    "Explain how you would design a URL shortening service.",
    "What are SOLID principles and why are they important?",
  ],
};

const InterviewSession = ({ role, mode, onEnd, onBack }: InterviewSessionProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const questions = mockQuestions[role as keyof typeof mockQuestions] || mockQuestions.sde;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) return;

    setIsThinking(true);
    
    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    setAnswer("");
    setIsThinking(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // End interview
      onEnd({
        questions: questions.map((q, i) => ({
          question: q,
          answer: newAnswers[i] || "",
          score: Math.floor(Math.random() * 30) + 70,
        })),
        overallScore: Math.floor(Math.random() * 20) + 75,
        feedback: [
          "Good technical knowledge demonstrated",
          "Clear communication of complex concepts",
          "Consider providing more specific examples",
        ],
        strengths: ["Problem-solving approach", "Technical accuracy", "Communication clarity"],
        improvements: ["Include more real-world examples", "Practice system design questions", "Work on time management"],
      });
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate voice recording
      setTimeout(() => {
        setAnswer("This is a simulated voice response. In a real implementation, this would be transcribed from your voice input.");
        setIsRecording(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Exit Interview
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary">
              <Clock className="w-4 h-4 text-primary" />
              <span className="font-mono text-foreground">{formatTime(timeElapsed)}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary">
              <span className="text-muted-foreground">Question</span>
              <span className="font-semibold text-foreground">
                {currentQuestionIndex + 1}/{questions.length}
              </span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 rounded-full bg-secondary mb-10">
          <div
            className="h-full rounded-full bg-gradient-primary transition-all duration-500"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question card */}
        <Card variant="glass" className="mb-8 p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">AI Interviewer</p>
              <p className="text-xl font-medium text-foreground leading-relaxed">
                {questions[currentQuestionIndex]}
              </p>
            </div>
          </div>
        </Card>

        {/* Answer section */}
        <Card variant="elevated" className="p-6">
          {isThinking ? (
            <div className="flex items-center justify-center gap-3 py-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center animate-pulse">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <p className="text-muted-foreground">AI is analyzing your response...</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-4">Your Response</p>
              
              {mode === "text" ? (
                <Textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="min-h-[150px] mb-4 bg-secondary border-border focus:border-primary resize-none"
                />
              ) : (
                <div className="flex flex-col items-center gap-4 py-8">
                  <button
                    onClick={toggleRecording}
                    className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isRecording
                        ? "bg-destructive animate-pulse shadow-[0_0_40px_hsl(0,84%,60%,0.4)]"
                        : "bg-gradient-primary shadow-glow hover:scale-105"
                    }`}
                  >
                    {isRecording ? (
                      <MicOff className="w-8 h-8 text-destructive-foreground" />
                    ) : (
                      <Mic className="w-8 h-8 text-primary-foreground" />
                    )}
                  </button>
                  <p className="text-muted-foreground">
                    {isRecording ? "Recording... Click to stop" : "Click to start recording"}
                  </p>
                  {answer && (
                    <div className="w-full p-4 rounded-lg bg-secondary mt-4">
                      <p className="text-sm text-muted-foreground mb-2">Transcribed:</p>
                      <p className="text-foreground">{answer}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleSubmitAnswer}
                  disabled={!answer.trim()}
                  className="gap-2"
                >
                  Submit Answer
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default InterviewSession;
