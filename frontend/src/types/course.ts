/**
 * 课程相关的 TypeScript 类型定义
 */

// ============== 课程大纲相关类型 ==============

export interface CourseModule {
  module_id: string;
  title: string;
  description: string;
  sequence: number;
  duration_minutes: number;
  learning_objectives: string[];
  key_concepts: string[];
  prerequisites: string[];
}

export interface CourseOutline {
  course_title: string;
  grade: string;
  subject: string;
  total_modules: number;
  estimated_hours: number;
  modules: CourseModule[];
}

export interface GenerateOutlineRequest {
  textbook_content: string;
  grade_level?: string;
  subject?: string;
  module_count?: number;
}

// ============== 模块详细内容相关类型 ==============

export interface TeachingSection {
  title: string;
  duration_minutes: number;
  content: string;
  activities: string[];
}

export interface TeachingPlan {
  introduction: TeachingSection;
  main_content: TeachingSection;
  practice: TeachingSection;
  summary: TeachingSection;
}

export interface Exercise {
  id: string;
  type: string;
  question: string;
  answer: string;
  difficulty: string;
  explanation: string;
}

export interface TeachingExample {
  title: string;
  content: string;
  purpose: string;
}

export interface ModuleDetail {
  module_id: string;
  teaching_plan: TeachingPlan;
  examples: TeachingExample[];
  exercises: Exercise[];
  teaching_tips: string[];
}

export interface GenerateDetailRequest {
  module_info: CourseModule;
  textbook_content: string;
  detail_level?: string;
  exercise_count?: number;
}

// ============== 通用响应类型 ==============

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// ============== 视图状态类型 ==============

export type ViewType = 'input' | 'outline' | 'detail';
