import React, { useEffect, useState } from "react";
import "./styles/index.css"
import { useNotification } from "../../../../../../../../service/Notifications/NotificationProvider";
import { deleteTrabajRespon, getTrabajRespon } from "../../../../../../../../service/repository/RTTrabajRespon";
// import { deleteAreasInteraProces } from "../../../../../../../../service/repository/RTAreasInteraProces";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { handleNewNotification } from "../../../../../../../../service/Notifications/useNotificacion";
import { OpccionActions } from "../AreasInterviene/components/opccionActions";
// import { ItemAreasEmpresa } from "../AreasInterviene/components/itemAreasEmpresa";
// import { AddAreasInteraProces } from "../AreasInterviene/components/addAreasInterviene";
// import { deleteTrabajEmpresa } from "../../../../../../../../service/repository/RTTrabajEmpresas";
import { AddTrabajResponsabless } from "./components/addTrabajResponsables";
import { ItemTrabajResponsab } from "./components/itemTrabajResponsables";
// import { useNotification } from "../../../../../../../../service/Notifications/NotificationProvider";
// // import { ConsuldataLogm, getKeysesion } from "../../../../../../../../service/repository/mithelworks";
// // import { deleteEmpresa, getEmpresas } from "../../../../../../../../service/repository/RTEmpresas";
// import { ControlOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
// import { handleNewNotification } from "../../../../../../../../service/Notifications/useNotificacion";
// import { ItemAreasEmpresa, ItemEmpresa } from "./components/itemAreasEmpresa";
// import { OpccionActions } from "./components/opccionActions";
// // import { deleteAreasEmpresa, getAresEmpresa } from "../../../../../../../../service/repository/RTAreasEmpresas";
// import { AddAreasInteraProces } from "./components/addAreasInterviene";
// // import { EditarAreasEmpresa } from "./components/editAreasInterviene";
// import { deleteAreasInteraProces } from "../../../../../../../../service/repository/RTAreasInteraProces";
// import { getTrabajRespon } from "../../../../../../../../service/repository/RTTrabajRespon";
// import { Componentsearchanimation} from "../../../../service/morvius-service/component/components";
// import { AddEmpresas } from "./components/addEmpresas";
// import { getadmins } from '../../../../service/repository/Admin';
// import { EditarEmpresa } from "./components/editEmpresas";

export function TrabajResponsables(props){

    const {informationDataGeneral, informaDataEmpresa} = props;
    const [listdata,setlistdata] = useState([]);
    // const [listdataHistory,setlistdataHistory] = useState([]);
    const [ismodeladd,setismodeladd] = useState(false);
    const [ismodelaEdit,setismodelaEdit] = useState(false);
    // const [textsearch,settextsearch] = useState("");
    // const [indexOpccionAreasInteraProces,setindexOpccionAreasInteraProcesa] = useState(0);
    const [indexOpccionTrabajResponsablesD,setindexOpccionTrabajResponsablesD] = useState([]);
    const dispatch = useNotification();
    
    useEffect(()=>{
        (async()=>{
            await LoadDataTrabajResponsables();
            console.log(informaDataEmpresa)
        })();
    },[]);

    const LoadDataTrabajResponsables = async () => {
        // console.log(informationDataGeneral.id_empresa)
        let result = await getTrabajRespon(informationDataGeneral.id_proceso);
        console.log(result)
        setlistdata([]);
        // setlistdataHistory([]);
        setTimeout(() => {
            setlistdata(result);
            setindexOpccionTrabajResponsablesD([]);
            // setlistdataHistory(result);
        }, 500);
    }

    const AddItemDeleteTrabajRespon = (id_empresa) => {
        let data = indexOpccionTrabajResponsablesD.filter((item)=>{return item == id_empresa})
        if(data.length != 0){
            setindexOpccionTrabajResponsablesD(indexOpccionTrabajResponsablesD.filter((item)=>{return item != id_empresa}))
            return
        }
        let listdata = indexOpccionTrabajResponsablesD;
        listdata.push(id_empresa);
        setindexOpccionTrabajResponsablesD(listdata);
    }

    const DeleteTrabajRespon = async (id_TrabajEmpresa) => {
        await deleteTrabajRespon({id_areasEmpresa:id_TrabajEmpresa});
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
                if(indexOpccionTrabajResponsablesD.length == 0){
                    handleNewNotification(dispatch,'Selecciona una o varias empresas para poder eliminar', 404);
                    return
                }
                console.log(indexOpccionTrabajResponsablesD)
                for (let index = 0; index < indexOpccionTrabajResponsablesD.length; index++) {
                    const element = indexOpccionTrabajResponsablesD[index];
                    await DeleteTrabajRespon(element);
                }
                handleNewNotification(dispatch,'Se realizo la eliminacion en exito', 200);
                await LoadDataTrabajResponsables()
            }
        }
    ]

    return (
        <>
            <div className="Container_TrabajResponsables_principal_body">
                <OpccionActions opccionSistem={opccionSistem} />
                <div className="Container_TrabajResponsables_principal_body_subContainer">
                    {listdata.map((item)=>{
                        return (<ItemTrabajResponsab onSelecteItem={(index)=>{
                            AddItemDeleteTrabajRespon(index);
                        }} onChange={(index)=>{
                            // setindexOpccionAreasInteraProcesa(index);
                            setismodelaEdit(true);
                        }} keyitem = {item.id_resposProce} title = {item.nombre_apellido} descrip = {item.descripc} />)
                    })}
                </div>
            </div>
            <AddTrabajResponsabless informaDataEmpresa = {informaDataEmpresa} informationDataGeneral = {informationDataGeneral} onInsert={async ()=>{
                await LoadDataTrabajResponsables();
            }} propismodalvisible = {ismodeladd} propsetismodalvisible = {setismodeladd} />
            {/* {(ismodelaEdit)?<EditarAreasEmpresa informationDataGeneralEmpre={informationDataGeneral} onAction = {LoadDataAreasInteraProces} iskeyDatos = {indexOpccionAreasInteraProces} ismodalvisible = {ismodelaEdit} setismodalvisible = {setismodelaEdit} />:<></>} */}
            {/* 
             */}
        </>
    );
}