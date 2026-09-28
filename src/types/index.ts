export type KnowledgeLevel = 'Beginner' | 'Basic' | 'Intermediate' | 'Advanced';

export type TaskStatus = 'Not Started' | 'In Progress' | 'Completed' | 'Missed';

export type TopicDifficulty = 'Easy' | 'Medium' | 'Hard';

export type TopicStatus = 'Not Started' | 'In Progress' | 'Completed';

export type PlanHealthStatus = 'On Track' | 'Slightly Behind' | 'Behind Schedule';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  major: string;
  currentStreakDays: number;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  color: string;
  examDate: string; // ISO date string YYYY-MM-DD
  knowledgeLevel: KnowledgeLevel;
  dailyAvailableHours: number;
  description: string;
  totalTopicsCount: number;
  completedTopicsCount: number;
}

export interface StudyMaterial {
  id: string;
  subjectId: string;
  fileName: string;
  fileType: 'pdf' | 'notes' | 'docx' | 'slides';
  fileSize: string;
  uploadedAt: string;
  pagesCount: number;
  topicsExtractedCount: number;
  status: 'Uploaded' | 'Processing' | 'Ready';
  summary?: string;
}

export interface Topic {
  id: string;
  subjectId: string;
  materialId?: string;
  name: string;
  difficulty: TopicDifficulty;
  estimatedMinutes: number;
  status: TopicStatus;
  progressPercentage: number;
  keyConcepts: string[];
}

export interface StudyTask {
  id: string;
  subjectId: string;
  topicId: string;
  topicName: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  dayNumber: number;
  durationMinutes: number;
  status: TaskStatus;
}

export interface StudyPlanDay {
  dayNumber: number;
  date: string;
  topicId: string;
  topicName: string;
  estimatedMinutes: number;
  status: TaskStatus;
  tasks: StudyTask[];
}

export interface PlanAdjustmentProposal {
  id: string;
  reason: string;
  createdAt: string;
  originalScheduleSummary: string;
  adjustedScheduleSummary: string;
  details: {
    day: number;
    originalTopic: string;
    newTopic: string;
    explanation: string;
  }[];
  applied: boolean;
}

export interface StudyPlan {
  id: string;
  subjectId: string;
  createdAt: string;
  updatedAt: string;
  examDate: string;
  dailyAvailableMinutes: number;
  days: StudyPlanDay[];
  overallCompletionPercent: number;
  healthStatus: PlanHealthStatus;
  activeProposal?: PlanAdjustmentProposal;
}

export interface AgentStep {
  step: number;
  title: string;
  detail: string;
  status: 'completed' | 'in_progress' | 'pending';
}

export interface AgentInteraction {
  id: string;
  userId: string;
  subjectId: string;
  userMessage: string;
  response: string;
  timestamp: string;
  agenticWorkflow?: {
    observe: string;
    reason: string;
    plan: string;
    act: string;
    check: string;
    adapt: string;
  };
  reasoningSteps?: AgentStep[];
  actionCard?: {
    type: 'replan' | 'practice' | 'summary';
    title: string;
    description: string;
    actionLabel?: string;
    payload?: any;
  };
}

export interface AgentPayload {
  userId: string;
  subject: {
    id: string;
    name: string;
    examDate: string;
    daysRemaining: number;
  };
  currentStudyPlan: {
    overallCompletionPercent: number;
    healthStatus: PlanHealthStatus;
    totalDays: number;
    completedDays: number;
  };
  currentProgress: {
    completedTasksCount: number;
    totalTasksCount: number;
    missedTasksCount: number;
    inProgressTopic: string;
  };
  relevantStudyMaterial: {
    fileName: string;
    extractedTopicsCount: number;
  }[];
  userMessage: string;
  timestamp: string;
  metadata: {
    source: 'StudyFlow Web';
    pipeline: 'n8n-ready-webhook';
    version: '1.0.0';
  };
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'reminder' | 'adjustment' | 'milestone';
  read: boolean;
}
