import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CACPreview } from '../components/CACPreview';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden pt-20 pb-32">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-8">
            <Sparkles size={14} />
            <span>{t('home.badge')}</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6 title-gradient">
            {t('home.title')}
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-400 mb-12 leading-relaxed">
            {t('home.tagline')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/import')}
              className="btn-primary text-lg px-8 py-4 group"
            >
              {t('home.tryNow')}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="https://github.com/InfSein/xiv-cac"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary text-lg px-8 py-4"
            >
              {t('nav.github')}
            </a>
          </div>
        </motion.div>

        {/* Feature Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-24 max-w-5xl mx-auto glass-panel p-8 min-h-[400px] flex items-center justify-center bg-neutral-900/10"
        >
          <CACPreview />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
