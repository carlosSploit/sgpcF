import React, { useEffect, useRef, useState } from "react";
import "./style/editarsesion.css";
import { addSesion, updatSesion } from "../../../../../../../../../../service/repository/Sesion";
import { ComponentModalFloting,
         ComponentModalFlotingHeader,
         ComponentModalFlotingBody } from "../../../../../../../../../../service/morvius-service/components";
import { Forminput,ForminputBottonSubmit} from "../../../../../../../../../../service/morvius-service/form";
import { handleNewNotification, useNotification } from "../../../../../../../../../../service/Notifications/useNotificacion";

export function EditSesion(props){
    const { onAction=()=>{},dataac={id_sesion:0}, refid } = props;
    const [ismodalvisible, setismodalvisible] = useState(false);
    const [itemselet, setitemselet] = useState(null);
    const [listTipoCurso, setlistTipoCurso] = useState(null);
    // controladores de contenido inputs
    let [textsesion, settextsesion] = useState("");
    const dispatch = useNotification();

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = {
            "name" : event.target.sesion.value
        };
        let resul = await updatSesion(dataac.id_sesion,data);
        handleNewNotification(dispatch,resul.messege, resul.status);
        setTimeout(() => {
                (async ()=>{
                    console.log(resul);
                    await onAction();
                })();
        }, 500);
    }

    // const limpiarcastillas = ()=>{
    //     //userefTipoC.current.value = "";
    //     //setitemselet(null);
    //     setitemselet(null);
    //     //setlistTipoCurso(null);
    //     settextsesion("");
    // }

    return (
        <>
           <div ref={refid} onClick={()=>{
               setismodalvisible(true);
               settextsesion(dataac.nombre);
            }} />
           {/* <ComponentBotton isInvertColor={true} label={"Add.sesion"} onChange={()=>{setismodalvisible(true);}} /> */}
           <ComponentModalFloting statemode={ismodalvisible} onClosechange={()=>{setismodalvisible(false);}}>
               <ComponentModalFlotingHeader title="Insertar una sesion" onClosechange={()=>{setismodalvisible(false);}} />
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