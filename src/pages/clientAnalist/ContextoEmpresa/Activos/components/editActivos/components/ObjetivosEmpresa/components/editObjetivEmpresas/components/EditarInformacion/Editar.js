import { useEffect, useState } from "react";
import { ForminputBottonSubmit } from "../../../../../../../../../../../../service/morvius-service/form";
import { ForminputAreatEdit, ForminputEdit } from "../../../../../../../../../../../../service/morvius-service/form_input/form_input";
import { handleNewNotification, useNotification } from "../../../../../../../../../../../../service/Notifications/useNotificacion";
import { updateEmpresa } from "../../../../../../../../../../../../service/repository/RTEmpresas";
import { updateAreasEmpresa } from "../../../../../../../../../../../../service/repository/RTAreasEmpresas";
import { updateObjetivEmpresa } from "../../../../../../../../../../../../service/repository/RTObjetivEmpresas";
// import { useNotification } from "../../../../service/Notifications/NotificationProvider";
// import { handleNewNotification } from "../../../../service/Notifications/useNotificacion";

// import { uploudImage } from "../../../../service/repository/uploudimage";
// import { updateclientAnalist } from "../../../../service/repository/clientAnalist";
// import { ForminputAreatEdit, ForminputBottonSubmit, ForminputEdit } from "../../../../../../../../service/morvius-service/form_input/form_input";
// import { handleNewNotification, useNotification } from "../../../../../../../../service/Notifications/useNotificacion";
// // import { updateEmpresa } from "../../../../../../../../service/repository/Empresas";

export function EditarObjetivEmpresaInformation(props){

    const [propinformationDataGeneral, propsetinformationDataGeneral] = useState({
        "id_objempresa": 1,
        "id_empresa": 1,
        "nombreobj": "Ser una de las empresas del mundo",
        "estade": 1
    });
    const {onAction, informationDataGeneral = propinformationDataGeneral, setinformationDataGeneral = propsetinformationDataGeneral} = props;
    
    // const [filephoto, setfilephoto] = useState(null);
    const dispatch = useNotification();

    useEffect(()=>{
        (async () => {
            console.log(informationDataGeneral)
        })();
    },[]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = {
            "nombreObje": event.target[`nombrEmp${informationDataGeneral.id_objempresa}`].value,
            // "descriparea": event.target[`descr${informationDataGeneral.id_areempre}`].value,
            // "photo": urlimage
        };
        let resul = await updateObjetivEmpresa(informationDataGeneral.id_objempresa, data);
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
        <ForminputEdit valueInit={informationDataGeneral.nombreobj} placeHolder="Nombre de la Objetivo de la Empresa" keyname ={`nombrEmp${informationDataGeneral.id_objempresa}`}/>
        {/* <ForminputAreatEdit valueInit={informationDataGeneral.descriparea} placeHolder="Descripccion" keyname ={`descr${informationDataGeneral.id_areempre}`}/> */}
        {/* <ForminputEdit valueInit={'Seciones 1'} placeHolder="sesion" keyname ={"sesion"}/> */}
        {/* {(itemselet == null)?
        
        <></>} */}
        {/* aparece cuando se a seleccionado un iten */}
        {/* {(itemselet != null)?
        <Forminput valueInit={itemselet.name} placeHolder="Tipo de Curso" keyname ={"tipcurso"}/>:
        <></>} */}
        <div style={{height: '20px'}}></div>
        <ForminputBottonSubmit label = {'Editar'} />
        {/* <ForminputBotton label = {"Cancelar"} isInvertColor = {true} /> */}
    </form>);
}