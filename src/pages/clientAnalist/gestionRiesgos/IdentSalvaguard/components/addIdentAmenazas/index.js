import React, { useEffect, useState } from "react";
import "./style/index.css";
import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader } from "../../../../../../service/morvius-service/components";
import { ManualIdentifiAmenaz } from "./components/manualValorizActiv";

export function AddSalvaguarAmenaz(props){
    const [ismodalvisible, setismodalvisible] = useState(false);
    const { onInsert=()=>{}, informacionActivAfec, propismodalvisible = ismodalvisible, propsetismodalvisible = setismodalvisible } = props;
    const [listview,setlistview] = useState([]);

    useEffect(()=>{
        (async () => {
            // let result = await getAfectaAtiv(informacionActivAfec);
            // console.log(result)
            // if(result.length == 0){
            //     setlistview([<ExisteIdentifiAmenaz informacionActivAfec={informacionActivAfec} 
            //         onInsert = {onInsert} />])
            //     return
            // }
            setlistview([<ManualIdentifiAmenaz informacionActivAfec={informacionActivAfec} 
                onInsert = {onInsert} />])
        })();
    },[])

    return (
        <>
           <ComponentModalFloting statemode={propismodalvisible} width = {'400px'} >
                <ComponentModalFlotingHeader title="Ingresar Salvaguarda" colorTitle={'#183152'} onClosechange={()=>{propsetismodalvisible(false);}} />
                <ComponentModalFlotingBody descripccion={""}>
                    {(listview.length != 0)?<>
                        <div style={{height: '10px'}}></div>
                        {listview[0]}
                    </>:<></>}
                </ComponentModalFlotingBody>
            </ComponentModalFloting>
        </>
    );
}