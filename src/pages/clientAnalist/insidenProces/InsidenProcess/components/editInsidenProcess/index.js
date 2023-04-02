import { useEffect, useState } from "react";
import './style/index.css';
import { handleNewNotification, useNotification } from "../../../../../../service/Notifications/useNotificacion";
import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader } from "../../../../../../service/morvius-service/components";
import { ExisteInsidenciaProces } from "./components/EditarInformacion";
import { getInsideProces } from "../../../../../../service/repository/RTInsidencias";

export function EditarInsidenProces(props){

    const [propismodalvisible,propsetismodalvisible ] = useState(false);
    const [propiskeyDatos, ] = useState(0);
    const {
        onUpdate = ()=>{},
        iskeyDatos = propiskeyDatos,
        informationDataGeneral, // informacion del proceso 
        ismodalvisible = propismodalvisible,
        setismodalvisible = propsetismodalvisible
    } = props;
    // const [index,setindex] = useState(0);
    const [listview,setlistview] = useState([<></>]);
    const dispatch = useNotification();
    

    useEffect(()=>{
        (async () => {
            await actualizeData();
        })();
    },[]);

    const actualizeData = async () => {
        let result = await getInsideProces(informationDataGeneral);
        let ListdataUser = result.filter((item)=>{return item.id_insidencia == iskeyDatos })
        if (ListdataUser.length == 0){
            handleNewNotification(dispatch,'Error al cargar la informacion.',404);
            setTimeout(() => {
                window.location.href = window.location.href;
                return;
            }, 500);
        } 
        setlistview([<ExisteInsidenciaProces informacionProceso={informationDataGeneral} informationGeneral={ListdataUser[0]} onUpdate={onUpdate} />])
    }

    return (<ComponentModalFloting statemode={ismodalvisible} width = {'400px'} >
                <ComponentModalFlotingHeader title="Editar Insidencia" colorTitle={'#183152'} onClosechange={()=>{setismodalvisible(false);}} />
                <ComponentModalFlotingBody descripccion={""}>
                <div style={{height: '10px'}}></div>
                {listview[0]}
                </ComponentModalFlotingBody>
            </ComponentModalFloting>);
}