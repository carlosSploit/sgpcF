import React, { useEffect, useState } from "react";
import "./styles/index.css"
import { Componentfilter } from "../../../../service/morvius-service/component/components";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { ConsuldataLogm, getKeysesion } from "../../../../service/repository/mithelworks";
import { useNotification } from "../../../../service/Notifications/NotificationProvider";
import { handleNewNotification } from "../../../../service/Notifications/useNotificacion";
import { getProcesEmpresa } from "../../../../service/repository/RTProcesEmpresas";
import { getEmpresas } from "../../../../service/repository/RTEmpresas";
import { ItemInsidenProces } from "./components/itemInsidenProcess";
import { AddInsidenciaProceso } from "./components/addInsidenProcess";
import { EditarInsidenProces } from "./components/editInsidenProcess";
import { OpccionActions } from "../../../../service/morvius-service/component/complements/componetOpccionActions";
import { deleteInsideProces, getInsideProces } from "../../../../service/repository/RTInsidencias";

export function InsideProces(props){
    const [listdata,setlistdata] = useState([]);
    const [,setlistdataHistory] = useState([]);
    const [ismodeladd,setismodeladd] = useState(false);
    const [ismodelaEdit,setismodelaEdit] = useState(false);
    const [indexOptionVersionAnali,setindexOptionVersionAnali] = useState(0);
    const [indexOptionVersionAnaliD,setindexOptionVersionAnaliD] = useState([]);
    const [,setlistOpccionFilter] = useState([]);
    const [indexProceso,setindexProceso] = useState(0);
    // opccion filtrajes
    const [propsListOpccion, prososetListOpccion] = useState([]);
    const [indexEmpresa,setindexEmpresa] = useState(0);
    const [keyOpccionProces,setkeyOpccionProces] = useState(0);
    const [isFilter, setIsFilter] = useState(false);
    const dispatch = useNotification();
    
    useEffect(()=>{
        (async()=>{
            setlistOpccionFilter([]);
            await GenerateEmpresa();
        })();
    },[]);

    const LoadDataInsideProces = async (id = 0) => {
        let result = await getInsideProces((id == 0)?indexProceso:id);
        console.log(result)
        setlistdata([]);
        setlistdataHistory([]);
        setTimeout(() => {
            setlistdata(result);
            setlistdataHistory(result);
            setindexOptionVersionAnaliD([]);
        }, 500);
    }

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

    const AddItemDeleteInsidenProces = (id_insideProces) => {
        let data = indexOptionVersionAnaliD.filter((item)=>{return item == id_insideProces})
        if(data.length != 0){
            setindexOptionVersionAnaliD(indexOptionVersionAnaliD.filter((item)=>{return item != id_insideProces}))
            return
        }
        let listdata = indexOptionVersionAnaliD;
        listdata.push(id_insideProces);
        setindexOptionVersionAnaliD(listdata);
    }

    const DeleteInsidenProces = async (id_insideProces) => {
        await deleteInsideProces({id_Insiden:id_insideProces});
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
                    await DeleteInsidenProces(element);
                }
                handleNewNotification(dispatch,'Se realizo la eliminacion en exito', 200);
                await LoadDataInsideProces()
            }
        }
    ]

    return (
        <div className="Container_InsidenProces_principal">
            <div className="Container_InsidenProces_principal_subConteiner">
                {/* Encabezado */}
                <div className="Container_InsidenProces_principal_header">
                    <div className="Container_InsidenProces_principal_header_subcontent_title">
                        <div className="Container_InsidenProces_principal_header_content_title">Incidencias de Procesos</div>
                    </div>
                </div>
                <div className="Container_InsidenProces_principal_body_naster">
                    <div className="Container_InsidenProces_principal_body_naster_information">
                        {/* Generador */}
                        {/* {(propsListOpccion.length != 0)?:<></>} */}
                        <div className="Container_InsidenProces_principal_header">
                            <Componentfilter onSeleccionOpccion={async (objJson)=>{
                                setIsFilter(false);
                                const keysfilter = Object.keys(objJson)
                                const  keyInteraccion = keysfilter[keysfilter.length - 1]
                                // validar si las opcciones de interaccion o de recarga
                                console.log(keyInteraccion)
                                if(keyInteraccion != 'Procesos'){
                                    prososetListOpccion([]) 
                                    let listGeneri = []
                                    // console.log(keysfilter)
                                    switch (keyInteraccion) {
                                        case 'Empresa':
                                            const keyEmpFil = objJson[keyInteraccion]
                                            listGeneri = await GenerateEmpresa(keyEmpFil, true, [])
                                            console.log(listGeneri)
                                            listGeneri = await GenerateProces(keyEmpFil, true, listGeneri)
                                            console.log(listGeneri)
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
                                await LoadDataInsideProces(id);
                                setindexProceso(id)
                                setIsFilter(true);
                            }} ></Componentfilter>
                        </div>
                        {/* Curpo */}
                        {(isFilter)?<div className="Container_InsidenProces_principal_body">
                            <OpccionActions sise={35} opccionSistem={opccionSistem} />
                            <div className="Container_InsidenProces_principal_body_subContainer">
                                {(listdata !== undefined)?((listdata.length != 0)?listdata.map((item)=>{
                                    return (<ItemInsidenProces
                                     onSelecteItem={(index)=>{
                                        AddItemDeleteInsidenProces(index);
                                    }} onChange={(index)=>{
                                        setindexOptionVersionAnali(index);
                                        setismodelaEdit(true);
                                    }} keyitem = {item.id_insidencia} title = {(item.fechainside.split('T')[0]) + ' : ' +item.nombroInsid} subtitle = {item.dependAbreb} descrip = {item.descrpInsid} />)
                                }):<></>):<></>}
                            </div>
                        </div>:<></>}
                    </div>
                </div>
            </div>
            {(ismodeladd)?<AddInsidenciaProceso informacionProceso={indexProceso} onInsert={async ()=>{
                await LoadDataInsideProces();
            }} propismodalvisible = {ismodeladd} propsetismodalvisible = {setismodeladd} />:<></>}
            {(ismodelaEdit)?<EditarInsidenProces onUpdate={LoadDataInsideProces} informationDataGeneral = {indexProceso} onAction = {LoadDataInsideProces} iskeyDatos = {indexOptionVersionAnali} ismodalvisible = {ismodelaEdit} setismodalvisible = {setismodelaEdit} />:<></>}
        </div>
    );
}