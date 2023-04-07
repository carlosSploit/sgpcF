import React, { useEffect, useState } from "react";
import "./style/index.css"
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
// import {EditAdmin} from "../editEmpresas/editAdmin"
// import { useNotification } from "../../../../../../service/Notifications/useNotificacion";

export function ItemPCRecursoSalvaguard (props){
    const {
        onChange = (id_options) => {}, 
        // onSelecteItem = (id_options, stade) => {},
        subtitle,
        keyitem,
        title = '',
        descrip
    } = props;
    // const [isSeleteItem, setisSeleteItem] = useState(false);
    const [isInformation, setImformatioAmenaz] = useState(false);

    useEffect(()=>{
        // console.log(itemdate);
    },[]);

    return (
    <div className="Container_ItemPCRecursoSalvaguard_conten_Pri">
        <div className="Container_ItemPCRecursoSalvaguard_conten_secondary">
            <div className="Container_ItemPCRecursoSalvaguard_conten_secondary_header">
                <div className="Container_ItemPCRecursoSalvaguard_conten_secondary_seleccion_conten_information" onClick={()=>{
                    onChange(keyitem);
                }}>
                    <div className="Container_ItemPCRecursoSalvaguard_conten_secondary_seleccion_Infor">
                        <div className="Container_ItemPCRecursoSalvaguard_conten_InfoData_primary" >{title}</div>
                        <div className="Container_ItemPCRecursoSalvaguard_conten_InfoData_secundary" >{subtitle}</div>
                    </div>
                </div>
                <div className="Container_ItemPCRecursoSalvaguard_conten_secondary_seleccion">
                    <div onClick={()=>{
                        // onSelecteItem(keyitem,!isSeleteItem);
                        setImformatioAmenaz(!isInformation);
                    }} className={`Container_ItemPCRecursoSalvaguard_conten_secondary_seleccion_intera`}>
                        {(isInformation)?
                            <AiOutlineUp className="Container_ItemPCRecursoSalvaguard_conten_secondary_seleccion_radio_icons"  />:
                            <AiOutlineDown className="Container_ItemPCRecursoSalvaguard_conten_secondary_seleccion_radio_icons" />
                        }
                    </div>
                </div>
            </div>
        </div>
        {
            (isInformation)?
            <>
                <div className="Container_ItemPCRecursoSalvaguard_subconteiner_lainer"></div>
                <div style={{height: '5px'}}/>
                <div className="Container_ItemPCRecursoSalvaguard_subconteiner_body">
                    <div style={{height: '5px'}}/>
                    <div className="Container_ItemPCRecursoSalvaguard_subconteiner_body_title">Descripccion</div>
                    <div className="Container_ItemPCRecursoSalvaguard_subconteiner_body_subtitle">{descrip}</div>
                    <div style={{height: '5px'}}/>
                </div>
                {/* <div style={{height: '10px'}}/> */}
            </>:
            <></>   
        }
        
    </div>);
}