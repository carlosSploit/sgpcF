import React, { useEffect, useState } from "react";
import "./style/addCurso.css";
import {uploudImage} from "../../../../../../service/repository/uploudimage";
import { getprofesor } from "../../../../../../service/repository/Profesor";
import { getTipoCurso } from "../../../../../../service/repository/TipoCurso";
import { addcurso } from "../../../../../../service/repository/Curso";
import { ComponentBotton,ComponentModalPrincipal,ComponentModalPrincipalHeader,ComponentModalPrincipalBody } from "../../../../../../service/morvius-service/components";
import { Forminput,
    ForminputRadioSlice,
    ForminputImageRectangle, 
    FormListchipts,
    ForminputArea,
    ForminputBottonSubmit} from "../../../../../../service/morvius-service/form";
import { handleNewNotification, useNotification } from "../../../../../../service/Notifications/useNotificacion";

export function AddCurso(props){
    const [ismodalvisible, setismodalvisible] = useState(false);
    const { onInsert=()=>{}, prodismodalvisible = ismodalvisible, propsetismodalvisible = setismodalvisible } = props;
    
    const [filephoto, setfilephoto] = useState(null);
    // const [isgratuito , setisgratuito] = useState(false);
    const [iscontentvideo , setiscontentvideo] = useState(false);
    // listas de listchips de profesores y cursos
    const [listProfesores, setlistProfesores] = useState(null);
    const [listTipCurso, setlistTipCurso] = useState(null);
    const [isnombrecur, setinombrecur] = useState("");
    const [isdescription, setdescription] = useState("");
    const [isalcanze, setalcanze] = useState("");
    const [iscodetrailer, setcodetrailer] = useState("");
    const dispatch = useNotification();
    
    // let validator = [false,false,false,false,false];

    // const onError = (index) => {
    //     validator[index] = true;
    // };

    useEffect(()=>{
        (async()=>{
            await onlistprofesor();
            await ontipocurso();
            setismodalvisible(true);
        })();
    },[]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        let urlimage = "https://thumbs.dreamstime.com/b/icono-gris-de-perfil-usuario-s%C3%ADmbolo-empleado-avatar-web-y-dise%C3%B1o-ilustraci%C3%B3n-signo-aislado-en-fondo-blanco-191067342.jpg";
        
        if(filephoto != null){
            let dataurlimage = await uploudImage(filephoto);
            console.log(dataurlimage);
            let datalisturlimage = dataurlimage.data;
            urlimage = datalisturlimage[0].url;
            console.log(dataurlimage);
        }

       let data = {
            // "idprof" : parseInt(event.target.id_prof.value),
            "idtipcur" : parseInt(event.target.id_tipocurs.value),
            "name" : event.target.name.value,
            "descr" :  event.target.desc.value,
            "alcan" : event.target.alc.value,
            "contvid" : (!iscontentvideo)?event.target.codv.value:"<div> No se encuentra ningun video </div>",
            "photpo": urlimage
        };
        let resul = await addcurso(data);
        handleNewNotification(dispatch,resul.messege, resul.status);
        setTimeout(() => {
                (async()=>{
                    await onInsert();
                    limpiarcasillar();
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

    const onChangeItemslisttipcurso = (item) => {
        // setfilephoto(file);
        console.log(item);
    }

    const limpiarcasillar = () => {
        setinombrecur("");
        setcodetrailer("");
        setdescription("");
        setalcanze("");
    }

    const onChangeiscontentvideo = (stade) => {
        setiscontentvideo(stade);
    }

    return (
        <>
           {/* <div className="container_addprofesor">
                <ComponentBotton label={"A. curso"} onChange={async ()=>{
                    
                }} />
           </div> */}
           <ComponentModalPrincipal statemode={prodismodalvisible} onClosechange={()=>{limpiarcasillar();propsetismodalvisible(false);}}>
               <ComponentModalPrincipalHeader title="Agregar un Curso" onClosechange={()=>{limpiarcasillar();propsetismodalvisible(false)}} />
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
                    <Forminput textinput = {isnombrecur} settextinput = {setinombrecur} placeHolder="nombre" keyname ={"name"}/>
                    <ForminputImageRectangle oncallbackchange={oncallbackchange} keyname ={"photo"}/>
                    <div style={{height:"20px"}}></div>
                    <ForminputRadioSlice onChangeinput={onChangeiscontentvideo} label={"El taller no tiene un trailer"} keyname ={"pass"}/>
                    {(!iscontentvideo)?<ForminputArea textinput = {iscodetrailer} settextinput = {setcodetrailer} placeHolder="Codigo de video" keyname ={"codv"}/>:<></>}
                    <ForminputArea textinput = {isdescription} settextinput = {setdescription} placeHolder="Descripccion" keyname ={"desc"}/>
                    <ForminputArea textinput = {isalcanze} settextinput = {setalcanze} placeHolder="Alcance" keyname ={"alc"}/>
                    {/* <Forminputnumber placeHolder="Dias de duracion" keyname ={"diadu"}/> */}
                    {/* ingresar datos */}
                    {/* <div className="container_curso_subtitle">
                        Selecciona el profesor: 
                    </div>
                    {(listProfesores != null)?<FormListchipts keyname={"id_prof"} keyimage={"photo"} keyitem={"id_profesor"} keytitle={"nombre"} listdatos={listProfesores}
                    initvalue={listProfesores[0].id_profesor} isimage={true} isActionChips = {false} onChangeItems={onChangeItemslistprofe}/>:<></>} */}
                    {/* ingresar datos */}
                    <div className="container_curso_subtitle">
                        Selecciona la categoria:
                    </div>
                    {(listTipCurso != null)?<FormListchipts keyname={"id_tipocurs"}  keyitem={"id_tipocurso"} keytitle={"name"} listdatos={listTipCurso}
                    initvalue={listTipCurso[0].id_tipocurso} isActionChips = {false} onChangeItems={onChangeItemslisttipcurso}/>:<></>}
                    {/* Ingresar tiempos */}
                    {/* <div className="container_curso_subtitle">
                        Selecciona el tiempo de inicio y de fin:
                    </div>
                    <div style={{height:"10px"}}></div>
                    <div className="container_curso_date_container">
                        <ForminputDatetoDate keyname ={"fechacurse"}/>
                    </div>
                    <div style={{height:"10px"}}></div>
                    <ForminputRadioSlice onChangeinput={onChangeinputgratuito} label={"El taller es en modo gratuito"} keyname ={"pass"}/>
                    {(!isgratuito)?<Forminputnumber placeHolder="Precio" keyname ={"pres"}/>:<></>} */}
                    <ForminputBottonSubmit/>
                </form>
               </ComponentModalPrincipalBody>
           </ComponentModalPrincipal>
        </>
    );
}