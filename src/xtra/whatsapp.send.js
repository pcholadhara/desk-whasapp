import { saveChat } from "../db2/chat/db.chat.save";
import { getSoftUser } from "./localstore";

const mdlChat = {
    id          : null,
    msgTo       : "",
    msgFrom     : "",
    msgBody     : "",
    senderName  : "",
    receipient  : "",
    msgType     : "",
    dateTime    : null
}

class WASender{
    msg={};
    constructor(){
        this.msg = Object.assign({}, mdlChat);
        this.initNumber();
    }

    initNumber(){
        const user = getSoftUser();
        if(user){
            this.msg.msgFrom = user.number;
            this.msg.senderName = user.name;
        }
    }

    setReceipient(number, name){
        this.msg.msgTo = number;
        this.msg.receipient = name;
        return this;
    }

    setBody(body, type="TEXT"){
        this.msg.msgBody = body;
        this.msg.msgType = type;
        return this;
    }

    async send(){
        this.msg.dateTime = Date.now();
        window.api.send('send-message', { number: this.msg.msgTo, message: this.msg.msgBody});
        await saveChat(this.msg);  
        return this.msg;
    }
}
export default WASender;