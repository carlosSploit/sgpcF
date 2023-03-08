import React, { useState } from "react";
import "./style/addAlumnos.css";
import {uploudImage} from "../../../../../../service/repository/uploudimage";
import {addadmin} from "../../../../../../service/repository/Admin";
import { ComponentBotton,ComponentModalPrincipal,ComponentModalPrincipalHeader,ComponentModalPrincipalBody } from "../../../../../../service/morvius-service/components";
import { Forminput,
    Forminputnumber,
    Forminputmail,
    Forminputpassword,
    ForminputImageCircle,
    ForminputBottonSubmit} from "../../../../../../service/morvius-service/form";

export function AddAdmin(props){
    const { onInsert=()=>{} } = props;
    const [ismodalvisible, setismodalvisible] = useState(false);
    const [filephoto, setfilephoto] = useState(null);
    // input de contenidos
    const [textname, settextname] = useState("");
    const [textcorreo, settextcorreo] = useState("");
    const [texttelf, settexttelf] = useState("");
    const [texttipoad, settexttipoad] = useState("");
    const [textpass, settextpass] = useState("");
    // validadores
    let validator = [false,false,false,false,false];

    const onError = (index) => {
        validator[index] = true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let urlimage = "https://thumbs.dreamstime.com/b/icono-gris-de-perfil-usuario-s%C3%ADmbolo-empleado-avatar-web-y-dise%C3%B1o-ilustraci%C3%B3n-signo-aislado-en-fondo-blanco-191067342.jpg";
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
            "name" : event.target.name.value,
            "telf" : event.target.teld.value,
            "correo" : event.target.cor.value,
            "pass" : event.target.pass.value,
            "tipoadm": event.target.tipad.value,
            "photo": urlimage
        };
       let resul = await addadmin(data);
       await onInsert();
       limpiartext();
       console.log(resul);
    }

    const limpiartext = () =>{
        settextname("");
        settextcorreo("");
        settexttelf("");
        settexttipoad("");
        settextpass("");
    }

    const oncallbackchange = (file) => {
        setfilephoto(file);
    }

    return (
        <>
           <div className="container_addadmin">
                <ComponentBotton onChange={()=>{setismodalvisible(true);}} />
           </div>
           <ComponentModalPrincipal statemode={ismodalvisible} onClosechange={()=>{setismodalvisible(false)}}>
               <ComponentModalPrincipalHeader title="Insertar el Administrador" onClosechange={()=>{setismodalvisible(false)}} />
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
                    <ForminputImageCircle oncallbackchange={oncallbackchange} keyname ={"photo"}/>
                    <div style={{height:"20px"}}></div>
                    <Forminput textinput={textname} settextinput={settextname} placeHolder="nombre" keyname ={"name"}/>
                    <Forminputmail textinput={textcorreo} settextinput={settextcorreo}  placeHolder="correo" keyname ={"cor"}/>
                    <Forminputnumber textinput={texttelf} settextinput={settexttelf} placeHolder="telf" keyname ={"teld"} Limitchar={9}/>
                    <Forminput textinput={texttipoad} settextinput={settexttipoad} placeHolder="Tipo de administrador" keyname ={"tipad"}/>
                    <Forminputpassword textinput={textpass} settextinput={settextpass} keyname ={"pass"}/>
                    <ForminputBottonSubmit/>
                </form>
               </ComponentModalPrincipalBody>
           </ComponentModalPrincipal>
        </>
    );
}