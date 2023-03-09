import React, { useState } from "react";
import "./style/addAlumnos.css";
import {uploudImage} from "../../../../../../service/repository/uploudimage";
import {addadmin} from "../../../../../../service/repository/Admin";
import { useNotification, handleNewNotification } from "../../../../../../service/Notifications/useNotificacion";
import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader } from "../../../../../../service/morvius-service/components";
import { Forminput, ForminputArea, ForminputBotton, ForminputBottonSubmit, Forminputnumber } from "../../../../../../service/morvius-service/form";
import { ConsuldataLogm, getKeysesion } from "../../../../../../service/repository/mithelworks";
import { addEmpresa } from "../../../../../../service/repository/Empresas";

export function AddEmpresas(props){
    const [ismodalvisible, setismodalvisible] = useState(false);
    const { onInsert=()=>{}, propismodalvisible = ismodalvisible, propsetismodalvisible = setismodalvisible } = props;

    // input de contenidos
    const [textname, settextname] = useState("");
    const [textruc, settextruc] = useState("");
    const [textdescrip, settextdescrip] = useState("");
    const [texttelefono, settexttelefono] = useState("");
    const [textrubroEm, settextrubroEm] = useState("");
    const [textmision, settextmision] = useState("");
    const [textvision, settextvision] = useState("");
    const dispatch = useNotification();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const sesionKey = await getKeysesion()
        const infoUser = await ConsuldataLogm({seccionkey:sesionKey})

        let data = {
            "id_clienAnalit" : infoUser.id_inform,
            "nombreempresa": event.target.nombrEmp.value,
            "ruc" :  event.target.ruc.value,
            "telefono": event.target.telf.value,
            "descripc" : event.target.descr.value,
            "rubroempresa" : event.target.rubemp.value,
            "misio": event.target.mision.value,
            "vision": event.target.vision.value
        };
        let resul = await addEmpresa(data);
        handleNewNotification(dispatch,resul.messege, resul.status);
        setTimeout(() => {
            (async ()=>{await onInsert();})();
            limpiartext();
            console.log(resul);
        }, 500);
    }

    const limpiartext = () =>{
        settextname("");
        settextruc("");
        settextdescrip("");
        settexttelefono("");
        settextrubroEm("");
        settextmision("");
        settextvision("");
    }

    return (
        <>
           <ComponentModalFloting statemode={propismodalvisible} width = {'400px'} >
                <ComponentModalFlotingHeader title="Insertar un Usuario" colorTitle={'#183152'} onClosechange={()=>{propsetismodalvisible(false);}} />
                <ComponentModalFlotingBody descripccion={""}>
                <div style={{height: '20px'}}></div>
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
                    
                    {/* apace cuando no se a seleccionado nada */}
                    <Forminput textinput ={textname} settextinput = {settextname} placeHolder="Nombre" keyname ={`nombrEmp`}/>
                    <div style={{height:'5px'}} />
                    <Forminputnumber textinput ={textruc} settextinput = {settextruc} placeHolder="RUC" keyname ={`ruc`}/>
                    <div style={{height:'5px'}} />
                    <ForminputArea textinput ={textdescrip} settextinput = {settextdescrip} placeHolder="Descripccion" keyname ={`descr`}/>
                    <div style={{height:'5px'}} />
                    <Forminput textinput ={texttelefono} settextinput = {settexttelefono} placeHolder="Telefono" keyname ={`telf`}/>
                    <div style={{height:'5px'}} />
                    <Forminput textinput ={textrubroEm} settextinput = {settextrubroEm} placeHolder="Rubro de la empresa" keyname ={`rubemp`}/>
                    <div style={{height:'5px'}} />
                    <ForminputArea textinput ={textmision} settextinput = {settextmision} placeHolder="Mision" keyname ={`mision`}/>
                    <div style={{height:'5px'}} />
                    <ForminputArea textinput ={textvision} settextinput = {settextvision} placeHolder="Vision" keyname ={`vision`}/>
                    <div style={{height: '20px'}}></div>
                    <ForminputBottonSubmit label = {'Registrar a la Empresa'} />
                    <ForminputBotton label = {'Cancelar'} isInvertColor = {true} />
                    {/* <ForminputBotton label = {"Cancelar"} isInvertColor = {true} /> */}
                </form>
                </ComponentModalFlotingBody>
            </ComponentModalFloting>
        </>
    );
}