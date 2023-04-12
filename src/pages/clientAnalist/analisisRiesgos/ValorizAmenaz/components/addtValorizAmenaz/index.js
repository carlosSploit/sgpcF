import React, { useEffect, useState } from "react";
import "./style/index.css";
import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader } from "../../../../../../service/morvius-service/components";
import { ExisteIdentifiAmenaz } from "./components/existeValorizActiv";
import { getAfectaAtiv } from "../../../../../../service/repository/RTAfectaActiv";
import { ManualIdentifiAmenaz } from "./components/manualValorizActiv";

export function AddIdentifyAmenazas(props){
    const [ismodalvisible, setismodalvisible] = useState(false);
    const { onInsert=()=>{}, informacionActivAfec, propismodalvisible = ismodalvisible, propsetismodalvisible = setismodalvisible } = props;
    const [listview,setlistview] = useState([]);
    const [isDescripccion, setisDescripccion] = useState(false)

    useEffect(()=>{
        (async () => {
            let result = await getAfectaAtiv(informacionActivAfec);
            console.log(result)
            setisDescripccion((result.length == 0))
            if(result.length == 0){
                setlistview([<ExisteIdentifiAmenaz informacionActivAfec={informacionActivAfec} 
                    onInsert = {onInsert} />])
                return
            }
            setlistview([<ManualIdentifiAmenaz informacionActivAfec={informacionActivAfec} 
                onInsert = {onInsert} />])
        })();
    },[])

    return (
        <>
           <ComponentModalFloting statemode={propismodalvisible} width = {'400px'} >
                <ComponentModalFlotingHeader title="Enlazar Amenazas" colorTitle={'#183152'} onClosechange={()=>{propsetismodalvisible(false);}} />
                <ComponentModalFlotingBody descripccion={(isDescripccion)?'Selecciona su libreria de amenazas de preferencia, para cargar las primeras amenazas a este activo.':""}>
                    {(listview.length != 0)?<>
                        <div style={{height: '10px'}}></div>
                        {listview[0]}
                    </>:<></>}
                </ComponentModalFlotingBody>
            </ComponentModalFloting>
        </>
    );
}