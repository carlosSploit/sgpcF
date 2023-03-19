import React, { useState } from "react";
import "./style/addAlumnos.css";
import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader } from "../../../../../../service/morvius-service/components";
import { ExisteValoriActiv } from "./components/existeValorizActiv";

export function AddValorizeActiv(props){
    const [ismodalvisible, setismodalvisible] = useState(false);
    const { onInsert=()=>{}, informacionVersion, informacionProceso, propismodalvisible = ismodalvisible, propsetismodalvisible = setismodalvisible } = props;
    const [listview,setlistview] = useState([<ExisteValoriActiv informacionVersion={informacionVersion} informacionProceso={informacionProceso} onInsert = {onInsert} />]);

    return (
        <>
           <ComponentModalFloting statemode={propismodalvisible} width = {'400px'} >
                <ComponentModalFlotingHeader title="Enlazar un activo" colorTitle={'#183152'} onClosechange={()=>{propsetismodalvisible(false);}} />
                <ComponentModalFlotingBody descripccion={""}>
                <div style={{height: '10px'}}></div>
                {listview[0]}
                </ComponentModalFlotingBody>
            </ComponentModalFloting>
        </>
    );
}