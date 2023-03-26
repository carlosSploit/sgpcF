// import { DeleteOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import "./style/index.css"
// import {deletealumno} from "../../../../../../service/repository/Alumnos";
// import {EditAlumno} from "../editAlumnos/editAlumno"
// import { useNotification, handleNewNotification } from "../../../../../../service/Notifications/useNotificacion";

export function ItemValorizAmenazTabCuat(props){
    const {itemdate = {
        "id_afectaActiv": 17,
        "id_activProsVerAnali": 37,
        "id_valorAfectAmen": 4,
        "id_Frecuencia": 2,
        "nameFrecuencia": "Frecuente",
        "valDegradCualit": 60,
        "id_DegradCualit": 3,
        "valImpacCualit": 2,
        "valImpacCuanti": 0,
        "id_ImpacCuanti": 2,
        "valRiesgoCualit": 9,
        "valRiesgoCuanti": 0,
        "id_RiesgoCuanti": 2,
        "id_amenaza": 21,
        "esenario": "",
        "abreb": "E",
        "nombreAmena": "Difusión de software dañino",
        "id_tipoActiv": 3,
        "nombreTipoActiv": "Errores y fallos no intencionados"
      }} = props;
    // const [interfaces,setinterface] = useState(null);

    // const colorStadeCualiti = (ValCualiti) => {
    //     return {
    //         "0":'#9E9E9E',
    //         "1":'#8BC34A',
    //         "2":'#8BC34A',
    //         "3":'#FFA000',
    //         "4":'#FFA000',
    //         "5":'#FFA000',
    //         "6":'#FF5722',
    //         "7":'#FF5722',
    //         "8":'#FF5722',
    //         "9":'#FF5252',
    //         "10":'#FF5252'
    //     }[ValCualiti.toString()]
    // }

    // const labelStadeCualiti = (ValCualiti) => {
    //     return {
    //         "0":'D',
    //         "1":'B',
    //         "2":'B',
    //         "3":'M',
    //         "4":'M',
    //         "5":'M',
    //         "6":'A',
    //         "7":'A',
    //         "8":'A',
    //         "9":'MA',
    //         "10":'MA'
    //     }[ValCualiti.toString()]
    // }

    return (
        <>
            <tr style={{height: "30px"}}>
                <th className="content-table-item-encabezado keyid cent" style={{width:"5%"}}>{itemdate.id_activProsVerAnali}</th>
                <th className="content-table-item-encabezado lef">{itemdate.nombreAmena}</th>
                {/* <th className="content-table-item-encabezado lef ocp">{itemdate.nameFrecuencia}</th> */}
                <th className="content-table-item-encabezado lef ocp">{itemdate.valDegradCualit}</th>
                <th className="content-table-item-encabezado lef ocp">{`S/.${itemdate.valImpacCuanti}`}</th>
                <th className="content-table-item-encabezado lef ocp">{`S/.${itemdate.valRiesgoCuanti}`}</th>
            </tr>
        </>
    );
}