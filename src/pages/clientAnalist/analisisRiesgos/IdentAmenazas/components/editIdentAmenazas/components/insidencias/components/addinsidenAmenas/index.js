import React, { useEffect, useState } from "react";
import "./style/index.css";
// import {uploudImage} from "../../../../../../service/repository/uploudimage";
// import {addadmin} from "../../../../../../service/repository/Admin";
// import { useNotification, handleNewNotification } from "../../../../../../service/Notifications/useNotificacion";
// import { Forminput, ForminputArea, ForminputBotton, ForminputBottonSubmit, ForminputRadioSlice, ForminputSelectItem, Forminputnumber } from "../../../../../../service/morvius-service/form";
// import { ConsuldataLogm, getKeysesion } from "../../../../../../service/repository/mithelworks";
// import { addEmpresa, addSelectEmpresa, getEmpresas } from "../../../../../../service/repository/Empresas";
// import { EditOutlined } from "@ant-design/icons";
// import { NoExisteEmpresa } from "./components/noExisteEmpresa";
// import {  ExisteTrabajResponsabless } from "./components/existeAreaEmpresa";
import { ComponentModalFlotingBody } from "../../../../../../../../../../service/morvius-service/component/components";
import { PopModal } from "../../../../../../../../../../service/morvius-service/component/complements/componentModal/componentModal";
import { ExisteActivosProceso } from "./components/existeActivosProceso";
// import { ExisteEmpresa } from "./components/existeAreaEmpresa";

export function AddinsidenAmenas(props){
    const [ismodalvisible, setismodalvisible] = useState(false);
    const [propinformationDataGeneral,] = useState({
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
    });
    const [propinformaDataEmpresa,] = useState({});
    const { onInsert=()=>{}, 
            informationActivAnali = propinformaDataEmpresa, 
            propismodalvisible = ismodalvisible, 
            propsetismodalvisible = setismodalvisible, 
            informationDataGeneral = propinformationDataGeneral } = props;
    // const [index,setindex] = useState(0);
    const [listview,setlistview] = useState([]);

    useEffect(()=>{
        (async () => {
            setlistview([<ExisteActivosProceso informationActivAnali={informationActivAnali}  onInsert = {onInsert} informationDataGeneral = {informationDataGeneral} />]);
        })();
    },[])

    return (
        <>
            <PopModal namemodal = {"Enlazar una Insidencia"} colorTitle={'#183152'} propismodalvisible = {propismodalvisible} propsetismodalvisible = {propsetismodalvisible}>
                <ComponentModalFlotingBody descripccion={""}>
                <div style={{height: '10px'}}></div>
                {listview[0]}
                </ComponentModalFlotingBody>
            </PopModal>
        </>
    );
}