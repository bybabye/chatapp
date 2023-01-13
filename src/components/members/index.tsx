import { User } from "../../common";
import CircleAvatar from "../circle_avatar";
import { AiOutlineCheck } from "react-icons/ai";

export default function Members({
  members,
  listId,
  isLoading,
  setListId,
}: {
  members: User[];
  listId: String[];
  isLoading: boolean;
  setListId: any;
}): JSX.Element {
  function handleAddRemoveItem(id: string) {
    if (listId.includes(id)) {
      setListId(listId.filter((item) => item !== id));
    } else {
      setListId((props: any) => [...props, id]);
    }
  }

  return (
    <>
      {isLoading ? (
        <div className="h-[60px] w-[100%]  flex justify-center">
          <div className="h-[30px] w-[30px]  animate-spin border-[2px] border-t-[black] rounded-full"></div>
        </div>
      ) : (
        members.map((member) => (
          <div
            key={member.uid}
            onClick={() => handleAddRemoveItem(member.uid)}
            className={`m-[12px] rounded-xl px-[16px] py-[12px] flex flex-row items-center justify-center cursor-pointer hover:bg-[#ccc]`}
          >
            <CircleAvatar url={member.photoURL} size={24} />
            <p className="pl-[12px]">{member.displayName}</p>
            <div className="grow"></div>
            {listId.includes(member.uid) && (
              <div className="">
                <AiOutlineCheck color="green" size={24} />
              </div>
            )}
          </div>
        ))
      )}
    </>
  );
}
