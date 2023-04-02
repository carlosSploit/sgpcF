import React, { useState } from "react";
import "./style/addAlumnos.css";
import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader } from "../../../../../../service/morvius-service/components";
import { ExisteVersionEmpresa } from "./components/existeEmpresa";

export function AddInsidenciaProceso(props){
    const [ismodalvisible, setismodalvisible] = useState(false);
    const { onInsert=()=>{}, informacionProceso, propismodalvisible = ismodalvisible, propsetismodalvisible = setismodalvisible } = props;
    // const [index,setindex] = useState(0);
    const [listview,] = useState([<ExisteVersionEmpresa informacionProceso={informacionProceso} onInsert = {onInsert} />]);

    return (
        <>
           <ComponentModalFloting statemode={propismodalvisible} width = {'400px'} >
                <ComponentModalFlotingHeader title="Insertar ua Insidencia" colorTitle={'#183152'} onClosechange={()=>{propsetismodalvisible(false);}} />
                <ComponentModalFlotingBody descripccion={""}>
                <div style={{height: '10px'}}></div>
                {listview[0]}
                </ComponentModalFlotingBody>
            </ComponentModalFloting>
        </>
    );
}