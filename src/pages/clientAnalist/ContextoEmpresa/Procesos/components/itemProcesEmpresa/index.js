import React, { useEffect, useState } from "react";
import "./style/index.css"
// import {EditAdmin} from "../editEmpresas/editAdmin"
// import { useNotification } from "../../../../../../service/Notifications/useNotificacion";

export function ItemTrabjEmpresa(props){
    const {
        onChange = (id_options) => {},
        onSelecteItem = (id_options, stade) => {},
        keyitem,
        title,subtitle,descrip
    } = props;
    const [isSeleteItem, setisSeleteItem] = useState(false);

    useEffect(()=>{
        // console.log(itemdate);
    },[]);

    return (<div className="Container_ItemProceso_conten_Pri">
        <div className="Container_ItemProceso_conten_secondary">
            <div className="Container_ItemProceso_conten_secondary_seleccion_conten_information" onClick={()=>{
                onChange(keyitem);
            }}>
                 <div className="Container_ItemProceso_conten_secondary_seleccion_Infor">
                    <p className="Container_ItemProceso_conten_InfoData_primary" >{title}</p>
                    <div style={{height: '1px'}} />
                    <div className="Container_ItemProceso_conten_InfoData_secundary" >{subtitle}</div>
                </div>
                <div className="Container_ItemProceso_conten_secondary_seleccion_suInfor">
                    <div className="Container_ItemProceso_conten_InfoData_Descrip" >{descrip}</div>
                </div>
            </div>
            <div className="Container_ItemProceso_conten_secondary_seleccion">
                <div onClick={()=>{
                    onSelecteItem(keyitem,!isSeleteItem);
                    setisSeleteItem(!isSeleteItem);
                }} className={`Container_ItemProceso_conten_secondary_seleccion_radio${(isSeleteItem)?' active':''}`}><div></div></div>
            </div>
        </div>
    </div>);
}