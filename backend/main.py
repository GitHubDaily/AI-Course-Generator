"""
FastAPI 主应用
提供课程生成相关的 API 端点
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uvicorn

from config import config
from models import (
    GenerateOutlineRequest,
    GenerateDetailRequest,
    ApiResponse,
    CourseOutline,
    ModuleDetail
)
from workflow_client import workflow_client


@asynccontextmanager
async def lifespan(app: FastAPI):
    """应用生命周期管理"""
    # 启动时验证配置
    print("\n" + "="*50)
    print("🚀 AI 课程生成系统 - 后端服务启动")
    print("="*50)

    if not config.validate():
        print("\n⚠️  警告：配置验证失败，部分功能可能不可用")

    print(f"\n✅ 服务器配置:")
    print(f"   - 端口: {config.BACKEND_PORT}")
    print(f"   - CORS 允许的源: {config.CORS_ORIGINS}")
    print(f"   - 工作流1 ID: {config.WORKFLOW_1_ID[:20]}...")
    if config.WORKFLOW_2_ID:
        print(f"   - 工作流2 ID: {config.WORKFLOW_2_ID[:20]}...")
    print("\n" + "="*50 + "\n")

    yield

    # 关闭时清理
    print("\n👋 服务器关闭")


# 创建 FastAPI 应用
app = FastAPI(
    title="AI 课程生成系统 API",
    description="基于讯飞星辰的课程内容生成 API",
    version="1.0.0",
    lifespan=lifespan
)

# 配置 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """根路径"""
    return {
        "message": "AI 课程生成系统 API",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    """健康检查"""
    return {
        "status": "healthy",
        "service": "ai-course-generator",
        "config_valid": bool(config.XINGCHEN_API_KEY and config.WORKFLOW_1_ID)
    }


@app.post("/api/generate-outline", response_model=ApiResponse)
async def generate_outline(request: GenerateOutlineRequest):
    """
    生成课程大纲

    接收课本文本内容，返回结构化的课程大纲
    """
    try:
        print(f"\n📥 收到生成大纲请求")
        print(f"   - 文本长度: {len(request.textbook_content)} 字符")
        print(f"   - 年级: {request.grade_level}")
        print(f"   - 学科: {request.subject}")
        print(f"   - 模块数: {request.module_count}")

        # 调用工作流1
        result = await workflow_client.call_workflow_1(
            textbook_content=request.textbook_content,
            grade_level=request.grade_level,
            subject=request.subject,
            module_count=request.module_count or 4
        )

        # 验证返回的数据结构
        try:
            course_outline = CourseOutline(**result)
            print(f"✅ 大纲生成成功: {course_outline.course_title}")
            print(f"   - 共 {course_outline.total_modules} 个模块")
        except Exception as e:
            print(f"⚠️  返回数据结构验证失败: {str(e)}")
            print(f"   原始数据: {result}")
            # 即使验证失败也返回原始数据

        return ApiResponse(
            success=True,
            message="课程大纲生成成功",
            data=result
        )

    except Exception as e:
        print(f"❌ 生成大纲失败: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"生成课程大纲失败: {str(e)}"
        )


@app.post("/api/generate-detail", response_model=ApiResponse)
async def generate_detail(request: GenerateDetailRequest):
    """
    生成模块详细内容

    接收模块信息和课本内容，返回详细的教学内容
    """
    try:
        print(f"\n📥 收到生成详情请求")
        print(f"   - 模块: {request.module_info.title}")
        print(f"   - 文本长度: {len(request.textbook_content)} 字符")
        print(f"   - 详细程度: {request.detail_level}")
        print(f"   - 练习题数: {request.exercise_count}")

        # 调用工作流2
        result = await workflow_client.call_workflow_2(
            module_info=request.module_info.dict(),
            textbook_content=request.textbook_content,
            detail_level=request.detail_level or "standard",
            exercise_count=request.exercise_count or 5
        )

        # 验证返回的数据结构
        try:
            module_detail = ModuleDetail(**result)
            print(f"✅ 详情生成成功")
            print(f"   - 教学案例: {len(module_detail.examples)} 个")
            print(f"   - 练习题: {len(module_detail.exercises)} 道")
        except Exception as e:
            print(f"⚠️  返回数据结构验证失败: {str(e)}")
            print(f"   原始数据: {result}")

        return ApiResponse(
            success=True,
            message="模块详细内容生成成功",
            data=result
        )

    except Exception as e:
        print(f"❌ 生成详情失败: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"生成模块详细内容失败: {str(e)}"
        )


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=config.BACKEND_PORT,
        reload=True
    )
