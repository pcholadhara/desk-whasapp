import React, { useState, useEffect } from 'react';
import QRCodeDisplay from './QRCodeDisplay';
import MSG_Home from './MSG_Home';

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

            window.api.on('whatsapp:qr', (qr) => {
                setQrCode(qr);
                setReady(false);
                setStatus('Scan the QR code with your WhatsApp app.');
                setIniting(false);
            });

            window.api.on('whatsapp:ready', () => {
                setReady(true);
                setQrCode('');
                setStatus('WhatsApp client is ready!');
                setIniting(false);
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

            window.api.on('incoming-message', (msg) => {
                setIncomingMessages(prev => [msg, ...prev]);
            });
        }
    }, [status]);

    const handleSend = () => {
        if (window.api) {
            window.api.send('send-message', { number: phoneNumber, message });
        }
    };

    if(initing){
        return(<>
            <p className="text-xl">please wait..</p>
        </>)
    }

    return (
        <>
            {!ready && qrCode && (
                <QRCodeDisplay qrCode={qrCode} />
            )}

            {ready && (
                <MSG_Home
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    message={message}
                    setMessage={setMessage}
                    handleSend={handleSend}
                    status={status}
                    incomingMessages={incomingMessages}
                />
            )}
        </>
    );
};

export default WA_Home;
