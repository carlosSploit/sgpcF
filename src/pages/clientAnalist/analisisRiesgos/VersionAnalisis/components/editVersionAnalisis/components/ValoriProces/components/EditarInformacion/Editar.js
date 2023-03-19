import { useEffect, useState } from "react";
import { updateValorProceso } from "../../../../../../../../../../service/repository/RTValorizarProces";
import { useNotification } from "../../../../../../../../../../service/Notifications/NotificationProvider";
import { handleNewNotification } from "../../../../../../../../../../service/Notifications/useNotificacion";
import { ForminputBottonSubmit, ForminputComboBoxEdit, ForminputEdit } from "../../../../../../../../../../service/morvius-service/form_input/form_input";
import { getEscalaRTO } from "../../../../../../../../../../service/repository/RTEscalaRTO";
import { getEscalaRPO } from "../../../../../../../../../../service/repository/RTEscalaRPO";

export function EditarValorProcesImformation(props){

    const [propinformationDataGeneral, ] = useState({
        "id_valorProc": 2,
        "id_escalaRTO": 2,
        "id_escalaRPO": 4,
        "valorMDT": 5
      });
    const {onAction, informationDataGeneral = propinformationDataGeneral} = props;
    // escala de RTO
    const [textescalaRTO, settextescalaRTO] = useState(0);
    const [listescalaRTO, setlistescalaRTO] = useState([]);
    // escala de RPO
    const [textescalaRPO, settexescalaRPO] = useState(0);
    const [listescalaRPO, setlistescalaRPO] = useState([]);
    const dispatch = useNotification();

    useEffect(()=>{
        (async () => {
            // inicializar escala de RTO
            let result = await getEscalaRTO();
            setlistescalaRTO(result);
            settextescalaRTO(informationDataGeneral.id_escalaRTO)
            // inicializar escala de RPO
            let resultger = await getEscalaRPO();
            setlistescalaRPO(resultger);
            settexescalaRPO(informationDataGeneral.id_escalaRPO)
        })();
    },[]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = {
            "id_escalaRTO": event.target[`escalaRTO${informationDataGeneral.id_valorProc}`].value,
            "id_escalaRPO": event.target[`escalaRPO${informationDataGeneral.id_valorProc}`].value,
            "valorMDT": event.target[`valorMDT${informationDataGeneral.id_valorProc}`].value
        };
        let resul = await updateValorProceso(informationDataGeneral.id_valorProc, data);
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
        {(listescalaRPO.length != 0)?<ForminputComboBoxEdit 
            setpropdatacombo = {setlistescalaRPO}
            indexinput = {textescalaRPO}
            setindexinput = {settexescalaRPO}
            valueInit={informationDataGeneral.id_escalaRPO}  
            keyname={`escalaRPO${informationDataGeneral.id_valorProc}`} 
            isInvert={true} 
            width={100} 
            height={28} 
            keyvalue={'id_escalaRPO'} 
            keylabel={'criterioValor'} 
            datacombo={listescalaRPO} 
            placeHolder = {'Escala de RTO'}
            // onChangeinput = {(jsonval)=>{ settexescalaRPO(jsonval.value)}} 
            />:<></>}
        <div style={{height: '5px'}}></div>
        {(listescalaRTO.length != 0)?<ForminputComboBoxEdit 
            setpropdatacombo = {setlistescalaRTO}
            indexinput = {textescalaRTO}
            setindexinput = {settextescalaRTO}
            valueInit={informationDataGeneral.id_escalaRTO}  
            keyname={`escalaRTO${informationDataGeneral.id_valorProc}`} 
            isInvert={true} 
            width={100} 
            height={28} 
            keyvalue={'id_escalaRTO'} 
            keylabel={'criterioValor'} 
            datacombo={listescalaRTO} 
            placeHolder = {'Escala de RPO'}
            // onChangeinput = {(jsonval)=>{ settextTipoProc(jsonval.value)}} 
            />:<></>}
        <div style={{height: '5px'}}></div>
        <ForminputEdit valueInit={informationDataGeneral.valorMDT} placeHolder="Valor de MDT" keyname ={`valorMDT${informationDataGeneral.id_valorProc}`}/>

        <div style={{height: '20px'}}></div>
        <ForminputBottonSubmit label = {'Editar'} />
    </form>);
}