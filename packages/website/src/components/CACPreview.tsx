import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { compress, getActionInfo, DecompressedCraftAction } from 'xiv-cac-utils';
import { Terminal, Cpu, ArrowRight } from 'lucide-react';

const PREVIEW_ACTIONS = [
  { id: 100387 }, // 闲静
  { id: 4574 },   // 掌握
  { id: 19297 },  // 崇敬
  { id: 100403 }, // 坯料制作
  { id: 100339 }, // 比尔格的祝福
  { id: 100203 }  // 模范制作
];

const getImgCdnUrl = (id: number) => {
  // 简化的 CDN 映射，实际逻辑可参考 Flow.tsx
  // 这里直接使用一些常见的生产技能图标 ID
  const iconMap: Record<number, number> = {
    100387: 1982,
    4574: 1985,
    19297: 1995,
    100403: 1518,
    100339: 1975,
    100203: 1986
  };
  const iconID = iconMap[id] || 1501;
  const icon = iconID.toString().padStart(6, '0');
  return `https://icon.nbbjack.com/${icon.substring(0, 3)}000/${icon}.png`;
};

export const CACPreview = () => {
  const { t, i18n } = useTranslation();
  const [step, setStep] = useState(0);
  const [cacCode, setCacCode] = useState('');

  const actionsWithInfo = useMemo(() => {
    // 映射 i18n 语言代码到 utils 支持的格式
    const lang = i18n.language === 'zh-CN' ? 'zh' 
               : i18n.language === 'zh-TW' ? 'tc' 
               : i18n.language.split('-')[0];
    
    return PREVIEW_ACTIONS.map(a => {
      const info = getActionInfo(a.id);
      const nameKey = `name_${lang}` as keyof DecompressedCraftAction;
      return {
        ...a,
        name: (info ? info[nameKey] : 'Unknown') as string
      };
    });
  }, [i18n.language]);
  
  // 动态生成当前步骤对应的真实 CAC 码
  useEffect(() => {
    if (step === 0) {
      setCacCode('');
    } else {
      const currentActions = PREVIEW_ACTIONS.slice(0, step).map(a => a.id);
      try {
        const code = compress({
          type: 'id',
          actions: currentActions
        });
        setCacCode(code);
      } catch (err) {
        console.error('Failed to generate preview code:', err);
      }
    }
  }, [step]);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(s => (s + 1) % (PREVIEW_ACTIONS.length + 1));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex flex-col md:flex-row items-center gap-8 px-4">
      {/* Left: Actions List */}
      <div className="w-full md:w-64 space-y-3 shrink-0">
        <div className="flex items-center gap-2 mb-6">
          <Cpu size={18} className="text-accent" />
          <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-500">
            {t('home.preview.actions')}
          </h3>
        </div>
        
        <div className="space-y-2">
          {actionsWithInfo.map((action, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: step > idx ? 1 : 0.3,
                x: step > idx ? 0 : -10,
                scale: step === idx + 1 ? 1.05 : 1
              }}
              className={`flex items-center gap-4 p-3 rounded-xl border transition-all ${
                step === idx + 1 
                ? 'bg-accent/10 border-accent/20 shadow-[0_0_15px_rgba(var(--accent-rgb),0.1)] mb-1' 
                : 'bg-neutral-900/30 border-neutral-800'
              }`}
            >
              <div className="w-9 h-9 rounded-lg overflow-hidden border border-neutral-700 bg-neutral-800 shrink-0">
                <img src={getImgCdnUrl(action.id)} alt={action.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow text-left">
                <div className="text-xs font-semibold text-neutral-200">
                   {action.name}
                </div>
              </div>
              {step === idx + 1 && (
                <motion.div 
                  layoutId="cursor"
                  className="w-1 h-1 rounded-full bg-accent" 
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Middle: Arrow */}
      <div className="hidden md:flex flex-col items-center gap-2 text-neutral-700">
        <div className="h-12 w-px bg-gradient-to-b from-transparent via-neutral-800 to-neutral-800" />
        <ArrowRight size={24} />
        <div className="h-12 w-px bg-gradient-to-t from-transparent via-neutral-800 to-neutral-800" />
      </div>

      {/* Right: Compressed Code */}
      <div className="flex-1 w-full">
        <div className="flex items-center gap-2 mb-6">
          <Terminal size={18} className="text-accent" />
          <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-500">
             {t('home.preview.output')}
          </h3>
        </div>

        <div className="glass-panel p-6 bg-black/40 border-neutral-800 min-h-[240px] flex flex-col justify-between">
          <div className="font-mono text-sm leading-relaxed break-all relative">
            <span className="text-accent mr-2">CAC$</span>
            <span className="text-neutral-300">
               {cacCode}
            </span>
            <motion.span 
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2 h-4 bg-accent ml-1 align-middle"
            />
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-800/50 space-y-4">
             <div className="flex justify-between text-[10px] font-mono uppercase tracking-wider text-neutral-600">
                <span>Compression Status</span>
                <span className="text-accent">{step === PREVIEW_ACTIONS.length ? 'Completed' : 'Processing...'}</span>
             </div>
             <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-accent"
                  animate={{ width: `${(step / PREVIEW_ACTIONS.length) * 100}%` }}
                />
             </div>
             <div className="flex justify-between items-end">
                <div className="text-3xl font-black text-neutral-800 select-none">CAC</div>
                <div className="text-[10px] text-neutral-500 text-right italic">
                   "Tiny code, full recipe."
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
