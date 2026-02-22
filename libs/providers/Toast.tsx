import { Toast } from '@/components/ui/Toasts/Toast';
import React, { useState, useCallback, createContext, ReactNode, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export interface ToastType extends ToastOptions {
  id: string;
}

export interface ToastFunction {
  (options: string | ToastOptions): string;
  success: (title: string, description?: string) => string;
  error: (title: string, description?: string) => string;
  warning: (title: string, description?: string) => string;
  info: (title: string, description?: string) => string;
}

export interface ToastContextType {
  toast: ToastFunction;
  removeToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const timersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const removeToast = useCallback((id: string) => {
    // Clear the timer if it exists
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
    
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const addToast = useCallback((toast: ToastOptions): string => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastType = { id, ...toast };
    
    setToasts(prev => {
      // Check if a toast with the same title already exists to prevent duplicates
      const exists = prev.some(existingToast => 
        existingToast.title === toast.title && 
        existingToast.description === toast.description
      );
      
      if (exists) {
        return prev;
      }
      
      return [...prev, newToast];
    });

    // Auto remove after duration
    const duration = toast.duration || 5000;
    const timer = setTimeout(() => {
      removeToast(id);
    }, duration);
    
    timersRef.current.set(id, timer);

    return id;
  }, [removeToast]);

  const toast = useCallback((options: string | ToastOptions): string => {
    if (typeof options === 'string') {
      return addToast({ title: options, variant: 'default' });
    }
    return addToast(options);
  }, [addToast]) as ToastFunction;

  // Add variant methods
  toast.success = useCallback((title: string, description?: string): string =>
    addToast({ title, description, variant: 'success' }), [addToast]);
    
  toast.error = useCallback((title: string, description?: string): string =>
    addToast({ title, description, variant: 'error' }), [addToast]);
    
  toast.warning = useCallback((title: string, description?: string): string =>
    addToast({ title, description, variant: 'warning' }), [addToast]);
    
  toast.info = useCallback((title: string, description?: string): string =>
    addToast({ title, description, variant: 'info' }), [addToast]);

  // Create toast container portal
  const toastContainer = (
    <div className="fixed top-4 right-4 left-4 sm:left-auto z-50 space-y-4 pointer-events-none">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      
      {/* Render toasts using portal if mounted */}
      {isMounted && createPortal(toastContainer, document.body)}
      
      <style jsx global>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </ToastContext.Provider>
  );
};