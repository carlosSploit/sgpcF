import React, { useEffect, useState } from "react";
import "./style/index.css"
import {EditAdmin} from "../editAdmin/editAdmin"
import { useNotification } from "../../../../../../service/Notifications/useNotificacion";

export function ItemEmpresa(props){
    const {
        itemdate, 
        onUpdate=()=>{}, 
        title,subtitle,descrip
    } = props;
    const [interfaces,setinterface] = useState(null);
    const [isSeleteItem, setisSeleteItem] = useState(false);
    const dispatch = useNotification();

    useEffect(()=>{
        // console.log(itemdate);
        setinterface(<EditAdmin onUpdate={onUpdate} dataact={itemdate} />);
    },[]);

    return (<div className="Container_ItemEmpresa_conten_Pri">
        <div className="Container_ItemEmpresa_conten_secondary">
            <div className="Container_ItemEmpresa_conten_secondary_seleccion">
                <div onClick={()=>{setisSeleteItem(!isSeleteItem);}} className={`Container_ItemEmpresa_conten_secondary_seleccion_radio${(isSeleteItem)?' active':''}`}><div></div></div>
            </div>
            <div className="Container_ItemEmpresa_conten_secondary_seleccion_conten_information">
                 <div className="Container_ItemEmpresa_conten_secondary_seleccion_Infor">
                    <div className="Container_ItemEmpresa_conten_InfoData_primary" >{(title.length > 20)? title.substring(0,20) + '...':title}</div>
                    <div style={{height: '1px'}} />
                    <div className="Container_ItemEmpresa_conten_InfoData_secundary" >{subtitle}</div>
                 </div>
                <div className="Container_ItemEmpresa_conten_secondary_seleccion_suInfor">
                    <div className="Container_ItemEmpresa_conten_InfoData_Descrip" >{descrip}</div>
                </div>
            </div>
        </div>
    </div>);
}