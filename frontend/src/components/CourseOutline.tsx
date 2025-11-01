/**
 * 课程大纲展示组件
 * 展示课程的所有模块信息
 */

import { Card, Tag, Button, Collapse, Space, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  return (
    <div className="outline-container">
      <div className="outline-header">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={onBack}
          size="large"
        >
          {t('back')}
        </Button>
      </div>

      <Card className="course-info-card">
        <Title level={2}>{outline.course_title}</Title>
        <Space size="large" className="course-meta">
          <Text>{t('grade')}：{outline.grade}</Text>
          <Text>{t('subject')}：{outline.subject}</Text>
          <Text>{outline.total_modules} {t('modules')}</Text>
          <Text>{t('estimatedHours', { hours: outline.estimated_hours })}</Text>
        </Space>
      </Card>

      <div className="modules-list">
        {outline.modules.map((module) => (
          <Card
            key={module.module_id}
            className="module-card"
            title={
              <div className="module-title">
                <span className="module-number">{t('moduleNumber', { number: module.sequence })}</span>
                <span>{module.title}</span>
              </div>
            }
            extra={
              <Button type="primary" onClick={() => onViewDetail(module)}>
                {t('viewDetail')}
              </Button>
            }
          >
            <Paragraph className="module-description">
              {module.description}
            </Paragraph>

            <div className="module-meta">
              <Text type="secondary">{t('duration', { minutes: module.duration_minutes })}</Text>
            </div>

            <Collapse ghost>
              <Panel header={`🎯 ${t('learningObjectives')}`} key="objectives">
                <ul className="objectives-list">
                  {module.learning_objectives.map((obj, i) => (
                    <li key={i}>{obj}</li>
                  ))}
                </ul>
              </Panel>
            </Collapse>

            <div className="key-concepts">
              <Text strong>💡 {t('keyConcepts')}：</Text>
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
