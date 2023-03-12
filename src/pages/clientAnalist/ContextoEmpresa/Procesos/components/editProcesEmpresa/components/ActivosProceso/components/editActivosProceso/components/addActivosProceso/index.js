import React, { useState } from "react";
import "./style/index.css";
import { ComponentModalFlotingBody } from "../../../../../../../../../../../../service/morvius-service/components";
import { PopModal } from "../../../../../../../../../../../../service/morvius-service/component/complements/componentModal/componentModal";
// import {uploudImage} from "../../../../../../service/repository/uploudimage";
// import {addadmin} from "../../../../../../service/repository/Admin";
// import { useNotification, handleNewNotification } from "../../../../../../service/Notifications/useNotificacion";
// import { Forminput, ForminputArea, ForminputBotton, ForminputBottonSubmit, ForminputRadioSlice, ForminputSelectItem, Forminputnumber } from "../../../../../../service/morvius-service/form";
// import { ConsuldataLogm, getKeysesion } from "../../../../../../service/repository/mithelworks";
// import { addEmpresa, addSelectEmpresa, getEmpresas } from "../../../../../../service/repository/Empresas";
// import { EditOutlined } from "@ant-design/icons";
// import { NoExisteEmpresa } from "./components/noExisteEmpresa";
// import {  ExisteTrabajResponsabless } from "./components/existeAreaEmpresa";
// import { ComponentModalFlotingBody } from "../../../../../../../../../../service/morvius-service/component/components";
// import { PopModal } from "../../../../../../../../../../service/morvius-service/component/complements/componentModal/componentModal";
import { ExisteDependenActivosProceso } from "./components/existeActivosProceso";
// import { ExisteEmpresa } from "./components/existeAreaEmpresa";

export function AddDependenActivosProceso(props){
    const [ismodalvisible, setismodalvisible] = useState(false);
    const [propinformationDataGeneral, propsetinformationDataGeneral] = useState({});
    const [propinformaDataEmpresa, propsetinformaDataEmpresa] = useState({});
    const { onInsert=()=>{}, iskeyDatos = propinformaDataEmpresa, setiskeyDatos = propsetinformaDataEmpresa, propismodalvisible = ismodalvisible, propsetismodalvisible = setismodalvisible, informationProceses = propinformationDataGeneral , setinformationDataGeneral = propsetinformationDataGeneral } = props;
    // const [index,setindex] = useState(0);
    const [listview,setlistview] = useState([<ExisteDependenActivosProceso informationDataGeneral={iskeyDatos}  onInsert = {onInsert} informationProceses = {informationProceses} />]);

    return (
        <>
            <PopModal namemodal = {"Enlazar Dependencia de Activos"} colorTitle={'#183152'} propismodalvisible = {propismodalvisible} propsetismodalvisible = {propsetismodalvisible}>
                <ComponentModalFlotingBody descripccion={""}>
                <div style={{height: '10px'}}></div>
                {listview[0]}
                </ComponentModalFlotingBody>
            </PopModal>
        </>
    );
}