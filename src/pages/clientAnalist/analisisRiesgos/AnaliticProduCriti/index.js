import React, { useEffect, useState } from "react";
import "./styles/index.css"
import { ComponentTable, ComponentTableHead, Componentfilter } from "../../../../service/morvius-service/component/components";
import { AreaChartOutlined, DotChartOutlined, InfoOutlined } from "@ant-design/icons";
// import { useNotification } from "../../../../service/Notifications/NotificationProvider";
import { ConsuldataLogm, getKeysesion } from "../../../../service/repository/mithelworks";
import { getEmpresas } from "../../../../service/repository/RTEmpresas";
import { ForminputRadioSliceOpccion } from "../../../../service/morvius-service/form_input/form_input";
// import { InformationValori } from "./components/informationValori";
import { ItemValorizActivTabCual } from "./components/itemValorizAmenazTabCual";
// import { ItemValorizActivTabCuat } from "./components/itemValorizAmenazTabCuat";
import { useNotification } from "../../../../service/Notifications/NotificationProvider";
import { getValorizProcesEmpresa } from "../../../../service/repository/RTValorizarAmenaz";
import { InformationProcesCriti } from "./components/informationValori";
// import { handleNewNotification } from "../../../../service/Notifications/useNotificacion";
// import { OpccionActions } from "../../../../service/morvius-service/component/complements/componetOpccionActions";

export function AnaliticProcesCritic(props){
    const [listdata,setlistdata] = useState([]);
    const [,setlistdataHistory] = useState([]);
    const [ismodelaInfo,setismodelaInfo] = useState(false);
    const [propstateradio2,propsetstateradio2] = useState(false);
    const [,setindexOptionVersionAnaliD] = useState([]);
    const [listHeaderTableAnalitic2, ] = useState([
        {
            label: "#",
            asling: "lef",
            isOcult: false,
            width: "2%"
        },
        {
            label: "Proceso",
            asling: "lef",
            isOcult: false,
            width: ""
        },
        {
            label: "Criticidad",
            asling: "lef",
            isOcult: false,
            width: ""
        }
    ]);
    // const [isModelFilter,setisModelFilter] = useState(false);
    const [listOpccionFilter,setlistOpccionFilter] = useState([]);
    // const [listSelFilter,setlistSelFilter] = useState([]);
    // const [indexProceso,setindexProceso] = useState(0);
    // opccion filtrajes
    const [propsListOpccion, prososetListOpccion] = useState([]);
    const [indexEmpresa,setindexEmpresa] = useState(0);
    // const [keyOpccionProces,setkeyOpccionProces] = useState(0);
    const [indexVersion,setIndexVersion] = useState(0);
    // const dispatch = useNotification();
    const [isFilter, setIsFilter] = useState(false);
    
    useEffect(()=>{
        (async()=>{
            setlistOpccionFilter([]);
            await GenerateEmpresa();
            // await LoadOpccionFilter();
        })();
    },[]);

    const LoadDataVersionAnalitic = async (id = 0) => {
        let result = await getValorizProcesEmpresa((parseInt(id) === 0)?indexVersion:id);
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

    // const GenerateProces = async (id_Empresa = 0, keyInitSelectet = -1,isInitialData = false, lisDataGeneral = []) => {
    //     let result = await getProcesEmpresa((id_Empresa == 0)?indexEmpresa:id_Empresa);
    //     if (result.length === 0) return ((isInitialData)?lisDataGeneral:propsListOpccion)
    //     let data = [...((isInitialData)?lisDataGeneral:propsListOpccion)];
    //     if (CompruebaExistencia(data, 'Procesos')) return data
    //     let jsonData = {
    //         nomenclature: 'Procesos',
    //         keyvalue: 'id_proceso',
    //         initValue: (keyInitSelectet == -1)?indexEmpresa:keyInitSelectet,
    //         masterLabel: 'nombreProce',
    //         opccions: result
    //     };
    //     data.push(jsonData);
    //     if (isInitialData) return data ;
    //     prososetListOpccion(data);
    // }

    // const GeneratVersionAnali = async (id_Proceso = 0, isInitialData = false, lisDataGeneral = []) => {
    //     let result = await getVersionAnalitiv((id_Proceso == 0)?keyOpccionProces:id_Proceso);
    //     if (result.length === 0) return ((isInitialData)?lisDataGeneral:propsListOpccion)
    //     let data = [...((isInitialData)?lisDataGeneral:propsListOpccion)];
    //     if (CompruebaExistencia(data, 'VersiAnali')) return data
    //     let jsonData = {
    //         nomenclature: 'VersiAnali',
    //         keyvalue: 'id_versionAnali',
    //         masterLabel: 'abreb',
    //         opccions: result
    //     };
    //     data.push(jsonData);
    //     if (isInitialData) return data ;
    //     prososetListOpccion(data);
    // }

    // const AddItemDeleteProsVerAnali = (id_activProsVerAnali) => {
    //     let data = indexOptionVersionAnaliD.filter((item)=>{return item == id_activProsVerAnali})
    //     if(data.length != 0){
    //         setindexOptionVersionAnaliD(indexOptionVersionAnaliD.filter((item)=>{return item != id_activProsVerAnali}))
    //         return
    //     }
    //     let listdata = indexOptionVersionAnaliD;
    //     listdata.push(id_activProsVerAnali);
    //     setindexOptionVersionAnaliD(listdata);
    // }

    // const DeleteActivProsAnali = async (id_activProsVerAnali) => {
    //     await deleteActivProsAnali({id_activProsVerAnali:id_activProsVerAnali});
    // }

    // const opccionSistem = [
    //     {
    //         label: "Agregar",
    //         icon: PlusOutlined,
    //         onChange: () => {
    //             setismodeladd(true);
    //         }
    //     },
    // ]

    return (
        <div className="Container_ValoriActiv_principal">
            <div className="Container_ValoriActiv_principal_subConteiner">
                {/* Encabezado */}
                <div className="Container_ValoriActiv_principal_header">
                    <div className="Container_ValoriActiv_principal_header_subcontent_title">
                        <div className="Container_ValoriActiv_principal_header_content_title">Analiticas de Procesos Criticos</div>
                    </div>
                    <div className="Container_ValoriActiv_principal_header_subcontent_search">
                    <div className="Container_ValoriActiv_principal_header_subcontent_search_cont">
                            {/* <ForminputRadioSliceOpccion 
                                Iconuno = {AreaChartOutlined} 
                                Icontwo = {DotChartOutlined} 
                                checkradio = {propstateradio2} 
                                setcheckradio = {propsetstateradio2} 
                                onChangeinput={(stade)=>{propsetstateradio2(!stade)}}
                            /> */}
                            <div style={{width:'5px'}}></div>
                            <div className="Container_ValoriActiv_principal_header_subcontent_information" onClick={()=>{
                                setismodelaInfo(!ismodelaInfo)
                            }}>
                                <InfoOutlined className={'Container_ValoriActiv_principal_header_subcontent_information_icon'} />
                            </div>
                        </div>
                        <div style={{width:'25px'}}></div>
                    </div>
                </div>
                <div className="Container_ValoriActiv_principal_body_naster">
                    <div className="Container_ValoriActiv_principal_body_naster_information">
                        {/* Generador */}
                        {
                            
                            <div className="Container_ValoriActiv_principal_header">
                                <Componentfilter onSeleccionOpccion={async (objJson)=>{
                                    setIsFilter(false);
                                }} ListOpccion={propsListOpccion} onChangeseach={async (json)=>{
                                    console.log(json)
                                    let id = json['Empresa'];
                                    await LoadDataVersionAnalitic(id);
                                    setIndexVersion(id)
                                    setIsFilter(true);
                                }} ></Componentfilter>
                            </div>
                        }
                        {/* Curpo */}
                        {
                            (isFilter)?
                            <div className="Container_ValoriActiv_principal_body">
                            {/* <OpccionActions opccionSistem={opccionSistem} /> */}
                                <div className="Container_ValoriActiv_principal_body_subContainer">
                                    <ComponentTable>
                                        <ComponentTableHead headers = {listHeaderTableAnalitic2} />
                                        <tbody>
                                            {(listdata.length != 0)?listdata.filter((item)=>{
                                                return ((item.valorActivCuali != null) || (item.valorActivCuali != 0))
                                            }).map((item)=>{
                                                console.log(item)
                                                return (<ItemValorizActivTabCual itemdate ={item}/>)
                                            })
                                            :<></>}
                                        </tbody>
                                    </ComponentTable>
                                </div>
                            </div> : <></>
                        }
                    </div>
                </div>
            </div>
            {/* {(ismodeladd)?<AddValorizeActiv informacionVersion={indexActivValori} informacionProceso={keyOpccionProces} onInsert={async ()=>{
                await LoadDataVersionAnalitic();
            }} propismodalvisible = {ismodeladd} propsetismodalvisible = {setismodeladd} />:<></>}
            {(ismodelaEdit)?<EditaValotCuantitativo informacionProceso = {indexProceso} informacionVersion = {indexActivValori} onAction = {LoadDataVersionAnalitic} iskeyDatos = {indexActivValori} ismodalvisible = {ismodelaEdit} setismodalvisible = {setismodelaEdit} />:<></>} */}
            {(ismodelaInfo)?<InformationProcesCriti ismodalvisible = {ismodelaInfo} setismodalvisible = {setismodelaInfo} />:<></>}
        </div>
    );
}