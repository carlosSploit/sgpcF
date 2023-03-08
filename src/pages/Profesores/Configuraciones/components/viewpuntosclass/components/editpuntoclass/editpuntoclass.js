import React, { useEffect, useState } from "react";
import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader } from "../../../../../../../service/morvius-service/components";
import { Forminput, ForminputBotton, ForminputBottonSubmit, ForminputComboBox, ForminputRadioSlice, ForminputSelectIcon } from "../../../../../../../service/morvius-service/form";
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
    const [isselectRadio, setisselectRadio] = useState(false);
    const [textnamepuntoclass, settextnamepuntoclass] = useState(item.nombre);
    const dispatch = useNotification();

    useEffect(()=>{
        console.log(item.isdefault);
        setisselectRadio((item.isacumulado == 1));
    },[]);
    
    const onchange = () => {
        let ismodvis = !ismodalvisible;
        setismodalvisible(ismodvis);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // console.log(event.target[`inputRadio${item.id_tipo_puntos}`].value);
        
        let data = {
            "name": event.target[`keynamepunt${item.id_tipo_puntos}`].value,
            "valpoint": event.target[`keypuntoclass${item.id_tipo_puntos}`].value,
            "photo": event.target[`keyiconselect${item.id_tipo_puntos}`].value,
            "isacumulable": (isselectRadio)? 1 : 0 
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

    const changeSelecRadio = (state) => {
        setisselectRadio(state);
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
                    <Forminput isdisable={item.isdefault == 1} valueInit = {item.nombre} textinput={textnamepuntoclass} settextinput={settextnamepuntoclass} placeHolder="Tipo de Curso" keyname ={`keynamepunt${item.id_tipo_puntos}`}/>
                    <div style={{height:"2px"}}></div>
                    {/* Si es un dato por defaul, no se podra cambiar el cumulable, si no es por defaul, quedara talcual */}
                    {(item.isdefault == 1)?<></>:<ForminputRadioSlice checkradio = {isselectRadio} setcheckradio = {setisselectRadio} valueInit={isselectRadio}  label="El punto es acumulable" onChangeinput={changeSelecRadio} />}
                    <div style={{height:"5px"}}></div>
                    <ForminputComboBox valueInit={item.value_point} datacombo={datacombopuntos} keyname={`keypuntoclass${item.id_tipo_puntos}`} isdefault={true} />
                    <div style={{height:"5px"}}></div>
                    <div className="container_edit_puntclas_butt">
                        <ForminputBotton  label={"Eliminar"} onChange={onDelectepunt} isInvertColor={true} />
                        <ForminputBottonSubmit label="Actualizar"/>
                    </div>
                </form>
               </ComponentModalFlotingBody>
           </ComponentModalFloting>
        </>
    );
}