import React from 'react';
import { useLanguage } from '@/i18n/LanguageProvider';

interface LanguageToggleProps {
  className?: string;
  variant?: 'light' | 'dark';
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ className = '', variant = 'light' }) => {
  const { language, setLanguage } = useLanguage();

  const base =
    'font-inter text-xs tracking-wide px-3 py-1.5 transition-colors duration-200 active:scale-95 touch-manipulation';
  const activeCls = variant === 'dark' ? 'bg-background text-foreground' : 'bg-primary text-primary-foreground';
  const idleCls =
    variant === 'dark'
      ? 'text-background/70 hover:text-background'
      : 'text-muted-foreground hover:text-primary';

  return (
    <div
      className={`inline-flex items-center border ${
        variant === 'dark' ? 'border-background/40' : 'border-border'
      } ${className}`}
      role="group"
      aria-label="Language / 语言"
    >
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        aria-label="Switch to English"
        className={`${base} ${language === 'en' ? activeCls : idleCls}`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage('zh')}
        aria-pressed={language === 'zh'}
        aria-label="切换为简体中文"
        className={`${base} ${language === 'zh' ? activeCls : idleCls}`}
      >
        中文
      </button>
    </div>
  );
};

export default LanguageToggle;
