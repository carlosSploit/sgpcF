// import { DeleteOutlined } from "@ant-design/icons";
import React from "react";
import "./style/index.css"
// import {deletealumno} from "../../../../../../service/repository/Alumnos";
// import {EditAlumno} from "../editAlumnos/editAlumno"
// import { useNotification, handleNewNotification } from "../../../../../../service/Notifications/useNotificacion";

export function ItemValorizActivTabCuat(props){
    const {itemdate = {
        "id_activProsVerAnali": 3,
        "valorActivCuanti": 0,
        "valorActivCuali": 0,
        "id_activProc": 4,
        "nombre_Activo": "Sistema E-learning5",
        "id_tipoActiv": 227,
        "dependAbreb": "SW.sub"
    }} = props;

    return (
        <>
            <tr style={{height: "30px"}}>
                <th className="content-table-item-encabezado keyid cent" style={{width:"5%"}}>{itemdate.id_activProsVerAnali}</th>
                <th className="content-table-item-encabezado lef">{itemdate.nombre_Activo}</th>
                {/* <th className="content-table-item-encabezado lef ocp">{itemdate.nameFrecuencia}</th> */}
                <th className="content-table-item-encabezado lef ocp">{`S/.${itemdate.valorActivCuanti}`}</th>
            </tr>
        </>
    );
}