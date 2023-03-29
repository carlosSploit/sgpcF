// import { DeleteOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import "./style/index.css"
// import {deletealumno} from "../../../../../../service/repository/Alumnos";
// import {EditAlumno} from "../editAlumnos/editAlumno"
// import { useNotification, handleNewNotification } from "../../../../../../service/Notifications/useNotificacion";

export function ItemValorizAmenazTabCual(props){
    const {isLabel = true , itemdate = {
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
    // const [labelDegradResid, setlabelDegradResid] = useState('');
    // const [labelFrecuResid, setlabelFrecuResid] = useState('');
    // const [labelImpactResid, setlabelImpactResid] = useState('');
    // const [labelRiesgResid, setlabelRiesgResid] = useState('');
    // useEffect(()=>{
    //     setlabelDegradResid()
    // },[])

    // REALIZAR UN HOVER CON LA INFORMACION
    
    const [DataDegradResid ,] = useState([
        {
            key : 1,
            code: 'D',
            label: 'Despresiable',
            range: '0 - 0.14',
            color: '#9E9E9E'
        },
        {
            key : 2,
            code: 'B',
            label: 'Bajo',
            range: '0.15 - 0.32',
            color: '#8BC34A'
        },
        {
            key : 3,
            code: 'M',
            label: 'Medio',
            range: '0.35 - 0.64',
            color: '#FFA000'
        },
        {
            key : 4,
            code: 'A',
            label: 'Alto',
            range: '0.7 - 0.81',
            color: '#FF5722'
        },
        {
            key : 5,
            code: 'MA',
            label: 'Muy Alto',
            range: '0.9 - 1',
            color: '#FF5252'
        }
    ]);

    const [DataFrecuenResid ,] = useState([
        {
            key : 1,
            code: 'D',
            label: 'Despresiable',
            range: '0 - 0.4',
            color: '#9E9E9E'
        },
        {
            key : 2,
            code: 'B',
            label: 'Bajo',
            range: '0.5 - 1.4',
            color: '#8BC34A'
        },
        {
            key : 3,
            code: 'M',
            label: 'Medio',
            range: '1.5 - 2.4',
            color: '#FFA000'
        },
        {
            key : 4,
            code: 'A',
            label: 'Alto',
            range: '2.5 - 3.4',
            color: '#FF5722'
        },
        {
            key : 5,
            code: 'MA',
            label: 'Muy Alto',
            range: '3.5 - 5',
            color: '#FF5252'
        }
    ]);

    const [DataImpactResid ,] = useState([
        {
            key : 1,
            code: 'D',
            label: 'Despresiable',
            range: '0 - 0.4',
            value: 1,
            color: '#9E9E9E'
        },
        {
            key : 2,
            code: 'B',
            label: 'Bajo',
            range: '0.5 - 1.4',
            value: 2,
            color: '#8BC34A'
        },
        {
            key : 3,
            code: 'M',
            label: 'Medio',
            range: '1.5 - 2.4',
            value: 3,
            color: '#FFA000'
        },
        {
            key : 4,
            code: 'A',
            label: 'Alto',
            range: '2.5 - 3.4',
            value: 4,
            color: '#FF5722'
        },
        {
            key : 5,
            code: 'MA',
            label: 'Muy Alto',
            range: '3.5 - 5',
            value: 5,
            color: '#FF5252'
        }
    ])
    
    const [DataRiesgoResid ,] = useState([
        {
            key : 1,
            code: 'C',
            label: 'Controlable',
            range: '1 - 5',
            color: '#9E9E9E'
        },
        {
            key : 2,
            code: 'A',
            label: 'Aceptable',
            range: '6 - 10',
            color: '#8BC34A'
        },
        {
            key : 3,
            code: 'T',
            label: 'Tolerable',
            range: '11 - 15',
            color: '#FFA000'
        },
        {
            key : 4,
            code: 'I',
            label: 'Intolerable',
            range: '16 - 20',
            color: '#FF5722'
        },
        {
            key : 5,
            code: 'E',
            label: 'Extremo',
            range: '21 - 25',
            color: '#FF5252'
        }
    ]);

    const colorStadeDegradCualiti = (ValCualiti) => {
        const listData = DataDegradResid.filter((item)=>{
            const itemsRange = item.range.split(' - ');
            return (parseFloat(parseFloat(itemsRange[0]).toFixed(1)) <= ValCualiti) && (ValCualiti <= parseFloat(parseFloat(itemsRange[1]).toFixed(1)))
        })
        if (listData.length === 0) return '#9E9E9E'
        return listData[0].color
    }

    const labelStadeDegradCualiti = (ValCualiti) => {
        return (Math.round(ValCualiti * 10) * 10)
    }

    const colorStadeFrecunCualiti = (ValCualiti) => {
        const listData = DataFrecuenResid.filter((item)=>{
            const itemsRange = item.range.split(' - ');
            return (parseFloat(parseFloat(itemsRange[0]).toFixed(1)) <= ValCualiti) && (ValCualiti <= parseFloat(parseFloat(itemsRange[1]).toFixed(1)))
        })
        if (listData.length === 0) return '#9E9E9E'
        return listData[0].color
    }

    const labelStadeFrecunCualiti = (ValCualiti) => {
        if (!isLabel) return Math.round(ValCualiti)
        const listData = DataFrecuenResid.filter((item)=>{
            const itemsRange = item.range.split(' - ');
            return (parseFloat(parseFloat(itemsRange[0]).toFixed(1)) <= ValCualiti) && (ValCualiti <= parseFloat(parseFloat(itemsRange[1]).toFixed(1)))
        })
        if (listData.length === 0) return 'D'
        return listData[0].code
    }

    const colorStadeImpactCualiti = (ValCualiti) => {
        const listData = DataImpactResid.filter((item)=>{
            const itemsRange = item.range.split(' - ');
            return (parseFloat(parseFloat(itemsRange[0]).toFixed(1)) <= ValCualiti) && (ValCualiti <= parseFloat(parseFloat(itemsRange[1]).toFixed(1)))
        })
        if (listData.length === 0) return '#9E9E9E'
        return listData[0].color
    }

    const labelStadeImpactCualiti = (ValCualiti) => {
        const listData = DataImpactResid.filter((item)=>{
            const itemsRange = item.range.split(' - ');
            return (parseFloat(parseFloat(itemsRange[0]).toFixed(1)) <= ValCualiti) && (ValCualiti <= parseFloat(parseFloat(itemsRange[1]).toFixed(1)))
        })
        if (listData.length === 0) return 'D'
        return (!isLabel)? listData[0].value : listData[0].code
    }

    const colorStadeRiesgCualiti = (ValCualiti) => {
        const listData = DataRiesgoResid.filter((item)=>{
            const itemsRange = item.range.split(' - ');
            return (parseFloat(parseFloat(itemsRange[0]).toFixed(1)) <= ValCualiti) && (ValCualiti <= parseFloat(parseFloat(itemsRange[1]).toFixed(1)))
        })
        if (listData.length === 0) return '#9E9E9E'
        return listData[0].color
    }

    const labelStadeRiesgCualiti = (ValCualiti) => {
        if (!isLabel) return ValCualiti
        const listData = DataRiesgoResid.filter((item)=>{
            const itemsRange = item.range.split(' - ');
            return (parseFloat(parseFloat(itemsRange[0]).toFixed(1)) <= ValCualiti) && (ValCualiti <= parseFloat(parseFloat(itemsRange[1]).toFixed(1)))
        })
        if (listData.length === 0) return 'D'
        return listData[0].code
    }

    useEffect(()=>{
        console.log(itemdate)
    },[])

    return (
        <>
            <tr style={{height: "30px"}}>
                <th className="content-table-item-encabezado keyid cent" style={{width:"5%"}}>{itemdate.id_salvAfectAct}</th>
                <th className="content-table-item-encabezado lef">{itemdate.descripc}</th>
                <th className="content-table-item-encabezado lef ocp">
                    <div className="content-table-item-encabezado_chip ">
                        <div style={{backgroundColor:`${colorStadeDegradCualiti(itemdate.valDegraResidCuali)}`}}>{labelStadeDegradCualiti(itemdate.valDegraResidCuali)}</div>
                    </div>
                </th>
                <th className="content-table-item-encabezado lef ocp">
                    <div className="content-table-item-encabezado_chip ">
                        <div style={{backgroundColor:`${colorStadeFrecunCualiti(itemdate.valEscalFrecuenResidCuali)}`}}>{labelStadeFrecunCualiti(itemdate.valEscalFrecuenResidCuali)}</div>
                    </div>
                </th>
                <th className="content-table-item-encabezado lef ocp">
                    <div className="content-table-item-encabezado_chip ">
                        <div style={{backgroundColor:`${colorStadeImpactCualiti(itemdate.valImpactResidCuali)}`}}>{labelStadeImpactCualiti(itemdate.valImpactResidCuali)}</div>
                    </div>
                </th>
                <th className="content-table-item-encabezado lef ocp">
                    <div className="content-table-item-encabezado_chip ">
                        <div style={{backgroundColor:`${colorStadeRiesgCualiti(itemdate.valRiesgResidCuali)}`}}>{labelStadeRiesgCualiti(itemdate.valRiesgResidCuali)}</div>
                    </div>
                </th>
            </tr>
        </>
    );
}