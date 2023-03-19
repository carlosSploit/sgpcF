import { useEffect, useState } from "react";
// import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader, ComponentModalPrincipalListtabs } from "../../../service/morvius-service/components";
import { AimOutlined, BulbOutlined, TeamOutlined } from "@ant-design/icons";
import './style/index.css';
// import { EditarUsuario } from "./components/Editar";
// import { getKeysesion } from "../../../service/repository/mithelworks";
// import { ConsuldataLog } from "../../../service/repository/Usuarios";
// import { readclientAnalist } from "../../../service/repository/clientAnalist";
// import { EditarUsuarioSecion } from "./components/EditarSeccion";
// import { getEmpresas } from "../../../../../../service/repository/RTEmpresas";
// import { useNotification } from "../../../../../../service/Notifications/useNotificacion";
// import { EditarEmpresaInformation } from "./components/EditarInformacion/Editar";
import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader, ComponentModalPrincipalListtabs } from "../../../../../../service/morvius-service/components";
// import { getKeysesion } from "../../../../../../service/repository/mithelworks";
// import { ConsuldataLogm } from "../../../../../../service/repository/mithelworks";
// import { AreasEmpresas } from "./components/AreasEmpresa";
// import { ObjetivVersionAnalitic } from "./components/ObjVersionAnali/index";
// import { ResponsablesEmpresa } from "./components/RespVersionAnali";
import { EditarValorActivCuantiImformation } from "./components/ValoriProces";
import { getValoriActiv } from "../../../../../../service/repository/RTValorizarActivo";
import { EditarValorActivCualitativImformation } from "./components/valorizCualit";

export function EditaValotCuantitativo(props){

    const [propismodalvisible,propsetismodalvisible ] = useState(false);
    const [propiskeyDatos, ] = useState(0);
    const {
        informacionProceso,
        informacionVersion,
        iskeyDatos = propiskeyDatos,
        ismodalvisible = propismodalvisible,
        setismodalvisible = propsetismodalvisible
    } = props;
    const [index,setindex] = useState(0);
    const [stadeValoriActiv,setstadeValoriActiv] = useState(0);
    const [listview,setlistview] = useState([<></>]);
    // const dispatch = useNotification();
    

    useEffect(()=>{
        (async () => {
            await actualizeData();
        })();
    },[]);

    const actualizeData = async () => {
        const listvaloritCualiti = await getValoriActiv(iskeyDatos)
        // comprueba la existencia de una valorizacion cuantitativa
        const stade = (parseInt(listvaloritCualiti.length) === 0)
        setstadeValoriActiv(stade)
        if(stade) return
        const objValoritCualiti = listvaloritCualiti[0];
        setlistview([<EditarValorActivCuantiImformation informationDataGeneral={objValoritCualiti}/>,<EditarValorActivCualitativImformation informationDataGeneral={objValoritCualiti}/>])
    }

    const listOpt = [
        {
            id: 0,
            label : "Cuantitativa",
            icontab : TeamOutlined
        },{
            id: 1,
            label : "Cualitativa",
            icontab : BulbOutlined
        }
    ];

    const onChangeindex = (index,titletab) => {
        setindex(index);
    }

    return (<ComponentModalFloting statemode={ismodalvisible} width = {'400px'} >
                <ComponentModalFlotingHeader title="Valorizar Activo" colorTitle={'#183152'} onClosechange={()=>{setismodalvisible(false);}} />
                <ComponentModalFlotingBody descripccion={""}>
                <div style={{height: '10px'}}></div>
                {(stadeValoriActiv)?
                <div className="container_editValorActiv_botton_container">
                </div>:
                <>
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
                </>}
                </ComponentModalFlotingBody>
            </ComponentModalFloting>);
}