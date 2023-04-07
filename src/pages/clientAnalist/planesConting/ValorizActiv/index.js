import React, { useEffect, useState } from "react";
import "./styles/index.css"
import { Componentfilter } from "../../../../service/morvius-service/component/components";
// import { AddEmpresas } from "./components/addEmpresas";
// import { ItemEmpresa } from './components/itemEmpresa/index';
// import { getadmins } from '../../../../service/repository/Admin';
// import { AreaChartOutlined, DeleteOutlined, DotChartOutlined, InfoOutlined, PlusOutlined } from "@ant-design/icons";
import { useNotification } from "../../../../service/Notifications/NotificationProvider";
import { ConsuldataLogm, getKeysesion } from "../../../../service/repository/mithelworks";
import { getEmpresas } from "../../../../service/repository/RTEmpresas";
import { getProcesEmpresa } from "../../../../service/repository/RTProcesEmpresas";
import { handleNewNotification } from "../../../../service/Notifications/useNotificacion";
import { getVersionAnalitiv } from "../../../../service/repository/RTVersionAnalitiv";
import { getInformationProces } from "../../../../service/repository/RTPlanesConting";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { ItemPCTrabjEmpresa } from "./components/itemPCTrabjEmpresa";
import { ItemPCActivoEmpresa } from "./components/itemPCActivoEmpresa";
import { ItemPCAreasEmpresa } from "./components/itemPCAreasEmpresa";

export function PlanesContingencias (props){
    const [informaData,setlistdata] = useState(null);
    const [listdataHistory,setlistdataHistory] = useState([]);
    // const [ismodeladd,setismodeladd] = useState(false);
    // const [ismodelaEdit,setismodelaEdit] = useState(false);
    // const [ismodelaInfo,setismodelaInfo] = useState(false);
    // const [propstateradio,propsetstateradio] = useState(false);
    // const [propstateradio2,propsetstateradio2] = useState(false);
    // const [textsearch,settextsearch] = useState("");
    // const [indexActivValori,setindexActivValori] = useState(0);
    const [indexOptionVersionAnaliD,setindexOptionVersionAnaliD] = useState([]);
    // const [listHeaderTableAnalitic, ] = useState([
    //     {
    //         label: "#",
    //         asling: "lef",
    //         isOcult: false,
    //         width: "10px"
    //     },
    //     {
    //         label: "Abrebiatura",
    //         asling: "lef",
    //         isOcult: false,
    //         width: ""
    //     },
    //     {
    //         label: "Presio Activo",
    //         asling: "lef",
    //         isOcult: false,
    //         width: ""
    //     }
    // ]);
    // const [listHeaderTableAnalitic2, ] = useState([
    //     {
    //         label: "#",
    //         asling: "lef",
    //         isOcult: false,
    //         width: "2%"
    //     },
    //     {
    //         label: "Abrebiatura",
    //         asling: "lef",
    //         isOcult: false,
    //         width: ""
    //     },
    //     {
    //         label: "Valor Cuali",
    //         asling: "lef",
    //         isOcult: false,
    //         width: ""
    //     }
    // ]);
    // const [isModelFilter,setisModelFilter] = useState(false);
    const [listOpccionFilter,setlistOpccionFilter] = useState([]);
    // const [listSelFilter,setlistSelFilter] = useState([]);
    // const [indexProceso,setindexProceso] = useState(0);
    // opccion filtrajes
    const [propsListOpccion, prososetListOpccion] = useState([]);
    const [indexEmpresa,setindexEmpresa] = useState(0);
    const [keyOpccionProces,setkeyOpccionProces] = useState(0);
    const [indexVersion,setIndexVersion] = useState(0);
    
    const dispatch = useNotification();
    
    useEffect(()=>{
        (async()=>{
            setlistOpccionFilter([]);
            // await LoadDataEmpresa();
            await GenerateEmpresa();
            // await LoadOpccionFilter();
        })();
    },[]);

    const LoadDataVersionAnalitic = async (id = 0) => {
        let result = await getInformationProces((id == 0)?indexVersion:id);
        console.log(result)
        setlistdata(null);
        setlistdataHistory([]);
        setTimeout(() => {
            setlistdata(result);
            setlistdataHistory(result);
            setindexOptionVersionAnaliD([]);
        }, 500);
    }

    const CompruebaExistencia = (listData = [], comrpeueb='default') => {
        const ListKeyData = listData.map((item) => {
            return item.nomenclature
        })
        return parseInt(ListKeyData.indexOf(comrpeueb)) !== -1
    }

    const GenerateEmpresa = async (keyInitSelectet = -1, isInitialData = false, lisDataGeneral = []) => {
        let secionkey = await getKeysesion();
        let dataUser = await ConsuldataLogm({seccionkey: secionkey});
        let result = await getEmpresas(dataUser.id_inform);
        console.log(propsListOpccion)
        if (result.length === 0) return ((isInitialData)?lisDataGeneral:propsListOpccion)
        let data = [...((isInitialData)?lisDataGeneral:propsListOpccion)];
        // console.log(data)
        if (CompruebaExistencia(data, 'Empresa')) return data
        let jsonData = {
            nomenclature: 'Empresa',
            keyvalue: 'id_empresa',
            initValue: (keyInitSelectet == -1)?indexEmpresa:keyInitSelectet,
            masterLabel: 'nombreempresa',
            opccions: result
        };
        data.push(jsonData);
        if (isInitialData) return data ;
        prososetListOpccion(data);
    }

    const GenerateProces = async (id_Empresa = 0, keyInitSelectet = -1,isInitialData = false, lisDataGeneral = []) => {
        let result = await getProcesEmpresa((id_Empresa == 0)?indexEmpresa:id_Empresa);
        if (result.length === 0) return ((isInitialData)?lisDataGeneral:propsListOpccion)
        let data = [...((isInitialData)?lisDataGeneral:propsListOpccion)];
        if (CompruebaExistencia(data, 'Procesos')) return data
        let jsonData = {
            nomenclature: 'Procesos',
            keyvalue: 'id_proceso',
            initValue: (keyInitSelectet == -1)?indexEmpresa:keyInitSelectet,
            masterLabel: 'nombreProce',
            opccions: result
        };
        data.push(jsonData);
        if (isInitialData) return data ;
        prososetListOpccion(data);
    }

    const GeneratVersionAnali = async (id_Proceso = 0, isInitialData = false, lisDataGeneral = []) => {
        let result = await getVersionAnalitiv((id_Proceso == 0)?keyOpccionProces:id_Proceso);
        if (result.length === 0) return ((isInitialData)?lisDataGeneral:propsListOpccion)
        let data = [...((isInitialData)?lisDataGeneral:propsListOpccion)];
        if (CompruebaExistencia(data, 'VersiAnali')) return data
        let jsonData = {
            nomenclature: 'VersiAnali',
            keyvalue: 'id_versionAnali',
            masterLabel: 'abreb',
            opccions: result
        };
        data.push(jsonData);
        if (isInitialData) return data ;
        prososetListOpccion(data);
    }

    return (
        <div className="Container_planconting_principal">
            <div className="Container_planconting_principal_subConteiner">
                {/* Encabezado */}
                <div className="Container_planconting_principal_header">
                    <div className="Container_planconting_principal_header_subcontent_title">
                        <div className="Container_planconting_principal_header_content_title">Planes de Contingencia</div>
                    </div>
                    <div className="Container_planconting_principal_header_subcontent_search">
                    </div>
                </div>
                <div className="Container_planconting_principal_body_naster">
                    <div className="Container_planconting_principal_body_naster_information">
                        {/* Generador */}
                        {(propsListOpccion.length != 0)?<div className="Container_planconting_principal_header">
                            <Componentfilter onSeleccionOpccion={async (objJson)=>{
                                const keysfilter = Object.keys(objJson)
                                const  keyInteraccion = keysfilter[keysfilter.length - 1]
                                // validar si las opcciones de interaccion o de recarga
                                if(keyInteraccion != 'VersiAnali'){
                                    prososetListOpccion([]) 
                                    let listGeneri = []
                                    switch (keyInteraccion) {
                                        case 'Empresa':
                                            const keyEmpFil = objJson[keyInteraccion]
                                            listGeneri = await GenerateEmpresa(keyEmpFil, true, [])
                                            const aux2 = await GenerateProces(keyEmpFil, 0, true, listGeneri)
                                            if (aux2.length <= 1){
                                                handleNewNotification(dispatch,'No se encontro procesos ingresados en la empresa.', 404);
                                                break;
                                            }
                                            listGeneri = aux2
                                            console.log(listGeneri)
                                            setindexEmpresa(keyEmpFil)
                                        break;
                                        case 'Procesos':
                                            const keyVersiAnali = objJson[keyInteraccion]
                                            listGeneri = await GenerateEmpresa(-1, true, [])
                                            listGeneri = await GenerateProces(0, keyVersiAnali, true, listGeneri)
                                            const aux3 = await GeneratVersionAnali(keyVersiAnali, true, listGeneri)
                                            if (aux3.length <= 2){
                                                handleNewNotification(dispatch,'No se encontro ninguna vercion de analisis de este proceso.', 404);
                                                break;
                                            }
                                            listGeneri = aux3
                                            console.log(listGeneri)
                                            setkeyOpccionProces(keyVersiAnali)
                                        break;
                                        default:
                                        break;
                                    }
                                    prososetListOpccion(listGeneri) 
                                }
                            }} ListOpccion={propsListOpccion} onChangeseach={async (json)=>{
                                console.log(json)
                                let id = json['VersiAnali'];
                                await LoadDataVersionAnalitic(id);
                                setIndexVersion(id)
                            }} ></Componentfilter>
                        </div>:<></>}
                        {/* Curpo */}
                        {
                        <div className="Container_planconting_principal_body">
                            {/* <OpccionActions sise={35} opccionSistem={opccionSistem} /> */}
                            <div className="Container_planconting_principal_body_subContainer">
                                {(informaData != null)?
                                <div className="Container_planconting_principal_body_subContainer_information">
                                    <div className="Container_planconting_principal_body_subContainer_information_title">
                                        {informaData.nombreProce}
                                    </div>
                                    <div style={{height: '10px'}} />
                                    {/* Descripccion del proceso */}
                                    <ContainerInformation title={'Descripccion : '} >
                                        <ContainerDescripccion content={informaData.descripccion} />
                                    </ContainerInformation>
                                    {/* Responsables del prceso */}
                                    <ContainerInformation title={'Responsables del proceso : '} >
                                        <div style={{height: '10px'}} />
                                        {/* {informaData.respoProces} */}
                                        {informaData.respoProces.map((item)=>{
                                            return (
                                            <ItemPCTrabjEmpresa 
                                                keyitem = {item.id_resposProce} 
                                                title = {item.nombre_apellido} 
                                                subtitle = {item.cargo} 
                                                descrip = {item.descripc} 
                                            />);
                                        })}
                                    </ContainerInformation>
                                    {/* Areas que interacciones */}
                                    <ContainerInformation title={'Areas que interactuan : '} >
                                        <div style={{height: '10px'}} />
                                        {/* {informaData.respoProces} */}
                                        {informaData.areasInterac.map((item)=>{
                                            return (
                                            <ItemPCAreasEmpresa
                                                keyitem = {item.id_areaProce} 
                                                title = {item.nombrearea} 
                                                // subtitle = {item.cargo} descriparea
                                                descrip = {item.descriparea} 
                                            />);
                                        })}
                                    </ContainerInformation>
                                    {/* Valorizacion del Proceso */}
                                    <ContainerInformation title={'Valorizacion del proceso : '} >
                                        <div style={{height: '10px'}} />
                                        <CotainerValorInform dataInfo = {{
                                            title: 'Valorizacion del Tiempo de Recuperacion del Sistema (RTO)',
                                            opccion: [
                                                {
                                                    labelInfo : 'Valor RTO : ',
                                                    valor: informaData.criterioValorRTO
                                                },
                                                {
                                                    labelInfo : 'Descripccion RTO : ',
                                                    valor: informaData.descripcCriterRTO
                                                }
                                            ]
                                        }} />
                                        <div style={{height: '10px'}} />
                                        <CotainerValorInform dataInfo = {{
                                            title: 'Valorizacion del Tiempo de Tolerancia de la Paralizacion del Proceso (RPO)',
                                            opccion: [
                                                {
                                                    labelInfo : 'Valor RPO : ',
                                                    valor: informaData.criterioValorRPO
                                                },
                                                {
                                                    labelInfo : 'Descripccion RPO : ',
                                                    valor: informaData.descripcCriterRPO
                                                }
                                            ]
                                        }} />
                                        <div style={{height: '10px'}} />
                                        <CotainerValorInform dataInfo = {{
                                            title: 'Valorizacion del Tiempo Maximo Permitido para Interrupcion del Proceso (MTD)',
                                            opccion: [
                                                {
                                                    labelInfo : 'Valor MDT : ',
                                                    valor: `${informaData.valorMDT} hrs`
                                                }
                                            ]
                                        }} />
                                    </ContainerInformation>
                                    {/* activos analizados */}
                                    <ContainerInformation title={'Activos Analizados : '} >
                                        <div style={{height: '10px'}} />
                                        {/* {informaData.respoProces} */}
                                        {informaData.activAnalit.map((item)=>{
                                            return (
                                            <ItemPCActivoEmpresa
                                                keyitem = {item.id_activProsVerAnali} 
                                                title = {item.nombre_Activo} 
                                                subtitle = {item.dependAbreb} 
                                                valor = {item.valorActivCuali} 
                                                dataGeneral = {item} 
                                                // descrip = {item.descriparea} 
                                            >
                                            </ItemPCActivoEmpresa>);
                                        })}
                                    </ContainerInformation>
                                </div>
                                :<></>}
                            </div>
                        </div>
                        }
                    </div>
                    <div style={{height: '20px'}} />
                </div>
            </div>
        </div>
    );
}

function ContainerInformation (props) {
    const {title, children} = props;
    return (<>
        <div style={{height: '20px'}} />
        <div className="Container_planconting_principal_body_subContainer_information_subtitle" >
            {title} 
        </div>
        <div className="Container_planconting_principal_body_subContainer_information_liner" />
        <div style={{height: '5px'}} />
        {children}
    </>);
}

function ContainerDescripccion (props) {
    const {content} = props;
    return (
        <div className="Container_planconting_principal_body_subContainer_information_descrip" >
            {content}
        </div>
    );
}

function CotainerValorInform (props) {
    const {dataInfo = {
        title: 'Valor 1',
        opccion: [
            {
                labelInfo : 'lavel 1',
                valor: 'Valor que es relativo'
            }
        ]
    }} = props;
    const [isVisibleInformat, setisVisibleInformat] = useState(false);
    return (
        <div className="Container_planconting_principal_body_subContainer_information_valor_info" >
            <div className="Container_planconting_principal_body_subContainer_information_valor_info_conten">
                <div className="Container_planconting_principal_body_subContainer_information_valor_info_header">
                    <div className="Container_planconting_principal_body_subContainer_information_valor_info_title">
                        {dataInfo.title}
                    </div>
                    <div onClick={()=>{
                        // onSelecteItem(keyitem,!isSeleteItem);
                        setisVisibleInformat(!isVisibleInformat);
                    }} className={`Container_planconting_principal_body_subContainer_information_valor_info_visible`}>
                        {(isVisibleInformat)?
                            <AiOutlineUp className="Container_planconting_principal_body_subContainer_information_valor_info_visible_icon"  />:
                            <AiOutlineDown className="Container_planconting_principal_body_subContainer_information_valor_info_visible_icon" />
                        }
                    </div>
                </div>
                {
                    (isVisibleInformat)?<>
                        <div style={{height: '10px'}} />
                        <div className="Container_planconting_principal_body_subContainer_information_valor_info_liner" />
                        <div style={{height: '5px'}} />
                        {dataInfo.opccion.map((item) => {
                            return (
                                <div className="Container_planconting_principal_body_subContainer_information_valor_info_cont">
                                    <div className="Container_planconting_principal_body_subContainer_information_valor_info_label">
                                        {item.labelInfo}
                                    </div>
                                    <div className="Container_planconting_principal_body_subContainer_information_valor_info_valor">
                                        {item.valor}
                                    </div>
                                </div>
                            );
                        })}
                    </>:<></>
                }
            </div>
        </div>
    );
}