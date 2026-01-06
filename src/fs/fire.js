import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import AWS from 'aws-sdk'

export const auth =()=>{return firebase.auth();}
export const fsdb = ()=>{
    return firebase.firestore();
}

export const fsCollection = {
       COMPANY  : "CRM_COMPANY",
       CLIENTS  : "CRM_CLIENTS",
       CONTACTS : "CRM_CONTACTS",
       CLIENT_LOGIN_HISTORY : "CRM_CLIENT_LOGIN_HISTORY",
       USERS     : "CRM_USERS",
       INVOICES  : "CRM_INVOICES",
       SOFT_USER : "CRM_SOFT_USER",
       PROSPECTS : "CRM_PROSPECTS",
       LEAD_MASTER : "CRM_LEAD_MASTER",
       ACTIVITY    : "CRM_ACTIVITY_MASTER",
       TASK_MASTER : "CRM_TASK_MASTER",
       TASK_NOTES: "CRM_TASK_NOTES",
       NOTIFICATION : "CRM_NOTIFICATION",
       CAMPAIGN_SMS : "CRM_CAMPAIGN_SMS",
       PRICING_PLAN : "CRM_PRICING_PLAN",
       SOFT_FILES : "CRM_SOFT_FILES",
       
       WEB_FILE_LIST : "WEB_FILE_LIST",
       WEB_PRINT_FORMATS : "WEB_PRINT_FORMATS",
       WEB_HELP_BLOG : "WEB_HELP_BLOG",
       WEB_RELEASE_NOTE : "WEB_RELEASE_NOTE",
}

export const snapToList = (snapshot) =>{
       const list = [];
       if(snapshot.length == 0){
              return list;
       }

       snapshot.forEach(doc => {
           let model = doc.data(); model.id = doc.id;
           list.push(model);
       });
       return list;
}

export const toList = (snapshot) =>{
       const list = [];
       if(snapshot.length == 0){
              return list;
       }

       snapshot.forEach(doc => {
           let model = doc.data(); model.id = doc.id;
           list.push(model);
       });
       return list;
}

export const getModel = async (tbl, id) =>{
       let model = {};
       const db    = fsdb();
       const ref   = await db.collection(tbl).doc(id).get();
       if(ref.exists){              
              model = ref.data();
              model.id = ref.id;
       }
       return model;
}

export const updateFields = async (tbl, id, data) =>{
       if("id" in data){delete data.id}
       
       const db    = fsdb();
       await db.collection(tbl).doc(id).update(data);
       return id;
}

export const updateFs = async (tbl, id, data) =>{
       if("id" in data){delete data.id}
       
       const db    = fsdb();
       await db.collection(tbl).doc(id).update(data);
       return id;
   }
   
   export const add2Fs = async (tbl, data) =>{
       if("id" in data){delete data.id}
       
       const db    = fsdb();
       const ref   = await db.collection(tbl).add(data);
       return ref.id;
   }
   
   export const delFs = async (tbl, id) =>{
       const db    = fsdb();
       const ref   = await db.collection(tbl).doc(id).delete();
       return id;
   }

   export const getS3Bucket = () =>{
       AWS.config.update({
              accessKeyId: "AKIATWW2RNXLQUQFXMNQ",
              secretAccessKey: "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",
        });
        
        const bucket = new AWS.S3({
                    params: { Bucket: "peasx"},
                    region: "ap-south-1",
                }
        );

       return bucket;
   }

   export const getXWebS3Bucket = () =>{
       AWS.config.update({
              accessKeyId: "AKIATWW2RNXLQUQFXMNQ",
              secretAccessKey: "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",
        });
        
        const bucket = new AWS.S3({
                    params: { Bucket: "xweb"},
                    region: "ap-south-1",
                }
        );

       return bucket;
   }


export const setLocalModel = (key, value) =>{
      localStorage.setItem(key, JSON.stringify(value));
}

export const getLocalModel = (key) => {
       let data = localStorage.getItem(key);
       if (data === null) {
              return {};
       }
       return JSON.parse(data);
}

export const getMyId = () =>{
       let me = getLocalModel(localKeys.auth);
       if(Object.keys(me).length > 0){
            return me.id;
       }
       return "1";
}

export const imAdmin = () =>{
       let me = getLocalModel(localKeys.auth);
       if(Object.keys(me).length > 0){
            return me.access === "ADMIN-ADMIN";
       }
       return false;
}

export const getMyDetail = () =>{
      return getLocalModel(localKeys.auth);
}

export const localKeys = {
       auth      : "admin.peasx.in.auth",
       users     : "admin.peasx.in.users",
       partners  : "admin.peasx.in.partners"
}