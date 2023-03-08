import React, { useEffect, useRef, useState } from "react";
import "./style/viewInsteraccion.css";
import { ComponentModalPrincipalBody } from "../../../../../../../../service/morvius-service/components";
// import { Viewcontenitem } from "./components/viewcontenitem/viewcontenitem";
import ComponentItemPuntosClass from "../../../../../../components/itempuntosclass/itempuntosclass";
// import { getprofesor } from "../../../../../../../../service/repository/Profesor";
// import { getTipoCurso } from "../../../../../../../../service/repository/TipoCurso";
// import { ComponentChipst } from "../../../../../../../../service/morvius-service/components";
// import { ComponentItemSecion } from "../../../../../../../../service/morvius-service/component/components";
import { getSesion } from "../../../../../../../../service/repository/Sesion";
import { ForminputSelectItem, FormListchipts } from "../../../../../../../../service/morvius-service/form";
import { getlistinscripalum } from "../../../../../../../../service/repository/Inscripcc";
import { getInscripPointoSesion } from "../../../../../../../../service/repository/inscripuntosclass";
// import { AddSesion } from "./components/addsesion/addSeccion";

export function ViewInteracion(props){
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
    // listas de listchips de profesores y cursos
    const [listSesion , setlistSesion] = useState([]);
    const [listlistalumn , setlistlistalumn] = useState([]);
    const [idselectInscrip, setidselectInscrip] = useState(-1);
    const [idseleccionSesion, setidseleccionSesion] = useState(0);
    const [filterlistdatapuntclass, setfilterlistdatapuntclass] = useState([]);

    useEffect(()=>{
        (async()=>{
            await onlistSesion();
            await getinscrit();
        })();
    },[]);

    const onlistSesion = async () =>{
        let result = await getSesion(dataact.id_ciclo_curso);
        setlistSesion(null);
        setTimeout(() => {
            if (result.length != 0){
                let data = result.map((item)=>{
                    // console.log(item);
                    return {id:item.id_sesion, name:item.nombre};
                })
                setlistSesion(data);
            }
        }, 500);
    }

    // const onlistSesionbaseic = async () =>{
    //     let result = await getSesion(dataact.id_ciclo_curso);
    //     if (result.length != 0){
    //         setlistSesion(result);
    //     }
    // }

    // const parsetieme = (date = "") =>{
    //     let objdate = new Date(date);
    //     //console.log(`${objdate.getUTCFullYear()}/${objdate.getUTCMonth()}/${objdate.getUTCDay()}`);
    //     return objdate.toISOString().slice(0, 10);
    // }

    // --------------------------------------------------------------------------------------------- Seleccionar los items

    const getinscrit = async ()=>{
        let result = await getlistinscripalum(dataact.id_ciclo_curso);
        setlistlistalumn(null);
        setTimeout(() => {
            console.log(result);
            if (result.length != 0){
                let data = result.map((item)=>{
                    return {
                        id: item.id_inscrip,
                        name: item.nombre,
                        photo: item.photo
                    };
                });
                console.log(data);
                setlistlistalumn(data);
            }
        }, 500);
    }

    const onSelectItem = async (json) => {
        setidselectInscrip(json.id);
        await getpuntclass(json.id, idseleccionSesion);
    }

    const onChangeItems = async (item) =>{
        setidseleccionSesion(item.id);
        await getpuntclass(idselectInscrip, item.id);
    }

    const getpuntclass = async (id_Inscrip = 0, id_sesion = 0) => {
        let resul = await getInscripPointoSesion((id_sesion == 0)?idseleccionSesion:id_sesion , (id_Inscrip == 0)?idselectInscrip:id_Inscrip);
        // setlistdatapuntclass([]);
        setfilterlistdatapuntclass([]);
        setTimeout(()=>{
            // setlistdatapuntclass(resul);
            setfilterlistdatapuntclass(resul);
            // console.log(resul);
        },500);
    }

    return (
        <>
            <ComponentModalPrincipalBody>
                <div style={{height:"10px"}} />
                {/* Sesiones a Tocar */}
                {(listlistalumn != null)?<div className="container_view_curso_contain_info">
                    <div className="container_view_curso_contain_info_contain_title">
                        <div className="container_view_curso_contain_info_title">Interacciones</div>
                    </div>
                    <div style={{height:"10px"}} />
                    <div className="container_view_curso_contain_description_body">Selecciona al alumno inscrito para conocer su interaccion:</div>
                    <div style={{height:"10px"}} />
                    {((listlistalumn != null)?(listlistalumn.length > 0):false)?<ForminputSelectItem nameTitle={"Selecciona el Inscrito"} listaObj={listlistalumn} keyname={"selestInscrip"} checkbox={idselectInscrip} setcheckbox={setidselectInscrip} onChangeinput={onSelectItem} />:<></>}
                    {(listSesion != null)?<FormListchipts listdatos={listSesion} initvalue={0} onChangeItems={onChangeItems}/> :<></>}
                    <div style={{height:"10px"}} />
                    <div className="container_view_puntinscriclass_body">
                        {(filterlistdatapuntclass != null)? filterlistdatapuntclass.map((item)=>{
                            console.log(item);
                            return (<ComponentItemPuntosClass  
                                        id_puntos = {item.id_tipo_puntos} 
                                        name = {item.nombre} 
                                        value = {item.value_point}
                                        pointstotal = {item.suma}
                                        photo = {item.photo} />);
                        }):<></>}
                    </div>
                </div>:<div className="container_view_curso_contain_info">
                    <div className="container_view_curso_contain_info_contain_title">
                        <div className="container_view_curso_contain_info_title">Interacciones</div>
                    </div>
                    <div style={{height:"10px"}} />
                    <div className="container_view_curso_contain_description_body">No Se puede ver las interacciones ya que no se presenta ningun alumnos.</div>
                </div>}
                
            </ComponentModalPrincipalBody>
        </>
    );
}