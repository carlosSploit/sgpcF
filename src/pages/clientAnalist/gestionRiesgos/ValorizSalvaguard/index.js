import React, { useEffect, useState } from "react";
import "./styles/index.css"
import { ComponentTable, ComponentTableHead, Componentfilter } from "../../../../service/morvius-service/component/components";
import { AreaChartOutlined, DotChartOutlined, InfoOutlined } from "@ant-design/icons";
// import { useNotification } from "../../../../service/Notifications/NotificationProvider";
import { ConsuldataLogm, getKeysesion } from "../../../../service/repository/mithelworks";
import { getEmpresas } from "../../../../service/repository/RTEmpresas";
import { getProcesEmpresa } from "../../../../service/repository/RTProcesEmpresas";
// import { handleNewNotification } from "../../../../service/Notifications/useNotificacion";
// import { OpccionActions } from "../../ContextoEmpresa/Empresa/components/opccionActions";
import { getVersionAnalitiv } from "../../../../service/repository/RTVersionAnalitiv";
import { ItemValorizeAmenaz, ItemValorSalvaguard } from "./components/itemValorizAmenaz";
// import { AddIdentifyAmenazas } from "./components/addtValorizAmenaz";
import { getActivProsAnali } from "../../../../service/repository/RTActivProsAnali";
// import { EditaValotCuantitativo } from "./components/editValorizAmenaz";
import { getAfectaAtiv } from "../../../../service/repository/RTAfectaActiv";
import { EditaValorSalvaguard } from "./components/editValorizAmena";
import { ForminputRadioSliceOpccion } from "../../../../service/morvius-service/form_input/form_input";
import { ItemValorizAmenazTabCual } from "./components/itemValorizAmenazTabCual";
import { ItemValorizAmenazTabCuat } from "./components/itemValorizAmenazTabCuat";
import { InformationValori } from "./components/informationValori";
import { getSalvaguAmenaz } from "../../../../service/repository/RTSalvagAmenaz";
import { AiOutlineFieldBinary, AiOutlineFontColors } from "react-icons/ai";

export function ValoriSalvaguard(props){
    const [listdata,setlistdata] = useState([]);
    const [,setlistdataHistory] = useState([]);
    const [ismodelaEdit,setismodelaEdit] = useState(false);
    const [ismodelaInfo,setismodelaInfo] = useState(false);
    // const [indexAmenaza,setindexAmenaza] = useState(0);
    const [,setindexOptionVersionAnaliD] = useState([]);
    const [indexSalvaguarda,setindexSalvaguarda] = useState(0);

    const [,setlistOpccionFilter] = useState([]);
    const [propstateradio,propsetstateradio] = useState(false);
    const [propstateradio2,propsetstateradio2] = useState(false);
    const [propstateradio3,propsetstateradio3] = useState(false);
    // opccion filtrajes
    const [propsListOpccion, prososetListOpccion] = useState([]);
    const [indexEmpresa,setindexEmpresa] = useState(0);
    const [keyOpccionProces,setkeyOpccionProces] = useState(0);
    const [indexVersion,setIndexVersion] = useState(0);
    const [indexActivVersion,setActivVersion] = useState(0);
    const [indexAmenazVersion,setAmenazVersion] = useState(0);
    const [listHeaderTableAnalitic, ] = useState([
        {
            label: "#",
            asling: "lef",
            isOcult: false,
            width: "2%"
        },
        {
            label: "Salvaguarda",
            asling: "lef",
            isOcult: false,
            width: ""
        },
        {
            label: "Eficacia Impact",
            asling: "lef",
            isOcult: true,
            width: ""
        },
        {
            label: "Frecuen Resid",
            asling: "lef",
            isOcult: true,
            width: ""
        },
        {
            label: "Impact Resid",
            asling: "lef",
            isOcult: true,
            width: ""
        },
        {
            label: "Riesg Resid",
            asling: "lef",
            isOcult: false,
            width: ""
        }
    ]);
    const [listHeaderTableAnalitic2, ] = useState([
        {
            label: "#",
            asling: "lef",
            isOcult: false,
            width: "2%"
        },
        {
            label: "Salvaguarda",
            asling: "lef",
            isOcult: false,
            width: ""
        },
        {
            label: "Degrad Resid",
            asling: "lef",
            isOcult: true,
            width: ""
        },
        {
            label: "Frecuen Resid",
            asling: "lef",
            isOcult: true,
            width: ""
        },
        {
            label: "Impact Resid",
            asling: "lef",
            isOcult: true,
            width: ""
        },
        {
            label: "Riesg Resid",
            asling: "lef",
            isOcult: false,
            width: ""
        }
    ]);
    // const dispatch = useNotification();
    
    useEffect(()=>{
        (async()=>{
            setlistOpccionFilter([]);
            // await LoadDataEmpresa();
            await GenerateEmpresa();
            // await LoadOpccionFilter();
        })();
    },[]);

    const LoadDataSalvagAmenaz = async (id = 0) => {
        let result = await getSalvaguAmenaz((parseInt(id) === 0)?indexAmenazVersion:id);
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

    const GeneratActivosVersion = async (id_version = 0, keyInitSelectet = -1, isInitialData = false, lisDataGeneral = []) => {
        let result = await getActivProsAnali((id_version == 0)?indexVersion:id_version);
        if (result.length === 0) return ((isInitialData)?lisDataGeneral:propsListOpccion)
        let data = [...((isInitialData)?lisDataGeneral:propsListOpccion)];
        if (CompruebaExistencia(data, 'ActivVersion')) return data
        let jsonData = {
            nomenclature: 'ActivVersion',
            keyvalue: 'id_activProsVerAnali',
            initValue: (keyInitSelectet == -1)?indexActivVersion:keyInitSelectet,
            masterLabel: 'nombre_Activo',
            opccions: result
        };
        data.push(jsonData);
        if (isInitialData) return data ;
        prososetListOpccion(data);
    }

    const GeneratAfectActiv = async (id_Actvi = 0, isInitialData = false, lisDataGeneral = []) => {
        let result = await getAfectaAtiv((parseInt(id_Actvi) === 0)?indexActivVersion:id_Actvi);
        if (result.length === 0) return ((isInitialData)?lisDataGeneral:propsListOpccion)
        let data = [...((isInitialData)?lisDataGeneral:propsListOpccion)];
        if (CompruebaExistencia(data, 'AmenazVers')) return data
        let jsonData = {
            nomenclature: 'AmenazVers',
            keyvalue: 'id_afectaActiv',
            masterLabel: 'nombreAmena',
            opccions: result
        };
        data.push(jsonData);
        if (isInitialData) return data ;
        prososetListOpccion(data);
    }

    return (
        <div className="Container_valoriSalvaguar_principal">
            <div className="Container_valoriSalvaguar_principal_subConteiner">
                {/* Encabezado */}
                <div className="Container_valoriSalvaguar_principal_header">
                    <div className="Container_valoriSalvaguar_principal_header_subcontent_title">
                        <div className="Container_valoriSalvaguar_principal_header_content_title">Valorizar Salvaguardas</div>
                    </div>
                    <div className="Container_valoriSalvaguar_principal_header_subcontent_search">
                        <div className="Container_valoriSalvaguar_principal_header_subcontent_search_cont">
                            {/* <ForminputRadioSliceOpccion 
                                checkradio = {propstateradio} 
                                setcheckradio = {propsetstateradio} 
                                onChangeinput={(stade)=>{propsetstateradio(!stade)}}/>
                            {(propstateradio)?<>
                            <div style={{width:'5px'}}></div>
                            <ForminputRadioSliceOpccion 
                                Iconuno = {AreaChartOutlined} 
                                Icontwo = {DotChartOutlined} 
                                checkradio = {propstateradio2} 
                                setcheckradio = {propsetstateradio2} 
                                onChangeinput={(stade)=>{propsetstateradio2(!stade)}}
                            />
                            </>:<></>}
                            {(propstateradio2 && propstateradio)?<>
                            <div style={{width:'5px'}}></div>
                            <ForminputRadioSliceOpccion 
                                sizeIcon = {'18px'} 
                                Iconuno = {AiOutlineFieldBinary} 
                                Icontwo = {AiOutlineFontColors} 
                                checkradio = {propstateradio3} 
                                setcheckradio = {propsetstateradio3} 
                                onChangeinput={(stade)=>{propsetstateradio3(!stade)}}
                            />
                            </>:<></>}
                            <div style={{width:'5px'}}></div>
                            <div className="Container_valoriSalvaguar_principal_header_subcontent_information" onClick={()=>{
                                setismodelaInfo(!ismodelaInfo)
                            }}>
                                <InfoOutlined className={'Container_valoriSalvaguar_principal_header_subcontent_information_icon'} />
                            </div> */}
                        </div>
                        <div style={{width:'25px'}}></div>
                    </div>
                </div>
                <div className="Container_valoriSalvaguar_principal_body_naster">
                    <div className="Container_valoriSalvaguar_principal_body_naster_information">
                        {/* Generador */}
                        {(propsListOpccion.length != 0)?
                        <div className="Container_valoriSalvaguar_principal_header">
                            <div className="Container_valoriSalvaguar_principal_header_filter" style={{width:'100%'}}>
                                <Componentfilter onSeleccionOpccion={async (objJson)=>{
                                    const keysfilter = Object.keys(objJson)
                                    const  keyInteraccion = keysfilter[keysfilter.length - 1]
                                    // validar si las opcciones de interaccion o de recarga
                                    if(keyInteraccion != 'AmenazVers'){
                                        prososetListOpccion([]) 
                                        let listGeneri = []
                                        switch (keyInteraccion) {
                                            case 'Empresa':
                                                const keyEmpFil = objJson[keyInteraccion]
                                                listGeneri = await GenerateEmpresa(keyEmpFil, true, [])
                                                listGeneri = await GenerateProces(keyEmpFil, 0, true, listGeneri)
                                                console.log(listGeneri)
                                                setindexEmpresa(keyEmpFil)
                                            break;
                                            case 'Procesos':
                                                const keyProceses = objJson[keyInteraccion]
                                                listGeneri = await GenerateEmpresa(-1, true, [])
                                                listGeneri = await GenerateProces(0, keyProceses, true, listGeneri)
                                                listGeneri = await GeneratVersionAnali(keyProceses, 0, true, listGeneri)
                                                console.log(listGeneri)
                                                setkeyOpccionProces(keyProceses)
                                            break;
                                            case 'VersiAnali':
                                                const keyVersiAnali = objJson[keyInteraccion]
                                                listGeneri = await GenerateEmpresa(-1, true, [])
                                                listGeneri = await GenerateProces(0, -1, true, listGeneri)
                                                listGeneri = await GeneratVersionAnali(0,keyVersiAnali, true, listGeneri)
                                                //GeneratActivosVersion
                                                listGeneri = await GeneratActivosVersion(keyVersiAnali, 0,true, listGeneri)
                                                setIndexVersion(keyVersiAnali)
                                            break;
                                            case 'ActivVersion':
                                                const keyActivVersion = objJson[keyInteraccion]
                                                listGeneri = await GenerateEmpresa(-1, true, [])
                                                listGeneri = await GenerateProces(0, -1, true, listGeneri)
                                                listGeneri = await GeneratVersionAnali(0, -1, true, listGeneri)
                                                //GeneratActivosVersion
                                                listGeneri = await GeneratActivosVersion(0, keyActivVersion, true, listGeneri)
                                                listGeneri = await GeneratAfectActiv(keyActivVersion, true, listGeneri)
                                                setActivVersion(keyActivVersion)
                                            break;
                                            default:
                                            break;
                                        }
                                        prososetListOpccion(listGeneri) 
                                    }
                                }} 
                                ListOpccion={propsListOpccion} onChangeseach={async (json)=>{
                                    console.log(json)
                                    let id = json['AmenazVers'];
                                    console.log(id)
                                    await LoadDataSalvagAmenaz(id);
                                    setAmenazVersion(id)
                                }} ></Componentfilter>
                            </div>
                        </div>:<></>}
                        {/* Curpo */}
                        {
                        <div className="Container_valoriSalvaguar_principal_body">
                            <div className="Container_valoriSalvaguar_principal_body_subContainer">
                                {(parseInt(listdata.length) !== 0)?listdata.map((item)=>{
                                    return (<ItemValorSalvaguard
                                    isValorize = {!(((item.id_escalEficDegr == 0) || (item.id_escalEficDegr == null)) && ((item.id_escalEficFrec == 0) || (item.id_escalEficFrec == null)))}
                                    onSelecteItem={(index)=>{
                                        // AddItemDeleteAcivAmenaza(index);
                                    }} onChange={(index)=>{
                                        setindexSalvaguarda(index);
                                        setismodelaEdit(true);
                                    }} keyitem = {item.id_salvAfectAct} title = {item.descripc} subtitle = {item.abrebsalv} />)
                                }):<></>}
                            </div>
                        </div>
                        // ((!propstateradio2)?
                        // <div className="Container_valoriSalvaguar_principal_body">
                        // {/* <OpccionActions opccionSistem={opccionSistem} /> */}
                        //     <div className="Container_valoriSalvaguar_principal_body_subContainer">
                        //         <ComponentTable>
                        //             <ComponentTableHead headers = {listHeaderTableAnalitic} />
                        //             <tbody>
                        //                 {(parseInt(listdata.length) !== 0)?listdata.filter((item)=>{
                        //                     return !(((item.id_escalEficDegr == 0) || (item.id_escalEficDegr == null)) && ((item.id_escalEficFrec == 0) || (item.id_escalEficFrec == null)))
                        //                 }).map((item)=>{
                        //                     console.log(item)
                        //                     return (<ItemValorizAmenazTabCuat itemdate ={item}/>)
                        //                 })
                        //                 :<></>}
                        //             </tbody>
                        //         </ComponentTable>
                        //     </div>
                        // </div> :
                        // <div className="Container_valoriSalvaguar_principal_body">
                        //     <div className="Container_valoriSalvaguar_principal_body_subContainer">
                        //         <ComponentTable>
                        //             <ComponentTableHead headers = {listHeaderTableAnalitic2} />
                        //             <tbody>
                        //                 {(parseInt(listdata.length) !== 0)?listdata.filter((item)=>{
                        //                     return !(((item.id_escalEficDegr == 0) || (item.id_escalEficDegr == null)) && ((item.id_escalEficFrec == 0) || (item.id_escalEficFrec == null)))
                        //                 }).map((item)=>{
                        //                     console.log(item)
                        //                     return (<ItemValorizAmenazTabCual isLabel = {propstateradio3} itemdate ={item}/>)
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
            {(ismodelaEdit)?<EditaValorSalvaguard onAction = {LoadDataSalvagAmenaz} iskeyDatos = {indexSalvaguarda} ismodalvisible = {ismodelaEdit} setismodalvisible = {setismodelaEdit} />:<></>}
            {/* {(ismodelaInfo)?<InformationValori ismodalvisible = {ismodelaInfo} setismodalvisible = {setismodelaInfo} />:<></>} */}
        </div>
    );
}