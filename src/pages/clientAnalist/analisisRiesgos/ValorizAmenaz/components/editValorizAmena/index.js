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
import { addValorizarAmenaz, getValorizarAmenaz } from "../../../../../../service/repository/RTValorizarAmenaz";
import { ForminputBotton } from "../../../../../../service/morvius-service/form";
import { useNotification } from "../../../../../../service/Notifications/NotificationProvider";
import { handleNewNotification } from "../../../../../../service/Notifications/useNotificacion";

export function EditaValorAmenaza(props){

    const [propismodalvisible,propsetismodalvisible ] = useState(false);
    const [propiskeyDatos, ] = useState(0);
    const {
        // informacionProceso,
        // informacionAmenaza, // datos de la amenaza
        iskeyDatos = propiskeyDatos, // id de la amenaza que se decea enlazar
        ismodalvisible = propismodalvisible,
        setismodalvisible = propsetismodalvisible
    } = props;
    const [index,setindex] = useState(0);
    const [stadeValoriActiv,setstadeValoriActiv] = useState(0);
    const [listview,setlistview] = useState([<></>]);
    const dispatch = useNotification();
    

    useEffect(()=>{
        (async () => {
            await actualizeData();
        })();
    },[]);

    const actualizeData = async () => {
        const listvaloritCualiti = await getValorizarAmenaz(iskeyDatos)
        console.log(listvaloritCualiti)
        // comprueba la existencia de una valorizacion cuantitativa
        const stade = (parseInt(listvaloritCualiti.length) === 0)
        setstadeValoriActiv(stade)
        if(stade) return
        const objValoritCualiti = listvaloritCualiti[0];
        setTimeout(() => {
            setlistview([<EditarValorActivCuantiImformation onAction={actualizeData} informationDataGeneral={objValoritCualiti}/>,<EditarValorActivCualitativImformation informationDataGeneral={objValoritCualiti}/>])
        }, 500);
    }

    const insertValoriAmenaz = async () => {
        const resul = await addValorizarAmenaz({
            "id_afectaActiv" : iskeyDatos,
            "id_escalaFrecuen": 1
        })
        handleNewNotification(dispatch,resul.messege, resul.status);
        setTimeout(() => {
                (async ()=>{
                    await actualizeData();
                })();
        }, 500);
    }

    const listOpt = [
        {
            id: 0,
            label : "Frecuencia",
            icontab : TeamOutlined
        },{
            id: 1,
            label : "Degradacion",
            icontab : BulbOutlined
        }
    ];

    const onChangeindex = (index,titletab) => {
        setindex(index);
    }

    return (<ComponentModalFloting statemode={ismodalvisible} width = {'400px'} >
                <ComponentModalFlotingHeader title="Valorizar Amenaza" colorTitle={'#183152'} onClosechange={()=>{setismodalvisible(false);}} />
                <ComponentModalFlotingBody descripccion={(stadeValoriActiv)?'Parece que la amenaza no tiene aperturada una valorizacion':''}>
                <div style={{height: '10px'}}></div>
                {(stadeValoriActiv)?
                <div className="container_editValorAmenaz_botton_container">
                    <ForminputBotton label={'Aperturar Valorizacion'} onChange= { async () => {
                        await insertValoriAmenaz();
                    }} ></ForminputBotton>
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