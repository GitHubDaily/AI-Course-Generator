/**
 * 文本输入组件
 * 用于输入课本内容和配置参数
 */

import { Input, Button, Form, InputNumber, Space, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import type { GenerateOutlineRequest } from '../types/course';
import './TextInput.css';

const { TextArea } = Input;

interface TextInputProps {
  onGenerate: (params: GenerateOutlineRequest) => void;
  loading: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ onGenerate, loading }) => {
  const { t, i18n } = useTranslation();
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
    const isEnglish = i18n.language === 'en';

    const sampleTextChinese = `第1课 春天来了

春天来了，春天来了！
小草从地下探出头来，那是春天的眉毛吧？
早开的野花一朵两朵，那是春天的眼睛吧？
树木吐出点点嫩芽，那是春天的音符吧？
解冻的小溪丁丁冬冬，那是春天的琴声吧？

春天来了，我们看到了她，我们听到了她，我们闻到了她，我们触到了她。
她在柳枝上荡秋千，在风筝尾巴上摇啊摇；
她在喜鹊、杜鹃嘴里叫，在桃花、杏花枝头笑……`;

    const sampleTextEnglish = `Lesson 1: The Water Cycle

Water is essential for all life on Earth. It moves through a continuous cycle called the water cycle.

The water cycle has four main stages:

1. Evaporation: The sun heats water in rivers, lakes, and oceans. The water turns into vapor and rises into the air.

2. Condensation: As water vapor rises, it cools and turns back into tiny water droplets, forming clouds.

3. Precipitation: When clouds become heavy with water, the droplets fall back to Earth as rain, snow, sleet, or hail.

4. Collection: Water collects in rivers, lakes, and oceans, and the cycle begins again.

This process repeats continuously, ensuring that water is constantly recycled through our environment. Understanding the water cycle helps us appreciate how important it is to conserve and protect our water resources.`;

    const sampleText = isEnglish ? sampleTextEnglish : sampleTextChinese;
    const gradeLevel = isEnglish ? 'Grade 4' : '三年级';
    const subject = isEnglish ? 'Science' : '语文';

    form.setFieldsValue({
      textbook_content: sampleText,
      grade_level: gradeLevel,
      subject: subject,
      module_count: 3,
    });
  };

  return (
    <div className="text-input-container">
      <Card title={t('appTitle')} className="input-card">
        <p className="subtitle">{t('appSubtitle')}</p>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ module_count: 4 }}
        >
          <Form.Item
            label={t('textbookContent')}
            name="textbook_content"
            rules={[{ required: true, message: t('textbookRequired') }]}
          >
            <TextArea
              rows={12}
              placeholder={t('textbookPlaceholder')}
              className="text-area"
            />
          </Form.Item>

          <Space direction="horizontal" size="middle" style={{ width: '100%' }}>
            <Form.Item label={t('gradeLevel')} name="grade_level" style={{ marginBottom: 0 }}>
              <Input placeholder={t('gradePlaceholder')} style={{ width: 150 }} />
            </Form.Item>

            <Form.Item label={t('subject')} name="subject" style={{ marginBottom: 0 }}>
              <Input placeholder={t('subjectPlaceholder')} style={{ width: 150 }} />
            </Form.Item>

            <Form.Item label={t('moduleCount')} name="module_count" style={{ marginBottom: 0 }}>
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
                {t('generateOutline')}
              </Button>
              <Button onClick={loadSampleText} size="large">
                {t('loadSample')}
              </Button>
            </Space>
          </Form.Item>
        </Form>

        <div className="feature-list">
          <span>✓ {t('featureFast')}</span>
          <span>✓ {t('featureStructured')}</span>
          <span>✓ {t('featureSmart')}</span>
        </div>
      </Card>
    </div>
  );
};

export default TextInput;
