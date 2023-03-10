import React, { useEffect, useState } from "react";
import { useNotification } from "../../../../../../../../../../../service/Notifications/NotificationProvider";
// import { ConsuldataLogm, getKeysesion } from "../../../../../../../../../../../service/repository/mithelworks";
// import { addEmpresa } from "../../../../../../../../../../../service/repository/RTEmpresas";
import { handleNewNotification } from "../../../../../../../../../../../service/Notifications/useNotificacion";
import { Forminput, ForminputArea, ForminputBotton, ForminputBottonSubmit } from "../../../../../../../../../../../service/morvius-service/form";
import { addAreasEmpresa } from "../../../../../../../../../../../service/repository/RTAreasEmpresas";

export function ExisteAreaEmpresa(props){

    const [propinformationDataGeneral, propsetinformationDataGeneral] = useState({});
    const { onInsert=()=>{} ,informationDataGeneral = propinformationDataGeneral } = props;

    // input de contenidos
    const [textname, settextname] = useState("");
    const [textdescrip, settextdescrip] = useState("");
    const dispatch = useNotification();

    useEffect(()=>{
        (async()=>{
            console.log(informationDataGeneral.id_empresa)
        })();
    },[]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = {
            "id_empresa" : informationDataGeneral.id_empresa,
            "nombrearea": event.target.nombrEmp.value,
            "descriparea" :  event.target.descr.value
        };
        let resul = await addAreasEmpresa(data);
        handleNewNotification(dispatch,resul.messege, resul.status);
        setTimeout(() => {
            (async ()=>{await onInsert();})();
            limpiartext();
            console.log(resul);
        }, 500);
    }

    const limpiartext = () =>{
        settextname("");
        settextdescrip("");
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
                <ForminputArea textinput ={textdescrip} settextinput = {settextdescrip} placeHolder="Descripccion" keyname ={`descr`}/>
                <div style={{height: '20px'}}></div></>
                <ForminputBottonSubmit label = {'Registrar Area de la Empresa'} />
                <ForminputBotton label = {'Cancelar'} isInvertColor = {true} />
                {/* <ForminputBotton label = {"Cancelar"} isInvertColor = {true} /> */}
            </form>
        </>
    );
}