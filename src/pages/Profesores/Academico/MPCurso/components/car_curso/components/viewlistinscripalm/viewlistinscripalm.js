import React, { useEffect, useState } from "react";
import "./style/viewlistinscripalm.css";
import { ComponentModalPrincipalBody } from "../../../../../../../../service/morvius-service/components";
import { Viewcontenitem } from "./components/viewcontenitem/viewcontenitem";
// import { getprofesor } from "../../../../../../service/repository/Profesor";
// import { getTipoCurso } from "../../../../../../service/repository/TipoCurso";
// import { ComponentChipst } from "../../../../../../service/morvius-service/components";
// import { ComponentItemSecion } from "../../../../../../service/morvius-service/component/components";
// import { getSesion } from "../../../../../../service/repository/Sesion";
// import { Addciclocurso } from "./components/addciclocurso/addciclocurso";
// import { getciclocurso_curso } from "../../../../../../../../service/repository/CicloCurso";
// import { ForminputComboBox } from "../../../../../../../../service/morvius-service/form";
import { getlistinscripalum } from "../../../../../../../../service/repository/Inscripcc";

export function Viewlistinscripalm(props){
    let {
        // refAction,
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
    const [listlistalumn , setlistlistalumn] = useState(null);
    const [indexciclcur, setindexcilcur] = useState(0);

    useEffect(()=>{
        (async()=>{
            console.log("recarga")
            // let result = await onlistciclocurso();
            // // console.log(result);
            // const objintindex = ciclo_cursoactive(result);
            // // console.log(objintindex);
            setindexcilcur(dataact.id_ciclo_curso);
            await onlistinscripalumn(dataact.id_ciclo_curso);
        })();
    },[]);

    // const onlistciclocurso = async () =>{
    //     let result = await getciclocurso_curso(dataact.id_curso);
    //     setlistciclocurso(null);
    //     if (result.length != 0){
    //         //result = result.sort();
    //         setlistciclocurso(result);
    //     }
    //     return result;
    //     // setTimeout(() => {
    //     //     if (result.length != 0){
    //     //         //result = result.sort();
    //     //         setlistciclocurso(result);
    //     //     }
    //     // }, 500);
    // }

    const onlistinscripalumn = async (id_clicurs=-1) =>{
        // console.log()
        let result = await getlistinscripalum((id_clicurs == -1)?indexciclcur:id_clicurs);
        setlistlistalumn(null);
        setTimeout(() => {
            console.log(result);
            if (result.length != 0){
                setlistlistalumn(result);
            }
        }, 500);
    }

    // const onlistciclocursobaseic = async () =>{
    //     let result = await getSesion(dataact.id_curso);
    //     if (result.length != 0){
    //         setlistciclocurso(result);
    //     }
    // }

    // const parsetieme = (date = "") =>{
    //     let objdate = new Date(date);
    //     //console.log(`${objdate.getUTCFullYear()}/${objdate.getUTCMonth()}/${objdate.getUTCDay()}`);
    //     return objdate.toISOString().slice(0, 10);
    // }

    // const onChangeinput = async(json)=>{
    //     setindexcilcur(json.value);
    //     await onlistinscripalumn(json.value);
    //     //console.log(listlistalumn);
    // }

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
                {(listlistalumn != null)?<div className="container_view_curso_contain_info">
                    <div className="container_view_curso_contain_info_contain_title">
                        <div className="container_view_curso_contain_info_title">Inscritos al curso</div>
                        {/* {(listciclocurso != null)?<ForminputComboBox valueInit={indexciclcur} onChangeinput = {onChangeinput} datacombo = {listciclocurso.map((item)=>{
                            return {
                                id: item.id_ciclo_curso,
                                label: `${parsetieme(item.fecha_init)}`
                            }
                        })}/>:<></>} */}
                        {/* <Addciclocurso dataac={dataact} onAction={onlistciclocurso} ></Addciclocurso> */}
                    </div>
                    <div style={{height:"10px"}} />
                    <div className="container_view_curso_contain_info_body">
                        {(listlistalumn != null)?listlistalumn.map((item)=>{
                            // onclickActionbasic={onlistciclocurso} onClickActions={onlistciclocurso}
                            return <Viewcontenitem label={`${item.nombre}`} dataac={item} ></Viewcontenitem>;
                        }):<></>}
                    </div>
                </div>:<div className="container_view_curso_contain_info">
                    <div className="container_view_curso_contain_info_contain_title">
                        <div className="container_view_curso_contain_info_title">Inscritos al curso</div>
                    </div>
                    <div style={{height:"10px"}} />
                    <div>No presenta ningun inscrito en este ciclo del curso.</div>
                </div>}
                
            </ComponentModalPrincipalBody>
        </>
    );
}