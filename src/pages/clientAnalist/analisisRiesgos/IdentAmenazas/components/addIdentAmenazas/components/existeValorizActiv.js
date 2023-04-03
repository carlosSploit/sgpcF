import React, { useEffect, useState } from "react";
import { useNotification } from "../../../../../../../service/Notifications/NotificationProvider";
// import {  addSelectEmpresa, getEmpresas } from "../../../../../../../service/repository/RTEmpresas";
// import { ConsuldataLogm, getKeysesion } from "../../../../../../../service/repository/mithelworks";
import { handleNewNotification } from "../../../../../../../service/Notifications/useNotificacion";
// import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader } from "../../../../../../../service/morvius-service/components";
import { ForminputBottonSubmit, ForminputComboBox } from "../../../../../../../service/morvius-service/form";
// import { addVersionAnalitiv } from "../../../../../../../service/repository/RTVersionAnalitiv";
// import { getActivosProceso } from "../../../../../../../service/repository/RTActivosProceso";
import { addAfectaAtivGeneri } from "../../../../../../../service/repository/RTAfectaActiv";

export function ExisteIdentifiAmenaz(props){

    const { onInsert=()=>{}, informacionActivAfec} = props;
    // input de contenidos
    // const [, setidselectInscrip] = useState(-1);
    // listar los activos del proceso
    // const [listActivosProceso, setlistActivosProceso] = useState([]);
    // const [textActivosProceso, settextActivosProceso] = useState(0);
    // tipos de identificacion de amenazas
    const [textTipoProc, settextTipoProc] = useState(0)
    const [listTipoProc, setlistTipoProc] = useState([
        {id_TipoIdenAmen:1, labelCrit:'Insidencias'},
        {id_TipoIdenAmen:2, labelCrit:'Magerit'},
        {id_TipoIdenAmen:3, labelCrit:'Pilar'}
    ]);
    const dispatch = useNotification();

    useEffect(()=>{
        (async()=>{
            // await onLoadActivosProces();
        })();
    },[]);

    // const onLoadActivosProces = async ()=>{
    //     console.log(informacionProceso)
    //     let result = await getActivosProceso(informacionProceso);
    //     console.log(result)
    //     setlistActivosProceso([]);
    //     setTimeout(() => {
    //         let data = result.map((item)=>{
    //             return {
    //                 id: item.id_activproc,
    //                 name: item.nombre_Activo,
    //                 descr: item.dependAbreb
    //             }
    //         })
    //         setlistActivosProceso(data)
    //     }, 500);
    // }

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(informacionActivAfec)

        let data = {
            "id_activProsVerAnali":informacionActivAfec,
            "id_libreryAmen" : textTipoProc,
            // "id_activProc": textActivosProceso
        };
        let resulEn = await addAfectaAtivGeneri(data);
        handleNewNotification(dispatch,resulEn.messege, resulEn.status);
        setTimeout(() => {
            (async ()=>{await onInsert();})();
            // settextActivosProceso(-1);
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
                <div className="container_AreaInterProces_selectet_data">
                        {(listTipoProc.length != 0)?<ForminputComboBox
                            setpropdatacombo = {setlistTipoProc}
                            indexinput = {textTipoProc}
                            setindexinput = {settextTipoProc} 
                            keyname={`tipros`} 
                            isInvert={true} 
                            isdefault={true}
                            valueInit={textTipoProc}
                            width={100} 
                            height={28}
                            keyvalue={'id_TipoIdenAmen'} 
                            keylabel={'labelCrit'} 
                            datacombo={listTipoProc} 
                            placeHolder = {'Tipos de Migracion'}
                            onChangeinput = {(json) => {
                                settextTipoProc(json.value)
                            }}
                        // onChangeinput = {(jsonval)=>{ settextTipoProc(jsonval.value)}} 
                        />:<></>}
                        <div style={{height: '10px'}}></div>
                    </div>
                </>
                <ForminputBottonSubmit label = {'Registrar'} />
                {/* <ForminputBotton label = {"Cancelar"} isInvertColor = {true} /> */}
            </form>
        </>
    );
}