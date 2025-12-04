export const setLocal = (key, object) =>{
    localStorage.setItem(key, JSON.stringify(object));
}

export const getLocalModel = (key) =>{
      let model = {};
      let data    = localStorage.getItem(key);
      if(!data || data === undefined){
          return null;
      }
      model = JSON.parse(data);
      return model;
}

export const getSoftUser = () => {
    const softuser = getLocalModel(localKeys.SOFT_USER);
    if(softuser == null){
        return null;
    }
    return softuser;
}


export const localKeys ={
    SOFT_USER         : "whatsapp-soft-user",
};
