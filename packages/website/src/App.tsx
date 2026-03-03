import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Home as HomeIcon, LanguagesIcon, Menu, X, ChevronDown, Book, Sun, Moon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { decompress } from 'xiv-cac-utils';
import Home from './pages/Home';
import Import from './pages/Import';
import Flow from './pages/Flow';
import Doc from './pages/Doc';
import { Tooltip } from './components/Tooltip';
import { useTheme } from './contexts/ThemeContext';
import { NotificationProvider, useNotification } from './contexts/NotificationContext';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    };

    if (langMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [langMenuOpen]);

  const languages = [
    { code: 'zh-CN', name: '简体中文' },
    { code: 'zh-TW', name: '繁體中文' },
    { code: 'en', name: 'English' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[2];

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel !rounded-none border-t-0 border-x-0 bg-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
                C
              </div>
              <span className="text-xl font-bold tracking-tight">{t('common.logo')}</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Tooltip content={t('nav.doc')}>
              <Link to="/doc" className="text-neutral-400 hover:text-foreground transition-colors">
                <Book size={20} />
              </Link>
            </Tooltip>
            <Tooltip content="GitHub">
              <a href="https://github.com/InfSein/xiv-cac" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-foreground transition-colors">
                <Github size={20} />
              </a>
            </Tooltip>

            <div className="w-px h-6 bg-neutral-700"></div>

            <Tooltip content={theme === 'dark' ? t('nav.theme.light') : t('nav.theme.dark')}>
              <button
                onClick={toggleTheme}
                className="text-neutral-400 hover:text-foreground transition-colors"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </Tooltip>

            <div className="relative" ref={langMenuRef}>
              <Tooltip content={currentLang.name}>
                <button 
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center gap-0.5 text-neutral-400 hover:text-foreground transition-colors"
                >
                  <LanguagesIcon size={20} />
                  <ChevronDown size={12} strokeWidth={3} />
                </button>
              </Tooltip>
              
              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-40 bg-background border border-neutral-700 rounded-xl overflow-hidden shadow-xl z-50"
                  >
                    {languages.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          i18n.changeLanguage(lang.code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-neutral-800 transition-colors ${i18n.language === lang.code ? 'text-accent' : 'text-foreground'}`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-neutral-400 hover:text-foreground">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-neutral-800 bg-background overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="px-3 py-4 text-base font-medium hover:bg-neutral-800 rounded-lg flex items-center justify-between"
              >
                {t('nav.home')}
                <HomeIcon size={16} className="text-neutral-500" />
              </Link>
              <Link
                to="/doc"
                onClick={() => setIsOpen(false)}
                className="px-3 py-4 text-base font-medium hover:bg-neutral-800 rounded-lg flex items-center justify-between"
              >
                {t('nav.doc')}
                <Book size={16} className="text-neutral-500" />
              </Link>
              <a 
                href="https://github.com/InfSein/xiv-cac" 
                target="_blank" 
                rel="noreferrer" 
                className="px-3 py-4 text-base font-medium hover:bg-neutral-800 rounded-lg flex items-center justify-between"
              >
                GitHub
                <Github size={16} className="text-neutral-500" />
              </a>

              {/* Theme Toggle */}
              <button
                onClick={() => {
                  toggleTheme();
                  setIsOpen(false);
                }}
                className="px-3 py-4 text-base font-medium hover:bg-neutral-800 rounded-lg flex items-center justify-between w-full"
              >
                {theme === 'dark' ? t('nav.theme.light') : t('nav.theme.dark')}
                {theme === 'dark' ? <Sun size={16} className="text-neutral-500" /> : <Moon size={16} className="text-neutral-500" />}
              </button>

              <div className="pt-4 mt-2 border-t border-neutral-800">
                <div className="px-3 mb-3 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  Language
                </div>
                <div className="grid grid-cols-2 gap-2 px-3">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        i18n.changeLanguage(lang.code);
                        setIsOpen(false);
                      }}
                      className={`text-sm py-2 px-3 rounded-lg border transition-colors ${
                        i18n.language === lang.code 
                          ? 'border-accent bg-accent/10 text-accent' 
                          : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const GlobalSearchParamHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { showNotification } = useNotification();
  const lastProcessedCode = useRef<string | null>(null);

  useEffect(() => {
    const s = searchParams.get('s');
    if (s && s !== lastProcessedCode.current) {
      lastProcessedCode.current = s;
      try {
        const data = decompress(s);
        sessionStorage.setItem('current_cac', JSON.stringify(data));
        sessionStorage.setItem('current_cac_raw', s);
        navigate('/flow', { replace: true });
      } catch (err) {
        console.error('Failed to parse share code from URL:', err);
        showNotification(t('import.error_cac'), 'error');
        // 清除错误的参数，避免重复提示
        navigate('/', { replace: true });
      }
    }
  }, [searchParams, navigate, showNotification, t]);

  return null;
};

const getBasename = () => {
  // 兼容 GitHub Pages 子路径
  // 如果路径以 /xiv-cac 开头，则使用该路径作为 basename
  return window.location.pathname.startsWith('/xiv-cac') ? '/xiv-cac' : '/';
};

function App() {
  const { t } = useTranslation();
  return (
    <NotificationProvider>
      <Router basename={getBasename()}>
        <GlobalSearchParamHandler />
        <div className="min-h-screen pt-16 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/import" element={<Import />} />
              <Route path="/flow" element={<Flow />} />
              <Route path="/doc" element={<Doc />} />
            </Routes>
          </main>
          <footer className="py-12 border-t border-neutral-800 mt-20">
            <div className="max-w-7xl mx-auto px-4 text-center text-neutral-500 text-sm">
              <p>© 2026 CAC Standardization Project. {t('common.footer.rights')}</p>
              <p className="mt-2">{t('common.footer.copy')}</p>
            </div>
          </footer>
        </div>
      </Router>
    </NotificationProvider>
  );
}

export default App;
