import React from 'react';
import {
  CheckCircle2,
  Clock,
  Calendar,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Sparkles,
  BookOpen,
  FileText,
  Bot,
  Flame,
  Check,
  ChevronRight,
  RefreshCw,
  Zap,
} from 'lucide-react';
import { User, Subject, StudyPlan, StudyTask, Topic } from '../types';
import { ExamCountdown } from './ExamCountdown';

interface DashboardViewProps {
  user: User;
  activeSubject: Subject;
  studyPlan: StudyPlan;
  tasks: StudyTask[];
  topics: Topic[];
  onToggleTask: (taskId: string, currentStatus: any) => void;
  onApplyProposal: (proposalId: string) => void;
  onNavigate: (view: string) => void;
  onCreatePlanClick: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  activeSubject,
  studyPlan,
  tasks,
  topics,
  onToggleTask,
  onApplyProposal,
  onNavigate,
  onCreatePlanClick,
}) => {
  // Filter today's tasks (Day 3 in our demo setup)
  const todayTasks = tasks.filter((t) => t.subjectId === activeSubject.id && t.dayNumber === 3);
  const completedTodayCount = todayTasks.filter((t) => t.status === 'Completed').length;
  const totalTodayCount = todayTasks.length || 5;
  const todayPercent = Math.round((completedTodayCount / totalTodayCount) * 100);

  // Topics breakdown
  const completedTopicsCount = topics.filter((t) => t.status === 'Completed').length;
  const inProgressTopicsCount = topics.filter((t) => t.status === 'In Progress').length;
  const notStartedTopicsCount = topics.filter((t) => t.status === 'Not Started').length;

  // Active adaptive proposal
  const proposal = studyPlan.activeProposal;

  return (
    <div className="space-y-6 pb-12">
      {/* Student Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Hello, {user.name} 👋
            </h1>
            <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/80">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{user.currentStreakDays}-day streak</span>
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Enrolled in {activeSubject.name} ({activeSubject.code}) • Target daily goal: {activeSubject.dailyAvailableHours}h
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onNavigate('assistant')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/80 transition-colors cursor-pointer"
          >
            <Bot className="w-4 h-4 text-indigo-600" />
            <span>Ask AI Assistant</span>
          </button>

          <button
            onClick={onCreatePlanClick}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-500/20 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Create Study Plan</span>
          </button>
        </div>
      </div>

      {/* Primary Exam Countdown Component */}
      <ExamCountdown
        examDate={activeSubject.examDate}
        subjectName={activeSubject.name}
      />

      {/* Top 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Today's Progress */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Today's Progress</span>
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {completedTodayCount} / {totalTodayCount}
            </span>
            <span className="text-xs font-semibold text-slate-500">tasks completed</span>
          </div>

          <div className="mt-3">
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${todayPercent}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1.5 font-medium">
              <span>Day 3 Target</span>
              <span className="font-semibold text-blue-600">{todayPercent}% done</span>
            </div>
          </div>
        </div>

        {/* Card 2: Upcoming Exam */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Upcoming Exam</span>
            <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Calendar className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <h4 className="text-xl font-extrabold text-slate-900 tracking-tight truncate">
              {activeSubject.name}
            </h4>
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 mt-1">
              <Clock className="w-3.5 h-3.5" />
              <span>6 days remaining</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Target knowledge: {activeSubject.knowledgeLevel}
          </p>
        </div>

        {/* Card 3: Study Time */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Study Time</span>
            <span className="p-2 rounded-xl bg-violet-50 text-violet-600">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">2h 15m</span>
            <span className="text-xs text-slate-500 font-medium">/ 3h planned</span>
          </div>
          <div className="mt-3">
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-violet-600 h-full rounded-full" style={{ width: '75%' }} />
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1.5 font-medium">
              <span>45m remaining today</span>
              <span className="font-semibold text-violet-600">75%</span>
            </div>
          </div>
        </div>

        {/* Card 4: Topics Breakdown */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Topics</span>
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <BookOpen className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div className="bg-emerald-50/70 border border-emerald-100 rounded-lg p-1.5">
              <div className="text-base font-extrabold text-emerald-700">{completedTopicsCount}</div>
              <div className="text-[10px] font-semibold text-emerald-600 uppercase">Done</div>
            </div>
            <div className="bg-amber-50/70 border border-amber-100 rounded-lg p-1.5">
              <div className="text-base font-extrabold text-amber-700">{inProgressTopicsCount}</div>
              <div className="text-[10px] font-semibold text-amber-600 uppercase">Active</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-1.5">
              <div className="text-base font-extrabold text-slate-700">{notStartedTopicsCount}</div>
              <div className="text-[10px] font-semibold text-slate-500 uppercase">Left</div>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 text-center">
            Total {topics.length} syllabus topics identified
          </p>
        </div>
      </div>

      {/* Plan Health & Adaptive Suggestion Banner (Key Agentic Feature) */}
      {proposal && !proposal.applied && (
        <div className="bg-linear-to-r from-amber-50 via-orange-50 to-indigo-50 border border-amber-300/80 rounded-2xl p-5 shadow-xs relative">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-200/70 text-amber-900">
                    Plan Health: {studyPlan.healthStatus}
                  </span>
                  <span className="text-xs font-bold text-amber-800">Plan Adjustment Suggested</span>
                </div>
                <p className="text-sm font-semibold text-slate-800 mt-1">
                  Trees requires reinforcement: Adaptive agent proposed realigning Day 4 & Day 5
                </p>
                <div className="mt-2 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 font-mono">
                  <div>
                    <span className="text-slate-400 font-sans font-medium">Original: </span>
                    <span className="line-through text-slate-500">Day 4 Graphs → Day 5 Sorting</span>
                  </div>
                  <div>
                    <span className="text-indigo-600 font-sans font-medium">Adjusted: </span>
                    <span className="font-semibold text-indigo-900">Day 4 Finish Trees → Day 5 Graphs</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full lg:w-auto justify-end">
              <button
                onClick={() => onNavigate('plan')}
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-white/60 rounded-xl transition-colors cursor-pointer"
              >
                Inspect in Timeline
              </button>
              <button
                onClick={() => onApplyProposal(proposal.id)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Apply New Plan</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Today's Tasks */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">Today's Tasks</h3>
                <p className="text-xs text-slate-500">
                  Day 3 Schedule • Check off items as you study to trigger adaptive recalculation
                </p>
              </div>

              <button
                onClick={() => onNavigate('plan')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
              >
                <span>View Full Schedule</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Tasks Checklist */}
            <div className="space-y-2.5">
              {todayTasks.map((task) => {
                const isCompleted = task.status === 'Completed';
                const isInProgress = task.status === 'In Progress';

                return (
                  <div
                    key={task.id}
                    onClick={() => {
                      const next = isCompleted ? 'Not Started' : isInProgress ? 'Completed' : 'In Progress';
                      onToggleTask(task.id, next);
                    }}
                    className={`flex items-start gap-3.5 p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isCompleted
                        ? 'bg-slate-50/80 border-slate-200/60 opacity-80'
                        : isInProgress
                        ? 'bg-indigo-50/40 border-indigo-200 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {/* Checkbox */}
                    <button
                      type="button"
                      aria-label={`Toggle task ${task.title}`}
                      className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-colors shrink-0 ${
                        isCompleted
                          ? 'bg-emerald-600 text-white'
                          : isInProgress
                          ? 'border-2 border-indigo-600 bg-white text-indigo-600'
                          : 'border-2 border-slate-300 hover:border-indigo-400 bg-white'
                      }`}
                    >
                      {isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      {isInProgress && <span className="w-2 h-2 rounded-xs bg-indigo-600" />}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 truncate">
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                              task.topicName.includes('Arrays')
                                ? 'bg-blue-100 text-blue-800'
                                : task.topicName.includes('Linked')
                                ? 'bg-cyan-100 text-cyan-800'
                                : task.topicName.includes('Stacks')
                                ? 'bg-purple-100 text-purple-800'
                                : task.topicName.includes('Queues')
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {task.topicName}
                          </span>
                          <span
                            className={`text-sm font-semibold truncate ${
                              isCompleted ? 'line-through text-slate-500' : 'text-slate-900'
                            }`}
                          >
                            {task.title}
                          </span>
                        </div>

                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                            isCompleted
                              ? 'bg-emerald-100 text-emerald-800'
                              : isInProgress
                              ? 'bg-indigo-100 text-indigo-800 animate-pulse'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{task.description}</p>

                      <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3" />
                          {task.durationMinutes} mins
                        </span>
                        <span>•</span>
                        <span>Click to toggle (Done / In Progress / Todo)</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Quick Shortcuts & Material Extraction */}
        <div className="space-y-4">
          {/* Quick Action Card: Upload Material */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-5 shadow-md">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center mb-3">
              <FileText className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-white">Study Materials</h4>
            <p className="text-xs text-indigo-200/80 mt-1">
              "Data Structures Notes.pdf" is ready with 8 extracted topics and practice questions.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => onNavigate('materials')}
                className="flex-1 bg-white hover:bg-slate-100 text-indigo-950 font-bold text-xs py-2 px-3 rounded-xl transition-colors text-center cursor-pointer"
              >
                Manage Files
              </button>
              <button
                onClick={() => onNavigate('materials')}
                className="bg-indigo-700/60 hover:bg-indigo-700 text-white text-xs font-semibold py-2 px-3 rounded-xl border border-indigo-500/40 transition-colors cursor-pointer"
              >
                Extract Topics
              </button>
            </div>
          </div>

          {/* AI Study Assistant Teaser */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">AI Study Assistant</h4>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Have questions or need to re-balance after a missed session? The assistant reasons across your syllabus and schedule.
            </p>
            <div className="mt-3 space-y-1.5">
              <button
                onClick={() => onNavigate('assistant')}
                className="w-full text-left text-xs bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 p-2 rounded-lg border border-slate-200/80 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>“What should I study today?”</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                onClick={() => onNavigate('assistant')}
                className="w-full text-left text-xs bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 p-2 rounded-lg border border-slate-200/80 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>“I missed yesterday’s study session.”</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
