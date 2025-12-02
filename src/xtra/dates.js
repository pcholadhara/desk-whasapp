export const getStrDate = (millis) =>{
    let date    = new Date(millis);
    let dd      = date.getDate();
    let dat     = dd < 10 ? "0"+dd : dd;
    let mm      = date.getMonth()+1; //January is 0!
    let MM      = mm < 10 ? "0"+mm : mm;
    let yyyy    = date.getFullYear();
    let strDate = dat + "-" + MM + "-" + yyyy;
    return strDate;
}

export const getStrDateTime = (millis) =>{
    if(millis === 0 || millis === undefined || millis === null){return "00-00-0000";}
    let date    = new Date(millis);
    let dd      = date.getDate();
    let dat     = dd < 10 ? "0"+dd : dd;
    let mm      = date.getMonth()+1; //January is 0!
    let MM      = mm < 10 ? "0"+mm : mm;
    let yyyy    = date.getFullYear();
    let hr      = date.getHours();
    let hr2     = hr <=12 ? hr : hr - 12;
    let amPM    = hr < 12 ? "AM" : "PM";
    let hour    = hr2 < 10 ? "0"+hr2 : hr2;
    let minit   = date.getMinutes();
    let minute  = minit < 10 ? "0"+minit : minit;
    let strDate = dat + "-" + MM + "-" + yyyy + " " + hour+":"+minute+ " "+amPM;
    return strDate;
}

export const getStrTime = (millis) =>{
    if(millis === 0 || millis === undefined || millis === null){return "00:00 AM";}
    let date    = new Date(millis);
    let hr      = date.getHours();
    let hr2     = hr < 12 ? hr : hr - 12;
    let amPM    = hr < 12 ? "AM" : "PM";
    let hour    = hr2 < 10 ? "0"+hr2 : hr2;
    let minit   = date.getMinutes();
    let minute  = minit < 10 ? "0"+minit : minit;
    let strDate = hour+":"+minute+ " "+amPM;
    return strDate;
}

export const getIntDate = (millis) =>{
    if(millis === 0){return 0;}
    let date    = new Date(millis);
    let dd      = date.getDate();
    let dat     = dd < 10 ? "0"+dd : dd;
    let mm      = date.getMonth()+1; //January is 0!
    let MM      = mm < 10 ? "0"+mm : mm;
    let yyyy    = date.getFullYear();
    let strDate = yyyy + "" + MM + "" + dat;
    let intDate = parseInt(strDate);
    return intDate;
}

export const getYearMonth = (millis) =>{
    if(millis === 0){return 0;}
    let date    = new Date(millis);
    let mm      = date.getMonth()+1; //January is 0!
    let MM      = mm < 10 ? "0"+mm : mm;
    let yyyy    = date.getFullYear();
    let strDate = yyyy + "" + MM;
    let intDate = parseInt(strDate);
    return intDate;
}

export const getStrDateNow = () =>{
    return getStrDate(Date.now());
}

export const getIntDateNow = () => {
    return getIntDate(Date.now());
}

export const getYearMonthNow = () =>{
    return getYearMonth(Date.now());
}

export const getStrDateFromInt = (intdate) =>{
    const year  = intdate.toString().substring(0, 4);
    const month = intdate.toString().substring(4, 6);
    const day   = intdate.toString().substring(6, 8);
    return day+"-"+month+"-"+year;
}

export const getYearMonthFromInt = (intdate) =>{
    const year  = intdate.toString().substring(0, 4);
    const month = intdate.toString().substring(4, 6);
    return parseInt(year+month);
}

export const getIntDatesInPeriod = (period) =>{
      const dates = [];
      let checkDate  = 0;
      for(let i = period[0]; i < period[1]; i = i+3600000){
          let intdate = getIntDate(i);
          if(intdate !== checkDate){
              checkDate = intdate;
              dates.push(intdate);
          }
      }
      return dates;
}

export const getDayAndHourFromMillis = (millis) =>{
    const days  = Math.floor(millis / (1000 * 60 * 60 * 24));
    const hours = Math.floor((millis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return {days, hours};
}

export const millis ={
       oneDay : 86400000,
       sevenDays : 604800000,
       thirtyDays : 2592000000
}

export const getTodayPeriod = () =>{
    const now   = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return [start.getTime(), Date.now()];
}

export const getYesterdayPeriod = () =>{
    const now   = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastMillis    = today.getTime();
    const firstMillis   = lastMillis - 86400000;

    console.log({firstMillis : firstMillis, lastMillis: lastMillis-1});
    return [firstMillis, lastMillis];
}

export const getThisMonthPeriod = () =>{
    const now   = new Date();
    const thisMonth         = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth    = new Date(thisMonth.getFullYear(), thisMonth.getMonth() + 1, 1);
    const firstMillis       = thisMonth.getTime();
    const lastMillis        = lastDayOfMonth.getTime()-1;

    return [firstMillis, lastMillis];
}

export const getLastMonthPeriod = () =>{
    const now   = new Date();
    const lastMonth             = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastDayOfLastMonth    = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 1);
    const firstMillis           = lastMonth.getTime();
    const lastMillis            = lastDayOfLastMonth.getTime()-1;
    return [firstMillis, lastMillis];
}

export const getPkrDate = (millis) =>{
    let date    = new Date(millis);
    let dd      = date.getDate();
    let dat     = dd < 10 ? "0"+dd : dd;
    let mm      = date.getMonth()+1; //January is 0!
    let MM      = mm < 10 ? "0"+mm : mm;
    let yyyy    = date.getFullYear();
    let strDate = yyyy+"-"+MM+"-"+dat;
    return strDate;
}

export const getPkrDateTime = (millis) =>{
    if(millis === 0 || millis === undefined || millis === null){return "00-00-0000";}
    let date    = new Date(millis);
    let dd      = date.getDate();
    let dat     = dd < 10 ? "0"+dd : dd;
    let mm      = date.getMonth()+1; //January is 0!
    let MM      = mm < 10 ? "0"+mm : mm;
    let yyyy    = date.getFullYear();
    let hr      = date.getHours();
    let hr2     = hr <=12 ? hr : hr - 12;
    let amPM    = hr < 12 ? "AM" : "PM";
    let hour    = hr2 < 10 ? "0"+hr2 : hr2;
    let minit   = date.getMinutes();
    let minute  = minit < 10 ? "0"+minit : minit;
    let strDate = yyyy+"-"+MM+"-"+dat + "T" + hour+":"+minute+ " "+amPM;
    return strDate;
}

export const getFiscalYear = () =>{
    let date    = new Date(Date.now());
    let month   = date.getMonth(); //January is 0!
    let year    = date.getFullYear();

    if(month < 3 ){
        let y1 = (year -1).toString();
        let y2 = year.toString();

        return y1 + "-" + y2.substring(2)
    }

    let y2 = (year +1).toString();
    let fyear = year + "-"+y2.substring(2);
    return fyear;
}