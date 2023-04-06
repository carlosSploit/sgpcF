import { useEffect, useState } from "react";
// import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader, ComponentModalPrincipalListtabs } from "../../../service/morvius-service/components";
// import { AimOutlined, BulbOutlined, TeamOutlined } from "@ant-design/icons";
import './style/index.css';
// import { EditarUsuario } from "./components/Editar";
// import { getKeysesion } from "../../../service/repository/mithelworks";
// import { ConsuldataLog } from "../../../service/repository/Usuarios";
// import { readclientAnalist } from "../../../service/repository/clientAnalist";
// import { EditarUsuarioSecion } from "./components/EditarSeccion";
// import { getEmpresas } from "../../../../../../service/repository/RTEmpresas";
// import { useNotification } from "../../../../../../service/Notifications/useNotificacion";
// import { EditarEmpresaInformation } from "./components/EditarInformacion/Editar";
// import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader } from "../../../../../../service/morvius-service/components";
// import { getKeysesion } from "../../../../../../service/repository/mithelworks";
// import { ConsuldataLogm } from "../../../../../../service/repository/mithelworks";
// import { AreasEmpresas } from "./components/AreasEmpresa";
// import { ObjetivVersionAnalitic } from "./components/ObjVersionAnali/index";
// import { ResponsablesEmpresa } from "./components/RespVersionAnali";
import { EditarValorActivCuantiImformation } from "./components/ValoriProces";
// import { getValoriActiv } from "../../../../../../service/repository/RTValorizarActivo";
// import { EditarValorActivCualitativImformation } from "./components/valorizCualit";
import { getInformationAmenaz } from "../../../../../../../../service/repository/RTPlanesConting";
import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader } from "../../../../../../../../service/morvius-service/components";

export function InformationAmenaz(props){

    const [propismodalvisible,propsetismodalvisible ] = useState(false);
    // const [propiskeyDatos, ] = useState(0);
    const {
        informacionActivProsVerAnali,
        informacionAfectActiv,
        // iskeyDatos = propiskeyDatos,
        ismodalvisible = propismodalvisible,
        setismodalvisible = propsetismodalvisible
    } = props;
    // const [index,setindex] = useState(0);
    // const [stadeValoriActiv,setstadeValoriActiv] = useState(0);
    const [listview,setlistview] = useState([<></>]);
    const [objAmenasInformation, setobjAmenasInformation] = useState({
        "nombreAmena": "Desconocido",
        "descripccion": "Proceso donde un procesor dicta el cursos en un sistema E-learning a un alumnos."
    })
    // const dispatch = useNotification();
    

    useEffect(()=>{
        (async () => {
            await actualizeData();
        })();
    },[]);

    const actualizeData = async () => {
        const listvaloritCualiti = await getInformationAmenaz({id_activProsVerAnali: informacionActivProsVerAnali, id_afectaActiv: informacionAfectActiv})
        console.log(listvaloritCualiti)
        const objValoritCualiti = listvaloritCualiti;
        setobjAmenasInformation(objValoritCualiti)
        setlistview([<EditarValorActivCuantiImformation informationDataGeneral={objValoritCualiti}/>])
    }

    // const listOpt = [
    //     {
    //         id: 0,
    //         label : "Cuantitativa",
    //         icontab : TeamOutlined
    //     },{
    //         id: 1,
    //         label : "Cualitativa",
    //         icontab : BulbOutlined
    //     }
    // ];

    // const onChangeindex = (index,titletab) => {
    //     setindex(index);
    // }

    return (<ComponentModalFloting statemode={ismodalvisible} width = {'500px'} >
                <ComponentModalFlotingHeader title={objAmenasInformation.nombreAmena} colorTitle={'#183152'} onClosechange={()=>{setismodalvisible(false);}} />
                <ComponentModalFlotingBody descripccion={""}>
                    <div style={{height: '10px'}}></div>
                
                    {listview[0]}
                </ComponentModalFlotingBody>
            </ComponentModalFloting>);
}