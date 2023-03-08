import { CloseOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {v4} from "uuid";
import "./componentModal.css";
import { addModal, delectModal, getAccesModal } from "./store.componentModal/componetModal.store";

const portalRoot = document.getElementById('popmodal');
// const root = ReactDOM.createRoot(portalRoot);

export function PopModal(props){
    const [ismodalvisible, setismodalvisible] = useState(false);
    const [idDivcontent, setidDivcontent] = useState(v4());
    const {children, 
           colorBackgroud = "#fff",
           colorTitle="#9686C3",
           propismodalvisible = ismodalvisible, 
           propsetismodalvisible = setismodalvisible, 
           namemodal= "Default"} = props;
    //const divcontainer = document.createElement('div');

    const onDeleteElement = () => {
        //portalRoot.removeChild(divcontainer);
        let state = !propismodalvisible;
        propsetismodalvisible(state);
        // console.log(`${idDivcontent} - cerro`);
        // console.log("holass");
    }

    return ReactDOM.createPortal(<div id={idDivcontent} >
        <ComponentModal colorBackgroud={colorBackgroud} colorTitle={colorTitle} idparens = {idDivcontent} propismodalvisible = {propismodalvisible} propsetismodalvisible = {propsetismodalvisible} onClosechange={onDeleteElement} namemodal = {namemodal}>
            {children}
        </ComponentModal>
    </div>, portalRoot);
}

export function ComponentModal(props){

    const [zvisible, setzvisible] = useState(0);
    const [ismodalvisible, setismodalvisible] = useState(false);
    const {idparens = "", 
           propismodalvisible = ismodalvisible, 
           propsetismodalvisible = setismodalvisible,
           children,
           colorBackgroud = "#fff", 
           colorTitle="#9686C3", 
           onClosechange=()=>{console.log("cerrado")},
           namemodal = "Mantenimiento de Tipo de curso"} = props;

    // captura la apertura y el cerrado de un modal
    useEffect(()=>{
        //divcontainer.id = v4();
        //divcontainer.appendChild();
        // portalRoot.appendChild(divcontainer);
        if(propismodalvisible){
            addModal();
            // console.log(`${idparens} - abrio`);
        }else{
            delectModal();
            // console.log(`${idparens} - cerro`);
        }
        setzvisible(getAccesModal());
        //console.log(getAccesModal());
    },[propismodalvisible]);

    return(
        <>
            <ComponentModalFloting zindex={zvisible} statemode={propismodalvisible} onClosechange={()=>{propsetismodalvisible(false);}}>
               <ComponentModalFlotingHeader colorBackgroud={colorBackgroud} colorTitle={colorTitle} title={namemodal} onClosechange={()=>{onClosechange();propsetismodalvisible(false);}} />
               {children}
           </ComponentModalFloting>
        </>
    );
}

export function ComponentModalFloting(props){
    const {color="white", children, zindex = 1,statemode = true, width = '500px'} = props;
    return(
        <>
            {/* onClick={onClosechange} */}
            <div className={"component_modalFloting"} style={{zIndex: `${zindex*9999}`,display:`${(!statemode)?"none":"block"}`}}>
                <div className={"component_modalFloting_container"} style={{background:`${color}`, width: `${width}`}} >
                    {children}
                </div>
            </div>
        </>
    );
}

export function ComponentModalFlotingHeader(props){
    const {children, onClosechange=()=>{},title="Titulo por default", colorBackgroud = "#fff", colorTitle="#9686C3" } = props;
    return(
        <>
            <div className="component_modalFloting_header" style={{backgroundColor: `${colorBackgroud}`}}>
                <div onClick={onClosechange} className="component_modalFloting_close"><CloseOutlined className="component_modalFloting_close_icon" style={{color: `${colorTitle}`}}/></div>
                <div className="component_modalFloting_header_container">
                    <div className="component_modalFloting_header_title" style={{color: `${colorTitle}`}}>{title}</div>
                    {children}
                </div>
                <div style={{width:"5px"}}/>
            </div>
        </>
    );
}

export function ComponentModalFlotingBody(props){
    const {children, descripccion= ""} = props;
    return(
        <>
            <div className="component_modalFloting_body">
                <div className="component_modalFloting_body_container">
                    <div className="container_modalFloting_descripccion">
                        {descripccion}
                    </div>
                    {children}
                    <div style={{height:"15px"}}/>
                </div>
            </div>
        </>
    );
}