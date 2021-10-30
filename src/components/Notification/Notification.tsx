import style from "./Notification.module.scss";

interface NotificationProps {
  title: string;
  message: string;
}

export const Notification = ({ title, message }: NotificationProps) => {
  return (
    <div className={style.notification}>
      <p className={style.title}>{title}</p>
      <p className={style.message}>{message}</p>
    </div>
  );
};
