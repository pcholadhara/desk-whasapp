import { QRCodeCanvas } from "qrcode.react";

const SignIn = ({initing, qrCode, status}) => {

    return ((initing === true) ?
        <div className="bg-white p-8 w-full h-full flex justify-center items-center">
            <p className="text-xl">please wait..</p>
        </div>
        :
        <div className="bg-white p-8 w-full h-full flex justify-center items-center">
            <div className="text-center space-y-6">
                <div className="space-y-2">
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">Link Device</h2>
                    <p className="text-slate-500 text-sm">Open WhatsApp on your phone and scan the QR code to connect</p>
                </div>

                <div className="bg-white p-4 inline-block shadow-inner">
                    <QRCodeCanvas value={qrCode} size={200} />
                </div>

                <div className="flex items-center justify-center space-x-2 text-slate-500 text-xs">
                    <div className="w-2 h-2 bg-emerald-500 animate-pulse"></div>
                    <span>{status}</span>
                </div>
            </div>
        </div>
    );
}
export default SignIn;