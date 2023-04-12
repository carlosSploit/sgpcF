import React, { useEffect, useState } from "react";
import "./styles/index.css"
import { Componentfilter } from "../../../../service/morvius-service/component/components";
import { DeleteOutlined, FileExclamationOutlined, PlusOutlined } from "@ant-design/icons";
import { ConsuldataLogm, getKeysesion } from "../../../../service/repository/mithelworks";
import { useNotification } from "../../../../service/Notifications/NotificationProvider";
import { handleNewNotification } from "../../../../service/Notifications/useNotificacion";
import { getProcesEmpresa } from "../../../../service/repository/RTProcesEmpresas";
import { getTipoProces } from "../../../../service/repository/RTTiposProces";
import { getGerarcProces } from "../../../../service/repository/RTGerarcProces";
import { getEmpresas } from "../../../../service/repository/RTEmpresas";
import { deleteVersionAnalitiv, getVersionAnalitiv } from "../../../../service/repository/RTVersionAnalitiv";
import { ItemVersionAnalitit } from "./components/itemVersionAnalisis";
import { AddVersionAnalitic } from "./components/addVersionAnalisis";
import { EditarVesionAnalitic } from "./components/editVersionAnalisis";
import { OpccionActions } from "../../../../service/morvius-service/component/complements/componetOpccionActions";

export function VersionAnalisis(props){
    const [listdata,setlistdata] = useState([]);
    const [,setlistdataHistory] = useState([]);
    const [ismodeladd,setismodeladd] = useState(false);
    const [ismodelaEdit,setismodelaEdit] = useState(false);
    // const [textsearch,settextsearch] = useState("");
    const [indexOptionVersionAnali,setindexOptionVersionAnali] = useState(0);
    const [indexOptionVersionAnaliD,setindexOptionVersionAnaliD] = useState([]);
    // const [isModelFilter,setisModelFilter] = useState(false);
    const [listOpccionFilter,setlistOpccionFilter] = useState([]);
    // const [listSelFilter,setlistSelFilter] = useState([]);
    const [indexProceso,setindexProceso] = useState(0);
    // opccion filtrajes
    const [propsListOpccion, prososetListOpccion] = useState([]);
    const [indexEmpresa,setindexEmpresa] = useState(0);
    const [keyOpccionProces,setkeyOpccionProces] = useState(0);
    
    const dispatch = useNotification();
    
    useEffect(()=>{
        (async()=>{
            setlistOpccionFilter([]);
            // await LoadDataEmpresa();
            await GenerateEmpresa();
            await LoadOpccionFilter();
        })();
    },[]);

    const LoadOpccionFilter = async () => {
        let LisOp = [...listOpccionFilter]
        // inicializar el tipo de proceso
        let result = await getGerarcProces();
        let Opccion =  result.map((item)=>{
            return {
                label: item.nombre,
                key: item.id_gerarProc
            }
        })
        let ItemOpccion = {
            label: "Gerarquia de Procesos",
            keyFilter: 'id_gerarProc',
            Icon: FileExclamationOutlined,
            key: -1,
            options: Opccion
        }
        LisOp.push(ItemOpccion)
        // inicializar la gerarquia de proceso
        let resultTipPro = await getTipoProces();
        let Opccion2 =  resultTipPro.map((item)=>{
            return {
                label: item.nombre,
                key: item.id_tipProce
            }
        })
        let ItemOpccion2 = {
            label: "Tipos de Procesos",
            keyFilter: 'id_tipProce',
            Icon: FileExclamationOutlined,
            key: -1,
            options: Opccion2
        }
        LisOp.push(ItemOpccion2)
        setlistOpccionFilter(LisOp)
    }

    const LoadDataVersionAnalitic = async (id = 0) => {
        let result = await getVersionAnalitiv((id == 0)?indexProceso:id);
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

    const GenerateEmpresa = async (keyInitSelectet = -1, isInitialData = false, lisDataGeneral = []) => {
        let secionkey = await getKeysesion();
        let dataUser = await ConsuldataLogm({seccionkey: secionkey});
        let result = await getEmpresas(dataUser.id_inform);
        console.log(propsListOpccion)
        if (result.length === 0) return ((isInitialData)?lisDataGeneral:propsListOpccion)
        let data = [...((isInitialData)?lisDataGeneral:propsListOpccion)];
        // console.log(data)
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

    const GenerateProces = async (id_Empresa = 0, isInitialData = false, lisDataGeneral = []) => {
        let result = await getProcesEmpresa((id_Empresa == 0)?keyOpccionProces:id_Empresa);
        if (result.length === 0) return ((isInitialData)?lisDataGeneral:propsListOpccion)
        let data = [...((isInitialData)?lisDataGeneral:propsListOpccion)];
        let jsonData = {
            nomenclature: 'Procesos',
            keyvalue: 'id_proceso',
            masterLabel: 'nombreProce',
            opccions: result
        };
        data.push(jsonData);
        if (isInitialData) return data ;
        prososetListOpccion(data);
    }

    const AddItemDeleteVersionAnali = (id_versionAnali) => {
        let data = indexOptionVersionAnaliD.filter((item)=>{return item == id_versionAnali})
        if(data.length != 0){
            setindexOptionVersionAnaliD(indexOptionVersionAnaliD.filter((item)=>{return item != id_versionAnali}))
            return
        }
        let listdata = indexOptionVersionAnaliD;
        listdata.push(id_versionAnali);
        setindexOptionVersionAnaliD(listdata);
    }

    const DeleteVersionAnalisis = async (id_versionAnali) => {
        await deleteVersionAnalitiv({id_areasEmpresa:id_versionAnali});
    }

    // ------------------------------------------------------------ Actions del Buscador
    // const onChangeseach = async (search) => {
    //     settextsearch(search);
    //     let result = await getadmins(search);
    //     setlistdata(result);
    // }

    // const onChangekey = async (seach) =>{
    //     if(seach == ""){
    //         settextsearch("");
    //         let result = await getadmins();
    //         setlistdata(result);
    //     }
    // }

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
                    await DeleteVersionAnalisis(element);
                }
                handleNewNotification(dispatch,'Se realizo la eliminacion en exito', 200);
                await LoadDataVersionAnalitic()
            }
        }
    ]

    return (
        <div className="Container_VersionAnali_principal">
            <div className="Container_VersionAnali_principal_subConteiner">
                {/* Encabezado */}
                <div className="Container_VersionAnali_principal_header">
                    <div className="Container_VersionAnali_principal_header_subcontent_title">
                        <div className="Container_VersionAnali_principal_header_content_title">Lista de Verciones de Analisis</div>
                    </div>
                </div>
                <div className="Container_VersionAnali_principal_body_naster">
                    <div className="Container_VersionAnali_principal_body_naster_information">
                        {/* Generador */}
                        {(propsListOpccion.length != 0)?<div className="Container_VersionAnali_principal_header">
                            <Componentfilter onSeleccionOpccion={async (objJson)=>{
                                const keysfilter = Object.keys(objJson)
                                const  keyInteraccion = keysfilter[keysfilter.length - 1]
                                // validar si las opcciones de interaccion o de recarga
                                if(keyInteraccion != 'Procesos'){
                                    prososetListOpccion([]) 
                                    let listGeneri = []
                                    switch (keysfilter[0]) {
                                        case 'Empresa':
                                            const keyEmpFil = objJson[keysfilter[0]]
                                            listGeneri = await GenerateEmpresa(keyEmpFil, true, [])
                                            const aux2 = await GenerateProces(keyEmpFil, true, listGeneri)
                                            if (aux2.length <= 1){
                                                handleNewNotification(dispatch,'No se encontro procesos ingresados en la empresa.', 404);
                                                break;
                                            }
                                            listGeneri = aux2
                                            setindexEmpresa(keyEmpFil)
                                            setkeyOpccionProces(keyEmpFil) 
                                        break;
                                        default:
                                            break;
                                    }
                                    prososetListOpccion(listGeneri) 
                                }
                            }} ListOpccion={propsListOpccion} onChangeseach={async (json)=>{
                                let id = json['Procesos'];
                                await LoadDataVersionAnalitic(id);
                                setindexProceso(id)
                            }} ></Componentfilter>
                        </div>:<></>}
                        {/* Curpo */}
                        <div className="Container_VersionAnali_principal_body">
                            <OpccionActions sise={35} opccionSistem={opccionSistem} />
                            <div className="Container_VersionAnali_principal_body_subContainer">
                                {(listdata.length != 0)?listdata.map((item)=>{
                                    return (<ItemVersionAnalitit
                                     onSelecteItem={(index)=>{
                                        AddItemDeleteVersionAnali(index);
                                    }} onChange={(index)=>{
                                        setindexOptionVersionAnali(index);
                                        setismodelaEdit(true);
                                    }} keyitem = {item.id_versionAnali} title = {item.abreb} subtitle = {item.fechaVersionAnali} descrip = {item.descripccion} />)
                                }):<></>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {(ismodeladd)?<AddVersionAnalitic informacionProceso={indexProceso} onInsert={async ()=>{
                await LoadDataVersionAnalitic();
            }} propismodalvisible = {ismodeladd} propsetismodalvisible = {setismodeladd} />:<></>}
            {(ismodelaEdit)?<EditarVesionAnalitic informationDataGeneral = {indexProceso} onAction = {LoadDataVersionAnalitic} iskeyDatos = {indexOptionVersionAnali} ismodalvisible = {ismodelaEdit} setismodalvisible = {setismodelaEdit} />:<></>}
            {/* 
            {(ismodelaEdit)?<EditarProcesEmpresa informationDataGeneral = {indexEmpresa} onAction = {LoadDataProcesEmpresa} iskeyDatos = {indexOptionEmpresa} ismodalvisible = {ismodelaEdit} setismodalvisible = {setismodelaEdit} />:<></>} */}
        </div>
    );
}