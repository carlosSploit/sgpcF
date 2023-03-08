import React, { useState } from "react";
import "./style/addProfesor.css";
import {uploudImage} from "../../../../../../service/repository/uploudimage";
import { addprofesor } from "../../../../../../service/repository/Profesor";
import { ComponentModalPrincipal,ComponentModalPrincipalHeader,ComponentModalPrincipalBody } from "../../../../../../service/morvius-service/components";
import { Forminput,
    Forminputnumber,
    // ForminputRadioSlice,
    Forminputmail,
    Forminputpassword,
    ForminputImageCircle,
    ForminputBottonSubmit} from "../../../../../../service/morvius-service/form";
import { handleNewNotification, useNotification } from "../../../../../../service/Notifications/useNotificacion";

export function AddProfesor(props){
    const [ismodalvisible, setismodalvisible] = useState(false);
    const { onInsert=()=>{},propismodalvisible = ismodalvisible, propsetismodalvisible = setismodalvisible  } = props;
    const [filephoto, setfilephoto] = useState(null);
    // input de contenidos
    const [textname, settextname] = useState("");
    const [textcorreo, settextcorreo] = useState("");
    const [texttelf, settexttelf] = useState("");
    const [textestudios, settextestudios] = useState("");
    const [textpass, settextpass] = useState("");
    const dispatch = useNotification();

    // let validator = [false,false,false,false,false];

    // const onError = (index) => {
    //     validator[index] = true;
    // };

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
                "name" : "Lucia graciela",
                "telf" : 985796307,
                "correo" : "arturo14212000@gmail.com",
                "pass" : "univerlucia",
                "estudios": "Univercidad Cesar vallerjo",
                "photo": "ajkdajldkajsdklasjdlaskjdk"
            }
        */
       let data = {
            "name" : event.target.name.value,
            "telf" : event.target.teld.value,
            "correo" : event.target.cor.value,
            "pass" : event.target.pass.value,
            "estudios": event.target.estudios.value,
            "photo": urlimage
        };
       let resul = await addprofesor(data);
       await onInsert();
       handleNewNotification(dispatch,resul.messege, resul.status);
       setTimeout(() => {
            (async ()=>{await onInsert();})();
            limpiarinput();
            console.log(resul);
       }, 500);
    }

    const limpiarinput = () => {
        settextname("");
        settextcorreo("");
        settexttelf("");
        settextestudios("");
        settextpass("");
    }

    const oncallbackchange = (file) => {
        setfilephoto(file);
    }

    return (
        <>
           {/* <div className="container_addprofesor">
                <ComponentBotton onChange={()=>{propsetismodalvisible(true);}} />
           </div> */}
           <ComponentModalPrincipal statemode={propismodalvisible} onClosechange={()=>{propsetismodalvisible(false)}}>
               <ComponentModalPrincipalHeader title="Insertar el profesor" onClosechange={()=>{propsetismodalvisible(false)}} />
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
                    <Forminputmail textinput={textcorreo} settextinput={settextcorreo} placeHolder="correo" keyname ={"cor"}/>
                    <Forminputnumber textinput={texttelf} settextinput={settexttelf} placeHolder="telf 00000000" keyname ={"teld"} Limitchar={9}/>
                    <Forminput textinput={textestudios} settextinput={settextestudios} placeHolder="estudios" keyname ={"estudios"}/>
                    <Forminputpassword textinput={textpass} settextinput={settextpass} keyname ={"pass"}/>

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