import { useEffect, useState } from "react";
import { useNotification } from "../../../../../../../../service/Notifications/NotificationProvider";
import { handleNewNotification } from "../../../../../../../../service/Notifications/useNotificacion";
import { ForminputAreatEdit, ForminputBottonSubmit } from "../../../../../../../../service/morvius-service/form_input/form_input";
import { updateAfectaAtiv } from "../../../../../../../../service/repository/RTAfectaActiv";

export function EditarEcenarioAmenaza(props){

    const [propinformationDataGeneral, ] = useState({
        "id_afectaActiv": 62,
        "id_activProsVerAnali": 35,
        "valoriActivCuanti": 100,
        "valoriActivCualiti": 9,
        "id_valorAfectAmen": null,
        "id_Frecuencia": null,
        "valorFrecuenCuali": null,
        "valorFrecuenCuanti": null,
        "nameFrecuencia": null,
        "valDegradCualit": null,
        "id_DegradCualit": null,
        "valImpacCualit": null,
        "valImpacCuanti": null,
        "valRiesgoCualit": null,
        "valRiesgoCuanti": null,
        "id_amenaza": 12,
        "esenario": "",
        "abreb": "I",
        "nombreAmena": "Fallo de servicios de comunicaciones",
        "id_tipoActiv": 2,
        "nombreTipoActiv": "De origen industrial"
    });
    const {onAction, informationDataGeneral = propinformationDataGeneral} = props;
    const dispatch = useNotification();

    useEffect(()=>{
        (async () => {
        })();
    },[]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = {
            "esenario": event.target[`escena${informationDataGeneral.id_afectaActiv}`].value
        };
        let resul = await updateAfectaAtiv(informationDataGeneral.id_afectaActiv, data);
        handleNewNotification(dispatch,resul.messege, resul.status);
        setTimeout(() => {
                (async ()=>{
                    await onAction();
                })();
        }, 500);
    }

    return (<form
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
        <div style={{height: '5px'}}></div>
        <ForminputAreatEdit valueInit={(informationDataGeneral.esenario == '')? 'Desconocido': informationDataGeneral.esenario} placeHolder="Ecenario donde ocurre la amenaza" keyname ={`escena${informationDataGeneral.id_afectaActiv}`}/>
        <div style={{height: '15px'}}></div>
        <ForminputBottonSubmit label = {'Editar'} />
    </form>);
}