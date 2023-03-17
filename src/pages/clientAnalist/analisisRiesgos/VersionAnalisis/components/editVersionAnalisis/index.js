import { useEffect, useState } from "react";
// import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader, ComponentModalPrincipalListtabs } from "../../../service/morvius-service/components";
import { BulbOutlined, TeamOutlined } from "@ant-design/icons";
import './style/index.css';
// import { EditarUsuario } from "./components/Editar";
// import { getKeysesion } from "../../../service/repository/mithelworks";
// import { ConsuldataLog } from "../../../service/repository/Usuarios";
// import { readclientAnalist } from "../../../service/repository/clientAnalist";
// import { EditarUsuarioSecion } from "./components/EditarSeccion";
// import { getEmpresas } from "../../../../../../service/repository/RTEmpresas";
import { useNotification } from "../../../../../../service/Notifications/useNotificacion";
// import { EditarEmpresaInformation } from "./components/EditarInformacion/Editar";
import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader, ComponentModalPrincipalListtabs } from "../../../../../../service/morvius-service/components";
// import { getKeysesion } from "../../../../../../service/repository/mithelworks";
// import { ConsuldataLogm } from "../../../../../../service/repository/mithelworks";
// import { AreasEmpresas } from "./components/AreasEmpresa";
import { ObjetivVersionAnalitic } from "./components/ObjetivosEmpresa/index";
import { ResponsablesEmpresa } from "./components/ActivosProceso";

export function EditarVesionAnalitic(props){

    const [propismodalvisible,propsetismodalvisible ] = useState(false);
    const [propiskeyDatos,propsetiskeyDatos ] = useState(0);
    const {
        iskeyDatos = propiskeyDatos,
        ismodalvisible = propismodalvisible,
        setismodalvisible = propsetismodalvisible
    } = props;
    const [index,setindex] = useState(0);
    const [listview,setlistview] = useState([<></>]);
    // const dispatch = useNotification();
    

    useEffect(()=>{
        (async () => {
            await actualizeData();
        })();
    },[]);

    const actualizeData = async () => {
        setlistview([<ResponsablesEmpresa informationDataGeneral={iskeyDatos}/>,<ObjetivVersionAnalitic informationDataGeneral={iskeyDatos}/>])
    }

    const listOpt = [
        {
            id: 0,
            label : "Responsables",
            icontab : TeamOutlined
        },{
            id: 1,
            label : "Objetivos",
            icontab : BulbOutlined
        }
        //,
        // {
        //     id: 1,
        //     label : "Editar Informacion",
        //     icontab : EditOutlined
        // }
    ];

    const onChangeindex = (index,titletab) => {
        setindex(index);
    }

    return (<ComponentModalFloting statemode={ismodalvisible} width = {'400px'} >
                <ComponentModalFlotingHeader title="Mantenimiento de Version Analisis" colorTitle={'#183152'} onClosechange={()=>{setismodalvisible(false);}} />
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
            </ComponentModalFloting>);
}