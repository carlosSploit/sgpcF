// import { DeleteOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import "./style/index.css"
import { ComponentToolTips } from "../../../../../../service/morvius-service/component/complements/componentTooltips";
// import {deletealumno} from "../../../../../../service/repository/Alumnos";
// import {EditAlumno} from "../editAlumnos/editAlumno"
// import { useNotification, handleNewNotification } from "../../../../../../service/Notifications/useNotificacion";

export function ItemValorizActivTabCual(props){
    const {itemdate = {
        "id_proceso": 2,
        "nombreProce": "Proceso de Creacion de Cursos",
        "descripccion": "Proceso donde un procesor dicta el cursos en un sistema E-learning a un alumnos.",
        "id_gerarProc": 2,
        "nombre": "Proceso",
        "id_tipProce": 2,
        "nombreTip": "Procesos de apoyo",
        "isDepProcPadre": 0,
        "id_DepentProc": 0,
        "valorProces": 25
    }} = props;
    const [DataNivelCrite,] = useState([
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

    const colorStadeActivCualiti = (ValCualiti) => {
        if (ValCualiti == "??") return '#9E9E9E'
        const listData = DataNivelCrite.filter((item)=>{
            const itemsRange = item.range.split(' - ');
            return (parseInt(itemsRange[0]) <= ValCualiti) && (ValCualiti <= parseInt(itemsRange[1]))
        })
        if (listData.length === 0) return '#9E9E9E'
        return listData[0].color
    }

    const LabelStadeActivCualiti = (ValCualiti) => {
        if (ValCualiti == "??") return 'Desconocido'
        const listData = DataNivelCrite.filter((item)=>{
            const itemsRange = item.range.split(' - ');
            return (parseInt(itemsRange[0]) <= ValCualiti) && (ValCualiti <= parseInt(itemsRange[1]))
        })
        if (listData.length === 0) return 'D - Despresiable'
        return listData[0].code + ' - ' + listData[0].label
    }

    useEffect(()=>{
        console.log(itemdate)
    },[])

    return (
        <>
            <tr style={{height: "30px"}}>
                <th className="content-itemvaloreiActivCualiti-table-item-encabezado keyid cent" style={{width:"5%"}}>{itemdate.id_proceso}</th>
                <th className="content-itemvaloreiActivCualiti-table-item-encabezado lef">{itemdate.nombreProce}</th>
                <th className="content-itemvaloreiActivCualiti-table-item-encabezado lef">
                    <div className="content-itemvaloreiActivCualiti-table-item-encabezado_chip centvalacti">
                        <ComponentToolTips asling={'center'} size={{w: 200,h: 24}} id={`x${itemdate.id_proceso}`}
                            messege={<div style={{width: '100%', textAlign: 'center'}} >{LabelStadeActivCualiti(itemdate.valorProces)}</div>}
                        >
                            <div className="content-itemvaloreiActivCualiti-table-item-encabezado_chip_item" style={{backgroundColor:`${colorStadeActivCualiti(itemdate.valorProces)}`}}>{itemdate.valorProces}</div>
                        </ComponentToolTips>
                    </div>
                </th>
            </tr>
        </>
    );
}