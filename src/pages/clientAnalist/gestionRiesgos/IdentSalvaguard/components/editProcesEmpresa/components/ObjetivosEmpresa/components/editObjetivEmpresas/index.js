import { useEffect, useState } from "react";
import './style/index.css';
import { useNotification } from "../../../../../../../../../../service/Notifications/NotificationProvider";
import { handleNewNotification } from "../../../../../../../../../../service/Notifications/useNotificacion";
import { EditarRecursoSalvaguarImform } from "./components/EditarInformacion/Editar";
import { ComponentModalFlotingBody } from "../../../../../../../../../../service/morvius-service/components";
import { PopModal } from "../../../../../../../../../../service/morvius-service/component/complements/componentModal/componentModal";
import { getRecursSalvAfectAct } from "../../../../../../../../../../service/repository/RTRecursSalvAfectAct";

export function EditarRecursoSalvag(props){

    const [propismodalvisible,propsetismodalvisible ] = useState(false);
    const [propiskeyDatos, ] = useState(0);
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
        console.log(informationDataGeneralEmpre);
        let result = await getRecursSalvAfectAct(informationDataGeneralEmpre.id_salvAfectAct);
        let ListdataUser = result.filter((item)=>{return item.id_recurSalvAfectAct == iskeyDatos })
        if (ListdataUser.length == 0){
            handleNewNotification(dispatch,'Error al cargar la informacion.',404);
            setTimeout(() => {
                window.location.href = window.location.href;
                return;
            }, 500);
        }
        setlistview([<EditarRecursoSalvaguarImform onAction={async () => {
            await actualizeData();
            await onAction();
        }} onUpdate={onAction} informationDataGeneral={ListdataUser[0]}/>])
    }

    return (
            <>
            <PopModal namemodal = {"Editar el Recurso"} colorTitle={'#183152'} propismodalvisible = {ismodalvisible} propsetismodalvisible = {setismodalvisible}>
                <ComponentModalFlotingBody descripccion={""}>
                    <div style={{height: '10px'}}></div>
                    {listview[0]}
                </ComponentModalFlotingBody>
            </PopModal>
            </>);
}