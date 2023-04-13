import { useEffect, useState } from "react";
import './style/index.css';
import { handleNewNotification, useNotification } from "../../../../../../service/Notifications/useNotificacion";
import { EditarInformacionSalvaguard } from "./components/EditarInformacion/Editar";
import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader, ComponentModalPrincipalListtabs } from "../../../../../../service/morvius-service/components";
import { EditOutlined, TeamOutlined, UsbOutlined } from "@ant-design/icons";
import { TrabajResponsables } from "./components/ResponsSalvaguardas";
import { getSalvaguAmenaz } from "../../../../../../service/repository/RTSalvagAmenaz";
import { RecurSalvaguard } from "./components/RecursosSalvaguardas";

export function EditarSalvagAmenaz(props){

    const [propismodalvisible,propsetismodalvisible ] = useState(false);
    const [propiskeyDatos, ] = useState(0);
    const {
        informationActivAnali,
        iskeyDatos = propiskeyDatos,
        ismodalvisible = propismodalvisible,
        setismodalvisible = propsetismodalvisible,
        onAction = ()=>{}} = props;
    const [index,setindex] = useState(0);
    const dispatch = useNotification();
    const [listview,setlistview] = useState([<></>]);

    useEffect(()=>{
        (async () => {
            await actualizeData();
        })();
    },[]);

    const actualizeData = async () => {
        let result = await getSalvaguAmenaz(informationActivAnali);
        let ListdataUser = result.filter((item)=>{return item.id_salvAfectAct == iskeyDatos })
        if (parseInt(ListdataUser.length) === 0){
            handleNewNotification(dispatch,'Error al cargar la informacion.',404);
            setTimeout(() => {
                // window.location.href = window.location.href;
                return;
            }, 500);
        }
        setlistview([<EditarInformacionSalvaguard onAction={async () => {
                await actualizeData();
                await onAction();
            }} onUpdate={onAction} infoEmpresa={informationActivAnali} informationDataGeneral={ListdataUser[0]}/>,
            // <AreasInterviene informationDataGeneral={ListdataUser[0]} informaDataEmpresa={informationDataGeneral}/>,
            <TrabajResponsables informationDataGeneral={ListdataUser[0]} /> ,
            // <ActivosProceso informationDataGeneral={ListdataUser[0]} informaDataEmpresa={informationDataGeneral}/>
            <RecurSalvaguard informationDataGeneral={ListdataUser[0]}/>
        ])
    }

    const listOpt = [
        {
            id: 0,
            label : "Editar",
            icontab : EditOutlined
        },{
            id: 1,
            label : "Responsables",
            icontab : TeamOutlined
        },{
            id: 2,
            label : "Recursos",
            icontab : UsbOutlined
        }
        
    ];

    const onChangeindex = (index,titletab) => {
        setindex(index);
    }

    return (
        <>
            <ComponentModalFloting statemode={ismodalvisible} width = {'400px'} >
                <ComponentModalFlotingHeader title="Mantenimiento de Salvaguardas" colorTitle={'#183152'} onClosechange={()=>{setismodalvisible(false);}} />
                <ComponentModalFlotingBody descripccion={""}>
                <div style={{height: '10px'}}></div>
                <ComponentModalPrincipalListtabs
                    listOptions = {listOpt}
                    onChangeindex = {onChangeindex}
                    chaindexselect = {index}
                    chasetindexselect = {setindex}
                    indexinitial = {listOpt[0].id}
                ></ComponentModalPrincipalListtabs>
                <div className="LinerSeparator"></div>
                <div style={{height: '5px'}}></div>
                {listview[index]}
                </ComponentModalFlotingBody>
            </ComponentModalFloting>
        </>
    );
}