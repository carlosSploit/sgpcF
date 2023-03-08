import React, { useEffect, useRef, useState } from "react";
import "./style/viewciclosession.css";
// import { addSesion, updatSesion } from "../../../../../../../../service/repository/Sesion";
import { ComponentModalFloting,
         ComponentModalFlotingHeader,
         ComponentModalFlotingBody, 
         ComponentChipst} from "../../../../../../../../service/morvius-service/components";
import { ForminputBottonSubmit, ForminputDatetoDate, Forminputnumber, ForminputRadioSlice, FormListchipts} from "../../../../../../../../service/morvius-service/form";
import { getprofesor } from "../../../../../../../../service/repository/Profesor";
// import { updateciclocurso } from "../../../../../../../../sekrvice/repository/CicloCurso";
// import { handleNewNotification, useNotification } from "../../../../../../../../service/Notifications/useNotificacion";

export function Viewciclosession(props){
    const { onAction=()=>{},dataac={id_sesion:0}, refid } = props;
    const [ismodalvisible, setismodalvisible] = useState(false);
    const [objprofesor, setobjprofesor] = useState(null);
    const [listProfesores, setlistProfesores] = useState(null);
    // const [isgratuito , setisgratuito] = useState(false);
    // controladores de contenido inputs
    let [textdiasdura, settextdiasdura] = useState("");
    let [textpresio, settextpresio] = useState("");
    // const dispatch = useNotification();
    // controladores de contenido inputs
    // let [textsesion, settextsesion] = useState("");

    useEffect(()=>{
        (async()=>{
            await onlistprofesor();
        })();
    },[]);

    const onlistprofesor = async () =>{
        let result = await getprofesor();
        let objpro = result.filter((item)=>{
            return dataac.id_profesor == item.id_profesor;
        });
        setobjprofesor(objpro[0]);
    }

    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    //     let data = {
    //         "idprof" : parseInt(event.target.id_prof.value),
    //         "idcurso" : dataac.id_curso,
    //         "fech_in" : event.target.init_fechacurse.value,
    //         "fech_fin" : event.target.fina_fechacurse.value,
    //         "disdu" : parseInt(event.target.diadu.value),
    //         "presio": (!isgratuito)?parseFloat(event.target.pres.value):0.0
    //     };
    //     let resul = await updateciclocurso(dataac.id_ciclo_curso,data);
    //     handleNewNotification(dispatch,resul.messege, resul.status);
    //     setTimeout(() => {
    //             (async()=>{
    //                 console.log(resul);
    //                 await onAction();
    //             })();
    //     }, 500);
    // }

    // const limpiarcastillas = ()=>{
    //     //userefTipoC.current.value = "";
    //     //setitemselet(null);
    //     setitemselet(null);
    //     //setlistTipoCurso(null);
    //     settextsesion("");
    // }

    // const onChangeItemslistprofe = (item) => {
    //     console.log(item);
    // }

    // const onChangeinputgratuito = (stade) => {
    //     setisgratuito(stade);
    // }

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
               <ComponentModalFlotingHeader title="Ciclo del curso" onClosechange={()=>{setismodalvisible(false);}} />
               <ComponentModalFlotingBody descripccion={`Inicio: ${parsetieme(dataac.fecha_init)} a ${parsetieme(dataac.fecha_fin)}`}>
               <form
                    style={{
                        margin: "0",
                        padding: "0",
                        width: "100%"
                    }}
                    layout="vertical"
                    // onSubmit={handleSubmit}
                    onFinich
                    autoComplete="off"
                >
                    <div style={{height:"20px"}}></div>
                    {/* ingresar datos */}
                    <div className="container_curso_subtitle">
                        El profesor encargado:
                    </div>

                    {(objprofesor != null)?
                    <div className="container_curso_conten_prof"><ComponentChipst name = {objprofesor.nombre} photo={objprofesor.photo} isphoto={true} /></div>
                    :<></>}
                    {/* {(listProfesores != null)?<FormListchipts isdisable={true} keyname={"id_prof"} keyimage={"photo"} keyitem={"id_profesor"} keytitle={"nombre"} listdatos={listProfesores}
                    initvalue={dataac.id_profesor} isimage={true} isActionChips = {false} onChangeItems={onChangeItemslistprofe}/>:<></>} */}
                    {/* ingresar datos */}
                    {/* apace cuando no se a seleccionado nada */}
                    {/* <Forminput textinput={textsesion} settextinput={settextsesion} placeHolder="sesion" keyname ={"sesion"}/> */}
                    {/* Ingresar tiempos */}
                    {/* <div className="container_curso_subtitle">
                        Selecciona el tiempo de inicio y de fin:
                    </div>
                    <div style={{height:"5px"}}></div>
                    <div className="container_curso_date_container">
                        <ForminputDatetoDate valueInitInicial={parsetieme(dataac.fecha_init)} valueInitFinal={parsetieme(dataac.fecha_fin)} keyname ={"fechacurse"}/>
                    </div> */}
                    <div style={{height:"5px"}}></div>
                    <div className="container_curso_subtitle">
                        Dias de duracion: 
                    </div>
                    <div style={{height:"5px"}}></div>
                    <Forminputnumber isdisable={true} valueInit={dataac.dias_durac} textinput={textdiasdura} settextinput={settextdiasdura} placeHolder="Dias de duracion" keyname ={"diadu"}/>
                    <div style={{height:"5px"}}></div>
                    <div className="container_curso_subtitle">
                        Precio del curso: 
                    </div>
                    <div style={{height:"5px"}}></div>
                    {/* <ForminputRadioSlice valueInit={(dataac.presio_inscri == 0)} onChangeinput={onChangeinputgratuito} label={"El taller es en modo gratuito"} keyname ={"pass"}/> */}
                    <Forminputnumber isdisable={true} valueInit={dataac.presio_inscri} textinput={textpresio} settextinput={settextpresio} placeHolder="Precio" keyname ={"pres"}/>
                    {/* <ForminputBottonSubmit /> */}
                    {/* <ForminputBottonSubmit /> */}
                </form>
               </ComponentModalFlotingBody>
           </ComponentModalFloting>
        </>
    );
}