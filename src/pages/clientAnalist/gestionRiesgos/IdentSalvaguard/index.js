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
import { AddSalvaguarAmenaz } from "./components/addIdentAmenazas";
import { getActivProsAnali } from "../../../../service/repository/RTActivProsAnali";
import { deleteSalvaguAmenaz, getSalvaguAmenaz } from "../../../../service/repository/RTSalvagAmenaz";
import { EditarSalvagAmenaz } from "./components/editProcesEmpresa";
import { getAfectaAtiv } from "../../../../service/repository/RTAfectaActiv";
import { OpccionActions } from "../../../../service/morvius-service/component/complements/componetOpccionActions";

export function IndentifiSalvaguard(props){
    const [listdata,setlistdata] = useState([]);
    const [,setlistdataHistory] = useState([]);
    const [ismodeladd,setismodeladd] = useState(false);
    const [ismodelaEdit,setismodelaEdit] = useState(false);
    const [indexAmenazValori,setindexAmenazValori] = useState(0);
    const [indexOptionVersionAnaliD,setindexOptionVersionAnaliD] = useState([]);
    const [,setlistOpccionFilter] = useState([]);
    // opccion filtrajes
    const [propsListOpccion, prososetListOpccion] = useState([]);
    const [indexEmpresa,setindexEmpresa] = useState(0);
    const [keyOpccionProces,setkeyOpccionProces] = useState(0);
    const [indexVersion,setIndexVersion] = useState(0);
    const [indexActivVersion,setActivVersion] = useState(0);
    const [indexAmenazVersion,setAmenazVersion] = useState(0);
    
    const dispatch = useNotification();
    
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

    const AddItemDeleteSalvagAmenaz = (id_DeleteSalvAmen) => {
        let data = indexOptionVersionAnaliD.filter((item)=>{return item == id_DeleteSalvAmen})
        if(data.length != 0){
            setindexOptionVersionAnaliD(indexOptionVersionAnaliD.filter((item)=>{return item != id_DeleteSalvAmen}))
            return
        }
        let listdata = indexOptionVersionAnaliD;
        listdata.push(id_DeleteSalvAmen);
        setindexOptionVersionAnaliD(listdata);
    }

    const DeleteSalvaguAmenaz = async (id_salvAme) => {
        await deleteSalvaguAmenaz({id_salvAmen: id_salvAme});
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
                    await DeleteSalvaguAmenaz(element);
                }
                handleNewNotification(dispatch,'Se realizo la eliminacion en exito', 200);
                await LoadDataSalvagAmenaz()
            }
        }
    ]

    return (
        <div className="Container_SalvagurdAmenaz_principal">
            <div className="Container_SalvagurdAmenaz_principal_subConteiner">
                {/* Encabezado */}
                <div className="Container_SalvagurdAmenaz_principal_header">
                    <div className="Container_SalvagurdAmenaz_principal_header_subcontent_title">
                        <div className="Container_SalvagurdAmenaz_principal_header_content_title">Identificar Salvaguardas</div>
                    </div>
                </div>
                <div className="Container_SalvagurdAmenaz_principal_body_naster">
                    <div className="Container_SalvagurdAmenaz_principal_body_naster_information">
                        {/* Generador */}
                        {(propsListOpccion.length != 0)?<div className="Container_SalvagurdAmenaz_principal_header">
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
                                                    handleNewNotification(dispatch,'No se encontro ninguna version de analisis en este proceso.', 404);
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
                                                const aux4 = await GeneratActivosVersion(keyVersiAnali, 0,true, listGeneri)
                                                if (aux4.length <= 3){
                                                    handleNewNotification(dispatch,'No se encontro ningun activo enlazado a esta version de analisis.', 404);
                                                    break;
                                                }
                                                listGeneri = aux4
                                                setIndexVersion(keyVersiAnali)
                                            break;
                                            case 'ActivVersion':
                                                const keyActivVersion = objJson[keyInteraccion]
                                                listGeneri = await GenerateEmpresa(-1, true, [])
                                                listGeneri = await GenerateProces(0, -1, true, listGeneri)
                                                listGeneri = await GeneratVersionAnali(0, -1, true, listGeneri)
                                                //GeneratActivosVersion
                                                listGeneri = await GeneratActivosVersion(0, keyActivVersion, true, listGeneri)
                                                const aux5 = await GeneratAfectActiv(keyActivVersion, true, listGeneri)
                                                if (aux5.length <= 4){
                                                    handleNewNotification(dispatch,'No se encontro ninguna amenaza enlazada a este activo, en la version de analisis.', 404);
                                                    break;
                                                }
                                                listGeneri = aux5
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
                        </div>:<></>}
                        {/* Curpo */}
                        <div className="Container_SalvagurdAmenaz_principal_body">
                            <OpccionActions sise={35} opccionSistem={opccionSistem} />
                            <div className="Container_SalvagurdAmenaz_principal_body_subContainer">
                                {(listdata.length != 0)?listdata.map((item)=>{
                                    return (<ItemValorizeActiv
                                     onSelecteItem={(index)=>{
                                        AddItemDeleteSalvagAmenaz(index);
                                    }} onChange={(index)=>{
                                        setindexAmenazValori(index);
                                        setismodelaEdit(true);
                                    }} keyitem = {item.id_salvAfectAct} title = {item.descripc} subtitle = {item.abrebsalv} />)
                                }):<></>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {(ismodeladd)?<AddSalvaguarAmenaz informacionActivAfec={indexAmenazVersion} onInsert={async ()=>{
                await LoadDataSalvagAmenaz();
            }} propismodalvisible = {ismodeladd} propsetismodalvisible = {setismodeladd} />:<></>}
            {(ismodelaEdit)?<EditarSalvagAmenaz informationActivAnali={indexAmenazVersion} onAction = {LoadDataSalvagAmenaz} iskeyDatos = {indexAmenazValori} ismodalvisible = {ismodelaEdit} setismodalvisible = {setismodelaEdit} />:<></>}
        </div>
    );
}