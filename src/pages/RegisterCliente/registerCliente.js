import React, { useState } from "react";
import { Forminputpassword,ForminputBottonSubmit, Forminput, ForminputBotton} from "../../service/morvius-service/form";
import './style/registerCliente.css';
import { addclientAnalist } from "../../service/repository/RTclientAnalist";

export function RegisterCliente(props){

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (event.target.passs.value != event.target.conpas.value){
            console.log('Parece que las contrasenas no coiciden para su comprovacion')
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
            console.log(result.messege)
            console.log(result)
            return;
        }

        console.log(result.messege)
        window.location.href = window.location.origin + '/login';
        // se envia la combrovacion del usuario y contraseña
        // let result = await ConsulLog(jsondata);
        // if (result.status == 404){
        //     if (result.data.correo !== undefined){
        //         setstadenotlogin(true);
        //         setinformaticonLogin(result.data);
        //         return;
        //     }
        //     console.log("no existe")
        //     return;
        // }
        // await InsertLog(result);
        
        // if (result.tipo_user === "C"){ console.log("no tienes permisos de acceso"); return; }
        // // se inserta el log de seccion
        // console.log("tienes acceso");
        // await InsertLog(jsondata);
        // window.location.href = window.location.origin;
        
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
        </div>
    );
}