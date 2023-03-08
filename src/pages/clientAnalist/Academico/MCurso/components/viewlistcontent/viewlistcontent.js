import React, { useEffect, useRef, useState } from "react";
import "./style/viewlistcontent.css";
import { ComponentModalPrincipal,ComponentModalPrincipalHeader,ComponentModalPrincipalBody, ComponentModalPrincipalFooter, ComponentBotton } from "../../../../../../service/morvius-service/components";
import { Viewcontenitem } from "./components/viewcontenitem/viewcontenitem";
// import { getprofesor } from "../../../../../../service/repository/Profesor";
// import { getTipoCurso } from "../../../../../../service/repository/TipoCurso";
// import { ComponentChipst } from "../../../../../../service/morvius-service/components";
// import { ComponentItemSecion } from "../../../../../../service/morvius-service/component/components";
// import { getSesion } from "../../../../../../service/repository/Sesion";
// import { Addciclocurso } from "./components/addciclocurso/addciclocurso";
import { getciclocurso_curso } from "../../../../../../service/repository/CicloCurso";
import { ForminputComboBox } from "../../../../../../service/morvius-service/form";
import { getlistinscripalum } from "../../../../../../service/repository/Inscripcc";
import { getSesion } from "../../../../../../service/repository/Sesion";

export function Viewlistcontent(props){
    let {
        refAction,
        // onUpdate = () =>{},
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
    const [listsesion , setlistsesion] = useState(null);
    const [indexciclcur, setindexcilcur] = useState(0);
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

    const ciclo_cursoactive = (array = []) => {
        // console.log(array);
        let listdata = array.filter((item)=>{
            return item.estado == 1;
        });
        if(listdata.length == 0) return array[(array.length - 1)];
        return listdata[0];
    }

    useEffect(()=>{
        (async()=>{
            let result = await onlistciclocurso();
            // console.log(result);
            const objintindex = ciclo_cursoactive(result);
            // console.log(objintindex);
            setindexcilcur(objintindex.id_ciclo_curso);
            await onlistsesion(objintindex.id_ciclo_curso);
        })();
    },[]);

    const onlistciclocurso = async () =>{
        let result = await getciclocurso_curso(dataact.id_curso);
        setlistciclocurso(null);
        if (result.length != 0){
            //result = result.sort();
            setlistciclocurso(result);
        }
        return result;
        // setTimeout(() => {
        //     if (result.length != 0){
        //         //result = result.sort();
        //         setlistciclocurso(result);
        //     }
        // }, 500);
    }

    const onlistsesion = async (id_clicurs=-1) =>{
        // console.log()
        let result = await getSesion((id_clicurs == -1)?indexciclcur:id_clicurs);
        setlistsesion(null);
        setTimeout(() => {
            // console.log(result);
            if (result.length != 0){
                setlistsesion(result);
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

    const onChangeinput = async(json)=>{
        setindexcilcur(json.value);
        await onlistsesion(json.value);
        //console.log(listsesion);
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
                        <div className="container_view_curso_contain_info_title">Contenidos del curso</div>
                        {(listciclocurso != null)?<ForminputComboBox valueInit={indexciclcur} onChangeinput = {onChangeinput} datacombo = {listciclocurso.map((item)=>{
                            return {
                                id: item.id_ciclo_curso,
                                label: `${parsetieme(item.fecha_init)}`
                            }
                        })}/>:<></>}
                        {/* <Addciclocurso dataac={dataact} onAction={onlistciclocurso} ></Addciclocurso> */}
                    </div>
                    <div style={{height:"10px"}} />
                    <div className="container_view_curso_contain_info_body">
                        {(listsesion != null)?listsesion.map((item)=>{
                            // onclickActionbasic={onlistciclocurso} onClickActions={onlistciclocurso}
                            return <Viewcontenitem label={`${item.nombre}`} dataac={item} ></Viewcontenitem>;
                        }):<></>}
                    </div>
                </div>
            </ComponentModalPrincipalBody>
        </>
    );
}