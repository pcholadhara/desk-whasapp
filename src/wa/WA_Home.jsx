import React, { useState, useEffect } from 'react';
import QRCodeDisplay from './QRCodeDisplay';
import MSG_Home from './MSG_Home';

const WA_Home = () => {
    const [qrCode, setQrCode] = useState('');
    const [ready, setReady] = useState(false);
    const [status, setStatus] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [incomingMessages, setIncomingMessages] = useState([]);

    useEffect(() => {
        // Listen for QR code
        if (window.electron) {
            window.electron.on('qr', (qr) => {
                setQrCode(qr);
                setReady(false);
            });

            window.electron.on('ready', () => {
                setReady(true);
                setQrCode('');
            });

            window.electron.on('send-message-status', (statusMsg) => {
                setStatus(statusMsg);
            });

            window.electron.on('incoming-message', (msg) => {
                setIncomingMessages(prev => [msg, ...prev]);
            });
        }
    }, []);

    const handleSend = () => {
        if (window.electron) {
            window.electron.send('send-message', { number: phoneNumber, message });
        }
    };

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
