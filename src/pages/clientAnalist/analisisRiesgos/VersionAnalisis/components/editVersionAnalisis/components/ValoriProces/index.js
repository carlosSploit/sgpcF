import { useEffect, useState } from "react";
// import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader, ComponentModalPrincipalListtabs } from "../../../service/morvius-service/components";
// import { EditOutlined, PartitionOutlined } from "@ant-design/icons";
import './style/index.css';
import { useNotification } from "../../../../../../../../service/Notifications/NotificationProvider";
import { getValoriProceso } from "../../../../../../../../service/repository/RTValorizarProces";
import { handleNewNotification } from "../../../../../../../../service/Notifications/useNotificacion";
// import { useNotification } from "../../../../../../../../../../service/Notifications/NotificationProvider";
// import { handleNewNotification } from "../../../../../../../../../../service/Notifications/useNotificacion";
// import { ComponentModalFlotingBody, PopModal } from "../../../../../../../../../../service/morvius-service/component/complements/componentModal/componentModal";
// import { getObjetivVersionAnalitic } from "../../../../../../../../../../service/repository/RTObjetivVersionAnalitic";
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
import { EditarValorProcesImformation } from "./components/EditarInformacion/Editar";
// import { getValoriProceso } from "../../../../../../../../service/repository/RTValorizarProces";
// import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader, ComponentModalPrincipalListtabs } from "../../../../../../service/morvius-service/components";
// import { getKeysesion } from "../../../../../../service/repository/mithelworks";
// import { ConsuldataLogm } from "../../../../../../service/repository/mithelworks";
// import { getAresEmpresa } from "../../../../../../../../../../service/repository/RTAreasEmpresas";
// import { PopModal } from "../../../../../../../../../../service/morvius-service/component/complements/componentModal/componentModal";

export function EditarValorProces(props){

    const {
        informationDataGeneral,
        onAction = ()=>{}} = props;
    const dispatch = useNotification();
    const [listview,setlistview] = useState([<></>]);

    useEffect(()=>{
        (async () => {
            await actualizeData();
        })();
    },[]);

    const actualizeData = async () => {
        let result = await getValoriProceso(informationDataGeneral);
        console.log(result)
        // let ListdataUser = result.filter((item)=>{return parseInt(item.id_valorProc) === parseInt(iskeyDatos) })
        if (parseInt(result.length) === 0){
            handleNewNotification(dispatch,'Error al cargar la informacion.',404);
            setTimeout(() => {
                window.location.href = window.location.href;
            }, 1000);
            return
        }
        setlistview([<EditarValorProcesImformation onAction={async () => {
            await actualizeData();
            await onAction();
        }} onUpdate={onAction} informationDataGeneral={result[0]}/>])
    }

    return (<>
        {listview[0]}
    </>);
}