import {
  User,
  Subject,
  StudyMaterial,
  Topic,
  StudyTask,
  StudyPlan,
  StudyPlanDay,
  PlanAdjustmentProposal,
  AgentInteraction,
  AgentPayload,
  NotificationItem,
} from '../types';

// Helper to format date strings relative to today
const getRelativeDateString = (offsetDays: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

// Initial Demo Student
const initialUser: User = {
  id: 'usr_alex_01',
  name: 'Alex Rivera',
  email: 'alex.rivera@university.edu',
  major: 'Computer Science (3rd Year)',
  currentStreakDays: 5,
};

// Initial Subjects
const initialSubjects: Subject[] = [
  {
    id: 'sub_cs_ds',
    name: 'Data Structures',
    code: 'CS-201',
    color: '#3B82F6', // Blue
    examDate: getRelativeDateString(6), // 6 days remaining
    knowledgeLevel: 'Intermediate',
    dailyAvailableHours: 3,
    description: 'Fundamental linear and non-linear data structures, complexity analysis, and tree algorithms.',
    totalTopicsCount: 8,
    completedTopicsCount: 2,
  },
  {
    id: 'sub_cs_db',
    name: 'Database Management',
    code: 'CS-304',
    color: '#10B981', // Emerald
    examDate: getRelativeDateString(18),
    knowledgeLevel: 'Basic',
    dailyAvailableHours: 2,
    description: 'Relational algebra, SQL query optimization, ER modeling, indexing, and transaction isolation.',
    totalTopicsCount: 6,
    completedTopicsCount: 1,
  },
  {
    id: 'sub_cs_os',
    name: 'Operating Systems',
    code: 'CS-302',
    color: '#8B5CF6', // Purple
    examDate: getRelativeDateString(26),
    knowledgeLevel: 'Beginner',
    dailyAvailableHours: 2.5,
    description: 'Kernel architecture, virtual memory, paging, CPU scheduling algorithms, and deadlock avoidance.',
    totalTopicsCount: 7,
    completedTopicsCount: 0,
  },
  {
    id: 'sub_cs_cn',
    name: 'Computer Networks',
    code: 'CS-306',
    color: '#F59E0B', // Amber
    examDate: getRelativeDateString(35),
    knowledgeLevel: 'Basic',
    dailyAvailableHours: 2,
    description: 'OSI 7-layer stack, TCP/IP flow control, congestion window, subnetting, and routing protocols.',
    totalTopicsCount: 5,
    completedTopicsCount: 0,
  },
];

// Initial Study Materials
const initialMaterials: StudyMaterial[] = [
  {
    id: 'mat_ds_01',
    subjectId: 'sub_cs_ds',
    fileName: 'Data Structures Notes.pdf',
    fileType: 'pdf',
    fileSize: '4.8 MB',
    uploadedAt: '3 days ago',
    pagesCount: 42,
    topicsExtractedCount: 8,
    status: 'Ready',
    summary: 'Comprehensive lecture slides covering memory layouts, pointers, lists, trees, graphs, and sorting.',
  },
  {
    id: 'mat_ds_02',
    subjectId: 'sub_cs_ds',
    fileName: 'Tree_Traversals_CheatSheet.notes',
    fileType: 'notes',
    fileSize: '1.2 MB',
    uploadedAt: 'Yesterday',
    pagesCount: 8,
    topicsExtractedCount: 2,
    status: 'Ready',
    summary: 'Binary Search Trees, AVL balance factors, Red-Black color rules, and Breadth-First search queues.',
  },
  {
    id: 'mat_db_01',
    subjectId: 'sub_cs_db',
    fileName: 'DBMS_Syllabus_Unit1-4.pdf',
    fileType: 'pdf',
    fileSize: '3.1 MB',
    uploadedAt: '5 days ago',
    pagesCount: 28,
    topicsExtractedCount: 6,
    status: 'Ready',
    summary: 'Database normalization (1NF through BCNF), Boyce-Codd normal form, and relational algebra operations.',
  },
  {
    id: 'mat_os_01',
    subjectId: 'sub_cs_os',
    fileName: 'OS_Virtual_Memory_Lecture.docx',
    fileType: 'docx',
    fileSize: '2.4 MB',
    uploadedAt: 'Today at 09:15 AM',
    pagesCount: 19,
    topicsExtractedCount: 7,
    status: 'Processing',
    summary: 'Page tables, Translation Lookaside Buffer (TLB), inverted page tables, and demand paging mechanisms.',
  },
];

// Initial Topics for Data Structures
const initialTopics: Topic[] = [
  {
    id: 'top_arr',
    subjectId: 'sub_cs_ds',
    materialId: 'mat_ds_01',
    name: 'Arrays',
    difficulty: 'Easy',
    estimatedMinutes: 60,
    status: 'Completed',
    progressPercentage: 100,
    keyConcepts: ['Contiguous memory allocation', 'Index arithmetic O(1)', 'Dynamic arrays vs static'],
  },
  {
    id: 'top_ll',
    subjectId: 'sub_cs_ds',
    materialId: 'mat_ds_01',
    name: 'Linked Lists',
    difficulty: 'Medium',
    estimatedMinutes: 90,
    status: 'Completed',
    progressPercentage: 100,
    keyConcepts: ['Singly vs Doubly linked', 'Node pointers', 'Fast/Slow pointer cycle detection'],
  },
  {
    id: 'top_stk',
    subjectId: 'sub_cs_ds',
    materialId: 'mat_ds_01',
    name: 'Stacks',
    difficulty: 'Medium',
    estimatedMinutes: 60,
    status: 'In Progress',
    progressPercentage: 60,
    keyConcepts: ['LIFO semantics', 'Call stack frames', 'Parenthesis validation algorithm'],
  },
  {
    id: 'top_q',
    subjectId: 'sub_cs_ds',
    materialId: 'mat_ds_01',
    name: 'Queues',
    difficulty: 'Medium',
    estimatedMinutes: 60,
    status: 'In Progress',
    progressPercentage: 40,
    keyConcepts: ['FIFO semantics', 'Circular queue array', 'Double-ended queue (Deque)'],
  },
  {
    id: 'top_tree',
    subjectId: 'sub_cs_ds',
    materialId: 'mat_ds_01',
    name: 'Trees',
    difficulty: 'Hard',
    estimatedMinutes: 120,
    status: 'In Progress',
    progressPercentage: 20,
    keyConcepts: ['Binary Search Tree invariants', 'Inorder/Preorder/Postorder', 'Tree height & depth'],
  },
  {
    id: 'top_grp',
    subjectId: 'sub_cs_ds',
    materialId: 'mat_ds_01',
    name: 'Graphs',
    difficulty: 'Hard',
    estimatedMinutes: 120,
    status: 'Not Started',
    progressPercentage: 0,
    keyConcepts: ['Adjacency matrix vs list', 'BFS shortest path', 'DFS topological sorting'],
  },
  {
    id: 'top_sort',
    subjectId: 'sub_cs_ds',
    materialId: 'mat_ds_01',
    name: 'Sorting',
    difficulty: 'Medium',
    estimatedMinutes: 90,
    status: 'Not Started',
    progressPercentage: 0,
    keyConcepts: ['MergeSort divide & conquer', 'QuickSort pivot selection', 'Lower bound O(n log n)'],
  },
  {
    id: 'top_srch',
    subjectId: 'sub_cs_ds',
    materialId: 'mat_ds_01',
    name: 'Searching',
    difficulty: 'Easy',
    estimatedMinutes: 60,
    status: 'Not Started',
    progressPercentage: 0,
    keyConcepts: ['Binary search boundaries', 'Hash tables & bucket collisions', 'Amortized O(1) lookups'],
  },
];

// Initial Tasks for Data Structures
const initialTasks: StudyTask[] = [
  // Day 1
  {
    id: 'tsk_1_1',
    subjectId: 'sub_cs_ds',
    topicId: 'top_arr',
    topicName: 'Arrays',
    title: 'Review concepts & Big-O bounds',
    description: 'Understand contiguous memory addressing and cache locality.',
    date: getRelativeDateString(-2),
    dayNumber: 1,
    durationMinutes: 25,
    status: 'Completed',
  },
  {
    id: 'tsk_1_2',
    subjectId: 'sub_cs_ds',
    topicId: 'top_arr',
    topicName: 'Arrays',
    title: 'Study dynamic array resizing',
    description: 'Analyze amortized cost O(1) vs worst case O(n) array copies.',
    date: getRelativeDateString(-2),
    dayNumber: 1,
    durationMinutes: 20,
    status: 'Completed',
  },
  {
    id: 'tsk_1_3',
    subjectId: 'sub_cs_ds',
    topicId: 'top_arr',
    topicName: 'Arrays',
    title: 'Complete practice questions',
    description: 'Solve 3 array partition and sliding window questions.',
    date: getRelativeDateString(-2),
    dayNumber: 1,
    durationMinutes: 20,
    status: 'Completed',
  },

  // Day 2
  {
    id: 'tsk_2_1',
    subjectId: 'sub_cs_ds',
    topicId: 'top_ll',
    topicName: 'Linked Lists',
    title: 'Understand concepts & node pointers',
    description: 'Master memory pointers, head/tail sentinels and node links.',
    date: getRelativeDateString(-1),
    dayNumber: 2,
    durationMinutes: 30,
    status: 'Completed',
  },
  {
    id: 'tsk_2_2',
    subjectId: 'sub_cs_ds',
    topicId: 'top_ll',
    topicName: 'Linked Lists',
    title: 'Study insertion & deletion edge cases',
    description: 'Head insertion, tail removal, and empty list corner checks.',
    date: getRelativeDateString(-1),
    dayNumber: 2,
    durationMinutes: 30,
    status: 'Completed',
  },
  {
    id: 'tsk_2_3',
    subjectId: 'sub_cs_ds',
    topicId: 'top_ll',
    topicName: 'Linked Lists',
    title: 'Solve list reversal exercises',
    description: 'Implement iterative and recursive in-place linked list reversal.',
    date: getRelativeDateString(-1),
    dayNumber: 2,
    durationMinutes: 30,
    status: 'Completed',
  },

  // Day 3 (Today)
  {
    id: 'tsk_3_1',
    subjectId: 'sub_cs_ds',
    topicId: 'top_stk',
    topicName: 'Stacks',
    title: 'Review LIFO concepts & implementations',
    description: 'Compare array-backed vs linked-list backed stack structures.',
    date: getRelativeDateString(0),
    dayNumber: 3,
    durationMinutes: 30,
    status: 'Completed',
  },
  {
    id: 'tsk_3_2',
    subjectId: 'sub_cs_ds',
    topicId: 'top_stk',
    topicName: 'Stacks',
    title: 'Implement balanced parenthesis checker',
    description: 'Handle nested brackets matching with stack push/pop verification.',
    date: getRelativeDateString(0),
    dayNumber: 3,
    durationMinutes: 30,
    status: 'Completed',
  },
  {
    id: 'tsk_3_3',
    subjectId: 'sub_cs_ds',
    topicId: 'top_q',
    topicName: 'Queues',
    title: 'Study circular queue ring buffers',
    description: 'Front and rear pointer modulo arithmetic formulas.',
    date: getRelativeDateString(0),
    dayNumber: 3,
    durationMinutes: 35,
    status: 'Completed',
  },
  {
    id: 'tsk_3_4',
    subjectId: 'sub_cs_ds',
    topicId: 'top_tree',
    topicName: 'Trees',
    title: 'Binary Tree basics & recursive traversals',
    description: 'Implement preorder, inorder, and postorder depth-first traversal.',
    date: getRelativeDateString(0),
    dayNumber: 3,
    durationMinutes: 45,
    status: 'In Progress', // Current task
  },
  {
    id: 'tsk_3_5',
    subjectId: 'sub_cs_ds',
    topicId: 'top_tree',
    topicName: 'Trees',
    title: 'BST search and insertion practice',
    description: 'Solve 4 binary search tree verification and insertion challenges.',
    date: getRelativeDateString(0),
    dayNumber: 3,
    durationMinutes: 45,
    status: 'Not Started',
  },

  // Day 4 (Tomorrow)
  {
    id: 'tsk_4_1',
    subjectId: 'sub_cs_ds',
    topicId: 'top_grp',
    topicName: 'Graphs',
    title: 'Graph representations & adjacency list',
    description: 'Directed vs undirected graphs, edge weights, and memory usage.',
    date: getRelativeDateString(1),
    dayNumber: 4,
    durationMinutes: 45,
    status: 'Not Started',
  },
  {
    id: 'tsk_4_2',
    subjectId: 'sub_cs_ds',
    topicId: 'top_grp',
    topicName: 'Graphs',
    title: 'Breadth-First Search (BFS) implementation',
    description: 'Queue traversal and shortest path in unweighted graphs.',
    date: getRelativeDateString(1),
    dayNumber: 4,
    durationMinutes: 45,
    status: 'Not Started',
  },
  {
    id: 'tsk_4_3',
    subjectId: 'sub_cs_ds',
    topicId: 'top_grp',
    topicName: 'Graphs',
    title: 'Depth-First Search (DFS) & cycle detection',
    description: 'Recursive visited array tracking and back edge identification.',
    date: getRelativeDateString(1),
    dayNumber: 4,
    durationMinutes: 30,
    status: 'Not Started',
  },

  // Day 5
  {
    id: 'tsk_5_1',
    subjectId: 'sub_cs_ds',
    topicId: 'top_sort',
    topicName: 'Sorting',
    title: 'MergeSort divide & conquer proof',
    description: 'Master array splitting and the linear merge step.',
    date: getRelativeDateString(2),
    dayNumber: 5,
    durationMinutes: 45,
    status: 'Not Started',
  },
  {
    id: 'tsk_5_2',
    subjectId: 'sub_cs_ds',
    topicId: 'top_sort',
    topicName: 'Sorting',
    title: 'QuickSort partition algorithms',
    description: 'Lomuto vs Hoare partitioning schemes and pivot selection.',
    date: getRelativeDateString(2),
    dayNumber: 5,
    durationMinutes: 45,
    status: 'Not Started',
  },

  // Day 6
  {
    id: 'tsk_6_1',
    subjectId: 'sub_cs_ds',
    topicId: 'top_srch',
    topicName: 'Searching',
    title: 'Binary search variants & edge conditions',
    description: 'Lower bound, upper bound, and rotated sorted array searches.',
    date: getRelativeDateString(3),
    dayNumber: 6,
    durationMinutes: 35,
    status: 'Not Started',
  },
  {
    id: 'tsk_6_2',
    subjectId: 'sub_cs_ds',
    topicId: 'top_srch',
    topicName: 'Searching',
    title: 'Hash tables & collision resolution',
    description: 'Chaining vs open addressing with linear probing.',
    date: getRelativeDateString(3),
    dayNumber: 6,
    durationMinutes: 40,
    status: 'Not Started',
  },

  // Day 7 (Final Exam Prep)
  {
    id: 'tsk_7_1',
    subjectId: 'sub_cs_ds',
    topicId: 'top_all',
    topicName: 'Comprehensive Review',
    title: 'Full timed mock exam (50 questions)',
    description: 'Simulated 90-minute examination covering all syllabus topics.',
    date: getRelativeDateString(4),
    dayNumber: 7,
    durationMinutes: 90,
    status: 'Not Started',
  },
  {
    id: 'tsk_7_2',
    subjectId: 'sub_cs_ds',
    topicId: 'top_all',
    topicName: 'Comprehensive Review',
    title: 'Weak spots & formula sheet revision',
    description: 'Review Big-O master theorem, tree rotation rules, and memory tables.',
    date: getRelativeDateString(5),
    dayNumber: 7,
    durationMinutes: 60,
    status: 'Not Started',
  },
];

// Build Study Plan Days for Data Structures
const buildStudyPlanDays = (tasks: StudyTask[]): StudyPlanDay[] => {
  const daysMap = new Map<number, StudyPlanDay>();

  const dayMeta: { [key: number]: { topicName: string; topicId: string; estMin: number } } = {
    1: { topicName: 'Arrays', topicId: 'top_arr', estMin: 65 },
    2: { topicName: 'Linked Lists', topicId: 'top_ll', estMin: 90 },
    3: { topicName: 'Stacks, Queues & Trees intro', topicId: 'top_stk', estMin: 185 },
    4: { topicName: 'Graphs (BFS & DFS)', topicId: 'top_grp', estMin: 120 },
    5: { topicName: 'Sorting Algorithms', topicId: 'top_sort', estMin: 90 },
    6: { topicName: 'Searching & Hash Tables', topicId: 'top_srch', estMin: 75 },
    7: { topicName: 'Comprehensive Mock Exam & Final Review', topicId: 'top_all', estMin: 150 },
  };

  for (let i = 1; i <= 7; i++) {
    const dayTasks = tasks.filter((t) => t.dayNumber === i);
    const meta = dayMeta[i] || { topicName: 'General Review', topicId: 'top_gen', estMin: 90 };
    
    // Determine day status
    let status: 'Not Started' | 'In Progress' | 'Completed' | 'Missed' = 'Not Started';
    if (dayTasks.length > 0) {
      const completedCount = dayTasks.filter((t) => t.status === 'Completed').length;
      if (completedCount === dayTasks.length) {
        status = 'Completed';
      } else if (completedCount > 0 || dayTasks.some((t) => t.status === 'In Progress')) {
        status = 'In Progress';
      } else if (dayTasks.some((t) => t.status === 'Missed')) {
        status = 'Missed';
      }
    }

    daysMap.set(i, {
      dayNumber: i,
      date: getRelativeDateString(i - 3), // Day 3 is today (i - 3 = 0)
      topicId: meta.topicId,
      topicName: meta.topicName,
      estimatedMinutes: meta.estMin,
      status,
      tasks: dayTasks,
    });
  }

  return Array.from(daysMap.values());
};

// Initial Plan Adjustment Proposal
const initialProposal: PlanAdjustmentProposal = {
  id: 'prop_01_trees_replan',
  reason: 'Student marked "Trees: Binary Tree basics & BST practice" as incomplete during Day 3.',
  createdAt: 'Just now',
  originalScheduleSummary: 'Day 4: Graphs (120m) → Day 5: Sorting (90m) → Day 6: Searching (75m)',
  adjustedScheduleSummary: 'Day 4: Complete Trees (60m) + Intro Graphs (60m) → Day 5: Full Graphs & Sorting (110m) → Day 6: Searching & Review',
  details: [
    {
      day: 4,
      originalTopic: 'Graphs (Full 120m deep dive)',
      newTopic: 'Finish Trees (60m) + Graphs Core (60m)',
      explanation: 'Preserves foundation knowledge before tackling complex graph traversals.',
    },
    {
      day: 5,
      originalTopic: 'Sorting Algorithms (90m)',
      newTopic: 'Advanced Graphs + MergeSort & QuickSort (110m)',
      explanation: 'Consolidates algorithmic paradigms with high-yield practice.',
    },
    {
      day: 6,
      originalTopic: 'Searching (75m)',
      newTopic: 'Hash Tables, Searching & Buffer Catch-up',
      explanation: 'Allows full syllabus coverage without pushing back final review day.',
    },
  ],
  applied: false,
};

// Initial Study Plan
let currentStudyPlan: StudyPlan = {
  id: 'plan_cs_ds_01',
  subjectId: 'sub_cs_ds',
  createdAt: '2026-09-22',
  updatedAt: '2026-09-28',
  examDate: getRelativeDateString(6),
  dailyAvailableMinutes: 180, // 3 hours
  days: buildStudyPlanDays(initialTasks),
  overallCompletionPercent: 44, // 7 of 16 tasks complete
  healthStatus: 'Slightly Behind',
  activeProposal: initialProposal,
};

// Simulated notifications that an n8n webhook would push
const initialNotifications: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'Study Reminder (n8n Automation)',
    message: 'You have 45 minutes of study planned for today on Binary Search Trees.',
    timestamp: '2 hours ago',
    type: 'reminder',
    read: false,
  },
  {
    id: 'notif_2',
    title: 'Plan Adjustment Suggested',
    message: 'Adaptive agent noticed Trees task is pending. Click to inspect the recommended schedule re-balance.',
    timestamp: '35 mins ago',
    type: 'adjustment',
    read: false,
  },
  {
    id: 'notif_3',
    title: 'Streak Milestone!',
    message: 'You achieved a 5-day study streak. Keep the momentum going for Data Structures!',
    timestamp: 'Yesterday',
    type: 'milestone',
    read: true,
  },
];

// Initial Agent Interactions
const initialInteractions: AgentInteraction[] = [
  {
    id: 'int_01',
    userId: 'usr_alex_01',
    subjectId: 'sub_cs_ds',
    userMessage: 'My exam is in six days and I haven’t completed Trees yet. What should I do?',
    response: `I've analyzed your progress against your 6-day Data Structures exam deadline. You have completed Arrays and Linked Lists (100%), but Trees is currently at 20% with 2 pending tasks.\n\nBecause Trees is a prerequisite for understanding Graphs and Heap-based sorting, I have prepared an adaptive re-scheduling proposal that dedicates tomorrow morning's first 60 minutes to mastering BST operations before we transition into Graphs.`,
    timestamp: '10:14 AM',
    agenticWorkflow: {
      observe: 'Checked study plan "plan_cs_ds_01". Observed 6 days until exam, 2 incomplete tree tasks, 3 hours daily availability.',
      reason: 'Trees has a 120-minute estimated difficulty and 30% exam weighting. Skipping Trees will impair Day 4 Graphs comprehension.',
      plan: 'Reallocate 60 minutes from Day 4 Graph theory into Tree BST practice, merge Sorting and searching on Day 5/6.',
      act: 'Generated adaptive schedule proposal "prop_01_trees_replan".',
      check: 'Verified total syllabus coverage still finishes 24 hours prior to exam day.',
      adapt: 'Proposing 1-click schedule realignment to user with automated notification dispatch.',
    },
    reasoningSteps: [
      { step: 1, title: 'Observe Study Plan State', detail: 'Fetched current subject: Data Structures (CS-201). Exam in 6 days.', status: 'completed' },
      { step: 2, title: 'Evaluate Topic Dependencies', detail: 'Identified Trees as bottleneck for Graphs and Heaps.', status: 'completed' },
      { step: 3, title: 'Calculate Time Surplus & Deficit', detail: 'Calculated 45-min deficit on Day 3; 30-min buffer available on Day 5.', status: 'completed' },
      { step: 4, title: 'Construct Rebalanced Timeline', detail: 'Drafted adjusted 4-day sequence preserving mock exam on Day 7.', status: 'completed' },
    ],
    actionCard: {
      type: 'replan',
      title: 'Adaptive Plan Ready to Apply',
      description: 'Shift Day 4 start to complete Trees without reducing mock exam time.',
      actionLabel: 'Apply New Plan',
    },
  },
];

// In-Memory State Store
let state = {
  user: { ...initialUser },
  subjects: [...initialSubjects],
  materials: [...initialMaterials],
  topics: [...initialTopics],
  tasks: [...initialTasks],
  studyPlan: { ...currentStudyPlan },
  notifications: [...initialNotifications],
  interactions: [...initialInteractions],
};

// -------------------------------------------------------------
// SERVICE METHODS (Designed for seamless replacement with API / n8n)
// -------------------------------------------------------------

export const StudyFlowService = {
  /**
   * Get current demo user
   */
  async getUser(): Promise<User> {
    return { ...state.user };
  },

  /**
   * Get list of all enrolled subjects
   */
  async getSubjects(): Promise<Subject[]> {
    return [...state.subjects];
  },

  /**
   * Create a new subject
   */
  async createSubject(subjectData: Partial<Subject>): Promise<Subject> {
    const newSubject: Subject = {
      id: `sub_${Date.now()}`,
      name: subjectData.name || 'New Subject',
      code: subjectData.code || 'SUB-101',
      color: subjectData.color || '#6366F1',
      examDate: subjectData.examDate || getRelativeDateString(14),
      knowledgeLevel: subjectData.knowledgeLevel || 'Intermediate',
      dailyAvailableHours: subjectData.dailyAvailableHours || 2,
      description: subjectData.description || 'Custom course subject plan.',
      totalTopicsCount: subjectData.totalTopicsCount || 5,
      completedTopicsCount: 0,
    };
    state.subjects.push(newSubject);
    return newSubject;
  },

  /**
   * Get study materials for a subject (or all)
   */
  async getStudyMaterials(subjectId?: string): Promise<StudyMaterial[]> {
    if (subjectId) {
      return state.materials.filter((m) => m.subjectId === subjectId);
    }
    return [...state.materials];
  },

  /**
   * Upload study material (mock prototype handler)
   */
  async uploadStudyMaterial(params: {
    subjectId: string;
    fileName: string;
    fileType: 'pdf' | 'notes' | 'docx' | 'slides';
    fileSize: string;
    pagesCount: number;
  }): Promise<StudyMaterial> {
    const newMaterial: StudyMaterial = {
      id: `mat_${Date.now()}`,
      subjectId: params.subjectId,
      fileName: params.fileName,
      fileType: params.fileType,
      fileSize: params.fileSize,
      uploadedAt: 'Just now',
      pagesCount: params.pagesCount,
      topicsExtractedCount: Math.max(3, Math.min(8, Math.round(params.pagesCount / 5))),
      status: 'Ready',
      summary: `Document processed with ${params.pagesCount} pages. Ready for topic extraction.`,
    };
    state.materials.unshift(newMaterial);
    return newMaterial;
  },

  /**
   * Prototype topic extraction from document
   */
  async extractTopics(materialId: string): Promise<Topic[]> {
    const material = state.materials.find((m) => m.id === materialId);
    if (!material) return [];
    return state.topics.filter((t) => t.materialId === materialId || t.subjectId === material.subjectId);
  },

  /**
   * Get all topics for a subject
   */
  async getTopics(subjectId: string): Promise<Topic[]> {
    return state.topics.filter((t) => t.subjectId === subjectId);
  },

  /**
   * Get active study plan for a subject
   */
  async getStudyPlan(subjectId: string): Promise<StudyPlan> {
    // If the subject matches current plan
    if (state.studyPlan.subjectId === subjectId) {
      return { ...state.studyPlan };
    }
    // Return a synthesized plan for other subjects
    const subject = state.subjects.find((s) => s.id === subjectId);
    return {
      id: `plan_${subjectId}`,
      subjectId,
      createdAt: '2026-09-24',
      updatedAt: '2026-09-28',
      examDate: subject?.examDate || getRelativeDateString(14),
      dailyAvailableMinutes: (subject?.dailyAvailableHours || 2) * 60,
      days: state.studyPlan.days,
      overallCompletionPercent: 20,
      healthStatus: 'On Track',
    };
  },

  /**
   * Generate a study plan from the wizard
   */
  async generateStudyPlan(params: {
    subjectName: string;
    examDate: string;
    dailyHours: number;
    knowledgeLevel: any;
    topics: string[];
    materialName?: string;
  }): Promise<StudyPlan> {
    // Create new subject if needed or match existing
    let subject = state.subjects.find((s) => s.name.toLowerCase() === params.subjectName.toLowerCase());
    if (!subject) {
      subject = await this.createSubject({
        name: params.subjectName,
        examDate: params.examDate,
        dailyAvailableHours: params.dailyHours,
        knowledgeLevel: params.knowledgeLevel,
        totalTopicsCount: params.topics.length || 6,
      });
    }

    // Calculate days between today and exam
    const today = new Date();
    const examDate = new Date(params.examDate);
    const diffTime = Math.max(1, examDate.getTime() - today.getTime());
    const daysRemaining = Math.max(3, Math.min(30, Math.ceil(diffTime / (1000 * 60 * 60 * 24))));

    const topicsList = params.topics.length > 0 ? params.topics : ['Fundamentals', 'Core Concepts', 'Advanced Applications', 'Practice Questions', 'Revision'];
    
    // Generate new plan days
    const generatedDays: StudyPlanDay[] = [];
    const generatedTasks: StudyTask[] = [];

    topicsList.forEach((topicName, idx) => {
      const dayNum = idx + 1;
      const topicId = `top_gen_${idx}`;
      const task1: StudyTask = {
        id: `tsk_gen_${dayNum}_1`,
        subjectId: subject!.id,
        topicId,
        topicName,
        title: `Read & understand ${topicName}`,
        description: `Study theory, core formulas, and architectural properties for ${topicName}.`,
        date: getRelativeDateString(idx),
        dayNumber: dayNum,
        durationMinutes: 45,
        status: 'Not Started',
      };
      const task2: StudyTask = {
        id: `tsk_gen_${dayNum}_2`,
        subjectId: subject!.id,
        topicId,
        topicName,
        title: `Complete ${topicName} practice exercises`,
        description: `Solve 4 high-frequency exam problems on ${topicName}.`,
        date: getRelativeDateString(idx),
        dayNumber: dayNum,
        durationMinutes: 45,
        status: 'Not Started',
      };

      generatedTasks.push(task1, task2);
      generatedDays.push({
        dayNumber: dayNum,
        date: getRelativeDateString(idx),
        topicId,
        topicName,
        estimatedMinutes: 90,
        status: 'Not Started',
        tasks: [task1, task2],
      });
    });

    const newPlan: StudyPlan = {
      id: `plan_${Date.now()}`,
      subjectId: subject.id,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      examDate: params.examDate,
      dailyAvailableMinutes: params.dailyHours * 60,
      days: generatedDays,
      overallCompletionPercent: 0,
      healthStatus: 'On Track',
    };

    state.studyPlan = newPlan;
    state.tasks = [...state.tasks, ...generatedTasks];

    return newPlan;
  },

  /**
   * Update task status (Not Started, In Progress, Completed, Missed)
   */
  async updateTaskStatus(taskId: string, newStatus: any): Promise<{ task: StudyTask; plan: StudyPlan }> {
    const task = state.tasks.find((t) => t.id === taskId);
    if (task) {
      task.status = newStatus;
    }

    // Recalculate plan days & overall completion
    state.studyPlan.days = buildStudyPlanDays(state.tasks);
    const total = state.tasks.filter((t) => t.subjectId === state.studyPlan.subjectId).length;
    const completed = state.tasks.filter((t) => t.subjectId === state.studyPlan.subjectId && t.status === 'Completed').length;
    state.studyPlan.overallCompletionPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Check health status
    const missedCount = state.tasks.filter((t) => t.subjectId === state.studyPlan.subjectId && t.status === 'Missed').length;
    if (missedCount > 2) {
      state.studyPlan.healthStatus = 'Behind Schedule';
    } else if (missedCount > 0 || (task && task.dayNumber <= 3 && newStatus === 'In Progress')) {
      state.studyPlan.healthStatus = 'Slightly Behind';
    } else {
      state.studyPlan.healthStatus = 'On Track';
    }

    return {
      task: task || state.tasks[0],
      plan: { ...state.studyPlan },
    };
  },

  /**
   * Apply an adaptive re-scheduling proposal
   */
  async applyAdjustedPlan(proposalId: string): Promise<StudyPlan> {
    if (state.studyPlan.activeProposal && state.studyPlan.activeProposal.id === proposalId) {
      state.studyPlan.activeProposal.applied = true;
    }

    // Update Day 4 & Day 5 tasks to reflect the adaptive adjustment
    const day4Tasks = state.tasks.filter((t) => t.dayNumber === 4);
    if (day4Tasks.length > 0) {
      day4Tasks[0].title = 'Finish Trees: Inorder & BST Practice';
      day4Tasks[0].description = 'Master BST insertion and edge checks before advancing.';
      day4Tasks[0].topicName = 'Trees & Intro Graphs';
    }

    const day5Tasks = state.tasks.filter((t) => t.dayNumber === 5);
    if (day5Tasks.length > 0) {
      day5Tasks[0].title = 'Advanced Graphs & MergeSort consolidation';
    }

    // Rebuild days & update health status
    state.studyPlan.days = buildStudyPlanDays(state.tasks);
    state.studyPlan.healthStatus = 'On Track';

    // Add notification
    state.notifications.unshift({
      id: `notif_${Date.now()}`,
      title: 'Plan Successfully Re-aligned',
      message: 'Adaptive AI adjusted Day 4 & Day 5 to secure Trees mastery. Schedule is back on track!',
      timestamp: 'Just now',
      type: 'adjustment',
      read: false,
    });

    return { ...state.studyPlan };
  },

  /**
   * Get progress statistics
   */
  async getProgress(subjectId?: string) {
    const sId = subjectId || state.studyPlan.subjectId;
    const subjectTasks = state.tasks.filter((t) => t.subjectId === sId);
    const totalTasks = subjectTasks.length || 1;
    const completedTasks = subjectTasks.filter((t) => t.status === 'Completed').length;
    const missedTasks = subjectTasks.filter((t) => t.status === 'Missed').length;
    const inProgressTasks = subjectTasks.filter((t) => t.status === 'In Progress').length;

    const subjectTopics = state.topics.filter((t) => t.subjectId === sId);
    const completedTopics = subjectTopics.filter((t) => t.status === 'Completed').length;
    const remainingTopics = subjectTopics.length - completedTopics;

    return {
      overallPercent: Math.round((completedTasks / totalTasks) * 100),
      topicsCompleted: completedTopics,
      topicsRemaining: remainingTopics,
      totalTopics: subjectTopics.length,
      studyHoursLogged: 8.5,
      studyHoursPlanned: 18.0,
      tasksCompleted: completedTasks,
      tasksMissed: missedTasks,
      tasksInProgress: inProgressTasks,
      currentStreakDays: state.user.currentStreakDays,
      weeklyActivity: [
        { day: 'Mon', hours: 2.5, target: 3 },
        { day: 'Tue', hours: 3.0, target: 3 },
        { day: 'Wed', hours: 2.0, target: 3 },
        { day: 'Thu', hours: 1.0, target: 3 },
        { day: 'Today', hours: 2.25, target: 3 },
        { day: 'Sat', hours: 0, target: 3 },
        { day: 'Sun', hours: 0, target: 3 },
      ],
      topicProgressList: subjectTopics.map((t) => ({
        id: t.id,
        name: t.name,
        difficulty: t.difficulty,
        progress: t.progressPercentage,
        status: t.status,
      })),
    };
  },

  /**
   * Trigger agent interaction simulation
   */
  async sendAgentMessage(userMessage: string, subjectId: string): Promise<AgentInteraction> {
    const interactionId = `int_${Date.now()}`;
    const subject = state.subjects.find((s) => s.id === subjectId) || state.subjects[0];

    // Rich contextual response logic based on user prompt
    let responseText = '';
    let actionCard: any = undefined;

    const lower = userMessage.toLowerCase();

    if (lower.includes('yesterday') || lower.includes('missed')) {
      responseText = `I noticed you weren't able to complete yesterday's session. Don't worry—the study plan is adaptive! I have analyzed your remaining ${subject.name} timeline (exam in 6 days) and recalculated your slots without extending daily study beyond your 3-hour limit.\n\nI have shifted the pending Trees practice into tomorrow morning's slot and compressed the revision module.`;
      actionCard = {
        type: 'replan',
        title: 'Adaptive Re-Balance Recommended',
        description: 'Realign Day 4 without sacrificing mock exam time.',
        actionLabel: 'Apply New Plan',
      };
    } else if (lower.includes('today') || lower.includes('what should i study')) {
      responseText = `For today in **${subject.name}**, your target is **Trees (Binary Trees & BSTs)**. You currently have:\n\n1. **Binary Tree basics & recursive traversals** (In Progress, ~45m)\n2. **BST search and insertion practice** (Not Started, ~45m)\n\nYou have completed 2.25 hours so far. Finishing these two tasks will bring your overall syllabus completion to **56%**!`;
    } else if (lower.includes('explain') || lower.includes('simply')) {
      responseText = `**Binary Search Trees (BST) Explained Simply:**\n\nImagine a dictionary where every word at the current page has smaller words to the left and larger words to the right. \n\n- **Invariance Rule:** For every node $N$, all nodes in its left subtree are strictly $< N$, and all nodes in its right subtree are strictly $> N$.\n- **Why it matters:** Searching takes $O(\\log n)$ time instead of scanning every item $O(n)$ like a normal list.\n- **Gotcha:** If inserted in sorted order (1, 2, 3, 4), it degrades into a line with $O(n)$ search! That's why AVL and Red-Black trees self-balance.`;
    } else if (lower.includes('practice') || lower.includes('questions')) {
      responseText = `Here are 2 high-yield practice questions extracted from your notes:\n\n**Q1: Inorder Traversal Property**\nWhat is special about the Inorder traversal of any valid Binary Search Tree?\n*Hint: Think about numerical ordering.*\n\n**Q2: Time Complexity**\nWhat is the worst-case time complexity of searching in an unbalanced BST vs an AVL tree?`;
      actionCard = {
        type: 'practice',
        title: 'BST Mini Quiz Ready',
        description: '2 quick validation questions based on Data Structures Notes.pdf',
        actionLabel: 'Reveal Answers & Explanations',
      };
    } else if (lower.includes('syllabus') || lower.includes('complete') || lower.includes('progress')) {
      responseText = `Here is your current status for **${subject.name}**:\n\n- **Overall Completion:** ${state.studyPlan.overallCompletionPercent}%\n- **Topics Completed:** 2 of 8 (Arrays, Linked Lists)\n- **In Progress:** Stacks, Queues, Trees\n- **Not Started:** Graphs, Sorting, Searching\n- **Days to Exam:** 6 days\n- **Plan Health:** ${state.studyPlan.healthStatus}`;
    } else {
      responseText = `I have received your request regarding **${subject.name}**. I am continuously monitoring your study progress, syllabus materials, and exam schedule.\n\nYour next recommended action is to complete the **Binary Tree basics** task on Day 3. Let me know if you would like me to adjust your study times or generate a targeted practice quiz!`;
    }

    const newInteraction: AgentInteraction = {
      id: interactionId,
      userId: state.user.id,
      subjectId,
      userMessage,
      response: responseText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      agenticWorkflow: {
        observe: `Analyzed prompt against subject ${subject.name} (exam ${subject.examDate}).`,
        reason: 'Evaluated knowledge state, pending tasks, and optimal revision curve.',
        plan: 'Determined targeted response and actionable next steps.',
        act: 'Dispatched structured response card with proactive guidance.',
        check: 'Validated that schedule aligns with student daily capacity.',
        adapt: 'Plan Health monitored; webhook ready for n8n notification triggers.',
      },
      reasoningSteps: [
        { step: 1, title: 'Inspect Student State', detail: `Retrieved syllabus progress (${state.studyPlan.overallCompletionPercent}% completed).`, status: 'completed' },
        { step: 2, title: 'Analyze Query Intent', detail: `Classified user intent: "${userMessage.slice(0, 30)}..."`, status: 'completed' },
        { step: 3, title: 'Synthesize Actionable Guidance', detail: 'Generated pedagogical explanation and study schedule check.', status: 'completed' },
      ],
      actionCard,
    };

    state.interactions.push(newInteraction);
    return newInteraction;
  },

  /**
   * Get all past interactions with the AI assistant
   */
  async getAgentInteractions(subjectId?: string): Promise<AgentInteraction[]> {
    return [...state.interactions];
  },

  /**
   * Generate the exact JSON payload designed for n8n webhook and `/api/agent`
   */
  getAgentPayloadPreview(subjectId: string, currentMessage = 'I missed yesterday’s study session.'): AgentPayload {
    const subject = state.subjects.find((s) => s.id === subjectId) || state.subjects[0];
    const materials = state.materials.filter((m) => m.subjectId === subject.id);
    const subjectTasks = state.tasks.filter((t) => t.subjectId === subject.id);
    const completedTasks = subjectTasks.filter((t) => t.status === 'Completed').length;
    const missedTasks = subjectTasks.filter((t) => t.status === 'Missed').length;

    const today = new Date();
    const examDate = new Date(subject.examDate);
    const diffDays = Math.max(0, Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

    return {
      userId: state.user.id,
      subject: {
        id: subject.id,
        name: subject.name,
        examDate: subject.examDate,
        daysRemaining: diffDays,
      },
      currentStudyPlan: {
        overallCompletionPercent: state.studyPlan.overallCompletionPercent,
        healthStatus: state.studyPlan.healthStatus,
        totalDays: state.studyPlan.days.length,
        completedDays: state.studyPlan.days.filter((d) => d.status === 'Completed').length,
      },
      currentProgress: {
        completedTasksCount: completedTasks,
        totalTasksCount: subjectTasks.length,
        missedTasksCount: missedTasks,
        inProgressTopic: 'Trees',
      },
      relevantStudyMaterial: materials.map((m) => ({
        fileName: m.fileName,
        extractedTopicsCount: m.topicsExtractedCount,
      })),
      userMessage: currentMessage,
      timestamp: new Date().toISOString(),
      metadata: {
        source: 'StudyFlow Web',
        pipeline: 'n8n-ready-webhook',
        version: '1.0.0',
      },
    };
  },

  /**
   * Get simulated automated notifications
   */
  async getNotifications(): Promise<NotificationItem[]> {
    return [...state.notifications];
  },

  /**
   * Reset demo data back to clean initial state
   */
  resetDemoData() {
    state = {
      user: { ...initialUser },
      subjects: [...initialSubjects],
      materials: [...initialMaterials],
      topics: [...initialTopics],
      tasks: [...initialTasks],
      studyPlan: { ...currentStudyPlan, days: buildStudyPlanDays(initialTasks), overallCompletionPercent: 44 },
      notifications: [...initialNotifications],
      interactions: [...initialInteractions],
    };
  },
};
