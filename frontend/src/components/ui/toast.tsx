"use client"

import { useEffect, useState } from "react"
import { X, CheckCircle, XCircle, AlertCircle } from "lucide-react"

export type ToastType = "success" | "error" | "info"

export interface Toast {
    id: string
    message: string
    type: ToastType
    duration?: number
}

interface ToastProps {
    toast: Toast
    onClose: (id: string) => void
}

function ToastItem({ toast, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(toast.id)
        }, toast.duration || 4000)

        return () => clearTimeout(timer)
    }, [toast, onClose])

    const icons = {
        success: <CheckCircle className="w-4 h-4" />,
        error: <XCircle className="w-4 h-4" />,
        info: <AlertCircle className="w-4 h-4" />
    }

    const colors = {
        success: "bg-green-950/90 border-green-500 text-green-100",
        error: "bg-red-950/90 border-red-500 text-red-100",
        info: "bg-blue-950/90 border-blue-500 text-blue-100"
    }

    return (
        <div className={`${colors[toast.type]} border px-4 py-3 rounded-sm shadow-lg backdrop-blur-sm flex items-start gap-3 min-w-[300px] max-w-[500px] animate-in slide-in-from-right duration-300 font-mono`}>
            <div className="mt-0.5">{icons[toast.type]}</div>
            <div className="flex-1 text-xs leading-relaxed">{toast.message}</div>
            <button
                onClick={() => onClose(toast.id)}
                className="text-current opacity-60 hover:opacity-100 transition-opacity"
            >
                <X className="w-3 h-3" />
            </button>
        </div>
    )
}

interface ToastContainerProps {
    toasts: Toast[]
    onClose: (id: string) => void
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
    return (
        <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
            {toasts.map(toast => (
                <ToastItem key={toast.id} toast={toast} onClose={onClose} />
            ))}
        </div>
    )
}

// Hook for managing toasts
export function useToast() {
    const [toasts, setToasts] = useState<Toast[]>([])

    const showToast = (message: string, type: ToastType = "info", duration?: number) => {
        const id = Math.random().toString(36).substr(2, 9)
        setToasts(prev => [...prev, { id, message, type, duration }])
    }

    const closeToast = (id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }

    return { toasts, showToast, closeToast }
}
