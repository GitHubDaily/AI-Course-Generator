/**
 * 加载组件
 * 显示加载动画和提示信息
 */

import { Spin } from 'antd';
import './Loading.css';

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = '正在处理中...' }) => {
  return (
    <div className="loading-container">
      <Spin size="large" />
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default Loading;
