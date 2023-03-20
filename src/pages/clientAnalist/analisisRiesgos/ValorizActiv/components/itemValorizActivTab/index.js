// import { DeleteOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import "./style/index.css"
// import {deletealumno} from "../../../../../../service/repository/Alumnos";
// import {EditAlumno} from "../editAlumnos/editAlumno"
// import { useNotification, handleNewNotification } from "../../../../../../service/Notifications/useNotificacion";

export function ItemValorizActivTab(props){
    const {itemdate = {
        "id_activProsVerAnali": 3,
        "valorActivCuanti": 0,
        "valorActivCuali": 0,
        "id_activProc": 4,
        "nombre_Activo": "Sistema E-learning5",
        "id_tipoActiv": 227,
        "dependAbreb": "SW.sub"
      }} = props;
    // const [interfaces,setinterface] = useState(null);

    const colorStadeCualiti = (ValCualiti) => {
        return {
            "0":'#9E9E9E',
            "1":'#8BC34A',
            "2":'#8BC34A',
            "3":'#FFA000',
            "4":'#FFA000',
            "5":'#FFA000',
            "6":'#FF5722',
            "7":'#FF5722',
            "8":'#FF5722',
            "9":'#FF5252',
            "10":'#FF5252'
        }[ValCualiti.toString()]
    }

    const labelStadeCualiti = (ValCualiti) => {
        return {
            "0":'D',
            "1":'B',
            "2":'B',
            "3":'M',
            "4":'M',
            "5":'M',
            "6":'A',
            "7":'A',
            "8":'A',
            "9":'MA',
            "10":'MA'
        }[ValCualiti.toString()]
    }

    return (
        <>
            <tr style={{height: "30px"}}>
                <th className="content-table-item-encabezado keyid cent" style={{width:"5%"}}>{itemdate.id_activProsVerAnali}</th>
                <th className="content-table-item-encabezado lef">{itemdate.dependAbreb}</th>
                <th className="content-table-item-encabezado lef ocp">{itemdate.nombre_Activo}</th>
                <th className="content-table-item-encabezado lef ocp">{`S/.${itemdate.valorActivCuanti}`}</th>
                <th className="content-table-item-encabezado lef ocp">
                    <div className="content-table-item-encabezado_chip ">
                        <div style={{backgroundColor:`${colorStadeCualiti(itemdate.valorActivCuali)}`}}>{labelStadeCualiti(itemdate.valorActivCuali)}</div>
                    </div>
                </th>
            </tr>
        </>
    );
}