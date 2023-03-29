// import { DeleteOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import "./style/index.css"
// import {deletealumno} from "../../../../../../service/repository/Alumnos";
// import {EditAlumno} from "../editAlumnos/editAlumno"
// import { useNotification, handleNewNotification } from "../../../../../../service/Notifications/useNotificacion";

export function ItemValorizAmenazTabCuat(props){
    const {itemdate = {
        "id_salvAfectAct": 17,
        "id_afectaActiv": 20,
        "id_salvaguarda": 11,
        "id_activProsVerAnali": 37,
        "id_escalEficDegr": 1,
        "valEficDegr": 90,
        "id_escalEficFrec": 3,
        "valEficFrec": 40,
        "id_escalEficImpac": 1,
        "valEficImpac": 40,
        "valDegraResidCuali": 0.07,
        "id_escalDegradResidCuali": 5,
        "valEscalFrecuenResidCuanti": 6,
        "valEscalFrecuenResidCuali": 2.4,
        "id_escalFrecuenResid": 3,
        "valImpactResidCuanti": 1080,
        "valRiesgResidCuanti": 6480,
        "id_empresa": 1,
        "abrebsalv": "H.tools.TM",
        "descripc": "Herramienta de monitorización de tráfico",
        "id_control": 12,
        "codeDepende": "6.2",
        "DescripccionControl": "Dispositivos para movilidad y teletrabajo",
        "extrategia": "ghhsga dhsgjdas dhasgdasd ashdgas hgdhg   hgjhg hjsgd hgash dgasdas h dsahdas hdgashd sghdg ashdgash",
        "valImpactResidCuali": 0.4,
        "valRiesgResidCuali": 2
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
                <th className="content-table-item-encabezado keyid cent" style={{width:"5%"}}>{itemdate.id_salvAfectAct}</th>
                <th className="content-table-item-encabezado lef">{itemdate.descripc}</th>
                {/* <th className="content-table-item-encabezado lef ocp">{itemdate.nameFrecuencia}</th> */}
                <th className="content-table-item-encabezado lef ocp">{itemdate.valEficImpac}</th>
                <th className="content-table-item-encabezado lef ocp">{itemdate.valEscalFrecuenResidCuanti}</th>
                <th className="content-table-item-encabezado lef ocp">{`S/.${itemdate.valImpactResidCuanti}`}</th>
                <th className="content-table-item-encabezado lef ocp">{`S/.${itemdate.valRiesgResidCuanti}`}</th>
            </tr>
        </>
    );
}