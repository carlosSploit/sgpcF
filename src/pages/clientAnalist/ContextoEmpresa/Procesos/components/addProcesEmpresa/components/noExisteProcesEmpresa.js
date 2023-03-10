import React, { useEffect, useState } from "react";
import './index.css';
import { useNotification } from "../../../../../../../service/Notifications/NotificationProvider";
// import { addEmpresa } from "../../../../../../../service/repository/RTEmpresas";
// import { ConsuldataLogm, getKeysesion } from "../../../../../../../service/repository/mithelworks";
import { handleNewNotification } from "../../../../../../../service/Notifications/useNotificacion";
import { Forminput, ForminputArea, ForminputBotton, ForminputBottonSubmit, ForminputComboBox, ForminputRadioSlice, ForminputSelectItem, Forminputmail } from "../../../../../../../service/morvius-service/form";
import { addTrabajEmpresa } from "../../../../../../../service/repository/RTTrabajEmpresas";
import { getTipoProces } from "../../../../../../../service/repository/RTTiposProces";
import { getGerarcProces } from "../../../../../../../service/repository/RTGerarcProces";
import { addPrcesEmpresa, getProcesEmpresa } from "../../../../../../../service/repository/RTProcesEmpresas";

export function NoExisteEmpresa(props){
    
    const { onInsert=()=>{}, informacionGeneral = 0} = props;

    // input de contenidos
    const [textname, settextname] = useState("");
    const [textdescrip, settextdescrip] = useState("");
    const [textTipoProc, settextTipoProc] = useState(0);
    const [textTipoProcMemoryInit, settextTipoProcMemoryInit] = useState(0);
    const [textGerarProc, settexGerarProc] = useState(0);
    const [textGerarProcMemoryInit, settextGerarProcMemoryInit] = useState(0);
    const [isdependepader, setisdependepader] = useState(false);
    const [textProcEmpre, settexProcEmpre] = useState(0);
    const [textProcEmpreMemoryInit, settextProcEmpreMemoryInit] = useState(0);

    const [textCorreo, settextCorreo] = useState("");
    const [textCodigo, settextCodigo] = useState("");
    // const [textvision, settextvision] = useState("");

    const [listTipoProc, setlistTipoProc] = useState([]);
    const [listGerarProc, setlistGerarProc] = useState([]);
    const [listProcEmpre, setlistProcEmpre] = useState([]);
    const dispatch = useNotification();

    useEffect(()=>{
        (async()=>{
            // inicializar el tipo de proceso
            let result = await getTipoProces();
            setlistTipoProc(result);
            if(result.length != 0){
                settextTipoProc(result[0].id_tipProce)
                settextTipoProcMemoryInit(result[0].id_tipProce)
            }
            // inicializar la gerarquia de proceso
            let resultger = await getGerarcProces();
            setlistGerarProc(resultger);
            if(resultger.length != 0){
                settexGerarProc(resultger[0].id_gerarProc)
                settextGerarProcMemoryInit(resultger[0].id_gerarProc)
            }
            // inicializar los procesoso
            let resultproc = await getProcesEmpresa(informacionGeneral);
            
            console.log(resultproc)
            if(resultproc.length != 0){
                let data = resultproc.map((item)=>{
                    return {
                        id: item.id_proceso,
                        name: item.nombreProce
                    }
                })
                setlistProcEmpre(data);
                // settexProcEmpre(resultproc[0].id_proceso)
                // settextProcEmpreMemoryInit(resultproc[0].id_proceso)
            }
        })();
    },[])

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = {
            "nombreProce" : event.target.nombrEmp.value,
            "descripccion": event.target.descr.value,
            "id_gerarProc": textGerarProc,
            "id_tipProce": textTipoProc,
            "isDepProcPadre": (isdependepader)?1:0,
            "id_DepentProc": textProcEmpre,
            "id_empresa" : informacionGeneral
        };
        console.log(data)
        let resul = await addPrcesEmpresa(data);
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
        settextTipoProc(textTipoProcMemoryInit);
        settexGerarProc(textGerarProcMemoryInit);
        setisdependepader(false);
        settexProcEmpre(textProcEmpreMemoryInit);
    }

    const onSelectItem = (json) => {
        settexProcEmpre(json.id);
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
                <ForminputComboBox valueInit={textTipoProc} keyname={'tiproc'} isInvert={true} width={100} height={28} keyvalue={'id_tipProce'} keylabel={'nombre'} datacombo={listTipoProc} isdefault={true} onChangeinput={(jsonval)=>{
                    settextTipoProc(jsonval.value)
                }} />
                <div style={{height:'5px'}} />
                <ForminputComboBox valueInit={textGerarProc} keyname={'gerproc'} isInvert={true} width={100} height={28} keyvalue={'id_gerarProc'} keylabel={'nombre'} datacombo={listGerarProc} isdefault={true} onChangeinput={(jsonval)=>{
                    settexGerarProc(jsonval.value)
                }} />
                <div style={{height:'5px'}} />
                <ForminputRadioSlice checkradio = {isdependepader} setcheckradio = {setisdependepader} label={'El proceso tiene un proceso padre'} onChangeinput={(stade)=>{
                    console.log(stade)
                    setisdependepader(stade)
                }} ></ForminputRadioSlice>
                {/* <Forminput textinput ={texttelefono} settextinput = {settexttelefono} placeHolder="Telefono" keyname ={`telf`}/> */}
                <div style={{height:'5px'}} />
                {(!isdependepader)?<></>: (listProcEmpre.length != 0)? 
                    <div className="container_inserproces_selectet_data">
                        <ForminputSelectItem  listaObj={listProcEmpre} setlistaObj = {setlistProcEmpre} keyname={"selestProcesoDep"} checkbox={textProcEmpre} setcheckbox={settexProcEmpre} onChangeinput={onSelectItem} />
                    </div>
                :<></>}
                <div style={{height: '20px'}}></div></>
                <ForminputBottonSubmit label = {'Registrar a la Empresa'} />
                <ForminputBotton label = {'Cancelar'} isInvertColor = {true} onChange={limpiartext}/>
                {/* <ForminputBotton label = {"Cancelar"} isInvertColor = {true} /> */}
            </form>
        </>
    );
}