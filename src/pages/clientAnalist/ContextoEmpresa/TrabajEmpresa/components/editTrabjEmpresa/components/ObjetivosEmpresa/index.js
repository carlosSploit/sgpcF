import React, { useEffect, useState } from "react";
import "./styles/index.css"
import { useNotification } from "../../../../../../../../service/Notifications/NotificationProvider";
import { deleteObjetivEmpresa, getObjetivEmpresa } from "../../../../../../../../service/repository/RTObjetivEmpresas";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { handleNewNotification } from "../../../../../../../../service/Notifications/useNotificacion";
import { OpccionActions } from "../AreasEmpresa/components/opccionActions";
import { ItemObjetivEmpresa } from "./components/itemObjetivEmpresa";
import { AddObjetivoEmpresas } from "./components/addObjetivosEmpresas";
// import { EditarObjetivEmpresaInformation } from "./components/editObjetivEmpresas/components/EditarInformacion/Editar";
import { EditarObjetivEmpresa } from "./components/editObjetivEmpresas/index";
// import { ConsuldataLogm, getKeysesion } from "../../../../../../../../service/repository/mithelworks";
// import { deleteEmpresa, getEmpresas } from "../../../../../../../../service/repository/RTEmpresas";
// import { ControlOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
// import { handleNewNotification } from "../../../../../../../../service/Notifications/useNotificacion";
// import { ItemObjetivEmpresa, ItemEmpresa } from "./components/itemObjetivEmpresa/index";
// import { OpccionActions } from "./components/opccionActions";
// import { deleteObjetivEmpresa, getAresEmpresa } from "../../../../../../../../service/repository/RTObjetivEmpresas";
// import { AddAreaEmpresas } from "./components/addAreaEmpresas";
// import { EditarObjetivEmpresa } from "./components/editObjetivEmpresas";
// import { getObjetivEmpresa } from "../../../../../../../../service/repository/RTObjetivEmpresas";
// import { Componentsearchanimation} from "../../../../service/morvius-service/component/components";
// import { AddEmpresas } from "./components/addEmpresas";
// import { getadmins } from '../../../../service/repository/Admin';
// import { EditarEmpresa } from "./components/editEmpresas";

export function ObjetivEmpresas(props){

    const {informationDataGeneral} = props;
    const [listdata,setlistdata] = useState([]);
    // const [listdataHistory,setlistdataHistory] = useState([]);
    const [ismodeladd,setismodeladd] = useState(false);
    const [ismodelaEdit,setismodelaEdit] = useState(false);
    // const [textsearch,settextsearch] = useState("");
    const [indexOpccionObjetivEmpresa,setindexOpccionObjetivEmpresa] = useState(0);
    const [indexOpccionObjetivEmpresaD,setindexOpccionObjetivEmpresaD] = useState([]);
    const dispatch = useNotification();
    
    useEffect(()=>{
        (async()=>{
            await LoadDataObjetivEmpresa();
            console.log(informationDataGeneral)
        })();
    },[]);

    const LoadDataObjetivEmpresa = async () => {
        console.log(informationDataGeneral.id_empresa)
        let result = await getObjetivEmpresa(informationDataGeneral.id_empresa);
        console.log(result)
        setlistdata([]);
        // setlistdataHistory([]);
        setTimeout(() => {
            setlistdata(result);
            setindexOpccionObjetivEmpresaD([]);
            // setlistdataHistory(result);
        }, 500);
    }

    const AddItemDeleteObjetivEmpresa = (id_objempresa) => {
        let data = indexOpccionObjetivEmpresaD.filter((item)=>{return item == id_objempresa})
        if(data.length != 0){
            setindexOpccionObjetivEmpresaD(indexOpccionObjetivEmpresaD.filter((item)=>{return item != id_objempresa}))
            return
        }
        let listdata = indexOpccionObjetivEmpresaD;
        listdata.push(id_objempresa);
        setindexOpccionObjetivEmpresaD(listdata);
    }

    const DeleteObjetivEmpresa = async (id_ObjetivEmpresa) => {
        console.log(id_ObjetivEmpresa)
        await deleteObjetivEmpresa({id_ObjetivEmpresa: id_ObjetivEmpresa});
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
                setismodeladd(true);
            }
        },
        {
            label: "Eliminar",
            icon: DeleteOutlined,
            onChange: async () => {
                if(indexOpccionObjetivEmpresaD.length == 0){
                    handleNewNotification(dispatch,'Selecciona una o varias empresas para poder eliminar', 404);
                    return
                }
                console.log(indexOpccionObjetivEmpresaD)
                for (let index = 0; index < indexOpccionObjetivEmpresaD.length; index++) {
                    const element = indexOpccionObjetivEmpresaD[index];
                    await DeleteObjetivEmpresa(element);
                }
                handleNewNotification(dispatch,'Se realizo la eliminacion en exito', 200);
                await LoadDataObjetivEmpresa()
            }
        }
    ]

    return (
        <>
            <div className="Container_ObjEmpresas_principal_body">
                <OpccionActions opccionSistem={opccionSistem} />
                <div className="Container_ObjEmpresas_principal_body_subContainer">
                    {listdata.map((item)=>{
                        return (<ItemObjetivEmpresa onSelecteItem={(index)=>{
                            AddItemDeleteObjetivEmpresa(index);
                        }} onChange={(index)=>{
                            setindexOpccionObjetivEmpresa(index);
                            setismodelaEdit(true);
                        }} keyitem = {item.id_objempresa} title = {item.nombreobj} />)
                    })}
                </div>
            </div>
            <AddObjetivoEmpresas informationDataGeneral = {informationDataGeneral} onInsert={async ()=>{
                await LoadDataObjetivEmpresa();
            }} propismodalvisible = {ismodeladd} propsetismodalvisible = {setismodeladd} />
            {(ismodelaEdit)?<EditarObjetivEmpresa informationDataGeneralEmpre={informationDataGeneral} onAction = {LoadDataObjetivEmpresa} iskeyDatos = {indexOpccionObjetivEmpresa} ismodalvisible = {ismodelaEdit} setismodalvisible = {setismodelaEdit} />:<></>}
                {/* 
             */}
            {/*  */}
            {/* 
             */}
        </>
    );
}