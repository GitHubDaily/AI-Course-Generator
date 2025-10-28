/**
 * 文本输入组件
 * 用于输入课本内容和配置参数
 */

import { useState } from 'react';
import { Input, Button, Form, InputNumber, Space, Card } from 'antd';
import type { GenerateOutlineRequest } from '../types/course';
import './TextInput.css';

const { TextArea } = Input;

interface TextInputProps {
  onGenerate: (params: GenerateOutlineRequest) => void;
  loading: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ onGenerate, loading }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    const params: GenerateOutlineRequest = {
      textbook_content: values.textbook_content,
      grade_level: values.grade_level,
      subject: values.subject,
      module_count: values.module_count || 4,
    };
    onGenerate(params);
  };

  const loadSampleText = () => {
    const sampleText = `第1课 春天来了

春天来了，春天来了！
小草从地下探出头来，那是春天的眉毛吧？
早开的野花一朵两朵，那是春天的眼睛吧？
树木吐出点点嫩芽，那是春天的音符吧？
解冻的小溪丁丁冬冬，那是春天的琴声吧？

春天来了，我们看到了她，我们听到了她，我们闻到了她，我们触到了她。
她在柳枝上荡秋千，在风筝尾巴上摇啊摇；
她在喜鹊、杜鹃嘴里叫，在桃花、杏花枝头笑……`;

    form.setFieldsValue({
      textbook_content: sampleText,
      grade_level: '三年级',
      subject: '语文',
      module_count: 3,
    });
  };

  return (
    <div className="text-input-container">
      <Card title="AI 课程生成系统" className="input-card">
        <p className="subtitle">从课本到课程，只需一分钟</p>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ module_count: 4 }}
        >
          <Form.Item
            label="课本文本内容"
            name="textbook_content"
            rules={[{ required: true, message: '请输入课本内容' }]}
          >
            <TextArea
              rows={12}
              placeholder="请输入课本文本内容..."
              className="text-area"
            />
          </Form.Item>

          <Space direction="horizontal" size="middle" style={{ width: '100%' }}>
            <Form.Item label="年级" name="grade_level" style={{ marginBottom: 0 }}>
              <Input placeholder="如：三年级" style={{ width: 150 }} />
            </Form.Item>

            <Form.Item label="学科" name="subject" style={{ marginBottom: 0 }}>
              <Input placeholder="如：语文" style={{ width: 150 }} />
            </Form.Item>

            <Form.Item label="模块数量" name="module_count" style={{ marginBottom: 0 }}>
              <InputNumber min={2} max={6} style={{ width: 120 }} />
            </Form.Item>
          </Space>

          <Form.Item style={{ marginTop: 24 }}>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
              >
                生成课程大纲
              </Button>
              <Button onClick={loadSampleText} size="large">
                加载示例文本
              </Button>
            </Space>
          </Form.Item>
        </Form>

        <div className="feature-list">
          <span>✓ 快速生成</span>
          <span>✓ 结构清晰</span>
          <span>✓ 智能分析</span>
        </div>
      </Card>
    </div>
  );
};

export default TextInput;
