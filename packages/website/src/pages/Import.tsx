import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Search, Loader2, AlertCircle } from 'lucide-react';
import { compress, decompress } from 'xiv-cac-utils';

type ImportMode = 'cac' | 'macro';

const Import = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [importMode, setImportMode] = useState<ImportMode>('cac');


  const handleImportCac = (code: string) => {
    if (!code.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const data = decompress(code);
      if (data.length === 0) throw new Error('Empty data');
      sessionStorage.setItem('current_cac', JSON.stringify(data));
      sessionStorage.setItem('current_cac_raw', code);
      navigate('/flow');
    } catch (err) {
      setError(t('import.error_cac'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImportMacro = (macro: string) => {
    if (!macro.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const actions: string[] = [];
      macro.split('\n').forEach(line => {
        const match = line.match(/\/(ac|action|技能)\s(?:"(.*?)"|(\S+))(?:\s?<wait\.\d+>)?/);
        const action = match?.[2] || match?.[3];
        if (action) actions.push(action);
      });

      if (actions.length === 0) throw new Error('No actions found');

      const code = compress({
        type: 'name',
        actions: actions
      });
      
      const data = decompress(code);
      if (data.length === 0) throw new Error('Empty data');
      sessionStorage.setItem('current_cac', JSON.stringify(data));
      sessionStorage.setItem('current_cac_raw', code);
      navigate('/flow');
    } catch (err) {
      setError(t('import.error_macro'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImport = () => {
    if (importMode === 'cac') {
      handleImportCac(input);
    } else {
      handleImportMacro(input);
    }
  };

  const handleModeChange = (mode: ImportMode) => {
    setImportMode(mode);
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-8 md:p-12 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Search size={120} className="text-accent" />
        </div>

        <h2 className="text-3xl font-bold mb-8">{t('import.title')}</h2>

        <div className="space-y-2">
          <div className="flex items-center gap-1 p-1 bg-neutral-900 rounded-xl border border-neutral-800 w-fit">
            <button
              onClick={() => handleModeChange('cac')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                importMode === 'cac'
                  ? 'bg-accent text-white shadow-lg'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
              }`}
            >
              {t('import.mode.cac')}
            </button>
            <button
              onClick={() => handleModeChange('macro')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                importMode === 'macro'
                  ? 'bg-accent text-white shadow-lg'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
              }`}
            >
              {t('import.mode.macro')}
            </button>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={importMode === 'cac' ? t('import.placeholder_cac') : t('import.placeholder_macro')}
            className="w-full h-48 bg-neutral-900 border border-neutral-700 rounded-xl p-4 text-foreground placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-mono"
          />

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 p-4 rounded-lg text-sm"
            >
              <AlertCircle size={16} />
              {error}
            </motion.div>
          )}

          <button
            onClick={handleImport}
            disabled={isLoading || !input.trim()}
            className="btn-primary w-full justify-center h-14 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : t('import.submit')}
          </button>
        </div>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: '📦', key: 'compressed' },
          { icon: '🌐', key: 'global' },
          { icon: '📝', key: 'macroReady' }
        ].map((item, i) => (
          <div key={i} className="glass-panel p-6 bg-neutral-900/20">
            <div className="text-2xl mb-2">{item.icon}</div>
            <h3 className="font-bold text-neutral-200 mb-1">{t(`import.features.${item.key}.title`)}</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">{t(`import.features.${item.key}.desc`)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Import;
