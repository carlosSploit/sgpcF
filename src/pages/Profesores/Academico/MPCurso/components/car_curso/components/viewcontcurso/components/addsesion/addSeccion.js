import React, { useEffect, useRef, useState } from "react";
import "./style/addSeccion.css";
import { addSesion } from "../../../../../../../../../../service/repository/Sesion";
import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import { ComponentBotton,
         ComponentModalFloting,
         ComponentModalFlotingHeader,
         ComponentModalFlotingBody } from "../../../../../../../../../../service/morvius-service/components";
import { Forminput,ForminputBottonSubmit} from "../../../../../../../../../../service/morvius-service/form";
import { handleNewNotification, useNotification } from "../../../../../../../../../../service/Notifications/useNotificacion";

export function AddSesion(props){
    const { onAction=()=>{},dataac={id_curso:0} } = props;
    const [ismodalvisible, setismodalvisible] = useState(false);
    const [itemselet, setitemselet] = useState(null);
    // const [listTipoCurso, setlistTipoCurso] = useState(null);
    // controladores de contenido inputs
    let [textsesion, settextsesion] = useState("");
    const dispatch = useNotification();

    // useEffect(()=>{
    //     (async()=>{
    //         await listarTipoCurso();
    //     })();
    // },[]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = {
            "id_clcurso" : dataac.id_ciclo_curso,
            "name" : event.target.sesion.value
        };
        let resul = await addSesion(data);
        handleNewNotification(dispatch,resul.messege, resul.status);
        setTimeout(() => {
                (async ()=>{
                    console.log(resul);
                    limpiarcastillas();
                    await onAction();
                })();
        }, 500);
    }

    const limpiarcastillas = ()=>{
        //userefTipoC.current.value = "";
        //setitemselet(null);
        setitemselet(null);
        //setlistTipoCurso(null);
        settextsesion("");
    }

    // const listarTipoCurso = async ()=>{
    //     // recargar datos
    //     let result = await getTipoCurso();
    //     setlistTipoCurso(null);
    //     setTimeout(()=>{
    //         setlistTipoCurso(result);
    //     },1000);
    // }

    return (
        <>
           <ComponentBotton isInvertColor={true} label={"Add.sesion"} onChange={()=>{setismodalvisible(true);}} />
           <ComponentModalFloting statemode={ismodalvisible} onClosechange={()=>{setismodalvisible(false);limpiarcastillas();}}>
               <ComponentModalFlotingHeader title="Insertar una sesion" onClosechange={()=>{setismodalvisible(false);limpiarcastillas();}} />
               <ComponentModalFlotingBody descripccion={"Ingrese el nombre de la secion de forma correcta"}>
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
                    <div style={{height:"20px"}}></div>
                    {/* apace cuando no se a seleccionado nada */}
                    <Forminput textinput={textsesion} settextinput={settextsesion} placeHolder="sesion" keyname ={"sesion"}/>
                    {/* {(itemselet == null)?
                    
                    <></>} */}
                    {/* aparece cuando se a seleccionado un iten */}
                    {/* {(itemselet != null)?
                    <Forminput valueInit={itemselet.name} placeHolder="Tipo de Curso" keyname ={"tipcurso"}/>:
                    <></>} */}
                    <ForminputBottonSubmit />
                </form>
               </ComponentModalFlotingBody>
           </ComponentModalFloting>
        </>
    );
}