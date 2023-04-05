import React, { useEffect } from "react";
import "./style/index.css"
// import {EditAdmin} from "../editEmpresas/editAdmin"
// import { useNotification } from "../../../../../../service/Notifications/useNotificacion";

export function ItemPCAreasEmpresa(props){
    const {
        onChange = (id_options) => {},
        // onSelecteItem = (id_options, stade) => {},
        keyitem,
        title,subtitle,descrip
    } = props;
    // const [isSeleteItem, setisSeleteItem] = useState(false);

    useEffect(()=>{
        // console.log(itemdate);
    },[]);

    return (
    <div className="Container_itemPCAreasEmpresa_conten_Pri">
        <div className="Container_itemPCAreasEmpresa_conten_secondary">
            <div className="Container_itemPCAreasEmpresa_conten_secondary_conte">
                <div className="Container_itemPCAreasEmpresa_conten_secondary_seleccion_conten_information" onClick={()=>{
                    onChange(keyitem);
                }}>
                    <div className="Container_itemPCAreasEmpresa_conten_secondary_seleccion_Infor">
                        <div className="Container_itemPCAreasEmpresa_conten_InfoData_primary" >{title}</div>
                        <div style={{height: '1px'}} />
                        <div className="Container_itemPCAreasEmpresa_conten_InfoData_secundary" >{subtitle}</div>
                    </div>
                    <div className="Container_itemPCAreasEmpresa_conten_secondary_seleccion_suInfor">
                        {/* <div className="Container_itemPCAreasEmpresa_conten_InfoData_Descrip" >{descrip}</div> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}