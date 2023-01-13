import { useContext, useState } from "react";
import {
  IoCallOutline,
  IoVideocamOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
import { AiOutlineUserAdd } from "react-icons/ai";
import CircleAvatar from "../circle_avatar";
import { GrSend } from "react-icons/gr";
import { BiConfused } from "react-icons/bi";
import { AuthContext } from "../../context/AuthContext";
import { addDocument } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { Timestamp } from "firebase/firestore";
import { useFirestoreTwo } from "../../hooks/useFirestore";
import { Message } from "../../common/model/message";
import { Room } from "../../common/model/room";

export default function Chats({
  callBack,
  room,
}: {
  callBack: () => void;
  room: Room;
}): JSX.Element {
  const user = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const messages = useFirestoreTwo(
    "rooms",
    room.roomId,
    "messages"
  ) as Message[];
  async function handleAddChats() {
    const id = uuidv4();
    setMessage("");
    await addDocument(
      room.roomId,
      "rooms",
      {
        messId: id,
        content: message, //content,
        createAt: Timestamp.now(),
        idSend: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
      "messages",
      id
    );
  }

  const addChatForEnter = (e: any) => {
    if (e.key === "Enter") {
      handleAddChats();
    }
  };

  return !room.roomId ? (
    <div></div>
  ) : (
    <div className="flex flex-col grow ">
      <div className="flex flex-row h-[60px] border-b border-[#ccc] border-solid items-center px-[20px]">
        <div className="px-[8px]">
          <CircleAvatar url={room.avatar} size={24} />
        </div>
        <div className="text-[16px] font-medium">{room.roomName}</div>
        <div className="grow"></div>
        <div className="pr-[12px]">
          <IoCallOutline size={24} />
        </div>
        <div className="pr-[12px]">
          <IoVideocamOutline size={24} />
        </div>
        <div className="pr-[12px]">
          <AiOutlineUserAdd onClick={() => callBack()} size={24} />
        </div>
        <IoInformationCircleOutline size={24} />
      </div>
      <div className="grow flex flex-col">
        <div className="grow">
          <div>
            {messages &&
              messages.map((message) => (
                <div
                  key={message.messId}
                  className={`flex flex-row p-[20px] ${
                    message.notification
                      ? "justify-center"
                      : message.idSend === user.uid
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`flex ${
                      message.idSend === user.uid
                        ? "flex-row-reverse"
                        : "flex-row"
                    } items-end`}
                  >
                    {message.photoURL && (
                      <div className="px-[6px]">
                        <CircleAvatar url={message.photoURL} size={12} />
                      </div>
                    )}
                    <div
                      className={`flex flex-col ${
                        message.idSend === user.uid
                          ? "items-end"
                          : "items-start"
                      } `}
                    >
                      {message.displayName && (
                        <div className="p-[6px] text-gray-400">
                          {message.displayName}
                        </div>
                      )}
                      <div
                        className={`bg-[white] p-[12px] rounded-2xl ${
                          message.notification && "bg-transparent text-gray-400"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="h-[84px] p-5 relative ">
          <div className="absolute p-[10px]">
            <BiConfused size={24} />
          </div>
          <div
            onClick={() => {
              message && handleAddChats();
            }}
            className="cursor-pointer absolute p-[10px]  right-7"
          >
            <GrSend size={24} />
          </div>
          <input
            onKeyDown={(e) => {
              message && addChatForEnter(e);
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message..."
            className="w-[100%] h-[45px] rounded-2xl outline-none pl-[44px]"
          />
        </div>
      </div>
    </div>
  );
}
