import React from 'react';
import {
  LineChart,
  CheckCircle2,
  Clock,
  Flame,
  Award,
  BookOpen,
  Calendar,
  AlertCircle,
  TrendingUp,
  BarChart3,
  Sparkles,
} from 'lucide-react';
import { Subject, Topic, StudyTask } from '../types';

interface ProgressViewProps {
  subject: Subject;
  topics: Topic[];
  tasks: StudyTask[];
  currentStreakDays: number;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  subject,
  topics,
  tasks,
  currentStreakDays,
}) => {
  const subjectTasks = tasks.filter((t) => t.subjectId === subject.id);
  const totalTasks = subjectTasks.length || 1;
  const completedTasks = subjectTasks.filter((t) => t.status === 'Completed').length;
  const missedTasks = subjectTasks.filter((t) => t.status === 'Missed').length;
  const inProgressTasks = subjectTasks.filter((t) => t.status === 'In Progress').length;

  const completedTopics = topics.filter((t) => t.status === 'Completed').length;
  const inProgressTopics = topics.filter((t) => t.status === 'In Progress').length;
  const remainingTopics = topics.length - completedTopics;

  const overallPercent = Math.round((completedTasks / totalTasks) * 100);

  // Weekly study activity data (Mon - Sun)
  const weeklyData = [
    { day: 'Mon', hours: 2.5, target: 3 },
    { day: 'Tue', hours: 3.0, target: 3 },
    { day: 'Wed', hours: 2.0, target: 3 },
    { day: 'Thu', hours: 1.0, target: 3 },
    { day: 'Fri (Today)', hours: 2.25, target: 3 },
    { day: 'Sat', hours: 0.0, target: 3 },
    { day: 'Sun', hours: 0.0, target: 3 },
  ];

  const totalHoursLogged = 10.75;
  const totalHoursPlanned = 21.0;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Progress & Analytics</h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono">
              {subject.name}
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Real-time mastery tracking across syllabus topics, daily study hours, and habit consistency.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-800 border border-amber-200/80 rounded-xl text-xs font-bold shadow-2xs">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{currentStreakDays} Day Streak 🔥</span>
          </div>
        </div>
      </div>

      {/* 6 High-Level Metric Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Overall Done</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 font-mono mt-1">
            {overallPercent}%
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Syllabus total</div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Topics Done</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono mt-1">
            {completedTopics}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">of {topics.length} topics</div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Topics Left</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-700 font-mono mt-1">
            {remainingTopics}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Remaining</div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Study Hours</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono mt-1">
            10.8h
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">of {totalHoursPlanned}h planned</div>
        </div>

        {/* Metric 5 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Tasks Done</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-mono mt-1">
            {completedTasks}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">of {totalTasks} tasks</div>
        </div>

        {/* Metric 6 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Tasks Missed</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-rose-500 font-mono mt-1">
            {missedTasks}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Auto-rescheduled</div>
        </div>
      </div>

      {/* 2-Column Visual Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Card: Topic Progress Bars */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">Topic Progress</h3>
              <p className="text-xs text-slate-500">Mastery breakdown per syllabus module</p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono">
              {topics.length} modules
            </span>
          </div>

          <div className="space-y-4 pt-1">
            {topics.map((t) => {
              // Custom progress percentage reflecting demo state
              let prog = t.progressPercentage;
              if (t.name === 'Arrays') prog = 100;
              if (t.name === 'Linked Lists') prog = 80;
              if (t.name === 'Stacks') prog = 60;
              if (t.name === 'Queues') prog = 50;
              if (t.name === 'Trees') prog = 20;
              if (t.name === 'Graphs') prog = 0;
              if (t.name === 'Sorting') prog = 0;
              if (t.name === 'Searching') prog = 0;

              return (
                <div key={t.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">{t.name}</span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          t.difficulty === 'Easy'
                            ? 'bg-emerald-50 text-emerald-700'
                            : t.difficulty === 'Medium'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {t.difficulty}
                      </span>
                    </div>

                    <span className="font-mono font-bold text-slate-700">{prog}%</span>
                  </div>

                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        prog === 100
                          ? 'bg-emerald-500'
                          : prog > 50
                          ? 'bg-indigo-600'
                          : prog > 0
                          ? 'bg-amber-500'
                          : 'bg-transparent'
                      }`}
                      style={{ width: `${prog}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Card: Study Activity Weekly Chart */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">Study Activity</h3>
                <p className="text-xs text-slate-500">Weekly recorded hours against daily 3h target</p>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-mono">
                This Week
              </span>
            </div>

            {/* Visual Bar Chart */}
            <div className="pt-6 pb-2">
              <div className="h-48 flex items-end justify-between gap-2 px-2">
                {weeklyData.map((d, i) => {
                  const maxH = 3.5;
                  const barHeight = Math.min(100, Math.round((d.hours / maxH) * 100));
                  const isToday = d.day.includes('Today');

                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                      {/* Hover Tooltip */}
                      <span className="text-[10px] font-mono font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        {d.hours}h
                      </span>

                      {/* Bar */}
                      <div className="w-full max-w-[36px] bg-slate-100 rounded-t-lg h-36 flex items-end p-0.5">
                        <div
                          className={`w-full rounded-t-md transition-all duration-500 ${
                            isToday
                              ? 'bg-gradient-to-t from-indigo-600 to-violet-500 shadow-xs'
                              : d.hours >= 3
                              ? 'bg-emerald-500'
                              : d.hours > 0
                              ? 'bg-indigo-400'
                              : 'bg-transparent'
                          }`}
                          style={{ height: `${barHeight}%` }}
                        />
                      </div>

                      {/* Day Label */}
                      <span
                        className={`text-[11px] font-medium truncate ${
                          isToday ? 'font-bold text-indigo-600' : 'text-slate-500'
                        }`}
                      >
                        {d.day.split(' ')[0]}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500" />
                    <span>Goal Met (≥3h)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-indigo-500" />
                    <span>In Progress</span>
                  </div>
                </div>

                <span className="font-mono text-slate-600 font-semibold">Avg: 2.15h / day</span>
              </div>
            </div>
          </div>

          {/* Retention & Exam Readiness Metric */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-indigo-600" />
              <div>
                <span className="text-xs font-bold text-slate-900 block">Exam Readiness Projection</span>
                <span className="text-[11px] text-slate-500">Predicted syllabus retention at current pace: <strong>88%</strong></span>
              </div>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Strong Track
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
