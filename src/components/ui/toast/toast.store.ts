"use client";

import { create } from "zustand";

export type ToastType = "success" | "info" | "warning";

export type ToastAction = {
  label: string;
  href?: string;
  onClick?: () => void;
};

export type Toast = {
  id: string;
  title: string;
  message?: string;
  type?: ToastType;
  image?: string;
  action?: ToastAction;
  duration?: number;
};

type ToastStore = {
  toasts: Toast[];
  show: (toast: Omit<Toast, "id">) => string;
  dismiss: (id: string) => void;
  clear: () => void;
};

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],

  show: (toast) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newToast: Toast = { ...toast, id };

    set((state) => ({
      // Keep only up to 3 active toasts at once to keep screen clean
      toasts: [...state.toasts.slice(-2), newToast],
    }));

    const duration = toast.duration ?? 4000;
    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, duration);
    }

    return id;
  },

  dismiss: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),

  clear: () => set({ toasts: [] }),
}));

import { playSound } from "@/lib/audio/sound-effects";

export function showToast(toast: Omit<Toast, "id">) {
  if (toast.type === "success") {
    playSound("success");
  } else {
    playSound("click");
  }
  return useToastStore.getState().show(toast);
}
