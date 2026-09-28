import React, { useState, useEffect } from 'react';
import { Clock, Calendar, AlertCircle } from 'lucide-react';

interface ExamCountdownProps {
  examDate: string;
  subjectName: string;
  compact?: boolean;
}

export const ExamCountdown: React.FC<ExamCountdownProps> = ({
  examDate,
  subjectName,
  compact = false,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 6,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(examDate).getTime();
      const now = new Date().getTime();
      const difference = Math.max(0, target - now);

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [examDate]);

  if (compact) {
    return (
      <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200/80 rounded-full px-3 py-1 text-xs font-medium text-indigo-900 shadow-xs">
        <Clock className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
        <span className="truncate max-w-[120px] font-semibold">{subjectName}:</span>
        <span className="font-mono text-indigo-700">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
        </span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-xl border border-indigo-700/40 relative overflow-hidden">
      {/* Decorative ambient glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-1">
            <Calendar className="w-3.5 h-3.5 text-indigo-400" />
            <span>Target Exam Countdown</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>{subjectName}</span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
              High Priority
            </span>
          </h3>
          <p className="text-xs text-indigo-200/80 mt-1">
            Exam scheduled for {new Date(examDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full sm:w-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 sm:p-3 text-center border border-white/10 min-w-[56px] sm:min-w-[64px]">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
              {String(timeLeft.days).padStart(2, '0')}
            </div>
            <div className="text-[10px] uppercase font-semibold text-indigo-300 tracking-wider mt-0.5">
              Days
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 sm:p-3 text-center border border-white/10 min-w-[56px] sm:min-w-[64px]">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div className="text-[10px] uppercase font-semibold text-indigo-300 tracking-wider mt-0.5">
              Hours
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 sm:p-3 text-center border border-white/10 min-w-[56px] sm:min-w-[64px]">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div className="text-[10px] uppercase font-semibold text-indigo-300 tracking-wider mt-0.5">
              Mins
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 sm:p-3 text-center border border-white/10 min-w-[56px] sm:min-w-[64px]">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-indigo-300 tracking-tight animate-pulse">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="text-[10px] uppercase font-semibold text-indigo-300 tracking-wider mt-0.5">
              Secs
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
