import { useEffect, useState } from "react";
import './style/index.css';
import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader } from "../../../../../../service/morvius-service/components";
import { EditarValorActivCuantiImformation } from "./components/ValoriProces";
// import { EditarValorActivCualitativImformation } from "./components/valorizCualit";
import { getValoriSalvaguard } from "../../../../../../service/repository/RTValoriSalvaguard";

export function EditaValorSalvaguard(props){

    const [propismodalvisible,propsetismodalvisible ] = useState(false);
    const [propiskeyDatos, ] = useState(0);
    const {
        // informacionProceso,
        // informacionAmenaza, // datos de la amenaza
        onAction = () => {},
        iskeyDatos = propiskeyDatos, // id de la amenaza que se decea enlazar
        ismodalvisible = propismodalvisible,
        setismodalvisible = propsetismodalvisible
    } = props;
    // const [index,setindex] = useState(0);
    const [stadeValoriActiv,setstadeValoriActiv] = useState(0);
    const [listview,setlistview] = useState([<></>]);
    // const dispatch = useNotification();
    

    useEffect(()=>{
        (async () => {
            await actualizeData();
        })();
    },[]);

    const actualizeData = async () => {
        // console.log(iskeyDatos)
        const listvaloritCualiti = await getValoriSalvaguard(iskeyDatos)
        // console.log(listvaloritCualiti)
        // comprueba la existencia de una valorizacion cuantitativa
        const stade = (parseInt(listvaloritCualiti.length) === 0)
        setstadeValoriActiv(stade)
        if(stade) return
        const objValoritCualiti = listvaloritCualiti[0];
        setTimeout(() => {
            setlistview([<EditarValorActivCuantiImformation onAction={async ()=>{
                await onAction();
                await actualizeData();
            }} informationDataGeneral={objValoritCualiti}/>])
        }, 500);
    }

    return (<ComponentModalFloting statemode={ismodalvisible} width = {'400px'} >
                <ComponentModalFlotingHeader title="Valorizar Salvaguarda" colorTitle={'#183152'} onClosechange={()=>{setismodalvisible(false);}} />
                <ComponentModalFlotingBody descripccion={(stadeValoriActiv)?'No se inserto ninguna valorizacion, consulte al administrador.':''}>
                <div style={{height: '10px'}}></div>
                {(stadeValoriActiv)?
                <div className="container_editValorAmenaz_botton_container"></div>:
                <>
                    <div style={{height: '5px'}}></div>
                    {listview[0]}
                </>}
                </ComponentModalFlotingBody>
            </ComponentModalFloting>);
}