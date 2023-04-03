import { useEffect, useState } from "react";
import { useNotification } from "../../../../../../../../service/Notifications/NotificationProvider";
// import { getEscalaRTO } from "../../../../../../../../service/repository/RTEscalaRTO";
// import { getEscalaRPO } from "../../../../../../../../service/repository/RTEscalaRPO";
// import { updateValorProceso } from "../../../../../../../../service/repository/RTValorizarProces";
import { handleNewNotification } from "../../../../../../../../service/Notifications/useNotificacion";
import { ForminputBottonSubmit, ForminputComboBox, ForminputComboBoxEdit, ForminputEdit } from "../../../../../../../../service/morvius-service/form_input/form_input";
import { updateValoriActiv } from "../../../../../../../../service/repository/RTValorizarActivo";
import { getEscalaFrecuencia } from "../../../../../../../../service/repository/RTTEscaleFrecu";
import { updateValorizarAmenaz } from "../../../../../../../../service/repository/RTValorizarAmenaz";
import { getEscalEficas } from "../../../../../../../../service/repository/RTEscalaEficas";
import { updateValoriSalvaguard } from "../../../../../../../../service/repository/RTValoriSalvaguard";
// import { updateValorProceso } from "../../../../../../../../../service/repository/RTValorizarProces";
// import { useNotification } from "../../../../../../../../../service/Notifications/NotificationProvider";
// import { handleNewNotification } from "../../../../../../../../../service/Notifications/useNotificacion";
// import { ForminputBottonSubmit, ForminputComboBoxEdit, ForminputEdit } from "../../../../../../../../../service/morvius-service/form_input/form_input";
// import { getEscalaRTO } from "../../../../../../../../../service/repository/RTEscalaRTO";
// import { getEscalaRPO } from "../../../../../../../../../service/repository/RTEscalaRPO";

export function EditarValorActivCuantiImformation(props){

    const [propinformationDataGeneral, ] = useState({
        "id_afectaActiv": 20,
        "id_valorEficacia": 12,
        "id_salvAfectAct": 17,
        "id_escalEficDegr": 0,
        "valEficDegr": 0,
        "id_escalEficFrec": 0,
        "valEficFrec": 0,
        "id_escalEficImpac": 0,
        "valEficImpac": 0,
        "promValFrecueResi": 0,
        "cuantiValImpactResi": 0,
        "cuantiValRiesgoResi": 0
    });
    const {onAction, informationDataGeneral = propinformationDataGeneral} = props;
    const dispatch = useNotification();
    // Escala de eficacia
    // const [listEscalaRange, setlistEscalaRange] = useState([]);
    const [listEscala, setlistEscala] = useState([
        {id_nivelCrit:1, labelCrit:'Muy Ineficiente - 0'},
        {id_nivelCrit:2, labelCrit:'Muy Ineficiente - 10'},
        {id_nivelCrit:3, labelCrit:'Ineficiente - 20'},
        {id_nivelCrit:4, labelCrit:'Ineficiente - 30'},
        {id_nivelCrit:5, labelCrit:'Medio Eficiente - 40'},
        {id_nivelCrit:6, labelCrit:'Medio Eficiente - 50'},
        {id_nivelCrit:7, labelCrit:'Eficiente - 60'},
        {id_nivelCrit:8, labelCrit:'Eficiente - 70'},
        {id_nivelCrit:8, labelCrit:'Eficiente - 80'},
        {id_nivelCrit:9, labelCrit:'Muy Eficiente - 90'},
        {id_nivelCrit:10, labelCrit:'Muy Eficiente - 100'},
    ]);
    // escala de Degradacion de la Eficacia
    const [textDegradEficas, setDegradEficas] = useState(0)
    const [listDegradEficas, setlistDegradEficas] = useState([]);
    // escala de Frecuencia de la Eficacia
    const [textFrecueEficas, settextFrecueEficas] = useState(0)
    const [listFrecueEficas, setlistFrecueEficas] = useState([]);
    // escala de Impacto de la Eficacia
    const [textImpactoEficas, settextImpactoEficas] = useState(0)
    const [listImpactoEficas, setlistImpactoEficas] = useState([]);

    useEffect(()=>{
        (async () => {
            // capturar el id de la escala de degradacion
            setlistDegradEficas(listEscala);
            const listResultDegrad = listEscala.filter((item) => {
                const range = item.labelCrit.split(' - ')
                return parseInt(informationDataGeneral.valEficDegr) === parseInt(range[1])
            })
            const objResultDegrad = listResultDegrad[0]
            console.log(objResultDegrad)
            setDegradEficas(objResultDegrad.id_nivelCrit)
            // capturar el id de la escala de eficacia
            setlistFrecueEficas(listEscala);
            const listResultFrecun = listEscala.filter((item) => {
                const range = item.labelCrit.split(' - ')
                console.log(range)
                console.log(`${parseInt(informationDataGeneral.valEficFrec)} === ${parseInt(range[1])}`)
                return parseInt(informationDataGeneral.valEficFrec) === parseInt(range[1])
            })
            const objResultFrecun = listResultFrecun[0]
            settextFrecueEficas(objResultFrecun.id_nivelCrit)
            // capturar el id de la escala de impacto
            setlistImpactoEficas(listEscala);
            const listResultImpact = listEscala.filter((item) => {
                const range = item.labelCrit.split(' - ')
                return parseInt(informationDataGeneral.valEficImpac) === parseInt(range[1])
            })
            const objResultImpact = listResultImpact[0]
            settextImpactoEficas(objResultImpact.id_nivelCrit)
        })();
    },[]);

    const getValorScale = (id = 0) => {
        const listResultSelecte = listEscala.filter((item) => {
            return parseInt(item.id_nivelCrit) === parseInt(id)
        })
        const objResultImpact = listResultSelecte[0]
        return parseInt(objResultImpact.labelCrit.split(' - ')[1])
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = {
            "valEficDegr": getValorScale(textDegradEficas),
            "valEficFrec":  getValorScale(textFrecueEficas),
            "valEficImpac": getValorScale(textImpactoEficas)
        };

        let resul = await updateValoriSalvaguard(informationDataGeneral.id_salvAfectAct, data);
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
            {(listDegradEficas.length != 0)?<ForminputComboBoxEdit
                setpropdatacombo = {setlistDegradEficas}
                indexinput = {textDegradEficas}
                setindexinput = {setDegradEficas} 
                keyname={`eficDegr${informationDataGeneral.id_valorEficacia}`} 
                isInvert={true} 
                valueInit={textDegradEficas}
                keyvalue={'id_nivelCrit'} 
                keylabel={'labelCrit'} 
                datacombo={listDegradEficas} 
                placeHolder = {'Eficacia de la Degradacion'}
                onChangeinput = {(json) => {
                    // console.log(json)
                    setDegradEficas(json.value)
                }}
            // onChangeinput = {(jsonval)=>{ settextTipoProc(jsonval.value)}} 
            />:<></>}
        </div>
        <div style={{height: '5px'}}></div>
        <div className="form_dimenicon_subconteiner_body_opccion">
            {(listFrecueEficas.length != 0)?<ForminputComboBoxEdit
                setpropdatacombo = {setlistFrecueEficas}
                indexinput = {textFrecueEficas}
                setindexinput = {settextFrecueEficas} 
                keyname={`eficFrec${informationDataGeneral.id_valorEficacia}`} 
                isInvert={true} 
                isdefault={true}
                valueInit={textFrecueEficas}
                keyvalue={'id_nivelCrit'} 
                keylabel={'labelCrit'} 
                datacombo={listFrecueEficas} 
                placeHolder = {'Eficacia de la Frecuencia'}
                onChangeinput = {(json) => {
                    settextFrecueEficas(json.value)
                }}
            // onChangeinput = {(jsonval)=>{ settextTipoProc(jsonval.value)}} 
            />:<></>}
        </div>
        <div style={{height: '5px'}}></div>
        <div className="form_dimenicon_subconteiner_body_opccion">
            {(listImpactoEficas.length != 0)?<ForminputComboBoxEdit
                setpropdatacombo = {setlistImpactoEficas}
                indexinput = {textImpactoEficas}
                setindexinput = {settextImpactoEficas} 
                keyname={`eficImp${informationDataGeneral.id_valorEficacia}`} 
                isInvert={true} 
                isdefault={true} 
                valueInit={textImpactoEficas}
                keyvalue={'id_nivelCrit'} 
                keylabel={'labelCrit'} 
                datacombo={listImpactoEficas} 
                placeHolder = {'Eficacia del Impacto'}
                onChangeinput = {(json) => {
                    // console.log(json)
                    settextImpactoEficas(json.value)
                }}
            // onChangeinput = {(jsonval)=>{ settextTipoProc(jsonval.value)}} 
            />:<></>}
        </div>
        <div style={{height: '10px'}}></div>
        <ForminputBottonSubmit label = {'Valorizar'} />
    </form>);
}