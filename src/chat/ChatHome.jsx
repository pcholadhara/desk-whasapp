import { useEffect, useState } from "react";
import { getAllChats } from "../db2/chat/db.chat.load";
import { getStrDate } from "../xtra/dates";
import { CircleUserRound } from "lucide-react";
import { useNavigate } from "react-router";

const ChatHome = () => {
    const [chats, setChats] = useState([]);
    const navigate = useNavigate();
    const [selectedChat, setSelectedChat] = useState(null);

    const loadData = async () => {
        const messages = await getAllChats();console.log("Loaded chats:", messages);
        // const groupedChats = messages.reduce((acc, message) => {
        //     const { from, body, timestamp } = message;
        //     if (!acc[from]) {
        //         acc[from] = {
        //             name: from,
        //             messages: []
        //         };
        //     }
        //     acc[from].messages.push({ body, timestamp });
        //     return acc;
        // }, {});

        // const chatList = Object.values(groupedChats).map(chat => {
        //     const lastMessage = chat.messages[chat.messages.length - 1];
        //     return {
        //         ...chat,
        //         lastMessage: lastMessage ? lastMessage.body : "No messages",
        //     };
        // });

        setChats(messages);
        // if (chatList.length > 0) {
        //     setSelectedChat(chatList[0]);
        // }
    }

    useEffect(() => {
        loadData();
    }, []);

    const handleChatSelect = (chat) => {
        navigate(`/chat/${chat.waNumber}`)
    }

    return (
        <div className="flex w-screen h-screen bg-gray-100">
            {/* Left Pane: Chat List */}
            <div className="w-full h-[90%] border-r border-gray-300 flex flex-col">
                <div className="p-4 bg-gray-200 border-b border-gray-300">
                    <h1 className="text-xl font-bold">Chats</h1>
                </div>
                <div className="overflow-y-auto flex-1">
                    {chats.map(chat => (
                        <div
                            key={chat.waNumber}
                            className={`p-4 cursor-pointer flex items-center border-b border-gray-200 hover:bg-gray-200 ${selectedChat?.name === chat.name ? 'bg-gray-100' : ''}`}
                            onClick={() => handleChatSelect(chat)}
                        >
                            <div className="w-8 h-8 bg-gray-300 rounded-full mr-4">
                                <CircleUserRound size={34} />
                            </div>
                            <div className="flex-1">
                                <p className="text-md font-semibold">{chat.waName}</p>
                                <p className="text-sm text-gray-600 whitespace-nowrap">{chat.waMssg}</p>
                                
                            </div>
                            <div className="text-xs text-gray-500">
                                {getStrDate(chat.dateTime)}
                            </div> 
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    )
}

export default ChatHome;