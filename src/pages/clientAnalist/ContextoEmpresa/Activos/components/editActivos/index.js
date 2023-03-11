import { useEffect, useState } from "react";
// import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader, ComponentModalPrincipalListtabs } from "../../../service/morvius-service/components";
// import { BulbOutlined, EditOutlined, PartitionOutlined } from "@ant-design/icons";
import './style/index.css';
// import { EditarUsuario } from "./components/Editar";
// import { getKeysesion } from "../../../service/repository/mithelworks";
// import { ConsuldataLog } from "../../../service/repository/Usuarios";
// import { readclientAnalist } from "../../../service/repository/clientAnalist";
// import { EditarUsuarioSecion } from "./components/EditarSeccion";
// import { getEmpresas } from "../../../../../../service/repository/RTEmpresas";
import { handleNewNotification, useNotification } from "../../../../../../service/Notifications/useNotificacion";
import { EditarActivoEmpresa } from "./components/EditarInformacion/Editar";
import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader } from "../../../../../../service/morvius-service/components";
// import { getKeysesion } from "../../../../../../service/repository/mithelworks";
// import { ConsuldataLogm } from "../../../../../../service/repository/mithelworks";
// import { AreasEmpresas } from "./components/AreasEmpresa";
// import { ObjetivEmpresas } from "./components/ObjetivosEmpresa";
// import { getTrabajEmpresa } from "../../../../../../service/repository/RTTrabajEmpresas";
// import { EditOutlined, PartitionOutlined, TeamOutlined } from "@ant-design/icons";
// import { getProcesEmpresa } from "../../../../../../service/repository/RTProcesEmpresas";
// import { AreasInterviene } from "./components/AreasInterviene";
// import { TrabajResponsables } from "./components/TrabajResponsables";
import { getActivosEmpresa } from "../../../../../../service/repository/RTActivos";

export function EditarActivosEmpresa(props){

    const [propismodalvisible,propsetismodalvisible ] = useState(false);
    const [propiskeyDatos,propsetiskeyDatos ] = useState(0);
    const {
        informationDataGeneral,
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
        // let seskey = await getKeysesion();
        // let dataRed = await ConsuldataLogm({seccionkey: seskey});
        let result = await getActivosEmpresa(informationDataGeneral);
        // console.log(result)
        // console.log(iskeyDatos)
        let ListdataUser = result.filter((item)=>{return item.id_activo == iskeyDatos })
        if (ListdataUser.length == 0){
            handleNewNotification(dispatch,'Error al cargar la informacion.',404);
            setTimeout(() => {
                window.location.href = window.location.href;
                return;
            }, 500);
        }
        setlistview([<EditarActivoEmpresa onAction={async () => {
                await actualizeData();
                await onAction();
            }} onUpdate={onAction} infoEmpresa={informationDataGeneral} informationDataGeneral={ListdataUser[0]}/>,
            // <AreasInterviene informationDataGeneral={ListdataUser[0]} informaDataEmpresa={informationDataGeneral}/>,
            // <TrabajResponsables informationDataGeneral={ListdataUser[0]} informaDataEmpresa={informationDataGeneral}/>
            // ,<ObjetivEmpresas informationDataGeneral={ListdataUser[0]}/>
        ])
    }

    // const listOpt = [
    //     {
    //         id: 0,
    //         label : "Editar",
    //         icontab : EditOutlined
    //     },{
    //         id: 1,
    //         label : "Areas",
    //         icontab : PartitionOutlined
    //     },{
    //         id: 2,
    //         label : "Responsables",
    //         icontab : TeamOutlined
    //     }
        
    // ];

    // const onChangeindex = (index,titletab) => {
    //     setindex(index);
    // }

    return (<ComponentModalFloting statemode={ismodalvisible} width = {'400px'} >
                <ComponentModalFlotingHeader title="Mantenimiento de Activo" colorTitle={'#183152'} onClosechange={()=>{setismodalvisible(false);}} />
                <ComponentModalFlotingBody descripccion={""}>
                <div style={{height: '10px'}}></div>
                {/* <ComponentModalPrincipalListtabs
                    listOptions = {listOpt}
                    onChangeindex = {onChangeindex}
                    chaindexselect = {index}
                    chasetindexselect = {setindex}
                    indexinitial = {listOpt[0].id}
                ></ComponentModalPrincipalListtabs>
                <div className="LinerSeparator"></div>
                <div style={{height: '5px'}}></div> */}
                {listview[0]}
                </ComponentModalFlotingBody>
            </ComponentModalFloting>);
}