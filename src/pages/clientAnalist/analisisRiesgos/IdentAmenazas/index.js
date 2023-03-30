import React, { useEffect, useState } from "react";
import "./styles/index.css"
import { Componentfilter } from "../../../../service/morvius-service/component/components";
// import { AddEmpresas } from "./components/addEmpresas";
// import { ItemEmpresa } from './components/itemEmpresa/index';
// import { getadmins } from '../../../../service/repository/Admin';
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useNotification } from "../../../../service/Notifications/NotificationProvider";
import { ConsuldataLogm, getKeysesion } from "../../../../service/repository/mithelworks";
import { getEmpresas } from "../../../../service/repository/RTEmpresas";
import { getProcesEmpresa } from "../../../../service/repository/RTProcesEmpresas";
import { handleNewNotification } from "../../../../service/Notifications/useNotificacion";
// import { OpccionActions } from "../../ContextoEmpresa/Empresa/components/opccionActions";
import { getVersionAnalitiv } from "../../../../service/repository/RTVersionAnalitiv";
import { ItemValorizeActiv } from "./components/itemIdentAmenazas";
import { AddIdentifyAmenazas } from "./components/addIdentAmenazas";
import { getActivProsAnali } from "../../../../service/repository/RTActivProsAnali";
import { EditaValotCuantitativo } from "./components/editIdentAmenazas";
import { deleteAfectaAtiv, getAfectaAtiv } from "../../../../service/repository/RTAfectaActiv";
import { OpccionActions } from "../../../../service/morvius-service/component/complements/componetOpccionActions";
// import { OpccionActions } from "./components/opccionActions";
// import { deleteEmpresa, getEmpresas } from "../../../../service/repository/RTEmpresas";
// import { ConsuldataLogm, getKeysesion } from "../../../../service/repository/mithelworks";
// import { EditarEmpresa } from "./components/editEmpresas";
// import { useNotification } from "../../../../service/Notifications/NotificationProvider";
// import { handleNewNotification } from "../../../../service/Notifications/useNotificacion";
// import { EditarProcesEmpresa } from "../../ContextoEmpresa/Procesos/components/editProcesEmpresa";
// import { AddProcesEmpresas } from "../../ContextoEmpresa/Procesos/components/addProcesEmpresa";
// import { ItemTrabjEmpresa } from "../../ContextoEmpresa/TrabajEmpresa/components/itemTrabjEmpresa";
// import { ComponentFilterBar } from "../../../../service/morvius-service/component/complements/componentFilterBar";
// import { getProcesEmpresa } from "../../../../service/repository/RTProcesEmpresas";
// import { getTipoProces } from "../../../../service/repository/RTTiposProces";
// import { getGerarcProces } from "../../../../service/repository/RTGerarcProces";
// import { getEmpresas } from "../../../../service/repository/RTEmpresas";
// import { deleteVersionAnalitiv, getVersionAnalitiv } from "../../../../service/repository/RTVersionAnalitiv";
// import { ItemVersionAnalitit } from "./components/itemVersionAnalisis";
// import { AddVersionAnalitic } from "./components/addVersionAnalisis";
// import { EditarVesionAnalitic } from "./components/editVersionAnalisis";

export function IndentifiAmenazas(props){
    const [listdata,setlistdata] = useState([]);
    const [listdataHistory,setlistdataHistory] = useState([]);
    const [ismodeladd,setismodeladd] = useState(false);
    const [ismodelaEdit,setismodelaEdit] = useState(false);
    // const [textsearch,settextsearch] = useState("");
    const [indexActivValori,setindexActivValori] = useState(0);
    const [indexOptionVersionAnaliD,setindexOptionVersionAnaliD] = useState([]);
    // const [isModelFilter,setisModelFilter] = useState(false);
    const [listOpccionFilter,setlistOpccionFilter] = useState([]);
    // const [listSelFilter,setlistSelFilter] = useState([]);
    // const [indexProceso,setindexProceso] = useState(0);
    // opccion filtrajes
    const [propsListOpccion, prososetListOpccion] = useState([]);
    const [indexEmpresa,setindexEmpresa] = useState(0);
    const [keyOpccionProces,setkeyOpccionProces] = useState(0);
    const [indexVersion,setIndexVersion] = useState(0);
    const [indexActivVersion,setActivVersion] = useState(0);
    
    const dispatch = useNotification();
    
    useEffect(()=>{
        (async()=>{
            setlistOpccionFilter([]);
            // await LoadDataEmpresa();
            await GenerateEmpresa();
            // await LoadOpccionFilter();
        })();
    },[]);

    // const LoadOpccionFilter = async () => {
    //     let LisOp = [...listOpccionFilter]
    //     // inicializar el tipo de proceso
    //     let result = await getGerarcProces();
    //     let Opccion =  result.map((item)=>{
    //         return {
    //             label: item.nombre,
    //             key: item.id_gerarProc
    //         }
    //     })
    //     let ItemOpccion = {
    //         label: "Gerarquia de Procesos",
    //         keyFilter: 'id_gerarProc',
    //         Icon: FileExclamationOutlined,
    //         key: -1,
    //         options: Opccion
    //     }
    //     LisOp.push(ItemOpccion)
    //     // inicializar la gerarquia de proceso
    //     let resultTipPro = await getTipoProces();
    //     let Opccion2 =  resultTipPro.map((item)=>{
    //         return {
    //             label: item.nombre,
    //             key: item.id_tipProce
    //         }
    //     })
    //     let ItemOpccion2 = {
    //         label: "Tipos de Procesos",
    //         keyFilter: 'id_tipProce',
    //         Icon: FileExclamationOutlined,
    //         key: -1,
    //         options: Opccion2
    //     }
    //     LisOp.push(ItemOpccion2)
    //     setlistOpccionFilter(LisOp)
    // }

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

    // const LoadDataProcesEmpresaHist = async (listSelFilteryaux = []) => {
    //     // console.log(listSelFilteryaux)
    //     let result = [...listdataHistory];
    //     // filtraje por copciones de filtro
    //     ((listSelFilteryaux.length == 0)?listSelFilter:listSelFilteryaux).forEach(element => {
    //         let auxRes = [...result]
    //         result = auxRes.filter((item)=>{
    //             return element.value == item[element.key]
    //         })
    //     });
    //     console.log(result)
    //     setlistdata([]);
    //     setTimeout(() => {
    //         setlistdata(result);
    //     }, 500);
    // }

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

    const AddItemDeleteAcivAmenaza = (id_DeleteAcivAmenaza) => {
        let data = indexOptionVersionAnaliD.filter((item)=>{return item == id_DeleteAcivAmenaza})
        if(data.length != 0){
            setindexOptionVersionAnaliD(indexOptionVersionAnaliD.filter((item)=>{return item != id_DeleteAcivAmenaza}))
            return
        }
        let listdata = indexOptionVersionAnaliD;
        listdata.push(id_DeleteAcivAmenaza);
        setindexOptionVersionAnaliD(listdata);
    }

    const DeleteActivAfected = async (id_activAfec) => {
        await deleteAfectaAtiv({id_activAfec:id_activAfec});
    }

    const opccionSistem = [
        {
            label: "Agregar",
            icon: PlusOutlined,
            onChange: () => {
                setismodeladd(true);
            }
        },
        {
            label: "Eliminar",
            icon: DeleteOutlined,
            onChange: async () => {
                if(indexOptionVersionAnaliD.length == 0){
                    handleNewNotification(dispatch,'Selecciona una o varias empresas para poder eliminar', 404);
                    return
                }
                console.log(indexOptionVersionAnaliD)
                for (let index = 0; index < indexOptionVersionAnaliD.length; index++) {
                    const element = indexOptionVersionAnaliD[index];
                    await DeleteActivAfected(element);
                }
                handleNewNotification(dispatch,'Se realizo la eliminacion en exito', 200);
                await LoadDataVersionAnalitic()
            }
        }
    ]

    return (
        <div className="Container_IdentiAmenaz_principal">
            <div className="Container_IdentiAmenaz_principal_subConteiner">
                {/* Encabezado */}
                <div className="Container_IdentiAmenaz_principal_header">
                    <div className="Container_IdentiAmenaz_principal_header_subcontent_title">
                        <div className="Container_IdentiAmenaz_principal_header_content_title">Identificar Amenazas</div>
                    </div>
                </div>
                <div className="Container_IdentiAmenaz_principal_body_naster">
                    <div className="Container_IdentiAmenaz_principal_body_naster_information">
                        {/* Generador */}
                        {(propsListOpccion.length != 0)?<div className="Container_IdentiAmenaz_principal_header">
                            <Componentfilter onSeleccionOpccion={async (objJson)=>{
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
                                            listGeneri = await GeneratActivosVersion(keyVersiAnali, true, listGeneri)
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
                            }} ></Componentfilter>
                        </div>:<></>}
                        {/* Curpo */}
                        <div className="Container_IdentiAmenaz_principal_body">
                            <OpccionActions opccionSistem={opccionSistem} />
                            <div className="Container_IdentiAmenaz_principal_body_subContainer">
                                {(listdata.length != 0)?listdata.map((item)=>{
                                    return (<ItemValorizeActiv
                                     onSelecteItem={(index)=>{
                                        AddItemDeleteAcivAmenaza(index);
                                    }} onChange={(index)=>{
                                        setindexActivValori(index);
                                        setismodelaEdit(true);
                                    }} keyitem = {item.id_afectaActiv} title = {item.nombreAmena} subtitle = {item.nombreTipoActiv} />)
                                }):<></>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {(ismodeladd)?<AddIdentifyAmenazas informacionActivAfec={indexActivVersion} onInsert={async ()=>{
                await LoadDataVersionAnalitic();
            }} propismodalvisible = {ismodeladd} propsetismodalvisible = {setismodeladd} />:<></>}
            {(ismodelaEdit)?<EditaValotCuantitativo informationActivAnali={indexActivVersion} onAction = {LoadDataVersionAnalitic} iskeyDatos = {indexActivValori} ismodalvisible = {ismodelaEdit} setismodalvisible = {setismodelaEdit} />:<></>}
        </div>
    );
}