import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'info';

interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}

interface NotificationContextType {
  showNotification: (message: string, type: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback((message: string, type: NotificationType) => {
    const id = Math.random().toString(36);
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  }, []);

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-3 w-full max-w-md px-4 pointer-events-none">
        <AnimatePresence>
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0.01, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className={`pointer-events-auto flex items-center gap-3 p-4 rounded-2xl border shadow-2xl backdrop-blur-lg ${
                n.type === 'error' 
                  ? 'bg-red-500/5 border-red-500/10 text-red-600 dark:text-red-400' 
                  : n.type === 'success'
                  ? 'bg-green-500/5 border-green-500/10 text-green-600 dark:text-green-400'
                  : 'bg-background/60 border-neutral-700 text-foreground'
              }`}
            >
              <div className="flex-shrink-0">
                {n.type === 'error' && <AlertCircle size={20} className="text-red-600 dark:text-red-400" />}
                {n.type === 'success' && <CheckCircle size={20} className="text-green-600 dark:text-green-400" />}
                {n.type === 'info' && <Info size={20} className="text-blue-600 dark:text-blue-400" />}
              </div>
              <p className="flex-grow text-sm font-medium">{n.message}</p>
              <button 
                onClick={() => removeNotification(n.id)}
                className="flex-shrink-0 p-1 hover:bg-foreground/5 rounded-lg transition-colors"
              >
                <X size={16} className="opacity-50 hover:opacity-100" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};
