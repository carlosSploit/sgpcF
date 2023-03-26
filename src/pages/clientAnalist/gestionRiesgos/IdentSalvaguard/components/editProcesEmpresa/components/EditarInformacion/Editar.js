import { useEffect, useState } from "react";
// import { useNotification } from "../../../../service/Notifications/NotificationProvider";
// import { handleNewNotification } from "../../../../service/Notifications/useNotificacion";

// import { uploudImage } from "../../../../service/repository/uploudimage";
// import { updateclientAnalist } from "../../../../service/repository/clientAnalist";
import { ForminputAreatEdit, ForminputBottonSubmit } from "../../../../../../../../service/morvius-service/form_input/form_input";
import { handleNewNotification, useNotification } from "../../../../../../../../service/Notifications/useNotificacion";
// import { updateEmpresa } from "../../../../../../../../service/repository/RTEmpresas";
// import { updateTrabajEmpresa } from "../../../../../../../../service/repository/RTTrabajEmpresas";
// import { getGerarcProces } from "../../../../../../../../service/repository/RTGerarcProces";
// import { getTipoProces } from "../../../../../../../../service/repository/RTTiposProces";
// import { updateProcesEmpresa } from "../../../../../../../../service/repository/RTProcesEmpresas";
import { getControles } from "../../../../../../../../service/repository/RTControles";
import { ForminputSelectItemDependenciEdit } from "../../../../../../../../service/morvius-service/form_input/complements/forminputSelectItemDependenci/ForminputSelectItem";
import { updateSalvaguAmenaz } from "../../../../../../../../service/repository/RTSalvagAmenaz";
// import { ForminputSelectItemEdit } from "../../../../../../../../service/morvius-service/form_input/complements/forminputSelectItem/ForminputSelectItem";

export function EditarInformacionSalvaguard(props){

    const [propinformationDataGeneral, propsetinformationDataGeneral] = useState({
        "id_salvAfectAct":3,
        "id_afectaActiv":1,
        "id_salvaguarda":1,
        "abrebsalv":"H",
        "descripc":"Protecciones Generales ",
        "id_control":1,
        "codeDepende":"5",
        "DescripccionControl":"POLÍTICAS DE SEGURIDAD.",
        "extrategia":"Ser una empresa que brinda entretenimiento y aprendisaje a niños, basados en tecnicas de gamificacio"
    });
    const [propinfoEmpresa, propsetinfoEmpresa] = useState(0);
    const {onAction, informationDataGeneral = propinformationDataGeneral, setinformationDataGeneral = propsetinformationDataGeneral} = props;

    const [textControles, settextControles] = useState(0);
    const [listtextControles, setlisttextControles] = useState([]);
    const dispatch = useNotification();

    useEffect(()=>{
        // console.log(informationDataGeneral)
        (async()=>{
            // inicializar los controles
            const listresulControl = await getControles();
            // console.log(listresulControl)
            setlisttextControles(listresulControl);
        })();
    },[])

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = {
            "id_control" : textControles,
            "extrategia": event.target[`estra${informationDataGeneral.id_salvAfectAct}`].value
        };

        let resul = await updateSalvaguAmenaz(informationDataGeneral.id_salvAfectAct, data);
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
        {((parseInt(listtextControles.length) !== 0)?
        <ForminputSelectItemDependenciEdit
            keyid = {"id_control"} 
            keylabe = {'DescripccionControl'} 
            keydepende = {'id_depencontrol'} 
            keydescr = {'codeDepende'}
            isVisibleDescri = {true}
            datacombo={listtextControles}
            setpropdatacombo = {setlisttextControles}
            indexinput = {textControles}
            setindexinput = {settextControles}
            valueInit={informationDataGeneral.id_control}  
            keyname={`cont${informationDataGeneral.id_salvAfectAct}`} 
            placeHolder = {'Controles'}
            onChangeinput = {(jsonval)=>{ 
                settextControles(jsonval.id_tipoActivo)
            }} />:<></>)}
        <div style={{height:'5px'}} />
        <ForminputAreatEdit valueInit={informationDataGeneral.extrategia} placeHolder="Estrategia" keyname ={`estra${informationDataGeneral.id_salvAfectAct}`}/>
        <div style={{height:'5px'}} />
        <ForminputBottonSubmit label = {'Editar'} />
        {/* <ForminputBotton label = {"Cancelar"} isInvertColor = {true} /> */}
    </form>);
}