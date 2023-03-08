import React, { useState } from "react";
import "./style/addAlumnos.css";
import { ComponentBotton,ComponentModalPrincipal,ComponentModalPrincipalHeader,ComponentModalPrincipalBody } from "../../../../../../service/morvius-service/components";
import { Forminput,
    Forminputnumber, Forminputmail,
    Forminputpassword,
    ForminputImageCircle,ForminputBottonSubmit} from "../../../../../../service/morvius-service/form";
import { EditOutlined } from "@ant-design/icons";
import {updateadmin} from "../../../../../../service/repository/Admin";
import {uploudImage} from "../../../../../../service/repository/uploudimage";

export function EditAdmin(props){
    let {
        onUpdate = () =>{},
        dataact={
        id_admin: 0,
        photo:"https://thumbs.dreamstime.com/b/icono-gris-de-perfil-usuario-s%C3%ADmbolo-empleado-avatar-web-y-dise%C3%B1o-ilustraci%C3%B3n-signo-aislado-en-fondo-blanco-191067342.jpg",
        nombre:"",
        correo:"",
        telf:"",
        tipo_trabajador:"",
        pass:""
    }} = props;
    const [ismodalvisible, setismodalvisible] = useState(false);
    const [filephoto, setfilephoto] = useState(null);

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
            console.log("no se a subido ningun archivo");
            urlimage = (isurl(dataact.photo))? dataact.photo : urlimage;
            console.log(isurl(dataact.photo));
        }
        
        if(filephoto != null){
            urlimage = await uploudImage(filephoto);
            urlimage = urlimage.data;
            urlimage = urlimage[0].url;
        }
        //event.preventDefault();
        /*
            {
                "name" : "Andrea graciela",
                "telf" : 985796307,
                "correo" : "arturo14212000@gmail.com",
                "pass" : "Ca14654578",
                "tipoadm": "Trabajador",
                "photo": "ajkdajldkajsdklasjdlaskjdk"
            }
        */
       let data = {
            "name" : event.target[`name${dataact.id_admin}`].value,
            "telf" : event.target[`teld${dataact.id_admin}`].value,
            "correo" : event.target[`cor${dataact.id_admin}`].value,
            "pass" : event.target[`pass${dataact.id_admin}`].value,
            "tipoadm": event.target[`tipad${dataact.id_admin}`].value,
            "photo": urlimage
        };
       let resul = await updateadmin(dataact.id_admin,data);
       await onUpdate();
       console.log(resul);
    }

    const oncallbackchange = (file) => {
        setfilephoto(file);
    }

    return (
        <>
            <div onClick={()=>{
                setismodalvisible(true);
            }} className="container_ItemAdmin_conten_actions_item">
                <EditOutlined className="container_ItemAdmin_conten_actions_icon" />
            </div>
           <ComponentModalPrincipal  statemode={ismodalvisible} onClosechange={()=>{setismodalvisible(false)}}>
               <ComponentModalPrincipalHeader title="Editar el Administrador" onClosechange={()=>{setismodalvisible(false)}} />
               <ComponentModalPrincipalBody>
               <form
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
                    <div style={{height:"20px"}}></div>
                    <div className="container_addadmin_descripccion">
                        Trascribe la informacion y preciona en enviar para insertar:
                    </div>
                    <div style={{height:"20px"}}></div>
                    <ForminputImageCircle oncallbackchange={oncallbackchange} urlphoto={dataact.photo} keyname ={`photo${dataact.id_admin}`}/>
                    <div style={{height:"20px"}}></div>
                    <Forminput valueInit={dataact.nombre} placeHolder="nombre" keyname ={`name${dataact.id_admin}`}/>
                    <Forminputmail valueInit={dataact.correo} placeHolder="correo" keyname ={`cor${dataact.id_admin}`}/>
                    <Forminputnumber valueInit={dataact.telf} Limitchar={9} placeHolder="telf" keyname ={`teld${dataact.id_admin}`}/>
                    <Forminput valueInit={dataact.tipo_trabajador} placeHolder="Tipo de administrador" keyname ={`tipad${dataact.id_admin}`}/>
                    <Forminputpassword valueInit={dataact.pass} placeHolder="contraseña" keyname ={`pass${dataact.id_admin}`}/>

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