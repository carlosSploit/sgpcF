import { useEffect, useState } from "react";
import { useNotification } from "../../../../../../../../service/Notifications/NotificationProvider";
// import { getEscalaRTO } from "../../../../../../../../service/repository/RTEscalaRTO";
// import { getEscalaRPO } from "../../../../../../../../service/repository/RTEscalaRPO";
// import { updateValorProceso } from "../../../../../../../../service/repository/RTValorizarProces";
import { handleNewNotification } from "../../../../../../../../service/Notifications/useNotificacion";
import { ForminputBottonSubmit, ForminputComboBox, ForminputEdit } from "../../../../../../../../service/morvius-service/form_input/form_input";
import { updateValoriActiv } from "../../../../../../../../service/repository/RTValorizarActivo";
import { getEscalaFrecuencia } from "../../../../../../../../service/repository/RTTEscaleFrecu";
import { updateValorizarAmenaz } from "../../../../../../../../service/repository/RTValorizarAmenaz";
// import { updateValorProceso } from "../../../../../../../../../service/repository/RTValorizarProces";
// import { useNotification } from "../../../../../../../../../service/Notifications/NotificationProvider";
// import { handleNewNotification } from "../../../../../../../../../service/Notifications/useNotificacion";
// import { ForminputBottonSubmit, ForminputComboBoxEdit, ForminputEdit } from "../../../../../../../../../service/morvius-service/form_input/form_input";
// import { getEscalaRTO } from "../../../../../../../../../service/repository/RTEscalaRTO";
// import { getEscalaRPO } from "../../../../../../../../../service/repository/RTEscalaRPO";

export function EditarValorActivCuantiImformation(props){

    const [propinformationDataGeneral, ] = useState({
        "id_valorAfectAmen": 2,
        "id_afectaActiv": 8,
        "id_escalaFrecuen": 3,
        "promEscalDregad": 80,
        "impactCuanti": 80000,
        "riesgoCuanti": 80000,
        "numValDim": 2,
        "estade": 1
    });
    const {onAction, informationDataGeneral = propinformationDataGeneral} = props;
    const dispatch = useNotification();
    // escala de degradacion
    const [textTipoProc, settextTipoProc] = useState(0)
    const [listTipoProc, setlistTipoProc] = useState([]);

    useEffect(()=>{
        (async () => {
            const listEscalFrecuen = await getEscalaFrecuencia();
            setlistTipoProc(listEscalFrecuen)
            settextTipoProc(informationDataGeneral.id_escalaFrecuen)
        })();
    },[]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = {
            "id_escalaFrecuen": textTipoProc
        };
        let resul = await updateValorizarAmenaz(informationDataGeneral.id_afectaActiv, data);
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
        <div className="form_dimenicon_subconteiner_body_opccion">
            {(listTipoProc.length != 0)?<ForminputComboBox
                setpropdatacombo = {setlistTipoProc}
                indexinput = {textTipoProc}
                setindexinput = {settextTipoProc} 
                keyname={`escalFrec${informationDataGeneral.id_valorAfectAmen}`} 
                isInvert={true} 
                isdefault={true}
                valueInit={textTipoProc}
                keyvalue={'id_escalaFrecuenc'} 
                keylabel={'nombreEscalFrecuenc'} 
                datacombo={listTipoProc} 
                placeHolder = {'Escala de Frecuencia'}
                onChangeinput = {(json) => {
                    console.log(json)
                    settextTipoProc(json.value)
                }}
            // onChangeinput = {(jsonval)=>{ settextTipoProc(jsonval.value)}} 
            />:<></>}
        </div>
        <div style={{height: '10px'}}></div>
        <ForminputBottonSubmit label = {'Editar'} />
    </form>);
}