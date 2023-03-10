import React, { useEffect, useState } from "react";
import "./styles/index.css"
import { Componentfilter, Componentsearchanimation} from "../../../../service/morvius-service/component/components";
import { AddEmpresas, AddTrabEmpresas } from "./components/addTrabjEmpresa";
import { ItemTrabjEmpresa } from './components/itemTrabjEmpresa/index';
import { getadmins } from '../../../../service/repository/Admin';
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { OpccionActions } from "./components/opccionActions";
import { deleteEmpresa, getEmpresas } from "../../../../service/repository/RTEmpresas";
import { ConsuldataLogm, getKeysesion } from "../../../../service/repository/mithelworks";
import { EditarEmpresa } from "./components/editTrabjEmpresa";
import { useNotification } from "../../../../service/Notifications/NotificationProvider";
import { handleNewNotification } from "../../../../service/Notifications/useNotificacion";
import { deleteTrabajEmpresa, getTrabajEmpresa } from "../../../../service/repository/RTTrabajEmpresas";

export function TrabajoEmpresas(props){
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

    const LoadDataTrabjEmpresa = async (id = 0) => {
        let result = await getTrabajEmpresa((id == 0)?indexEmpresa:id);
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
        console.log(dataUser);
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

    const AddItemDeleteEmpresas = (id_TrabajEmpresa) => {
        let data = indexOptionEmpresaD.filter((item)=>{return item == id_TrabajEmpresa})
        if(data.length != 0){
            setindexOptionEmpresaD(indexOptionEmpresaD.filter((item)=>{return item != id_TrabajEmpresa}))
            return
        }
        let listdata = indexOptionEmpresaD;
        listdata.push(id_TrabajEmpresa);
        setindexOptionEmpresaD(listdata);
    }

    const DeleteTrabajEmpresa = async (id_TrabajEmpresa) => {
        let result = await deleteTrabajEmpresa({id_TrabajEmpresa:id_TrabajEmpresa});
    }

    // const onUpdate = async () => {
    //     let result = await getadmins(textsearch);
    //     setlistdata(result);
    // }

    // const onInsert = async () =>{
    //     let result = await getadmins(textsearch);
    //     setlistdata(result);
    // }

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
                    await DeleteTrabajEmpresa(element);
                }
                handleNewNotification(dispatch,'Se realizo la eliminacion en exito', 200);
                await LoadDataTrabjEmpresa()
            }
        }
    ]

    return (
        <div className="Container_Empresas_principal">
            <div className="Container_Empresas_principal_subConteiner">
                {/* Encabezado */}
                <div className="Container_Empresas_principal_header">
                    <div className="Container_Empresas_principal_header_subcontent_title">
                        <div className="Container_Empresas_principal_header_content_title">Lista de Trabajadores Empresas</div>
                    </div>
                    <div className="Container_Empresas_principal_header_subcontent_search">
                        <div className="Container_Empresas_principal_header_subcontent_search_cont">
                            <Componentsearchanimation onChangekey={onChangekey} onChangeseach={onChangeseach}/>
                        </div>
                    </div>
                </div>
                {(propsListOpccion.length != 0)?<div className="Container_Empresas_principal_header">
                    <Componentfilter ListOpccion={propsListOpccion} onChangeseach={async (json)=>{
                        let id = json['Empresa'];
                        await LoadDataTrabjEmpresa(id);
                        setindexEmpresa(id)
                    }} ></Componentfilter>
                </div>:<></>}
                
                {/* Curpo */}
                <div className="Container_Empresas_principal_body">
                    <OpccionActions opccionSistem={opccionSistem} />
                    <div className="Container_Empresas_principal_body_subContainer">
                        {listdata.map((item)=>{
                            return (<ItemTrabjEmpresa onSelecteItem={(index)=>{
                                AddItemDeleteEmpresas(index);
                            }} onChange={(index)=>{
                                setindexOptionEmpresa(index);
                                setismodelaEdit(true);
                            }} keyitem = {item.Id_trabajador} title = {item.nombre_apellido} subtitle = {item.cargo} descrip = {item.descripc} />)
                        })}
                    </div>
                </div>
            </div>
            {(ismodeladd)?<AddTrabEmpresas informacionGeneral={indexEmpresa} onInsert={async ()=>{
                await LoadDataTrabjEmpresa();
            }} propismodalvisible = {ismodeladd} propsetismodalvisible = {setismodeladd} />:<></>}
            {(ismodelaEdit)?<EditarEmpresa onAction = {LoadDataTrabjEmpresa} iskeyDatos = {indexOptionEmpresa} ismodalvisible = {ismodelaEdit} setismodalvisible = {setismodelaEdit} />:<></>}
        </div>
    );
}