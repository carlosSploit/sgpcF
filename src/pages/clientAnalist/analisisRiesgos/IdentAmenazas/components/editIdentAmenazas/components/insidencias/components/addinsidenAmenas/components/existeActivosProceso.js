import React, { useEffect, useState } from "react";
import './index.css';
import { useNotification } from "../../../../../../../../../../../service/Notifications/NotificationProvider";
import { handleNewNotification } from "../../../../../../../../../../../service/Notifications/useNotificacion";
import { ForminputBotton, ForminputBottonSubmit, ForminputSelectItem } from "../../../../../../../../../../../service/morvius-service/form";
// import { getActivosEmpresa } from "../../../../../../../../../../../service/repository/RTActivos";
// import { addActivosProceso } from "../../../../../../../../../../../service/repository/RTActivosProceso";
import { getAfectaAtivInsidencia } from "../../../../../../../../../../../service/repository/RTAfectaActiv";
import { addAfecActivInsiden, getAfecActivInsiden } from "../../../../../../../../../../../service/repository/RTAfecActivInsiden";

export function ExisteActivosProceso(props){

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
    const { onInsert=()=>{} ,informationDataGeneral = propinformationDataGeneral, informationActivAnali } = props;

    const [listActivosProceso, setlistActivosProceso] = useState([]);
    const [textActivosProceso, settextActivosProceso] = useState(0);
    const [isListInsertInsidenAmenaz, setisListInsertInsidenAmenaz] = useState(false);
    const [isListInsidenAmenaz, setisListInsidenAmenaz] = useState(false);
    const dispatch = useNotification();

    useEffect(()=>{
        (async()=>{
            await onLoadAreas();
        })();
    },[]);

    const onLoadAreas = async ()=>{
        let result2 = await getAfecActivInsiden(informationDataGeneral.id_afectaActiv);
        let result = await getAfectaAtivInsidencia({id_activProsVerAnali: informationActivAnali, id_amenaza: informationDataGeneral.id_amenaza });
        // comprueba si esque hay insidencias
        setisListInsidenAmenaz((result.length > 0)) 
        // si la lista de insidencias es mayor que la lista insertada se podran enlazar de manera manual
        // si es igual a 0 se podran generar las icidencias desde 0
        setisListInsertInsidenAmenaz((result2.length > 0)) 
        setlistActivosProceso([]);
        setTimeout(() => {
            let data = result.map((item)=>{
                return {
                    id: item.id_insidencia, 
                    name: item.nombroInsid 
                }
            })
            console.log(result)
            setlistActivosProceso(data)
        }, 500);
    }

    const generatorInsidence = async () => {
        const arrayResult = []; 
        for (let index = 0; index < listActivosProceso.length; index++) {
            const element = listActivosProceso[index];
            let data = {
                "id_insidencia" : element.id,
                "id_afectaActiv": informationDataGeneral.id_afectaActiv
            };
            let resul = await addAfecActivInsiden(data);
            arrayResult.push(resul)
        }

        const errorData = arrayResult.filter((item)=>{return item.status == 404})
        handleNewNotification(dispatch,(errorData.length > 0)?((errorData.length == listActivosProceso.length)?'La generacion de las incidencias fallo.':'Se a generado correctamente las insidencias pero parace que unas de ellas se lo gro ser insertada'):'La generacion de incidencias se dio con exito.', (errorData.length > 0)?(404):200);
        setTimeout(() => {
            (async ()=>{await onInsert();})();
            limpiartext();
        }, 500);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = {
            "id_insidencia" : textActivosProceso,
            "id_afectaActiv": informationDataGeneral.id_afectaActiv
        };
        let resul = await addAfecActivInsiden(data);
        handleNewNotification(dispatch,resul.messege, resul.status);
        setTimeout(() => {
            (async ()=>{await onInsert();})();
            limpiartext();
            console.log(resul);
        }, 500);
    }

    const limpiartext = () =>{
        settextActivosProceso(0);
    }

    const onSelectItem = (json) => {
        settextActivosProceso(json.id);
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
                {/* apace cuando no se a seleccionado nada */}
                {(isListInsidenAmenaz)?
                    ((isListInsertInsidenAmenaz)?<>
                    <div style={{height:'5px'}} />
                    {(listActivosProceso.length != 0)? 
                        <>
                            <div className="container_addInsidenAmenas_selectet_data">
                                <ForminputSelectItem  
                                    listaObj={listActivosProceso} 
                                    setlistaObj = {setlistActivosProceso} 
                                    keyname={"selestProcesoDep"} 
                                    checkbox={textActivosProceso} 
                                    setcheckbox={settextActivosProceso} 
                                    onChangeinput={onSelectItem} />
                            </div>
                            <div style={{height:'10px'}} />
                            <ForminputBottonSubmit label = {'Enlazar la Insidencia'} />
                        </>
                    :<></>}
                </>:<>
                    <div className="Container_addInsidenAmenas_principal_body_error" >Parece que no a enlazado ninguna insidencia. Presione en generar para enlazar todas las insidencias que esten alineadas a esta amenaza</div>
                    <div style={{height:'20px'}} />
                    <ForminputBotton label={'Generar'} onChange={async ()=>{
                        await generatorInsidence();
                    }} />
                </>):<>
                    <div className="Container_addInsidenAmenas_principal_body_error" >No se encontro con ningun ninguna insidencia que este alineada a esta amenaza</div>
                </>}
                {/* <ForminputBotton label = {'Cancelar'} isInvertColor = {true} /> */}
                {/* <ForminputBotton label = {"Cancelar"} isInvertColor = {true} /> */}
            </form>
        </>
    );
}