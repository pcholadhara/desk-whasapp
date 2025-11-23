import React from 'react';

const SendMessageForm = ({ phoneNumber, setPhoneNumber, message, setMessage, handleSend, status }) => {
    return (
        <div className="bg-white p-8 shadow-xl border border-slate-200 w-full h-full flex flex-col">
            <div className="space-y-6 flex flex-col h-full">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">New Message</h2>
                    <p className="text-slate-500 text-sm">Send a WhatsApp message to any number</p>
                </div>

                <div className="space-y-4 flex flex-col flex-grow">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wider ml-1">Phone Number</label>
                        <input
                            type="text"
                            placeholder="e.g., 919876543210"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-200"
                        />
                    </div>

                    <div className="space-y-2 flex flex-col flex-grow">
                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wider ml-1">Message</label>
                        <textarea
                            placeholder="Type your message here..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-200 flex-grow resize-none"
                        />
                    </div>

                    <button
                        onClick={handleSend}
                        className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg shadow-emerald-600/20 transition-all duration-200 transform active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white">
                        Send Message
                    </button>

                    {status && (
                        <div className={`p-4 text-sm font-medium border ${status.includes('success')
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-red-500/10 text-red-400 border-red-500/20'
                            }`}>
                            {status}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SendMessageForm;
