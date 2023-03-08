import React, { useEffect, useRef, useState } from "react";
import "./style/conviewtarea.css";
import { ComponentModalPrincipal,ComponentModalPrincipalHeader,ComponentModalPrincipalBody, ComponentModalPrincipalListtabs, ComponentChipst } from "../../../../../../../../../../../../service/morvius-service/components";
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

export function Conviewtarea(props){
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
    const [ismodalvisible, setismodalvisible] = useState(false);
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
    //         await onlistprofesor();
    //         await ontipocurso();
    //         setiscontentvideo(("<div> No se encuentra ningun video </div>" == dataac.content_video));
    //         setisgratuito((dataac.presio_inscri == 0));
    //     })();
    // },[]);

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     let urlimage = "https://thumbs.dreamstime.com/b/icono-gris-de-perfil-usuario-s%C3%ADmbolo-empleado-avatar-web-y-dise%C3%B1o-ilustraci%C3%B3n-signo-aislado-en-fondo-blanco-191067342.jpg";
        
    //     if(filephoto == null){
    //         // console.log(dataac.photoport);
    //         urlimage = (isurl(dataac.photoport))? dataac.photoport : urlimage;
    //     }

    //     if(filephoto != null){
    //         urlimage = await uploudImage(filephoto);
    //         urlimage = urlimage.data;
    //         urlimage = urlimage[0].url;
    //         console.log(urlimage);
    //     }
    //     //event.preventDefault();
    //     /*
    //         {
    //             "name" : "Lucia graciela",
    //             "telf" : 985796307,
    //             "correo" : "arturo14212000@gmail.com",
    //             "pass" : "univerlucia",
    //             "estudios": "Univercidad Cesar vallerjo",
    //             "photo": "ajkdajldkajsdklasjdlaskjdk"
    //         }
    //     */
    //     let data = {
    //         // "idprof" : parseInt(event.target[`id_prof${dataac.id_curso}`].value),
    //         "idtipcur" : parseInt(event.target[`id_tipocurs${dataac.id_curso}`].value),
    //         "name" : event.target[`name${dataac.id_curso}`].value,
    //         "descr" :  event.target[`desc${dataac.id_curso}`].value,
    //         "alcan" : event.target[`alc${dataac.id_curso}`].value,
    //         //"fech_in" : event.target[`init_fechacurse${dataac.id_curso}`].value,
    //         //"fech_fin" : event.target[`fina_fechacurse${dataac.id_curso}`].value,
    //         //"disdu" : parseInt(event.target[`diadu${dataac.id_curso}`].value),
    //         //"presio": (!isgratuito)?parseFloat(event.target[`pres${dataac.id_curso}`].value):0.0,
    //         "contvid" : (!iscontentvideo)?event.target[`codv${dataac.id_curso}`].value:"<div> No se encuentra ningun video </div>",
    //         "photpo": urlimage
    //     };
    //    let resul = await updatecurso(dataac.id_curso,data);
    //    handleNewNotification(dispatch,resul.messege, resul.status);
    //     setTimeout(() => {
    //             (async()=>{
    //                 await onUpdate();
    //                 console.log(resul);
    //             })();
    //     }, 500);
    // }

    // const oncallbackchange = (file) => {
    //     setfilephoto(file);
    // }

    // const onlistprofesor = async () =>{
    //     let result = await getprofesor();
    //     setlistProfesores(null);
    //     setTimeout(() => {
    //         setlistProfesores(result);
    //     }, 500);
    // }

    // const ontipocurso = async () =>{
    //     let result = await getTipoCurso();
    //     setlistTipCurso(null);
    //     setTimeout(() => {
    //         setlistTipCurso(result);
    //     }, 500);
    // }

    // const onChangeItemslisttipcurso = (item) => {
    //     // setfilephoto(file);
    //     console.log(item);
    // }

    // // const onChangeItemslistprofe = (item) => {
    // //     console.log(item);
    // // }

    // // const onChangeinputgratuito = (stade) => {
    // //     setisgratuito(stade);
    // // }

    // const onChangeiscontentvideo = (stade) => {
    //     setiscontentvideo(stade);
    // }

    // const listOpt = [
    //     {
    //         id: 0,
    //         label : "Editar curso"
    //     },
    //     {
    //         id: 1,
    //         label : "Contenidos"
    //     }
    //     ,
    //     {
    //         id: 2,
    //         label : "Inscritos"
    //     }
    // ];

    //<EditCurso onUpdate={onAction} dataac={dataac}/>, <ViewCicloCurso onUpdate={onAction} dataac={dataac} />
    // const listview = [<EditCurso onUpdate={onAction} dataac={dataac}/>, <ViewContenCurso onUpdate={onAction} dataac={dataac}/>, <Viewlistinscripalm  onUpdate={onAction} dataac={dataac}/> ];

    // const onChangeindex = (index,titletab) => {
    //     setindex(index);
    // }

    return (
        <>
            <div ref={refaction} onClick={ async ()=>{
                setismodalvisible(true);
            }}>
            </div>
            <ComponentModalPrincipal  statemode={ismodalvisible} onClosechange={()=>{setismodalvisible(false);}}>
                <ComponentModalPrincipalHeader title={`${dataac.nombre}`} onClosechange={()=>{setismodalvisible(false)}} >
                </ComponentModalPrincipalHeader>
                {/* <ComponentModalPrincipalHeader title="Mantenimiento del taller" onClosechange={()=>{setismodalvisible(false)}} /> */}
                {/* <ComponentModalPrincipalListtabs
                    listOptions = {listOpt}
                    onChangeindex = {onChangeindex}
                    chaindexselect = {index}
                    chasetindexselect = {setindex}
                    indexinitial = {listOpt[0].id}
                ></ComponentModalPrincipalListtabs> */}
                {/* {listview[index]} */}
                <ComponentModalPrincipalBody>
                    <div style={{height:"10px"}} />
                    <div className="container_view_tarea_contain_info_url" onClick={()=>{
                        window.open(dataac.urlconte, '_blank');
                    }}>
                        {`Presione para visualizar la tarea`}
                    </div>
                    <div style={{height:"10px"}} />
                    {/* Descripccion */}
                    <div className="container_view_curso_contain_info">
                            <div className="container_view_curso_contain_info_title">Descripccion</div>
                            <div className="container_view_curso_contain_info_body">{dataac.descripc}</div>
                    </div>
                </ComponentModalPrincipalBody>
            </ComponentModalPrincipal>
        </>
    );
}