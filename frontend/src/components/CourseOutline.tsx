/**
 * 课程大纲展示组件
 * 展示课程的所有模块信息
 */

import { Card, Tag, Button, Collapse, Space, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import type { CourseOutline, CourseModule } from '../types/course';
import './CourseOutline.css';

const { Panel } = Collapse;
const { Title, Paragraph, Text } = Typography;

interface CourseOutlineProps {
  outline: CourseOutline;
  onBack: () => void;
  onViewDetail: (module: CourseModule) => void;
}

const CourseOutlineComponent: React.FC<CourseOutlineProps> = ({
  outline,
  onBack,
  onViewDetail,
}) => {
  return (
    <div className="outline-container">
      <div className="outline-header">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={onBack}
          size="large"
        >
          返回
        </Button>
      </div>

      <Card className="course-info-card">
        <Title level={2}>{outline.course_title}</Title>
        <Space size="large" className="course-meta">
          <Text>年级：{outline.grade}</Text>
          <Text>学科：{outline.subject}</Text>
          <Text>{outline.total_modules} 个模块</Text>
          <Text>预计 {outline.estimated_hours} 课时</Text>
        </Space>
      </Card>

      <div className="modules-list">
        {outline.modules.map((module, index) => (
          <Card
            key={module.module_id}
            className="module-card"
            title={
              <div className="module-title">
                <span className="module-number">模块 {module.sequence}</span>
                <span>{module.title}</span>
              </div>
            }
            extra={
              <Button type="primary" onClick={() => onViewDetail(module)}>
                查看详情
              </Button>
            }
          >
            <Paragraph className="module-description">
              {module.description}
            </Paragraph>

            <div className="module-meta">
              <Text type="secondary">时长：{module.duration_minutes} 分钟</Text>
            </div>

            <Collapse ghost>
              <Panel header="🎯 学习目标" key="objectives">
                <ul className="objectives-list">
                  {module.learning_objectives.map((obj, i) => (
                    <li key={i}>{obj}</li>
                  ))}
                </ul>
              </Panel>
            </Collapse>

            <div className="key-concepts">
              <Text strong>💡 关键概念：</Text>
              <div className="concepts-tags">
                {module.key_concepts.map((concept, i) => (
                  <Tag key={i} color="blue">
                    {concept}
                  </Tag>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseOutlineComponent;
