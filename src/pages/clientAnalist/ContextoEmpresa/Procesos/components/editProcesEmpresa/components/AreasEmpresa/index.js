import React, { useEffect, useState } from "react";
import "./styles/index.css"
import { useNotification } from "../../../../../../../../service/Notifications/NotificationProvider";
import { ConsuldataLogm, getKeysesion } from "../../../../../../../../service/repository/mithelworks";
import { deleteEmpresa, getEmpresas } from "../../../../../../../../service/repository/RTEmpresas";
import { ControlOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { handleNewNotification } from "../../../../../../../../service/Notifications/useNotificacion";
import { ItemAreasEmpresa, ItemEmpresa } from "./components/itemAreasEmpresa";
import { OpccionActions } from "./components/opccionActions";
import { deleteAreasEmpresa, getAresEmpresa } from "../../../../../../../../service/repository/RTAreasEmpresas";
import { AddAreaEmpresas } from "./components/addAreaEmpresas";
import { EditarAreasEmpresa } from "./components/editAreasEmpresas";
// import { Componentsearchanimation} from "../../../../service/morvius-service/component/components";
// import { AddEmpresas } from "./components/addEmpresas";
// import { getadmins } from '../../../../service/repository/Admin';
// import { EditarEmpresa } from "./components/editEmpresas";

export function AreasEmpresas(props){

    const {informationDataGeneral} = props;
    const [listdata,setlistdata] = useState([]);
    // const [listdataHistory,setlistdataHistory] = useState([]);
    const [ismodeladd,setismodeladd] = useState(false);
    const [ismodelaEdit,setismodelaEdit] = useState(false);
    // const [textsearch,settextsearch] = useState("");
    const [indexOpccionAreasEmpresa,setindexOpccionAreasEmpresa] = useState(0);
    const [indexOpccionAreasEmpresaD,setindexOpccionAreasEmpresaD] = useState([]);
    const dispatch = useNotification();
    
    useEffect(()=>{
        (async()=>{
            await LoadDataAreasEmpresa();
            console.log(informationDataGeneral)
        })();
    },[]);

    const LoadDataAreasEmpresa = async () => {
        console.log(informationDataGeneral.id_empresa)
        let result = await getAresEmpresa(informationDataGeneral.id_empresa);
        console.log(result)
        setlistdata([]);
        // setlistdataHistory([]);
        setTimeout(() => {
            setlistdata(result);
            setindexOpccionAreasEmpresaD([]);
            // setlistdataHistory(result);
        }, 500);
    }

    const AddItemDeleteAreaEmpresas = (id_empresa) => {
        let data = indexOpccionAreasEmpresaD.filter((item)=>{return item == id_empresa})
        if(data.length != 0){
            setindexOpccionAreasEmpresaD(indexOpccionAreasEmpresaD.filter((item)=>{return item != id_empresa}))
            return
        }
        let listdata = indexOpccionAreasEmpresaD;
        listdata.push(id_empresa);
        setindexOpccionAreasEmpresaD(listdata);
    }

    const DeleteAreaEmpresa = async (id_areasEmpresa) => {
        console.log(id_areasEmpresa)
        await deleteAreasEmpresa({id_areasEmpresa: id_areasEmpresa});
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
                if(indexOpccionAreasEmpresaD.length == 0){
                    handleNewNotification(dispatch,'Selecciona una o varias empresas para poder eliminar', 404);
                    return
                }
                console.log(indexOpccionAreasEmpresaD)
                for (let index = 0; index < indexOpccionAreasEmpresaD.length; index++) {
                    const element = indexOpccionAreasEmpresaD[index];
                    await DeleteAreaEmpresa(element);
                }
                handleNewNotification(dispatch,'Se realizo la eliminacion en exito', 200);
                await LoadDataAreasEmpresa()
            }
        }
    ]

    return (
        <>
            <div className="Container_AreaEmpresas_principal_body">
                    <OpccionActions opccionSistem={opccionSistem} />
                    <div className="Container_AreaEmpresas_principal_body_subContainer">
                        {listdata.map((item)=>{
                            return (<ItemAreasEmpresa onSelecteItem={(index)=>{
                                AddItemDeleteAreaEmpresas(index);
                            }} onChange={(index)=>{
                                setindexOpccionAreasEmpresa(index);
                                setismodelaEdit(true);
                            }} keyitem = {item.id_areempre} title = {item.nombrearea} descrip = {item.descriparea} />)
                        })}
                    </div>
                </div>
                <AddAreaEmpresas informationDataGeneral = {informationDataGeneral} onInsert={async ()=>{
                    await LoadDataAreasEmpresa();
                }} propismodalvisible = {ismodeladd} propsetismodalvisible = {setismodeladd} />
            
            {(ismodelaEdit)?<EditarAreasEmpresa informationDataGeneralEmpre={informationDataGeneral} onAction = {LoadDataAreasEmpresa} iskeyDatos = {indexOpccionAreasEmpresa} ismodalvisible = {ismodelaEdit} setismodalvisible = {setismodelaEdit} />:<></>}
            {/* 
             */}
        </>
    );
}