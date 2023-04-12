import React, { useEffect, useState } from "react";
import { useNotification } from "../../../../../../../service/Notifications/NotificationProvider";
// import {  addSelectEmpresa, getEmpresas } from "../../../../../../../service/repository/RTEmpresas";
// import { ConsuldataLogm, getKeysesion } from "../../../../../../../service/repository/mithelworks";
import { handleNewNotification } from "../../../../../../../service/Notifications/useNotificacion";
// import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader } from "../../../../../../../service/morvius-service/components";
import { ForminputBottonSubmit } from "../../../../../../../service/morvius-service/form";
// import { addVersionAnalitiv } from "../../../../../../../service/repository/RTVersionAnalitiv";
// import { getActivosProceso } from "../../../../../../../service/repository/RTActivosProceso";
import { addAfectaAtiv } from "../../../../../../../service/repository/RTAfectaActiv";
import { ForminputSelectItemFilter } from "../../../../../../../service/morvius-service/form_input/complements/forminputSelectItemFilter/ForminputSelectItem";
import { getTiposAmenasas } from "../../../../../../../service/repository/RTTiposAmenass";
import { getAmenasas } from "../../../../../../../service/repository/RTAmenass";

export function ManualIdentifiAmenaz(props){

    const { onInsert=()=>{}, informacionActivAfec} = props;
    // input de contenidos
    // const [, setidselectInscrip] = useState(-1);
    // listar los activos del proceso
    // const [listActivosProceso, setlistActivosProceso] = useState([]);
    // const [textActivosProceso, settextActivosProceso] = useState(0);
    // tipos de identificacion de amenazas
    // lista de la escala de valorizacion
    const [textvaloriOpccion, settvaloriOpccion] = useState(0)
    const [listtvaloriOpccion, setlisttvaloriOpccion] = useState([]);
    const [listtvaloriOpccionFilter, setlisttvaloriOpccionFilter] = useState([]);

    const dispatch = useNotification();

    useEffect(()=>{
        (async()=>{
            // inicializar los tipos de escalas de activos
            const Listresult = await getTiposAmenasas();
            const lisMapResulTipCrit = Listresult.map((item)=>{
                return {
                    id: item.id_tipoActiv,
                    name: item.nombreTipoActiv
                }
            })
            lisMapResulTipCrit.unshift({
                id: 0,
                name: 'Todo'
            })
            setlisttvaloriOpccionFilter(lisMapResulTipCrit)
            // inicializar los de escalas de activos
            const Listresultesc = await getAmenasas();
            const lisMapResulEsc = Listresultesc.map((item)=>{
                return {
                    id: item.id_amenaza,
                    name: item.nombreAmena,
                    descr: item.abreb,
                    keyfilter: item.id_tipoActiv
                }
            })
            setlisttvaloriOpccion(lisMapResulEsc)
        })();
    },[]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(informacionActivAfec)

        let data = {
            "id_activProsVerAnali":informacionActivAfec,
            "id_amenaza" : textvaloriOpccion,
            // "id_activProc": textActivosProceso
        };
        let resulEn = await addAfectaAtiv(data);
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
                            {(parseInt(listtvaloriOpccion.length) !== 0)?
                            <ForminputSelectItemFilter onChangeinput={(item)=>{
                                    console.log(item)
                                    settvaloriOpccion(item.id)
                                }} 
                                nameTitle = {'Selecciona una amenaza'}
                                valueInit = {textvaloriOpccion}
                                isVisibleDescri={true} 
                                checkbox={textvaloriOpccion} 
                                setcheckbox={settvaloriOpccion} 
                                listaObj={listtvaloriOpccion} 
                                setlistaObj={setlisttvaloriOpccion} 
                                listFilter={listtvaloriOpccionFilter} 
                                setlistFilter={setlisttvaloriOpccionFilter} >    
                            </ForminputSelectItemFilter>:<></>}
                        <div style={{height: '10px'}}></div>
                    </div>
                </>
                <ForminputBottonSubmit label = {'Registrar'} />
                {/* <ForminputBotton label = {"Cancelar"} isInvertColor = {true} /> */}
            </form>
        </>
    );
}