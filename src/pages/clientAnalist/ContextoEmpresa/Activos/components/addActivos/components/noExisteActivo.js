import React, { useEffect, useState } from "react";
import './index.css';
import { useNotification } from "../../../../../../../service/Notifications/NotificationProvider";
// import { addEmpresa } from "../../../../../../../service/repository/RTEmpresas";
// import { ConsuldataLogm, getKeysesion } from "../../../../../../../service/repository/mithelworks";
import { handleNewNotification } from "../../../../../../../service/Notifications/useNotificacion";
import { Forminput, ForminputArea, ForminputBotton, ForminputBottonSubmit, ForminputComboBox, ForminputRadioSlice, ForminputSelectItem, Forminputmail } from "../../../../../../../service/morvius-service/form";
// import { addTrabajEmpresa } from "../../../../../../../service/repository/RTTrabajEmpresas";
// import { getTipoProces } from "../../../../../../../service/repository/RTTiposProces";
// import { getGerarcProces } from "../../../../../../../service/repository/RTGerarcProces";
// import { addPrcesEmpresa, getProcesEmpresa } from "../../../../../../../service/repository/RTProcesEmpresas";
import { ForminputSelectItemDependenci } from "../../../../../../../service/morvius-service/form_input/complements/forminputSelectItemDependenci/ForminputSelectItem";
import { getTipoActivos } from "../../../../../../../service/repository/RTTiposActivos";
import { addActivosEmpresa } from "../../../../../../../service/repository/RTActivos";

export function NoExisteActivpEmpresa(props){
    
    const { onInsert=()=>{}, informacionGeneral = 0} = props;

    // input de contenidos
    const [textname, settextname] = useState("");
    const [textdescrip, settextdescrip] = useState("");
    
    const [textTipoActiv, settextTipoActiv] = useState(0);
    const [listActivProc, setlistActivProc] = useState([]);
    // const [listGerarProc, setlistGerarProc] = useState([]);
    // const [listProcEmpre, setlistProcEmpre] = useState([]);
    const dispatch = useNotification();

    useEffect(()=>{
        (async()=>{
            // inicializar el tipo de proceso
            let result = await getTipoActivos(0);
            setlistActivProc(result);
            // if(result.length != 0){
            //     settextTipoProc(result[0].id_tipProce)
            //     settextTipoProcMemoryInit(result[0].id_tipProce)
            // }
            // inicializar la gerarquia de proceso
            // let resultger = await getGerarcProces();
            // setlistGerarProc(resultger);
            // if(resultger.length != 0){
            //     settexGerarProc(resultger[0].id_gerarProc)
            //     settextGerarProcMemoryInit(resultger[0].id_gerarProc)
            // }
            // inicializar los procesoso
            // let resultproc = await getProcesEmpresa(informacionGeneral);
            
            // console.log(resultproc)
            // if(resultproc.length != 0){
            //     let data = resultproc.map((item)=>{
            //         return {
            //             id: item.id_proceso,
            //             name: item.nombreProce
            //         }
            //     })
            //     setlistProcEmpre(data);
            //     // settexProcEmpre(resultproc[0].id_proceso)
            //     // settextProcEmpreMemoryInit(resultproc[0].id_proceso)
            // }
        })();
    },[])

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = {
            "nombre_Activo" : event.target.nombrEmp.value,
            "descripc": event.target.descr.value,
            "id_tipoActiv": textTipoActiv,
            "id_empresa" : informacionGeneral
        };
        console.log(data)
        let resul = await addActivosEmpresa(data);
        handleNewNotification(dispatch,resul.messege, resul.status);
        setTimeout(() => {
            (async ()=>{await onInsert();})();
            limpiartext();
            console.log(resul);
        }, 500);
    }

    const limpiartext = () =>{
        settextname("");
        settextdescrip("");
        settextTipoActiv(0);
    }

    const onSelectItem = (json) => {
        console.log(json)
        settextTipoActiv(json.id_tipoActivo);
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
                <>{/* apace cuando no se a seleccionado nada */}
                <div style={{height:'20px'}} />
                <Forminput textinput ={textname} settextinput = {settextname} placeHolder="Nombre" keyname ={`nombrEmp`}/>
                <div style={{height:'5px'}} />
                <ForminputArea textinput ={textdescrip} settextinput = {settextdescrip} placeHolder="Descripccion" keyname ={`descr`}/>
                <div style={{height:'5px'}} />
                {(listActivProc.length != 0)?<div className="container_inserproces_selectet_data">
                    <ForminputSelectItemDependenci isVisibleDescri = {true} keydescr = {'dependAbreb'} keyname = {"keyseletcTipActiv"} keyid = {"id_tipoActivo"} keylabe = {'nombreTipoActivo'} keydepende = {'id_dependeTipoPad'} listaObj={listActivProc} setlistaObj = {setlistActivProc} onChangeinput={onSelectItem} />
                </div>:<></>}
                <div style={{height: '20px'}}></div></>
                <ForminputBottonSubmit label = {'Registrar un Activo'} />
                <ForminputBotton label = {'Cancelar'} isInvertColor = {true} onChange={limpiartext}/>
                {/* <ForminputBotton label = {"Cancelar"} isInvertColor = {true} /> */}
            </form>
        </>
    );
}