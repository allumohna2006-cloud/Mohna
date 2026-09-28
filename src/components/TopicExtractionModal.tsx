import React, { useState } from 'react';
import {
  X,
  Sparkles,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowRight,
  ShieldAlert,
  BarChart,
  Layers,
} from 'lucide-react';
import { StudyMaterial, Topic, TopicDifficulty } from '../types';

interface TopicExtractionModalProps {
  material: StudyMaterial | null;
  topics: Topic[];
  isOpen: boolean;
  onClose: () => void;
  onUseTopicsForPlan: (material: StudyMaterial, topics: Topic[]) => void;
}

export const TopicExtractionModal: React.FC<TopicExtractionModalProps> = ({
  material,
  topics,
  isOpen,
  onClose,
  onUseTopicsForPlan,
}) => {
  if (!isOpen || !material) return null;

  // Filter or show topics for this material or default Data Structures topics
  const displayTopics = topics.length > 0 ? topics : [
    { id: '1', subjectId: material.subjectId, name: 'Arrays', difficulty: 'Easy' as TopicDifficulty, estimatedMinutes: 60, status: 'Completed' as const, progressPercentage: 100, keyConcepts: ['Contiguous memory', 'Index lookups'] },
    { id: '2', subjectId: material.subjectId, name: 'Linked Lists', difficulty: 'Medium' as TopicDifficulty, estimatedMinutes: 90, status: 'Completed' as const, progressPercentage: 100, keyConcepts: ['Pointers', 'Reversal'] },
    { id: '3', subjectId: material.subjectId, name: 'Stacks', difficulty: 'Medium' as TopicDifficulty, estimatedMinutes: 60, status: 'In Progress' as const, progressPercentage: 60, keyConcepts: ['LIFO', 'Parenthesis validation'] },
    { id: '4', subjectId: material.subjectId, name: 'Queues', difficulty: 'Medium' as TopicDifficulty, estimatedMinutes: 60, status: 'In Progress' as const, progressPercentage: 40, keyConcepts: ['FIFO', 'Circular Buffer'] },
    { id: '5', subjectId: material.subjectId, name: 'Trees', difficulty: 'Hard' as TopicDifficulty, estimatedMinutes: 120, status: 'In Progress' as const, progressPercentage: 20, keyConcepts: ['BST invariant', 'Inorder traversal'] },
    { id: '6', subjectId: material.subjectId, name: 'Graphs', difficulty: 'Hard' as TopicDifficulty, estimatedMinutes: 120, status: 'Not Started' as const, progressPercentage: 0, keyConcepts: ['BFS', 'DFS', 'Adjacency matrix'] },
    { id: '7', subjectId: material.subjectId, name: 'Sorting', difficulty: 'Medium' as TopicDifficulty, estimatedMinutes: 90, status: 'Not Started' as const, progressPercentage: 0, keyConcepts: ['MergeSort', 'QuickSort'] },
    { id: '8', subjectId: material.subjectId, name: 'Searching', difficulty: 'Easy' as TopicDifficulty, estimatedMinutes: 60, status: 'Not Started' as const, progressPercentage: 0, keyConcepts: ['Binary search', 'Hash table'] },
  ];

  const totalEstMinutes = displayTopics.reduce((acc, t) => acc + t.estimatedMinutes, 0);
  const totalHours = (totalEstMinutes / 60).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200/80 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">Topic Extraction Interface</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-mono">
                  Prototype Demo
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>Extracted from: <strong>{material.fileName}</strong> ({material.pagesCount} pages)</span>
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

        {/* Prototype Warning Banner */}
        <div className="bg-amber-50 border-b border-amber-200/80 px-6 py-2.5 flex items-center gap-2 text-xs text-amber-800">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Prototype Interface:</strong> Demonstrating automated topic decomposition. This will connect to an n8n PDF parsing and topic classification pipeline in production.
          </span>
        </div>

        {/* Body / Topics List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-slate-700">
              {displayTopics.length} Extracted Topics Identified
            </span>
            <span className="font-mono bg-slate-100 px-2 py-0.5 rounded-md text-slate-700">
              Total Study Estimate: ~{totalHours} hours
            </span>
          </div>

          {/* Topics Grid */}
          <div className="space-y-2.5">
            {displayTopics.map((topic, index) => {
              const isDone = topic.status === 'Completed';
              const isInProgress = topic.status === 'In Progress';

              return (
                <div
                  key={topic.id || index}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-indigo-300 transition-all shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-200/80 text-slate-600 flex items-center justify-center text-xs font-bold font-mono">
                      {index + 1}
                    </span>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">
                          {topic.name}
                        </span>
                        {isDone ? (
                          <span className="text-emerald-600 text-xs font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Done</span>
                          </span>
                        ) : null}
                      </div>

                      {topic.keyConcepts && topic.keyConcepts.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {topic.keyConcepts.slice(0, 2).map((c, i) => (
                            <span key={i} className="text-[10px] bg-white border border-slate-200 px-1.5 py-0.2 rounded text-slate-500">
                              {c}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {/* Difficulty Badge */}
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                        topic.difficulty === 'Easy'
                          ? 'bg-emerald-100 text-emerald-800'
                          : topic.difficulty === 'Medium'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {topic.difficulty}
                    </span>

                    {/* Time Estimate */}
                    <span className="flex items-center gap-1 text-xs font-mono text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{topic.estimatedMinutes}m</span>
                    </span>

                    {/* Status Badge */}
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        isDone
                          ? 'bg-emerald-100 text-emerald-800'
                          : isInProgress
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {topic.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            Topics ready to be scheduled across your target exam timeline.
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onUseTopicsForPlan(material, displayTopics);
                onClose();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
            >
              <span>Use in Study Plan Wizard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
