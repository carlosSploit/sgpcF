import { useEffect, useState } from "react";
import { useNotification } from "../../../../../../../../service/Notifications/NotificationProvider";
import { getEscalaRTO } from "../../../../../../../../service/repository/RTEscalaRTO";
import { getEscalaRPO } from "../../../../../../../../service/repository/RTEscalaRPO";
import { updateValorProceso } from "../../../../../../../../service/repository/RTValorizarProces";
import { handleNewNotification } from "../../../../../../../../service/Notifications/useNotificacion";
import { ForminputBottonSubmit, ForminputComboBoxEdit, ForminputEdit } from "../../../../../../../../service/morvius-service/form_input/form_input";
import { updateValoriActiv } from "../../../../../../../../service/repository/RTValorizarActivo";
// import { updateValorProceso } from "../../../../../../../../../service/repository/RTValorizarProces";
// import { useNotification } from "../../../../../../../../../service/Notifications/NotificationProvider";
// import { handleNewNotification } from "../../../../../../../../../service/Notifications/useNotificacion";
// import { ForminputBottonSubmit, ForminputComboBoxEdit, ForminputEdit } from "../../../../../../../../../service/morvius-service/form_input/form_input";
// import { getEscalaRTO } from "../../../../../../../../../service/repository/RTEscalaRTO";
// import { getEscalaRPO } from "../../../../../../../../../service/repository/RTEscalaRPO";

export function EditarValorActivCuantiImformation(props){

    const [propinformationDataGeneral, ] = useState({
        "id_valorActiv": 1,
        "id_activProsVerAnali": 1,
        "valorActivCuanti": 1000,
        "promValorCuanti": 5,
        "nunValorDimen": 3,
        "fechaValorizacion": "2023-03-14T04:04:09.000Z",
        "estade": 1
      });
    const {onAction, informationDataGeneral = propinformationDataGeneral} = props;
    // // escala de RTO
    // const [textescalaRTO, settextescalaRTO] = useState(0);
    // const [listescalaRTO, setlistescalaRTO] = useState([]);
    // // escala de RPO
    // const [textescalaRPO, settexescalaRPO] = useState(0);
    // const [listescalaRPO, setlistescalaRPO] = useState([]);
    const dispatch = useNotification();

    useEffect(()=>{
        (async () => {
            // // inicializar escala de RTO
            // let result = await getEscalaRTO();
            // setlistescalaRTO(result);
            // settextescalaRTO(informationDataGeneral.id_escalaRTO)
            // // inicializar escala de RPO
            // let resultger = await getEscalaRPO();
            // setlistescalaRPO(resultger);
            // settexescalaRPO(informationDataGeneral.id_escalaRPO)
        })();
    },[]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = {
            "valorActivCuanti": event.target[`valorActivCuanti${informationDataGeneral.id_valorActiv}`].value
        };
        let resul = await updateValoriActiv(informationDataGeneral.id_valorActiv, data);
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
        <ForminputEdit valueInit={informationDataGeneral.valorActivCuanti} placeHolder="Valorizacion Cuantitiva" keyname ={`valorActivCuanti${informationDataGeneral.id_valorActiv}`}/>
        <div style={{height: '10px'}}></div>
        <ForminputBottonSubmit label = {'Editar'} />
    </form>);
}