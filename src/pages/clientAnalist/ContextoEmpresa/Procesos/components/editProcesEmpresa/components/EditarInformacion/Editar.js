import { useEffect, useState } from "react";
// import { useNotification } from "../../../../service/Notifications/NotificationProvider";
// import { handleNewNotification } from "../../../../service/Notifications/useNotificacion";

// import { uploudImage } from "../../../../service/repository/uploudimage";
// import { updateclientAnalist } from "../../../../service/repository/clientAnalist";
import { ForminputAreatEdit, ForminputBottonSubmit, ForminputEdit, ForminputmailEdit } from "../../../../../../../../service/morvius-service/form_input/form_input";
import { handleNewNotification, useNotification } from "../../../../../../../../service/Notifications/useNotificacion";
import { updateEmpresa } from "../../../../../../../../service/repository/RTEmpresas";
import { updateTrabajEmpresa } from "../../../../../../../../service/repository/RTTrabajEmpresas";

export function EditarTrabjEmpresaInformation(props){

    const [propinformationDataGeneral, propsetinformationDataGeneral] = useState({
        "Id_trabajador": 2,
        "nombre_apellido": "Carlos Arturo Guerrero Castillo",
        "cargo": "Gerente General",
        "descripc": "Encargado de la parte tecnica de la empreasa",
        "telefono": "985796307",
        "correo": "arturo14212000@gmail.com",
        "codTrabajo": "cod-23674382647",
        "estade": 1,
        "id_empresa": 1
    });
    const {onAction, informationDataGeneral = propinformationDataGeneral, setinformationDataGeneral = propsetinformationDataGeneral} = props;
    
    // const [filephoto, setfilephoto] = useState(null);
    const dispatch = useNotification();

    // const isurl = (url="") =>{
    //     let arraysplit = url.split("://");
    //     if (arraysplit.length === 1) return false;
    //     if (arraysplit[0] !== "https") return false;
    //     return true;
    // }

    useEffect(()=>{
        (async () => {
            console.log(informationDataGeneral)
        })();
    },[]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // let urlimage = "https://thumbs.dreamstime.com/b/icono-gris-de-perfil-usuario-s%C3%ADmbolo-empleado-avatar-web-y-dise%C3%B1o-ilustraci%C3%B3n-signo-aislado-en-fondo-blanco-191067342.jpg";

        // if(filephoto == null){
        //     urlimage = (isurl(informationDataGeneral.photo))? informationDataGeneral.photo : urlimage;
        // }

        // if(filephoto != null){
        //     urlimage = await uploudImage(filephoto);
        //     urlimage = urlimage.data;
        //     urlimage = urlimage[0].url;
        // }

        // console.log(urlimage)

        let data = {
            "nombre": event.target[`nombrEmp${informationDataGeneral.Id_trabajador}`].value,
            "cargo" :  event.target[`carg${informationDataGeneral.Id_trabajador}`].value,
            "descripc": event.target[`descr${informationDataGeneral.Id_trabajador}`].value,
            "telefono" : event.target[`telf${informationDataGeneral.Id_trabajador}`].value,
            "correo" : event.target[`correo${informationDataGeneral.Id_trabajador}`].value,
            "codTrabajo": event.target[`codig${informationDataGeneral.Id_trabajador}`].value
            // "photo": urlimage
        };
        let resul = await updateTrabajEmpresa(informationDataGeneral.Id_trabajador, data);
        handleNewNotification(dispatch,resul.messege, resul.status);
        setTimeout(() => {
                (async ()=>{
                    await onAction();
                })();
        }, 500);
    }

    // const oncallbackchange = (file) => {
    //     setfilephoto(file);
    // }

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
        <ForminputEdit valueInit={informationDataGeneral.nombre_apellido} placeHolder="Nombre" keyname ={`nombrEmp${informationDataGeneral.Id_trabajador}`}/>
        <div style={{height:'5px'}} />
        <ForminputEdit valueInit={informationDataGeneral.cargo} placeHolder="Cargo" keyname ={`carg${informationDataGeneral.Id_trabajador}`}/>
        <div style={{height:'5px'}} />
        <ForminputAreatEdit valueInit={informationDataGeneral.descripc} placeHolder="Descripccion" keyname ={`descr${informationDataGeneral.Id_trabajador}`}/>
        <div style={{height:'5px'}} />
        <ForminputEdit valueInit={informationDataGeneral.telefono} placeHolder="Telefono" keyname ={`telf${informationDataGeneral.Id_trabajador}`}/>
        <div style={{height:'5px'}} />
        <ForminputmailEdit valueInit={informationDataGeneral.correo} placeHolder="Correo" keyname ={`correo${informationDataGeneral.Id_trabajador}`}/>
        <div style={{height:'5px'}} />
        <ForminputEdit valueInit={informationDataGeneral.codTrabajo} placeHolder="Codigo Empresa" keyname ={`codig${informationDataGeneral.Id_trabajador}`}/>
        <div style={{height: '20px'}}></div>
        <ForminputBottonSubmit label = {'Editar'} />
        {/* <ForminputBotton label = {"Cancelar"} isInvertColor = {true} /> */}
    </form>);
}