import React from 'react';
import SendMessageForm from './SendMessageForm';
import PhoneNumbersUpload from './PhoneNumbersUpload';
import IncomingMessages from './IncomingMessages';

const MSG_Home = ({phoneNumber, setPhoneNumber, message, setMessage, handleSend, status, incomingMessages})=>{
    return(<>
        <div className="w-full h-full flex flex-col overflow-hidden mx-auto">
            <SendMessageForm
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                message={message}
                setMessage={setMessage}
                handleSend={handleSend}
                status={status}
            />
        </div>
    </>)
}



const MSG_Homex = ({ phoneNumber, setPhoneNumber, message, setMessage, handleSend, status, incomingMessages }) => {
    return (
        <div className="w-full h-full flex flex-row gap-4 p-4 overflow-hidden">
            {/* Column 1: Send Message Form */}
            <div className="w-1/3 h-full overflow-y-auto custom-scrollbar">
                <SendMessageForm
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    message={message}
                    setMessage={setMessage}
                    handleSend={handleSend}
                    status={status}
                />
            </div>

            {/* Column 2: Upload Phone Numbers & Incoming Messages */}
            {/* <div className="w-1/3 h-full flex flex-col gap-4 overflow-hidden">
                <div className="h-1/2 overflow-hidden">
                    <PhoneNumbersUpload />
                </div>
                <div className="h-1/2 overflow-hidden">
                    <IncomingMessages messages={incomingMessages} />
                </div>
            </div> */}

            {/* Column 3: Custom Instructions and Settings */}
            <div className="w-1/3 h-full bg-white border border-slate-200 p-6 overflow-y-auto custom-scrollbar shadow-sm flex flex-col">
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">Custom Instructions</h2>
                    <div className="space-y-4">
                        <textarea
                            placeholder="Enter system instructions or context for the AI..."
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-200 h-40 resize-none"
                        />
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-4">Settings</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200">
                            <span className="text-sm text-slate-700 font-medium">Delay between messages</span>
                            <input type="number" defaultValue="5" className="w-16 px-2 py-1 bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-emerald-500" />
                        </div>
                        {/* Add more settings here */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MSG_Home;

