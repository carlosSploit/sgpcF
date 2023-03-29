import React, { useEffect, useState } from "react";
import { useNotification } from "../../../../../../../../../../../service/Notifications/NotificationProvider";
// import { ConsuldataLogm, getKeysesion } from "../../../../../../../../../../../service/repository/mithelworks";
// import { addEmpresa } from "../../../../../../../../../../../service/repository/RTEmpresas";
import { handleNewNotification } from "../../../../../../../../../../../service/Notifications/useNotificacion";
import { Forminput, ForminputArea, ForminputBotton, ForminputBottonSubmit, Forminputnumber } from "../../../../../../../../../../../service/morvius-service/form";
// import { addAreasEmpresa } from "../../../../../../../../../../../service/repository/RTAreasEmpresas";
// import { addObjetivEmpresa } from "../../../../../../../../../../../service/repository/RTObjetivEmpresas";
import { addRecursSalvAfectAct } from "../../../../../../../../../../../service/repository/RTRecursSalvAfectAct";

export function ExisteObjetivoEmpresa(props){

    const [propinformationDataGeneral,] = useState({});
    const { onInsert=()=>{} ,informationDataGeneral = propinformationDataGeneral } = props;

    // input de contenidos
    const [textname, settextname] = useState("");
    const [textdescrip, settextdescrip] = useState("");
    const [textpresio, settextpresio] = useState("");
    const dispatch = useNotification();

    useEffect(()=>{
        (async()=>{
            console.log(informationDataGeneral.id_salvAfectAct)
        })();
    },[]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const datafloat = event.target.presioRecur.value.split('.')

        let data = {
            "id_salvAfectAct" : informationDataGeneral.id_salvAfectAct,
            "nombreRecurSalvAfect": event.target.nombrRecur.value,
            "descripc": event.target.descrRecur.value,
            "presioRecurMitAfec": (parseInt(datafloat.length) === 1)? event.target.presioRecur.value + '.0' : event.target.presioRecur.value
        };
        console.log(data)
        let resul = await addRecursSalvAfectAct(data);
        console.log(resul)
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
        settextpresio(0);
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
                <Forminput textinput ={textname} settextinput = {settextname} placeHolder="Nombre" keyname ={`nombrRecur`}/>
                <div style={{height:'5px'}} />
                <ForminputArea textinput ={textdescrip} settextinput = {settextdescrip} placeHolder="Descripccion" keyname ={`descrRecur`}/>
                <div style={{height:'5px'}} />
                <Forminputnumber textinput ={textpresio} settextinput = {settextpresio} placeHolder="Presio" keyname ={`presioRecur`}/>
                <div style={{height: '20px'}}></div></>
                <ForminputBottonSubmit label = {'Registrar recursos'} />
                <ForminputBotton label = {'Cancelar'} isInvertColor = {true} onChange={limpiartext} />
                {/* <ForminputBotton label = {"Cancelar"} isInvertColor = {true} /> */}
            </form>
        </>
    );
}