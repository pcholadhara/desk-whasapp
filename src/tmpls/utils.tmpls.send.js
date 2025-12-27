import { getCampaignNumber } from "../db2/campaign/db2.campaign.load";
import WASender from "../xtra/whatsapp.send";

// export const sendMessgae = async (tmpl, time) => {
//   const fn = time * 60 * 1000;
//   const sn = (time + 3) * 60 * 1000;
//   const tmplt = createRandomTmplPicker(tmpl);
//   const row = await getCampaignNumber();console.log("Campaign Row", row);
//   if (!row) return;
//   let tmp = tmplt();console.log("Template Picker", tmp);
//   //await sendFunction(row.phnNo, tmp.tmplBody);
//   //await upadateToCampaign(row.id, {tmplId : tmp.id, isSend: "Y"});
//   console.log("Scheduling next message in random interval",row.phnNo, tmp.tmplBody );
//   nextInterval(fn, sn);
// }

// const nextInterval = (fn, sn) => {
//   let random = Math.floor(Math.random() * (sn - fn)) + fn;
//   const timeOutId = setTimeout(async () => {
//     await sendMessgae();
//   }, random);
// }

export const sendTemplatesDirectly = async(numbers, tmpl, time)=>{
    const interval = time;
    const tmplt = createRandomTmplPicker([tmpl]);
    let i = 0;
    const intervalId = setInterval(async()=>{
        try {
            if (i >= numbers.length) {
                clearInterval(intervalId);
                return;
            }
            
            await sendFunction(numbers[i], tmplt().tmplBody);
            i++;
        }
        catch(error){
            console.log("Failed to send campaign message", error);
        }
    },generateRandomInterval(interval));
}

export const sendFunction = async(num, msg)=>{
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
    let random = Math.floor(Math.random() * (sn - fn)) + fn;
    return random;
}


export const createRandomTmplPicker = (templates) => {
  let shuffled = [];
  let index = 0;

  const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  return () => {
    if (!templates.length) return null;

    if (index >= shuffled.length) {
      shuffled = shuffle(templates);
      index = 0;
    }
    console.log("Random Templates", shuffled[index++]);
    return shuffled[index++];
  };
};
