// import { CloseOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {v4} from "uuid";
import { ComponentBotton } from "../../components";
import "./componentAlertNotify.css";
// import { addModal, delectModal, getAccesModal } from "./store.componentModal/componetModal.store";
import {ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader} from "../componentModal/componentModal";

const portalRoot = document.getElementById('popalert');
// const root = ReactDOM.createRoot(portalRoot);

export function PopAlertNotify(props){
    const [ismodalvisible, setismodalvisible] = useState(true);
    const [idDivcontent, setidDivcontent] = useState(v4());
    const {colorBackgroud = "#fff",
           colorTitle="#9686C3",
           propismodalvisible = ismodalvisible, 
           propsetismodalvisible = setismodalvisible, 
           namemodal= "Default",
           descripccion = ""
        } = props;
    //const divcontainer = document.createElement('div');

    // captura la apertura y el cerrado de un modal

    const onDeleteElement = () => {
        let state = !propismodalvisible;
        propsetismodalvisible(state);
    }

    return ReactDOM.createPortal(<div id={idDivcontent} >
        <ContainerAlertModify colorBackgroud={colorBackgroud} descripccion = {descripccion} colorTitle={colorTitle} idparens = {idDivcontent} propismodalvisible = {propismodalvisible} propsetismodalvisible = {propsetismodalvisible} onClosechange={onDeleteElement} namemodal = {namemodal}>
        </ContainerAlertModify>
    </div>, portalRoot);
}

export function ContainerAlertModify(props){

    const [zvisible, setzvisible] = useState(0);
    const [ismodalvisible, setismodalvisible] = useState(false);
    const {propismodalvisible = ismodalvisible, 
           propsetismodalvisible = setismodalvisible,
           colorBackgroud = "#fff", 
           colorTitle="#9686C3", 
           onClosechange=()=>{console.log("cerrado")},
           namemodal = "Mantenimiento de Tipo de curso",
           descripccion = ""
        } = props;

    // captura la apertura y el cerrado de un modal
    useEffect(()=>{
        //divcontainer.id = v4();
        //divcontainer.appendChild();
        // portalRoot.appendChild(divcontainer);
        // if(propismodalvisible){
        //     addModal();
        //     // console.log(`${idparens} - abrio`);
        // }else{
        //     delectModal();
        //     // console.log(`${idparens} - cerro`);
        // }
        // setzvisible(getAccesModal());
        setzvisible(50);
        //console.log(getAccesModal());
    },[propismodalvisible]);

    return(
        <>
            <ComponentModalFloting zindex={zvisible} statemode={propismodalvisible} onClosechange={()=>{propsetismodalvisible(false);}}>
               <ComponentModalFlotingHeader colorBackgroud={colorBackgroud} colorTitle={colorTitle} title={namemodal} onClosechange={()=>{onClosechange();propsetismodalvisible(false);}} />
               {/* {children} */}
               <ComponentModalFlotingBody descripccion = {descripccion}>
                    <div className="container_aler_noty_botton">
                        <ComponentBotton label = {"Aceptar"} onChange = {()=>{
                            propsetismodalvisible(false);
                        }} />
                    </div>
               </ComponentModalFlotingBody>
           </ComponentModalFloting>
        </>
    );
}

export function handlerAlertNotify({title = "Desconosido", descripccion = "Mensaje que esta desconocido", onOk = () => {
    console.log("Se a precionado un OK")
}, onCancel = () => {
    console.log("Se a precionado un cancel")
}}){
    return (
        <PopAlertNotify namemodal = {title} />
    );
}