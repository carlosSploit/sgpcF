import React, { useEffect, useState } from "react";
import "./styles/index.css"
// import { AiOutlineFieldBinary, AiOutlineFontColors } from "react-icons/ai";
import { Componentfilter } from "../../../../service/morvius-service/component/components";
// import { AreaChartOutlined, DotChartOutlined, InfoOutlined } from "@ant-design/icons";
// import { useNotification } from "../../../../service/Notifications/NotificationProvider";
import { ConsuldataLogm, getKeysesion } from "../../../../service/repository/mithelworks";
import { getEmpresas } from "../../../../service/repository/RTEmpresas";
import { getProcesEmpresa } from "../../../../service/repository/RTProcesEmpresas";
// import { handleNewNotification } from "../../../../service/Notifications/useNotificacion";
// import { OpccionActions } from "../../ContextoEmpresa/Empresa/components/opccionActions";
import { getVersionAnalitiv } from "../../../../service/repository/RTVersionAnalitiv";
import { ItemValorizeAmenaz } from "./components/itemValorizAmenaz";
// import { AddIdentifyAmenazas } from "./components/addtValorizAmenaz";
import { getActivProsAnali } from "../../../../service/repository/RTActivProsAnali";
// import { EditaValotCuantitativo } from "./components/editValorizAmenaz";
import { getAfectaAtiv } from "../../../../service/repository/RTAfectaActiv";
import { EditaValorAmenaza } from "./components/editValorizAmena";
// import { ForminputRadioSliceOpccion } from "../../../../service/morvius-service/form_input/form_input";
// import { ItemValorizAmenazTabCual } from "./components/itemValorizAmenazTabCual";
// import { ItemValorizAmenazTabCuat } from "./components/itemValorizAmenazTabCuat";
import { InformationValori } from "./components/informationValori";
import { useNotification } from "../../../../service/Notifications/NotificationProvider";
import { handleNewNotification } from "../../../../service/Notifications/useNotificacion";

export function ValoriAmenaz(props){
    const [listdata,setlistdata] = useState([]);
    const [,setlistdataHistory] = useState([]);
    const [ismodelaEdit,setismodelaEdit] = useState(false);
    const [ismodelaInfo,setismodelaInfo] = useState(false);
    const [indexAmenaza,setindexAmenaza] = useState(0);
    const [,setindexOptionVersionAnaliD] = useState([]);
    const [,setlistOpccionFilter] = useState([]);
    // const [propstateradio,propsetstateradio] = useState(false);
    // const [propstateradio2,propsetstateradio2] = useState(false);
    // const [propstateradio3,propsetstateradio3] = useState(false);
    // const [listSelFilter,setlistSelFilter] = useState([]);
    // const [indexProceso,setindexProceso] = useState(0);
    // opccion filtrajes
    const [propsListOpccion, prososetListOpccion] = useState([]);
    const [indexEmpresa,setindexEmpresa] = useState(0);
    const [keyOpccionProces,setkeyOpccionProces] = useState(0);
    const [indexVersion,setIndexVersion] = useState(0);
    const [indexActivVersion,setActivVersion] = useState(0);
    // const [listHeaderTableAnalitic, ] = useState([
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
    //         label: "Degrad Cuanti",
    //         asling: "lef",
    //         isOcult: false,
    //         width: ""
    //     },
    //     {
    //         label: "Impact Cuanti",
    //         asling: "lef",
    //         isOcult: false,
    //         width: ""
    //     },
    //     {
    //         label: "Frecuen Cuali",
    //         asling: "lef",
    //         isOcult: true,
    //         width: ""
    //     },
    //     {
    //         label: "Riesg Cuanti",
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
    //         label: "Degrad Cuali",
    //         asling: "lef",
    //         isOcult: true,
    //         width: ""
    //     },
    //     {
    //         label: "Impact Cuali",
    //         asling: "lef",
    //         isOcult: true,
    //         width: ""
    //     },
    //     {
    //         label: "Frecuen Cuali",
    //         asling: "lef",
    //         isOcult: true,
    //         width: ""
    //     },
    //     {
    //         label: "Riesg Cuali",
    //         asling: "lef",
    //         isOcult: true,
    //         width: ""
    //     }
    // ]);
    const [isFilter,setIsFilter] = useState(false);
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
        let result = await getAfectaAtiv((id == 0)?indexActivVersion:id);
        console.log(result)
        setlistdata([]);
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
            initValue: (keyInitSelectet == -1)?keyOpccionProces:keyInitSelectet,
            masterLabel: 'nombreProce',
            opccions: result
        };
        data.push(jsonData);
        if (isInitialData) return data ;
        prososetListOpccion(data);
    }

    const GeneratVersionAnali = async (id_Proceso = 0, keyInitSelectet = -1, isInitialData = false, lisDataGeneral = []) => {
        let result = await getVersionAnalitiv((id_Proceso == 0)?keyOpccionProces:id_Proceso);
        if (result.length === 0) return ((isInitialData)?lisDataGeneral:propsListOpccion)
        let data = [...((isInitialData)?lisDataGeneral:propsListOpccion)];
        if (CompruebaExistencia(data, 'VersiAnali')) return data
        let jsonData = {
            nomenclature: 'VersiAnali',
            keyvalue: 'id_versionAnali',
            initValue: (keyInitSelectet == -1)?indexVersion:keyInitSelectet,
            masterLabel: 'abreb',
            opccions: result
        };
        data.push(jsonData);
        if (isInitialData) return data ;
        prososetListOpccion(data);
    }

    const GeneratActivosVersion = async (id_version = 0, isInitialData = false, lisDataGeneral = []) => {
        let result = await getActivProsAnali((id_version == 0)?indexVersion:id_version);
        if (result.length === 0) return ((isInitialData)?lisDataGeneral:propsListOpccion)
        let data = [...((isInitialData)?lisDataGeneral:propsListOpccion)];
        if (CompruebaExistencia(data, 'ActivVers')) return data
        let jsonData = {
            nomenclature: 'ActivVers',
            keyvalue: 'id_activProsVerAnali',
            masterLabel: 'nombre_Activo',
            opccions: result
        };
        data.push(jsonData);
        if (isInitialData) return data ;
        prososetListOpccion(data);
    }

    return (
        <div className="Container_valoriAmenaz_principal">
            <div className="Container_valoriAmenaz_principal_subConteiner">
                {/* Encabezado */}
                <div className="Container_valoriAmenaz_principal_header">
                    <div className="Container_valoriAmenaz_principal_header_subcontent_title">
                        <div className="Container_valoriAmenaz_principal_header_content_title">Valorizar Amenazas</div>
                    </div>
                    <div className="Container_valoriAmenaz_principal_header_subcontent_search"></div>
                </div>
                <div className="Container_valoriAmenaz_principal_body_naster">
                    <div className="Container_valoriAmenaz_principal_body_naster_information">
                        {/* Generador */}
                        {/* {(propsListOpccion.length != 0)?:<></>} */}
                        <div className="Container_valoriAmenaz_principal_header">
                            <div className="Container_valoriAmenaz_principal_header_filter" style={{width:'100%'}}>
                                <Componentfilter onSeleccionOpccion={async (objJson)=>{
                                    setIsFilter(false);
                                    const keysfilter = Object.keys(objJson)
                                    const  keyInteraccion = keysfilter[keysfilter.length - 1]
                                    // validar si las opcciones de interaccion o de recarga
                                    if(keyInteraccion != 'ActivVers'){
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
                                                const keyProceses = objJson[keyInteraccion]
                                                listGeneri = await GenerateEmpresa(-1, true, [])
                                                listGeneri = await GenerateProces(0, keyProceses, true, listGeneri)
                                                const aux3 = await GeneratVersionAnali(keyProceses, 0, true, listGeneri)
                                                if (aux3.length <= 2){
                                                    handleNewNotification(dispatch,'No se encontro versiones de analisis en este proceso.', 404);
                                                    break;
                                                }
                                                listGeneri = aux3
                                                console.log(listGeneri)
                                                setkeyOpccionProces(keyProceses)
                                            break;
                                            case 'VersiAnali':
                                                const keyVersiAnali = objJson[keyInteraccion]
                                                listGeneri = await GenerateEmpresa(-1, true, [])
                                                listGeneri = await GenerateProces(0, -1, true, listGeneri)
                                                listGeneri = await GeneratVersionAnali(0,keyVersiAnali, true, listGeneri)
                                                //GeneratActivosVersion
                                                const aux4 = await GeneratActivosVersion(keyVersiAnali, true, listGeneri)
                                                if (aux4.length <= 3){
                                                    handleNewNotification(dispatch,'No se enlazo ninguna activo de analisis a esta version.', 404);
                                                    break;
                                                }
                                                listGeneri = aux4
                                                setIndexVersion(keyVersiAnali)
                                            break;
                                            default:
                                            break;
                                        }
                                        prososetListOpccion(listGeneri) 
                                    }
                                }} ListOpccion={propsListOpccion} onChangeseach={async (json)=>{
                                    console.log(json)
                                    let id = json['ActivVers'];
                                    console.log(id)
                                    await LoadDataVersionAnalitic(id);
                                    setActivVersion(id)
                                    setIsFilter(true);
                                }} ></Componentfilter>
                            </div>
                        </div>
                        {/* Curpo */}
                        {
                        (isFilter)?<div className="Container_valoriAmenaz_principal_body">
                        <div className="Container_valoriAmenaz_principal_body_subContainer">
                            {(listdata.length != 0)?listdata.map((item)=>{
                                return (<ItemValorizeAmenaz
                                isValorize = {(item.id_Frecuencia != null) && (item.id_DegradCualit != null)}
                                onSelecteItem={(index)=>{
                                    // AddItemDeleteAcivAmenaza(index);
                                }} onChange={(index)=>{
                                    setindexAmenaza(index);
                                    setismodelaEdit(true);
                                }} keyitem = {item.id_afectaActiv} title = {item.nombreAmena} subtitle = {item.nombreTipoActiv} />)
                            }):<></>}
                        </div>
                        </div>:<></>
                        // ((!propstateradio2)?
                        // <div className="Container_valoriAmenaz_principal_body">
                        // {/* <OpccionActions opccionSistem={opccionSistem} /> */}
                        //     <div className="Container_valoriAmenaz_principal_body_subContainer">
                        //         <ComponentTable>
                        //             <ComponentTableHead headers = {listHeaderTableAnalitic} />
                        //             <tbody>
                        //                 {(listdata.length != 0)?listdata.filter((item)=>{
                        //                     return (item.id_Frecuencia != null) && (item.id_DegradCualit != null)
                        //                 }).map((item)=>{
                        //                     console.log(item)
                        //                     return (<ItemValorizAmenazTabCuat itemdate ={item}/>)
                        //                 })
                        //                 :<></>}
                        //             </tbody>
                        //         </ComponentTable>
                        //     </div>
                        // </div> :
                        // <div className="Container_valoriAmenaz_principal_body">
                        //     <div className="Container_valoriAmenaz_principal_body_subContainer">
                        //         <ComponentTable>
                        //             <ComponentTableHead headers = {listHeaderTableAnalitic2} />
                        //             <tbody>
                        //                 {(listdata.length != 0)?listdata.filter((item)=>{
                        //                     return (item.id_Frecuencia != null) && (item.id_DegradCualit != null)
                        //                 }).map((item)=>{
                        //                     console.log(item)
                        //                     return (<ItemValorizAmenazTabCual isLabel = {propstateradio3} itemdate = {item}/>)
                        //                 })
                        //                 :<></>}
                        //             </tbody>
                        //         </ComponentTable>
                        //     </div>
                        // </div>)
                        }
                    </div>
                </div>
            </div>
            {(ismodelaEdit)?<EditaValorAmenaza onAction = {LoadDataVersionAnalitic} iskeyDatos = {indexAmenaza} ismodalvisible = {ismodelaEdit} setismodalvisible = {setismodelaEdit} />:<></>}
            {(ismodelaInfo)?<InformationValori ismodalvisible = {ismodelaInfo} setismodalvisible = {setismodelaInfo} />:<></>}
        </div>
    );
}