import { useEffect, useState } from "react";
import { getAllChats } from "../db2/chat/db.chat.load";

const ChatHome = () => {
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);

    const loadData = async () => {
        const messages = await getAllChats();
        const groupedChats = messages.reduce((acc, message) => {
            const { from, body, timestamp } = message;
            if (!acc[from]) {
                acc[from] = {
                    name: from,
                    messages: []
                };
            }
            acc[from].messages.push({ body, timestamp });
            return acc;
        }, {});

        const chatList = Object.values(groupedChats).map(chat => {
            const lastMessage = chat.messages[chat.messages.length - 1];
            return {
                ...chat,
                lastMessage: lastMessage ? lastMessage.body : "No messages",
            };
        });

        setChats(chatList);
        if (chatList.length > 0) {
            setSelectedChat(chatList[0]);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    const handleChatSelect = (chat) => {
        setSelectedChat(chat);
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Left Pane: Chat List */}
            <div className="w-1/3 border-r border-gray-300 flex flex-col">
                <div className="p-4 bg-gray-200 border-b border-gray-300">
                    <h1 className="text-xl font-bold">Chats</h1>
                </div>
                <div className="overflow-y-auto flex-1">
                    {chats.map(chat => (
                        <div
                            key={chat.name}
                            className={`p-4 cursor-pointer flex items-center border-b border-gray-200 hover:bg-gray-200 ${selectedChat?.name === chat.name ? 'bg-gray-300' : ''}`}
                            onClick={() => handleChatSelect(chat)}
                        >
                            <div className="w-12 h-12 bg-gray-400 rounded-full mr-4"></div>
                            <div className="flex-1">
                                <p className="text-lg font-semibold">{chat.name}</p>
                                <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Pane: Chat View */}
            <div className="w-2/3 flex flex-col">
                {selectedChat ? (
                    <>
                        <div className="p-4 bg-gray-200 border-b border-gray-300 flex items-center">
                            <div className="w-10 h-10 bg-gray-400 rounded-full mr-4"></div>
                            <h1 className="text-xl font-bold">{selectedChat.name}</h1>
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto" style={{ backgroundImage: 'url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)' }}>
                            {selectedChat.messages.map((message, index) => (
                                <div key={index} className="mb-4">
                                    <div className="flex items-end">
                                        <div className="bg-white rounded-lg p-3 shadow-md">
                                            <p>{message.body}</p>
                                            <p className="text-xs text-gray-500 mt-1 text-right">{new Date(message.timestamp).toLocaleTimeString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-gray-200 border-t border-gray-300">
                            <input type="text" placeholder="Type a message..." className="w-full p-2 border border-gray-300 rounded-lg" />
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-lg text-gray-500">Select a chat to start messaging</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ChatHome;