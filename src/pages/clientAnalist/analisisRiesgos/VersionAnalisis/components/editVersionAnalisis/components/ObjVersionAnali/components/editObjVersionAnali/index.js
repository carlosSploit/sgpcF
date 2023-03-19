import { useEffect, useState } from "react";
// import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader, ComponentModalPrincipalListtabs } from "../../../service/morvius-service/components";
// import { EditOutlined, PartitionOutlined } from "@ant-design/icons";
import './style/index.css';
import { useNotification } from "../../../../../../../../../../service/Notifications/NotificationProvider";
import { handleNewNotification } from "../../../../../../../../../../service/Notifications/useNotificacion";
import { ComponentModalFlotingBody, PopModal } from "../../../../../../../../../../service/morvius-service/component/complements/componentModal/componentModal";
import { getObjetivVersionAnalitic } from "../../../../../../../../../../service/repository/RTObjetivVersionAnalitic";
// import { getAresEmpresa } from "../../../../../../../../../../service/repository/RTAreasEmpresas";
// import { handleNewNotification } from "../../../../../../../../../../service/Notifications/useNotificacion";
// import { EditarAreasEmpresaInformation, EditarObjetivEmpresaInformation } from "./components/EditarInformacion/Editar";
// import { ComponentModalFlotingBody } from "../../../../../../../../../../service/morvius-service/components";
// import { PopModal } from "../../../../../../../../../../service/morvius-service/component/complements/componentModal/componentModal";
// import { getObjetivEmpresa } from "../../../../../../../../../../service/repository/RTObjetivEmpresas";
// import { EditarUsuario } from "./components/Editar";
// import { getKeysesion } from "../../../service/repository/mithelworks";
// import { ConsuldataLog } from "../../../service/repository/Usuarios";
// import { readclientAnalist } from "../../../service/repository/clientAnalist";
// import { EditarUsuarioSecion } from "./components/EditarSeccion";
// import { getEmpresas } from "../../../../../../service/repository/Empresas";
// import { handleNewNotification, useNotification } from "../../../../../../service/Notifications/useNotificacion";
import {EditarObjetivVersionAnaliticInformation } from "./components/EditarInformacion/Editar";
// import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader, ComponentModalPrincipalListtabs } from "../../../../../../service/morvius-service/components";
// import { getKeysesion } from "../../../../../../service/repository/mithelworks";
// import { ConsuldataLogm } from "../../../../../../service/repository/mithelworks";
// import { getAresEmpresa } from "../../../../../../../../../../service/repository/RTAreasEmpresas";
// import { PopModal } from "../../../../../../../../../../service/morvius-service/component/complements/componentModal/componentModal";

export function EditarObjetivVersionAnalitic(props){

    const [propismodalvisible,propsetismodalvisible ] = useState(false);
    const [propiskeyDatos,propsetiskeyDatos ] = useState(0);
    const {
        informationDataGeneralEmpre,
        iskeyDatos = propiskeyDatos,
        ismodalvisible = propismodalvisible,
        setismodalvisible = propsetismodalvisible,
        onAction = ()=>{}} = props;
    const dispatch = useNotification();
    const [listview,setlistview] = useState([<></>]);

    useEffect(()=>{
        (async () => {
            await actualizeData();
        })();
    },[]);

    const actualizeData = async () => {
        let result = await getObjetivVersionAnalitic(informationDataGeneralEmpre);
        let ListdataUser = result.filter((item)=>{return item.id_objVersAnali == iskeyDatos })
        if (ListdataUser.length == 0){
            handleNewNotification(dispatch,'Error al cargar la informacion.',404);
            setTimeout(() => {
                window.location.href = window.location.href;
                return;
            }, 500);
        }
        setlistview([<EditarObjetivVersionAnaliticInformation onAction={async () => {
            await actualizeData();
            await onAction();
        }} onUpdate={onAction} informationDataGeneral={ListdataUser[0]}/>])
    }

    return (
            <>
            <PopModal namemodal = {"Editar una Objetivo"} colorTitle={'#183152'} propismodalvisible = {ismodalvisible} propsetismodalvisible = {setismodalvisible}>
                <ComponentModalFlotingBody descripccion={""}>
                    <div style={{height: '10px'}}></div>
                    {listview[0]}
                </ComponentModalFlotingBody>
            </PopModal>
            </>);
}