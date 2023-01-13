import { useContext, useState, useEffect } from "react";
import styles from "./styles.module.css";
import { AuthContext } from "../../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { RiSendPlaneLine } from "react-icons/ri";
import Rooms from "../../components/rooms";
import { AppContext } from "../../context/AppProvider";
import Chats from "../../components/chats";
import CustomInputForm from "../../components/custom_input_form";
import { Room } from "../../common/model/room";
import { addDocument } from "../../firebase";
import { Timestamp } from "firebase/firestore";
import FormAnimation from "../../components/form_animation";
import Members from "../../components/members";
import useDebounce from "../../hooks/useDebounce";
import { fetchUser, updateDocuments } from "../../firebase/query";
import { User } from "../../common";

export default function MessagePage(): JSX.Element {
  const user = useContext(AuthContext);
  const { roomIdIsSelected, selectedRoom } = useContext(AppContext);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [search, setSearch] = useState("");
  const [isOpenFormAdd, setIsOpenFormAdd] = useState(false);
  const [room, setRoom] = useState({} as Room);
  const [listMember, setListMembers] = useState([] as User[]);
  const [listId, setListId] = useState([] as String[]);
  const [isLoading, setIsLoading] = useState(false);
  const debounced = useDebounce(search, 500);

  async function handleCreateRoom() {
    const id = uuidv4();
    setIsOpenForm(!isOpenForm);
    setRoom({} as Room);
    await addDocument(id, "rooms", {
      roomId: id,
      roomName: room.roomName,
      members: [user.uid],
      avatar: "",
      roomIdIsSelect: "",
    });
    await addDocument(
      id,
      "rooms",
      {
        messId: user.uid,
        content: `${user.displayName} đã tạo nhóm chat`, //content,
        createAt: Timestamp.now(),
        idSend: user.uid,
        notification: true,
      },
      "messages",
      id
    );
  }

  async function handleAddMembers() {
    const id = uuidv4();

    listMember.map(async (e) => {
      await addDocument(
        roomIdIsSelected,
        "rooms",
        {
          messId: e,
          content: `${user.displayName} đã add bạn vào nhóm`, //content,
          createAt: Timestamp.now(),
          idSend: user.uid,
          notification: true,
        },
        "messages",
        id
      );
    });

    await updateDocuments("rooms", roomIdIsSelected, {
      members: [...selectedRoom.members, ...listId],
    });
  }

  useEffect(() => {
    if (!debounced.trim()) {
      setListMembers([]);
      return;
    }

    setIsLoading(true);
  

    const members = async () => {
      const users = await fetchUser(debounced, selectedRoom.members);
      const data: User[] = [];
      users.map((user: User) => data.push(user));
      setListMembers(data);
    };
    members()
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
        
      });
  }, [debounced]);

  return (
    <div
      className={`${styles.content} ${
        (isOpenForm && styles.content_open_form) ||
        (isOpenFormAdd && styles.content_open_form)
      }`}
    >
      <div className={`${styles.content_message}`}>
        <div className={`${styles.content_message_room}`}>
          <div className="h-[60px] flex justify-center items-center border-b-[1px] border-[#ccc] font-semibold text-[16px] text-[#262626]">
            {user.displayName}
          </div>
          <div className={`${styles.content_message_listroom}`}>
            <Rooms />
          </div>
        </div>
        {!roomIdIsSelected || !selectedRoom.roomId ? (
          <div className={`${styles.content_message_chats}`}>
            <div className="mb-[12px] h-[96px] w-[96px] border-[2px] border-[#262626] rounded-full flex justify-center items-center">
              <RiSendPlaneLine size={"46px"} />
            </div>
            <p className="text-[20px]">Your Messages</p>
            <p className="text-[14px] text-[#8E8E8E]">
              Send private photos and messages to a friend or group.
            </p>
            <div
              onClick={() => setIsOpenForm(!isOpenForm)}
              className="bg-[#0095F6] text-[14px] text-[white] font-medium py-[7px] px-[16px] mt-[12px] rounded-lg cursor-pointer"
            >
              Send Message
            </div>
          </div>
        ) : (
          <Chats
            callBack={() => {
              setSearch("");
              setListMembers([]);
              setIsOpenFormAdd(!isOpenFormAdd);
            }}
            room={selectedRoom}
          />
        )}
      </div>
      {/* form add room chat */}
      {isOpenForm && (
        <>
          <FormAnimation
            child={
              <>
                {" "}
                <div className="flex flex-row justify-between">
                  <p
                    onClick={() => setIsOpenForm(!isOpenForm)}
                    className=" inline-flex text-[20px] font-semibold text-[red] p-[12px] cursor-pointer"
                  >
                    X
                  </p>
                  <div
                    onClick={() => {
                      room.roomName && handleCreateRoom();
                    }}
                    className={`${
                      room.roomName ? "text-[#0095F6]" : "text-[#ccc]"
                    }  font-medium p-[20px] cursor-pointer`}
                  >
                    Post
                  </div>
                </div>
                <p className="text-center text-[16px] font-medium">ADD ROOM</p>
                <CustomInputForm
                  fieldValue={room.roomName}
                  callBack={(e) => {
                    setRoom((room) => ({
                      ...room,
                      roomName: e,
                    }));
                  }}
                  placeholder={"Room name...."}
                />
              </>
            }
          />
          <div
            onClick={() => setIsOpenForm(!isOpenForm)}
            className="h-[100%] w-[100%] bg-[black] opacity-10 absolute"
          ></div>
        </>
      )}{" "}
      {/* form add room chat */}
      {/* form add members */}
      {isOpenFormAdd && (
        <>
          <FormAnimation
            child={
              <>
                {" "}
                <div className="flex flex-row justify-between">
                  <p
                    onClick={() => setIsOpenFormAdd(!isOpenFormAdd)}
                    className=" inline-flex text-[20px] font-semibold text-[red] p-[12px] cursor-pointer"
                  >
                    X
                  </p>
                  <div
                    onClick={() => {
                      handleAddMembers();
                      setIsOpenFormAdd(!isOpenFormAdd);
                    }}
                    className={`font-medium p-[20px] cursor-pointer`}
                  >
                    Add
                  </div>
                </div>
                <p className="text-center text-[16px] font-medium">
                  ADD Members
                </p>
                <CustomInputForm
                  fieldValue={search}
                  callBack={(e) => {
                    setSearch(e);
                  }}
                  placeholder={"Search members...."}
                />
                {listMember && (
                  <Members
                    members={listMember}
                    isLoading={isLoading}
                    listId={listId}
                    setListId={setListId}
                  />
                )}
              </>
            }
          />
          <div
            onClick={() => setIsOpenFormAdd(!isOpenFormAdd)}
            className="h-[100%] w-[100%] bg-[black] opacity-10 absolute"
          ></div>
        </>
      )}
    </div>
  );
}
