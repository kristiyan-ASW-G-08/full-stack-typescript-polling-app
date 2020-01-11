export type notificationType = "message" | "warning";
export default interface NotificationState {
  type: notificationType;
  content: string;
  isActive: boolean;
}
