import React, { useState } from "react";
import { useNotification } from "../../../../../../../service/Notifications/NotificationProvider";
import { addEmpresa } from "../../../../../../../service/repository/RTEmpresas";
import { ConsuldataLogm, getKeysesion } from "../../../../../../../service/repository/mithelworks";
import { handleNewNotification } from "../../../../../../../service/Notifications/useNotificacion";
import { Forminput, ForminputArea, ForminputBotton, ForminputBottonSubmit, Forminputmail, Forminputnumber } from "../../../../../../../service/morvius-service/form";
import { addTrabajEmpresa } from "../../../../../../../service/repository/RTTrabajEmpresas";

export function NoExisteEmpresa(props){
    
    const { onInsert=()=>{}, informacionGeneral = 0} = props;

    // input de contenidos
    const [textname, settextname] = useState("");
    const [textCargo, settextCargo] = useState("");
    const [textdescrip, settextdescrip] = useState("");
    const [texttelefono, settexttelefono] = useState("");
    const [textCorreo, settextCorreo] = useState("");
    const [textCodigo, settextCodigo] = useState("");
    // const [textvision, settextvision] = useState("");
    const dispatch = useNotification();

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = {
            "nombre" : event.target.nombrEmp.value,
            "cargo": event.target.carg.value,
            "descripc": event.target.descr.value,
            "telefono":event.target.telf.value,
            "correo": event.target.correo.value,
            "codTrabajo": event.target.codig.value,
            "id_empresa" : informacionGeneral
        };
        let resul = await addTrabajEmpresa(data);
        handleNewNotification(dispatch,resul.messege, resul.status);
        setTimeout(() => {
            (async ()=>{await onInsert();})();
            limpiartext();
            console.log(resul);
        }, 500);
    }

    const limpiartext = () =>{
        settextname("");
        settextCargo("");
        settextdescrip("");
        settexttelefono("");
        settextCorreo("");
        settextCodigo("");
    }

    return (
        <>
           <form
                style={{
                    margin: "0",
                    padding: "0",
                    width: "90%",
                    paddingLeft: '5%',
                    paddingRight: '5%'
                }}
                layout="vertical"
                onSubmit={handleSubmit}
                onFinich
                autoComplete="off"
            >
                <>{/* apace cuando no se a seleccionado nada */}
                <div style={{height:'5px'}} />
                <Forminput textinput ={textname} settextinput = {settextname} placeHolder="Nombre" keyname ={`nombrEmp`}/>
                <div style={{height:'5px'}} />
                <Forminput textinput ={textCargo} settextinput = {settextCargo} placeHolder="Cargo" keyname ={`carg`}/>
                <div style={{height:'5px'}} />
                <ForminputArea textinput ={textdescrip} settextinput = {settextdescrip} placeHolder="Descripccion" keyname ={`descr`}/>
                <div style={{height:'5px'}} />
                <Forminput textinput ={texttelefono} settextinput = {settexttelefono} placeHolder="Telefono" keyname ={`telf`}/>
                <div style={{height:'5px'}} />
                <Forminputmail textinput ={textCorreo} settextinput = {settextCorreo} placeHolder="Correo" keyname ={`correo`}/>
                <div style={{height:'5px'}} />
                <Forminput textinput ={textCodigo} settextinput = {settextCodigo} placeHolder="Codigo Empresa" keyname ={`codig`}/>
                <div style={{height: '20px'}}></div></>
                <ForminputBottonSubmit label = {'Registrar a la Empresa'} />
                <ForminputBotton label = {'Cancelar'} isInvertColor = {true} />
                {/* <ForminputBotton label = {"Cancelar"} isInvertColor = {true} /> */}
            </form>
        </>
    );
}