import { Route, Routes } from "react-router"
import WA_Home from "../../wa/WA_Home"
import Header from "./Header"
import Footer from "./Footer"
import ChatHome from "../../chat/ChatHome"
import ChatWindow from "../../chat/ChatWindow"
import { useEffect, useState } from "react"
import SignIn from "./SignIn"
import MSG_Home from "../../wa/MSG_Home"
import { getSoftUser, localKeys, setLocal } from "../../xtra/localstore"
import { saveChat } from "../../db2/chat/db.chat.save"
import TmplsHome from "../../tmpls/TmplsHome"
import TmplsList from "../../tmpls/TmplsList"
import TmplsSend from "../../tmpls/TmplsSend"

export const Mains = () => {
    const [initing, setIniting] = useState(true);
    const [qrCode, setQrCode] = useState('');
    const [ready, setReady] = useState(false);
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (window.api) {
            window.api.whatsApp();
        }

        window.api.on('whatsapp:qr', (qr) => {
            setQrCode(qr);
            setReady(false);
            setStatus('Scan the QR code with your WhatsApp app.');
            setIniting(false);
        });

        window.api.on('whatsapp:ready', (info) => {
            setReady(true);
            setQrCode('');
            setStatus('WhatsApp client is ready!');
            setIniting(false);
            try {
                setLocal(localKeys.SOFT_USER, { name: info.pushname, number: info.wid.user });
            } catch (error) {
                console.log(error);
            }
        });

        window.api.on('whatsapp:auth_failure', (msg) => {
            setReady(false);
            setQrCode('');
            setStatus(`Authentication failed: ${msg}`);
            setIniting(false);
            console.error('WhatsApp Authentication Failure:', msg);
        });

        window.api.on('send-message-status', (statusMsg) => {
            setStatus(statusMsg);
        });

        window.api.on('incoming-message', async (msg) => {
            console.log(msg);
            if (!msg || !msg.from) {
                console.warn("Message missing 'from':", msg);
                return;
            }

            const user = getSoftUser();
            const chat = {
                msgFrom: msg.from.split('@')[0],
                msgTo: user ? user.number : 'unknown',
                msgBody: msg.body,
            }
            await saveChat(chat);
        });
    }, [status]);

    
    
    return (<>
        <MainArea/>
        {/* {(!ready && qrCode) ? <SignIn initing={initing} qrCode={qrCode} status={status} /> : <MainArea />} */}
    </>)
}

const MainArea = () => {
    return (<>
        <div className="flex w-screen h-screen flex-col overflow-hidden">
            <Header />
            <Contents />
            <Footer />
        </div>
    </>)
}

const Contents = () => {
    return (<>
        <div className="flex w-full flex-1 min-h-0 overflow-hidden">
            <Routes>
                <Route exact path="/" element={<ChatHome />} />
                <Route exact path="/Chat" element={<MSG_Home />} />
                <Route exact path="/chat/:phnNo" element={<ChatWindow />} />
                <Route exact path="/tmpls/:id/save" element={<TmplsHome />} />
                <Route exact path="/templates/list" element={<TmplsList />} />
                <Route exact path="/tmpls/:id/send" element={<TmplsSend />} />
            </Routes>
        </div>
    </>)
}
