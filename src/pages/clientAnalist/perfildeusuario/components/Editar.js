import { useState } from "react";
import { useNotification } from "../../../../service/Notifications/NotificationProvider";
import { handleNewNotification } from "../../../../service/Notifications/useNotificacion";
import { ForminputBotton, ForminputBottonSubmit, ForminputEdit, ForminputImageCircle, ForminputnumberEdit } from "../../../../service/morvius-service/form_input/form_input";
import { uploudImage } from "../../../../service/repository/uploudimage";
import { updateclientAnalist } from "../../../../service/repository/RTclientAnalist";

export function EditarUsuario(props){

    const [propinformationDataGeneral, propsetinformationDataGeneral] = useState({
        id_usuario: 2,
        usaio: "@pedrna155",
        pass: "perrito55",
        tip_user: "C",
        id_cliente: 2,
        nombre: "Pedro Rodrigues",
        apellidos: "Guevara Castillo",
        telefono: "985796307",
        correo: "pedrna155@gmail.com",
        photo: "https://nyrevconnect.com/wp-content/uploads/2017/06/Placeholder_staff_photo-e1505825573317.png"
    });
    const {onAction, informationDataGeneral = propinformationDataGeneral, setinformationDataGeneral = propsetinformationDataGeneral} = props;
    
    const [filephoto, setfilephoto] = useState(null);
    const dispatch = useNotification();

    const isurl = (url="") =>{
        let arraysplit = url.split("://");
        if (arraysplit.length === 1) return false;
        if (arraysplit[0] !== "https") return false;
        return true;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let urlimage = "https://thumbs.dreamstime.com/b/icono-gris-de-perfil-usuario-s%C3%ADmbolo-empleado-avatar-web-y-dise%C3%B1o-ilustraci%C3%B3n-signo-aislado-en-fondo-blanco-191067342.jpg";

        if(filephoto == null){
            urlimage = (isurl(informationDataGeneral.photo))? informationDataGeneral.photo : urlimage;
        }

        if(filephoto != null){
            urlimage = await uploudImage(filephoto);
            urlimage = urlimage.data;
            urlimage = urlimage[0].url;
        }

        console.log(urlimage)

        let data = {
            "nombre" : event.target[`nombr${informationDataGeneral.id_usuario}`].value,
            "apellidos": event.target[`apell${informationDataGeneral.id_usuario}`].value,
            "telf" :  event.target[`telf${informationDataGeneral.id_usuario}`].value,
            "photo": urlimage
        };
        let resul = await updateclientAnalist(informationDataGeneral.id_cliente, data);
        handleNewNotification(dispatch,resul.messege, resul.status);
        setTimeout(() => {
                (async ()=>{
                    console.log(resul);
                    await onAction();
                })();
        }, 500);
    }

    const oncallbackchange = (file) => {
        setfilephoto(file);
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
        <ForminputImageCircle oncallbackchange={oncallbackchange} urlphoto={informationDataGeneral.photo} keyname ={`photo${informationDataGeneral.id_usuario}`}/>
        <div style={{height:"20px"}}></div>
        <ForminputEdit valueInit={informationDataGeneral.nombre} placeHolder="Nombre" keyname ={`nombr${informationDataGeneral.id_usuario}`}/>
        <ForminputEdit valueInit={informationDataGeneral.apellidos} placeHolder="Apellido" keyname ={`apell${informationDataGeneral.id_usuario}`}/>
        <ForminputnumberEdit Limitchar={9} valueInit={informationDataGeneral.telefono} placeHolder="Telefono" keyname ={`telf${informationDataGeneral.id_usuario}`}/>
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