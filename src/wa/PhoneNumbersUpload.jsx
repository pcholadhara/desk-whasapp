import React from 'react';

const PhoneNumbersUpload = () => {
    return (
        <div className="bg-white p-8 shadow-xl border border-slate-200 w-full h-full flex flex-col">
            <div className="space-y-6 flex flex-col h-full">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Phone Numbers</h2>
                    <p className="text-slate-500 text-sm">Upload or paste phone numbers</p>
                </div>

                <div className="space-y-4 flex flex-col flex-grow">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wider ml-1">Upload File (CSV/TXT)</label>
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <p className="mb-2 text-sm text-slate-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-slate-500">TXT or CSV files</p>
                                </div>
                                <input type="file" className="hidden" />
                            </label>
                        </div>
                    </div>

                    <div className="space-y-2 flex flex-col flex-grow">
                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wider ml-1">Or Paste Numbers</label>
                        <textarea
                            placeholder="Enter phone numbers here (one per line)..."
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-200 flex-grow resize-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhoneNumbersUpload;
