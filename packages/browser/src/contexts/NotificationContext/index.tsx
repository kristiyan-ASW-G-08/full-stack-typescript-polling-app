import React, { FC, createContext, useState, SetStateAction } from "react";
import AuthState from "types/AuthState";
import NotificationState, { notificationType } from "types/NotificationState";

export const defaultNotificationState: NotificationState = {
  type: "message",
  content: "",
  isActive: false
};
interface NotificationContextProps {
  authState: AuthState;
  setNotification: (
    content: string,
    type: notificationType
  ) => SetStateAction<NotificationState>;
}
// @ts-ignore
export const NotificationContext = createContext<NotificationContextProps>({
  ...defaultNotificationState
});

export const NotificationContextProvider: FC = ({ children }) => {
  const [notificationState, setNotificationState] = useState<NotificationState>(
    defaultNotificationState
  );
  const resetNotificationState = () =>
    setNotificationState(defaultNotificationState);

  const setNotification = (
    content: string,
    type: notificationType = "warning"
  ) => {
    console.log(content, type);
    setNotificationState({ content, type, isActive: true });
    setTimeout(resetNotificationState, 2000);
  };
  return (
    <NotificationContext.Provider
      value={{ notificationState, setNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
