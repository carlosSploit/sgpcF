import { useEffect, useState } from "react";
import { useNotification } from "../../../../../../../../service/Notifications/NotificationProvider";
// import { getEscalaRTO } from "../../../../../../../../service/repository/RTEscalaRTO";
// import { getEscalaRPO } from "../../../../../../../../service/repository/RTEscalaRPO";
// import { updateValorProceso } from "../../../../../../../../service/repository/RTValorizarProces";
import { handleNewNotification } from "../../../../../../../../service/Notifications/useNotificacion";
import { ForminputAreatEdit, ForminputBottonSubmit } from "../../../../../../../../service/morvius-service/form_input/form_input";
import { updateValoriActiv } from "../../../../../../../../service/repository/RTValorizarActivo";
import { updateAfectaAtiv } from "../../../../../../../../service/repository/RTAfectaActiv";
// import { updateValorProceso } from "../../../../../../../../../service/repository/RTValorizarProces";
// import { useNotification } from "../../../../../../../../../service/Notifications/NotificationProvider";
// import { handleNewNotification } from "../../../../../../../../../service/Notifications/useNotificacion";
// import { ForminputBottonSubmit, ForminputComboBoxEdit, ForminputEdit } from "../../../../../../../../../service/morvius-service/form_input/form_input";
// import { getEscalaRTO } from "../../../../../../../../../service/repository/RTEscalaRTO";
// import { getEscalaRPO } from "../../../../../../../../../service/repository/RTEscalaRPO";

export function EditarEcenarioAmenaza(props){

    const [propinformationDataGeneral, ] = useState({
        "id_afectaActiv": 9,
        "id_activProsVerAnali": 22,
        "id_amenaza": 9,
        "esenario": "",
        "abreb": "I",
        "nombreAmena": "Avería de origen físico o lógico",
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