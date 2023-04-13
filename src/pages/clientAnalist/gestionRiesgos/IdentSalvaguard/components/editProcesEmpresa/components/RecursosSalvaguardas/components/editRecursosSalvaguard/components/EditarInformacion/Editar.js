import { useEffect, useState } from "react";
import { ForminputBottonSubmit } from "../../../../../../../../../../../../service/morvius-service/form";
import { ForminputAreatEdit, ForminputEdit, ForminputnumberEdit } from "../../../../../../../../../../../../service/morvius-service/form_input/form_input";
import { handleNewNotification, useNotification } from "../../../../../../../../../../../../service/Notifications/useNotificacion";
import { updateRecursSalvAfectAct } from "../../../../../../../../../../../../service/repository/RTRecursSalvAfectAct";

export function EditarRecursoSalvaguarImform(props){

    const [propinformationDataGeneral, ] = useState({
        "id_recurSalvAfectAct":8,
        "id_salvAfectAct":11,
        "nombreRecurSalvAfect":"PC",
        "descripc":"Computadoras",
        "presioRecurSalvAfect":10.5,
        "estade":1
    });
    const {onAction, informationDataGeneral = propinformationDataGeneral} = props;
    
    // const [filephoto, setfilephoto] = useState(null);
    const dispatch = useNotification();

    useEffect(()=>{
        (async () => {
            console.log(informationDataGeneral)
        })();
    },[]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const datafloat = event.target[`presioRecur${informationDataGeneral.id_recurSalvAfectAct}`].value.split('.')

        let data = {
            "nombreRecurSalvAfect": event.target[`nombrRecur${informationDataGeneral.id_recurSalvAfectAct}`].value,
            "descripc": event.target[`descrRecur${informationDataGeneral.id_recurSalvAfectAct}`].value,
            "presioRecurMitAfec": (parseInt(datafloat.length) === 1)? event.target[`presioRecur${informationDataGeneral.id_recurSalvAfectAct}`].value + '.0' : event.target[`presioRecur${informationDataGeneral.id_recurSalvAfectAct}`].value
        };
        let resul = await updateRecursSalvAfectAct(informationDataGeneral.id_recurSalvAfectAct, data);
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
        
        
        {/* <ForminputEdit valueInit={informationDataGeneral.nombreobj} placeHolder="Nombre de la Objetivo de la Empresa" keyname ={`nombrEmp${informationDataGeneral.id_objempresa}`}/> */}
        <div style={{height:'5px'}} />
        <ForminputEdit valueInit={informationDataGeneral.nombreRecurSalvAfect} placeHolder="Nombre del Recurso" keyname ={`nombrRecur${informationDataGeneral.id_recurSalvAfectAct}`}/>
        <div style={{height:'5px'}} />
        <ForminputAreatEdit valueInit={informationDataGeneral.descripc} placeHolder="Descripccion del Recurso" keyname ={`descrRecur${informationDataGeneral.id_recurSalvAfectAct}`}/>
        <div style={{height:'5px'}} />
        <ForminputnumberEdit valueInit={informationDataGeneral.presioRecurSalvAfect} placeHolder="Presio del Recurso" keyname ={`presioRecur${informationDataGeneral.id_recurSalvAfectAct}`}/>
        <div style={{height: '20px'}}></div>
        <ForminputBottonSubmit label = {'Editar'} />
        {/* <ForminputBotton label = {"Cancelar"} isInvertColor = {true} /> */}
    </form>);
}