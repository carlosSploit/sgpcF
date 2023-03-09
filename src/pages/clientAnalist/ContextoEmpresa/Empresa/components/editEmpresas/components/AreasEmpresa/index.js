import React, { useEffect, useState } from "react";
import "./styles/index.css"
import { useNotification } from "../../../../../../../../service/Notifications/NotificationProvider";
import { ConsuldataLogm, getKeysesion } from "../../../../../../../../service/repository/mithelworks";
import { deleteEmpresa, getEmpresas } from "../../../../../../../../service/repository/Empresas";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { handleNewNotification } from "../../../../../../../../service/Notifications/useNotificacion";
import { ItemEmpresa } from "./components/itemEmpresa";
import { OpccionActions } from "./components/opccionActions";
// import { Componentsearchanimation} from "../../../../service/morvius-service/component/components";
// import { AddEmpresas } from "./components/addEmpresas";
// import { getadmins } from '../../../../service/repository/Admin';
// import { EditarEmpresa } from "./components/editEmpresas";

export function AreasEmpresas(props){
    const [listdata,setlistdata] = useState([]);
    // const [listdataHistory,setlistdataHistory] = useState([]);
    // const [ismodeladd,setismodeladd] = useState(false);
    // const [ismodelaEdit,setismodelaEdit] = useState(false);
    // const [textsearch,settextsearch] = useState("");
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
        // setlistdataHistory([]);
        setTimeout(() => {
            setlistdata(result);
            // setlistdataHistory(result);
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

    const DeleteEmpresa = async (id_Empresa,id_clienAnalit) => {
        let result = await deleteEmpresa({id_empresa:id_Empresa, id_clienAnalit:id_clienAnalit});
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
                // setismodeladd(true);
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
                let secionkey = await getKeysesion();
                let dataUser = await ConsuldataLogm({seccionkey: secionkey});
                for (let index = 0; index < indexOptionEmpresaD.length; index++) {
                    const element = indexOptionEmpresaD[index];
                    await DeleteEmpresa(element, dataUser.id_inform);
                }
                handleNewNotification(dispatch,'Se realizo la eliminacion en exito', 200);
                await LoadDataEmpresa()
            }
        }
    ]

    return (
        <>
            <div className="Container_AreaEmpresas_principal_body">
                    <OpccionActions opccionSistem={opccionSistem} />
                    <div className="Container_AreaEmpresas_principal_body_subContainer">
                        {listdata.map((item)=>{
                            return (<ItemEmpresa onSelecteItem={(index)=>{
                                AddItemDeleteEmpresas(index);
                            }} onChange={(index)=>{
                                setindexOptionEmpresa(index);
                                // setismodelaEdit(true);
                            }} keyitem = {item.id_empresa} title = {item.nombreempresa} subtitle = {item.ruc} descrip = {item.descripc}></ItemEmpresa>)
                        })}
                    </div>
                </div>
            {/* <AddEmpresas onInsert={async ()=>{
                await LoadDataEmpresa();
            }} propismodalvisible = {ismodeladd} propsetismodalvisible = {setismodeladd} />
            {(ismodelaEdit)?<EditarEmpresa onAction = {LoadDataEmpresa} iskeyDatos = {indexOptionEmpresa} ismodalvisible = {ismodelaEdit} setismodalvisible = {setismodelaEdit} />:<></>} */}
        </>
    );
}