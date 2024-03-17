export interface NotificationState {
  notification: string;
  success: boolean | null;
}

export type NotificationStatus = 'ERROR' | 'SUCCESS' | 'RESET';

export interface CheckCodeAction {
  type: 'SUCCESS';
  payload: {
    message: string;
  };
}

export interface ErrorAction {
  type: 'ERROR';
  payload: {
    message: string;
  };
}

export interface ResetNotificationAction {
  type: 'RESET';
}

export type NotificationAction = CheckCodeAction | ErrorAction | ResetNotificationAction;

export interface NotificationContextProps {
  notificationState: NotificationState;
  notificationDispatcher: React.Dispatch<NotificationAction>;
}
