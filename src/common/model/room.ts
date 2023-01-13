


export interface Room {
    roomId: string ,
    roomName:string ,
    members : [],
    avatar : string,
    roomIdIsSelect : string | null,
}


export interface RoomsChat{
    roomIdIsSelected : string | null,
    rooms : Room[],
    setRoomId : any;
    selectedRoom : Room
}