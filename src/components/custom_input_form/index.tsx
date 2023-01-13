import styles from "./styles.module.css";

export default function CustomInputForm({
  fieldValue,
  placeholder,
  callBack,
}: {
  fieldValue: string;
  callBack: (e:string) => void;
  placeholder: string;
}): JSX.Element {


  return (
    <div className="w-[100%] px-4 my-5">
      <input
        value={fieldValue || ''}
        onChange={(e) => callBack(e.target.value)}
        className={`${styles.form_login_field}`}
        placeholder={placeholder}
      />
    </div>
  );
}
