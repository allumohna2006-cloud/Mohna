import React, { useState } from 'react';
import {
  Sparkles,
  LayoutDashboard,
  BookOpen,
  FileText,
  CalendarDays,
  LineChart,
  Bot,
  PlusCircle,
  Bell,
  Menu,
  X,
  ChevronDown,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Zap,
} from 'lucide-react';
import { Subject, NotificationItem } from '../types';
import { ExamCountdown } from './ExamCountdown';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  subjects: Subject[];
  activeSubject: Subject;
  onSelectSubject: (subject: Subject) => void;
  onCreatePlanClick: () => void;
  notifications: NotificationItem[];
  onResetDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  subjects,
  activeSubject,
  onSelectSubject,
  onCreatePlanClick,
  notifications,
  onResetDemo,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [subjectDropdownOpen, setSubjectDropdownOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'subjects', label: 'My Subjects', icon: BookOpen },
    { id: 'materials', label: 'Study Materials', icon: FileText },
    { id: 'plan', label: 'Study Plan', icon: CalendarDays },
    { id: 'progress', label: 'Progress', icon: LineChart },
    { id: 'assistant', label: 'AI Study Assistant', icon: Bot, highlight: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      {/* Top Prototype & n8n Automation Notice Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">StudyFlow AI Prototype:</span>
            <span className="truncate hidden sm:inline text-slate-300">
              Demo student loaded (Alex Rivera) • Ready for n8n Agent Webhook (`/api/agent`)
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('landing')}
              className="text-xs text-indigo-300 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
            >
              Landing Overview
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={onResetDemo}
              title="Reset sample study tasks, health & mock documents"
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span className="hidden md:inline">Reset Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-hidden"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-bold text-slate-900 tracking-tight">StudyFlow</span>
                  <span className="text-xs font-semibold px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-700 font-mono">
                    AI
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium hidden sm:block leading-none">
                  Turn material into an adaptive plan
                </p>
              </div>
            </button>

            {/* Subject Selector Switcher */}
            <div className="relative ml-2 sm:ml-4 hidden lg:block">
              <button
                onClick={() => setSubjectDropdownOpen(!subjectDropdownOpen)}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 border border-slate-200/90 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-800 transition-colors cursor-pointer"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: activeSubject.color || '#3B82F6' }}
                />
                <span className="font-semibold">{activeSubject.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {subjectDropdownOpen && (
                <div className="absolute left-0 mt-1 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Select Subject
                  </div>
                  {subjects.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => {
                        onSelectSubject(sub);
                        setSubjectDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-slate-50 transition-colors ${
                        sub.id === activeSubject.id ? 'bg-indigo-50/60 font-semibold text-indigo-900' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: sub.color }} />
                        <span className="truncate">{sub.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-1">{sub.code}</span>
                    </button>
                  ))}
                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button
                      onClick={() => {
                        setSubjectDropdownOpen(false);
                        onNavigate('subjects');
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-indigo-600 font-medium hover:bg-indigo-50"
                    >
                      Manage All Subjects →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                      : item.highlight
                      ? 'text-indigo-600 hover:bg-indigo-50 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.highlight && !isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5">
            {/* Compact Exam Countdown */}
            <div className="hidden xl:block">
              <ExamCountdown
                examDate={activeSubject.examDate}
                subjectName={activeSubject.name}
                compact={true}
              />
            </div>

            {/* Notification Bell (Simulates n8n reminders) */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Simulated n8n Automated Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Automated Alerts</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono">
                      n8n triggers
                    </span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-3 text-xs hover:bg-slate-50 transition-colors">
                        <div className="flex items-start gap-2">
                          {n.type === 'reminder' ? (
                            <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                          ) : n.type === 'adjustment' ? (
                            <AlertTriangle className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                          ) : (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className="font-semibold text-slate-800">{n.title}</p>
                            <p className="text-slate-500 text-[11px] mt-0.5 leading-snug">{n.message}</p>
                            <span className="text-[10px] text-slate-400 mt-1 block">{n.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Prominent "Create Study Plan" CTA Button */}
            <button
              onClick={onCreatePlanClick}
              className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-md shadow-indigo-500/20 transition-all hover:shadow-indigo-500/30 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Create Study Plan</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-2">
          <div className="py-2">
            <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
              Active Subject
            </p>
            <div className="flex flex-wrap gap-1.5">
              {subjects.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    onSelectSubject(sub);
                  }}
                  className={`text-xs px-2.5 py-1 rounded-md border ${
                    sub.id === activeSubject.id
                      ? 'bg-indigo-50 border-indigo-300 font-semibold text-indigo-900'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-left ${
                    isActive ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
