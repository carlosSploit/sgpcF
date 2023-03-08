import React, { useEffect, useRef, useState } from "react";
import "./style/addProfesor.css";
import { ComponentModalPrincipal,ComponentModalPrincipalHeader,ComponentModalPrincipalBody,ComponentChipst } from "../../../../../../../../service/morvius-service/component/components";
import { Forminput,
    Forminputnumber, Forminputmail,
    Forminputpassword,
    ForminputImageCircle,ForminputBottonSubmit, ForminputRadioSlice, ForminputArea, FormListchipts, ForminputImageRectangle, ForminputDatetoDate} from "../../../../../../../../service/morvius-service/form";
import { EditOutlined } from "@ant-design/icons";
import {updateprofe} from "../../../../../../../../service/repository/Profesor";
import { updatecurso } from "../../../../../../../../service/repository/Curso";
import {uploudImage} from "../../../../../../../../service/repository/uploudimage";
import { getprofesor } from "../../../../../../../../service/repository/Profesor";
import { getTipoCurso } from "../../../../../../../../service/repository/TipoCurso";
import { Carcurso } from "../../car_curso";
import { handleNewNotification, useNotification } from "../../../../../../../../service/Notifications/useNotificacion";

export function EditCurso(props){
    let {
        refAction,
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
    const [isgratuito , setisgratuito] = useState(false);
    const [iscontentvideo , setiscontentvideo] = useState(false);
    // listas de listchips de profesores y cursos
    const [listProfesores, setlistProfesores] = useState(null);
    const [listTipCurso, setlistTipCurso] = useState(null);
    const dispatch = useNotification();

    const isurl = (url="") =>{
        let arraysplit = url.split("://");
        if (arraysplit.length == 1) return false;
        if ((arraysplit[0] != "https") && arraysplit[0] != "http") return false;
        return true;
    }

    useEffect(()=>{
        (async()=>{
            await onlistprofesor();
            await ontipocurso();
            setiscontentvideo(("<div> No se encuentra ningun video </div>" == dataact.content_video));
            setisgratuito((dataact.presio_inscri == 0));
        })();
    },[]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        let urlimage = "https://thumbs.dreamstime.com/b/icono-gris-de-perfil-usuario-s%C3%ADmbolo-empleado-avatar-web-y-dise%C3%B1o-ilustraci%C3%B3n-signo-aislado-en-fondo-blanco-191067342.jpg";
        
        if(filephoto == null){
            urlimage = (isurl(dataact.photoport))? dataact.photoport : urlimage;
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
            // "idprof" : dataact.id_profesor,
            "idtipcur" : dataact.id_tipo_curso,
            "name" : dataact.nombre,
            "descr" :  event.target[`desc${dataact.id_curso}`].value,
            "alcan" : event.target[`alc${dataact.id_curso}`].value,
            // "fech_in" : dataact.fecha_init,
            // "fech_fin" : dataact.fecha_fin,
            // "disdu" : dataact.dias_durac,
            // "presio": dataact.presio_inscri,
            "contvid" : (!iscontentvideo)?event.target[`codv${dataact.id_curso}`].value:"<div> No se encuentra ningun video </div>",
            "photpo": urlimage
        };
       let resul = await updatecurso(dataact.id_curso,data);
       handleNewNotification(dispatch,resul.messege, resul.status);
       setTimeout(() => {
            (async ()=>{
                await onUpdate();
                console.log(resul);
            })();
       }, 500);
    }

    const oncallbackchange = (file) => {
        setfilephoto(file);
    }

    const onlistprofesor = async () =>{
        let result = await getprofesor();
        setlistProfesores(null);
        setTimeout(() => {
            setlistProfesores(result);
        }, 500);
    }

    const ontipocurso = async () =>{
        let result = await getTipoCurso();
        setlistTipCurso(null);
        setTimeout(() => {
            setlistTipCurso(result);
        }, 500);
    }

    const onChangeiscontentvideo = (stade) => {
        setiscontentvideo(stade);
    }

    return (
        <>
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
                        {/* informacion basica */}
                        {/* <Forminput valueInit={dataact.nombre} placeHolder="nombre" keyname ={`name${dataact.id_curso}`}/> */}
                        <ForminputImageRectangle urlphoto={dataact.photoport} oncallbackchange={oncallbackchange} keyname ={`photo${dataact.id_curso}`}/>
                        <div style={{height:"20px"}}></div>
                        <ForminputRadioSlice valueInit={("<div> No se encuentra ningun video </div>" == dataact.content_video)} onChangeinput={onChangeiscontentvideo} urlphoto={dataact.photoport} label={"El taller no tiene un trailer"} keyname ={"pass"}/>
                        {(!iscontentvideo)?<ForminputArea valueInit={dataact.content_video} placeHolder="Codigo de video" keyname ={`codv${dataact.id_curso}`}/>:<></>}
                        <ForminputArea valueInit={dataact.descripccion} placeHolder="Descripccion" keyname ={`desc${dataact.id_curso}`}/>
                        <ForminputArea valueInit={dataact.alcance} placeHolder="Alcance" keyname ={`alc${dataact.id_curso}`}/>
                        <ForminputBottonSubmit/>
                </form>
            </ComponentModalPrincipalBody>
        </>
    );
}