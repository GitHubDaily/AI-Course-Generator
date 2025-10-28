"""
数据模型定义
使用 Pydantic 定义请求和响应模型
"""

from typing import List, Optional, Any
from pydantic import BaseModel, Field


# ============== 课程大纲相关模型 ==============

class CourseModule(BaseModel):
    """课程模块"""
    module_id: str = Field(..., description="模块ID")
    title: str = Field(..., description="模块标题")
    description: str = Field(..., description="模块描述")
    sequence: int = Field(..., description="顺序")
    duration_minutes: int = Field(..., description="时长（分钟）")
    learning_objectives: List[str] = Field(..., description="学习目标")
    key_concepts: List[str] = Field(..., description="关键概念")
    prerequisites: List[str] = Field(default_factory=list, description="前置要求")


class CourseOutline(BaseModel):
    """课程大纲"""
    course_title: str = Field(..., description="课程标题")
    grade: str = Field(..., description="年级")
    subject: str = Field(..., description="学科")
    total_modules: int = Field(..., description="模块总数")
    estimated_hours: int = Field(..., description="预计课时")
    modules: List[CourseModule] = Field(..., description="模块列表")


class GenerateOutlineRequest(BaseModel):
    """生成课程大纲请求"""
    textbook_content: str = Field(..., description="课本文本内容")
    grade_level: Optional[str] = Field(None, description="年级（如：三年级）")
    subject: Optional[str] = Field(None, description="学科（如：语文）")
    module_count: Optional[int] = Field(4, description="期望的模块数量，默认4个")


# ============== 模块详细内容相关模型 ==============

class TeachingSection(BaseModel):
    """教学环节"""
    title: str = Field(..., description="环节标题")
    duration_minutes: int = Field(..., description="时长（分钟）")
    content: str = Field(..., description="环节内容")
    activities: List[str] = Field(default_factory=list, description="活动列表")


class TeachingPlan(BaseModel):
    """教学计划"""
    introduction: TeachingSection = Field(..., description="导入环节")
    main_content: TeachingSection = Field(..., description="主要内容")
    practice: TeachingSection = Field(..., description="练习环节")
    summary: TeachingSection = Field(..., description="总结环节")


class Exercise(BaseModel):
    """练习题"""
    id: str = Field(..., description="题目ID")
    type: str = Field(..., description="题型")
    question: str = Field(..., description="题目")
    answer: str = Field(..., description="答案")
    difficulty: str = Field(..., description="难度")
    explanation: str = Field(..., description="解析")


class TeachingExample(BaseModel):
    """教学案例"""
    title: str = Field(..., description="案例标题")
    content: str = Field(..., description="案例内容")
    purpose: str = Field(..., description="案例目的")


class ModuleDetail(BaseModel):
    """模块详细内容"""
    module_id: str = Field(..., description="关联的模块ID")
    teaching_plan: TeachingPlan = Field(..., description="教学计划")
    examples: List[TeachingExample] = Field(..., description="教学案例")
    exercises: List[Exercise] = Field(..., description="练习题")
    teaching_tips: List[str] = Field(..., description="教学建议")


class GenerateDetailRequest(BaseModel):
    """生成模块详细内容请求"""
    module_info: CourseModule = Field(..., description="模块信息")
    textbook_content: str = Field(..., description="相关的课本内容")
    detail_level: Optional[str] = Field("standard", description="详细程度：simple/standard/detailed")
    exercise_count: Optional[int] = Field(5, description="练习题数量，默认5题")


# ============== 通用响应模型 ==============

class ApiResponse(BaseModel):
    """统一API响应"""
    success: bool = Field(..., description="是否成功")
    message: str = Field(..., description="响应消息")
    data: Optional[Any] = Field(None, description="响应数据")
    error: Optional[str] = Field(None, description="错误信息")
