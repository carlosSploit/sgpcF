import { useEffect, useState } from "react";
// import { useNotification } from "../../../../service/Notifications/NotificationProvider";
// import { handleNewNotification } from "../../../../service/Notifications/useNotificacion";

// import { uploudImage } from "../../../../service/repository/uploudimage";
// import { updateclientAnalist } from "../../../../service/repository/clientAnalist";
import { ForminputAreatEdit, ForminputBottonSubmit, ForminputComboBoxEdit, ForminputEdit, ForminputRadioSlice, ForminputSelectIcon, ForminputmailEdit } from "../../../../../../../../service/morvius-service/form_input/form_input";
import { handleNewNotification, useNotification } from "../../../../../../../../service/Notifications/useNotificacion";
// import { updateEmpresa } from "../../../../../../../../service/repository/RTEmpresas";
// import { updateTrabajEmpresa } from "../../../../../../../../service/repository/RTTrabajEmpresas";
import { getGerarcProces } from "../../../../../../../../service/repository/RTGerarcProces";
import { getTipoProces } from "../../../../../../../../service/repository/RTTiposProces";
import { getProcesEmpresa, updateProcesEmpresa } from "../../../../../../../../service/repository/RTProcesEmpresas";
import { ForminputSelectItemEdit } from "../../../../../../../../service/morvius-service/form_input/complements/forminputSelectItem/ForminputSelectItem";

export function EditarProcesEmpresaInformation(props){

    const [propinformationDataGeneral, propsetinformationDataGeneral] = useState({
        "id_proceso": -1,
        "nombreProce": "Proceso de dictado de cursos.",
        "descripccion": "Proceso donde un procesor dicta el cursos en un sistema E-learning a un alumnos.",
        "id_gerarProc": -1,
        "nombre": "SubProceso",
        "id_tipProce": -1,
        "nombreTip": "Procesos de apoyo",
        "isDepProcPadre": 1,
        "id_DepentProc": -1
      });
      const [propinfoEmpresa, propsetinfoEmpresa] = useState(0);
    const {onAction,infoEmpresa = propinfoEmpresa, setinfoEmpresa = propsetinfoEmpresa, informationDataGeneral = propinformationDataGeneral, setinformationDataGeneral = propsetinformationDataGeneral} = props;
    const [isdependepader, setisdependepader] = useState(false);
    const [textGerarProc, settexGerarProc] = useState(0);
    const [listGerarProc, setlistGerarProc] = useState([]);
    const [textTipoProc, settextTipoProc] = useState(0);
    const [listTipoProc, setlistTipoProc] = useState([]);
    const [textProcEmpre, settexProcEmpre] = useState(0);
    const [listProcEmpre, setlistProcEmpre] = useState([]);
    // const [filephoto, setfilephoto] = useState(null);
    const dispatch = useNotification();

    useEffect(()=>{
        // console.log(informationDataGeneral)
        (async()=>{
            // inicializar el tipo de proceso
            // console.log(informationDataGeneral);
            // console.log(infoEmpresa);
            let result = await getTipoProces();
            setlistTipoProc(result);
            settextTipoProc(informationDataGeneral.id_tipProce)
            // inicializar la gerarquia de proceso
            let resultger = await getGerarcProces();
            setlistGerarProc(resultger);
            settexGerarProc(informationDataGeneral.id_gerarProc)
            // inicializar la dependencia
            setisdependepader((informationDataGeneral.isDepProcPadre == 1))
            // inicializar los procesoso
            let resultproc = await getProcesEmpresa(infoEmpresa);
            if(resultproc.length != 0){
                let data = resultproc.map((item)=>{
                    return {
                        id: item.id_proceso,
                        name: item.nombreProce
                    }
                })
                setlistProcEmpre(data);
                settexProcEmpre(informationDataGeneral.id_DepentProc);
            }
        })();
    },[])

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = {
            "nombreProce" : event.target[`nombrEmp${informationDataGeneral.id_proceso}`].value,
            "descripccion": event.target[`descr${informationDataGeneral.id_proceso}`].value,
            "id_gerarProc": textGerarProc,
            "id_tipProce": textTipoProc,
            "isDepProcPadre": (isdependepader)? 1 : 0,
            "id_DepentProc": (isdependepader)? textProcEmpre : 0
        };

        let resul = await updateProcesEmpresa(informationDataGeneral.id_proceso, data);
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
        
        {/* apace cuando no se a seleccionado nada */}
        {/* <ForminputImageCircle oncallbackchange={oncallbackchange} urlphoto={informationDataGeneral.photo} keyname ={`photo${informationDataGeneral.id_usuario}`}/> */}
        {/* <div style={{height:"20px"}}></div> */}
        <div style={{height:'5px'}} />
        <ForminputEdit valueInit={informationDataGeneral.nombreProce} placeHolder="Nombre" keyname ={`nombrEmp${informationDataGeneral.id_proceso}`}/>
        <div style={{height:'5px'}} />
        <ForminputAreatEdit valueInit={informationDataGeneral.descripccion} placeHolder="Descripccion" keyname ={`descr${informationDataGeneral.id_proceso}`}/>
        <div style={{height:'5px'}} />
        {/* Gerarquia de procesos */}
        {(listGerarProc.length != 0)?<ForminputComboBoxEdit 
            setpropdatacombo = {setlistGerarProc}
            indexinput = {textGerarProc}
            setindexinput = {settexGerarProc}
            valueInit={informationDataGeneral.id_gerarProc}  
            keyname={`gerproc${informationDataGeneral.id_proceso}`} 
            isInvert={true} 
            width={100} 
            height={28} 
            keyvalue={'id_gerarProc'} 
            keylabel={'nombre'} 
            datacombo={listGerarProc} 
            placeHolder = {'Gerarquia del proceso'}
            // onChangeinput = {(jsonval)=>{ settexGerarProc(jsonval.value)}} 
            />:<></>}
        <div style={{height:'5px'}} />
        {/* Tipos de procesos */}
        {(listTipoProc.length != 0)?<ForminputComboBoxEdit 
            setpropdatacombo = {setlistTipoProc}
            indexinput = {textTipoProc}
            setindexinput = {settextTipoProc}
            valueInit={informationDataGeneral.id_tipProce}  
            keyname={`tipros${informationDataGeneral.id_proceso}`} 
            isInvert={true} 
            width={100} 
            height={28} 
            keyvalue={'id_tipProce'} 
            keylabel={'nombre'} 
            datacombo={listTipoProc} 
            placeHolder = {'Tipos de procesos'}
            // onChangeinput = {(jsonval)=>{ settextTipoProc(jsonval.value)}} 
            />:<></>}
        {/* si depende de un proceso */}
        <div style={{height:'8px'}} />
        <div style={{marginLeft: '4%'}}>
            <ForminputRadioSlice checkradio = {isdependepader} setcheckradio = {setisdependepader} label={'El proceso tiene un proceso padre'} onChangeinput={(stade)=>{
                console.log(stade)
                setisdependepader(stade)
            }} ></ForminputRadioSlice>
        </div>
        <div style={{height:'5px'}} />
        {/*  */}
        {(isdependepader)?((listProcEmpre.length != 0)?<ForminputSelectItemEdit 
            datacombo={listProcEmpre}
            setpropdatacombo = {setlistProcEmpre}
            indexinput = {textProcEmpre}
            setindexinput = {settexProcEmpre}
            valueInit={informationDataGeneral.id_DepentProc}  
            keyname={`props${informationDataGeneral.id_proceso}`} 
            placeHolder = {'Tipos de procesos'}
            onChangeinput = {(jsonval)=>{ settexProcEmpre(jsonval.value)}} />:<></>):<></>}
        <div style={{height: '20px'}}></div>
        <ForminputBottonSubmit label = {'Editar'} />
        {/* <ForminputBotton label = {"Cancelar"} isInvertColor = {true} /> */}
    </form>);
}