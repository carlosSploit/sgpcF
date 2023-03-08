import React, { useEffect, useRef, useState } from "react";
import "./style/viewcurso.css";
import { ComponentModalPrincipal,ComponentModalPrincipalHeader,ComponentModalPrincipalBody, ComponentModalPrincipalFooter, ComponentBotton } from "../../../../../../service/morvius-service/components";
import { getprofesor } from "../../../../../../service/repository/Profesor";
import { getTipoCurso } from "../../../../../../service/repository/TipoCurso";
import { ComponentChipst } from "../../../../../../service/morvius-service/components";
import { ComponentItemSecion } from "../../../../../../service/morvius-service/component/components";
import { getSesion } from "../../../../../../service/repository/Sesion";

export function ViewCurso(props){
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
    // const [filephoto, setfilephoto] = useState(null);
    const [isgratuito , setisgratuito] = useState(false);
    const [iscontentvideo , setiscontentvideo] = useState(false);
    // listas de listchips de profesores y cursos
    const [listSesion , setlistSesion] = useState(null);
    const [listProfesores, setlistProfesores] = useState(null);
    const [listTipCurso, setlistTipCurso] = useState(null);
    // profesor y curso
    // const [Profesores, setProfesores] = useState(null);
    // const [TipCurso, setTipCurso] = useState(null);

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

    const onlistSesion = async () =>{
        let result = await getSesion(dataact.id_curso);
        setlistSesion(null);
        setTimeout(() => {
            if (result.length != 0){
                setlistSesion(result);
            }
        }, 500);
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

    const parsetieme = (date = "") =>{
        let objdate = new Date(date);
        //console.log(`${objdate.getUTCFullYear()}/${objdate.getUTCMonth()}/${objdate.getUTCDay()}`);
        return objdate.toISOString().slice(0, 10);
    }

    return (
        <>
            <div ref={refAction} onClick={ async ()=>{
                await onlistSesion();
                setismodalvisible(true);
            }}>
            </div>
           <ComponentModalPrincipal  statemode={ismodalvisible} onClosechange={()=>{setismodalvisible(false);}}>
               <ComponentModalPrincipalHeader title={`${dataact.nombre}`} onClosechange={()=>{setismodalvisible(false)}} >
                   <div className="container_view-curso-component-header">
                       {/* chip  profesor */}
                       <ComponentChipst name = {dataact.nameprof} photo={dataact.photo} isphoto={true} />
                       <div style={{width:"10px"}} />
                       {/* chip de tipo de curso */}
                       <ComponentChipst iditem={dataact.id_tipo_curso} name = {dataact.nametipocu} />
                   </div>
                   <div style={{height: "10px"}} />
               </ComponentModalPrincipalHeader>
               <ComponentModalPrincipalBody>
                    <div style={{height:"10px"}} />
                    <div className="container_view-curso-component-header">
                       {/* video tutorial */}
                       {(dataact.content_video.toUpperCase().indexOf("DIV") !== -1)?<></>:
                            <div className="container_view_curso_component_header_video" dangerouslySetInnerHTML={{__html: dataact.content_video}}>
                            {/* <iframe width="100%" height="100%" src="https://www.youtube.com/embed/RnbRG-Sy0tc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                        </div>}
                   </div>
                   <div style={{height:"10px"}} />
                   {/* Descripccion */}
                   <div className="container_view_curso_contain_info">
                        <div className="container_view_curso_contain_info_title">Descripccion</div>
                        <div className="container_view_curso_contain_info_body">{dataact.descripccion}</div>
                   </div>
                   {/* Alcance */}
                   <div className="container_view_curso_contain_info">
                        <div className="container_view_curso_contain_info_title">Alcance</div>
                        <div className="container_view_curso_contain_info_body">{dataact.alcance}</div>
                   </div>
                   {/* Tiempo de inicio y de fin */}
                   <div className="container_view_curso_contain_info_tiempo">
                       {`Inicio: ${parsetieme(dataact.fecha_init)} a ${parsetieme(dataact.fecha_fin)}`}
                   </div>
                   <div style={{height:"10px"}} />
                   {/* Sesiones a Tocar */}
                   {(listSesion != null)?
                   <div className="container_view_curso_contain_info">
                        <div className="container_view_curso_contain_info_title">Sesiones a tocar</div>
                        <div style={{height:"10px"}} />
                        <div className="container_view_curso_contain_info_body">
                            {(listSesion != null)?listSesion.map((item)=>{
                                return <ComponentItemSecion label={item.nombre} ></ComponentItemSecion>;
                            }):<></>}
                        </div>
                    </div>
                   :<></>}
               </ComponentModalPrincipalBody>
               <ComponentModalPrincipalFooter>
                   <div className="container_view_curso_contain_info_presio">
                        {(dataact.presio_inscri == 0)?`Gratis`:`S/ ${dataact.presio_inscri}`}
                   </div>
                   <ComponentBotton label="Inscribete"></ComponentBotton>
               </ComponentModalPrincipalFooter>
           </ComponentModalPrincipal>
        </>
    );
}