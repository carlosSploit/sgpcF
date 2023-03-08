import React, { useState } from "react";
import { ComponentModalPrincipalBody } from "../../../../../service/morvius-service/components";
import { Forminput, ForminputBottonSubmit, ForminputImageCircle, Forminputmail, Forminputnumber, Forminputpassword } from "../../../../../service/morvius-service/form";
import { ForminputSelectItem } from "../../../../../service/morvius-service/form";
import { handleNewNotification, useNotification } from "../../../../../service/Notifications/useNotificacion";
import { updateprofe } from "../../../../../service/repository/Profesor";
import { uploudImage } from "../../../../../service/repository/uploudimage";

export function ViewEditProf(props){

    let {
        // onClosechange = () => {},
        // isstade = false,
        onUpdate = () => {},
        dataact = {
            id_profesor: 0,
            photo:"https://thumbs.dreamstime.com/b/icono-gris-de-perfil-usuario-s%C3%ADmbolo-empleado-avatar-web-y-dise%C3%B1o-ilustraci%C3%B3n-signo-aislado-en-fondo-blanco-191067342.jpg",
            nombre:"",
            correo:"",
            telf:"",
            tipo_trabajador:"",
            pass:""
        }
    } = props;
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
            urlimage = (isurl(dataact.photo))? dataact.photo : urlimage;
        }

        if(filephoto != null){
            urlimage = await uploudImage(filephoto);
            urlimage = urlimage.data;
            urlimage = urlimage[0].url;
        }

       let data = {
            "name" : event.target[`namep${dataact.id_profesor}`].value,
            "telf" : event.target[`teldp${dataact.id_profesor}`].value,
            "correo" : event.target[`corp${dataact.id_profesor}`].value,
            "pass" : event.target[`passp${dataact.id_profesor}`].value,
            "estudios": event.target[`estudiosp${dataact.id_profesor}`].value,
            "photo": urlimage
        };
        let resul = await updateprofe(dataact.id_profesor,data);
        handleNewNotification(dispatch,resul.messege, resul.status);
        setTimeout(() => {
                (async()=>{
                    await onUpdate();
                    console.log(resul);
                })();
        }, 500);
    }

    const oncallbackchange = (file) => {
        setfilephoto(file);
    }

    return (
        <ComponentModalPrincipalBody>
            <form
                style={{
                    margin: "0",
                    padding: "0",
                    width: "100%"
                }}
                layout="vertical"
                onSubmit={handleSubmit}
            >
                <div style={{height:"20px"}}></div>
                <div className="container_addprofesor_descripccion">
                    Trascribe la informacion y preciona en enviar para insertar:
                </div>
                <div style={{height:"20px"}}></div>
                <ForminputImageCircle oncallbackchange={oncallbackchange} urlphoto={dataact.photo} keyname ={`photo${dataact.id_profesor}`}/>
                <div style={{height:"20px"}}></div>
                <Forminput valueInit={dataact.nombre} placeHolder="nombre" keyname ={`namep${dataact.id_profesor}`}/>
                {/* <ForminputSelectItem /> */}
                <Forminputmail valueInit={dataact.correo} placeHolder="correo" keyname ={`corp${dataact.id_profesor}`}/>
                <Forminputnumber valueInit={dataact.telf} Limitchar={9} placeHolder="telefono del tutor" keyname ={`teldp${dataact.id_profesor}`}/>
                <Forminput valueInit={dataact.estudios} placeHolder="estudios" keyname ={`estudiosp${dataact.id_profesor}`}/>
                <Forminputpassword valueInit={dataact.pass} placeHolder="contraseña" keyname ={`passp${dataact.id_profesor}`}/>
                <ForminputBottonSubmit/>
            </form>
        </ComponentModalPrincipalBody>
    );
}