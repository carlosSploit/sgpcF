import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { setDefaultImage } from "../../../../../../service/morvius-service/captureColorUrl";
import { useParameterRouters } from "../../../../../../service/router/router.hook";
import { routerLinks } from "../../../../../../service/router/routers";
// import { RedirectLink, redirectLink2, valueRouteActual } from "../../../../../../service/router/routerscontroler";
import { Contmantcurse } from "./components/contmantcurse/contmantcurse";
import { ViewCurso } from "./components/viewcurso/viewcurso";
import "./style/car_curso.css"

export function Carcurso(props){
    const { dataact = {}, onUpdate=()=>{}} = props;
    const urlRedirect = useNavigate();
    const [colorState, setcolorState] = useState({
        hex: "856FC5",
        rbg: "133,111,197"
    });
    const refactionview = useRef();
    const refcontentinfo = useRef();
    const [idContenInfo, setidContenInfo] = useState(false);
    // const [urlredirect, seturlredirect] = useState('');

    // hook del router de opcciones
    useParameterRouters({paramsVal:['id_curso_edt'] , onParems: (dataParems) => {
        // comprueba si el id del ciclo de curso enviado por parametros es igual al id del cliclo del params
        if (parseInt(dataact['id_ciclo_curso']) == parseInt(dataParems['id_curso_edt'])){
            setidContenInfo(true);
            return;
        }
    }});
    // inicializar el la informacion y el color
    useEffect(()=>{
        ( async ()=>{
            let data = await setDefaultImage(dataact.photoport,`canCartProduct${dataact.id_curso}`);
            setcolorState(data);
        })();
    },[]);

    return (
        <>
            <div className="content_cardCursoMP" onClick={()=>{
                // 
                // se dara una redireccion a la ruta del curso - con esto se abilita la muestra del modal:  refcontentinfo.current.click();
                let listRoutes = routerLinks();
                urlRedirect(listRoutes.profes[1].patch.replace(':id_curso_edt',dataact['id_ciclo_curso'])); // se realiza una redireccion
                setidContenInfo(true);
            }} style={{
                backgroundImage: `url('${`${dataact.photoport}`}')`
            }}>
                <canvas id={`canCartProduct${dataact.id_curso}`} style={{display: "none"}}></canvas>
                <div className="content_cardCursoMP_subcontent" >
                    <div className="content_cardCursoMP_header">
                        <div className="content_cardCursoMP_header_actions" style={{backgroundColor: `#${colorState.hex}`}}>
                            {`${dataact.dias_durac} dias`}
                        </div>
                    </div>
                    <div className="content_cardCursoMP_body">
                        <div className="content_cardCursoMP_body_content_text" style={{backgroundColor: `rgba(${colorState.rbg},0.7)`}}>
                            {dataact.nombre}
                        </div>
                    </div>
                </div>
                <div className="content_cardCursoMP_shadow"></div>
            </div>
            <ViewCurso refAction={refactionview} onUpdate={onUpdate} dataact={dataact}/>
            <Contmantcurse propismodalvisible={idContenInfo} propsetismodalvisible = {setidContenInfo} refAction={refcontentinfo} onAction={onUpdate} dataact={dataact} onCloseSesion={()=>{
                setidContenInfo(false);
            }} />
        </>
    );
}