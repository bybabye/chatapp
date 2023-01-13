import { signInWithPopup ,signOut} from "firebase/auth";
import { auth, provider } from "./config";

export const SignInWithGoogle = async () => {
  const user = (await signInWithPopup(auth, provider)).user;
  return user;
};


export const signOutWithApp = async () => {
 
    await signOut(auth);
  
}