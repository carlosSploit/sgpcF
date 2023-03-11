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
import { getTipoActivos } from "../../../../../../../../service/repository/RTTiposActivos";
import { ForminputSelectItemDependenciEdit } from "../../../../../../../../service/morvius-service/form_input/complements/forminputSelectItemDependenci/ForminputSelectItem";
import { updateActivosEmpresa } from "../../../../../../../../service/repository/RTActivos";

export function EditarActivoEmpresa(props){

    const [propinformationDataGeneral, propsetinformationDataGeneral] = useState({
        "id_activo": 1,
        "nombre_Activo": "Sistema E-learning5",
        "descripc": "Sistema donde se realiza todos los procesos de enseñansa, control, monitoreo, registro de cursos.",
        "id_tipoActiv": 1,
        "dependAbreb": "essential"
      });
      const [propinfoEmpresa, propsetinfoEmpresa] = useState(0);
    const {onAction,infoEmpresa = propinfoEmpresa, setinfoEmpresa = propsetinfoEmpresa, informationDataGeneral = propinformationDataGeneral, setinformationDataGeneral = propsetinformationDataGeneral} = props;
    const [textTipoActiv, settextTipoActiv] = useState(0);
    const [listActivProc, setlistActivProc] = useState([]);
    // const [filephoto, setfilephoto] = useState(null);
    const dispatch = useNotification();

    useEffect(()=>{
        // console.log(informationDataGeneral)
        (async()=>{
            // inicializar el tipo de proceso
            let result = await getTipoActivos(0);
            console.log(result)
            setlistActivProc(result);
            settextTipoActiv(informationDataGeneral.id_tipoActiv);
        })();
    },[])

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = {
            "nombre_Activo" : event.target[`nombrEmp${informationDataGeneral.id_activo}`].value,
            "descripc": event.target[`descr${informationDataGeneral.id_activo}`].value,
            "id_tipoActiv": textTipoActiv
        };
        
        let resul = await updateActivosEmpresa(informationDataGeneral.id_activo, data);
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
        <ForminputEdit valueInit={informationDataGeneral.nombre_Activo} placeHolder="Nombre" keyname ={`nombrEmp${informationDataGeneral.id_activo}`}/>
        <div style={{height:'5px'}} />
        <ForminputAreatEdit valueInit={informationDataGeneral.descripc} placeHolder="Descripccion" keyname ={`descr${informationDataGeneral.id_activo}`}/>
        <div style={{height:'5px'}} />
        {((listActivProc.length != 0)?<ForminputSelectItemDependenciEdit
            keyid = {"id_tipoActivo"} 
            keylabe = {'nombreTipoActivo'} 
            keydepende = {'id_dependeTipoPad'} 
            datacombo={listActivProc}
            setpropdatacombo = {setlistActivProc}
            indexinput = {textTipoActiv}
            setindexinput = {settextTipoActiv}
            valueInit={informationDataGeneral.id_tipoActiv}  
            keyname={`props${informationDataGeneral.id_activo}`} 
            placeHolder = {'Tipo de Activo'}
            onChangeinput = {(jsonval)=>{ 
                console.log(jsonval)
                settextTipoActiv(jsonval.id_tipoActivo)
            }} />:<></>)}
        <div style={{height: '20px'}}></div>
        <ForminputBottonSubmit label = {'Editar'} />
        {/* <ForminputBotton label = {"Cancelar"} isInvertColor = {true} /> */}
    </form>);
}