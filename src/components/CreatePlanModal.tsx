import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Calendar,
  Clock,
  BookOpen,
  GraduationCap,
  Upload,
  Plus,
  Trash2,
  FileText,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { KnowledgeLevel, StudyPlan } from '../types';

interface CreatePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanGenerated: (newPlan: StudyPlan) => void;
  initialMaterialName?: string;
  initialSubjectName?: string;
  initialTopics?: string[];
}

export const CreatePlanModal: React.FC<CreatePlanModalProps> = ({
  isOpen,
  onClose,
  onPlanGenerated,
  initialMaterialName = 'Data Structures Notes.pdf',
  initialSubjectName = 'Computer Science (Algorithms)',
  initialTopics = ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Sorting', 'Searching'],
}) => {
  const [subject, setSubject] = useState(initialSubjectName);
  
  // Default target date is 7 days from now
  const defaultExamDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  };

  const [examDate, setExamDate] = useState(defaultExamDate());
  const [availableHours, setAvailableHours] = useState<number>(2.5);
  const [knowledgeLevel, setKnowledgeLevel] = useState<KnowledgeLevel>('Intermediate');
  const [materialFileName, setMaterialFileName] = useState(initialMaterialName);
  const [topics, setTopics] = useState<string[]>(initialTopics);
  const [newTopicInput, setNewTopicInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleAddTopic = () => {
    if (newTopicInput.trim() && !topics.includes(newTopicInput.trim())) {
      setTopics([...topics, newTopicInput.trim()]);
      setNewTopicInput('');
    }
  };

  const handleRemoveTopic = (indexToRemove: number) => {
    setTopics(topics.filter((_, idx) => idx !== indexToRemove));
  };

  const handleQuickAddCommonTopics = () => {
    setTopics(['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Sorting', 'Searching', 'Dynamic Programming']);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      // Create synthesized days based on input
      const daysCount = Math.min(10, Math.max(3, topics.length));
      const generatedDays = topics.slice(0, daysCount).map((topic, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        return {
          dayNumber: i + 1,
          date: d.toISOString().split('T')[0],
          topicId: `top_${i}`,
          topicName: topic,
          estimatedMinutes: Math.round(availableHours * 60 * 0.8),
          status: 'Not Started' as const,
          tasks: [
            {
              id: `tsk_gen_${i}_1`,
              subjectId: 'sub_custom',
              topicId: `top_${i}`,
              topicName: topic,
              title: `Core principles & syntax for ${topic}`,
              description: `Study theory and architecture from ${materialFileName || 'syllabus'}.`,
              date: d.toISOString().split('T')[0],
              dayNumber: i + 1,
              durationMinutes: Math.round((availableHours * 60) / 2),
              status: 'Not Started' as const,
            },
            {
              id: `tsk_gen_${i}_2`,
              subjectId: 'sub_custom',
              topicId: `top_${i}`,
              topicName: topic,
              title: `${topic} exam problem solving`,
              description: `Solve 4 high-yield test exercises with verification.`,
              date: d.toISOString().split('T')[0],
              dayNumber: i + 1,
              durationMinutes: Math.round((availableHours * 60) / 2),
              status: 'Not Started' as const,
            },
          ],
        };
      });

      const newPlan: StudyPlan = {
        id: `plan_gen_${Date.now()}`,
        subjectId: 'sub_custom',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        examDate,
        dailyAvailableMinutes: Math.round(availableHours * 60),
        days: generatedDays,
        overallCompletionPercent: 0,
        healthStatus: 'On Track',
      };

      setIsGenerating(false);
      onPlanGenerated(newPlan);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200/80 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Create Your Study Plan</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Set deadlines, available study hours, and upload material to structure your roadmap.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prototype notice */}
        <div className="bg-indigo-50 border-b border-indigo-100 px-6 py-2.5 flex items-center gap-2 text-xs text-indigo-900">
          <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>
            <strong>Prototype Generator:</strong> Synthesizes an initial schedule with realistic sample slots. In production, this connects to the n8n AI agent for LLM-based planning.
          </span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-5">
          {/* Subject Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Subject Name
            </label>
            <div className="relative">
              <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Computer Science, Organic Chemistry, Macroeconomics"
                className="w-full text-xs font-semibold pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-indigo-600"
              />
            </div>
          </div>

          {/* Exam Date & Available Time Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Exam / Target Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="date"
                  required
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full text-xs font-medium pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-indigo-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Available Study Time
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <select
                  value={availableHours}
                  onChange={(e) => setAvailableHours(parseFloat(e.target.value))}
                  className="w-full text-xs font-medium pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-indigo-600"
                >
                  <option value={1}>1 hour / day</option>
                  <option value={1.5}>1.5 hours / day</option>
                  <option value={2}>2 hours / day</option>
                  <option value={2.5}>2.5 hours / day</option>
                  <option value={3}>3 hours / day (Recommended)</option>
                  <option value={4}>4 hours / day</option>
                </select>
              </div>
            </div>
          </div>

          {/* Current Knowledge Level */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Current Knowledge Level
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Beginner', 'Basic', 'Intermediate', 'Advanced'] as KnowledgeLevel[]).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setKnowledgeLevel(level)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    knowledgeLevel === level
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Study Material Upload Area */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Study Material (PDF, Notes, Text documents)
            </label>
            <div className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-2xl p-4 bg-slate-50/50 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 truncate">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <span className="text-xs font-semibold text-slate-900 block truncate">
                    {materialFileName || 'Select or drop a file'}
                  </span>
                  <span className="text-[10px] text-slate-400">PDF, DOCX, Notes</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setMaterialFileName('Data_Structures_Notes.pdf')}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-white border border-slate-200 px-2.5 py-1 rounded-lg cursor-pointer"
                >
                  Use Sample PDF
                </button>
              </div>
            </div>
          </div>

          {/* Topics Manual Entry & Tag Chips */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Topics to Cover ({topics.length})
              </label>
              <button
                type="button"
                onClick={handleQuickAddCommonTopics}
                className="text-[11px] text-indigo-600 font-semibold hover:underline cursor-pointer"
              >
                + Fill CS Demo Topics
              </button>
            </div>

            {/* Input to add topic */}
            <div className="flex gap-2 mb-2.5">
              <input
                type="text"
                value={newTopicInput}
                onChange={(e) => setNewTopicInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTopic();
                  }
                }}
                placeholder="Type a topic and press Enter (e.g. Graphs)"
                className="flex-1 text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-indigo-600"
              />
              <button
                type="button"
                onClick={handleAddTopic}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Add
              </button>
            </div>

            {/* Chips */}
            <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200">
              {topics.map((t, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 bg-white border border-slate-200 text-slate-800 text-xs font-medium px-2.5 py-1 rounded-lg shadow-2xs"
                >
                  <span>{t}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTopic(idx)}
                    className="text-slate-400 hover:text-rose-600 p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-500/25 transition-all text-xs cursor-pointer"
            >
              {isGenerating ? (
                <span>Generating Adaptive Plan...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Study Plan</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
