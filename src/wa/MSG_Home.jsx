import { useState } from 'react';
import SendMessageForm from './SendMessageForm';

const MSG_Home = ({status})=>{
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage]         = useState('');

    return(<>
        <div className="w-full h-full flex flex-col overflow-hidden mx-auto">
            <SendMessageForm
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                message={message}
                setMessage={setMessage}
                status={status}
            />
        </div>
    </>)
}
export default MSG_Home;

