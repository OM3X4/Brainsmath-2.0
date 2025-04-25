import { create } from "zustand";

interface NotificationType {
    message: string;
    type: "success" | "error";
}

interface NotificationState {
    notifications: NotificationType[];
    addNotification: (notification: NotificationType) => void;
    removeNotification: (index: number) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
    notifications: [],
    addNotification: (notification) => set((state) => ({ notifications: [...state.notifications, notification] })),
    removeNotification: (index) => set((state) => ({ notifications: state.notifications.filter((_, i) => i !== index) })),
}))