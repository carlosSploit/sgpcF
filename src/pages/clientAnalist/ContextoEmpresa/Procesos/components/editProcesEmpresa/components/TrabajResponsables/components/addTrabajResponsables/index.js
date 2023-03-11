import React, { useState } from "react";
import "./style/index.css";
// import {uploudImage} from "../../../../../../service/repository/uploudimage";
// import {addadmin} from "../../../../../../service/repository/Admin";
// import { useNotification, handleNewNotification } from "../../../../../../service/Notifications/useNotificacion";
// import { Forminput, ForminputArea, ForminputBotton, ForminputBottonSubmit, ForminputRadioSlice, ForminputSelectItem, Forminputnumber } from "../../../../../../service/morvius-service/form";
// import { ConsuldataLogm, getKeysesion } from "../../../../../../service/repository/mithelworks";
// import { addEmpresa, addSelectEmpresa, getEmpresas } from "../../../../../../service/repository/Empresas";
// import { EditOutlined } from "@ant-design/icons";
// import { NoExisteEmpresa } from "./components/noExisteEmpresa";
import {  ExisteTrabajResponsabless } from "./components/existeAreaEmpresa";
import { ComponentModalFlotingBody } from "../../../../../../../../../../service/morvius-service/component/components";
import { PopModal } from "../../../../../../../../../../service/morvius-service/component/complements/componentModal/componentModal";
// import { ExisteEmpresa } from "./components/existeAreaEmpresa";

export function AddTrabajResponsabless(props){
    const [ismodalvisible, setismodalvisible] = useState(false);
    const [propinformationDataGeneral, propsetinformationDataGeneral] = useState({});
    const [propinformaDataEmpresa, propsetinformaDataEmpresa] = useState({});
    const { onInsert=()=>{}, informaDataEmpresa = propinformaDataEmpresa, setinformaDataEmpresa = propsetinformaDataEmpresa, propismodalvisible = ismodalvisible, propsetismodalvisible = setismodalvisible, informationDataGeneral = propinformationDataGeneral , setinformationDataGeneral = propsetinformationDataGeneral } = props;
    // const [index,setindex] = useState(0);
    const [listview,setlistview] = useState([<ExisteTrabajResponsabless informaDataEmpresa={informaDataEmpresa}  onInsert = {onInsert} informationDataGeneral = {informationDataGeneral} />]);

    return (
        <>
            <PopModal namemodal = {"Enlazar un Responsable"} colorTitle={'#183152'} propismodalvisible = {propismodalvisible} propsetismodalvisible = {propsetismodalvisible}>
                <ComponentModalFlotingBody descripccion={""}>
                <div style={{height: '10px'}}></div>
                {listview[0]}
                </ComponentModalFlotingBody>
            </PopModal>
        </>
    );
}