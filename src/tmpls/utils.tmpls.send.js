import WASender from "../xtra/whatsapp.send";

export const sendTemplatesDirectly = async(numbers, tmpl, time)=>{
    const interval = time;
    let i = 0;
    const intervalId = setInterval(async()=>{
        try {
            if (i >= numbers.length) {
                clearInterval(intervalId);
                return;
            }
            await sendFunction(numbers[i], tmpl.tmplBody);
            i++;
        }
        catch(error){
            console.log("Failed to send campaign message", error);
        }
    },interval);
}

const sendFunction = async(num, msg)=>{
    console.log(num);
    try {
        const sender = new WASender().setReceipient(num, num).setBody(msg);
        await sender.send();
    }
    catch (error) {
        console.log("Failed in sending class", error);
    }
    console.log("Interval test", {number: num, msg, time: Date.now()})
}

export const generateRandomInterval = (time)=>{
    const fn = time * 60 * 1000;
    const sn = (time + 3) * 60 * 1000;
    let random = Math.floor(Math.random() * (fn - sn)) + fn;
    return random;
}