import React, { useEffect, useRef, useState } from "react";
import "./style/viewcurso.css";
import { ComponentModalPrincipal,ComponentModalPrincipalHeader,ComponentModalPrincipalBody, ComponentModalPrincipalFooter, ComponentBotton } from "../../../../../../service/morvius-service/components";
// import { Viewcontenitem } from "./components/viewcontenitem/viewcontenitem";
// import { getprofesor } from "../../../../../../service/repository/Profesor";
// import { getTipoCurso } from "../../../../../../service/repository/TipoCurso";
// import { ComponentChipst } from "../../../../../../service/morvius-service/components";
// import { ComponentItemSecion } from "../../../../../../service/morvius-service/component/components";
import {Viewanaliciclcontenitem} from "./components/Viewanaliciclcontenitem/Viewanaliciclcontenitem";
// import { getSesion } from "../../../../../../service/repository/Sesion";
// import { Addciclocurso } from "./components/addciclocurso/addciclocurso";
// import { getciclocurso_curso } from "../../../../../../service/repository/CicloCurso";
import { analiicas_ciclo_curso_sincrono } from "../../../../../../service/repository/Analiticas";

export function Viewcursoanaliticas(props){
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
    const [listciclocurso , setlistciclocurso] = useState(null);
    // const [listProfesores, setlistProfesores] = useState(null);
    // const [listTipCurso, setlistTipCurso] = useState(null);
    // // profesor y curso
    // const [Profesores, setProfesores] = useState(null);
    // const [TipCurso, setTipCurso] = useState(null);

    // const isurl = (url="") =>{
    //     let arraysplit = url.split("://");
    //     if (arraysplit.length == 1) return false;
    //     if ((arraysplit[0] != "https") && arraysplit[0] != "http") return false;
    //     return true;
    // }

    useEffect(()=>{
        (async()=>{
            await onanaliticciclocurso();
        })();
    },[]);

    const onanaliticciclocurso = async () =>{
        // console.log()
        // console.log(dataact);
        let result = await analiicas_ciclo_curso_sincrono(dataact.id_curso);
        // console.log(result);
        setlistciclocurso(null);
        setTimeout(() => {
            if (result.length != 0){
                setlistciclocurso(result);
            }
        }, 500);
    }

    // const onlistciclocursobaseic = async () =>{
    //     let result = await getSesion(dataact.id_curso);
    //     if (result.length != 0){
    //         setlistciclocurso(result);
    //     }
    // }

    const parsetieme = (date = "") =>{
        let objdate = new Date(date);
        //console.log(`${objdate.getUTCFullYear()}/${objdate.getUTCMonth()}/${objdate.getUTCDay()}`);
        return objdate.toISOString().slice(0, 10);
    }

    return (
        <>
            {/* <div ref={refAction} onClick={ async ()=>{
                await onlistciclocurso();
                setismodalvisible(true);
            }}>
            </div> */}
            <ComponentModalPrincipalBody>
                    {/* <div style={{height:"10px"}} /> */}
                    {/* Tiempo de inicio y de fin */}
                    {/* <div className="container_view_curso_contain_info_tiempo">
                       {`Inicio: ${parsetieme(dataact.fecha_init)} a ${parsetieme(dataact.fecha_fin)}`}
                    </div> */}
                    <div style={{height:"20px"}} />
                    {/* Sesiones a Tocar */}
                    <div className="container_view_curso_contain_info">
                        <div className="container_view_curso_contain_info_contain_title">
                            <div className="container_view_curso_contain_info_title">Analiticas de ciclo</div>
                            {/* <Addciclocurso dataac={dataact} onAction={onlistciclocurso} ></Addciclocurso> */}
                        </div>
                        <div style={{height:"10px"}} />
                        <div className="container_view_curso_contain_info_body">
                            {(listciclocurso != null)?listciclocurso.map((item)=>{
                                return <Viewanaliciclcontenitem label={`Desde ${parsetieme(item.fecha_init)} hasta ${parsetieme(item.fecha_fin)}`} dataac={item} ></Viewanaliciclcontenitem>;
                            }):<></>}
                        </div>
                    </div>
               </ComponentModalPrincipalBody>
        </>
    );
}