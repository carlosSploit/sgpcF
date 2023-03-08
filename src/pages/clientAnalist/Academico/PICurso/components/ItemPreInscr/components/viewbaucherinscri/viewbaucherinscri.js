import React, { useEffect, useRef, useState } from "react";
import "./style/viewbaucherinscri.css";
import { ComponentModalFloting,
         ComponentModalFlotingHeader,
         ComponentModalFlotingBody } from "../../../../../../../../service/morvius-service/components";
import { ForminputBottonSubmit } from "../../../../../../../../service/morvius-service/form";
import { updatestadeInscrip } from "../../../../../../../../service/repository/Inscripcc";

export function Viewbaucherinscri(props){
    const { refmodal, data={id_ciclo_curso:0}} = props;
    const [ismodalvisible, setismodalvisible] = useState(false);

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

    const parsetieme = (date = "") =>{
        let objdate = new Date(date);
        //console.log(`${objdate.getUTCFullYear()}/${objdate.getUTCMonth()}/${objdate.getUTCDay()}`);
        return objdate.toISOString().slice(0, 10);
    }

    return (
        <>
            <div ref={refmodal} onClick={()=>{setismodalvisible(true);}}></div>
           <ComponentModalFloting statemode={ismodalvisible} onClosechange={()=>{setismodalvisible(false);}}>
               <ComponentModalFlotingHeader title="Visualizacion del voucher" onClosechange={()=>{setismodalvisible(false);}} />
               <ComponentModalFlotingBody descripccion ={`La presente inscripccion fue realizada el dia ${ parsetieme(data.fechainscri)}`}>
                <div style={{height:"20px"}} />
                <div className="portada_container_voucher">
                    <div 
                        className="portada_voucher_image"
                        style={{
                        backgroundImage: `url('${data.url_voucher}')`
                        }}
                    ></div>
                </div>
                <div style={{height:"20px"}} />
               </ComponentModalFlotingBody>
           </ComponentModalFloting>
        </>
    );
}