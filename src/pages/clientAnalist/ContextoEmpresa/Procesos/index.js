import React, { useEffect, useState } from "react";
import "./styles/index.css"
import { Componentfilter, Componentsearchanimation} from "../../../../service/morvius-service/component/components";
import { AddProcesEmpresas } from "./components/addProcesEmpresa";
import { ItemTrabjEmpresa } from './components/itemProcesEmpresa/index';
import { getadmins } from '../../../../service/repository/Admin';
import { DeleteOutlined, FileExclamationOutlined, PlusOutlined, SlidersOutlined } from "@ant-design/icons";
// import { OpccionActions } from "./components/opccionActions";
import { getEmpresas } from "../../../../service/repository/RTEmpresas";
import { ConsuldataLogm, getKeysesion } from "../../../../service/repository/mithelworks";
// import { EditarTrabEmpresa } from "./components/editProcesEmpresa";
import { useNotification } from "../../../../service/Notifications/NotificationProvider";
import { handleNewNotification } from "../../../../service/Notifications/useNotificacion";
// import { deleteTrabajEmpresa, getTrabajEmpresa } from "../../../../service/repository/RTTrabajEmpresas";
import { deleteProcesEmpresa, getProcesEmpresa } from "../../../../service/repository/RTProcesEmpresas";
import { EditarProcesEmpresa } from "./components/editProcesEmpresa";
import { ComponentFilterBar } from "../../../../service/morvius-service/component/complements/componentFilterBar";
import { getTipoProces } from "../../../../service/repository/RTTiposProces";
import { getGerarcProces } from "../../../../service/repository/RTGerarcProces";
import { OpccionActions } from "../../../../service/morvius-service/component/complements/componetOpccionActions";

export function ProcesEmpresas(props){
    const [propsListOpccion, prososetListOpccion] = useState([]);
    const [listdata,setlistdata] = useState([]);
    const [listdataHistory,setlistdataHistory] = useState([]);
    const [ismodeladd,setismodeladd] = useState(false);
    const [ismodelaEdit,setismodelaEdit] = useState(false);
    const [,settextsearch] = useState("");
    const [indexEmpresa,setindexEmpresa] = useState(0);
    const [indexOptionEmpresa,setindexOptionEmpresa] = useState(0);
    const [indexOptionEmpresaD,setindexOptionEmpresaD] = useState([]);
    const [isModelFilter,setisModelFilter] = useState(false);
    const [listOpccionFilter,setlistOpccionFilter] = useState([]);
    const [listSelFilter,setlistSelFilter] = useState([]);
    const [isFilter ,setIsFilter] = useState(false)
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

    const LoadDataProcesEmpresa = async (id = 0) => {
        let result = await getProcesEmpresa((id == 0)?indexEmpresa:id);
        console.log(result)
        setlistdata([]);
        setlistdataHistory([]);
        setTimeout(() => {
            setlistdata(result);
            setlistdataHistory(result);
            setindexOptionEmpresaD([]);
        }, 500);
    }

    const LoadDataProcesEmpresaHist = async (listSelFilteryaux = []) => {
        // console.log(listSelFilteryaux)
        let result = [...listdataHistory];
        // filtraje por copciones de filtro
        ((listSelFilteryaux.length == 0)?listSelFilter:listSelFilteryaux).forEach(element => {
            let auxRes = [...result]
            result = auxRes.filter((item)=>{
                return element.value == item[element.key]
            })
        });
        console.log(result)
        setlistdata([]);
        setTimeout(() => {
            setlistdata(result);
        }, 500);
    }

    const GenerateEmpresa = async () => {
        let secionkey = await getKeysesion();
        let dataUser = await ConsuldataLogm({seccionkey: secionkey});
        let result = await getEmpresas(dataUser.id_inform);
        setTimeout(() => {
            // setlistdata(result);
            // setlistdataHistory(result);
            let data = [...propsListOpccion];
            let jsonData = {
                nomenclature: 'Empresa',
                keyvalue: 'id_empresa',
                masterLabel: 'nombreempresa',
                opccions: result,
            };
            // se comprueba si el key a insertar ya existe
            let compruebeData = data.filter((item)=>{
                return item.nomenclature == jsonData.nomenclature;
            })
            
            if(compruebeData.length == 0){
                console.log(compruebeData)
                data.push(jsonData);
                prososetListOpccion(data);
            }
        }, 500);
    }

    const AddItemDeleteProcesEmpresas = (id_TrabajEmpresa) => {
        let data = indexOptionEmpresaD.filter((item)=>{return item == id_TrabajEmpresa})
        if(data.length != 0){
            setindexOptionEmpresaD(indexOptionEmpresaD.filter((item)=>{return item != id_TrabajEmpresa}))
            return
        }
        let listdata = indexOptionEmpresaD;
        listdata.push(id_TrabajEmpresa);
        setindexOptionEmpresaD(listdata);
    }

    const DeleteProcesEmpresa = async (id_ProcesEmpresa) => {
        let result = await deleteProcesEmpresa({id_ProcesEmpresa:id_ProcesEmpresa});
    }

    // ------------------------------------------------------------ Actions del Buscador
    const onChangeseach = async (search) => {
        settextsearch(search);
        let result = await getadmins(search);
        setlistdata(result);
    }

    const onChangekey = async (seach) =>{
        if(seach == ""){
            settextsearch("");
            let result = await getadmins();
            setlistdata(result);
        }
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
                if(indexOptionEmpresaD.length == 0){
                    handleNewNotification(dispatch,'Selecciona una o varias empresas para poder eliminar', 404);
                    return
                }
                console.log(indexOptionEmpresaD)
                for (let index = 0; index < indexOptionEmpresaD.length; index++) {
                    const element = indexOptionEmpresaD[index];
                    await DeleteProcesEmpresa(element);
                }
                handleNewNotification(dispatch,'Se realizo la eliminacion en exito', 200);
                await LoadDataProcesEmpresa()
            }
        }
    ]

    return (
        <div className="Container_ProcesEmpresas_principal">
            <div className="Container_ProcesEmpresas_principal_subConteiner">
                {/* Encabezado */}
                <div className="Container_ProcesEmpresas_principal_header">
                    <div className="Container_ProcesEmpresas_principal_header_subcontent_title">
                        <div className="Container_ProcesEmpresas_principal_header_content_title">Lista de Procesos de Empresas</div>
                    </div>
                    <div className="Container_ProcesEmpresas_principal_header_subcontent_search">
                        {/* <div className="Container_ProcesEmpresas_principal_header_subcontent_search_cont">
                            <Componentsearchanimation height={'35px'} onChangekey={onChangekey} onChangeseach={onChangeseach}/>
                        </div>
                        <div className="Container_ProcesEmpresas_principal_header_subcontent_search_cont2">
                            <div className="Container_ProcesEmpresas_principal_header_subcontent_search_Filer" onClick={()=>{
                                if(isModelFilter) {
                                    setlistdata([]);
                                    setTimeout(() => {
                                        setlistdata(listdataHistory);
                                    }, 500);
                                }
                                setisModelFilter(!isModelFilter)
                            }}>
                                <SlidersOutlined className="Container_ProcesEmpresas_principal_header_subcontent_search_Filer_icons" />
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="Container_ProcesEmpresas_principal_body_naster">
                    {(isModelFilter && listOpccionFilter.length != 0)?<div className="Container_ProcesEmpresas_principal_body_naster_filter">
                        <ComponentFilterBar databasic = {listOpccionFilter} onchangeoption={async (lisFilterItem)=>{
                            setlistSelFilter(lisFilterItem)
                            await LoadDataProcesEmpresaHist(lisFilterItem)
                        }} />
                    </div>:<></>}
                    <div className="Container_ProcesEmpresas_principal_body_naster_information">
                        {/* Generador */}
                        {(propsListOpccion.length != 0)?<div className="Container_ProcesEmpresas_principal_header">
                            <Componentfilter onSeleccionOpccion={async (objJson)=>{
                                setIsFilter(false);
                            }} ListOpccion={propsListOpccion} onChangeseach={async (json)=>{
                                let id = json['Empresa'];
                                await LoadDataProcesEmpresa(id);
                                setindexEmpresa(id)
                                setIsFilter(true);
                            }} ></Componentfilter>
                        </div>:<></>}
                        {/* Curpo */}
                        {(isFilter)?<div className="Container_ProcesEmpresas_principal_body">
                            <OpccionActions sise={35} opccionSistem={opccionSistem} />
                            <div className="Container_ProcesEmpresas_principal_body_subContainer">
                                {(listdata.length != 0)?listdata.map((item)=>{
                                    return (<ItemTrabjEmpresa onSelecteItem={(index)=>{
                                        AddItemDeleteProcesEmpresas(index);
                                    }} onChange={(index)=>{
                                        setindexOptionEmpresa(index);
                                        setismodelaEdit(true);
                                    }} keyitem = {item.id_proceso} title = {item.nombreProce} subtitle = {item.nombreTip} descrip = {item.descripccion} />)
                                }):<></>}
                            </div>
                        </div>:<></>}
                    </div>
                </div>
            </div>
            {(ismodeladd)?<AddProcesEmpresas informacionGeneral={indexEmpresa} onInsert={async ()=>{
                await LoadDataProcesEmpresa();
            }} propismodalvisible = {ismodeladd} propsetismodalvisible = {setismodeladd} />:<></>}
            {(ismodelaEdit)?<EditarProcesEmpresa informationDataGeneral = {indexEmpresa} onAction = {LoadDataProcesEmpresa} iskeyDatos = {indexOptionEmpresa} ismodalvisible = {ismodelaEdit} setismodalvisible = {setismodelaEdit} />:<></>}
        </div>
    );
}