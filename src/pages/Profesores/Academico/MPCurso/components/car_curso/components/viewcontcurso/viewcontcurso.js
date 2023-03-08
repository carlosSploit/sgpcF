import React, { useEffect, useRef, useState } from "react";
import "./style/viewcurso.css";
import { ComponentModalPrincipal,ComponentModalPrincipalHeader,ComponentModalPrincipalBody, ComponentModalPrincipalFooter, ComponentBotton } from "../../../../../../../../service/morvius-service/components";
import { Viewcontenitem } from "./components/viewcontenitem/viewcontenitem";
// import { getprofesor } from "../../../../../../../../service/repository/Profesor";
// import { getTipoCurso } from "../../../../../../../../service/repository/TipoCurso";
// import { ComponentChipst } from "../../../../../../../../service/morvius-service/components";
// import { ComponentItemSecion } from "../../../../../../../../service/morvius-service/component/components";
import { getSesion } from "../../../../../../../../service/repository/Sesion";
import { AddSesion } from "./components/addsesion/addSeccion";

export function ViewContenCurso(props){
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
    // const [ismodalvisible, setismodalvisible] = useState(false);
    // const [filephoto, setfilephoto] = useState(null);
    // const [isgratuito , setisgratuito] = useState(false);
    // const [iscontentvideo , setiscontentvideo] = useState(false);
    // listas de listchips de profesores y cursos
    const [listSesion , setlistSesion] = useState(null);
    // const [listProfesores, setlistProfesores] = useState(null);
    // const [listTipCurso, setlistTipCurso] = useState(null);
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
            await onlistSesion();
            // await ontipocurso();
            // setiscontentvideo(("<div> No se encuentra ningun video </div>" == dataact.content_video));
            // setisgratuito((dataact.presio_inscri == 0));
        })();
    },[]);

    const onlistSesion = async () =>{
        let result = await getSesion(dataact.id_ciclo_curso);
        setlistSesion(null);
        setTimeout(() => {
            if (result.length != 0){
                setlistSesion(result);
            }
        }, 500);
    }

    const onlistSesionbaseic = async () =>{
        let result = await getSesion(dataact.id_ciclo_curso);
        if (result.length != 0){
            setlistSesion(result);
        }
    }

    const parsetieme = (date = "") =>{
        let objdate = new Date(date);
        //console.log(`${objdate.getUTCFullYear()}/${objdate.getUTCMonth()}/${objdate.getUTCDay()}`);
        return objdate.toISOString().slice(0, 10);
    }

    return (
        <>
            <ComponentModalPrincipalBody>
                <div style={{height:"10px"}} />
                {/* Tiempo de inicio y de fin */}
                <div className="container_view_curso_contain_info_tiempo">
                    {`Inicio: ${parsetieme(dataact.fecha_init)} a ${parsetieme(dataact.fecha_fin)}`}
                </div>
                <div style={{height:"10px"}} />
                {/* Sesiones a Tocar */}
                <div className="container_view_curso_contain_info">
                    <div className="container_view_curso_contain_info_contain_title">
                        <div className="container_view_curso_contain_info_title">Sesiones a tocar</div>
                        <AddSesion dataac={dataact} onAction={onlistSesion} ></AddSesion>
                    </div>
                    <div style={{height:"10px"}} />
                    <div className="container_view_curso_contain_info_body">
                        {(listSesion != null)?listSesion.map((item)=>{
                            return <Viewcontenitem onclickActionbasic={onlistSesionbaseic} onClickActions={onlistSesion} label={item.nombre} dataac={item} ></Viewcontenitem>;
                        }):<></>}
                    </div>
                </div>
            </ComponentModalPrincipalBody>
        </>
    );
}