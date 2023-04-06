import React, { useEffect, useState } from "react";
import "./style/index.css"
// import {EditAdmin} from "../editEmpresas/editAdmin"
// import { useNotification } from "../../../../../../service/Notifications/useNotificacion";

export function ItemPCAmenazsas(props){
    const {
        onChange = (id_options) => {},
        // onSelecteItem = (id_options, stade) => {},
        keyitem,
        title,
        subtitle,
        valor
    } = props;
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

    useEffect(()=>{
        // console.log(itemdate);
    },[]);

    const colorStadeRiesgCualiti = (ValCualiti) => {
        if (ValCualiti == '??') return '#9E9E9E'
        console.log(`valor: ${ValCualiti}`)
        const listData = DataRiesgo.filter((item)=>{
            const itemsRange = item.range.split(' - ');
            console.log(`(${parseInt(itemsRange[0])} <= ${ValCualiti}) && (${ValCualiti} <= ${parseInt(itemsRange[1])}`)
            return (parseInt(itemsRange[0]) <= ValCualiti) && (ValCualiti <= parseInt(itemsRange[1]))
        })
        console.log(listData)
        if (listData.length === 0) return '#9E9E9E'
        return listData[0].color
    }

    return (
    <>
        <div className="Container_ItemPCAmenazsas_conten_Pri">
            <div className="Container_ItemPCAmenazsas_conten_secondary">
                <div className="Container_ItemPCAmenazsas_conten_secondary_conte">
                    <div className="Container_ItemPCAmenazsas_conten_secondary_seleccion_conten_information" onClick={()=>{
                        onChange(keyitem);
                    }}>
                        <div className="Container_ItemPCAmenazsas_conten_secondary_seleccion_Infor">
                            <div className="Container_ItemPCAmenazsas_conten_InfoData_primary" >{title}</div>
                            <div style={{height: '1px'}} />
                            <div className="Container_ItemPCAmenazsas_conten_InfoData_secundary" >{subtitle}</div>
                        </div>
                        <div className="Container_ItemPCAmenazsas_conten_secondary_seleccion_suInfor">
                            {/* <div className="Container_ItemPCAmenazsas_conten_InfoData_Descrip" >{descrip}</div> */}
                        </div>
                    </div>
                    <div className="Container_ItemPCAmenazsas_conten_secondary_information">
                        <div className={`Container_ItemPCAmenazsas_conten_secondary_information_dat`} style={{backgroundColor: `${colorStadeRiesgCualiti(valor)}`}} >
                            {valor}
                        </div>
                    </div>
                </div>
                {/* <div className="Container_ItemPCAmenazsas_conten_secondary_seleccion">
                    <div onClick={()=>{
                        onSelecteItem(keyitem,!isSeleteItem);
                        setisSeleteItem(!isSeleteItem);
                    }} className={`Container_ItemPCAmenazsas_conten_secondary_seleccion_radio${(isSeleteItem)?' active':''}`}><div></div></div>
                </div> */}
            </div>
        </div>
    </>
    );
}