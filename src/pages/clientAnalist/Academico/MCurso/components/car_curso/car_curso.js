import { DeleteFilled, FormOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { setDefaultImage } from "../../../../../../service/morvius-service/captureColorUrl";
import { ComponentItemSecionSelector, ComponentItemSecionSelectorItem } from "../../../../../../service/morvius-service/component/components";
import { handleNewNotification, useNotification } from "../../../../../../service/Notifications/useNotificacion";
import { deletecurso } from "../../../../../../service/repository/Curso";
import { useParameterRouters } from "../../../../../../service/router/router.hook";
import { routerLinks } from "../../../../../../service/router/routers";
// import { routerLinks } from "../../../../../../service/router/routers";
import { Contmantcurse } from "../contmantcurse/contmantcurse";
import "./style/car_curso.css"

export function Carcurso(props){
    const { dataact = {}, onUpdate=()=>{}, onDelect=()=>{}} = props;
    // const refactionupdat = useRef();
    const urlRedirect = useNavigate();
    const [stadoActualizacion, setstadoActualizacion] = useState(false);
    const [colorState, setcolorState] = useState({
        hex: "856FC5",
        rbg: "133,111,197"
    })
    // const refactionview = useRef();
    const refcontentinfo = useRef();
    const dispatch = useNotification();

    // hook del router de opcciones
    useParameterRouters({paramsVal:['id_curso'] , onParems: (dataParems) => {
        // comprueba si el id del ciclo de curso enviado por parametros es igual al id del cliclo del params
        console.log(dataact);
        if (parseInt(dataact['id_curso']) == parseInt(dataParems['id_curso'])){
            setstadoActualizacion(true);
            return;
        }
    }});

    useEffect(()=>{
        ( async ()=>{
            let data = await setDefaultImage(dataact.photoport,`canCartProduct${dataact.id_curso}`);
            setcolorState(data);
        })();
    },[]);

    return (
        <>
            <div className="content_cardCurso" onClick={()=>{
                
            }} style={{
                backgroundImage: `url('${`${dataact.photoport}`}')`
            }}>
                <canvas id={`canCartProduct${dataact.id_curso}`} style={{display: "none"}}></canvas>
                <div className="content_cardCurso_subcontent" >
                    <div className="content_cardCurso_header">
                        <div className="content_cardCurso_header_actions" style={{borderColor: `#${colorState.hex}`}}>
                            <ComponentItemSecionSelector SiseIcon={"25"} colorIon = {`#${colorState.hex}`}>
                                <ComponentItemSecionSelectorItem labelOption={"Eliminar Curso"} onClickActions={async () => {
                                    // setismodalvisibleAddcurso(true);
                                    let result = await deletecurso(dataact.id_curso);
                                    handleNewNotification(dispatch,result.messege, result.status);
                                    setTimeout(() => {
                                            (async()=>{
                                                console.log(result)
                                                await onDelect();
                                            })();
                                    }, 500);
                                }} Icont={DeleteFilled} />
                                <ComponentItemSecionSelectorItem labelOption={"Editar Curso"} onClickActions={async () => {
                                    let listRoutes = routerLinks();
                                    urlRedirect(listRoutes.admin[4].patch.replace(':id_curso',dataact['id_curso'])); // se realiza una redireccion
                                    setstadoActualizacion(true);
                                }} Icont={FormOutlined} />
                            </ComponentItemSecionSelector>
                        </div>
                    </div>
                    <div className="content_cardCurso_body">
                        <div className="content_cardCurso_body_content_text" style={{backgroundColor: `rgba(${colorState.rbg},0.7)`}}>
                            {dataact.nombre}
                        </div>
                    </div>
                </div>
                <div className="content_cardCurso_shadow"></div>
            </div>
            {/* el stadoActualizacion es un estado que evitara que se agan recargas de informacion de forma innesesaria, solo se ara si es visible o activo */}
            {(stadoActualizacion)?<Contmantcurse propismodalvisible = {stadoActualizacion} propsetismodalvisible = {setstadoActualizacion} onAction={onUpdate} refAction={refcontentinfo}  dataact={dataact} onClose = {()=>{
                setstadoActualizacion(false);
            }} />:<></>}
        </>
    );
}