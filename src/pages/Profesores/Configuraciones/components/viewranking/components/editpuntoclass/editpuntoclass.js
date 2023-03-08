import React, { useState } from "react";
import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader } from "../../../../../../../service/morvius-service/components";
import { Forminput, ForminputBotton, ForminputBottonSubmit, ForminputComboBox, ForminputSelectIcon } from "../../../../../../../service/morvius-service/form";
import ComponentItemPuntosClass from "../../../../../components/itempuntosclass/itempuntosclass";
import { handleNewNotification, useNotification } from "../../../../../../../service/Notifications/useNotificacion";
import { deletepuntclass, updatepuntclass } from "../../../../../../../service/repository/puntosclass";
import "./style/editpuntoclass.css";

export function Editpuntoclass(props){
    const {
        onEdit = () => {},
        item={
            id_tipo_puntos: 0,
            nombre:"",
            value_point:0,
            photo: ""
        }
    } = props;
    const [ismodalvisible, setismodalvisible] = useState(false);
    const [textnamepuntoclass, settextnamepuntoclass] = useState(item.nombre);
    const dispatch = useNotification();
    
    const onchange = () => {
        let ismodvis = !ismodalvisible;
        setismodalvisible(ismodvis);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        let data = {
            "name": event.target[`keynamepunt${item.id_tipo_puntos}`].value,
            "valpoint": event.target[`keypuntoclass${item.id_tipo_puntos}`].value,
            "photo": event.target[`keyiconselect${item.id_tipo_puntos}`].value,
        }

        let resutl = await updatepuntclass(item.id_tipo_puntos,data);
        handleNewNotification(dispatch,resutl.messege, resutl.status);
        setTimeout(() => {
                (async()=>{
                    await onEdit();
                })();
        }, 500);
    }

    const onDelectepunt = async () => {
        let resutl = await deletepuntclass(item.id_tipo_puntos);
        handleNewNotification(dispatch,resutl.messege, resutl.status);
        setTimeout(() => {
                (async()=>{
                    await onEdit();
                })();
        }, 500);
    }

    const datacombopuntos = [{id:-2, label:"-2"},{id:-1, label:"-1"},{id:1, label:"1"},{id:2, label:"2"}]

    return (
        <>
            <ComponentItemPuntosClass onchange={onchange} id_puntos = {item.id_tipo_puntos} name = {item.nombre} value = {item.value_point} photo = {item.photo} />
            <ComponentModalFloting statemode={ismodalvisible} onClosechange={()=>{setismodalvisible(false);}}>
               <ComponentModalFlotingHeader title="Editar un Punto de Clase" onClosechange={()=>{setismodalvisible(false);}} />
               <ComponentModalFlotingBody>
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
                    <ForminputSelectIcon keyname={`keyiconselect${item.id_tipo_puntos}`} valueInit={(item.photo != "")? parseInt(item.photo) : 0} />
                    <div style={{height:"5px"}}></div>
                    <Forminput valueInit = {item.nombre} textinput={textnamepuntoclass} settextinput={settextnamepuntoclass} placeHolder="Tipo de Curso" keyname ={`keynamepunt${item.id_tipo_puntos}`}/>
                    <div style={{height:"5px"}}></div>
                    <ForminputComboBox valueInit={item.value_point} datacombo={datacombopuntos} keyname={`keypuntoclass${item.id_tipo_puntos}`} isdefault={true} />
                    <div style={{height:"5px"}}></div>
                    <div className="container_edit_puntclas_butt">
                        <ForminputBotton  label={"Eliminar"} onChange={onDelectepunt} isInvertColor={true} />
                        <ForminputBottonSubmit />
                    </div>
                </form>
               </ComponentModalFlotingBody>
           </ComponentModalFloting>
        </>
    );
}