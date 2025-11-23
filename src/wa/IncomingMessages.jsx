import React from 'react';

const IncomingMessages = ({ messages = [] }) => {
    return (
        <div className="bg-white p-8 shadow-xl border border-slate-200 w-full h-full flex flex-col">
            <div className="space-y-6 flex flex-col h-full">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Incoming</h2>
                    <p className="text-slate-500 text-sm">Recent messages from clients</p>
                </div>

                <div className="flex-grow overflow-y-auto custom-scrollbar space-y-4 pr-2">
                    {messages.length === 0 ? (
                        <div className="text-center text-slate-400 py-8">
                            No new messages
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <div key={msg.id} className="p-4 bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="font-semibold text-slate-900 text-sm">{msg.notifyName || msg.from}</span>
                                    <span className="text-xs text-slate-400">{msg.timestamp}</span>
                                </div>
                                <p className="text-slate-600 text-sm">{msg.body}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default IncomingMessages;
