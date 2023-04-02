// import { DeleteOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import "./style/index.css"
import { ComponentToolTips } from "../../../../../../service/morvius-service/component/complements/componentTooltips";
// import {deletealumno} from "../../../../../../service/repository/Alumnos";
// import {EditAlumno} from "../editAlumnos/editAlumno"
// import { useNotification, handleNewNotification } from "../../../../../../service/Notifications/useNotificacion";

export function ItemValorizAmenazTabCual(props){
    const {isLabel= false, itemdate = {
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
    const [DataDegrad,] = useState([
        {
            key : 1,
            code: 'D',
            label: 'Despresiable',
            range: '0 - 10',
            color: '#9E9E9E'
        },
        {
            key : 2,
            code: 'B',
            label: 'Bajo',
            range: '20 - 30',
            color: '#8BC34A'
        },
        {
            key : 3,
            code: 'M',
            label: 'Medio',
            range: '40 - 60',
            color: '#FFA000'
        },
        {
            key : 4,
            code: 'A',
            label: 'Alto',
            range: '70 - 80',
            color: '#FF5722'
        },
        {
            key : 5,
            code: 'MA',
            label: 'Muy Alto',
            range: '90 - 100',
            color: '#FF5252'
        }
    ]);
    const [DataImpacto,] = useState([
        {
            key : 1,
            code: 'D',
            label: 'Despresiable',
            range: '0 - 0',
            color: '#9E9E9E'
        },
        {
            key : 2,
            code: 'B',
            label: 'Bajo',
            range: '1 - 2',
            color: '#8BC34A'
        },
        {
            key : 3,
            code: 'M',
            label: 'Medio',
            range: '3 - 5',
            color: '#FFA000'
        },
        {
            key : 4,
            code: 'A',
            label: 'Alto',
            range: '6 - 8',
            color: '#FF5722'
        },
        {
            key : 5,
            code: 'MA',
            label: 'Muy Alto',
            range: '9 - 10',
            color: '#FF5252'
        }
    ]);
    const [DataRiesgo,] = useState([
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

    const [DataFrecuend ,] = useState([
        {
            key : 1,
            code: 'MB',
            label: 'Muy poco frecuente',
            valor : 1,
            color: '#9E9E9E'
        },
        {
            key : 2,
            code: 'PP',
            label: 'Poco frecuente',
            valor : 2,
            color: '#8BC34A'
        },
        {
            key : 3,
            code: 'P',
            label: 'Posible',
            valor : 3,
            color: '#FFA000'
        },
        {
            key : 4,
            code: 'F',
            label: 'Frecuente',
            valor : 4,
            color: '#FF5722'
        },
        {
            key : 5,
            code: 'MF',
            label: 'Muy frecuente',
            valor : 5,
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
        const listData = DataImpacto.filter((item)=>{
            const itemsRange = item.range.split(' - ');
            return (parseInt(itemsRange[0]) <= ValCualiti) && (ValCualiti <= parseInt(itemsRange[1]))
        })
        if (listData.length === 0) return 'D - Despresiable'
        return listData[0].code + ' - ' + listData[0].label
    }

    const colorStadeRiesgCualiti = (ValCualiti) => {
        const listData = DataRiesgo.filter((item)=>{
            const itemsRange = item.range.split(' - ');
            return (parseInt(itemsRange[0]) <= ValCualiti) && (ValCualiti <= parseInt(itemsRange[1]))
        })
        if (listData.length === 0) return '#9E9E9E'
        return listData[0].color
    }

    const colorStadeFrecuentCualiti = (idFrecuen = 0) => {
        const listData = DataFrecuend.filter((item)=>{
            return parseInt(item.valor) === parseInt(idFrecuen)
        })
        if (listData.length === 0) return '#9E9E9E'
        return listData[0].color
    }

    const LabelDegradCualiti = (ValCualiti) => {
        const listData = DataDegrad.filter((item)=>{
            const itemsRange = item.range.split(' - ');
            return (parseInt(itemsRange[0]) <= ValCualiti) && (ValCualiti <= parseInt(itemsRange[1]))
        })
        if (listData.length === 0) return 'D - Despresiable'
        return listData[0].code + ' - ' + listData[0].label
    }

    const labelStadeRiesgCualiti = (ValCualiti) => {
        const listData = DataRiesgo.filter((item)=>{
            const itemsRange = item.range.split(' - ');
            return (parseInt(itemsRange[0]) <= ValCualiti) && (ValCualiti <= parseInt(itemsRange[1]))
        })
        if (listData.length === 0) return 'C'
        return listData[0].code + ' - ' + listData[0].label
    }

    const labelStadeFrecuenCualiti = (idFrecuen) => {
        const listData = DataFrecuend.filter((item)=>{
            return parseInt(item.valor) === parseInt(idFrecuen)
        })
        if (listData.length === 0) return 'MB'
        return listData[0].code + ' - ' + listData[0].label
    }

    useEffect(()=>{
        console.log(itemdate)
    },[])

    return (
        <>
            <tr style={{height: "30px"}}>
                <th className="content-ValoriRiesgo-table-item-encabezado keyid cent" style={{width:"5%"}}>{itemdate.id_afectaActiv}</th>
                <th className="content-ValoriRiesgo-table-item-encabezado lef">{itemdate.nombreAmena}</th>
                <th className="content-ValoriRiesgo-table-item-encabezado lef ocp">
                    <div className="content-ValoriRiesgo-table-item-encabezado_chip ">
                        <ComponentToolTips asling={'center'} size={{w: 200,h: 24}} id={`x${itemdate.id_activProsVerAnali}`}
                            messege={<div style={{width: '100%', textAlign: 'center'}} >{LabelDegradCualiti(itemdate.valDegradCualit)}</div>}
                        >
                            <div className="content-ValoriRiesgo-table-item-encabezado_chip_item" style={{backgroundColor:`${colorStadeDegradCualiti(itemdate.valDegradCualit)}`}}>{itemdate.valDegradCualit}</div>
                        </ComponentToolTips>
                    </div>
                </th>
                <th className="content-ValoriRiesgo-table-item-encabezado lef ocp">
                    <div className="content-ValoriRiesgo-table-item-encabezado_chip ">
                        <ComponentToolTips asling={'center'} size={{w: 200,h: 24}} id={`x${itemdate.id_activProsVerAnali}`}
                            messege={<div style={{width: '100%', textAlign: 'center'}} >{labelStadeImpactCualiti(itemdate.valImpacCualit)}</div>}
                        >
                            <div className="content-ValoriRiesgo-table-item-encabezado_chip_item" style={{backgroundColor:`${colorStadeImpactCualiti(itemdate.valImpacCualit)}`}}>{itemdate.valImpacCualit}</div>
                        </ComponentToolTips>
                    </div>
                </th>
                <th className="content-ValoriRiesgo-table-item-encabezado lef ocp">
                    <div className="content-ValoriRiesgo-table-item-encabezado_chip ">
                        <ComponentToolTips asling={'center'} size={{w: 200,h: 24}} id={`x${itemdate.id_activProsVerAnali}`}
                            messege={<div style={{width: '100%', textAlign: 'center'}} >{labelStadeFrecuenCualiti(itemdate.valorFrecuenCuali)}</div>}
                        >
                            <div className="content-ValoriRiesgo-table-item-encabezado_chip_item" style={{backgroundColor:`${colorStadeFrecuentCualiti(itemdate.valorFrecuenCuali)}`}}>{itemdate.valorFrecuenCuali}</div>
                        </ComponentToolTips>
                    </div>
                </th>
                <th className="content-ValoriRiesgo-table-item-encabezado lef ocp">
                    <div className="content-ValoriRiesgo-table-item-encabezado_chip ">
                        <ComponentToolTips asling={'center'} size={{w: 200,h: 24}} id={`x${itemdate.id_activProsVerAnali}`}
                            messege={<div style={{width: '100%', textAlign: 'center'}} >{labelStadeRiesgCualiti(itemdate.valRiesgoCualit)}</div>}
                        >
                            <div className="content-ValoriRiesgo-table-item-encabezado_chip_item" style={{backgroundColor:`${colorStadeRiesgCualiti(itemdate.valRiesgoCualit)}`}}>{itemdate.valRiesgoCualit}</div>
                        </ComponentToolTips>
                        
                    </div>
                </th>
            </tr>
        </>
    );
}