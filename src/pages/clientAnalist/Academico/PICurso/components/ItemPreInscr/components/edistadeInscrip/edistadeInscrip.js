import React, { useEffect, useRef, useState } from "react";
import "./style/addInscrip.css";
// import {uploudImage} from "../../../../../../../../../../../service/repository/uploudimage";
// import { addprofesor } from "../../../../../../../../../../../service/repository/Profesor";
// import { addTipoCurso, getTipoCurso, deleteTipoCurso, updatTipoCurso } from "../../../../../../../../../../../service/repository/TipoCurso";
// import { keyseccion } from "../../../../../../../../service/repository/variables";
// import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import { ComponentBotton,
         ComponentModalFloting,
         ComponentModalFlotingHeader,
         ComponentModalFlotingBody } from "../../../../../../../../service/morvius-service/components";
import { Forminput,FormListchipts,ForminputBottonSubmit,ForminputBotton, ForminputImageRectangleMirror} from "../../../../../../../../service/morvius-service/form";
import { updatestadeInscrip } from "../../../../../../../../service/repository/Inscripcc";
import { handleNewNotification, useNotification } from "../../../../../../../../service/Notifications/useNotificacion";
// import { ConsuldataLog } from "../../../../../../../../../../../service/repository/Usuarios";
// import { uploudImage } from "../../../../../../../../../../../service/repository/uploudimage";
// import { addInscrip } from "../../../../../../../../../../../service/repository/Inscripcc";

export function EdistadeInscrip(props){
    const { refmodal, data={id_ciclo_curso:0}, onUpdate=()=>{}, isupdatecancel= 0, onInsert=(id_alum,id_ciclcur)=>{}} = props;
    const [ismodalvisible, setismodalvisible] = useState(false);
    const dispatch = useNotification();
    // const [itemselet, setitemselet] = useState(null);
    // const [listTipoCurso, setlistTipoCurso] = useState(null);
    // controladores de contenido inputs
    // let [textTipoCurso, settextTipoCurso] = useState("");
    // const [infousser, setinfousser] = useState({});
    // const [filephoto, setfilephoto] = useState(null);
    // let validator = [false,false,false,false,false];

    useEffect(()=>{
        (async()=>{
            // await listarTipoCurso();
            // if(!localStorage.getItem(keyseccion)){
            //     window.location.href = window.location.href.replace("learning","login");
            // }
            // let data = {
            //     seccionkey: localStorage.getItem(keyseccion)
            // };
            // let resuldata = await ConsuldataLog(data);
            // //console.log(resuldata);
            // setinfousser(resuldata);
        })();
    },[]);

    // const onDelect = async (index) => {
    //     let result = await deleteTipoCurso(index);
    //     await listarTipoCurso();
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await Updateinscrp(isupdatecancel);
        await onUpdate();
    }

    const Updateinscrp = async (stade = 0) =>{
        let datajson = {
            "estade" : stade
        };
        let result = await updatestadeInscrip(data.id_inscrip ,datajson);
        handleNewNotification(dispatch,result.messege, result.status);
        setTimeout(() => {
                (async()=>{
                    console.log(result);
                })();
        }, 500);
    }

    // const limpiarcastillas = ()=>{
    //     //userefTipoC.current.value = "";
    //     //setitemselet(null);
    //     setitemselet(null);
    //     //setlistTipoCurso(null);
    //     settextTipoCurso("");
    // }

    // const listarTipoCurso = async ()=>{
    //     // recargar datos
    //     let result = await getTipoCurso();
    //     setlistTipoCurso(null);
    //     setTimeout(()=>{
    //         setlistTipoCurso(result);
    //     },1000);
    // }

    // detecta si se a seleccionado algo y lo tiene en consideracion
    // const onChangeItems = (item) => {
    //     // setfilephoto(file);
    //     console.log(item);
    //     setitemselet(null);       
    //     setTimeout(()=>{
    //         setitemselet(item);
    //         settextTipoCurso(item.name);
    //     },500);
    // }
    // const oncallbackchange = (file) => {
    //     setfilephoto(file);
    // }

    return (
        <>
            <div ref={refmodal} onClick={()=>{setismodalvisible(true);}}></div>
           <ComponentModalFloting statemode={ismodalvisible} onClosechange={()=>{setismodalvisible(false);}}>
               <ComponentModalFlotingHeader title="Aceptacion de Pre-inscripccion" onClosechange={()=>{setismodalvisible(false);}} />
               <ComponentModalFlotingBody descripccion ={(isupdatecancel == 0)?"Esta seguro que desea cancelar la pre-inscripccion.":"Estas seguro que desea acepctar la preinscripccion"}>
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
                    <ForminputBottonSubmit label={"Aceptar"} />
                </form>
               </ComponentModalFlotingBody>
           </ComponentModalFloting>
        </>
    );
}