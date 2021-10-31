import style from "./Notification.module.css";

interface NotificationProps {
  title: string;
  message: string;
}

export const Notification = ({ title, message }: NotificationProps) => (
  <div className={style.notification}>
    <p className={style.title}>{title}</p>
    <p className={style.message}>{message}</p>
  </div>
);
