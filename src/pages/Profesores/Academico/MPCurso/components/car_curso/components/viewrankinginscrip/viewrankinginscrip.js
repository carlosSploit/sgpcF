import React, { useEffect, useRef, useState } from "react";
import "./style/viewrankinginscrip.css";
import { ComponentModalPrincipalBody } from "../../../../../../../../service/morvius-service/components";
import { FormListchipts } from "../../../../../../../../service/morvius-service/form";
import { Viewrankingestadisticas } from "./components/rankinscripclass/rankinscripclass";
import { Viewrankpuntos } from "./components/rankpuntos/rankpuntos";
// import { getResulTarea } from "../../../../../../../../../../../../../../service/repository/ResulTarea";
// import { Itemcontenrank } from "./components/itemcontenresul/itemcontenresul";
// import { getRankpuntos } from "../../../../../../../../service/repository/ResulTarea";
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

export function Viewrankinginscrip(props){
    let {
        // refaction,
        // onAction = () =>{},
        dataac={
        id_profesor: 0,
        photo:"https://thumbs.dreamstime.com/b/icono-gris-de-perfil-usuario-s%C3%ADmbolo-empleado-avatar-web-y-dise%C3%B1o-ilustraci%C3%B3n-signo-aislado-en-fondo-blanco-191067342.jpg",
        nombre:"",
        correo:"",
        telf:"",
        tipo_trabajador:"",
        pass:""
    }} = props;
    const [listSesion , setlistSesion] = useState([{id:0, name:"Puntos de Interaccion"},{id:1 , name:"Puntos de Tareas"}]);
    const [idseleccionSesion, setidseleccionSesion] = useState(0);
    const listview = [<Viewrankpuntos dataac={dataac}/>,<Viewrankingestadisticas dataac={dataac}/>];
    // const [listresulttarea, setlistresulttarea] = useState(null);
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

    // useEffect(()=>{
    //     (async()=>{
    //         await onListResultTarea();
    //     })();
    // },[]);

    // const onListResultTarea = async () => {
    //     // console.log(dataac);
    //     // let resultinfo = await idinfoinfo();
    //     let result = await getRankpuntos(dataac.id_ciclo_curso);
    //     // console.log(result);
    //     // console.log(resultinfo);
    //     let resultfilter = result;
    //     // console.log(resultfilter);
    //     setlistresulttarea(null);
    //     setTimeout(() => {
    //         setlistresulttarea(resultfilter);
    //     }, 500);
    // }

    const onChangeItems = async (item) =>{
        setidseleccionSesion(item.id);
        // await getpuntclass(idselectInscrip, item.id);
    }

    return (
        <>
            <ComponentModalPrincipalBody>
                <div style={{height:"10px"}} />
                {/* <div className="container_view_tarea_contain_info_url" onClick={()=>{
                    window.open(dataac.urlconte, '_blank');
                }}>
                    {`Presione para visualizar la tarea`}
                </div> */}
                {/* <div style={{height:"10px"}} /> */}
                {/* Descripccion */}
                {/* <div className="container_view_curso_contain_info">
                    <div className="container_view_curso_contain_info_title">Descripccion</div>
                    <div className="container_view_curso_contain_info_body">{dataac.descripc}</div>
                </div> */}
                <div className="container_view_resulttar_contain_info_contain_title">
                    <div className="container_view_resulttar_contain_info_title">Ranking de Inscrito</div>
                </div>
                {(listSesion != null)?<FormListchipts listdatos={listSesion} initvalue={0} onChangeItems={onChangeItems}/> :<></>}
                {listview[idseleccionSesion]}
            </ComponentModalPrincipalBody>
        </>
    );
}