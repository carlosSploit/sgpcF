import React, { useEffect, useState } from "react";
import { BasicSqueleton } from "../squeleton/squeleton";
import { Empresas } from "./ContextoEmpresa/Empresa/index";
// import { Alumnos } from "./Mantenimeinto/Alumnos/Alumnos";
import { Profesor } from "./ContextoEmpresa/Profesor/Profesor";
import { MCurso } from "./Academico/MCurso/MCurso";
// import { keypage } from "../../service/repository/variables";
import { FormOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { PICurso } from "./Academico/PICurso/PICurso";
// import { useParams } from "react-router-dom";
// import { RedirectLink, redirectRutaOptions, valueRouteActual } from "../../service/router/routerscontroler";
import { getKeysesion, getkeypage, setkeypage } from "../../service/repository/mithelworks";
import { redirectRutaOptions } from "../../service/router/routerscontroler";
// import { routerLinks } from "../../service/router/routers";
import { useNavigate } from "react-router";
import { readclientAnalist } from "../../service/repository/RTclientAnalist";
import { ConsuldataLog } from "../../service/repository/RTUsuarios";
import NotificationProvider from "../../service/Notifications/NotificationProvider";
import { PerfildeUsuario } from "./perfildeusuario";

export function ClientAnalist(props){

    const { 
        idPageLoad = -1, 
        onCerrarSecion = ()=>{}} = props;
    const [indexinterfacememori, setindexinterfacememori] = useState(-1);
    const [indexinterface, setindexinterface] = useState(-1);
    const [iisperfilinfo, setisperfilinfo] = useState(false);
    const [interfaces, setinterfaces] = useState(<Empresas/>);
    const urlRedirect = useNavigate();
    const [informationData, setinformationData] = useState({
        nameUser: 'Carlos Arturo Guerrero Castillo',
        user: '@arturo14212000',
        photo: 'https://nyrevconnect.com/wp-content/uploads/2017/06/Placeholder_staff_photo-e1505825573317.png'
    });

    const [opccionSistem, setopccionSistem] = useState([
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
                    label: "Profesor",
                    key: 1
                },
                {
                    label: "Alumno",
                    key: 2
                }
            ]
        },
        {
            label: "Academico",
            Icon: FormOutlined,
            key: -1,
            options:[
                {
                    label: "M. Curso",
                    key: 3
                },
                {
                    label: "L. PreInscripciones",
                    key: 4
                }
            ]
        }
    ]

    const listInterface = [<Empresas/>,<Profesor/>,<MCurso/>,<PICurso/>];

    const onchageoption = (id) => {
        let patch_redirect = redirectRutaOptions(id);
        urlRedirect(patch_redirect);
        // console.log(patch_redirect)
        if (id <= (listInterface.length -1)){
            setkeypage(id); // guarda la posicio de la ruta en memoria
            setinterfaces(listInterface[id])
            setindexinterface(id);
            setindexinterfacememori(id);
        }
    }

    // useRedirect({urlPatch: urlredirect});

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