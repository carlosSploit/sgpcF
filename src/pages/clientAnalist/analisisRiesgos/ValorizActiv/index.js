import React, { useEffect, useState } from "react";
import "./styles/index.css"
import { ComponentTable, ComponentTableHead, Componentfilter } from "../../../../service/morvius-service/component/components";
// import { AddEmpresas } from "./components/addEmpresas";
// import { ItemEmpresa } from './components/itemEmpresa/index';
// import { getadmins } from '../../../../service/repository/Admin';
import { AreaChartOutlined, DeleteOutlined, DotChartOutlined, InfoOutlined, PlusOutlined } from "@ant-design/icons";
import { useNotification } from "../../../../service/Notifications/NotificationProvider";
import { ConsuldataLogm, getKeysesion } from "../../../../service/repository/mithelworks";
import { getEmpresas } from "../../../../service/repository/RTEmpresas";
import { getProcesEmpresa } from "../../../../service/repository/RTProcesEmpresas";
import { handleNewNotification } from "../../../../service/Notifications/useNotificacion";
// import { OpccionActions } from "../../ContextoEmpresa/Empresa/components/opccionActions";
import { getVersionAnalitiv } from "../../../../service/repository/RTVersionAnalitiv";
import { ItemValorizeActiv } from "./components/itemValorizActiv";
import { AddValorizeActiv } from "./components/addValorizActiv";
import { deleteActivProsAnali, getActivProsAnali } from "../../../../service/repository/RTActivProsAnali";
import { EditaValotCuantitativo } from "./components/editValorizActiv";
import { ForminputRadioSliceOpccion } from "../../../../service/morvius-service/form_input/form_input";
import { ItemValorizActivTab } from "./components/itemValorizActivTab";
import { InformationValori } from "./components/informationValori";
import { ItemValorizActivTabCual } from "./components/itemValorizAmenazTabCual";
import { ItemValorizActivTabCuat } from "./components/itemValorizAmenazTabCuat";
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

export function ValoriActiv(props){
    const [listdata,setlistdata] = useState([]);
    const [listdataHistory,setlistdataHistory] = useState([]);
    const [ismodeladd,setismodeladd] = useState(false);
    const [ismodelaEdit,setismodelaEdit] = useState(false);
    const [ismodelaInfo,setismodelaInfo] = useState(false);
    const [propstateradio,propsetstateradio] = useState(false);
    const [propstateradio2,propsetstateradio2] = useState(false);
    // const [textsearch,settextsearch] = useState("");
    const [indexActivValori,setindexActivValori] = useState(0);
    const [indexOptionVersionAnaliD,setindexOptionVersionAnaliD] = useState([]);
    const [listHeaderTableAnalitic, ] = useState([
        {
            label: "#",
            asling: "lef",
            isOcult: false,
            width: "10px"
        },
        {
            label: "Abrebiatura",
            asling: "lef",
            isOcult: false,
            width: ""
        },
        {
            label: "Presio Activo",
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
            label: "Abrebiatura",
            asling: "lef",
            isOcult: false,
            width: ""
        },
        {
            label: "Valor Cuali",
            asling: "lef",
            isOcult: false,
            width: ""
        }
    ]);
    // const [isModelFilter,setisModelFilter] = useState(false);
    const [listOpccionFilter,setlistOpccionFilter] = useState([]);
    // const [listSelFilter,setlistSelFilter] = useState([]);
    const [indexProceso,setindexProceso] = useState(0);
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
        let result = await getActivProsAnali((id == 0)?indexVersion:id);
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

    const AddItemDeleteProsVerAnali = (id_activProsVerAnali) => {
        let data = indexOptionVersionAnaliD.filter((item)=>{return item == id_activProsVerAnali})
        if(data.length != 0){
            setindexOptionVersionAnaliD(indexOptionVersionAnaliD.filter((item)=>{return item != id_activProsVerAnali}))
            return
        }
        let listdata = indexOptionVersionAnaliD;
        listdata.push(id_activProsVerAnali);
        setindexOptionVersionAnaliD(listdata);
    }

    const DeleteActivProsAnali = async (id_activProsVerAnali) => {
        await deleteActivProsAnali({id_activProsVerAnali:id_activProsVerAnali});
    }

    const opccionSistem = [
        {
            label: "Agregar",
            icon: PlusOutlined,
            onChange: () => {
                setismodeladd(true);
            }
        },
    ]

    return (
        <div className="Container_ValoriActiv_principal">
            <div className="Container_ValoriActiv_principal_subConteiner">
                {/* Encabezado */}
                <div className="Container_ValoriActiv_principal_header">
                    <div className="Container_ValoriActiv_principal_header_subcontent_title">
                        <div className="Container_ValoriActiv_principal_header_content_title">Valorizar un Activo</div>
                    </div>
                    <div className="Container_ValoriActiv_principal_header_subcontent_search">
                        {/* <div className="Container_ValoriActiv_principal_header_subcontent_search_cont">
                            <ForminputRadioSliceOpccion 
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
                            <div style={{width:'5px'}}></div>
                            <div className="Container_ValoriActiv_principal_header_subcontent_information" onClick={()=>{
                                setismodelaInfo(!ismodelaInfo)
                            }}>
                                <InfoOutlined className={'Container_ValoriActiv_principal_header_subcontent_information_icon'} />
                            </div>
                        </div>
                        <div style={{width:'25px'}}></div> */}
                    </div>
                </div>
                <div className="Container_ValoriActiv_principal_body_naster">
                    <div className="Container_ValoriActiv_principal_body_naster_information">
                        {/* Generador */}
                        {/* {(propsListOpccion.length != 0)?:<></>} */}
                        <div className="Container_ValoriActiv_principal_header">
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
                        </div>
                        {/* Curpo */}
                        {
                        <div className="Container_ValoriActiv_principal_body">
                            <OpccionActions sise={35} opccionSistem={opccionSistem} />
                            <div className="Container_ValoriActiv_principal_body_subContainer">
                                {(listdata.length != 0)?listdata.map((item)=>{
                                    return (<ItemValorizeActiv
                                     onSelecteItem={(index)=>{
                                        AddItemDeleteProsVerAnali(index);
                                    }} onChange={(index)=>{
                                        setindexActivValori(index);
                                        setismodelaEdit(true);
                                    }} keyitem = {item.id_activProsVerAnali} title = {item.nombre_Activo} subtitle = {item.dependAbreb} />)
                                }):<></>}
                            </div>
                        </div>
                        // :((propstateradio2)?
                        // <div className="Container_ValoriActiv_principal_body">
                        // {/* <OpccionActions opccionSistem={opccionSistem} /> */}
                        //     <div className="Container_ValoriActiv_principal_body_subContainer">
                        //         <ComponentTable>
                        //             <ComponentTableHead headers = {listHeaderTableAnalitic2} />
                        //             <tbody>
                        //                 {(listdata.length != 0)?listdata.filter((item)=>{
                        //                     return ((item.valorActivCuali != null) || (item.valorActivCuali != 0))
                        //                 }).map((item)=>{
                        //                     console.log(item)
                        //                     return (<ItemValorizActivTabCual itemdate ={item}/>)
                        //                 })
                        //                 :<></>}
                        //             </tbody>
                        //         </ComponentTable>
                        //     </div>
                        // </div> :
                        // <div className="Container_ValoriActiv_principal_body">
                        //     <div className="Container_ValoriActiv_principal_body_subContainer">
                        //         <ComponentTable>
                        //             <ComponentTableHead headers = {listHeaderTableAnalitic} />
                        //             <tbody>
                        //                 {(listdata.length != 0)?listdata.filter((item)=>{
                        //                     return ((item.valorActivCuanti != null) || (item.valorActivCuanti != 0))
                        //                 }).map((item)=>{
                        //                     console.log(item)
                        //                     return (<ItemValorizActivTabCuat itemdate ={item}/>)
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
            {(ismodeladd)?<AddValorizeActiv informacionVersion={indexActivValori} informacionProceso={keyOpccionProces} onInsert={async ()=>{
                await LoadDataVersionAnalitic();
            }} propismodalvisible = {ismodeladd} propsetismodalvisible = {setismodeladd} />:<></>}
            {(ismodelaEdit)?<EditaValotCuantitativo informacionProceso = {indexProceso} informacionVersion = {indexActivValori} onAction = {LoadDataVersionAnalitic} iskeyDatos = {indexActivValori} ismodalvisible = {ismodelaEdit} setismodalvisible = {setismodelaEdit} />:<></>}
            {(ismodelaInfo)?<InformationValori ismodalvisible = {ismodelaInfo} setismodalvisible = {setismodelaInfo} />:<></>}
        </div>
    );
}