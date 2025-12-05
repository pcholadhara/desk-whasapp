import { useParams } from "react-router";
import { getChatsByNumber, getNumberDetails } from "../db2/chat/db.chat.load";
import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import WASender from "../xtra/whatsapp.send";
import { getSoftUser } from "../xtra/localstore";

const ChatWindow = () => {
    const { phnNo } = useParams();
    const [selectedChat, setSelectedChat] = useState([]);
    const [me, setMe] = useState("");
    const [msgText, setMsgText] = useState('');
    const [receipients, setReceipients] = useState({});

    const loadMsg = async () => {
        const chats = await getChatsByNumber(phnNo); console.log("Loaded chats for ", phnNo, chats);
        const recpt = await getNumberDetails(phnNo); console.log("Receipient details:", recpt);
        const user = getSoftUser();
        setMe(user.number);
        setReceipients(recpt);
        setSelectedChat(chats);
    }

    const sendMessage = async () => {
        console.log("Sending message to ", receipients, " text:", msgText);
        if (msgText.trim() === '') return;
        const sender = new WASender().setReceipient(receipients.waNumber, receipients.waName).setBody(msgText);
        await sender.send();
        setMsgText('');
        loadMsg();

    }

    useEffect(() => {
        loadMsg();
    }, [phnNo]);

    return (<>
        <div className="w-screen h-full flex flex-col">

            <div className="p-4 bg-gray-200 border-b border-gray-300 flex items-center">
                <div className="w-10 h-10 bg-gray-400 rounded-full mr-4"></div>
                <h1 className="text-lg font-bold">{phnNo}</h1>
            </div>
            <div className="flex-1 p-4 overflow-y-auto" style={{ backgroundImage: 'url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)' }}>
                {selectedChat.map((message, index) => (
                    <div
                        key={index}
                        className={`mb-4 flex w-full ${me === message.msgFrom ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`p-3 rounded-lg shadow-md max-w-[75%] ${
                                me === message.msgFrom
                                    ? "bg-green-50 text-black"
                                    : "bg-white text-gray-900"
                                }`}
                        >
                            <p>{message.msgBody}</p>
                            <p className="text-xs text-gray-500 mt-1 text-right">
                                {new Date(message.dateTime).toLocaleTimeString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-4 bg-gray-200 border-t border-gray-300 flex w-full ">
                <div className="flex-row items-center flex w-full gap-2 border border-orange-500 rounded-lg pr-4">
                    <textarea rows={1} type="text" value={msgText} placeholder="Type a message..." className="grow p-2 " onChange={(e) => setMsgText(e.target.value)} />
                    <Send size={18} onClick={sendMessage} className="hover:text-amber-500 cursor-pointer" />
                </div>
            </div>
        </div>
    </>)
}
export default ChatWindow;