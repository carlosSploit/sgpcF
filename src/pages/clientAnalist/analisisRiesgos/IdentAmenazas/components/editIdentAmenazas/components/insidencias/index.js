import React, { useEffect, useState } from "react";
import "./styles/index.css"
import { useNotification } from "../../../../../../../../service/Notifications/NotificationProvider";
// import { deleteTrabajRespon, getTrabajRespon } from "../../../../../../../../service/repository/RTTrabajRespon";
// import { deleteAreasInteraProces } from "../../../../../../../../service/repository/RTAreasInteraProces";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { handleNewNotification } from "../../../../../../../../service/Notifications/useNotificacion";
import { OpccionActions } from "./components/opccionActions";
// import { ItemAreasEmpresa } from "../AreasInterviene/components/itemAreasEmpresa";
// import { AddAreasInteraProces } from "../AreasInterviene/components/addAreasInterviene";
// import { deleteTrabajEmpresa } from "../../../../../../../../service/repository/RTTrabajEmpresas";
// import { AddTrabajResponsabless } from "./components/addTrabajResponsables";
import { deleteActivosProceso } from "../../../../../../../../service/repository/RTActivosProceso";
// import { AddActivosProceso } from "./components/addActivosProceso";
// import { ItemActivosProces } from "./components/itemActivosProceso/index";
// import { EditarDependenActivosProceso } from "./components/editActivosProceso";
import { getAfectaAtivInsidencia } from "../../../../../../../../service/repository/RTAfectaActiv";
import { ItemInsidensAmenas } from "./components/itemInsidencias";
import { AddinsidenAmenas } from "./components/addinsidenAmenas";
import { deleteAfecActivInsiden, getAfecActivInsiden } from "../../../../../../../../service/repository/RTAfecActivInsiden";
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

export function InsidensAmenaza(props){

    const {informationDataGeneral = {
        "id_afectaActiv": 62,
        "id_activProsVerAnali": 35,
        "valoriActivCuanti": 100,
        "valoriActivCualiti": 9,
        "id_valorAfectAmen": null,
        "id_Frecuencia": null,
        "valorFrecuenCuali": null,
        "valorFrecuenCuanti": null,
        "nameFrecuencia": null,
        "valDegradCualit": null,
        "id_DegradCualit": null,
        "valImpacCualit": null,
        "valImpacCuanti": null,
        "valRiesgoCualit": null,
        "valRiesgoCuanti": null,
        "id_amenaza": 12,
        "esenario": "",
        "abreb": "I",
        "nombreAmena": "Fallo de servicios de comunicaciones",
        "id_tipoActiv": 2,
        "nombreTipoActiv": "De origen industrial"
    }, informationActivAnali} = props;
    const [listdata,setlistdata] = useState([]);
    // const [listdataHistory,setlistdataHistory] = useState([]);
    const [ismodeladd,setismodeladd] = useState(false);
    // const [ismodelaEdit,setismodelaEdit] = useState(false);
    // const [textsearch,settextsearch] = useState("");
    // const [indexSelectObjActivosProces,setSelectObjActivosProces] = useState(0);
    const [indexOpccionActivosProcesoD,setindexOpccionActivosProcesoD] = useState([]);
    const dispatch = useNotification();
    
    useEffect(()=>{
        (async()=>{
            await LoadDataActivosProceso();
            // console.log(informaDataEmpresa)
        })();
    },[]);

    const LoadDataActivosProceso = async () => {
        let result = await getAfecActivInsiden(informationDataGeneral.id_afectaActiv);
        setlistdata([]);
        setTimeout(() => {
            setlistdata(result);
            setindexOpccionActivosProcesoD([]);
        }, 500);
    }

    const AddItemDeleteeAfecActivInsiden = (id_afecActivInsiden) => {
        let data = indexOpccionActivosProcesoD.filter((item)=>{return item == id_afecActivInsiden})
        if(data.length != 0){
            setindexOpccionActivosProcesoD(indexOpccionActivosProcesoD.filter((item)=>{return item != id_afecActivInsiden}))
            return
        }
        let listdata = indexOpccionActivosProcesoD;
        listdata.push(id_afecActivInsiden);
        setindexOpccionActivosProcesoD(listdata);
    }

    const DeleteAfecActivInsiden = async (id_TrabajEmpresa) => {
        await deleteAfecActivInsiden({id_areasEmpresa:id_TrabajEmpresa});
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
                if(indexOpccionActivosProcesoD.length == 0){
                    handleNewNotification(dispatch,'Selecciona una o varias empresas para poder eliminar', 404);
                    return
                }
                console.log(indexOpccionActivosProcesoD)
                for (let index = 0; index < indexOpccionActivosProcesoD.length; index++) {
                    const element = indexOpccionActivosProcesoD[index];
                    await DeleteAfecActivInsiden(element);
                }
                handleNewNotification(dispatch,'Se realizo la eliminacion en exito', 200);
                await LoadDataActivosProceso()
            }
        }
    ]

    return (
        <>
            <div className="Container_insidenciasAmenas_principal_body">
                <OpccionActions opccionSistem={opccionSistem} />
                <div className="Container_insidenciasAmenas_principal_body_subContainer">
                    {listdata.map((item)=>{
                        // console.log(item)
                        return (<ItemInsidensAmenas subtitle = {item.fechainside} onSelecteItem={(index)=>{
                            AddItemDeleteeAfecActivInsiden(index);
                        }} onChange={(index)=>{
                        }} keyitem = {item.id_afectaActivInsid} title = {item.nombroInsid} descrip = {item.descrpInsid} />)
                    })}
                </div>
            </div>
            {(ismodeladd)?<AddinsidenAmenas informationActivAnali = {informationActivAnali} informationDataGeneral = {informationDataGeneral} onInsert={async ()=>{
                await LoadDataActivosProceso();
            }} propismodalvisible = {ismodeladd} propsetismodalvisible = {setismodeladd} />:<></>}
            {/* {(ismodelaEdit)?<EditarDependenActivosProceso informationProceses={informationDataGeneral} iskeyDatos = {indexSelectObjActivosProces} ismodalvisible = {ismodelaEdit} setismodalvisible = {setismodelaEdit} />:<></>} */}
            {/* 
             */}
        </>
    );
}