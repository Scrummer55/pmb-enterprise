export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  timestamp: Date;
  read: boolean;
}

class NotificationManager {
  private listeners: Set<(notifications: Notification[]) => void> = new Set();
  private notifications: Notification[] = [];
  private notificationId = 0;

  subscribe(listener: (notifications: Notification[]) => void) {
    this.listeners.add(listener);
    listener(this.notifications);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(listener => listener(this.notifications));
  }

  add(title: string, message: string, type: 'success' | 'warning' | 'error' | 'info' = 'info') {
    const notification: Notification = {
      id: `notif-${this.notificationId++}-${Date.now()}`,
      title,
      message,
      type,
      timestamp: new Date(),
      read: false
    };

    this.notifications = [notification, ...this.notifications];
    this.notify();

    // Auto-remove after 10 seconds (but keep unread notifications longer)
    if (type !== 'warning' && type !== 'error') {
      setTimeout(() => {
        if (!this.notifications.find(n => n.id === notification.id)?.read) {
          this.remove(notification.id);
        }
      }, 10000);
    }

    return notification.id;
  }

  success(title: string, message: string) {
    return this.add(title, message, 'success');
  }

  error(title: string, message: string) {
    return this.add(title, message, 'error');
  }

  warning(title: string, message: string) {
    return this.add(title, message, 'warning');
  }

  info(title: string, message: string) {
    return this.add(title, message, 'info');
  }

  markRead(id: string) {
    this.notifications = this.notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    );
    this.notify();
  }

  markAllRead() {
    this.notifications = this.notifications.map(n => ({ ...n, read: true }));
    this.notify();
  }

  remove(id: string) {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.notify();
  }

  clear() {
    this.notifications = [];
    this.notify();
  }

  getAll() {
    return this.notifications;
  }

  getUnreadCount() {
    return this.notifications.filter(n => !n.read).length;
  }
}

export const notificationManager = new NotificationManager();

