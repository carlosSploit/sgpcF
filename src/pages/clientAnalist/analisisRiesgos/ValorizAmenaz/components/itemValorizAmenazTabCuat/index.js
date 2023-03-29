// import { DeleteOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import "./style/index.css"
// import {deletealumno} from "../../../../../../service/repository/Alumnos";
// import {EditAlumno} from "../editAlumnos/editAlumno"
// import { useNotification, handleNewNotification } from "../../../../../../service/Notifications/useNotificacion";

export function ItemValorizAmenazTabCuat(props){
    const {itemdate = {
        "id_afectaActiv": 20,
        "id_activProsVerAnali": 37,
        "valoriActivCuanti": 2000,
        "valoriActivCualiti": 6,
        "id_valorAfectAmen": 3,
        "id_Frecuencia": 2,
        "valorFrecuenCuali": 4,
        "valorFrecuenCuanti": 10,
        "nameFrecuencia": "Frecuente",
        "valDegradCualit": 90,
        "id_DegradCualit": 2,
        "valImpacCualit": 5,
        "valImpacCuanti": 1800,
        "valRiesgoCualit": 20,
        "valRiesgoCuanti": 18000,
        "id_amenaza": 39,
        "esenario": "Cuando a el navegador web le injectan un virus por descargar archivos maliciososos.",
        "abreb": "A",
        "nombreAmena": "Difusión de software dañino",
        "id_tipoActiv": 4,
        "nombreTipoActiv": "Ataques intencionados"
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
                <th className="content-table-item-encabezado keyid cent" style={{width:"5%"}}>{itemdate.id_afectaActiv}</th>
                <th className="content-table-item-encabezado lef">{itemdate.nombreAmena}</th>
                {/* <th className="content-table-item-encabezado lef ocp">{itemdate.nameFrecuencia}</th> */}
                <th className="content-table-item-encabezado lef ocp">{itemdate.valDegradCualit}</th>
                <th className="content-table-item-encabezado lef ocp">{`S/.${itemdate.valImpacCuanti}`}</th>
                <th className="content-table-item-encabezado lef ocp">{`${itemdate.valorFrecuenCuanti}`}</th>
                <th className="content-table-item-encabezado lef ocp">{`S/.${itemdate.valRiesgoCuanti}`}</th>
            </tr>
        </>
    );
}