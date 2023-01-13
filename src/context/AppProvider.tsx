import { createContext, useContext, useMemo, useState } from "react";

import { AuthContext } from "./AuthContext";
import { useFirestore } from "../hooks/useFirestore";
import { Room, RoomsChat } from "../common/model/room";

export const AppContext = createContext({} as RoomsChat);

export default function AppProvider({ children }: { children: JSX.Element }) {
  const user = useContext(AuthContext);

  
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const roomsCondition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: user.uid ?? '',
    };
  }, [user.uid]);
  const rooms = useFirestore("rooms", roomsCondition) || [];
  const selectedRoom = useMemo(
    () => rooms.find((room : Room) => room.roomId === selectedRoomId) || {} as Room,
    [rooms, selectedRoomId]
  ) ;
 
  return (
    <AppContext.Provider
      value={{ rooms: rooms, roomIdIsSelected: selectedRoomId ,setRoomId : setSelectedRoomId ,selectedRoom : selectedRoom}}
    >
      {children}
    </AppContext.Provider>
  );
}
