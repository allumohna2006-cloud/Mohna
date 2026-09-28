import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  Plus,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  FileText,
  Layers,
  Check,
} from 'lucide-react';
import { Subject, StudyMaterial } from '../types';

interface SubjectsViewProps {
  subjects: Subject[];
  activeSubject: Subject;
  materials: StudyMaterial[];
  onSelectSubject: (subject: Subject) => void;
  onCreateSubject: (subjectData: Partial<Subject>) => void;
  onCreatePlanForSubject: (subject: Subject) => void;
  onNavigateToPlan: () => void;
}

export const SubjectsView: React.FC<SubjectsViewProps> = ({
  subjects,
  activeSubject,
  materials,
  onSelectSubject,
  onCreateSubject,
  onCreatePlanForSubject,
  onNavigateToPlan,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSubName, setNewSubName] = useState('');
  const [newSubCode, setNewSubCode] = useState('');
  const [newSubExamDate, setNewSubExamDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split('T')[0];
  });
  const [newSubHours, setNewSubHours] = useState(2);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubName.trim()) return;

    onCreateSubject({
      name: newSubName.trim(),
      code: newSubCode.trim() || 'CS-NEW',
      examDate: newSubExamDate,
      dailyAvailableHours: newSubHours,
      totalTopicsCount: 6,
      completedTopicsCount: 0,
      description: `Course syllabus for ${newSubName.trim()}`,
      color: '#6366F1',
    });

    setNewSubName('');
    setNewSubCode('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Subjects</h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono">
              {subjects.length} Enrolled
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Manage your courses, track individual syllabus milestones, and pin your primary exam focus.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Subject</span>
        </button>
      </div>

      {/* Subjects Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {subjects.map((sub) => {
          const isSelected = sub.id === activeSubject.id;
          const subMaterials = materials.filter((m) => m.subjectId === sub.id);
          const today = new Date();
          const examDate = new Date(sub.examDate);
          const daysRemaining = Math.max(0, Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

          const progressPercent = sub.id === 'sub_cs_ds' ? 44 : sub.id === 'sub_cs_db' ? 20 : 0;

          return (
            <div
              key={sub.id}
              className={`bg-white rounded-2xl border transition-all p-6 shadow-xs flex flex-col justify-between ${
                isSelected
                  ? 'border-indigo-400 ring-2 ring-indigo-500/10'
                  : 'border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div>
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-4 h-4 rounded-full shrink-0 shadow-xs"
                      style={{ backgroundColor: sub.color || '#3B82F6' }}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-900">{sub.name}</h3>
                        <span className="text-[11px] font-mono font-semibold px-2 py-0.2 rounded bg-slate-100 text-slate-600">
                          {sub.code}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{sub.description}</p>
                    </div>
                  </div>

                  {isSelected ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>Active Focus</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => onSelectSubject(sub)}
                      className="text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors shrink-0 cursor-pointer"
                    >
                      Make Active
                    </button>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="mt-5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-600">Syllabus Completion</span>
                    <span className="font-bold text-slate-900 font-mono">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Exam</span>
                    <span className="font-bold text-indigo-700 font-mono">{daysRemaining} days left</span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Topics</span>
                    <span className="font-bold text-slate-800">{sub.totalTopicsCount} topics</span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Materials</span>
                    <span className="font-bold text-slate-800">{subMaterials.length} files</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    onSelectSubject(sub);
                    onNavigateToPlan();
                  }}
                  className="flex-1 text-center py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  View Study Plan
                </button>

                <button
                  onClick={() => {
                    onSelectSubject(sub);
                    onCreatePlanForSubject(sub);
                  }}
                  className="flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Configure Schedule</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Subject Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Add New Subject</h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter the course name and target exam date to generate an adaptive timeline.
            </p>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Subject Name
                </label>
                <input
                  type="text"
                  required
                  value={newSubName}
                  onChange={(e) => setNewSubName(e.target.value)}
                  placeholder="e.g. Artificial Intelligence"
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Course Code
                </label>
                <input
                  type="text"
                  value={newSubCode}
                  onChange={(e) => setNewSubCode(e.target.value)}
                  placeholder="e.g. CS-401"
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Exam Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newSubExamDate}
                    onChange={(e) => setNewSubExamDate(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Daily Hours
                  </label>
                  <select
                    value={newSubHours}
                    onChange={(e) => setNewSubHours(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-indigo-600"
                  >
                    <option value={1}>1 hour</option>
                    <option value={2}>2 hours</option>
                    <option value={3}>3 hours</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                >
                  Add Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
