import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Book, Code, Box, Zap } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Doc = () => {
  const { t } = useTranslation();

  const exampleCode = `import { compress, decompress } from 'xiv-cac-utils';

// Decompress CAC
const actions = decompress('1v6bZFHTTTbjBFRPJLBFRjBUkHbbbbA');
console.log(actions[0].name_en); // "Reflect"

// Compress actions into CAC
const code = compress({
  type: 'id',
  actions: [100001, 100002]
}); // by id
const code2 = compress({
  type: 'name',
  actions: ['Reflect', 'Basic Synthesis']
}); // by name
const code3 = compress({
  type: 'signature',
  actions: ['waste_not_ii', 'basic_synthesis']
}); // by signature
`;

  return (
    <div className="max-w-4xl mx-auto px-4 pt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-black mb-4">{t('doc.title')}</h1>
        <p className="text-neutral-500 mb-12">{t('doc.tagline')}</p>

        <div className="space-y-12">
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Box size={20} className="text-accent" /> {t('doc.sections.installation')}
            </h2>
            <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
              <pre className="text-sm font-mono text-neutral-300">
                npm install xiv-cac-utils
              </pre>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Code size={20} className="text-accent" /> {t('doc.sections.usage')}
            </h2>
            <div className="space-y-4">
              <p className="text-sm text-neutral-400">{t('doc.sections.usageDesc')}</p>
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
                <SyntaxHighlighter
                  language="typescript"
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    padding: '1rem',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                    backgroundColor: 'transparent',
                  }}
                >
                  {exampleCode}
                </SyntaxHighlighter>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Zap size={20} className="text-accent" /> {t('doc.sections.concepts')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 glass-panel">
                <h3 className="font-bold mb-2">{t('doc.sections.compression.title')}</h3>
                <p className="text-sm text-neutral-500">{t('doc.sections.compression.desc')}</p>
              </div>
              <div className="p-6 glass-panel">
                <h3 className="font-bold mb-2">{t('doc.sections.multiLang.title')}</h3>
                <p className="text-sm text-neutral-500">{t('doc.sections.multiLang.desc')}</p>
              </div>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default Doc;
