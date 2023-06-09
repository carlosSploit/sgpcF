import React, { useEffect, useState } from "react";
import "./styles/index.css"
import { useNotification } from "../../../../../../../../../../service/Notifications/NotificationProvider";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { handleNewNotification } from "../../../../../../../../../../service/Notifications/useNotificacion";
import { ComponentModalFlotingBody, PopModal } from "../../../../../../../../../../service/morvius-service/component/complements/componentModal/componentModal";
import { OpccionActions } from "../../../AreasInterviene/components/opccionActions";
import { ItemAreasEmpresa } from "../../../AreasInterviene/components/itemAreasEmpresa";
import { deleteDependenActivos, getDependenActivos } from "../../../../../../../../../../service/repository/RTDependtActivos";
import { AddDependenActivosProceso } from "./components/addActivosProceso";
// import { useNotification } from "../../../../../../../../service/Notifications/NotificationProvider";
// import { deleteTrabajRespon, getTrabajRespon } from "../../../../../../../../service/repository/RTTrabajRespon";
// import { deleteAreasInteraProces } from "../../../../../../../../service/repository/RTAreasInteraProces";
// import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
// import { handleNewNotification } from "../../../../../../../../service/Notifications/useNotificacion";
// import { OpccionActions } from "../AreasInterviene/components/opccionActions";
// import { ItemAreasEmpresa } from "../AreasInterviene/components/itemAreasEmpresa";
// import { AddAreasInteraProces } from "../AreasInterviene/components/addAreasInterviene";
// import { deleteTrabajEmpresa } from "../../../../../../../../service/repository/RTTrabajEmpresas";
// import { AddTrabajResponsabless } from "./components/addTrabajResponsables";
// import { deleteActivosProceso, getActivosProceso } from "../../../../../../../../service/repository/RTActivosProceso";
// import { AddActivosProceso } from "./components/addActivosProceso";
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

export function EditarDependenActivosProceso(props){

    const [propismodalvisible,propsetismodalvisible] = useState(false);
    const {
        informationProceses, 
        // informaDataEmpresa,
        iskeyDatos,
        ismodalvisible = propismodalvisible,
        setismodalvisible = propsetismodalvisible,
    } = props;
    const [listdata,setlistdata] = useState([]);
    // const [listdataHistory,setlistdataHistory] = useState([]);
    const [ismodeladd,setismodeladd] = useState(false);
    const [ismodelaEdit,setismodelaEdit] = useState(false);
    // const [textsearch,settextsearch] = useState("");
    // const [indexOpccionAreasInteraProces,setindexOpccionAreasInteraProcesa] = useState(0);
    const [indexOpccionActivosProcesoD,setindexOpccionActivosProcesoD] = useState([]);
    const dispatch = useNotification();
    
    useEffect(()=>{
        (async()=>{
            await LoadDataActivosProceso();
        })();
    },[]);

    const LoadDataActivosProceso = async () => {
        // console.log(informationDataGeneral.id_empresa)
        // console.log(iskeyDatos)
        let result = await getDependenActivos(iskeyDatos.id_activproc);
        console.log(result)
        setlistdata([]);
        // setlistdataHistory([]);
        setTimeout(() => {
            setlistdata(result);
            setindexOpccionActivosProcesoD([]);
            // setlistdataHistory(result);
        }, 500);
    }

    const AddItemDeleteActivProceso = (id_empresa) => {
        let data = indexOpccionActivosProcesoD.filter((item)=>{return item == id_empresa})
        if(data.length != 0){
            setindexOpccionActivosProcesoD(indexOpccionActivosProcesoD.filter((item)=>{return item != id_empresa}))
            return
        }
        let listdata = indexOpccionActivosProcesoD;
        listdata.push(id_empresa);
        setindexOpccionActivosProcesoD(listdata);
    }

    const DeleteActivProces = async (id_dependActivo) => {
        await deleteDependenActivos({id_dependActivo:id_dependActivo});
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
                if(indexOpccionActivosProcesoD.length == 0){
                    handleNewNotification(dispatch,'Selecciona una o varias empresas para poder eliminar', 404);
                    return
                }
                console.log(indexOpccionActivosProcesoD)
                for (let index = 0; index < indexOpccionActivosProcesoD.length; index++) {
                    const element = indexOpccionActivosProcesoD[index];
                    await DeleteActivProces(element);
                }
                handleNewNotification(dispatch,'Se realizo la eliminacion en exito', 200);
                await LoadDataActivosProceso()
            }
        }
    ]

    return (
        <>
            <PopModal namemodal = {"Dependencia de Activos"} colorTitle={'#183152'} propismodalvisible = {ismodalvisible} propsetismodalvisible = {setismodalvisible}>
                <ComponentModalFlotingBody descripccion={""}>
                    <div style={{height: '5px'}}></div>
                    <div className="Container_DependenActivosProceso_principal_body">
                        <OpccionActions opccionSistem={opccionSistem} />
                        <div className="Container_DependenActivosProceso_principal_body_subContainer">
                            {listdata.map((item)=>{
                                return (<ItemAreasEmpresa onSelecteItem={(index)=>{
                                    AddItemDeleteActivProceso(index);
                                }} onChange={(index)=>{
                                    // setindexOpccionAreasInteraProcesa(index);
                                    setismodelaEdit(true);
                                }} keyitem = {item.id_depenActiv} subtitle={item.dependAbreb} title = {item.nombre_Activo} descrip = {item.descripc} />)
                            })}
                        </div>
                    </div>
                </ComponentModalFlotingBody>
            </PopModal>
            <AddDependenActivosProceso iskeyDatos = {iskeyDatos} informationProceses={informationProceses} onInsert={async ()=>{
                await LoadDataActivosProceso();
            }} propismodalvisible = {ismodeladd} propsetismodalvisible = {setismodeladd} />
            {/* {(ismodelaEdit)?<EditarAreasEmpresa informationDataGeneralEmpre={informationDataGeneral} onAction = {LoadDataAreasInteraProces} iskeyDatos = {indexOpccionAreasInteraProces} ismodalvisible = {ismodelaEdit} setismodalvisible = {setismodelaEdit} />:<></>} */}
            {/* 
             */}
        </>
    );
}