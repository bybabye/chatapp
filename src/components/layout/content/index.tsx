import { ReactNode } from "react";
import styles from "./styles.module.css";

export default function Content({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return <div className={`${styles.content} ]`}>{children}</div>;
}
