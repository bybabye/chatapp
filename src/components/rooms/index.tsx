import { useContext, useRef } from "react";
import { AppContext } from "../../context/AppProvider";
import { useDraggable } from "react-use-draggable-scroll";
import CircleAvatar from "../circle_avatar";
export default function Rooms(): JSX.Element {
  const { rooms, setRoomId } = useContext(AppContext);
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref); // Now we pass the reference to the useDraggable hook:
  return (
    <>
      {rooms && (
        <div {...events} ref={ref} className="  overflow-y-hidden h-[100%]">
          {rooms.map((room) => (
            <div
              style={{ cursor: "pointer" }}
              className="flex flex-row items-center hover:bg-[RGBA(255,255,255,0.31)] py-2 px-4 mt-[12px]"
              key={room.roomId}
              onClick={() => setRoomId(room.roomId)}
            >
              <CircleAvatar url={room.avatar} size={56} />
              <p className="ml-4 text-[16px] text-[#262626] font-medium">
                {room.roomName}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
