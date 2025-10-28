"""
配置管理模块
从环境变量加载配置并验证必需的配置项
"""

import os
from typing import Optional
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()


class Config:
    """应用配置类"""

    # 讯飞星辰 API 配置
    XINGCHEN_API_URL: str = os.getenv("XINGCHEN_API_URL","")
    XINGCHEN_API_KEY: str = os.getenv("XINGCHEN_API_KEY", "")
    XINGCHEN_API_SECRET: str = os.getenv("XINGCHEN_API_SECRET", "")

    # 工作流 ID
    WORKFLOW_1_ID: str = os.getenv("WORKFLOW_1_ID", "")  # 课程大纲生成
    WORKFLOW_2_ID: str = os.getenv("WORKFLOW_2_ID", "")  # 模块详细内容生成

    # 服务器配置
    BACKEND_PORT: int = int(os.getenv("BACKEND_PORT", "8000"))
    CORS_ORIGINS: list = os.getenv(
        "CORS_ORIGINS",
        "http://localhost:3000,http://localhost:5173"
    ).split(",")

    @classmethod
    def validate(cls) -> bool:
        """验证必需的配置项是否存在"""
        required_fields = [
            ("XINGCHEN_API_KEY", cls.XINGCHEN_API_KEY),
            ("XINGCHEN_API_SECRET", cls.XINGCHEN_API_SECRET),
            ("WORKFLOW_1_ID", cls.WORKFLOW_1_ID),
        ]

        missing = []
        for name, value in required_fields:
            if not value:
                missing.append(name)

        if missing:
            print(f"❌ 缺少必需的环境变量: {', '.join(missing)}")
            return False

        print("✅ 配置验证通过")
        return True


# 创建配置实例
config = Config()
