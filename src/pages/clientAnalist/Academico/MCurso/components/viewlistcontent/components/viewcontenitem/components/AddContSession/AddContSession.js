import React, { useEffect, useRef, useState } from "react";
import "./style/AddContSession.css";
// import { addSesion } from "../../../../../../../../../../../../service/repository/Sesion";
// import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import { ComponentModalFloting,
         ComponentModalFlotingHeader,
         ComponentModalFlotingBody } from "../../../../../../../../../../service/morvius-service/components";
import { Forminput, ForminputArea, ForminputBottonSubmit, FormListchipts} from "../../../../../../../../../../service/morvius-service/form";
// import { getprofesor } from "../../../../../../../../../../../../service/repository/Profesor";
// import { addciclocurso } from "../../../../../../../../../../../../service/repository/CicloCurso";
import { handleNewNotification, useNotification } from "../../../../../../../../../../service/Notifications/useNotificacion";
import { getTipoContSesion } from "../../../../../../../../../../service/repository/TipoContensesion";
import { addContentSession } from "../../../../../../../../../../service/repository/Contensesion";

export function AddContSession(props){
    const { onAction=()=>{},dataac={id_sesion:0}, refaction } = props;
    const [ismodalvisible, setismodalvisible] = useState(false);
    // const [itemselet, setitemselet] = useState(null);
    // const [listTipoCurso, setlistTipoCurso] = useState(null);
    const [listtipocon, setlisttipocon] = useState(null);
    // const [isgratuito , setisgratuito] = useState(false);
    // controladores de contenido inputs
    let [textnombrcontses, settextnombrcontses] = useState("");
    let [descripcontses, setdescripcontses] = useState("");
    let [itemselectprof, setitemselectprof] = useState("");
    let [urlcontent, seturlcontent] = useState("");
    const dispatch = useNotification();

    useEffect(()=>{
        (async()=>{
            await onlisttipoconst();
        })();
    },[]);

    const onlisttipoconst = async () =>{
        let result = await getTipoContSesion();
        setlisttipocon(null);
        setTimeout(() => {
            setlisttipocon(result);
        }, 500);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        let data = {
            "idsession" : dataac.id_sesion ,
            "idtipocont" : parseInt(event.target.id_tipconte.value),
            "name": event.target.nomcont.value,
            "descr": event.target.descrcont.value,
            "urlcont": event.target.urlcont.value
        };

        let resul = await addContentSession(data);
        console.log(resul);
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
        settextnombrcontses("");
        setdescripcontses("");
        seturlcontent("");      
        setitemselectprof(listtipocon[0].id_profesor);
    }

    const onChangeItemslistprofe = (item) => {
        console.log(item);
    }

    return (
        <>
           <div ref={refaction} onClick={()=>{setismodalvisible(true);}} ></div>
           {/* <ComponentBotton isInvertColor={true} label={"Add.sesion"} onChange={()=>{setismodalvisible(true);}} /> */}
           <ComponentModalFloting statemode={ismodalvisible} onClosechange={()=>{setismodalvisible(false);limpiarcastillas();}}>
               <ComponentModalFlotingHeader title="Insertar un Contenido" onClosechange={()=>{setismodalvisible(false);limpiarcastillas();}} />
               <ComponentModalFlotingBody descripccion={"Ingresa el tipo de contenido, con un nombre, una descripccion de lo que trata el documento, y la url del contenido como redireccion."}>
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
                        Selecciona el tipo de contenido:
                    </div>
                    {(listtipocon != null)?<FormListchipts idstate={itemselectprof} setidstate={setitemselectprof} keyname={"id_tipconte"} keyitem={"id_tipo_conte"} keytitle={"nombre"} listdatos={listtipocon}
                    initvalue={listtipocon[0].id_profesor} isActionChips = {false} onChangeItems={onChangeItemslistprofe}/>:<></>}
                    <Forminput textinput={textnombrcontses} settextinput={settextnombrcontses} placeHolder="Nombre del contenido" keyname ={"nomcont"} />
                    <ForminputArea textinput={descripcontses} settextinput={setdescripcontses} placeHolder="Descripccion del contenido" keyname ={"descrcont"} />
                    {/* <Forminputnumber textinput={textdiasdura} settextinput={settextdiasdura} placeHolder="Dias de duracion" keyname ={"diadu"}/> */}
                    <Forminput textinput={urlcontent} settextinput={seturlcontent} placeHolder="Url de contenido" keyname ={"urlcont"}/>
                    <div style={{height:"10px"}}></div>
                    {/* <ForminputRadioSlice onChangeinput={onChangeinputgratuito} label={"Se subira un archivo:"} keyname ={"pass"}/> */}
                    {/* {(!isgratuito)?:<></>} */}
                    <ForminputBottonSubmit />
                </form>
               </ComponentModalFlotingBody>
           </ComponentModalFloting>
        </>
    );
}