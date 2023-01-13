import styles from "./styles.module.css";

export default function CircleIcon({
  icon,
  isChoose,
}: {
  icon: any;
  isChoose: boolean;
}): JSX.Element {
  return (
    <div className={isChoose ? `${styles.icon_isChoose}` : `${styles.icon}`}>
      {icon}
    </div>
  );
}
