import React, { useEffect, useState } from "react";
import { BasicSqueleton } from "../squeleton/squeleton";
import { Empresas } from "./ContextoEmpresa/Empresa/index";
// import { Alumnos } from "./Mantenimeinto/Alumnos/Alumnos";
// import { Profesor } from "./ContextoEmpresa/Profesor/Profesor";
// import { MCurso } from "./Academico/MCurso/MCurso";
// import { keypage } from "../../service/repository/variables";
import { FormOutlined, CloseCircleOutlined } from "@ant-design/icons";
// import { PICurso } from "./Academico/PICurso/PICurso";
// import { useParams } from "react-router-dom";
// import { RedirectLink, redirectRutaOptions, valueRouteActual } from "../../service/router/routerscontroler";
import { getKeysesion, getkeypage, setkeypage } from "../../service/repository/mithelworks";
// import { redirectRutaOptions } from "../../service/router/routerscontroler";
// import { routerLinks } from "../../service/router/routers";
// import { useNavigate } from "react-router";
import { readclientAnalist } from "../../service/repository/RTclientAnalist";
import { ConsuldataLog } from "../../service/repository/RTUsuarios";
import NotificationProvider from "../../service/Notifications/NotificationProvider";
import { PerfildeUsuario } from "./perfildeusuario";
import { TrabajoEmpresas } from "./ContextoEmpresa/TrabajEmpresa";
import { ProcesEmpresas } from "./ContextoEmpresa/Procesos";
import { ActivosEmpresa } from "./ContextoEmpresa/Activos";
import { VersionAnalisis } from "./analisisRiesgos/VersionAnalisis";
import { ValoriActiv } from "./analisisRiesgos/ValorizActiv";
import { IndentifiAmenazas } from "./analisisRiesgos/IdentAmenazas";
import { ValoriAmenaz } from "./analisisRiesgos/ValorizAmenaz";
import { IndentifiSalvaguard } from "./gestionRiesgos/IdentSalvaguard";
import { ValoriSalvaguard } from "./gestionRiesgos/ValorizSalvaguard";
import { InsideProces } from "./insidenProces/InsidenProcess";
import { AnaliticRiesgo } from "./analisisRiesgos/AnaliticRiesgo";
import { AnaliticActivo } from "./analisisRiesgos/AnaliticActivo";

export function ClientAnalist(props){

    const { 
        idPageLoad = -1, 
        onCerrarSecion = ()=>{}} = props;
    const [, setindexinterfacememori] = useState(-1);
    const [indexinterface, setindexinterface] = useState(-1);
    const [iisperfilinfo, setisperfilinfo] = useState(false);
    const [interfaces, setinterfaces] = useState(<Empresas/>);
    // const urlRedirect = useNavigate();
    const [informationData, setinformationData] = useState({
        nameUser: 'Carlos Arturo Guerrero Castillo',
        user: '@arturo14212000',
        photo: 'https://nyrevconnect.com/wp-content/uploads/2017/06/Placeholder_staff_photo-e1505825573317.png'
    });

    const [opccionSistem,] = useState([
        {
            label: "Cerrar secion",
            icon: CloseCircleOutlined,
            onChange: () => {
                onCerrarSecion();
            }
        }
    ]);
    
    const opcciones = [
        {
            label: "Contexto Empresa",
            Icon: FormOutlined,
            key: -1,
            options:[
                {
                    label: "Empresas",
                    key: 0
                },
                {
                    label: "Trabajadores",
                    key: 1
                },
                {
                    label: "Procesos",
                    key: 2
                },
                {
                    label: "Activos",
                    key: 3
                }
            ]
        },
        {
            label: "Insidencias de Procesos",
            Icon: FormOutlined,
            key: 4,
            options:[]
        },
        {
            label: "Analisis de Riesgos",
            Icon: FormOutlined,
            key: -1,
            options:[
                {
                    label: "Versiones de Analisis",
                    key: 5
                },
                {
                    label: "Valorizacion del Activo",
                    key: 6
                },
                {
                    label: "Identificar Amenazas",
                    key: 7
                },
                {
                    label: "Valorizacion de Amenazas",
                    key: 8
                },
                {
                    label: "Analiticas de valorizacion Activo",
                    key: 9
                },
                {
                    label: "Analiticas de Valorizacion Riesgos",
                    key: 10
                }
                
            ]
        },
        {
            label: "Gestion de Riesgos",
            Icon: FormOutlined,
            key: -1,
            options:[
                {
                    label: "Identificar Salvaguardas",
                    key: 11
                },
                {
                    label: "Valorizacion de Salvaguardas",
                    key: 12
                }
            ]
        }
    ]

    const listInterface = [
        <Empresas/>, 
        <TrabajoEmpresas/>, 
        <ProcesEmpresas/>, 
        <ActivosEmpresa/>, 
        <InsideProces /> , 
        <VersionAnalisis />, 
        <ValoriActiv />, 
        <IndentifiAmenazas />, 
        <ValoriAmenaz />, 
        <AnaliticActivo />, 
        <AnaliticRiesgo />, 
        <IndentifiSalvaguard />, 
        <ValoriSalvaguard />];

    const onchageoption = (id) => {
        if (id <= (listInterface.length -1)){
            console.log(id)
            setkeypage(id); // guarda la posicio de la ruta en memoria
            setinterfaces(listInterface[id])
            setindexinterface(id);
            setindexinterfacememori(id);
        }
    }

    useEffect(()=>{
        (async () => {
            let seskey = await getKeysesion();
            let dataRed = await ConsuldataLog({seccionkey: seskey})
            let result = await readclientAnalist(dataRed.id_inform);
            setinformationData({
                nameUser: result.nombre + ' ' + result.apellidos,
                user: result.usaio,
                photo: result.photo
            })
        })();

        // si no se a inizializado una pagina por una ruta
        if (idPageLoad != -1){
            setindexinterface(idPageLoad);
            setinterfaces(listInterface[idPageLoad]);
            return;
        }
       // si no se a inizializado por ruta o hay un historial de navegacion, se guarda
        if(!getkeypage()){
            setkeypage(0);
        }else{
            // si esque hay, se carga el historial
            setindexinterface(parseInt(getkeypage()));
            setinterfaces(listInterface[parseInt(getkeypage())]);
        }
    },[]);

    return (<>
    <NotificationProvider>
        {(iisperfilinfo)?<PerfildeUsuario ismodalvisible = {iisperfilinfo} setismodalvisible = {setisperfilinfo} ></PerfildeUsuario>:<></>}
        <BasicSqueleton onChangePerfil = {()=>{ setisperfilinfo(true); console.log('abrir el perfil de datos')}} opccionSistem = {opccionSistem} informationData = {informationData} propiskeyoptions = {indexinterface} propsetiskeyoptions = {setindexinterface} iskeyinit = {indexinterface} onchageoption={onchageoption} databasic={opcciones}>
            {interfaces}
            {/* <Profesor/> */}
        </BasicSqueleton>
    </NotificationProvider>
    </>);
}