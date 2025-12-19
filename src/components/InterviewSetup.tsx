import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Code, 
  Database, 
  Terminal, 
  Users, 
  ArrowRight, 
  ArrowLeft,
  Mic, 
  MessageSquare, 
  Upload,
  FileText,
  Briefcase,
  GraduationCap,
  Clock
} from "lucide-react";

interface InterviewSetupProps {
  onStart: (config: InterviewConfig) => void;
  onBack: () => void;
}

export interface InterviewConfig {
  role: string;
  experienceLevel: string;
  interviewType: string;
  mode: "voice" | "text";
  resumeUploaded: boolean;
}

const roles = [
  { id: "frontend", title: "Frontend Developer", icon: Code, description: "React, JavaScript, CSS, UI/UX" },
  { id: "data-analyst", title: "Data Analyst", icon: Database, description: "SQL, Python, Statistics" },
  { id: "sde", title: "Software Engineer", icon: Terminal, description: "DSA, System Design, OOP" },
  { id: "hr", title: "HR / Behavioral", icon: Users, description: "Communication, Leadership, Teamwork" },
];

const experienceLevels = [
  { id: "fresher", title: "Fresher", icon: GraduationCap, description: "0-1 years" },
  { id: "junior", title: "Junior", icon: Briefcase, description: "1-3 years" },
  { id: "mid", title: "Mid-Level", icon: Clock, description: "3-5 years" },
];

const interviewTypes = [
  { id: "technical", title: "Technical", description: "Coding & problem-solving focus" },
  { id: "hr", title: "HR / Behavioral", description: "Soft skills & situational" },
  { id: "mixed", title: "Mixed", description: "Combination of both" },
];

const modes = [
  { id: "voice" as const, title: "Voice", icon: Mic, description: "Speak naturally", recommended: true },
  { id: "text" as const, title: "Text", icon: MessageSquare, description: "Type responses", recommended: false },
];

const InterviewSetup = ({ onStart, onBack }: InterviewSetupProps) => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [experienceLevel, setExperienceLevel] = useState<string | null>(null);
  const [interviewType, setInterviewType] = useState<string | null>(null);
  const [mode, setMode] = useState<"voice" | "text" | null>(null);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === "application/pdf") {
      setResumeUploaded(true);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeUploaded(true);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return !!selectedRole;
      case 2: return !!experienceLevel;
      case 3: return !!interviewType;
      case 4: return !!mode;
      default: return false;
    }
  };

  const handleStart = () => {
    if (selectedRole && experienceLevel && interviewType && mode) {
      onStart({
        role: selectedRole,
        experienceLevel,
        interviewType,
        mode,
        resumeUploaded,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={step > 1 ? () => setStep(step - 1) : onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            {step > 1 ? "Back" : "Home"}
          </Button>
          
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  s === step ? "w-8 bg-primary" : s < step ? "bg-primary" : "bg-secondary"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Role Selection */}
        {step === 1 && (
          <div className="opacity-0 animate-fade-in">
            <div className="text-center mb-10">
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Select Your Target <span className="text-gradient">Role</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Choose the position you're preparing for
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {roles.map((role) => (
                <Card
                  key={role.id}
                  variant="interactive"
                  className={`cursor-pointer transition-all ${
                    selectedRole === role.id ? "border-primary shadow-glow" : ""
                  }`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      selectedRole === role.id ? "bg-gradient-primary" : "bg-secondary"
                    }`}>
                      <role.icon className={`w-6 h-6 ${selectedRole === role.id ? "text-primary-foreground" : "text-primary"}`} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground">{role.title}</h3>
                      <p className="text-sm text-muted-foreground">{role.description}</p>
                    </div>
                    {selectedRole === role.id && (
                      <div className="ml-auto w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Experience Level */}
        {step === 2 && (
          <div className="opacity-0 animate-fade-in">
            <div className="text-center mb-10">
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Your Experience <span className="text-gradient">Level</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                This helps us calibrate question difficulty
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-10">
              {experienceLevels.map((level) => (
                <Card
                  key={level.id}
                  variant="interactive"
                  className={`cursor-pointer transition-all ${
                    experienceLevel === level.id ? "border-primary shadow-glow" : ""
                  }`}
                  onClick={() => setExperienceLevel(level.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center ${
                      experienceLevel === level.id ? "bg-gradient-primary" : "bg-secondary"
                    }`}>
                      <level.icon className={`w-7 h-7 ${experienceLevel === level.id ? "text-primary-foreground" : "text-primary"}`} />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground">{level.title}</h3>
                    <p className="text-sm text-muted-foreground">{level.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Interview Type */}
        {step === 3 && (
          <div className="opacity-0 animate-fade-in">
            <div className="text-center mb-10">
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Interview <span className="text-gradient">Type</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                What kind of interview do you want to practice?
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-10">
              {interviewTypes.map((type) => (
                <Card
                  key={type.id}
                  variant="interactive"
                  className={`cursor-pointer transition-all ${
                    interviewType === type.id ? "border-primary shadow-glow" : ""
                  }`}
                  onClick={() => setInterviewType(type.id)}
                >
                  <CardContent className="p-6 text-center">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">{type.title}</h3>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Mode Selection */}
        {step === 4 && (
          <div className="opacity-0 animate-fade-in">
            <div className="text-center mb-10">
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Choose Your <span className="text-gradient">Mode</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                How would you like to respond?
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto">
              {modes.map((m) => (
                <Card
                  key={m.id}
                  variant="interactive"
                  className={`cursor-pointer transition-all relative ${
                    mode === m.id ? "border-primary shadow-glow" : ""
                  }`}
                  onClick={() => setMode(m.id)}
                >
                  {m.recommended && (
                    <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-primary text-primary-foreground text-xs font-semibold rounded-bl-lg rounded-tr-lg">
                      Recommended
                    </div>
                  )}
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
                      mode === m.id ? "bg-gradient-primary" : "bg-secondary"
                    }`}>
                      <m.icon className={`w-8 h-8 ${mode === m.id ? "text-primary-foreground" : "text-primary"}`} />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground">{m.title}</h3>
                    <p className="text-sm text-muted-foreground">{m.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Resume Upload */}
        {step === 5 && (
          <div className="opacity-0 animate-fade-in">
            <div className="text-center mb-10">
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Upload Your <span className="text-gradient">Resume</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Optional: Get personalized questions based on your experience
              </p>
            </div>

            <div className="max-w-xl mx-auto mb-10">
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
                  isDragging ? "border-primary bg-primary/5" : resumeUploaded ? "border-success bg-success/5" : "border-border hover:border-primary/50"
                }`}
              >
                {resumeUploaded ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-success/20 flex items-center justify-center">
                      <FileText className="w-8 h-8 text-success" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Resume Uploaded</p>
                      <p className="text-sm text-muted-foreground">AI will generate personalized questions</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setResumeUploaded(false)}
                      className="text-destructive"
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Drag & drop your resume</p>
                      <p className="text-sm text-muted-foreground">or click to browse (PDF only)</p>
                    </div>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload">
                      <Button variant="glass" size="sm" asChild>
                        <span>Browse Files</span>
                      </Button>
                    </label>
                  </div>
                )}
              </div>

              <p className="text-center text-sm text-muted-foreground mt-4">
                You can skip this step and start with general questions
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-center gap-4">
          {step < 5 ? (
            <Button
              variant="hero"
              size="xl"
              disabled={!canProceed()}
              onClick={() => setStep(step + 1)}
              className="gap-2"
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </Button>
          ) : (
            <Button
              variant="hero"
              size="xl"
              onClick={handleStart}
              className="gap-2"
            >
              Start Interview
              <ArrowRight className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewSetup;