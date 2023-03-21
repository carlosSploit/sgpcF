// import { DeleteOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import "./style/index.css"
// import {deletealumno} from "../../../../../../service/repository/Alumnos";
// import {EditAlumno} from "../editAlumnos/editAlumno"
// import { useNotification, handleNewNotification } from "../../../../../../service/Notifications/useNotificacion";

export function ItemValorizAmenazTabCual(props){
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
    const [DataRiesgo,setDataRiesgo] = useState([
        {
            key : 1,
            code: 'C',
            label: 'Controlable',
            range: '0 - 0',
            color: '#9E9E9E'
        },
        {
            key : 2,
            code: 'A',
            label: 'Aceptable',
            range: '1 - 5',
            color: '#8BC34A'
        },
        {
            key : 3,
            code: 'T',
            label: 'Tolerable',
            range: '6 - 16',
            color: '#FFA000'
        },
        {
            key : 4,
            code: 'I',
            label: 'Intolerable',
            range: '17 - 30',
            color: '#FF5722'
        },
        {
            key : 5,
            code: 'E',
            label: 'Extremo',
            range: '31 - 50',
            color: '#FF5252'
        }
    ]);

    const colorStadeDegradCualiti = (ValCualiti) => {
        return {
            "0":'#9E9E9E',
            "10":'#9E9E9E',
            "20":'#8BC34A',
            "30":'#8BC34A',
            "40":'#FFA000',
            "50":'#FFA000',
            "60":'#FFA000',
            "70":'#FF5722',
            "80":'#FF5722',
            "90":'#FF5252',
            "100":'#FF5252'
        }[ValCualiti.toString()]
    }

    const labelStadeDegradCualiti = (ValCualiti) => {
        return {
            "0":'D',
            "10":'D',
            "20":'B',
            "30":'B',
            "40":'M',
            "50":'M',
            "60":'M',
            "70":'A',
            "80":'A',
            "90":'MA',
            "100":'MA'
        }[ValCualiti.toString()]
    }

    const colorStadeImpactCualiti = (ValCualiti) => {
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

    const labelStadeImpactCualiti = (ValCualiti) => {
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

    const colorStadeRiesgCualiti = (ValCualiti) => {
        const listData = DataRiesgo.filter((item)=>{
            const itemsRange = item.range.split(' - ');
            return (parseInt(itemsRange[0]) <= ValCualiti) && (ValCualiti <= parseInt(itemsRange[0]))
        })
        if (listData.length === 0) return '#9E9E9E'
        return listData[0].color
    }

    const labelStadeRiesgCualiti = (ValCualiti) => {
        const listData = DataRiesgo.filter((item)=>{
            const itemsRange = item.range.split(' - ');
            return (parseInt(itemsRange[0]) <= ValCualiti) && (ValCualiti <= parseInt(itemsRange[0]))
        })
        if (listData.length === 0) return 'C'
        return listData[0].code
    }

    useEffect(()=>{
        console.log(itemdate)
    },[])

    return (
        <>
            <tr style={{height: "30px"}}>
                <th className="content-table-item-encabezado keyid cent" style={{width:"5%"}}>{itemdate.id_afectaActiv}</th>
                <th className="content-table-item-encabezado lef">{itemdate.nombreAmena}</th>
                <th className="content-table-item-encabezado lef ocp">
                    <div className="content-table-item-encabezado_chip ">
                        <div style={{backgroundColor:`${colorStadeDegradCualiti(itemdate.valDegradCualit)}`}}>{labelStadeDegradCualiti(itemdate.valDegradCualit)}</div>
                    </div>
                </th>
                <th className="content-table-item-encabezado lef ocp">
                    <div className="content-table-item-encabezado_chip ">
                        <div style={{backgroundColor:`${colorStadeImpactCualiti(itemdate.valImpacCualit)}`}}>{labelStadeImpactCualiti(itemdate.valImpacCualit)}</div>
                    </div>
                </th>
                <th className="content-table-item-encabezado lef ocp">
                    <div className="content-table-item-encabezado_chip ">
                        <div style={{backgroundColor:`${colorStadeRiesgCualiti(itemdate.id_RiesgoCuanti)}`}}>{labelStadeRiesgCualiti(itemdate.valRiesgoCualit)}</div>
                    </div>
                </th>
            </tr>
        </>
    );
}