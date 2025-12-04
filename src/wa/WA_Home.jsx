import React, { useState, useEffect } from 'react';
import QRCodeDisplay from './QRCodeDisplay';
import MSG_Home from './MSG_Home';
import { saveChat } from '../db2/chat/db.chat.save';
import { getSoftUser, localKeys, setLocal } from '../xtra/localstore';

const WA_Home = () => {
    const [initing, setIniting]         = useState(true);
    const [qrCode, setQrCode]           = useState('');
    const [ready, setReady]             = useState(false);
    const [status, setStatus]           = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage]         = useState('');
    const [incomingMessages, setIncomingMessages] = useState([]);

    useEffect(() => {
        if (window.api) {
            window.api.whatsApp();

            // window.api.on('whatsapp:qr', (qr) => {
            //     setQrCode(qr);
            //     setReady(false);
            //     setStatus('Scan the QR code with your WhatsApp app.');
            //     setIniting(false);
            // });

            // window.api.on('whatsapp:ready', (info) => {
            //     setReady(true);
            //     setQrCode('');
            //     setStatus('WhatsApp client is ready!');
            //     setIniting(false);
            //     setLocal(localKeys.SOFT_USER, {name: info.pushname, number: info.wid.user});
            // });

            // window.api.on('whatsapp:auth_failure', (msg) => {
            //     setReady(false);
            //     setQrCode('');
            //     setStatus(`Authentication failed: ${msg}`);
            //     setIniting(false);
            //     console.error('WhatsApp Authentication Failure:', msg);
            // });

            // window.api.on('send-message-status', (statusMsg) => {
            //     setStatus(statusMsg);
            // });

            // window.api.on('incoming-message', async(msg) => {
            //     const user = getSoftUser();
            //     const chat = {
            //         msgFrom : msg.from.split('@')[0],
            //         msgTo   : user ? user.number : 'unknown',
            //         msgBody : msg.body,
            //     }
            //     await saveChat(chat);
            // });
        }
    }, [status]);


    return (
        <>
            {!ready && qrCode && (
                <QRCodeDisplay qrCode={qrCode} />
            )}

            {ready && (
                <MSG_Home
                    status={status}
                />
            )}
        </>
    );
};

export default WA_Home;
