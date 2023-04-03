import React, { useEffect, useState } from "react";
import "./style/index.css"
import useScreenSize from "../../../../../../service/hooks/resolution.hooks";
// import {EditAdmin} from "../editEmpresas/editAdmin"
// import { useNotification } from "../../../../../../service/Notifications/useNotificacion";

export function ItemValorSalvaguard(props){
    const {
        onChange = (id_options) => {}, 
        onSelecteItem = (id_options, stade) => {},
        keyitem,
        title,
        subtitle,
        isValorize = false
    } = props;
    const resolucion = useScreenSize()
    // const [isSeleteItem, setisSeleteItem] = useState(false);

    useEffect(()=>{
        // console.log(itemdate);
    },[]);

    return (<div className="Container_ItemValorSalvaguard_conten_Pri">
        <div className="Container_ItemValorSalvaguard_conten_secondary">
            <div className="Container_ItemValorSalvaguard_conten_secondary_seleccion_conten_information" onClick={()=>{
                onChange(keyitem);
            }}>
                 <div className="Container_ItemValorSalvaguard_conten_secondary_seleccion_Infor">
                    <div className="Container_ItemValorSalvaguard_conten_InfoData_primary" >{(title.length > 50)? title.substring(0,50) + '...':title}</div>
                    <div style={{height: '1px'}} />
                    <div className="Container_ItemValorSalvaguard_conten_InfoData_secundary" >{subtitle}</div>
                </div>
                <div className="Container_ItemValorSalvaguard_conten_secondary_seleccion_suInfor">
                    {/* <div className="Container_ItemValorSalvaguard_conten_InfoData_Descrip" >{descrip}</div> */}
                </div>
            </div>
            <div className="Container_ItemValorizeAmenaz_conten_secondary_seleccion_conten_action" >
                <div className="Container_ItemValorizeAmenaz_conten_secondary_seleccion_conten_action_botton" onClick={()=>{
                onChange(keyitem);
            }} style={{backgroundColor: `${(isValorize)?'#8BC34A':'#9E9E9E'}`}} >
                    {(resolucion.width <= 500)?'':(isValorize)?'Valorizado':'No valorizado'}
                </div>
            </div>
        </div>
    </div>);
}