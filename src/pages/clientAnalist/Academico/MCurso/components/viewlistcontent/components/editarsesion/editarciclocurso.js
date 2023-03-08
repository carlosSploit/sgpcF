import React, { useEffect, useRef, useState } from "react";
import "./style/editarciclocurso.css";
import { addSesion, updatSesion } from "../../../../../../../../service/repository/Sesion";
import { ComponentModalFloting,
         ComponentModalFlotingHeader,
         ComponentModalFlotingBody } from "../../../../../../../../service/morvius-service/components";
import { Forminput,ForminputBottonSubmit, ForminputDatetoDate, Forminputnumber, ForminputRadioSlice, FormListchipts} from "../../../../../../../../service/morvius-service/form";
import { getprofesor } from "../../../../../../../../service/repository/Profesor";
import { updateciclocurso } from "../../../../../../../../service/repository/CicloCurso";
import { handleNewNotification, useNotification } from "../../../../../../../../service/Notifications/useNotificacion";

export function Editarciclocurso(props){
    const { onAction=()=>{},dataac={id_sesion:0}, refid } = props;
    const [ismodalvisible, setismodalvisible] = useState(false);
    const [listProfesores, setlistProfesores] = useState(null);
    const [isgratuito , setisgratuito] = useState(false);
    // controladores de contenido inputs
    let [textdiasdura, settextdiasdura] = useState("");
    let [textpresio, settextpresio] = useState("");
    const dispatch = useNotification();
    // controladores de contenido inputs
    // let [textsesion, settextsesion] = useState("");

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
        let resul = await updateciclocurso(dataac.id_ciclo_curso,data);
        handleNewNotification(dispatch,resul.messege, resul.status);
        setTimeout(() => {
                (async()=>{
                    console.log(resul);
                    await onAction();
                })();
        }, 500);
    }

    // const limpiarcastillas = ()=>{
    //     //userefTipoC.current.value = "";
    //     //setitemselet(null);
    //     setitemselet(null);
    //     //setlistTipoCurso(null);
    //     settextsesion("");
    // }

    const onChangeItemslistprofe = (item) => {
        console.log(item);
    }

    const onChangeinputgratuito = (stade) => {
        setisgratuito(stade);
    }

    const parsetieme = (date = "") =>{
        let objdate = new Date(date);
        //console.log(`${objdate.getUTCFullYear()}/${objdate.getUTCMonth()}/${objdate.getUTCDay()}`);
        return objdate.toISOString().slice(0, 10);
    }

    return (
        <>
           <div ref={refid} onClick={()=>{
               
               setismodalvisible(true);
            //    settextsesion(dataac.nombre);
            }} />
           {/* <ComponentBotton isInvertColor={true} label={"Add.sesion"} onChange={()=>{setismodalvisible(true);}} /> */}
           <ComponentModalFloting statemode={ismodalvisible} onClosechange={()=>{setismodalvisible(false);}}>
               <ComponentModalFlotingHeader title="Insertar una sesion" onClosechange={()=>{setismodalvisible(false);}} />
               <ComponentModalFlotingBody descripccion={"Ingrese el nombre de la secion de forma correcta"}>
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
                    {(listProfesores != null)?<FormListchipts keyname={"id_prof"} keyimage={"photo"} keyitem={"id_profesor"} keytitle={"nombre"} listdatos={listProfesores}
                    initvalue={dataac.id_profesor} isimage={true} isActionChips = {false} onChangeItems={onChangeItemslistprofe}/>:<></>}
                    {/* ingresar datos */}
                    {/* apace cuando no se a seleccionado nada */}
                    {/* <Forminput textinput={textsesion} settextinput={settextsesion} placeHolder="sesion" keyname ={"sesion"}/> */}
                    {/* Ingresar tiempos */}
                    <div className="container_curso_subtitle">
                        Selecciona el tiempo de inicio y de fin:
                    </div>
                    <div style={{height:"10px"}}></div>
                    <div className="container_curso_date_container">
                        <ForminputDatetoDate valueInitInicial={parsetieme(dataac.fecha_init)} valueInitFinal={parsetieme(dataac.fecha_fin)} keyname ={"fechacurse"}/>
                    </div>
                    <div style={{height:"10px"}}></div>
                    <Forminputnumber valueInit={dataac.dias_durac} textinput={textdiasdura} settextinput={settextdiasdura} placeHolder="Dias de duracion" keyname ={"diadu"}/>
                    <div style={{height:"10px"}}></div>
                    <ForminputRadioSlice valueInit={(dataac.presio_inscri == 0)} onChangeinput={onChangeinputgratuito} label={"El taller es en modo gratuito"} keyname ={"pass"}/>
                    {(!isgratuito)?<Forminputnumber valueInit={dataac.presio_inscri} textinput={textpresio} settextinput={settextpresio} placeHolder="Precio" keyname ={"pres"}/>:<></>}
                    <ForminputBottonSubmit />
                    {/* <ForminputBottonSubmit /> */}
                </form>
               </ComponentModalFlotingBody>
           </ComponentModalFloting>
        </>
    );
}