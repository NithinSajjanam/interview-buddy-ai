import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Database, Terminal, ArrowRight } from "lucide-react";

interface RoleSelectionProps {
  selectedRole: string | null;
  onSelectRole: (role: string) => void;
}

const roles = [
  {
    id: "frontend",
    title: "Frontend Developer",
    description: "React, JavaScript, CSS, UI/UX patterns, and modern web technologies",
    icon: Code,
    topics: ["React Hooks", "State Management", "CSS Layouts", "Performance"],
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    description: "SQL, Python, statistics, data visualization, and analytical thinking",
    icon: Database,
    topics: ["SQL Queries", "Data Modeling", "Visualization", "Statistics"],
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: "sde",
    title: "Software Engineer",
    description: "DSA, system design, OOP principles, and problem-solving skills",
    icon: Terminal,
    topics: ["Algorithms", "System Design", "OOP", "Data Structures"],
    color: "from-green-500/20 to-emerald-500/20",
  },
];

const RoleSelection = ({ selectedRole, onSelectRole }: RoleSelectionProps) => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Choose Your <span className="text-gradient">Role</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select the position you're preparing for. Our AI will tailor questions and feedback specifically for your target role.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role, index) => (
            <Card
              key={role.id}
              variant="interactive"
              className={`group relative overflow-hidden opacity-0 animate-scale-in ${
                selectedRole === role.id ? "border-primary shadow-glow" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => onSelectRole(role.id)}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <CardHeader className="relative">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <role.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{role.title}</CardTitle>
                <CardDescription className="text-sm">{role.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="relative">
                <div className="flex flex-wrap gap-2 mb-4">
                  {role.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-muted-foreground"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center text-sm text-primary font-medium group-hover:gap-2 transition-all duration-300">
                  <span>Select Role</span>
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                </div>
              </CardContent>

              {/* Selected indicator */}
              {selectedRole === role.id && (
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoleSelection;
