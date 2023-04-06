import React, { useEffect, useState } from "react";
import "./style/index.css"
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { ItemPCAmenazsas } from "./components/itemPCAmenazsas";
import { InformationAmenaz } from "./components/InformatAmenazsas";
// import {EditAdmin} from "../editEmpresas/editAdmin"
// import { useNotification } from "../../../../../../service/Notifications/useNotificacion";

export function ItemPCActivoEmpresa(props){
    const {
        onChange = (id_options) => {},
        // onSelecteItem = (id_options, stade) => {},
        keyitem,
        title,
        subtitle,
        dataGeneral,
        // children,
        valor = 0
    } = props;
    const [informacionAfectActiv, setinformacionAfectActiv] = useState(0);
    const [isSeleteItem, setisSeleteItem] = useState(false);
    const [ismodalvisible, setismodalvisible] = useState(false);

    useEffect(()=>{
        // console.log(itemdate);
    },[]);

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

    return (
    <>
        <div className="Container_itemPCActivoEmpresa_conten_Pri">
            <div className="Container_itemPCActivoEmpresa_conten_secondary">
                <div className="Container_itemPCActivoEmpresa_conten_secondary_conte">
                    <div className="Container_itemPCActivoEmpresa_conten_secondary_seleccion_conten_information" onClick={()=>{
                        onChange(keyitem);
                    }}>
                        <div className="Container_itemPCActivoEmpresa_conten_secondary_seleccion_Infor">
                            <div className="Container_itemPCActivoEmpresa_conten_InfoData_primary" >{title}</div>
                            <div style={{height: '1px'}} />
                            <div className="Container_itemPCActivoEmpresa_conten_InfoData_secundary" >{subtitle}</div>
                        </div>
                        <div className="Container_itemPCActivoEmpresa_conten_secondary_seleccion_suInfor">
                            {/* <div className="Container_itemPCActivoEmpresa_conten_InfoData_Descrip" >{descrip}</div> */}
                        </div>
                    </div>
                    <div className="Container_itemPCActivoEmpresa_conten_secondary_information">
                        <div className={`Container_itemPCActivoEmpresa_conten_secondary_information_dat`} style={{backgroundColor: `${colorStadeActivCualiti(valor)}`}} >
                            {valor}
                        </div>
                    </div>
                    <div className="Container_itemPCActivoEmpresa_conten_secondary_seleccion">
                        <div onClick={()=>{
                            // onSelecteItem(keyitem,!isSeleteItem);
                            setisSeleteItem(!isSeleteItem);
                        }} className={`Container_itemPCActivoEmpresa_conten_secondary_seleccion_radio`}>
                            {(isSeleteItem)?
                                <AiOutlineUp className="Container_itemPCActivoEmpresa_conten_secondary_seleccion_radio_icon"  />:
                                <AiOutlineDown className="Container_itemPCActivoEmpresa_conten_secondary_seleccion_radio_icon" />
                            }
                        </div>
                    </div>
                </div>
                {
                    (isSeleteItem) ?
                    <>
                        {/* <div className="Container_itemPCActivoEmpresa_liner" /> */}
                        <div className="Container_itemPCActivoEmpresa_body_container">
                            {/* descripccion */}
                            <ItemContainerInformation title={'Descripccion : '} >
                                <ItemContainerDescripccion content={dataGeneral.descripc} />
                            </ItemContainerInformation>
                            {/* valorizacion */}
                            <ItemContainerInformation title={'Valorizacion : '} >
                                {/* valor cuantitativo */}
                                <div style={{height: '10px'}} ></div>
                                    <div className="Container_itemPCActivoEmpresa_body_container_valor">
                                    <div className="Container_itemPCActivoEmpresa_principal_body_subContainer_information_valor_info_cont">
                                        <div className="Container_itemPCActivoEmpresa_principal_body_subContainer_information_valor_info_label">
                                            {'Presio o Valor del Activo :'}
                                        </div>
                                        <div className="Container_itemPCActivoEmpresa_principal_body_subContainer_information_valor_info_valor">
                                            {`S/. ${dataGeneral.valorActivCuanti}`}
                                        </div>
                                    </div>
                                    <div style={{height: '5px'}} ></div>
                                    <div className="Container_itemPCActivoEmpresa_principal_body_subContainer_information_valor_info_cont">
                                        <div className="Container_itemPCActivoEmpresa_principal_body_subContainer_information_valor_info_label">
                                            {'Valor de criticidad :'}
                                        </div>
                                        <div className="Container_itemPCActivoEmpresa_principal_body_subContainer_information_valor_info_valor">
                                            {`${dataGeneral.valorActivCuali}`}
                                        </div>
                                    </div>
                                    <div style={{height: '5px'}} ></div>
                                    <div className="Container_itemPCActivoEmpresa_principal_body_subContainer_information_valor_info_cont">
                                        <div className="Container_itemPCActivoEmpresa_principal_body_subContainer_information_valor_info_label">
                                            {'Nivel de criticidad :'}
                                        </div>
                                        <div className="Container_itemPCActivoEmpresa_principal_body_subContainer_information_valor_info_valor">
                                            {`${LabelStadeActivCualiti(dataGeneral.valorActivCuali)}`}
                                        </div>
                                    </div>
                                </div>
                            </ItemContainerInformation>
                            {/* Amenazas */}
                            <ItemContainerInformation title={'Amenazas : '} >
                                {dataGeneral.amenasDetect.map((item)=>{
                                    return (
                                    <ItemPCAmenazsas
                                        keyitem = {item.id_afectaActiv} 
                                        title = {item.nombreAmena} 
                                        subtitle = {item.nombreTipoActiv} 
                                        valor = {(item.valRiesgoCualit == null)?'??':item.valRiesgoCualit} 
                                        onChange = {(key) => {
                                            setinformacionAfectActiv(key);
                                            setismodalvisible(true);
                                        }}
                                    >
                                    </ItemPCAmenazsas>);
                                })}
                            </ItemContainerInformation>
                            <div style={{height: '10px'}} />
                        </div>
                    </>
                    :<></>
                }
            </div>
        </div>
        {(ismodalvisible)?
            <InformationAmenaz informacionAfectActiv={informacionAfectActiv} informacionActivProsVerAnali = {dataGeneral.id_activProsVerAnali} ismodalvisible = {ismodalvisible} setismodalvisible = {setismodalvisible } />
            :<></>
        }
    </>
    );
}

function ItemContainerInformation (props) {
    const {title, children} = props;
    return (<>
        <div style={{height: '10px'}} />
        <div className="Container_itemPCActivoEmpresa_principal_body_subContainer_information_subtitle" >
            {title} 
        </div>
        <div className="Container_itemPCActivoEmpresa_principal_body_subContainer_information_liner" />
        <div style={{height: '5px'}} />
        {children}
    </>);
}

function ItemContainerDescripccion (props) {
    const {content} = props;
    return (
        <div className="Container_itemPCActivoEmpresa_principal_body_subContainer_information_descrip" >
            {content}
        </div>
    );
}