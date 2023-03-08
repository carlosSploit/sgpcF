import React, { useEffect, useState } from "react";
// import "./style/editresoltarea.css";
// import { addSesion } from "../../../../../../../../service/repository/Sesion";
// import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import { ComponentModalFloting,
         ComponentModalFlotingHeader,
         ComponentModalFlotingBody } from "../../../../../../../../../../service/morvius-service/components";
import { ForminputBottonSubmit, ForminputComboBox } from "../../../../../../../../../../service/morvius-service/form";
// import { getprofesor } from "../../../../../../../../service/repository/Profesor";
// import { addciclocurso } from "../../../../../../../../service/repository/CicloCurso";
import { handleNewNotification, useNotification } from "../../../../../../../../../../service/Notifications/useNotificacion";
import { updateAsisteins } from "../../../../../../../../../../service/repository/Asistencia";
// import { updatPointResulTarea } from "../../../../../../../../../../service/repository/ResulTarea";
// import { ConsuldataLog } from "../../../../../../../../../../../../../../../../../service/repository/Usuarios";
// import { keyseccion } from "../../../../../../../../../../../../../../../../../service/repository/variables";
// import { getidinscrip } from "../../../../../../../../../../../../../../../../../service/repository/Inscripcc";

export function Editpointresoltarea(props){
    const { refcont, onAction=()=>{},dataac={id_curso:0}, datatart={} } = props;
    const [ismodalvisible, setismodalvisible] = useState(false);
    // let [textpoint, settextpoint] = useState("");
    // const [listapertuasis, setlistapertuasis] = useState(null);
    const [indextipoasis, setindextipoasis] = useState(null);
    const dispatch = useNotification();

    let tipoasisten = [{
        id: 0,
        nombreti: "Desconosido"
    },{
        id: 1,
        nombreti: "Asistio"
    } ,{
        id: 2,
        nombreti: "Falto"
    }];
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const jsondata = {
            "stade" : indextipoasis
        };
        let resul = await updateAsisteins(dataac.id_asis_inscrip,jsondata);
        handleNewNotification(dispatch,resul.messege, resul.status);
        setTimeout(() => {
            (async ()=>{await onAction();})();
       }, 500);
    }

    const onChangeinput = async(json)=>{
        setindextipoasis(json.value);
    }

    return (
        <>
            <div ref={refcont} onClick={()=>{setismodalvisible(true);}}></div>
           {/* <ComponentBotton isInvertColor={true} label={"Add.Resolucion"}  /> */}
           <ComponentModalFloting statemode={ismodalvisible} onClosechange={()=>{setismodalvisible(false);}}>
               <ComponentModalFlotingHeader title="Editar Asistencia" onClosechange={()=>{setismodalvisible(false);}} />
               <ComponentModalFlotingBody descripccion={"Selecciona el tipo de asistencia para el alumno."}>
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
                    {/* <Forminputnumber maxnumber={5} textinput={textpoint} settextinput={settextpoint} placeHolder="Ingresa los puntos a editar." keyname ={"point"}/> */}
                    {(tipoasisten != null)?<ForminputComboBox isdefault={true} valueInit={dataac.estado_asistenc} onChangeinput = {onChangeinput} datacombo = {tipoasisten.map((item)=>{
                        // console.log({id: item.id,label: item.nombreti });
                        return {
                            id: item.id,
                            label: item.nombreti
                        }
                    })}/>:<></>}
                    <ForminputBottonSubmit />
                </form>
               </ComponentModalFlotingBody>
           </ComponentModalFloting>
        </>
    );
}