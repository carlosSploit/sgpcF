import React, { useEffect, useRef, useState } from "react";
import "./style/addSeccion.css";
import { addSesion } from "../../../../../../../../service/repository/Sesion";
import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import { ComponentBotton,
         ComponentModalFloting,
         ComponentModalFlotingHeader,
         ComponentModalFlotingBody } from "../../../../../../../../service/morvius-service/components";
import { Forminput,ForminputBottonSubmit, ForminputDatetoDate, Forminputnumber, ForminputRadioSlice, FormListchipts} from "../../../../../../../../service/morvius-service/form";
import { getprofesor } from "../../../../../../../../service/repository/Profesor";
import { addciclocurso } from "../../../../../../../../service/repository/CicloCurso";
import { handleNewNotification, useNotification } from "../../../../../../../../service/Notifications/useNotificacion";

export function Addciclocurso(props){
    const { onAction=()=>{},dataac={id_curso:0} } = props;
    const [ismodalvisible, setismodalvisible] = useState(false);
    const [itemselet, setitemselet] = useState(null);
    // const [listTipoCurso, setlistTipoCurso] = useState(null);
    const [listProfesores, setlistProfesores] = useState(null);
    const [isgratuito , setisgratuito] = useState(false);
    // controladores de contenido inputs
    let [textdiasdura, settextdiasdura] = useState("");
    let [textpresio, settextpresio] = useState("");
    let [itemselectprof, setitemselectprof] = useState("");
    const dispatch = useNotification();

    useEffect(()=>{
        (async()=>{
            await onlistprofesor();
        })();
    },[]);

    const onlistprofesor = async () =>{
        let result = await getprofesor();
        setlistProfesores(null);
        setTimeout(() => {
            setlistProfesores(result);
        }, 500);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = {
            "idprof" : parseInt(event.target.id_prof.value),
            "idcurso" : dataac.id_curso,
            "fech_in" : event.target.init_fechacurse.value,
            "fech_fin" : event.target.fina_fechacurse.value,
            "disdu" : parseInt(event.target.diadu.value),
            "presio": (!isgratuito)?parseFloat(event.target.pres.value):0.0
        };
        let resul = await addciclocurso(data);
        handleNewNotification(dispatch,resul.messege, resul.status);
        setTimeout(() => {
                (async()=>{
                    console.log(resul);
                    limpiarcastillas();
                    await onAction();
                })();
        }, 500);
    }

    const limpiarcastillas = ()=>{
        //userefTipoC.current.value = "";
        //setitemselet(null);
        setitemselet(null);
        //setlistTipoCurso(null);
        settextdiasdura("");
        settextpresio("");
        setitemselectprof(listProfesores[0].id_profesor);
    }

    // const listarTipoCurso = async ()=>{
    //     // recargar datos
    //     let result = await getTipoCurso();
    //     setlistTipoCurso(null);
    //     setTimeout(()=>{
    //         setlistTipoCurso(result);
    //     },1000);
    // }

    const onChangeItemslistprofe = (item) => {
        console.log(item);
    }

    const onChangeinputgratuito = (stade) => {
        setisgratuito(stade);
    }

    return (
        <>
           <ComponentBotton isInvertColor={true} label={"Add.ciclo"} onChange={()=>{setismodalvisible(true);}} />
           <ComponentModalFloting statemode={ismodalvisible} onClosechange={()=>{setismodalvisible(false);limpiarcastillas();}}>
               <ComponentModalFlotingHeader title="Insertar un ciclo de curso" onClosechange={()=>{setismodalvisible(false);limpiarcastillas();}} />
               <ComponentModalFlotingBody descripccion={"Selecciona el profesor, ingresa los dias de duracion, la fecha de inicio y de fin, y el precio del ciclo del curso."}>
               <form
                    style={{
                        margin: "0",
                        padding: "0",
                        width: "100%"
                    }}
                    layout="vertical"
                    onSubmit={handleSubmit}
                    onFinich
                    autoComplete="off"
                >
                    <div style={{height:"20px"}}></div>
                    {/* ingresar datos */}
                    <div className="container_curso_subtitle">
                        Selecciona el profesor: 
                    </div>
                    {(listProfesores != null)?<FormListchipts idstate={itemselectprof} setidstate={setitemselectprof} keyname={"id_prof"} keyimage={"photo"} keyitem={"id_profesor"} keytitle={"nombre"} listdatos={listProfesores}
                    initvalue={listProfesores[0].id_profesor} isimage={true} isActionChips = {false} onChangeItems={onChangeItemslistprofe}/>:<></>}
                    {/* ingresar datos */}
                    {/* apace cuando no se a seleccionado nada */}
                    {/* <Forminput textinput={textsesion} settextinput={settextsesion} placeHolder="sesion" keyname ={"sesion"}/> */}
                    {/* Ingresar tiempos */}
                    <div className="container_curso_subtitle">
                        Selecciona el tiempo de inicio y de fin:
                    </div>
                    <div style={{height:"10px"}}></div>
                    <div className="container_curso_date_container">
                        <ForminputDatetoDate keyname ={"fechacurse"}/>
                    </div>
                    <div style={{height:"10px"}}></div>
                    <Forminputnumber textinput={textdiasdura} settextinput={settextdiasdura} placeHolder="Dias de duracion" keyname ={"diadu"}/>
                    <div style={{height:"10px"}}></div>
                    <ForminputRadioSlice onChangeinput={onChangeinputgratuito} label={"El taller es en modo gratuito"} keyname ={"pass"}/>
                    {(!isgratuito)?<Forminputnumber textinput={textpresio} settextinput={settextpresio} placeHolder="Precio" keyname ={"pres"}/>:<></>}
                    <ForminputBottonSubmit />
                </form>
               </ComponentModalFlotingBody>
           </ComponentModalFloting>
        </>
    );
}