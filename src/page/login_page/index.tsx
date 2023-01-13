import { useState } from "react";

import { addDocument, SignInWithGoogle } from "../../firebase";
import styles from "./styles.module.css";
import { generateKeywords } from "../../firebase/query";

export default function LoginPage(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");
  const handleLoginWithGoogle = async () => {
    try {
      setIsLoading(true);
      const user = await SignInWithGoogle();
      const { uid, displayName, email, photoURL, emailVerified } = user;

      if (emailVerified) {
        await addDocument(uid, "users", {
          uid,
          displayName,
          photoURL,
          email,
          keywords: generateKeywords(displayName?.toLowerCase()),
        });
      }
    } catch (error) {
      setError(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex justify-center h-[100vh] w-[100vw] items-center">
      {isLoading ? (
        <div className="h-[60px] w-[100%]  flex justify-center">
          <div className="h-[30px] w-[30px]  animate-spin border-[2px] border-t-[black] rounded-full"></div>
        </div>
      ) : (
        <div
          className={`${styles.form_login} flex flex-col justify-center items-center`}
        >
          <div
            onClick={() => handleLoginWithGoogle()}
            className="bg-[#ccc] p-[12px] mb-[12px] cursor-pointer"
          >
            Dang nhap bang google
          </div>
          <div className="bg-[#ccc] p-[12px]">Dang nhap bang facebook</div>
          <div>{error}</div>
        </div>
      )}
    </div>
  );
}
