import React, { useState } from "react";
import "./style/addCurso.css";
import {uploudImage} from "../../../../../../service/repository/uploudimage";
import { getprofesor } from "../../../../../../service/repository/Profesor";
import { getTipoCurso } from "../../../../../../service/repository/TipoCurso";
import { addcurso } from "../../../../../../service/repository/Curso";
import { ComponentBotton,ComponentModalPrincipal,ComponentModalPrincipalHeader,ComponentModalPrincipalBody } from "../../../../../../service/morvius-service/components";
import { Forminput,
    Forminputnumber,
    ForminputRadioSlice,
    ForminputImageRectangle, 
    FormListchipts,
    ForminputArea,
    ForminputBottonSubmit,
    ForminputDatetoDate} from "../../../../../../service/morvius-service/form";

export function AddProfesor(props){
    const { onInsert=()=>{} } = props;
    const [ismodalvisible, setismodalvisible] = useState(false);
    const [filephoto, setfilephoto] = useState(null);
    const [isgratuito , setisgratuito] = useState(false);
    const [iscontentvideo , setiscontentvideo] = useState(false);
    // listas de listchips de profesores y cursos
    const [listProfesores, setlistProfesores] = useState(null);
    const [listTipCurso, setlistTipCurso] = useState(null);
    
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
                "idprof" : 1,
                "idtipcur" : 1,
                "name" : "Andrea graciela",
                "descr" :  969280255,
                "alcan" : "arturo1421sdfFGsdf2000@gmail.com",
                "fech_in" : "2022/01/18",
                "fech_fin" : "2022/01/20",
                "disdu" : 1,
                "presio": 20,
                "contvid" : "<div> No se encuentra ningun video </div>",
                "photpo": "http://jkjasjdaksdjaslkdjsa"
            }
        */
       console.log(event.target.id_prof.value);
       let data = {
            "idprof" : parseInt(event.target.id_prof.value),
            "idtipcur" : parseInt(event.target.id_tipocurs.value),
            "name" : event.target.name.value,
            "descr" :  event.target.desc.value,
            "alcan" : event.target.alc.value,
            "fech_in" : event.target.init_fechacurse.value,
            "fech_fin" : event.target.fina_fechacurse.value,
            "disdu" : parseInt(event.target.diadu.value),
            "presio": (!isgratuito)?parseFloat(event.target.pres.value):0.0,
            "contvid" : (!iscontentvideo)?event.target.codv.value:"<div> No se encuentra ningun video </div>",
            "photpo": urlimage
        };
        console.log(data);
       let resul = await addcurso(data);
       await onInsert();
       console.log(resul);
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

    const onChangeItemslisttipcurso = (item) => {
        // setfilephoto(file);
        console.log(item);
    }

    const onChangeItemslistprofe = (item) => {
        console.log(item);
    }

    const onChangeinputgratuito = (stade) => {
        setisgratuito(stade);
    }

    const onChangeiscontentvideo = (stade) => {
        setiscontentvideo(stade);
    }

    return (
        <>
           <div className="container_addprofesor">
                <ComponentBotton label={"A. curso"} onChange={async ()=>{
                    await onlistprofesor();
                    await ontipocurso();
                    setismodalvisible(true);
                }} />
           </div>
           <ComponentModalPrincipal statemode={ismodalvisible} onClosechange={()=>{setismodalvisible(false)}}>
               <ComponentModalPrincipalHeader title="Agregar un taller" onClosechange={()=>{setismodalvisible(false)}} />
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
                    <Forminput placeHolder="nombre" keyname ={"name"}/>
                    <ForminputImageRectangle oncallbackchange={oncallbackchange} keyname ={"photo"}/>
                    <div style={{height:"20px"}}></div>
                    <ForminputRadioSlice onChangeinput={onChangeiscontentvideo} label={"El taller tiene un trailer"} keyname ={"pass"}/>
                    {(!iscontentvideo)?<ForminputArea placeHolder="Codigo de video" keyname ={"codv"}/>:<></>}
                    <ForminputArea placeHolder="Descripccion" keyname ={"desc"}/>
                    <ForminputArea placeHolder="Alcance" keyname ={"alc"}/>
                    <Forminputnumber placeHolder="Dias de duracion" keyname ={"diadu"}/>
                    {/* ingresar datos */}
                    <div className="container_curso_subtitle">
                        Selecciona el profesor: 
                    </div>
                    {(listProfesores != null)?<FormListchipts keyname={"id_prof"} keyimage={"photo"} keyitem={"id_profesor"} keytitle={"nombre"} listdatos={listProfesores}
                    initvalue={listProfesores[0].id_profesor} isimage={true} isActionChips = {false} onChangeItems={onChangeItemslistprofe}/>:<></>}
                    {/* ingresar datos */}
                    <div className="container_curso_subtitle">
                        Selecciona la categoria:
                    </div>
                    {(listTipCurso != null)?<FormListchipts keyname={"id_tipocurs"}  keyitem={"id_tipocurso"} keytitle={"name"} listdatos={listTipCurso}
                    initvalue={listTipCurso[0].id_tipocurso} isActionChips = {false} onChangeItems={onChangeItemslisttipcurso}/>:<></>}
                    {/* Ingresar tiempos */}
                    <div className="container_curso_subtitle">
                        Selecciona el tiempo de inicio y de fin:
                    </div>
                    <div style={{height:"10px"}}></div>
                    <div className="container_curso_date_container">
                        <ForminputDatetoDate keyname ={"fechacurse"}/>
                    </div>
                    <div style={{height:"10px"}}></div>
                    <ForminputRadioSlice onChangeinput={onChangeinputgratuito} label={"El taller es en modo gratuito"} keyname ={"pass"}/>
                    {(!isgratuito)?<Forminputnumber placeHolder="Precio" keyname ={"pres"}/>:<></>}
                    <ForminputBottonSubmit/>
                </form>
               </ComponentModalPrincipalBody>
           </ComponentModalPrincipal>
        </>
    );
}