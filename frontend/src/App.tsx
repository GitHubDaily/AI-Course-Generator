/**
 * 主应用组件
 * 管理整体状态和页面切换
 */

import { useState } from 'react';
import { message } from 'antd';
import TextInput from './components/TextInput';
import CourseOutlineComponent from './components/CourseOutline';
import ModuleDetailComponent from './components/ModuleDetail';
import Loading from './components/Loading';
import { generateOutline, generateDetail } from './services/api';
import type {
  ViewType,
  GenerateOutlineRequest,
  CourseOutline,
  CourseModule,
  ModuleDetail,
} from './types/course';
import './App.css';

function App() {
  // 视图状态
  const [view, setView] = useState<ViewType>('input');
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('正在处理中...');

  // 数据状态
  const [outline, setOutline] = useState<CourseOutline | null>(null);
  const [selectedModule, setSelectedModule] = useState<CourseModule | null>(null);
  const [moduleDetail, setModuleDetail] = useState<ModuleDetail | null>(null);
  const [textbookContent, setTextbookContent] = useState('');

  /**
   * 处理生成大纲请求
   */
  const handleGenerateOutline = async (params: GenerateOutlineRequest) => {
    setLoading(true);
    setLoadingMessage('正在生成课程大纲，请稍候...');

    try {
      // 保存课本内容用于后续详情生成
      setTextbookContent(params.textbook_content);

      // 调用API生成大纲
      const result = await generateOutline(params);

      setOutline(result);
      setView('outline');
      message.success('课程大纲生成成功！');
    } catch (error: any) {
      console.error('生成大纲失败:', error);
      message.error(error.message || '生成大纲失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 处理查看模块详情
   */
  const handleViewDetail = async (module: CourseModule) => {
    setSelectedModule(module);
    setLoading(true);
    setLoadingMessage('正在生成模块详细内容...');

    try {
      // 调用API生成详情
      const result = await generateDetail({
        module_info: module,
        textbook_content: textbookContent,
        detail_level: 'standard',
        exercise_count: 5,
      });

      setModuleDetail(result);
      setView('detail');
      message.success('模块详情生成成功！');
    } catch (error: any) {
      console.error('生成详情失败:', error);
      message.error(error.message || '生成详情失败，请重试');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 返回输入页面
   */
  const handleBackToInput = () => {
    setView('input');
    setOutline(null);
    setSelectedModule(null);
    setModuleDetail(null);
  };

  /**
   * 返回大纲页面
   */
  const handleBackToOutline = () => {
    setView('outline');
    setSelectedModule(null);
    setModuleDetail(null);
  };

  // 渲染当前视图
  const renderView = () => {
    if (loading) {
      return <Loading message={loadingMessage} />;
    }

    switch (view) {
      case 'input':
        return (
          <TextInput
            onGenerate={handleGenerateOutline}
            loading={loading}
          />
        );

      case 'outline':
        return outline ? (
          <CourseOutlineComponent
            outline={outline}
            onBack={handleBackToInput}
            onViewDetail={handleViewDetail}
          />
        ) : null;

      case 'detail':
        return moduleDetail && selectedModule ? (
          <ModuleDetailComponent
            detail={moduleDetail}
            moduleTitle={selectedModule.title}
            onBack={handleBackToOutline}
          />
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className="app">
      <div className="app-container">
        {renderView()}
      </div>
    </div>
  );
}

export default App;
