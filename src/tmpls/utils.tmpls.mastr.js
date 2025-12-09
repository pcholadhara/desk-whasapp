import { useState } from "react";
import { mdlTpls } from "../utils/models/mdl.schema";
import { getTmplsById } from "../db2/templates/db.templates.load";
import { saveTemplate, updateTemplate } from "../db2/templates/db.templates.save";
import { useNavigate } from "react-router";

export const useTplMaster = (id) =>{
    const [tpls, setTpls] = useState({...mdlTpls});
    const [msg, setMsg]   = useState({err: false, text: ""});
    const nav = useNavigate();

    const loadTemplate = async () =>{
        const _id = parseInt(id);
        if(_id > 0){
            const msg = await getTmplsById(_id);
            setTpls(msg);
        }
    }

    const createTpl = async () =>{
        const res = await saveTemplate(tpls);
        if(res.success === 0){
            setMsg({err: true, text: "Error in saving"});
            return;
        }
        nav(-1);
    }

    const updateTpl = async () =>{
        const res = await updateTemplate(tpls, id);
        if(res.success === 0){
            setMsg({err: true, text: "Error in saving"});
            return;
        }

        nav(-1);
    }

    return({
        tpls, setTpls, msg, loadTemplate, createTpl, updateTpl
    })
}