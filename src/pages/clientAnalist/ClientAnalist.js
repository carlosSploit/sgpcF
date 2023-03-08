import React, { useEffect, useState } from "react";
import { BasicSqueleton } from "../squeleton/squeleton";
import { Admin } from "./Mantenimeinto/Admin/Admin";
// import { Alumnos } from "./Mantenimeinto/Alumnos/Alumnos";
import { Profesor } from "./Mantenimeinto/Profesor/Profesor";
import { MCurso } from "./Academico/MCurso/MCurso";
// import { keypage } from "../../service/repository/variables";
import { FormOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { PICurso } from "./Academico/PICurso/PICurso";
// import { useParams } from "react-router-dom";
// import { RedirectLink, redirectRutaOptions, valueRouteActual } from "../../service/router/routerscontroler";
import { getkeypage, setkeypage } from "../../service/repository/mithelworks";
import { redirectRutaOptions } from "../../service/router/routerscontroler";
// import { routerLinks } from "../../service/router/routers";
import { useNavigate } from "react-router";

export function ClientAnalist(props){

    const { idPageLoad = -1, onCerrarSecion = ()=>{} } = props;
    const [indexinterfacememori, setindexinterfacememori] = useState(-1);
    const [indexinterface, setindexinterface] = useState(-1);
    const [interfaces, setinterfaces] = useState(<Admin/>);
    const urlRedirect = useNavigate();
    
    const opcciones = [
        {
            label: "Mantenimiento",
            Icon: FormOutlined,
            key: -1,
            options:[
                {
                    label: "Admin",
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
        },
        {
            label: "Cerrar Sesion",
            Icon: CloseCircleOutlined,
            key: 999,
            options:[]
        }
    ]

    const listInterface = [<Admin/>,<Profesor/>,<MCurso/>,<PICurso/>];

    const onchageoption = (id) => {
        let patch_redirect = redirectRutaOptions(id);
        urlRedirect(patch_redirect);
        // console.log(patch_redirect)
        if (id <= (listInterface.length -1)){
            setkeypage(id); // guarda la posicio de la ruta en memoria
            setinterfaces(listInterface[id])
            setindexinterface(id);
            setindexinterfacememori(id);
        }else{
            if(id == 999){
                onCerrarSecion();
            }
        }
        
    }

    // useRedirect({urlPatch: urlredirect});

    useEffect(()=>{
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
    <BasicSqueleton propiskeyoptions = {indexinterface} propsetiskeyoptions = {setindexinterface} iskeyinit = {indexinterface} onchageoption={onchageoption} databasic={opcciones}>
        {interfaces}
        {/* <Profesor/> */}
    </BasicSqueleton>
    </>);
}