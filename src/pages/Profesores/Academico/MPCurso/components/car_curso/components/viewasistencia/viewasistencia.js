import React, { useEffect, useState } from "react";
import "./style/viewasistencia.css";
import { ComponentBotton, ComponentModalPrincipalBody } from "../../../../../../../../service/morvius-service/components";
// import { getResulTarea } from "../../../../../../../../../../../../../../service/repository/ResulTarea";
import { ItemAsistem } from "./components/itemcontenasisten/itemcontenasisten";
// import { getRankpuntos } from "../../../../../../../../service/repository/ResulTarea";
import { FormListchipts } from "../../../../../../../../service/morvius-service/form";
import { addApertasisten, deleteAsisten, getApertasisten, getAsistenInscrip } from "../../../../../../../../service/repository/Asistencia";
import { handleNewNotification, useNotification } from "../../../../../../../../service/Notifications/useNotificacion";
import { getSesion } from "../../../../../../../../service/repository/Sesion";
// import { Forminput,
//     Forminputnumber, Forminputmail,
//     Forminputpassword,
//     ForminputImageCircle,ForminputBottonSubmit, ForminputRadioSlice, ForminputArea, FormListchipts, ForminputImageRectangle, ForminputDatetoDate} from "../../../../../../service/morvius-service/form";
// import { EditOutlined } from "@ant-design/icons";
// import {updateprofe} from "../../../../../../service/repository/Profesor";
// import { updatecurso } from "../../../../../../service/repository/Curso";
// import {uploudImage} from "../../../../../../service/repository/uploudimage";
// import { getprofesor } from "../../../../../../service/repository/Profesor";
// import { getTipoCurso } from "../../../../../../service/repository/TipoCurso";
// import { Carcurso } from "../car_curso/car_curso";
// import { EditCurso } from "../editcurso/editcurso";
// import { handleNewNotification, useNotification } from "../../../../../../../../service/Notifications/useNotificacion";
// import { ViewContenCurso } from "../viewcontcurso/viewcurso";
// import { Viewlistinscripalm } from "../viewlistinscripalm/viewlistinscripalm";
// import { ViewCicloCurso } from "../viewciclocurso/viewciclocurso";

export function Viewasistencia(props){
    let {
        refaction,
        onAction = () =>{},
        dataac={
        id_profesor: 0,
        photo:"https://thumbs.dreamstime.com/b/icono-gris-de-perfil-usuario-s%C3%ADmbolo-empleado-avatar-web-y-dise%C3%B1o-ilustraci%C3%B3n-signo-aislado-en-fondo-blanco-191067342.jpg",
        nombre:"",
        correo:"",
        telf:"",
        tipo_trabajador:"",
        pass:""
    }} = props;
    const [listinscripasiste, setlistinscripasiste] = useState(null);
    const [listapertuasis, setlistapertuasis] = useState(null);
    const [indexciclcur,setindexcilcur] = useState(0);
    // capturar las seciones
    const [idseleccionSesion, setidseleccionSesion] = useState(0);
    const [listSesion , setlistSesion] = useState([]);
    // estado de agregar las asistencias
    const [isagregarsesion, setisagregarsesion] = useState(true);
    const dispatch = useNotification();
    // const [ismodalvisible, setismodalvisible] = useState(false);
    // const [filephoto, setfilephoto] = useState(null);
    // const [isgratuito , setisgratuito] = useState(false);
    // const [iscontentvideo , setiscontentvideo] = useState(false);
    // listas de listchips de profesores y cursos
    // const [listProfesores, setlistProfesores] = useState(null);
    // const [listTipCurso, setlistTipCurso] = useState(null);
    // const [index,setindex] = useState(0);
    // const dispatch = useNotification();

    // const isurl = (url="") =>{
    //     // console.log(url);
    //     let arraysplit = url.split("://");
    //     // console.log(arraysplit);
    //     if (arraysplit.length == 1) return false;
    //     if ((arraysplit[0] != "https") && (arraysplit[0] != "http")) return false;
    //     return true;
    // }

    useEffect(()=>{
        (async()=>{
            // carga las seciones
            let datasesion = await onlistSesion();
            // capturar la primera pencion
            if(datasesion.length != 0){
                // setindexcilcur(result[result.length - 1].id_asisten);
                setidseleccionSesion(datasesion[0].id_sesion);
                // await onlistinscripasiste(result[result.length - 1].id_asisten);
            }
            // captura se se puede agregar una nueva asistencia a esa secion o no
            let result = await valuesesion_of_listapertuasis(datasesion[0].id_sesion);
            setisagregarsesion(result);
        })();
    },[]);
    //------------------------------------------------------------------------------------- Captura las sesiones
    const onlistSesion = async () =>{
        let result = await getSesion(dataac.id_ciclo_curso);
        setlistSesion(null);
        setTimeout(() => {
            if (result.length != 0){
                let data = result.map((item)=>{
                    // console.log(item);
                    return {id:item.id_sesion, name:item.nombre};
                });
                setlistSesion(data);
            }
        }, 500);
        return result;
    }
    //------------------------------------------------------------------------------------- Verifica si se aperturo en una sesion una asistencia
    const onlistapertuasis = async (id_sesion) => {
        let result = await getApertasisten(dataac.id_ciclo_curso);
        let dataitem = result.filter((item)=>{
            return item.id_sesion == id_sesion;
        });
        return dataitem;
    }
    
    const valuesesion_of_listapertuasis = async (id_sesion = 0) =>{
        // console.log(result);
        let dataitem = await onlistapertuasis(id_sesion);
        return dataitem.length == 0;
    }
    //------------------------------------------------------------------------------------- Agrega una asistencia en una sesion 
    const onaddapertureassi = async () =>{
        // console.log(dataac.id_ciclo_curso);
        let jsondata = {
            "id_sesion" : idseleccionSesion,
            "id_ciclocur" : dataac.id_ciclo_curso
        }
        let resul = await addApertasisten(jsondata);
        handleNewNotification(dispatch,resul.messege, resul.status);
        setTimeout(() => {
            (async()=>{
                await onlistinscripasiste(idseleccionSesion);
                if(resul.status == 200) setisagregarsesion(false);
                //await onlistapertuasis();
            })();
        }, 1000);
    }
    //------------------------------------------------------------------------------------- Listar las asistencias de los inscritos
    const onlistinscripasiste = async (id_sesion = 0) => {
        // console.log(dataac);
        // let resultinfo = await idinfoinfo();
        let listsesionasisten = await onlistapertuasis(id_sesion);
        if (listsesionasisten.length == 0) {
            setlistinscripasiste(null);
            return;
        }
        let idasistencia = (Array.isArray(listsesionasisten)?listsesionasisten[0].id_asisten: 0);
        console.log(idasistencia);
        let result = await getAsistenInscrip(idasistencia);
        console.log(result);
        // console.log(result);
        // console.log(resultinfo);
        let resultfilter = result;
        // console.log(resultfilter);
        setlistinscripasiste(null);
        setTimeout(() => {
            setlistinscripasiste(resultfilter);
        }, 500);
    }

    const onChangeItems = async (item) =>{
        setidseleccionSesion(item.id);
        let result = await valuesesion_of_listapertuasis(item.id);
        setisagregarsesion(result);
        await onlistinscripasiste(item.id);
        // await getpuntclass(idselectInscrip, item.id);
    }

    const ondelectasistencia = async () =>{
        // deleteAsisten
        if(idseleccionSesion == 0){
            handleNewNotification(dispatch, "Selecciona la secion a eliminar la asistencia", 404);
            return;
        }
        let id_sesion = idseleccionSesion;
        let resul = await deleteAsisten(id_sesion);
        handleNewNotification(dispatch,resul.messege, resul.status);
        setTimeout(() => {
            (async()=>{
                // await onlistinscripasiste();
                setlistinscripasiste(null);
                if(resul.status == 200) setisagregarsesion(true);
                //await onlistapertuasis();
            })();
        }, 1000);
    }

    return (
        <>
            <ComponentModalPrincipalBody>
                <div style={{height:"10px"}} />
                <div className="container_view_resulttar_contain_info_contain_title">
                    <div className="container_view_resulttar_contain_info_title">Asistencia</div>
                    {(isagregarsesion)?<ComponentBotton isInvertColor={true} label={"Aperturar"} onChange={onaddapertureassi} />:<></>}
                    {(!isagregarsesion)?<ComponentBotton isInvertColor={true} label={"Eliminar"} onChange={ondelectasistencia} />:<></>}
                </div>
                <div style={{height: "10px"}} />
                {(listSesion != null)?<FormListchipts listdatos={listSesion} initvalue={0} onChangeItems={onChangeItems} idstate={idseleccionSesion} setidstate={setidseleccionSesion} /> :<></>}
                {/* <div style={{height: "10px"}} /> */}
                <div className="container_view_resulttar_contain_info_contain_title">
                    <div className="container_view_resulttar_contain_info_descrip">Lista de asistencia de los inscritos:</div>
                </div>
                <div style={{height: "20px"}} />
                {
                    (idseleccionSesion == 0)?<div className="container_view_resulttar_contain_info_descrip">Selecciona una sesion para listar las asistencias</div>:
                    ((listinscripasiste != null)?
                    listinscripasiste.map((item)=>{
                        return <ItemAsistem onClickActions={async ()=>{
                            await onlistinscripasiste(idseleccionSesion);
                        }} dataac={item} label={item.nombre} />
                    }):<div className="container_view_resulttar_contain_info_descrip">No presenta una asistencia activa en esta sesion</div>)
                    
                }
            </ComponentModalPrincipalBody>
        </>
    );
}