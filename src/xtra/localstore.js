export const setLocal = (key, object) =>{
    localStorage.setItem(key, JSON.stringify(object));
}

export const getLocalModel = (key) =>{
      let model = {};
      let data    = localStorage.getItem(key);
      if(data === null){
        return {};
      } else{
          model = JSON.parse(data);
      }
      return model;
}

export const getLocalList = (key) =>{
    let data    = localStorage.getItem(key);
    if(data === null){
      return [];
    }
    return JSON.parse(data);
}

export const signOutLocal = () =>{
    localStorage.removeItem(localKeys.SOFT_USER);
    localStorage.removeItem(localKeys.APP_COMPANY);
    localStorage.removeItem(localKeys.APP_COMPANY_DETAIL);
}

export const getCompanyId = () => {
  const softuser = getLocalModel(localKeys.SOFT_USER);
  if(Object.keys(softuser).length > 0) {
    return softuser.companyId;
  }
  return "";
}

export const getSoftUserId = () => {
  const softuser = getLocalModel(localKeys.SOFT_USER);
  if(Object.keys(softuser).length > 0) {
    return softuser.id;
  }
  return "";
}

export const getDeviceId = () => {
    const softuser = getLocalModel(localKeys.SOFT_USER);
    if(Object.keys(softuser).length > 0) {
        return softuser.deviceId;
    }
    return "";
}

export const getMyProfile = () => {
    const softuser = getLocalModel(localKeys.SOFT_USER);
    if(Object.keys(softuser).length > 0) {
        return softuser;
    }

    return {};
}

export const getSoftUser = () => {
    const softuser = getLocalModel(localKeys.SOFT_USER);
    if(Object.keys(softuser).length > 0) {
        return softuser;
    }

    return {id: ""};
}


export const getLoggedUserId = () => {
  const softuser = getLocalModel(localKeys.SOFT_USER);
  if(Object.keys(softuser).length > 0) {
    return softuser.contactId;
  }
  return "";
}


export const localKeys ={
    SOFT_USER         : "tipple.softuser",
    APP_COMPANY       : "tipple.appcompany",
    DASHBOARD         : "tipple.dashboard",
    APP_COMPANY_DETAIL: "tipple.appcompany1",
};
