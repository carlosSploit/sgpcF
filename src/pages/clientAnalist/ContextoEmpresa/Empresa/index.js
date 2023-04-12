import React, { useEffect, useState } from "react";
import "./styles/index.css"
import { Componentsearchanimation} from "../../../../service/morvius-service/component/components";
import { AddEmpresas } from "./components/addEmpresas";
import { ItemEmpresa } from './components/itemEmpresa/index';
import { getadmins } from '../../../../service/repository/Admin';
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
// import { OpccionActions } from "./components/opccionActions";
import { deleteEmpresa, getEmpresas } from "../../../../service/repository/RTEmpresas";
import { ConsuldataLogm, getKeysesion } from "../../../../service/repository/mithelworks";
import { EditarEmpresa } from "./components/editEmpresas";
import { useNotification } from "../../../../service/Notifications/NotificationProvider";
import { handleNewNotification } from "../../../../service/Notifications/useNotificacion";
import { OpccionActions } from "../../../../service/morvius-service/component/complements/componetOpccionActions";

export function Empresas(props){
    const [listdata,setlistdata] = useState([]);
    const [,setlistdataHistory] = useState([]);
    const [ismodeladd,setismodeladd] = useState(false);
    const [ismodelaEdit,setismodelaEdit] = useState(false);
    const [,settextsearch] = useState("");
    const [indexOptionEmpresa,setindexOptionEmpresa] = useState(0);
    const [indexOptionEmpresaD,setindexOptionEmpresaD] = useState([]);
    const dispatch = useNotification();
    
    useEffect(()=>{
        (async()=>{
            await LoadDataEmpresa();
        })();
    },[]);

    const LoadDataEmpresa = async () => {
        let secionkey = await getKeysesion();
        let dataUser = await ConsuldataLogm({seccionkey: secionkey});
        console.log(dataUser);
        let result = await getEmpresas(dataUser.id_inform);
        setlistdata([]);
        setlistdataHistory([]);
        setTimeout(() => {
            setlistdata(result);
            setlistdataHistory(result);
        }, 500);
    }

    const AddItemDeleteEmpresas = (id_empresa) => {
        let data = indexOptionEmpresaD.filter((item)=>{return item == id_empresa})
        if(data.length != 0){
            setindexOptionEmpresaD(indexOptionEmpresaD.filter((item)=>{return item != id_empresa}))
            return
        }
        let listdata = indexOptionEmpresaD;
        listdata.push(id_empresa);
        setindexOptionEmpresaD(listdata);
    }

    const DeleteEmpresa = async (id_Empresa) => {
        await deleteEmpresa({id_empresa:id_Empresa});
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
                for (let index = 0; index < indexOptionEmpresaD.length; index++) {
                    const element = indexOptionEmpresaD[index];
                    await DeleteEmpresa(element);
                }
                handleNewNotification(dispatch,'Se realizo la eliminacion en exito', 200);
                await LoadDataEmpresa()
            }
        }
    ]

    return (
        <div className="Container_Empresas_principal">
            <div className="Container_Empresas_principal_subConteiner">
                {/* Encabezado */}
                <div className="Container_Empresas_principal_header">
                    <div className="Container_Empresas_principal_header_subcontent_title">
                        <div className="Container_Empresas_principal_header_content_title">Lista de Empresas</div>
                    </div>
                    <div className="Container_Empresas_principal_header_subcontent_search">
                        <div className="Container_Empresas_principal_header_subcontent_search_cont">
                            <Componentsearchanimation height={'35px'} onChangekey={onChangekey} onChangeseach={onChangeseach}/>
                            <div style={{width: '20px'}}></div>
                        </div>
                    </div>
                </div>
                {/* Curpo */}
                <div className="Container_Empresas_principal_body">
                    <OpccionActions sise={35} opccionSistem={opccionSistem} />
                    <div className="Container_Empresas_principal_body_subContainer">
                        {listdata.map((item)=>{
                            return (<ItemEmpresa onSelecteItem={(index)=>{
                                AddItemDeleteEmpresas(index);
                            }} onChange={(index)=>{
                                setindexOptionEmpresa(index);
                                setismodelaEdit(true);
                            }} keyitem = {item.id_empresa} permis = {item.permis}  title = {item.nombreempresa} subtitle = {item.ruc} descrip = {item.descripc}></ItemEmpresa>)
                        })}
                    </div>
                </div>
            </div>
            <AddEmpresas onInsert={async ()=>{
                await LoadDataEmpresa();
            }} propismodalvisible = {ismodeladd} propsetismodalvisible = {setismodeladd} />
            {(ismodelaEdit)?<EditarEmpresa onAction = {LoadDataEmpresa} iskeyDatos = {indexOptionEmpresa} ismodalvisible = {ismodelaEdit} setismodalvisible = {setismodelaEdit} />:<></>}
        </div>
    );
}