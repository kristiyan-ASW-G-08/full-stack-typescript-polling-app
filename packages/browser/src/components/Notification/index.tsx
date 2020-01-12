import React, { FC } from "react";
import { notificationType } from "types/NotificationState";

interface Notification {
  type: notificationType;
  content: string;
}

const Notification: FC<Notification> = ({ type, content }) => (
  <div
    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
    role="alert"
  >
    <span className="block sm:inline">{content}</span>
  </div>
);

export default Notification;
