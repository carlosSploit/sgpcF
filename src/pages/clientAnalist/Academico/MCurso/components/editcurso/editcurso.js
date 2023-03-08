import React, { useEffect, useState } from "react";
import "./style/addProfesor.css";
import { ComponentModalPrincipalBody } from "../../../../../../service/morvius-service/components";
import { Forminput,ForminputBottonSubmit, ForminputRadioSlice, ForminputArea, FormListchipts, ForminputImageRectangle} from "../../../../../../service/morvius-service/form";
import { updatecurso } from "../../../../../../service/repository/Curso";
import {uploudImage} from "../../../../../../service/repository/uploudimage";
import { getTipoCurso } from "../../../../../../service/repository/TipoCurso";
import { handleNewNotification, useNotification } from "../../../../../../service/Notifications/useNotificacion";

export function EditCurso(props){
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
    // const [ismodalvisible, setismodalvisible] = useState(false);
    const [filephoto, setfilephoto] = useState(null);
    // const [isgratuito , setisgratuito] = useState(false);
    const [iscontentvideo , setiscontentvideo] = useState(false);
    // listas de listchips de profesores y cursos
    // const [listProfesores, setlistProfesores] = useState(null);
    const [listTipCurso, setlistTipCurso] = useState(null);
    const dispatch = useNotification();

    const isurl = (url="") =>{
        // console.log(url);
        let arraysplit = url.split("://");
        // console.log(arraysplit);
        if (arraysplit.length == 1) return false;
        if ((arraysplit[0] != "https") && (arraysplit[0] != "http")) return false;
        return true;
    }

    useEffect(()=>{
        // ------------------------------------------------------------------ Inisializacion de variables
        (async()=>{
            await ontipocurso();
            setiscontentvideo(("<div> No se encuentra ningun video </div>" == dataact.content_video));
        })();
    },[]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        let urlimage = "https://thumbs.dreamstime.com/b/icono-gris-de-perfil-usuario-s%C3%ADmbolo-empleado-avatar-web-y-dise%C3%B1o-ilustraci%C3%B3n-signo-aislado-en-fondo-blanco-191067342.jpg";
        
        if(filephoto == null){
            // console.log(dataact.photoport);
            urlimage = (isurl(dataact.photoport))? dataact.photoport : urlimage;
        }

        if(filephoto != null){
            urlimage = await uploudImage(filephoto);
            urlimage = urlimage.data;
            urlimage = urlimage[0].url;
            console.log(urlimage);
        }
        let data = {
            "idtipcur" : parseInt(event.target[`id_tipocurs${dataact.id_curso}`].value),
            "name" : event.target[`name${dataact.id_curso}`].value,
            "descr" :  event.target[`desc${dataact.id_curso}`].value,
            "alcan" : event.target[`alc${dataact.id_curso}`].value,
            "contvid" : (!iscontentvideo)?event.target[`codv${dataact.id_curso}`].value:"<div> No se encuentra ningun video </div>",
            "photpo": urlimage
        };
       let resul = await updatecurso(dataact.id_curso,data);
       handleNewNotification(dispatch,resul.messege, resul.status);
        setTimeout(() => {
                (async()=>{
                    await onUpdate();
                })();
        }, 500);
    }

    const oncallbackchange = (file) => {
        setfilephoto(file);
    }

    const ontipocurso = async () =>{
        let result = await getTipoCurso();
        setlistTipCurso(null);
        setTimeout(() => {
            setlistTipCurso(result);
        }, 500);
    }

    const onChangeItemslisttipcurso = (item) => {
        // setfilephoto(file);
        console.log(item);
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
                <Forminput valueInit={dataact.nombre} placeHolder="nombre" keyname ={`name${dataact.id_curso}`}/>
                {/* ingresar datos */}
                <div className="container_curso_subtitle">
                    Selecciona la categoria:
                </div>
                {(listTipCurso != null)?<FormListchipts keyname={`id_tipocurs${dataact.id_curso}`}  keyitem={"id_tipocurso"} keytitle={"name"} listdatos={listTipCurso}
                initvalue={dataact.id_tipo_curso} isActionChips = {false} onChangeItems={onChangeItemslisttipcurso}/>:<></>}
                <ForminputImageRectangle urlphoto={dataact.photoport} oncallbackchange={oncallbackchange} keyname ={`photo${dataact.id_curso}`}/>
                <div style={{height:"20px"}}></div>
                <ForminputRadioSlice valueInit={("<div> No se encuentra ningun video </div>" == dataact.content_video)} onChangeinput={onChangeiscontentvideo} urlphoto={dataact.photoport} label={"El taller no tiene trailer"} keyname ={"pass"}/>
                {(!iscontentvideo)?<ForminputArea valueInit={dataact.content_video} placeHolder="Codigo de video" keyname ={`codv${dataact.id_curso}`}/>:<></>}
                <ForminputArea valueInit={dataact.descripccion} placeHolder="Descripccion" keyname ={`desc${dataact.id_curso}`}/>
                <ForminputArea valueInit={dataact.alcance} placeHolder="Alcance" keyname ={`alc${dataact.id_curso}`}/>
                <ForminputBottonSubmit label = {"actualizar"}/>
            </form>
            </ComponentModalPrincipalBody>
        </>
    );
}