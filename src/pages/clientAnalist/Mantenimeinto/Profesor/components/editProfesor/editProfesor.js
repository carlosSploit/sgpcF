import React, { useRef, useState } from "react";
import "./style/editProfesor.css";
import { ComponentModalPrincipal,ComponentModalPrincipalHeader,ComponentModalPrincipalBody } from "../../../../../../service/morvius-service/components";
import { Forminput,
    Forminputnumber, Forminputmail,
    Forminputpassword,
    ForminputImageCircle,ForminputBottonSubmit} from "../../../../../../service/morvius-service/form";
import { EditOutlined } from "@ant-design/icons";
import {updateprofe} from "../../../../../../service/repository/Profesor";
import {uploudImage} from "../../../../../../service/repository/uploudimage";
import { handleNewNotification, useNotification } from "../../../../../../service/Notifications/useNotificacion";

export function EditProfesor(props){
    let {
        onUpdate = () =>{},
        dataact={
        id_profesor: 0,
        photo:"https://thumbs.dreamstime.com/b/icono-gris-de-perfil-usuario-s%C3%ADmbolo-empleado-avatar-web-y-dise%C3%B1o-ilustraci%C3%B3n-signo-aislado-en-fondo-blanco-191067342.jpg",
        nombre:"",
        correo:"",
        telf:"",
        tipo_trabajador:"",
        pass:""
    }} = props;
    const [ismodalvisible, setismodalvisible] = useState(false);
    const [filephoto, setfilephoto] = useState(null);
    const refForm = useRef();
    const dispatch = useNotification();

    const isurl = (url="") =>{
        let arraysplit = url.split("://");
        if (arraysplit.length == 1) return false;
        if ((arraysplit[0] != "https") && arraysplit[0] != "http") return false;
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
            console.log(urlimage);
        }
        //event.preventDefault();
        /*
            {
                "name" : "Lucia graciela",
                "telf" : 985796307,
                "correo" : "arturo14212000@gmail.com",
                "pass" : "univerlucia",
                "estudios": "Univercidad Cesar vallerjo",
                "photo": "ajkdajldkajsdklasjdlaskjdk"
            }
        */
       let data = {
            "name" : event.target[`name${dataact.id_profesor}`].value,
            "telf" : event.target[`teld${dataact.id_profesor}`].value,
            "correo" : event.target[`cor${dataact.id_profesor}`].value,
            "pass" : event.target[`pass${dataact.id_profesor}`].value,
            "estudios": event.target[`estudios${dataact.id_profesor}`].value,
            "photo": urlimage
        };
       let resul = await updateprofe(dataact.id_profesor,data);
       handleNewNotification(dispatch,resul.messege, resul.status);
       setTimeout(() => {
            (async ()=>{await onUpdate();})();
            console.log(resul);
       }, 500);
    }

    const oncallbackchange = (file) => {
        setfilephoto(file);
    }

    return (
        <>
            <div onClick={()=>{
                console.log(dataact);
                setismodalvisible(true);
            }} className="container_Itemprofesor_conten_actions_item">
                <EditOutlined className="container_Itemprofesor_conten_actions_iconedit" />
            </div>
           <ComponentModalPrincipal  statemode={ismodalvisible} onClosechange={()=>{refForm.current.reset();setismodalvisible(false);}}>
               <ComponentModalPrincipalHeader title="Editar el profesor" onClosechange={()=>{refForm.current.reset();setismodalvisible(false);}} />
               <ComponentModalPrincipalBody>
               <form
                    style={{
                        margin: "0",
                        padding: "0",
                        width: "100%"
                    }}
                    layout="vertical"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    ref={refForm}
                >
                    <div style={{height:"20px"}}></div>
                    <div className="container_addprofesor_descripccion">
                        Trascribe la informacion y preciona en enviar para insertar:
                    </div>
                    <div style={{height:"20px"}}></div>
                    <ForminputImageCircle oncallbackchange={oncallbackchange} urlphoto={dataact.photo} keyname ={`photo${dataact.id_profesor}`}/>
                    <div style={{height:"20px"}}></div>
                    <Forminput valueInit={dataact.nombre} placeHolder="nombre" keyname ={`name${dataact.id_profesor}`}/>
                    <Forminputmail valueInit={dataact.correo} placeHolder="correo" keyname ={`cor${dataact.id_profesor}`}/>
                    <Forminputnumber valueInit={dataact.telf} Limitchar={9} placeHolder="telefono del tutor" keyname ={`teld${dataact.id_profesor}`}/>
                    <Forminput valueInit={dataact.estudios} placeHolder="estudios" keyname ={`estudios${dataact.id_profesor}`}/>
                    <Forminputpassword valueInit={dataact.pass} placeHolder="contraseña" keyname ={`pass${dataact.id_profesor}`}/>

                    {/* <ForminputDate keyname ={"keynamber2"}/>
                    <ForminputRadioSlice keyname ={"keynamber3"}/>
                    <ForminputComboBox keyname ={"keynamber4"}/>
                    <ForminputArea keyname ={"keynamber5"}/>
                    
                    
                    <Forminputpassword keyname ={"keynamber8"}/>
                    <ForminputImageCircle keyname ={"keynamber10"}/>
                    <ForminputImageRectangle keyname ={"keynamber11"}/>
                    <FormListchipts keyname ={"keynamber12"}/>
                    <ForminputDatetoDate keyname ={"keynamber13"}/> */}
                    <ForminputBottonSubmit/>
                </form>
               </ComponentModalPrincipalBody>
           </ComponentModalPrincipal>
        </>
    );
}