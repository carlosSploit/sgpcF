import React, { useState } from "react";
import { Forminputpassword,ForminputBottonSubmit, Forminput, ForminputBotton} from "../../service/morvius-service/form";
import './style/registerCliente.css';
import { addclientAnalist } from "../../service/repository/RTclientAnalist";
import { useNotification } from "../../service/Notifications/NotificationProvider";
import { handleNewNotification } from "../../service/Notifications/useNotificacion";
import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader } from "../../service/morvius-service/components";
import { ConsulLog, InsertLog } from "../../service/repository/RTUsuarios";

export function RegisterCliente(props){
    const [ismodalvisible, setismodalvisible] = useState(false);
    const [textCorreo, settextCorreo] = useState('');
    const [textPassword, settextPassword] = useState('');
    const dispatch = useNotification();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (event.target.passs.value != event.target.conpas.value){
            handleNewNotification(dispatch,'Parece que las contrasenas no coiciden para su comprovacion', 404);
            return;
        }

        let jsondata = {
            nombre : event.target.nombr.value,
            apellidos : event.target.apell.value,
            telf : event.target.telf.value,
            correo : event.target.corre.value,
            pass : event.target.passs.value,
            photo  : "https://nyrevconnect.com/wp-content/uploads/2017/06/Placeholder_staff_photo-e1505825573317.png"
        };

        let result = await addclientAnalist(jsondata);
        if (parseInt(result.status) === 404){
            handleNewNotification(dispatch,result.messege, result.status);
            return;
        }

        handleNewNotification(dispatch,result.messege, result.status);
        // activar la opccion de apertuura del sistema        
        setTimeout(()=>{
            settextCorreo(event.target.corre.value)
            settextPassword(event.target.passs.value)
            setismodalvisible(true)
        },500);
    }

    const textUsser = (correo = '') => {
        return `@${correo.split('@')[0]}`
    }

    const onLoginIn = async () => {
        let jsondata = {
            user : textUsser(textCorreo),
            pass  : textPassword
        };
        // se envia la combrovacion del usuario y contraseña
        let result = await ConsulLog(jsondata);
        if (parseInt(result.status) === 404){
            handleNewNotification(dispatch,'El usuario o la contrasena no son correctos', 404);
            return;
        }
        await InsertLog(result);
        console.log(window.location.origin)
        window.location.href = window.location.origin;
    }

    return (
        <div className="container_login">
            <div className="container_login_subcontent">
                <div className="container_login_form">
                    <div style={{height:"10px"}} />
                    {/* <div className="container_login_title">
                        Inicio de sesion
                    </div> */}
                    <div style={{height:"10px"}} />
                        {/* <div className="container_login_logo" style={{backgroundImage:`url('${require("./res/logo (1).png")}')`}}></div> */}
                    <div style={{height:"10px"}} />
                    <div className="container_title_login" >
                        Registrate
                    </div>
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
                        <div className="conteiner_input_data">
                            <div className="conteiner_input_data_item">
                                <Forminput placeHolder="Nombre" keyname ={"nombr"}/>
                            </div>
                            <div className="conteiner_input_data_space"></div>
                            <div className="conteiner_input_data_item">
                                <Forminput placeHolder="Apellidos" keyname ={"apell"}/>
                            </div>
                        </div>
                        <div style={{height:"5px"}}></div>
                        <div className="conteiner_input_data">
                            <div className="conteiner_input_data_item">
                                <Forminput placeHolder="Telefono" keyname ={"telf"}/>
                            </div>
                            <div className="conteiner_input_data_space"></div>
                            <div className="conteiner_input_data_item">
                                <Forminput placeHolder="Correo" keyname ={"corre"}/>
                            </div>
                        </div>
                        <div style={{height:"5px"}}></div>
                        <div className="conteiner_input_data">
                            <div className="conteiner_input_data_item">
                                <Forminputpassword  placeHolder="Contraseña" keyname ={"passs"}/>
                            </div>
                            <div className="conteiner_input_data_space"></div>
                            <div className="conteiner_input_data_item">
                                <Forminputpassword  placeHolder="Confirmar Contrasena" keyname ={"conpas"}/>
                            </div>
                        </div>
                        <div style={{height:"10px"}} />
                        <ForminputBottonSubmit label={"Iniciar"}/>
                        <ForminputBotton onChange={()=>{
                            window.location.href = window.location.origin + '/login';
                        }} isInvertColor = {true} label={"Cancelar"}/>
                        <div style={{height:"10px"}} />
                    </form>
                    <div style={{height:"30px"}} />
                </div>
            </div>
            {(ismodalvisible)?<ModalConfirmation labelUser = {textUsser(textCorreo)} isLogIn = {async () => {
                await onLoginIn()
            }} propismodalvisible = {ismodalvisible} propsetismodalvisible = {setismodalvisible} ></ModalConfirmation>:
            <></>}
        </div>
    );
}

function ModalConfirmation (props){
    const [ismodalvisible, setismodalvisible] = useState(true);
    const {labelUser = '', isLogIn = async () => {}, propismodalvisible = ismodalvisible, propsetismodalvisible = setismodalvisible } = props;

    return (<ComponentModalFloting statemode={propismodalvisible} width = {'500px'} >
                <ComponentModalFlotingHeader title={`Bienvenido a nuestra aplicacion ${labelUser}`} colorTitle={'#183152'} onClosechange={()=>{propsetismodalvisible(false);}} />
                <ComponentModalFlotingBody descripccion={""}>
                    <div style={{height: '10px'}}></div>
                    <p className="container_text_bienvenid">Bienvenido a nuestro protitipo para generar planes de contingencia, esta aplicacion fue hecha con fines de estudio, mas no para fines de uso masivo. Por lo cual no se debe tomar esta aplicacion 100% enserio.</p>
                    <p className="container_text_bienvenid">Por otro lado este prototipo esta basodo en los prosesos de la ISO 22301, o ISO para la aplicacion de un sistema de gestion para la continuidad del negocio, por lo cual podra realizar un analizis del proceso y generar contingencias. Por otro lado, tambin se basa en magerit, lo cual tambien se podra realizar analisis y gestion de riesgos.</p>
                    <div style={{height: '10px'}}></div>
                    <ForminputBotton label={"Iniciar en la aplicacion"} onChange = { async () => {
                        await isLogIn();
                    }} />
                    <ForminputBotton onChange={()=>{
                        window.location.href = window.location.origin + '/login';
                    }} isInvertColor = {true} label={"Cancelar"}/>
                    <div style={{height: '10px'}}></div>
                </ComponentModalFlotingBody>
            </ComponentModalFloting>
        );
}