/**
 * 语言切换组件
 * 显示在页面右上角的语言切换器
 */
import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import './LanguageSwitcher.css';

interface LanguageSwitcherProps {
  onLocaleChange?: (locale: typeof zhCN | typeof enUS) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ onLocaleChange }) => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  useEffect(() => {
    // 初始化时设置 Ant Design 语言
    const locale = currentLang === 'zh' ? zhCN : enUS;
    onLocaleChange?.(locale);
  }, []);

  const toggleLanguage = () => {
    const newLang = currentLang === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(newLang);
    setCurrentLang(newLang);
    localStorage.setItem('language', newLang);

    // 更新 Ant Design 语言
    const locale = newLang === 'zh' ? zhCN : enUS;
    onLocaleChange?.(locale);
  };

  return (
    <Button
      type="text"
      icon={<GlobalOutlined />}
      onClick={toggleLanguage}
      className="language-switcher"
    >
      {currentLang === 'zh' ? 'English' : '中文'}
    </Button>
  );
};

export default LanguageSwitcher;
