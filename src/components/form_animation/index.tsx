import styles from "./styles.module.css";

export default function FormAnimation ({child} : {child : JSX.Element}) : JSX.Element {
    return <div className= {`${styles.form_animated}  bg-[white] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] absolute z-10  rounded-xl`}>{child}</div>
}