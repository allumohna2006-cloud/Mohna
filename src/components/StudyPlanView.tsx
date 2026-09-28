import React, { useState } from 'react';
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Zap,
  ArrowRight,
  Sparkles,
  Check,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sliders,
  ShieldCheck,
  Flame,
} from 'lucide-react';
import { StudyPlan, Subject, StudyTask, PlanAdjustmentProposal } from '../types';

interface StudyPlanViewProps {
  studyPlan: StudyPlan;
  subject: Subject;
  tasks: StudyTask[];
  onToggleTask: (taskId: string, currentStatus: any) => void;
  onApplyProposal: (proposalId: string) => void;
  onNavigateToAssistant: () => void;
}

export const StudyPlanView: React.FC<StudyPlanViewProps> = ({
  studyPlan,
  subject,
  tasks,
  onToggleTask,
  onApplyProposal,
  onNavigateToAssistant,
}) => {
  const [expandedDays, setExpandedDays] = useState<{ [key: number]: boolean }>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: false,
    6: false,
    7: false,
  });

  const toggleDayExpanded = (dayNum: number) => {
    setExpandedDays((prev) => ({ ...prev, [dayNum]: !prev[dayNum] }));
  };

  const proposal = studyPlan.activeProposal;

  // Calculate stats
  const totalTasks = tasks.filter((t) => t.subjectId === subject.id).length || 1;
  const completedTasks = tasks.filter((t) => t.subjectId === subject.id && t.status === 'Completed').length;
  const percentComplete = Math.round((completedTasks / totalTasks) * 100);

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'On Track':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300';
      case 'Slightly Behind':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      case 'Behind Schedule':
        return 'bg-rose-50 text-rose-800 border-rose-300';
      default:
        return 'bg-slate-50 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header with Overall Progress */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                {subject.name} Study Plan
              </h1>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono">
                {subject.code}
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Adaptive day-by-day syllabus schedule leading up to your exam in 6 days.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-700">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Target: {subject.dailyAvailableHours} hours / day</span>
            </div>

            <div className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border ${getHealthColor(studyPlan.healthStatus)}`}>
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              <span>Plan Health: {studyPlan.healthStatus}</span>
            </div>
          </div>
        </div>

        {/* Overall Completion Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-slate-700">Overall Syllabus Progress</span>
            <span className="font-bold text-indigo-600 font-mono text-sm">{percentComplete}% Complete ({completedTasks}/{totalTasks} tasks)</span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${percentComplete}%` }}
            />
          </div>
        </div>
      </div>

      {/* Dedicated Section: Plan Health & Adaptive Re-scheduling Engine */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-indigo-700/50 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center">
                <Zap className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  <span>Plan Health & Adaptive Engine</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    studyPlan.healthStatus === 'On Track' ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/30' : 'bg-amber-500/30 text-amber-200 border border-amber-400/30'
                  }`}>
                    {studyPlan.healthStatus}
                  </span>
                </h3>
                <p className="text-xs text-indigo-200/80">
                  Continuous agentic rescheduling — adapts when tasks are completed or missed.
                </p>
              </div>
            </div>

            <button
              onClick={onNavigateToAssistant}
              className="text-xs font-semibold text-indigo-300 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <span>Consult AI Assistant</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Adaptive Scenario Demonstration */}
          {proposal && !proposal.applied ? (
            <div className="mt-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-amber-400/30">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs shrink-0 mt-0.5">
                  ALERT
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-sm font-bold text-amber-300">
                      Plan Adjustment Suggested (Trees Reinforcement)
                    </span>
                    <span className="text-[11px] text-indigo-200 font-mono">
                      Generated {proposal.createdAt}
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 mt-1">
                    {proposal.reason}
                  </p>

                  {/* Comparison Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    <div className="bg-black/30 rounded-xl p-3 border border-white/10">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-rose-300 block mb-1">
                        Current Rigid Timeline
                      </span>
                      <p className="text-xs text-slate-300 font-mono line-through opacity-75">
                        {proposal.originalScheduleSummary}
                      </p>
                    </div>

                    <div className="bg-indigo-950/70 rounded-xl p-3 border border-indigo-400/40">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300 block mb-1">
                        Proposed Adaptive Timeline
                      </span>
                      <p className="text-xs text-emerald-200 font-semibold font-mono">
                        {proposal.adjustedScheduleSummary}
                      </p>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-[11px] text-indigo-200/90 italic">
                      This demonstrates the future agent's ability to adapt instead of simply generating a static timetable.
                    </p>

                    <button
                      onClick={() => onApplyProposal(proposal.id)}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                    >
                      <Zap className="w-4 h-4 fill-slate-950" />
                      <span>Apply New Plan</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4 bg-white/5 rounded-2xl p-4 border border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <div>
                  <h4 className="text-sm font-bold text-white">Your Plan is Optimal & Active</h4>
                  <p className="text-xs text-indigo-200/80">
                    The adaptive agent will trigger a re-scheduling proposal if tasks fall behind.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  // Simulate an incomplete task by marking Trees as In Progress and health to Slightly Behind
                  const treeTask = tasks.find((t) => t.topicName.includes('Trees'));
                  if (treeTask) {
                    onToggleTask(treeTask.id, 'In Progress');
                  }
                }}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-indigo-200 transition-colors cursor-pointer shrink-0"
              >
                Simulate Missed Task
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Daily Timeline Schedule */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-indigo-600" />
            <span>Timeline by Day</span>
          </h2>
          <span className="text-xs text-slate-400">Click headers to expand or collapse details</span>
        </div>

        <div className="space-y-3">
          {studyPlan.days.map((day) => {
            const isExpanded = expandedDays[day.dayNumber] !== false;
            const dayTasks = day.tasks || [];
            const isCompleted = day.status === 'Completed';
            const isInProgress = day.status === 'In Progress';
            const isMissed = day.status === 'Missed';

            return (
              <div
                key={day.dayNumber}
                className={`bg-white rounded-2xl border transition-all shadow-2xs overflow-hidden ${
                  day.dayNumber === 3
                    ? 'border-indigo-300 ring-2 ring-indigo-500/10'
                    : isCompleted
                    ? 'border-slate-200/70 bg-slate-50/40'
                    : 'border-slate-200/80'
                }`}
              >
                {/* Day Header Bar */}
                <div
                  onClick={() => toggleDayExpanded(day.dayNumber)}
                  className="p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/80 transition-colors select-none"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm font-mono shrink-0 ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : day.dayNumber === 3
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      D{day.dayNumber}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                          DAY {day.dayNumber} • {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </span>
                        {day.dayNumber === 3 && (
                          <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-indigo-100 text-indigo-700">
                            Today
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 tracking-tight truncate mt-0.5">
                        {day.topicName}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:flex items-center gap-1 text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{day.estimatedMinutes} mins</span>
                    </span>

                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : isInProgress
                          ? 'bg-indigo-100 text-indigo-800'
                          : isMissed
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {day.status}
                    </span>

                    <button className="text-slate-400 hover:text-slate-600 p-1">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Day Tasks List (Collapsible) */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-100 space-y-2.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Tasks to Complete:
                    </div>

                    {dayTasks.map((task) => {
                      const taskDone = task.status === 'Completed';
                      const taskActive = task.status === 'In Progress';

                      return (
                        <div
                          key={task.id}
                          onClick={() => {
                            const next = taskDone ? 'Not Started' : taskActive ? 'Completed' : 'In Progress';
                            onToggleTask(task.id, next);
                          }}
                          className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                            taskDone
                              ? 'bg-slate-50/80 border-slate-200/60 opacity-80'
                              : taskActive
                              ? 'bg-indigo-50/40 border-indigo-200'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <button
                            type="button"
                            aria-label={`Toggle task ${task.title}`}
                            className={`mt-0.5 w-4.5 h-4.5 rounded flex items-center justify-center transition-colors shrink-0 ${
                              taskDone
                                ? 'bg-emerald-600 text-white'
                                : taskActive
                                ? 'border-2 border-indigo-600 bg-white text-indigo-600'
                                : 'border-2 border-slate-300 bg-white'
                            }`}
                          >
                            {taskDone && <Check className="w-3 h-3 stroke-[3]" />}
                            {taskActive && <span className="w-1.5 h-1.5 rounded-xs bg-indigo-600" />}
                          </button>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className={`text-xs font-semibold ${
                                  taskDone ? 'line-through text-slate-500' : 'text-slate-900'
                                }`}
                              >
                                {task.title}
                              </span>
                              <span className="text-[11px] font-mono text-slate-400 shrink-0">
                                {task.durationMinutes}m
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                              {task.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
