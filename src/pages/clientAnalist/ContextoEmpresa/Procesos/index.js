import React, { useEffect, useState } from "react";
import "./styles/index.css"
import { Componentfilter, Componentsearchanimation} from "../../../../service/morvius-service/component/components";
import { AddEmpresas, AddTrabEmpresas } from "./components/addProcesEmpresa";
import { ItemTrabjEmpresa } from './components/itemProcesEmpresa/index';
import { getadmins } from '../../../../service/repository/Admin';
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { OpccionActions } from "./components/opccionActions";
import { getEmpresas } from "../../../../service/repository/RTEmpresas";
import { ConsuldataLogm, getKeysesion } from "../../../../service/repository/mithelworks";
// import { EditarTrabEmpresa } from "./components/editProcesEmpresa";
import { useNotification } from "../../../../service/Notifications/NotificationProvider";
import { handleNewNotification } from "../../../../service/Notifications/useNotificacion";
import { deleteTrabajEmpresa, getTrabajEmpresa } from "../../../../service/repository/RTTrabajEmpresas";
import { deleteProcesEmpresa, getProcesEmpresa } from "../../../../service/repository/RTProcesEmpresas";

export function ProcesEmpresas(props){
    const [propsListOpccion, prososetListOpccion] = useState([]);
    const [listdata,setlistdata] = useState([]);
    const [listdataHistory,setlistdataHistory] = useState([]);
    const [ismodeladd,setismodeladd] = useState(false);
    const [ismodelaEdit,setismodelaEdit] = useState(false);
    const [textsearch,settextsearch] = useState("");
    const [indexEmpresa,setindexEmpresa] = useState(0);
    const [indexOptionEmpresa,setindexOptionEmpresa] = useState(0);
    const [indexOptionEmpresaD,setindexOptionEmpresaD] = useState([]);
    const dispatch = useNotification();
    
    useEffect(()=>{
        (async()=>{
            // await LoadDataEmpresa();
            await GenerateEmpresa();
        })();
    },[]);

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
                        <div className="Container_ProcesEmpresas_principal_header_subcontent_search_cont">
                            <Componentsearchanimation onChangekey={onChangekey} onChangeseach={onChangeseach}/>
                        </div>
                    </div>
                </div>
                {(propsListOpccion.length != 0)?<div className="Container_ProcesEmpresas_principal_header">
                    <Componentfilter ListOpccion={propsListOpccion} onChangeseach={async (json)=>{
                        let id = json['Empresa'];
                        await LoadDataProcesEmpresa(id);
                        setindexEmpresa(id)
                    }} ></Componentfilter>
                </div>:<></>}
                
                {/* Curpo */}
                <div className="Container_ProcesEmpresas_principal_body">
                    <OpccionActions opccionSistem={opccionSistem} />
                    <div className="Container_ProcesEmpresas_principal_body_subContainer">
                        {listdata.map((item)=>{
                            return (<ItemTrabjEmpresa onSelecteItem={(index)=>{
                                AddItemDeleteProcesEmpresas(index);
                            }} onChange={(index)=>{
                                setindexOptionEmpresa(index);
                                setismodelaEdit(true);
                            }} keyitem = {item.id_proceso} title = {item.nombreProce} subtitle = {item.nombreTip} descrip = {item.descripccion} />)
                        })}
                    </div>
                </div>
            </div>
            {/* {(ismodeladd)?<AddTrabEmpresas informacionGeneral={indexEmpresa} onInsert={async ()=>{
                await LoadDataTrabjEmpresa();
            }} propismodalvisible = {ismodeladd} propsetismodalvisible = {setismodeladd} />:<></>} */}
            {/* {(ismodelaEdit)?<EditarTrabEmpresa informationDataGeneral = {indexEmpresa} onAction = {LoadDataTrabjEmpresa} iskeyDatos = {indexOptionEmpresa} ismodalvisible = {ismodelaEdit} setismodalvisible = {setismodelaEdit} />:<></>} */}
        </div>
    );
}