import {useEffect, useState } from "react"
import ChatListItems from "./ChatListItems";

const ChatHome = () =>{
    const [chats, setChats] = useState([]);

    const loadChats = async () => {
        const _chats = await getAllChats();
        setChats(_chats);
    }

    useEffect(() => {
        loadChats();
    }, []);
    return(<>
        <div className="w-full bg-white">
            {chats.map((chat, index) => (
                <ChatListItems
                    key={index}
                    name={chat.waName}
                    number={chat.waNumber}
                    lastMessage={chat.waMssg}
                    time={chat.dateTime}
                    onClick={() => console.log("Open chat:", chat.waNumber)}
                />
            ))}
        </div>
    </>)
}
export default ChatHome