/**
 * 模块详细内容展示组件
 * 展示教学计划、案例、练习题等详细信息
 */

import { Card, Button, Collapse, Tag, Typography, Divider } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import type { ModuleDetail } from '../types/course';
import './ModuleDetail.css';

const { Panel } = Collapse;
const { Title, Paragraph, Text } = Typography;

interface ModuleDetailProps {
  detail: ModuleDetail;
  moduleTitle: string;
  onBack: () => void;
}

const ModuleDetailComponent: React.FC<ModuleDetailProps> = ({
  detail,
  moduleTitle,
  onBack,
}) => {
  return (
    <div className="detail-container">
      <div className="detail-header">
        <Button icon={<ArrowLeftOutlined />} onClick={onBack} size="large">
          返回大纲
        </Button>
        <Title level={2}>{moduleTitle}</Title>
      </div>

      {/* 教学计划 */}
      <Card title="📋 教学计划" className="section-card">
        <div className="teaching-section">
          <div className="section-header">
            <Text strong>{detail.teaching_plan.introduction.title}</Text>
            <Tag color="blue">{detail.teaching_plan.introduction.duration_minutes} 分钟</Tag>
          </div>
          <Paragraph>{detail.teaching_plan.introduction.content}</Paragraph>
          {detail.teaching_plan.introduction.activities.length > 0 && (
            <ul>
              {detail.teaching_plan.introduction.activities.map((activity, i) => (
                <li key={i}>{activity}</li>
              ))}
            </ul>
          )}
        </div>

        <Divider />

        <div className="teaching-section">
          <div className="section-header">
            <Text strong>{detail.teaching_plan.main_content.title}</Text>
            <Tag color="green">{detail.teaching_plan.main_content.duration_minutes} 分钟</Tag>
          </div>
          <Paragraph>{detail.teaching_plan.main_content.content}</Paragraph>
          {detail.teaching_plan.main_content.activities.length > 0 && (
            <ul>
              {detail.teaching_plan.main_content.activities.map((activity, i) => (
                <li key={i}>{activity}</li>
              ))}
            </ul>
          )}
        </div>

        <Divider />

        <div className="teaching-section">
          <div className="section-header">
            <Text strong>{detail.teaching_plan.practice.title}</Text>
            <Tag color="orange">{detail.teaching_plan.practice.duration_minutes} 分钟</Tag>
          </div>
          <Paragraph>{detail.teaching_plan.practice.content}</Paragraph>
          {detail.teaching_plan.practice.activities.length > 0 && (
            <ul>
              {detail.teaching_plan.practice.activities.map((activity, i) => (
                <li key={i}>{activity}</li>
              ))}
            </ul>
          )}
        </div>

        <Divider />

        <div className="teaching-section">
          <div className="section-header">
            <Text strong>{detail.teaching_plan.summary.title}</Text>
            <Tag color="purple">{detail.teaching_plan.summary.duration_minutes} 分钟</Tag>
          </div>
          <Paragraph>{detail.teaching_plan.summary.content}</Paragraph>
          {detail.teaching_plan.summary.activities.length > 0 && (
            <ul>
              {detail.teaching_plan.summary.activities.map((activity, i) => (
                <li key={i}>{activity}</li>
              ))}
            </ul>
          )}
        </div>
      </Card>

      {/* 教学案例 */}
      {detail.examples && detail.examples.length > 0 && (
        <Card title="📚 教学案例" className="section-card">
          {detail.examples.map((example, index) => (
            <div key={index} className="example-item">
              <Title level={4}>{example.title}</Title>
              <Paragraph>{example.content}</Paragraph>
              <Text type="secondary">目的：{example.purpose}</Text>
              {index < detail.examples.length - 1 && <Divider />}
            </div>
          ))}
        </Card>
      )}

      {/* 练习题 */}
      {detail.exercises && detail.exercises.length > 0 && (
        <Card title="📝 练习题" className="section-card">
          <Collapse accordion>
            {detail.exercises.map((exercise, index) => (
              <Panel
                header={
                  <div className="exercise-header">
                    <span>{index + 1}. {exercise.question}</span>
                    <Tag color={
                      exercise.difficulty === '简单' ? 'green' :
                      exercise.difficulty === '中等' ? 'orange' : 'red'
                    }>
                      {exercise.difficulty}
                    </Tag>
                  </div>
                }
                key={exercise.id}
              >
                <div className="exercise-answer">
                  <Text strong>题型：</Text> {exercise.type}
                  <br />
                  <Text strong>答案：</Text> {exercise.answer}
                  <br />
                  <Text strong>解析：</Text> {exercise.explanation}
                </div>
              </Panel>
            ))}
          </Collapse>
        </Card>
      )}

      {/* 教学建议 */}
      {detail.teaching_tips && detail.teaching_tips.length > 0 && (
        <Card title="💡 教学建议" className="section-card">
          <ul className="tips-list">
            {detail.teaching_tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};

export default ModuleDetailComponent;
