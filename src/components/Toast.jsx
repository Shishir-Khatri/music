import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export function useToast() {
    return useContext(ToastContext);
}

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = 'info') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.map(t => t.id === id ? { ...t, removing: true } : t));
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id));
            }, 300);
        }, 3000);
    }, []);

    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };

    return (
        <ToastContext.Provider value={showToast}>
            {children}
            <div className="toast-container" id="toastContainer">
                {toasts.map(toast => (
                    <div key={toast.id} className={`toast ${toast.type}${toast.removing ? ' removing' : ''}`}>
                        <i className={`fas ${icons[toast.type] || icons.info}`}></i> {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}
