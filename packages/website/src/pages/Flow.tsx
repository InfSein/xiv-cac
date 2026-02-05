import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Share2, Copy, FileText, Settings,
  Terminal, Check, ExternalLink, ChevronRight,
  ChevronDown
} from 'lucide-react';
import { DecompressedCraftAction } from 'xiv-cac-utils';
import { useNotification } from '../contexts/NotificationContext';

const getImgCdnUrl = (iconID: number) => {
  const CDN_ICON = 'https://icon.nbbjack.com/';
  const icon = iconID.toString().padStart(6, '0');
  return `${CDN_ICON}${icon.substring(0, 3)}000/${icon}.png`;
};

const SkillIcon = ({ action, lang }: { action: DecompressedCraftAction; lang: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const getLang = () => {
    if (lang === 'zh-CN') return 'zh';
    if (lang === 'zh-TW') return 'tc';
    return lang.split('-')[0];
  }
  const nameKey = `name_${getLang()}` as keyof typeof action;
  const name = action[nameKey] || action.name_en;

  return (
    <div className="relative group">
      <motion.div
        whileHover={{ scale: 1.1, y: -4 }}
        className="w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden border border-neutral-700 bg-neutral-800 transition-colors group-hover:border-accent"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={getImgCdnUrl(action.icon)}
          alt={String(name)}
          className="w-full h-full object-cover"
        />
      </motion.div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10, x: '-50%' }}
            animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, scale: 0.95, y: 10, x: '-50%' }}
            className="absolute bottom-full left-1/2 mb-3 px-3 py-1 pb-1.5 bg-background border border-neutral-700 rounded-lg shadow-2xl z-[100] whitespace-nowrap pointer-events-none"
          >
            <span className="text-xs text-foreground tracking-wide">{String(name)}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Dropdown = ({ value, onChange, options }: {
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[]
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find(o => o.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-neutral-300 hover:border-neutral-700 transition-all focus:outline-none focus:border-accent/50 font-mono"
      >
        <span className="truncate">{selectedOption.label}</span>
        <ChevronDown
          size={16}
          className={`text-neutral-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 4 }}
            className="absolute z-[70] mt-2 w-full bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden py-1.5 font-mono"
          >
            <div className="max-h-60 overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs transition-colors flex items-center justify-between hover:bg-neutral-800 ${value === option.value
                    ? 'text-accent bg-accent/5 font-medium'
                    : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                >
                  {option.label}
                  {value === option.value && <Check size={14} className="shrink-0" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Flow = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState<DecompressedCraftAction[]>([]);
  const [rawCode, setRawCode] = useState('');
  const [activeTab, setActiveTab] = useState<'macro' | 'markdown'>('macro');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { showNotification } = useNotification();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const siteOrigin = window.location.origin;
  const siteUrl = siteOrigin.includes('github.io') ? `${siteOrigin}/xiv-cac/` : siteOrigin;

  // Macro Settings
  type MacroSettings = {
    language: string;
    macrolock: boolean;
    transition: string;
    ending: string;
  };
  const [macroSettings, setMacroSettings] = useState<MacroSettings>(() => {
    const saved = localStorage.getItem('cac_macro_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse macro settings', e);
      }
    }
    return {
      language: 'auto',
      macrolock: false,
      transition: '/e Macro #{index} ends! <se.2>',
      ending: '/e Craft Done! <se.1>'
    };
  });

  useEffect(() => {
    localStorage.setItem('cac_macro_settings', JSON.stringify(macroSettings));
  }, [macroSettings]);

  useEffect(() => {
    const saved = sessionStorage.getItem('current_cac');
    const raw = sessionStorage.getItem('current_cac_raw');
    if (!saved) {
      navigate('/import');
      return;
    }
    setData(JSON.parse(saved));
    setRawCode(raw || '');
  }, [navigate]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    
    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current);
    }
    
    copyTimeoutRef.current = setTimeout(() => {
      setCopiedId(null);
      copyTimeoutRef.current = null;
    }, 2000);
    
    showNotification(t('flow.copySuccess'), 'success');
  };

  const generateMacros = () => {
    const lines: string[] = [];
    const getAutoLang = () => {
      if (i18n.language === 'zh-CN') return 'zh';
      if (i18n.language === 'zh-TW') return 'tc';
      return i18n.language.split('-')[0];
    }
    const langSuffix = macroSettings.language === 'auto'
      ? getAutoLang()
      : macroSettings.language.split('-')[0];

    data.forEach((action) => {
      const nameKey = `name_${langSuffix}` as keyof typeof action;
      const name = action[nameKey] || action.name_en;
      lines.push(`/ac "${name}" <wait.${action.wait_time}>`);
    });

    const macros: string[] = [];
    let currentIndex = 0;

    while (currentIndex < lines.length) {
      const macroLines: string[] = [];
      // 1. Add macrolock if enabled
      if (macroSettings.macrolock) {
        macroLines.push('/macrolock');
      }

      // 2. Calculate remaining slots
      // Max lines = 15. We always reserve 1 line for the footer (transition or ending echo).
      const MAX_LINES = 15;
      const RESERVED_FOOTER_LINES = 1;
      const currentOverhead = macroLines.length + RESERVED_FOOTER_LINES;
      const maxActionsInThisMacro = MAX_LINES - currentOverhead;

      // 3. Take actions
      const remainingActions = lines.length - currentIndex;
      const countToTake = Math.min(maxActionsInThisMacro, remainingActions);
      
      const actionsChunk = lines.slice(currentIndex, currentIndex + countToTake);
      macroLines.push(...actionsChunk);
      currentIndex += countToTake;

      // 4. Add footer
      const isLastMacro = currentIndex >= lines.length;
      const nextMacroIndex = macros.length + 2; // +1 for 0-based to 1-based, +1 for "next"

      if (!isLastMacro) {
        // Transition echo
        // Note: mIdx logic in original was "current chunk index + 1". 
        // Here, if this is macro 1 (index 0), we want to say "Macro 1 ends".
        // Or "Next is Macro 2"? 
        // Original: `macroSettings.transition.replace('#{index}', String(mIdx))`
        // Original mIdx was loop based: floor(i / chunk) + 1. So it was current macro index.
        // Let's stick to current macro index.
        const currentMacroNumber = macros.length + 1;
        macroLines.push(macroSettings.transition.replace('#{index}', String(currentMacroNumber)));
      } else {
        // Ending echo
        macroLines.push(macroSettings.ending);
      }

      macros.push(macroLines.join('\r\n'));
    }

    return macros;
  };
  const macros = generateMacros();

  const generateMarkdown = () => {
    let md = `### My Craft Flow\r\n\r\n`;
    md += `* CAC: ${rawCode}\r\n* SHARE: <${siteUrl}/?s=${rawCode}>\r\n\r\n`;
    macros.forEach((macro, idx) => {
      md += `#### ${t('flow.macroTitle', { index: idx + 1 })}\r\n`;
      md += '```\r\n' + macro + '\r\n```';
      md += `\r\n\r\n`;
    });
    return md;
  };
  const markdown = generateMarkdown();

  if (!data.length) return null;

  const dataSummary = {
    macroActionCount: data.length,
    macroActionTime: data.reduce((acc, action) => acc + action.wait_time, 0)
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Flow Area */}
        <div className="flex-grow">
          <div className="glass-panel p-6 mb-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <ChevronRight size={20} className="text-accent" />
              {t('flow.title')}
              <span className="ml-2 text-sm font-normal text-neutral-500 bg-neutral-800 px-2 py-0.5 rounded">
                {t('flow.actionsCount', { count: dataSummary.macroActionCount, time: dataSummary.macroActionTime })}
              </span>
            </h2>

            <div className="flex flex-wrap gap-3">
              {data.map((action, idx) => (
                <SkillIcon key={idx} action={action} lang={i18n.language} />
              ))}
            </div>
          </div>

          <div className="glass-panel overflow-hidden">
            <div className="flex border-b border-neutral-800 bg-neutral-900/50">
              <button
                onClick={() => setActiveTab('macro')}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${activeTab === 'macro' ? 'bg-background border-t-2 border-accent text-accent' : 'text-neutral-500 hover:text-neutral-300'}`}
              >
                <Terminal size={14} /> {t('flow.tabs.macro')}
              </button>
              <button
                onClick={() => setActiveTab('markdown')}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${activeTab === 'markdown' ? 'bg-background border-t-2 border-accent text-accent' : 'text-neutral-500 hover:text-neutral-300'}`}
              >
                <FileText size={14} /> {t('flow.tabs.markdown')}
              </button>
            </div>

            <div className="p-6 bg-neutral-950/30">
              {activeTab === 'macro' ? (
                (() => {
                  const total = macros.length;
                  let gridCols = 1;
                  if (total === 4) gridCols = 2;
                  else if (total % 3 === 0) gridCols = 3;
                  else if (total % 2 === 0) gridCols = 2;
                  else if (total > 3) gridCols = 3;

                  const gridClass = total > 1 ? {
                    1: 'md:grid-cols-1',
                    2: 'md:grid-cols-2',
                    3: 'md:grid-cols-3'
                  }[gridCols as 1 | 2 | 3] : 'md:grid-cols-1';

                  return (
                    <div className={`grid grid-cols-1 ${gridClass} gap-6`}>
                      {macros.map((macro, idx) => (
                        <div key={idx} className="group">
                          <div className="text-xs text-neutral-500 mb-2 font-mono uppercase tracking-wider">{t('flow.macroTitle', { index: idx + 1 })}</div>
                          <div className="relative bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden">
                            <div className="flex">
                              {/* 行号列 */}
                              <div className="flex-shrink-0 p-2 pl-1 select-none border-r border-neutral-800/50">
                                {macro.split('\n').map((_, lineIdx) => (
                                  <div
                                    key={lineIdx}
                                    className="text-sm leading-relaxed text-neutral-600 text-right"
                                    style={{ minWidth: '1.5rem' }}
                                  >
                                    {lineIdx + 1}
                                  </div>
                                ))}
                              </div>
                              {/* 代码内容列 */}
                              <pre className="flex-1 p-2 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre">
                                {macro}
                              </pre>
                            </div>
                            <div className="absolute top-3 right-3 flex gap-2">
                              <button
                                onClick={() => copyToClipboard(macro, `macro-${idx}`)}
                                className={`flex items-center justify-center p-2 rounded-lg border transition-all backdrop-blur-sm ${copiedId === `macro-${idx}`
                                  ? 'bg-green-500/20 border-green-500/50 text-green-500'
                                  : 'bg-accent/10 border-accent/30 text-accent hover:bg-accent/30 hover:border-accent/50 hover:scale-105'
                                  }`}
                              >
                                {copiedId === `macro-${idx}` ? <Check size={14} /> : <Copy size={14} />}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()
              ) : (
                <div className="relative group">
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => copyToClipboard(markdown, 'markdown')}
                      className={`flex items-center justify-center p-2 rounded-lg border transition-all backdrop-blur-sm ${copiedId === 'markdown'
                        ? 'bg-green-500/20 border-green-500/50 text-green-500'
                        : 'bg-accent/10 border-accent/30 text-accent hover:bg-accent/30 hover:border-accent/50 hover:scale-105'
                        }`}
                    >
                      {copiedId === 'markdown' ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                  <pre className="p-4 bg-neutral-900 rounded-lg border border-neutral-800 font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                    {markdown}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="lg:w-80 shrink-0">
          <div className="glass-panel p-6 sticky top-24 space-y-6">
            
            {/* Share Section */}
            <div>
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Share2 size={14} /> {t('flow.share')}
              </h3>
              
              <div className="space-y-4">
                {/* Share Code */}
                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-1.5">{t('flow.shareCode')}</label>
                  <div className="relative">
                    <input
                      readOnly
                      value={rawCode}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-4 pr-12 py-2.5 text-xs text-neutral-400 focus:outline-none focus:border-accent/50 transition-colors font-mono"
                    />
                    <button
                      onClick={() => copyToClipboard(rawCode, 'rawCode')}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors ${copiedId === 'rawCode'
                        ? 'text-green-500 bg-green-500/10'
                        : 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800'
                        }`}
                    >
                      {copiedId === 'rawCode' ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>

                {/* Share Link */}
                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-1.5">{t('flow.shareLink')}</label>
                  <div className="relative">
                    <input
                      readOnly
                      value={`${siteUrl}/?s=${rawCode}`}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-4 pr-12 py-2.5 text-xs text-neutral-400 focus:outline-none focus:border-accent/50 transition-colors font-mono"
                    />
                    <button
                      onClick={() => copyToClipboard(`${siteUrl}/?s=${rawCode}`, 'share')}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors ${copiedId === 'share'
                        ? 'text-green-500 bg-green-500/10'
                        : 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800'
                        }`}
                    >
                      {copiedId === 'share' ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Section */}
            <div className="pt-6 border-t border-neutral-800">
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Settings size={14} /> {t('flow.macroSettings')}
              </h3>
              <div className="space-y-3">
                {/* 1. Macro Language */}
                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-1.5">{t('flow.settings.gameLang')}</label>
                  <Dropdown
                    value={macroSettings.language}
                    onChange={(val) => setMacroSettings({ ...macroSettings, language: val })}
                    options={[
                      { value: 'auto', label: t('flow.settings.auto') },
                      { value: 'zh', label: '简体中文 (CN)' },
                      { value: 'tc', label: '繁體中文 (TW)' },
                      { value: 'en', label: 'English (EN)' },
                      { value: 'ja', label: '日本語 (JP)' },
                      { value: 'ko', label: '한국어 (KR)' },
                      { value: 'fr', label: 'Français (FR)' },
                      { value: 'de', label: 'Deutsch (DE)' },
                    ]}
                  />
                </div>

                {/* 2. Transition Echo */}
                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-1.5">{t('flow.settings.transition')}</label>
                  <input
                    value={macroSettings.transition}
                    onChange={(e) => setMacroSettings({ ...macroSettings, transition: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-neutral-300 focus:outline-none focus:border-accent/50 transition-colors font-mono"
                  />
                </div>

                {/* 3. Ending Echo */}
                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-1.5">{t('flow.settings.ending')}</label>
                  <input
                    value={macroSettings.ending}
                    onChange={(e) => setMacroSettings({ ...macroSettings, ending: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-neutral-300 focus:outline-none focus:border-accent/50 transition-colors font-mono"
                  />
                </div>

                {/* 4. Macrolock */}
                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-1.5">{t('flow.settings.macrolock')}</label>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/30 border border-neutral-800 group hover:border-neutral-700 transition-colors mt-1">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={macroSettings.macrolock}
                        onChange={(e) => setMacroSettings({ ...macroSettings, macrolock: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent" />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Section */}
            <div className="pt-6 border-t border-neutral-800">
              <button
                className="w-full justify-center text-xs py-3 px-4 rounded-lg border border-neutral-700 bg-neutral-900 text-neutral-300 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-500 transition-all flex items-center gap-2 font-medium"
                onClick={() => setShowResetConfirm(true)}
              >
                {t('flow.newImport')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showResetConfirm && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowResetConfirm(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl"
            >
              <h3 className="text-lg font-bold text-neutral-200 mb-2">{t('flow.newImport')}</h3>
              <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
                {t('flow.newImportConfirm')}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl text-xs font-medium bg-neutral-800 text-neutral-300 hover:bg-neutral-700 transition-colors"
                >
                  {t('flow.cancel')}
                </button>
                <button
                  onClick={() => navigate('/import')}
                  className="flex-1 px-4 py-2.5 rounded-xl text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 transition-colors"
                >
                  {t('flow.confirm')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Flow;
