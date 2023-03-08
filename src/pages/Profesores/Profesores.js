import React, { useEffect, useState } from "react";
import { BasicSqueleton } from "../squeleton/squeleton";
import { Edprof } from "./Configuraciones/Configuraciones";
import { readprofesor } from "../../service/repository/Profesor";
import { MPCurso } from "./Academico/MPCurso/MPCurso";
import { CloseCircleOutlined, EditOutlined, FormOutlined } from "@ant-design/icons";
import NotificationProvider from "../../service/Notifications/NotificationProvider";
import { redirectRutaOptions } from "../../service/router/routerscontroler";
import { getkeypage, setkeypage } from "../../service/repository/mithelworks";
import { useNavigate } from "react-router";

export function Profesor(props){
    const {id_info=0, idPageLoad = -1, onClose = () => {}} = props;
    const [indexinterfacememori, setindexinterfacememori] = useState(-1);
    const [indexinterface, setindexinterface] = useState(-1);
    const [isEditProfesor, setisEditProfesor] = useState(false);
    // se inicialisa con un formato bacio del objeto
    const [dataprofesor, setdataprofesor] = useState(null);
    const [interfaces, setinterfaces] = useState(<MPCurso/>);
    const urlRedirect = useNavigate(); 
    
    const opcciones = [
        {
            label: "Cursos",
            Icon: FormOutlined,
            key: 0,
            options:[]
        },
        {
            label: "Configuracion",
            Icon: EditOutlined,
            key: 998,
            options:[]
        },{
            label: "Cerrar Sesion",
            Icon: CloseCircleOutlined,
            key: 999,
            options:[]
        }
    ]

    let listInterface = [<MPCurso />];

    const onchageoption = async (id) => {
        // rediraccion
        let patch_redirect = redirectRutaOptions(id);
        urlRedirect(patch_redirect);
        // realizar la captura de la insercion
        if(id <= (listInterface.length -1)){
            setkeypage(id);
            setinterfaces(listInterface[id]);
            setindexinterface(id);
            setindexinterfacememori(id);
        }else{
            // entrar al apartado de editar la informacion de usuario
            if (id == 998){
                setisEditProfesor(true);
            }
            // cerrar secion
            if(id == 999){
                onClose();
            }
        }
    }

    const onClosechange = () => {
        setisEditProfesor(false);
        setindexinterface(indexinterfacememori);
        let patch_redirect = redirectRutaOptions(getkeypage());
        urlRedirect(patch_redirect);
    }

    useEffect(()=>{
        (async()=>{
            // console.log();
            // carga la informacion del profesor
            let dataaux = await readprofesor(id_info);
            setdataprofesor(dataaux);
            // si no se a inizializado una pagina por una ruta
            if (idPageLoad != -1){
                // si se da la ruta de ir al apartado de editar informacion
                if (idPageLoad == 998){
                    setisEditProfesor(true);
                    setindexinterface(0);
                    setinterfaces(listInterface[0]);
                    return;
                }
                setindexinterface(idPageLoad);
                setinterfaces(listInterface[idPageLoad]);
                return;
            }

            if(!getkeypage()){
                setkeypage(0);
                setindexinterfacememori(0);
                setinterfaces(listInterface[0]);
            }else{
                // si esque hay, se carga el historial
                setindexinterface(parseInt(getkeypage()));
                setinterfaces(listInterface[parseInt(getkeypage())]);
            }
        })();
    },[]);

    return (
        <NotificationProvider>
            {(dataprofesor == null)?<></>:<Edprof onClosechange = {onClosechange} dataact = {dataprofesor} isstade = {isEditProfesor} />}
            <BasicSqueleton propiskeyoptions = {indexinterface} propsetiskeyoptions = {setindexinterface} onchageoption={onchageoption} databasic={opcciones}>
                {interfaces}
                {/* <Profesor/> */}
                {/* dataact = {dataprofesor} */}
            </BasicSqueleton>
            {/* {(valueRouteActual(urlredirect))?<RedirectLink urlPatch={urlredirect}/>:<></>} */}
        </NotificationProvider>
    );
}