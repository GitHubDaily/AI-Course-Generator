/**
 * API 调用服务
 * 封装所有与后端的 HTTP 通信
 */

import axios, { AxiosError } from 'axios';
import type {
  GenerateOutlineRequest,
  GenerateDetailRequest,
  ApiResponse,
  CourseOutline,
  ModuleDetail,
} from '../types/course';

// 从环境变量获取 API 基础 URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// 创建 axios 实例
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000, // 120 秒超时
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    console.log(`📡 API 请求: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ 请求错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API 响应: ${response.config.url}`, response.data);
    return response;
  },
  (error: AxiosError) => {
    console.error('❌ 响应错误:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * 生成课程大纲
 */
export const generateOutline = async (
  params: GenerateOutlineRequest
): Promise<CourseOutline> => {
  try {
    const response = await apiClient.post<ApiResponse<CourseOutline>>(
      '/api/generate-outline',
      params
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error(response.data.error || '生成大纲失败');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.detail || error.message;
      throw new Error(`生成大纲失败: ${message}`);
    }
    throw error;
  }
};

/**
 * 生成模块详细内容
 */
export const generateDetail = async (
  params: GenerateDetailRequest
): Promise<ModuleDetail> => {
  try {
    const response = await apiClient.post<ApiResponse<ModuleDetail>>(
      '/api/generate-detail',
      params
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error(response.data.error || '生成详情失败');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.detail || error.message;
      throw new Error(`生成详情失败: ${message}`);
    }
    throw error;
  }
};

/**
 * 健康检查
 */
export const healthCheck = async (): Promise<any> => {
  try {
    const response = await apiClient.get('/health');
    return response.data;
  } catch (error) {
    console.error('健康检查失败:', error);
    throw error;
  }
};
