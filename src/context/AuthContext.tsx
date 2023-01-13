import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../common";
import { auth } from "../firebase";


export const AuthContext = createContext({} as User);

export default function AuthProvider({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({} as User);

    
  useEffect(() => {
   
    const unsub = auth.onAuthStateChanged( async (user) => {
    
      if (user) {
        setUser({
          uid: user.uid,
          displayName: user.displayName ?? "",
          email: user.email ?? "",
          photoURL: user.photoURL ?? "",
        });
        
        navigate('/')
        return;
      }
  
      navigate('/login')

    });
   
    
    return () => {
      unsub();
    };
  }, []);
  return <AuthContext.Provider value={user}>{ children}</AuthContext.Provider>;
}
