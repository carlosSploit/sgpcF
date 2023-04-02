// import { DeleteOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import "./style/index.css"
import { ComponentToolTips } from "../../../../../../service/morvius-service/component/complements/componentTooltips";
// import {deletealumno} from "../../../../../../service/repository/Alumnos";
// import {EditAlumno} from "../editAlumnos/editAlumno"
// import { useNotification, handleNewNotification } from "../../../../../../service/Notifications/useNotificacion";

export function ItemValorizActivTabCual(props){
    const {itemdate = {
        "id_activProsVerAnali": 3,
        "valorActivCuanti": 0,
        "valorActivCuali": 0,
        "id_activProc": 4,
        "nombre_Activo": "Sistema E-learning5",
        "id_tipoActiv": 227,
        "dependAbreb": "SW.sub"
    }} = props;
    const [DataNivelCrite,] = useState([
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

    const colorStadeActivCualiti = (ValCualiti) => {
        const listData = DataNivelCrite.filter((item)=>{
            const itemsRange = item.range.split(' - ');
            return (parseInt(itemsRange[0]) <= ValCualiti) && (ValCualiti <= parseInt(itemsRange[1]))
        })
        if (listData.length === 0) return '#9E9E9E'
        return listData[0].color
    }

    const LabelStadeActivCualiti = (ValCualiti) => {
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
                <th className="content-itemvaloreiActivCualiti-table-item-encabezado keyid cent" style={{width:"5%"}}>{itemdate.id_activProsVerAnali}</th>
                <th className="content-itemvaloreiActivCualiti-table-item-encabezado lef">{itemdate.nombre_Activo}</th>
                <th className="content-itemvaloreiActivCualiti-table-item-encabezado lef">
                    <div className="content-itemvaloreiActivCualiti-table-item-encabezado_chip centvalacti">
                        <ComponentToolTips asling={'center'} size={{w: 200,h: 24}} id={`x${itemdate.id_activProsVerAnali}`}
                            messege={<div style={{width: '100%', textAlign: 'center'}} >{LabelStadeActivCualiti(itemdate.valorActivCuali)}</div>}
                        >
                            <div className="content-itemvaloreiActivCualiti-table-item-encabezado_chip_item" style={{backgroundColor:`${colorStadeActivCualiti(itemdate.valorActivCuali)}`}}>{itemdate.valorActivCuali}</div>
                        </ComponentToolTips>
                    </div>
                </th>
            </tr>
        </>
    );
}