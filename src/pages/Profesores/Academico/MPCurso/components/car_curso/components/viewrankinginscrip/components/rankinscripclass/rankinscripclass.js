import React, { useEffect, useRef, useState } from "react";
// import "./conviewtarea.css";
// import { ComponentModalPrincipalBody } from "../../../../../../../../service/morvius-service/components";
// import { getResulTarea } from "../../../../../../../../../../../../../../service/repository/ResulTarea";
// import { Itemcontenrank } from "../itemcontenresul/itemcontenresul";
import { getRankpuntos } from "../../../../../../../../../../service/repository/ResulTarea";
import { ComponentRanking } from "../../../../../../../../../../service/morvius-service/components";
import { analiicas_ciclo_curso_sincrono_notas } from "../../../../../../../../../../service/repository/Analiticas";
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

export function Viewrankingestadisticas(props){
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
    const [listresulttarea, setlistresulttarea] = useState([]);
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
            await onListResultTarea();
        })();
    },[]);

    const onListResultTarea = async () => {
        // console.log(dataac);
        // let resultinfo = await idinfoinfo();
        let result = await analiicas_ciclo_curso_sincrono_notas(dataac.id_ciclo_curso);
        // console.log(result);
        // console.log(resultinfo);
        let resultfilter = result.map((item)=>{
            return {
                position: item.puesto,
                name: item.nombre,
                photo: item.photo,
                punto: item.point
            };
        });
        // console.log(resultfilter);
        setlistresulttarea([]);
        setTimeout(() => {
            setlistresulttarea(resultfilter);
        }, 500);
    }

    return (
        <>
            <div style={{height: "5px"}} />
            {(listresulttarea.length != 0)?<ComponentRanking  listdata = {listresulttarea}/>:<></>}
            {/* {
                (listresulttarea != null)?
                listresulttarea.map((item)=>{
                    return <Itemcontenrank onClickActions={onListResultTarea} dataac={item} label={item.nombre} />
                }):<></>
            } */}
        </>
    );
}