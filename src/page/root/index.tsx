import {  Outlet, useNavigate } from "react-router";
import { useCallback, useEffect, useState,useContext } from "react";
import SideBar from "../../components/layout";
import Content from "../../components/layout/content";
import styles from "./styles.module.css";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../loading_page";



export default function RootPage() : JSX.Element {
  const navigate = useNavigate();
  const [tabActive, setTabActive] = useState<String>("");
  const user = useContext(AuthContext);
  
  useEffect(() => {
    handleNavigate(tabActive as string);
  }, [tabActive]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNavigate = useCallback(
    (url: string) => {
      navigate(`/${url}`);
    },
    [navigate]
  );
    return  <div className={`${styles.layout}`}>
       <SideBar tabActive={tabActive as string} onClickTab={setTabActive} />
       <Content>
         <Outlet/>
       </Content>
    </div> 
}