import { useEffect, useState } from "react";
import { getActivities, getLead } from "../fs/fs.lead.load";
import { Brain } from "lucide-react";
import { generateMessage } from "../ai/ai.deepseek";
import WASender from "../xtra/whatsapp.send";
import { saveLeadActivity, skipFollowup } from "../fs/fs.lead.save";

export const LeadLoader = () => {
    const [lead, setLead]               = useState(null);
    const [activities, setActivities]   = useState([]);
    const [phoneNos, setPhoneNos]       = useState([]);

    const loadData = async () => {
        const data                  = await getLead();
        const activities            = await getActivities(data.id);
        const filteredActivities    = activities.filter(act => act.status === 1);
        let nos = [data.leadPhoneNo, data.bizPhoneNo, data.leadMobileNo];

        setActivities(filteredActivities);
        setLead(data);
        setPhoneNos(nos);
    }

    useEffect(() => {
        loadData()
    }, [])

    if (!lead) {
        return <div>Loading...</div>
    }
    return (
        <>
            <div className="w-full p-3 flex flex-col gap-3">
                <div className="w-full border border-gray-300 p-4 rounded-md bg-white">
                    <p className="text-lg font-bold">{lead.leadName}</p>
                    <p className="text-sm font-bold">{lead.leadPhoneNo}</p>
                    <p className="text-sm font-bold mt-2">
                        <span className="bg-amber-200 px-2 py-1 rounded-md">
                            {lead.leadStatus ? lead.leadStatus : " Need to Contact "}
                        </span>
                        <span className="bg-blue-200 px-2 py-1 rounded-md"> {lead.industry} </span>
                    </p>
                </div>
                {/* 2 */}
                <div>
                    <MessagePanel activities={activities} lead={lead} phoneNos={phoneNos} onAction={loadData} />
                </div>
                <div></div>
            </div>
        </>
    )
}

const MessagePanel = ({ activities, lead, phoneNos, onAction }) => {
    const [showHide, setShowHide]           = useState(false);
    const [buttonDis, setButtonDis]         = useState(false);
    const [selectedNumbers, setSelectedNumbers] = useState(0);
    const [messageText, setMessageText]         = useState("");
    const [lang, setLang]                       = useState("English")

    const workAI = async () => {
        setShowHide(true);
        const response = await generateMessage(lead, activities, lang);
        setMessageText(response);
        setShowHide(false);
    }

    const SendMsg = async () => {
        let number = `91${phoneNos[selectedNumbers]}`;
        const sent = await new WASender()
            .setReceipient(number, lead.leadName)
            .setBody(messageText, "TEXT")
            .send();
        if(sent){
            const upd = await saveLeadActivity(lead, phoneNos[selectedNumbers], messageText);
            setButtonDis(true);
        }
        onAction();
    }

    const skip4Now = async () => {
        const upd = await skipFollowup(lead);
        setButtonDis(true);
        onAction();
    }

    return (
        <>
            <div className="w-full h-full flex gap-3 flex-col border border-gray-300 p-4 rounded-md bg-white">
                <div className="flex">
                    <p className="text-lg font-bold mb-3 flex grow">Message</p>
                    <div className="flex items-center justify-center">
                        {showHide ?
                            <div className="h-6 w-6 animate-spin rounded-full border-2 border-solid border-blue-500 border-t-transparent"></div>
                            : <Brain className="cursor-pointer" onClick={e => workAI()} />
                        }
                    </div>
                </div>
                <div className="w-full h-[1px] bg-gray-300"></div>
                <div className="w-full flex-col gap-1 border border-gray-300 rounded-md px-1 py-2 space-y-2">
                    <div className="flex gap-2">
                        {phoneNos.map((no, idx) => 
                            <div className="flex gap-2" key={idx}>
                                {no && <input type="checkbox" checked={selectedNumbers === idx} onChange={() => setSelectedNumbers(idx)} />}
                                <label key={idx} className="text-sm" htmlFor={no}> {no} </label>
                            </div>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <div className="flex gap-2">
                            <input type="checkbox" checked={lang === "English"} onChange={() => setLang("English")} />
                            <label className="text-sm">English</label>
                            <input type="checkbox" checked={lang === "Hindi"} onChange={() => setLang("Hindi")} />
                            <label className="text-sm">Hindi</label>
                        </div>
                    </div>
                </div>
                <div className="w-full h-[1px] bg-gray-300"></div>
                <div className="flex flex-col">
                    <textarea
                        className="w-full border border-gray-300 rounded-md p-2 h-32 min-h-48 outline-none focus:border-gray-400 ring-0"
                        placeholder="Type your message here..." value={messageText} onChange={e => setMessageText(e.target.value)} >
                    </textarea>
                    ,<button className="bg-teal-800 text-white px-4 py-2 rounded-md hover:bg-teal-900 cursor-pointer" disabled={buttonDis}>Send</button>
                    ,<button className="bg-white text-orange-400 px-4 py-2 rounded-md cursor-pointer" disabled={buttonDis} onClick={e=>skip4Now()}>SKIP FOR NOW</button>
                </div>
            </div>
        </>
    )
}

export default LeadLoader;