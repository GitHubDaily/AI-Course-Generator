"""
工作流调用客户端
封装讯飞星辰 API 调用逻辑
"""

import json
import httpx
from typing import Dict, Any, Optional
from config import config


class WorkflowClient:
    """讯飞星辰工作流客户端"""

    def __init__(self):
        self.api_url = config.XINGCHEN_API_URL
        self.api_key = config.XINGCHEN_API_KEY
        self.api_secret = config.XINGCHEN_API_SECRET

    def _get_headers(self) -> Dict[str, str]:
        """获取请求头"""
        return {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.api_key}:{self.api_secret}"
        }

    async def _call_workflow(
        self,
        flow_id: str,
        parameters: Dict[str, Any],
        uid: str = "user_default"
    ) -> Dict[str, Any]:
        """
        调用工作流

        Args:
            flow_id: 工作流ID
            parameters: 工作流参数
            uid: 用户ID

        Returns:
            工作流返回的结果
        """
        headers = self._get_headers()

        data = {
            "flow_id": flow_id,
            "uid": uid,
            "parameters": parameters,
            "stream": False
        }

        try:
            async with httpx.AsyncClient(timeout=300.0) as client:  # 增加到 5 分钟
                print(f"📡 调用工作流: {flow_id}")
                print(f"📝 参数: {json.dumps(parameters, ensure_ascii=False)[:200]}...")

                response = await client.post(
                    self.api_url,
                    json=data,
                    headers=headers
                )

                response.raise_for_status()
                result = response.json()

                print(f"✅ 工作流调用成功")

                # 解析 output 字段（可能是字符串化的 JSON）
                if "output" in result:
                    output = result["output"]
                    if isinstance(output, str):
                        try:
                            return json.loads(output)
                        except json.JSONDecodeError:
                            print("⚠️  output 不是有效的 JSON，返回原始内容")
                            return {"content": output}
                    return output

                return result

        except httpx.HTTPStatusError as e:
            print(f"❌ HTTP 错误: {e.response.status_code}")
            print(f"响应内容: {e.response.text}")
            raise Exception(f"工作流调用失败: HTTP {e.response.status_code}")

        except httpx.TimeoutException:
            print(f"❌ 请求超时")
            raise Exception("工作流调用超时，请稍后重试")

        except Exception as e:
            print(f"❌ 调用工作流时出错: {str(e)}")
            raise

    async def call_workflow_1(
        self,
        textbook_content: str,
        grade_level: Optional[str] = None,
        subject: Optional[str] = None,
        module_count: int = 4
    ) -> Dict[str, Any]:
        """
        调用工作流1：生成课程大纲

        Args:
            textbook_content: 课本文本内容
            grade_level: 年级
            subject: 学科
            module_count: 模块数量

        Returns:
            课程大纲数据
        """
        parameters = {
            "TEXTBOOK_CONTENT": textbook_content,
            "GRADE_LEVEL": grade_level or "未指定",
            "SUBJECT": subject or "未指定",
            "MODULE_COUNT": str(module_count)
        }

        return await self._call_workflow(
            flow_id=config.WORKFLOW_1_ID,
            parameters=parameters
        )

    async def call_workflow_2(
        self,
        module_info: Dict[str, Any],
        textbook_content: str,
        detail_level: str = "standard",
        exercise_count: int = 5
    ) -> Dict[str, Any]:
        """
        调用工作流2：生成模块详细内容

        Args:
            module_info: 模块信息（JSON字符串或字典）
            textbook_content: 课本文本内容
            detail_level: 详细程度
            exercise_count: 练习题数量

        Returns:
            模块详细内容数据
        """
        # 如果 module_info 是字典，转换为 JSON 字符串
        if isinstance(module_info, dict):
            module_info_str = json.dumps(module_info, ensure_ascii=False)
        else:
            module_info_str = module_info

        parameters = {
            "MODULE_INFO": module_info_str,
            "TEXTBOOK_CONTENT": textbook_content,
            "DETAIL_LEVEL": detail_level,
            "EXERCISE_COUNT": str(exercise_count)
        }

        return await self._call_workflow(
            flow_id=config.WORKFLOW_2_ID,
            parameters=parameters
        )


# 创建全局客户端实例
workflow_client = WorkflowClient()
