/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  User,
  Subject,
  StudyMaterial,
  Topic,
  StudyTask,
  StudyPlan,
  NotificationItem,
  AgentInteraction,
} from './types';
import { StudyFlowService } from './services/studyFlowService';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { DashboardView } from './components/DashboardView';
import { StudyMaterialsView } from './components/StudyMaterialsView';
import { TopicExtractionModal } from './components/TopicExtractionModal';
import { StudyPlanView } from './components/StudyPlanView';
import { CreatePlanModal } from './components/CreatePlanModal';
import { ProgressView } from './components/ProgressView';
import { AIAssistantView } from './components/AIAssistantView';
import { SubjectsView } from './components/SubjectsView';
import { Check, Info, AlertCircle } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [user, setUser] = useState<User | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [activeSubject, setActiveSubject] = useState<Subject | null>(null);
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [interactions, setInteractions] = useState<AgentInteraction[]>([]);

  // Modals state
  const [isCreatePlanOpen, setIsCreatePlanOpen] = useState(false);
  const [extractionMaterial, setExtractionMaterial] = useState<StudyMaterial | null>(null);
  const [isExtractionOpen, setIsExtractionOpen] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'warning' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Initial load from service
  const loadData = async () => {
    const loadedUser = await StudyFlowService.getUser();
    const loadedSubjects = await StudyFlowService.getSubjects();
    const defaultSubject = loadedSubjects[0];
    const loadedMaterials = await StudyFlowService.getStudyMaterials();
    const loadedTopics = await StudyFlowService.getTopics(defaultSubject.id);
    const loadedPlan = await StudyFlowService.getStudyPlan(defaultSubject.id);
    const loadedNotifications = await StudyFlowService.getNotifications();
    const loadedInteractions = await StudyFlowService.getAgentInteractions(defaultSubject.id);

    // Extract flat tasks list from the study plan days
    const allTasks = loadedPlan.days.flatMap((d) => d.tasks);

    setUser(loadedUser);
    setSubjects(loadedSubjects);
    setActiveSubject(defaultSubject);
    setMaterials(loadedMaterials);
    setTopics(loadedTopics);
    setStudyPlan(loadedPlan);
    setTasks(allTasks);
    setNotifications(loadedNotifications);
    setInteractions(loadedInteractions);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!user || !activeSubject || !studyPlan) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold text-slate-600">Initializing StudyFlow AI...</p>
        </div>
      </div>
    );
  }

  // Toggle task status
  const handleToggleTask = async (taskId: string, newStatus: any) => {
    const result = await StudyFlowService.updateTaskStatus(taskId, newStatus);
    setStudyPlan(result.plan);
    setTasks(result.plan.days.flatMap((d) => d.tasks));

    // Also update topic status if all tasks for that topic are done
    const updatedTopics = await StudyFlowService.getTopics(activeSubject.id);
    setTopics(updatedTopics);

    if (newStatus === 'Completed') {
      showToast(`Task marked as Completed! Syllabus recalculated.`, 'success');
    } else if (newStatus === 'In Progress') {
      showToast(`Task marked as In Progress.`, 'info');
    }
  };

  // Apply Adaptive Plan Adjustment
  const handleApplyProposal = async (proposalId: string) => {
    const updatedPlan = await StudyFlowService.applyAdjustedPlan(proposalId);
    setStudyPlan(updatedPlan);
    setTasks(updatedPlan.days.flatMap((d) => d.tasks));
    const notifs = await StudyFlowService.getNotifications();
    setNotifications(notifs);

    showToast(
      'Adaptive Plan Applied! Day 4 & Day 5 tasks were re-aligned to ensure topic mastery.',
      'success'
    );
  };

  // Upload New Material
  const handleUploadMaterial = async (params: {
    subjectId: string;
    fileName: string;
    fileType: 'pdf' | 'notes' | 'docx' | 'slides';
    fileSize: string;
    pagesCount: number;
  }) => {
    const newMat = await StudyFlowService.uploadStudyMaterial(params);
    setMaterials([newMat, ...materials]);
    showToast(`Uploaded "${newMat.fileName}" successfully! Ready for topic extraction.`, 'success');
  };

  // Generate Plan from Modal
  const handlePlanGenerated = (newPlan: StudyPlan) => {
    setStudyPlan(newPlan);
    setTasks(newPlan.days.flatMap((d) => d.tasks));
    setCurrentView('plan');
    showToast('Personalized Study Plan generated successfully!', 'success');
  };

  // Send message to Agent
  const handleSendMessage = async (msgText: string) => {
    const interaction = await StudyFlowService.sendAgentMessage(msgText, activeSubject.id);
    setInteractions((prev) => [...prev, interaction]);
  };

  // Reset demo
  const handleResetDemo = () => {
    StudyFlowService.resetDemoData();
    loadData();
    showToast('Demo data reset to clean initial state.', 'info');
  };

  // Subject Switch
  const handleSelectSubject = async (sub: Subject) => {
    setActiveSubject(sub);
    const plan = await StudyFlowService.getStudyPlan(sub.id);
    const subTopics = await StudyFlowService.getTopics(sub.id);
    setStudyPlan(plan);
    setTopics(subTopics);
    setTasks(plan.days.flatMap((d) => d.tasks));
    showToast(`Switched active subject to ${sub.name}`, 'info');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-700 text-xs font-semibold animate-in fade-in slide-in-from-bottom-5">
          {toastMessage.type === 'success' ? (
            <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
          ) : (
            <Info className="w-4 h-4 text-indigo-400" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        subjects={subjects}
        activeSubject={activeSubject}
        onSelectSubject={handleSelectSubject}
        onCreatePlanClick={() => setIsCreatePlanOpen(true)}
        notifications={notifications}
        onResetDemo={handleResetDemo}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'landing' ? (
          <LandingHero
            onCreatePlanClick={() => setIsCreatePlanOpen(true)}
            onExploreDemoClick={() => setCurrentView('dashboard')}
          />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            {currentView === 'dashboard' && (
              <DashboardView
                user={user}
                activeSubject={activeSubject}
                studyPlan={studyPlan}
                tasks={tasks}
                topics={topics}
                onToggleTask={handleToggleTask}
                onApplyProposal={handleApplyProposal}
                onNavigate={setCurrentView}
                onCreatePlanClick={() => setIsCreatePlanOpen(true)}
              />
            )}

            {currentView === 'subjects' && (
              <SubjectsView
                subjects={subjects}
                activeSubject={activeSubject}
                materials={materials}
                onSelectSubject={handleSelectSubject}
                onCreateSubject={async (subData) => {
                  const created = await StudyFlowService.createSubject(subData);
                  setSubjects((prev) => [...prev, created]);
                  showToast(`Added subject ${created.name}!`, 'success');
                }}
                onCreatePlanForSubject={(sub) => {
                  setActiveSubject(sub);
                  setIsCreatePlanOpen(true);
                }}
                onNavigateToPlan={() => setCurrentView('plan')}
              />
            )}

            {currentView === 'materials' && (
              <StudyMaterialsView
                materials={materials}
                subjects={subjects}
                activeSubject={activeSubject}
                onOpenExtractionModal={(mat) => {
                  setExtractionMaterial(mat);
                  setIsExtractionOpen(true);
                }}
                onUploadMaterial={handleUploadMaterial}
                onCreatePlanWithMaterial={(mat) => {
                  setExtractionMaterial(mat);
                  setIsCreatePlanOpen(true);
                }}
              />
            )}

            {currentView === 'plan' && (
              <StudyPlanView
                studyPlan={studyPlan}
                subject={activeSubject}
                tasks={tasks}
                onToggleTask={handleToggleTask}
                onApplyProposal={handleApplyProposal}
                onNavigateToAssistant={() => setCurrentView('assistant')}
              />
            )}

            {currentView === 'progress' && (
              <ProgressView
                subject={activeSubject}
                topics={topics}
                tasks={tasks}
                currentStreakDays={user.currentStreakDays}
              />
            )}

            {currentView === 'assistant' && (
              <AIAssistantView
                subject={activeSubject}
                studyPlan={studyPlan}
                interactions={interactions}
                onSendMessage={handleSendMessage}
                onApplyPlanAdjustment={handleApplyProposal}
              />
            )}
          </div>
        )}
      </main>

      {/* Topic Extraction Prototype Modal */}
      <TopicExtractionModal
        material={extractionMaterial}
        topics={topics}
        isOpen={isExtractionOpen}
        onClose={() => setIsExtractionOpen(false)}
        onUseTopicsForPlan={(mat, extractedTopics) => {
          setIsExtractionOpen(false);
          setIsCreatePlanOpen(true);
        }}
      />

      {/* Create Study Plan Wizard Modal */}
      <CreatePlanModal
        isOpen={isCreatePlanOpen}
        onClose={() => setIsCreatePlanOpen(false)}
        onPlanGenerated={handlePlanGenerated}
        initialMaterialName={extractionMaterial?.fileName || 'Data Structures Notes.pdf'}
        initialSubjectName={activeSubject.name}
      />
    </div>
  );
}
