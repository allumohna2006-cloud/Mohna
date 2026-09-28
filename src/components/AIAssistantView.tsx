import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  Send,
  Zap,
  Clock,
  ArrowRight,
  Workflow,
  CheckCircle2,
  Code2,
  Eye,
  ChevronDown,
  ChevronUp,
  FileText,
  RotateCcw,
  Check,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import { Subject, StudyPlan, AgentInteraction, AgentPayload } from '../types';
import { StudyFlowService } from '../services/studyFlowService';

interface AIAssistantViewProps {
  subject: Subject;
  studyPlan: StudyPlan;
  interactions: AgentInteraction[];
  onSendMessage: (message: string) => Promise<void>;
  onApplyPlanAdjustment: (proposalId: string) => void;
}

export const AIAssistantView: React.FC<AIAssistantViewProps> = ({
  subject,
  studyPlan,
  interactions,
  onSendMessage,
  onApplyPlanAdjustment,
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'payload' | 'architecture'>('chat');
  const [expandedWorkflowIndex, setExpandedWorkflowIndex] = useState<number | null>(0);
  const [practiceRevealed, setPracticeRevealed] = useState<{ [key: string]: boolean }>({});

  const suggestedPrompts = [
    '“Explain this topic simply.”',
    '“What should I study today?”',
    '“I missed yesterday’s study session.”',
    '“Create practice questions for this topic.”',
    '“How much of my syllabus is complete?”',
    '“Reorganize my plan.”',
    '“What should I revise before my exam?”',
  ];

  const handleSend = async (msgText: string) => {
    if (!msgText.trim() || isSending) return;
    setIsSending(true);
    setInputMessage('');
    try {
      await onSendMessage(msgText.trim());
    } finally {
      setIsSending(false);
    }
  };

  const payloadPreview: AgentPayload = StudyFlowService.getAgentPayloadPreview(
    subject.id,
    inputMessage || 'I missed yesterday’s study session.'
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Top Context Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">AI Study Assistant</h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              Future n8n Agent Endpoint: <code className="font-mono">/api/agent</code>
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Agentic study orchestrator that observes your schedule, reasons over syllabus dependencies, and adapts your daily tasks.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'chat' ? 'bg-white text-indigo-700 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Chat & Actions
          </button>
          <button
            onClick={() => setActiveTab('payload')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'payload' ? 'bg-white text-indigo-700 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>n8n Payload Inspector</span>
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'architecture' ? 'bg-white text-indigo-700 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Workflow className="w-3.5 h-3.5" />
            <span>Agent Architecture</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Chat Interface */}
      {activeTab === 'chat' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Message Thread */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col h-[700px]">
            {/* Thread Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">StudyFlow Agent (Simulated)</h3>
                  <p className="text-[11px] text-slate-400">Context: {subject.name} (Exam in 6 days)</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Ready to orchestrate</span>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
              {interactions.map((interaction, idx) => (
                <div key={interaction.id} className="space-y-3">
                  {/* Student Message */}
                  <div className="flex justify-end">
                    <div className="max-w-md bg-indigo-600 text-white text-xs sm:text-sm font-medium p-3.5 rounded-2xl rounded-tr-xs shadow-xs">
                      {interaction.userMessage}
                      <span className="block text-[10px] text-indigo-200 mt-1 text-right">
                        {interaction.timestamp}
                      </span>
                    </div>
                  </div>

                  {/* Agent Response */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                    </div>

                    <div className="flex-1 space-y-3">
                      {/* Agentic Reasoning Step Box (Observe -> Reason -> Plan -> Act -> Check -> Adapt) */}
                      {interaction.agenticWorkflow && (
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs">
                          <button
                            onClick={() =>
                              setExpandedWorkflowIndex(
                                expandedWorkflowIndex === idx ? null : idx
                              )
                            }
                            className="w-full flex items-center justify-between text-slate-700 font-bold cursor-pointer"
                          >
                            <span className="flex items-center gap-1.5 text-indigo-700">
                              <Workflow className="w-3.5 h-3.5" />
                              <span>Agentic Reasoning Loop (Observe → Plan → Adapt)</span>
                            </span>
                            {expandedWorkflowIndex === idx ? (
                              <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                            )}
                          </button>

                          {expandedWorkflowIndex === idx && (
                            <div className="mt-3 pt-2.5 border-t border-slate-200/80 space-y-2 text-[11px] font-mono text-slate-600">
                              <div>
                                <strong className="text-slate-900">1. Observe:</strong> {interaction.agenticWorkflow.observe}
                              </div>
                              <div>
                                <strong className="text-slate-900">2. Reason:</strong> {interaction.agenticWorkflow.reason}
                              </div>
                              <div>
                                <strong className="text-slate-900">3. Plan:</strong> {interaction.agenticWorkflow.plan}
                              </div>
                              <div>
                                <strong className="text-slate-900">4. Act:</strong> {interaction.agenticWorkflow.act}
                              </div>
                              <div>
                                <strong className="text-slate-900">5. Check:</strong> {interaction.agenticWorkflow.check}
                              </div>
                              <div>
                                <strong className="text-indigo-700 font-bold">6. Adapt:</strong> {interaction.agenticWorkflow.adapt}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Main Text Response */}
                      <div className="bg-slate-100/90 text-slate-900 text-xs sm:text-sm p-4 rounded-2xl rounded-tl-xs whitespace-pre-line leading-relaxed shadow-2xs">
                        {interaction.response}
                      </div>

                      {/* Action Card (e.g. Apply New Plan or Practice Questions) */}
                      {interaction.actionCard && (
                        <div className="bg-linear-to-r from-indigo-50 to-purple-50 border border-indigo-200/90 rounded-2xl p-4 shadow-2xs">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h4 className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                                <Zap className="w-3.5 h-3.5 text-indigo-600 fill-indigo-600" />
                                <span>{interaction.actionCard.title}</span>
                              </h4>
                              <p className="text-xs text-indigo-800 mt-0.5">
                                {interaction.actionCard.description}
                              </p>
                            </div>

                            {interaction.actionCard.type === 'replan' ? (
                              <button
                                onClick={() =>
                                  onApplyPlanAdjustment(
                                    studyPlan.activeProposal?.id || 'prop_01_trees_replan'
                                  )
                                }
                                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                              >
                                <span>{interaction.actionCard.actionLabel || 'Apply New Plan'}</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            ) : interaction.actionCard.type === 'practice' ? (
                              <button
                                onClick={() =>
                                  setPracticeRevealed((prev) => ({
                                    ...prev,
                                    [interaction.id]: !prev[interaction.id],
                                  }))
                                }
                                className="shrink-0 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                              >
                                <span>
                                  {practiceRevealed[interaction.id]
                                    ? 'Hide Answers'
                                    : 'Reveal Answers'}
                                </span>
                              </button>
                            ) : null}
                          </div>

                          {/* Revealed Practice Answers */}
                          {practiceRevealed[interaction.id] && (
                            <div className="mt-3 pt-3 border-t border-indigo-200/60 text-xs text-indigo-950 space-y-2 bg-white/70 p-3 rounded-xl">
                              <div>
                                <strong>Answer 1:</strong> An inorder traversal of any valid BST visits nodes in strictly <em>ascending sorted order</em>.
                              </div>
                              <div>
                                <strong>Answer 2:</strong> In an unbalanced BST, worst-case search degrades to $O(n)$ (linear chain). In an AVL tree, self-balancing rotations guarantee height $\le 1.44 \log_2 n$, ensuring strict $O(\log n)$ worst-case lookups.
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/70 rounded-b-2xl">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputMessage);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask the study assistant (e.g. 'I missed yesterday's session' or 'What should I study?')..."
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-indigo-600 shadow-2xs"
                />

                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isSending}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white shadow-xs transition-colors shrink-0 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Suggested Prompt Chips & Context Info */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                <span>Suggested Prompts</span>
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                Click any prompt to simulate agentic reasoning and adaptive schedule adjustments:
              </p>

              <div className="space-y-1.5">
                {suggestedPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const clean = prompt.replace(/[“”"]/g, '');
                      handleSend(clean);
                    }}
                    className="w-full text-left p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/60 hover:bg-indigo-50 hover:border-indigo-300 text-xs font-medium text-slate-700 hover:text-indigo-900 transition-all flex items-center justify-between cursor-pointer"
                  >
                    <span>{prompt}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Autonomous Agent Logic Info Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-md">
              <div className="flex items-center gap-2 mb-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                <Workflow className="w-4 h-4" />
                <span>Core Agentic Loop</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Rather than acting like a simple chatbot, StudyFlow's agent continuously executes:
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="bg-white/10 p-2 rounded-lg text-indigo-200">1. Observe</div>
                <div className="bg-white/10 p-2 rounded-lg text-indigo-200">2. Reason</div>
                <div className="bg-white/10 p-2 rounded-lg text-indigo-200">3. Plan</div>
                <div className="bg-white/10 p-2 rounded-lg text-indigo-200">4. Act</div>
                <div className="bg-white/10 p-2 rounded-lg text-indigo-200">5. Check</div>
                <div className="bg-white/10 p-2 rounded-lg text-emerald-300 font-bold">6. Adapt</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Live Payload Inspector for n8n Webhook */}
      {activeTab === 'payload' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Code2 className="w-5 h-5 text-indigo-600" />
                <span>Future Agent Webhook Payload (`/api/agent`)</span>
              </h3>
              <p className="text-xs text-slate-500">
                This exact JSON object is formatted and ready for ingestion by n8n or an external agent orchestration endpoint.
              </p>
            </div>

            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 font-mono">
              POST /api/agent
            </span>
          </div>

          <div className="bg-slate-900 rounded-xl p-4 sm:p-5 overflow-x-auto text-indigo-300 font-mono text-xs leading-relaxed border border-slate-800">
            <pre>{JSON.stringify(payloadPreview, null, 2)}</pre>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="text-slate-800 block mb-0.5">Payload Includes:</strong>
              <p className="text-slate-500 text-[11px]">
                Student ID, Subject metadata, Target exam date, and Days remaining.
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="text-slate-800 block mb-0.5">Study Plan Context:</strong>
              <p className="text-slate-500 text-[11px]">
                Health status, Completion percentage, Completed days, and In-progress topics.
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="text-slate-800 block mb-0.5">Materials Reference:</strong>
              <p className="text-slate-500 text-[11px]">
                Uploaded lecture note files and extracted syllabus concepts.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: Architecture Diagram */}
      {activeTab === 'architecture' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              StudyFlow AI + n8n Orchestration Architecture
            </h3>
            <p className="text-xs text-slate-500">
              How the platform transitions from frontend prototype to production automated execution.
            </p>
          </div>

          {/* Architecture Pipeline Cards */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] font-bold text-indigo-600 block uppercase font-mono">01. UI</span>
              <h4 className="text-xs font-bold text-slate-900 mt-1">StudyFlow Web</h4>
              <p className="text-[11px] text-slate-500 mt-1">User triggers plan or marks tasks</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] font-bold text-blue-600 block uppercase font-mono">02. Gateway</span>
              <h4 className="text-xs font-bold text-slate-900 mt-1">Backend API</h4>
              <p className="text-[11px] text-slate-500 mt-1">Express /api/agent proxy route</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] font-bold text-emerald-600 block uppercase font-mono">03. Store</span>
              <h4 className="text-xs font-bold text-slate-900 mt-1">Database</h4>
              <p className="text-[11px] text-slate-500 mt-1">Syllabus, topics, & plan state</p>
            </div>

            <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-300 text-center shadow-xs">
              <span className="text-[10px] font-bold text-indigo-700 block uppercase font-mono">04. Automation</span>
              <h4 className="text-xs font-bold text-indigo-950 mt-1">n8n Engine</h4>
              <p className="text-[11px] text-indigo-700 mt-1">Webhook triggers & scheduled cron</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] font-bold text-purple-600 block uppercase font-mono">05. Intelligence</span>
              <h4 className="text-xs font-bold text-slate-900 mt-1">AI Agent</h4>
              <p className="text-[11px] text-slate-500 mt-1">Reasons & reschedules timelines</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] font-bold text-amber-600 block uppercase font-mono">06. Action</span>
              <h4 className="text-xs font-bold text-slate-900 mt-1">Automations</h4>
              <p className="text-[11px] text-slate-500 mt-1">Telegram & Email reminders</p>
            </div>
          </div>

          {/* Capabilities Description */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-xs text-slate-600 space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">Future Agent Capabilities Supported by this Schema:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <strong className="text-slate-800">1. Understanding study material:</strong>
                <p className="text-[11px] text-slate-500 mt-0.5">Identifies topics, estimated reading duration, and conceptual prerequisites from uploaded PDFs.</p>
              </div>
              <div>
                <strong className="text-slate-800">2. Adaptive Re-planning:</strong>
                <p className="text-[11px] text-slate-500 mt-0.5">Shifts downstream tasks into buffer slots when a session is missed, keeping the final revision date intact.</p>
              </div>
              <div>
                <strong className="text-slate-800">3. Reminders via n8n:</strong>
                <p className="text-[11px] text-slate-500 mt-0.5">Sends automated Telegram / Email alerts ("You have 45 minutes of study planned for today").</p>
              </div>
              <div>
                <strong className="text-slate-800">4. Practice Generation:</strong>
                <p className="text-[11px] text-slate-500 mt-0.5">Creates custom flashcards, conceptual quizzes, and revision prompts based on your notes.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
