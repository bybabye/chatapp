import { useContext } from "react";
import styles from "./styles.module.css";
import { AuthContext } from "../../context/AuthContext";
import CircleAvatar from "../circle_avatar";
import { AiOutlineLogin } from "react-icons/ai";
import NavBarItem from "../nav_bar_item";
import { RiMessengerLine, RiHomeLine } from "react-icons/ri";
import { signOutWithApp } from "../../firebase/sign_in";
export default function SideBar({
  tabActive,
  onClickTab,
}: {
  tabActive: string;
  onClickTab: (s: String) => void;
}): JSX.Element {
  const user = useContext(AuthContext);
  const colors = {
    select: "#5D7285",
    isSelect: "#0C7FDA",
  };

  return (
    <div className={`${styles.sidebar}`}>
      <NavBarItem
        icon={
          <RiHomeLine
            color={tabActive === "" ? colors.isSelect : colors.select}
            size={"30px"}
          />
        }
        text={"Home"}
        onClick={() => onClickTab("")}
        isSelect={tabActive === ""}
      />
      <NavBarItem
        icon={
          <RiMessengerLine
            color={tabActive === "message" ? colors.isSelect : colors.select}
            size={"30px"}
          />
        }
        text={"Message"}
        onClick={() => onClickTab("message")}
        isSelect={tabActive === "message"}
      />
      <NavBarItem
        icon={<CircleAvatar url={user.photoURL} size={30} />}
        text={user.displayName}
        onClick={() => onClickTab("message")}
        isSelect={false}
      />
      <div className="grow">
        
      </div>
      <NavBarItem
          icon={
            <AiOutlineLogin
              color={tabActive === "" ? colors.isSelect : colors.select}
              size={"30px"}
            />
          }
          text={"Log out"}
          onClick={() => {
            signOutWithApp()
          }}
          isSelect={false}
        />
    </div>
  );
}
