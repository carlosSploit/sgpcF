import React, { useEffect, useState } from "react";
import { useNotification } from "../../../../../../../service/Notifications/NotificationProvider";
// import {  addSelectEmpresa, getEmpresas } from "../../../../../../../service/repository/RTEmpresas";
// import { ConsuldataLogm, getKeysesion } from "../../../../../../../service/repository/mithelworks";
import { handleNewNotification } from "../../../../../../../service/Notifications/useNotificacion";
// import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader } from "../../../../../../../service/morvius-service/components";
import { ForminputArea, ForminputBottonSubmit } from "../../../../../../../service/morvius-service/form";
// import { addVersionAnalitiv } from "../../../../../../../service/repository/RTVersionAnalitiv";
// import { getActivosProceso } from "../../../../../../../service/repository/RTActivosProceso";
// import { addAfectaAtiv } from "../../../../../../../service/repository/RTAfectaActiv";
import { ForminputSelectItemFilter } from "../../../../../../../service/morvius-service/form_input/complements/forminputSelectItemFilter/ForminputSelectItem";
// import { getTiposAmenasas } from "../../../../../../../service/repository/RTTiposAmenass";
// import { getAmenasas } from "../../../../../../../service/repository/RTAmenass";
import { getSalvaguardas } from "../../../../../../../service/repository/RTSalvaguardas";
import { getTipoSalvag } from "../../../../../../../service/repository/RTTipoSalvag";
import { ForminputSelectItemDependenci } from "../../../../../../../service/morvius-service/form_input/complements/forminputSelectItemDependenci/ForminputSelectItem";
import { getControles } from "../../../../../../../service/repository/RTControles";
import { addSalvaguAmenaz } from "../../../../../../../service/repository/RTSalvagAmenaz";

export function ManualIdentifiAmenaz(props){

    const { onInsert=()=>{}, informacionActivAfec} = props;
    // lista de salvaguardas
    const [textSalvaguard, settextSalvaguard] = useState(0)
    const [listSalvaguar, setlistSalvaguar] = useState([]);
    const [listTipoSalvaguard, setlistTipoSalvaguard] = useState([]);
    // lista de salvaguardas
    const [textControles, settextControles] = useState(0)
    const [listtextControles, setlisttextControles] = useState([]);
    // extrategia de la salbaguarda
    const [textExtrategia, settextExtrategia] = useState('')
    const dispatch = useNotification();

    useEffect(()=>{
        (async()=>{
            // inicializar los tipos de Salvaguardas
            const Listresult = await getTipoSalvag();
            const lisMapResulTipSalva = Listresult.map((item)=>{
                return {
                    id: item.id_tipoSalva,
                    name: item.nombreTipoSalg
                }
            })
            lisMapResulTipSalva.unshift({
                id: 0,
                name: 'Todo'
            })
            setlistTipoSalvaguard(lisMapResulTipSalva)
            // inicializar las salvaguardas
            const Listresultesc = await getSalvaguardas();
            const lisMapResulEsc = Listresultesc.map((item)=>{
                return {
                    id: item.id_salvaguardas,
                    name: item.descripc,
                    descr: item.abreb,
                    keyfilter: item.id_tipoSalva
                }
            })
            setlistSalvaguar(lisMapResulEsc)
            // inicializar los controles
            const listresulControl = await getControles();
            console.log(listresulControl)
            setlisttextControles(listresulControl);
        })();
    },[]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(informacionActivAfec)

        let data = {
            "id_afectaActiv" : informacionActivAfec,
            "id_control": textControles,
            "id_salvaguarda" :  textSalvaguard,
            "extrategia": event.target.extrat.value
        };
        let resulEn = await addSalvaguAmenaz(data);
        handleNewNotification(dispatch,resulEn.messege, resulEn.status);
        setTimeout(() => {
            (async ()=>{await onInsert();})();
            // settextActivosProceso(-1);
            limparCasillas();
        }, 500);
    }

    const limparCasillas = () => {
        settextSalvaguard(-1);
        settextControles(-1);
        settextExtrategia('');
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
                            {(parseInt(listSalvaguar.length) !== 0)?
                            <ForminputSelectItemFilter onChangeinput={(item)=>{
                                    console.log(item)
                                    settextSalvaguard(item.id)
                                }} 
                                nameTitle = {'Selecciona la Salvaguarda'}
                                valueInit = {textSalvaguard}
                                isVisibleDescri={true} 
                                checkbox={textSalvaguard} 
                                setcheckbox={settextSalvaguard} 
                                listaObj={listSalvaguar} 
                                setlistaObj={setlistSalvaguar} 
                                listFilter={listTipoSalvaguard} 
                                setlistFilter={setlistTipoSalvaguard} >    
                            </ForminputSelectItemFilter>:<></>}
                        <div style={{height: '10px'}}></div>
                    </div>
                    {/* <ForminputSelectItemDependenci isVisibleDescri = {true} keydescr = {'dependAbreb'} keyname = {"keyseletcTipActiv"} keyid = {"id_tipoActivo"} keylabe = {'nombreTipoActivo'} keydepende = {'id_dependeTipoPad'} listaObj={listActivProc} setlistaObj = {setlistActivProc} onChangeinput={onSelectItem} /> */}
                    <div className="container_AreaInterProces_selectet_data">
                            {(parseInt(listtextControles.length) !== 0)?
                            <ForminputSelectItemDependenci 
                                isVisibleDescri = {true} 
                                nameTitle = {'Selecciona los Controles'}
                                keydescr = {'codeDepende'} 
                                keyname = {"keyseletcTipActiv"} 
                                keyid = {"id_control"} 
                                keylabe = {'DescripccionControl'} 
                                keydepende = {'id_depencontrol'} 
                                checkbox = {textControles}
                                setcheckbox = {settextControles}
                                listaObj={listtextControles} 
                                setlistaObj = {setlisttextControles} 
                                onChangeinput={(jsop) => {
                                    console.log(jsop)
                                    settextControles(jsop.id_control)
                                }} />:<></>}
                        <div style={{height: '10px'}}></div>
                    </div>
                    <ForminputArea textinput ={textExtrategia} settextinput = {settextExtrategia} placeHolder="Extrategia" keyname ={`extrat`}/>
                    <div style={{height: '10px'}}></div>
                </>
                <ForminputBottonSubmit label = {'Registrar'} />
                {/* <ForminputBotton label = {"Cancelar"} isInvertColor = {true} /> */}
            </form>
        </>
    );
}