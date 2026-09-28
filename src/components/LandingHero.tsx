import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Upload,
  Calendar,
  RefreshCw,
  CheckCircle2,
  Workflow,
  Cpu,
  BellRing,
  Layers,
  FileText,
  Clock,
  ChevronRight,
  ShieldCheck,
  BrainCircuit,
} from 'lucide-react';

interface LandingHeroProps {
  onCreatePlanClick: () => void;
  onExploreDemoClick: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onCreatePlanClick,
  onExploreDemoClick,
}) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24">
        {/* Ambient Gradient Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-100/70 via-indigo-50/30 to-transparent pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>StudyFlow AI • Student Productivity & Adaptive Planning</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span className="text-slate-500 font-normal">n8n Agent Ready</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight sm:leading-tight">
            Study Smarter. Plan Better.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-800">
              Stay on Track.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Upload your study material, set your goal, and turn your syllabus into a personalized study plan.
          </p>

          <p className="mt-2 text-xs sm:text-sm font-medium text-indigo-600/90 tracking-wide uppercase">
            “Turn your study material into a plan you can actually follow.”
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={onCreatePlanClick}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all text-sm cursor-pointer group"
            >
              <span>Create My Study Plan</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={onExploreDemoClick}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300/80 font-semibold px-6 py-3 rounded-xl shadow-xs transition-all text-sm cursor-pointer hover:border-slate-400"
            >
              <span>Explore Demo</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Core Workflow Pills */}
          <div className="mt-12 pt-8 border-t border-slate-200/80 max-w-3xl mx-auto">
            <p className="text-xs uppercase font-semibold text-slate-400 tracking-wider mb-3">
              The StudyFlow Workflow
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-slate-700">
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg shadow-2xs">Upload</span>
              <span className="text-slate-300">→</span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg shadow-2xs">Understand</span>
              <span className="text-slate-300">→</span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg shadow-2xs">Plan</span>
              <span className="text-slate-300">→</span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg shadow-2xs">Study</span>
              <span className="text-slate-300">→</span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg shadow-2xs">Track</span>
              <span className="text-slate-300">→</span>
              <span className="px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-lg shadow-2xs font-bold">
                Adapt
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Steps Section */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Three Simple Steps to Exam Readiness
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Transform unstructured notes into an execution schedule that dynamically flexes around your life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 relative hover:border-indigo-300 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg mb-4 shadow-xs group-hover:scale-105 transition-transform">
                <Upload className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                Step 01
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">1. Upload</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Add notes, PDFs, syllabus, or study material. The system automatically categorizes key topics, complexity, and estimated reading time.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-2 text-xs text-slate-500">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>Supports PDF, DOCX, & Note text</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 relative hover:border-indigo-300 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-lg mb-4 shadow-xs group-hover:scale-105 transition-transform">
                <Calendar className="w-5 h-5 text-violet-600" />
              </div>
              <div className="text-xs font-bold text-violet-600 uppercase tracking-wider mb-1">
                Step 02
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">2. Plan</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Create a personalized schedule based on the student's deadline and available time. Converts syllabus concepts into daily bite-sized tasks.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-2 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Tailored to your daily study hours</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 relative hover:border-indigo-300 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg mb-4 shadow-xs group-hover:scale-105 transition-transform">
                <RefreshCw className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
                Step 03
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">3. Adapt</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Adjust the plan as the student completes or misses tasks. Unlike static timetables, the agent re-aligns subsequent days so you never fall behind.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Dynamic Plan Health monitoring</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future n8n & Agent Architecture Showcase */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-300 text-xs font-mono font-medium mb-3">
              <Workflow className="w-3.5 h-3.5" />
              <span>Future Automation Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Designed for Seamless n8n Orchestration
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              StudyFlow AI is engineered with decoupled services so an autonomous agent running on n8n can observe, reason, and adapt the schedule 24/7.
            </p>
          </div>

          {/* Architecture Pipeline Flow */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 text-center">
              <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-3.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 mx-auto flex items-center justify-center mb-2">
                  <Layers className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-white">StudyFlow Web</div>
                <div className="text-[10px] text-slate-400 mt-1">Student UI & Inputs</div>
              </div>

              <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-3.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 mx-auto flex items-center justify-center mb-2">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-white">Backend API</div>
                <div className="text-[10px] text-slate-400 mt-1">REST /api/agent</div>
              </div>

              <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-3.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-2">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-white">Database</div>
                <div className="text-[10px] text-slate-400 mt-1">State & Schedules</div>
              </div>

              <div className="bg-slate-900/80 border border-indigo-500/50 rounded-xl p-3.5 shadow-md shadow-indigo-500/10 ring-1 ring-indigo-500/30">
                <div className="w-8 h-8 rounded-lg bg-indigo-500 text-white mx-auto flex items-center justify-center mb-2">
                  <Workflow className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-indigo-300">n8n Engine</div>
                <div className="text-[10px] text-slate-300 mt-1">Webhook Dispatch</div>
              </div>

              <div className="bg-slate-900/80 border border-purple-500/50 rounded-xl p-3.5">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 mx-auto flex items-center justify-center mb-2">
                  <BrainCircuit className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-purple-300">AI Agent</div>
                <div className="text-[10px] text-slate-400 mt-1">Observe & Adapt</div>
              </div>

              <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-3.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center mb-2">
                  <BellRing className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-white">Automations</div>
                <div className="text-[10px] text-slate-400 mt-1">Telegram / Reminders</div>
              </div>
            </div>

            {/* Agent Loop Explanation */}
            <div className="mt-6 pt-5 border-t border-slate-700/60 text-xs text-slate-300 flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">Agentic Behavior:</span>
                <span className="font-mono text-indigo-300">
                  Observe → Reason → Plan → Act → Check → Adapt
                </span>
              </div>
              <button
                onClick={onExploreDemoClick}
                className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Launch Interactive Demo Student</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <span className="font-semibold text-slate-700">StudyFlow AI</span> — Turn your study material into a plan you can actually follow.
          </div>
          <div className="text-slate-400">
            Frontend Prototype • Designed for n8n automation & AI Agent orchestration
          </div>
        </div>
      </footer>
    </div>
  );
};
