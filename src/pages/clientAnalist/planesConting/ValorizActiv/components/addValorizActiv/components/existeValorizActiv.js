import React, { useEffect, useState } from "react";
import { useNotification } from "../../../../../../../service/Notifications/NotificationProvider";
// import {  addSelectEmpresa, getEmpresas } from "../../../../../../../service/repository/RTEmpresas";
// import { ConsuldataLogm, getKeysesion } from "../../../../../../../service/repository/mithelworks";
import { handleNewNotification } from "../../../../../../../service/Notifications/useNotificacion";
// import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader } from "../../../../../../../service/morvius-service/components";
import { ForminputBottonSubmit, ForminputSelectItem } from "../../../../../../../service/morvius-service/form";
import { addVersionAnalitiv } from "../../../../../../../service/repository/RTVersionAnalitiv";
import { getActivosProceso } from "../../../../../../../service/repository/RTActivosProceso";

export function ExisteValoriActiv(props){

    const { onInsert=()=>{}, informacionProceso, informacionVersion} = props;
    // input de contenidos
    const [, setidselectInscrip] = useState(-1);
    // listar los activos del proceso
    const [listActivosProceso, setlistActivosProceso] = useState([]);
    const [textActivosProceso, settextActivosProceso] = useState(0);
    const dispatch = useNotification();

    useEffect(()=>{
        (async()=>{
            await onLoadActivosProces();
        })();
    },[]);

    const onLoadActivosProces = async ()=>{
        console.log(informacionProceso)
        let result = await getActivosProceso(informacionProceso);
        console.log(result)
        setlistActivosProceso([]);
        setTimeout(() => {
            let data = result.map((item)=>{
                return {
                    id: item.id_activproc,
                    name: item.nombre_Activo,
                    descr: item.dependAbreb
                }
            })
            setlistActivosProceso(data)
        }, 500);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = {
            "id_versonAnali" : informacionVersion,
            "id_activProc": textActivosProceso
        };
        let resulEn = await addVersionAnalitiv(data);
        handleNewNotification(dispatch,resulEn.messege, resulEn.status);
        setTimeout(() => {
            (async ()=>{await onInsert();})();
            settextActivosProceso(-1);
        }, 500);
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
                <>
                {(listActivosProceso.length != 0)? 
                    <div className="container_AreaInterProces_selectet_data">
                        <ForminputSelectItem isVisibleDescri={true} listaObj={listActivosProceso} setlistaObj = {setlistActivosProceso} keyname={"selestProcesoDep"} checkbox={textActivosProceso} setcheckbox={settextActivosProceso} onChangeinput={(json)=>{
                            settextActivosProceso(json.id)
                        }} />
                        <div style={{height: '10px'}}></div>
                    </div>
                :<></>}
                </>
                <ForminputBottonSubmit label = {'Registrar'} />
                {/* <ForminputBotton label = {"Cancelar"} isInvertColor = {true} /> */}
            </form>
        </>
    );
}