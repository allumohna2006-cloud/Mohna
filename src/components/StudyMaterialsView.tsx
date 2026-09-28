import React, { useState } from 'react';
import {
  FileText,
  Upload,
  Clock,
  Sparkles,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Search,
  Plus,
  ExternalLink,
  Layers,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { StudyMaterial, Subject, Topic } from '../types';

interface StudyMaterialsViewProps {
  materials: StudyMaterial[];
  subjects: Subject[];
  activeSubject: Subject;
  onOpenExtractionModal: (material: StudyMaterial) => void;
  onUploadMaterial: (params: {
    subjectId: string;
    fileName: string;
    fileType: 'pdf' | 'notes' | 'docx' | 'slides';
    fileSize: string;
    pagesCount: number;
  }) => void;
  onCreatePlanWithMaterial: (material: StudyMaterial) => void;
}

export const StudyMaterialsView: React.FC<StudyMaterialsViewProps> = ({
  materials,
  subjects,
  activeSubject,
  onOpenExtractionModal,
  onUploadMaterial,
  onCreatePlanWithMaterial,
}) => {
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const filteredMaterials = materials.filter((m) => {
    const matchesSubject = selectedSubjectFilter === 'all' || m.subjectId === selectedSubjectFilter;
    const matchesSearch =
      m.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.summary && m.summary.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSubject && matchesSearch;
  });

  const handleSimulateUpload = (fileName: string, type: 'pdf' | 'notes' | 'docx' | 'slides', pages: number) => {
    setIsUploading(true);
    setTimeout(() => {
      onUploadMaterial({
        subjectId: activeSubject.id,
        fileName,
        fileType: type,
        fileSize: '3.4 MB',
        pagesCount: pages,
      });
      setIsUploading(false);
    }, 600);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Title & Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Study Materials</h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              Prototype Repository
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Upload notes, lecture slides, and syllabus documents to extract topics for adaptive study planning.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSimulateUpload('Computer_Architecture_Ch1-5.pdf', 'pdf', 34)}
            disabled={isUploading}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition-colors shadow-2xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-slate-500" />
            <span>{isUploading ? 'Processing File...' : 'Upload Sample Document'}</span>
          </button>
        </div>
      </div>

      {/* Upload Drop Zone Area */}
      <div className="bg-white border-2 border-dashed border-indigo-200 hover:border-indigo-400 rounded-2xl p-8 text-center transition-colors shadow-xs group">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
          <Upload className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900">Upload Study Material</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
          Drag and drop PDF lecture notes, syllabi, Word docs, or markdown notes. The parser will extract topics, difficulty levels, and study duration estimates.
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => handleSimulateUpload(`Algorithm_Design_Manual_Ch3.pdf`, 'pdf', 38)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            + Add "Algorithm Design Ch3.pdf"
          </button>
          <button
            onClick={() => handleSimulateUpload(`DBMS_Normalization_Notes.notes`, 'notes', 12)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            + Add "DBMS Normalization Notes"
          </button>
        </div>

        <div className="mt-3 text-[11px] text-slate-400 flex items-center justify-center gap-3">
          <span>Supported: PDF, NOTES, DOCX, SLIDES</span>
          <span>•</span>
          <span className="text-indigo-600 font-semibold">Ready for n8n PDF Extraction Webhook</span>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-600">Filter by Subject:</span>
          <select
            value={selectedSubjectFilter}
            onChange={(e) => setSelectedSubjectFilter(e.target.value)}
            className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-indigo-500"
          >
            <option value="all">All Subjects ({materials.length})</option>
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-indigo-500"
          />
        </div>
      </div>

      {/* Materials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMaterials.map((material) => {
          const subject = subjects.find((s) => s.id === material.subjectId);
          const isReady = material.status === 'Ready';

          return (
            <div
              key={material.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                        {material.fileName}
                      </h4>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                        <span className="font-semibold text-slate-700">{subject?.name || 'General'}</span>
                        <span>•</span>
                        <span className="uppercase text-[10px] font-mono">{material.fileType}</span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isReady
                        ? 'bg-emerald-100 text-emerald-800'
                        : material.status === 'Processing'
                        ? 'bg-amber-100 text-amber-800 animate-pulse'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {material.status}
                  </span>
                </div>

                {/* Summary / Details */}
                <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                  {material.summary || 'Uploaded document ready for syllabus extraction.'}
                </p>

                {/* Metadata stats */}
                <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-slate-50 rounded-lg p-1.5">
                    <span className="text-[10px] text-slate-400 block font-semibold">PAGES</span>
                    <span className="font-bold text-slate-800">{material.pagesCount}</span>
                  </div>
                  <div className="bg-indigo-50/60 rounded-lg p-1.5">
                    <span className="text-[10px] text-indigo-500 block font-semibold">TOPICS</span>
                    <span className="font-bold text-indigo-900">{material.topicsExtractedCount}</span>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-1.5">
                    <span className="text-[10px] text-slate-400 block font-semibold">SIZE</span>
                    <span className="font-bold text-slate-800 font-mono text-[11px]">{material.fileSize}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => onOpenExtractionModal(material)}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 py-2 px-3 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Extract Topics</span>
                </button>

                <button
                  onClick={() => onCreatePlanWithMaterial(material)}
                  title="Use for Study Plan"
                  className="flex items-center justify-center gap-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 py-2 px-3 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  <span>Use for Plan</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
