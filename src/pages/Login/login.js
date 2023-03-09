import React, { useState } from "react";
import { ConsulLog, InsertLog } from "../../service/repository/Usuarios";
import "./style/login.css";
import {  Forminputmail, Forminputpassword,ForminputBottonSubmit, Forminput} from "../../service/morvius-service/form";
import { LeftOutlined } from "@ant-design/icons";

export function Login(props){

    const [stadenotLogin, setstadenotlogin] = useState(false);
    const [informaticonLogin, setinformaticonLogin] = useState({
        "correo": "desconodifo@gmail.com",
        "photo" : "https://nyrevconnect.com/wp-content/uploads/2017/06/Placeholder_staff_photo-e1505825573317.png",
        "usaio" : "@arturo14212000"
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        let jsondata = {
            user : event.target.corus.value,
            pass  : event.target.conpas.value
        };
        // se envia la combrovacion del usuario y contraseña
        let result = await ConsulLog(jsondata);
        if (result.status == 404){
            if (result.data.correo !== undefined){
                setstadenotlogin(true);
                setinformaticonLogin(result.data);
                return;
            }
            console.log("no existe")
            return;
        }
        await InsertLog(result);
        window.location.href = window.location.origin;
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
                    {(!stadenotLogin)?<>
                        <div style={{height:"10px"}} />
                        {/* <div className="container_login_logo" style={{backgroundImage:`url('${require("./res/logo (1).png")}')`}}></div> */}
                        <div style={{height:"10px"}} />
                        <div className="container_title_login" >
                            Ingresa ahora
                        </div>
                    </>:<>
                        <div className="container_login_back">
                            <LeftOutlined onClick={()=>{
                                setstadenotlogin(false);
                            }} />
                        </div>
                    </>}
                    {(stadenotLogin)?<>
                        <div className="container_login_information">
                            <div className="container_login_information_photo" style={{backgroundImage: `url('${informaticonLogin.photo}')`}}></div>
                            <div style={{height: '10px'}}></div>
                            <div className="container_login_information_username">{`Inicio secion con ${informaticonLogin.usaio}`}</div>
                            <div className="container_login_information_correo">{`${informaticonLogin.correo}`}</div>
                        </div>
                    </>:<></>}
                    <form
                        style={{
                            margin: "0",
                            padding: "0",
                            width: "90%",
                            marginLeft: '5%',
                            marginRight: '5%'
                        }}
                        layout="vertical"
                        onSubmit={handleSubmit}
                        onFinich
                        autoComplete="off"
                    >
                        
                        <div style={{height:"20px"}}></div>
                        <div style={{display: `${(stadenotLogin)?'none':'block'}`}}>
                            <Forminput placeHolder="correo" keyname ={"corus"}/>
                        </div>
                        <div style={{height:"6px"}} />
                        <Forminputpassword  placeHolder="contraseña" keyname ={"conpas"}/>
                        <div style={{height:"10px"}} />
                        <ForminputBottonSubmit label={"Iniciar"}/>
                        <div style={{height:"10px"}} />
                        {(!stadenotLogin)?<>
                            <div className="container_login_descripccion" onClick={()=>{
                                window.location.href = window.location.origin + '/register';
                            }} >
                                Si no estas registrado, porfavor registrate.
                            </div>
                        </>:<></>}
                    </form>
                    <div style={{height:"30px"}} />
                </div>
            </div>
        </div>
    );
}