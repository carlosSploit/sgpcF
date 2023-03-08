import React, { useState } from "react";
// import "./style/editresoltarea.css";
// import { addSesion } from "../../../../../../../../service/repository/Sesion";
// import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import { ComponentModalFloting,
         ComponentModalFlotingHeader,
         ComponentModalFlotingBody } from "../../../../../../../../../../../../../../service/morvius-service/components";
import { ForminputBottonSubmit, Forminputnumber } from "../../../../../../../../../../../../../../service/morvius-service/form";
// import { getprofesor } from "../../../../../../../../service/repository/Profesor";
// import { addciclocurso } from "../../../../../../../../service/repository/CicloCurso";
import { handleNewNotification, useNotification } from "../../../../../../../../../../../../../../service/Notifications/useNotificacion";
import { updatPointResulTarea } from "../../../../../../../../../../../../../../service/repository/ResulTarea";
// import { ConsuldataLog } from "../../../../../../../../../../../../../../../../../service/repository/Usuarios";
// import { keyseccion } from "../../../../../../../../../../../../../../../../../service/repository/variables";
// import { getidinscrip } from "../../../../../../../../../../../../../../../../../service/repository/Inscripcc";

export function Editpointresoltarea(props){
    const { refcont, onAction=()=>{},dataac={id_curso:0}, datatart={} } = props;
    const [ismodalvisible, setismodalvisible] = useState(false);
    let [textpoint, settextpoint] = useState("");
    const dispatch = useNotification();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(datatart);
        console.log(datatart.id_conte_tarea);

        let data = {
            "point" : parseInt(event.target.point.value),
            "id_conttare": datatart.id_conte_tarea
        };
        let resul = await updatPointResulTarea(dataac.id_tarea_inscri,data);
        // console.log(`id de la tarea : ${dataac}`);
        // console.log(data);
        handleNewNotification(dispatch,resul.messege, resul.status);
        setTimeout(() => {
                (async()=>{
                    await onAction();
                })();
        }, 500);
    }

    return (
        <>
            <div ref={refcont} onClick={()=>{setismodalvisible(true);}}></div>
           {/* <ComponentBotton isInvertColor={true} label={"Add.Resolucion"}  /> */}
           <ComponentModalFloting statemode={ismodalvisible} onClosechange={()=>{setismodalvisible(false);}}>
               <ComponentModalFlotingHeader title="Editar puntos" onClosechange={()=>{setismodalvisible(false);}} />
               <ComponentModalFlotingBody descripccion={"Ingresa la cantidad de puntos de calificacion de la tarea."}>
               <form
                    style={{
                        margin: "0",
                        padding: "0",
                        width: "100%"
                    }}
                    layout="vertical"
                    onSubmit={handleSubmit}
                    onFinich
                    autoComplete="off"
                >
                    <div style={{height:"10px"}}></div>
                    {/* <ForminputRadioSlice onChangeinput={onChangeinputgratuito} label={"Se subira un archivo"} keyname ={"pass"}/> */}
                    <Forminputnumber maxnumber={5} valueInit={dataac.puntos} textinput={textpoint} settextinput={settextpoint} placeHolder="Ingresa los puntos a editar." keyname ={"point"}/>
                    <ForminputBottonSubmit />
                </form>
               </ComponentModalFlotingBody>
           </ComponentModalFloting>
        </>
    );
}