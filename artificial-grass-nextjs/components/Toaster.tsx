'use client'

import { useEffect, useState } from 'react'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

// Global toast state
let toastListeners: ((toasts: Toast[]) => void)[] = []
let toasts: Toast[] = []

const addToast = (message: string, type: Toast['type'] = 'info') => {
  const id = Date.now().toString()
  const newToast: Toast = { id, message, type }
  toasts = [...toasts, newToast]
  toastListeners.forEach(listener => listener(toasts))
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    removeToast(id)
  }, 5000)
}

const removeToast = (id: string) => {
  toasts = toasts.filter(t => t.id !== id)
  toastListeners.forEach(listener => listener(toasts))
}

// Export global toast function
export const toast = {
  success: (message: string) => addToast(message, 'success'),
  error: (message: string) => addToast(message, 'error'),
  info: (message: string) => addToast(message, 'info'),
}

export const Toaster = () => {
  const [toastList, setToastList] = useState<Toast[]>([])

  useEffect(() => {
    const listener = (newToasts: Toast[]) => setToastList(newToasts)
    toastListeners.push(listener)
    
    return () => {
      toastListeners = toastListeners.filter(l => l !== listener)
    }
  }, [])

  if (toastList.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toastList.map(toast => (
        <div
          key={toast.id}
          className={`notification ${
            toast.type === 'success' 
              ? 'notification-success' 
              : toast.type === 'error' 
              ? 'notification-error' 
              : 'notification-info'
          } min-w-[300px] max-w-md`}
        >
          <div className="flex items-center justify-between gap-4">
            <p className="font-medium">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/80 hover:text-white"
              aria-label="Close notification"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}