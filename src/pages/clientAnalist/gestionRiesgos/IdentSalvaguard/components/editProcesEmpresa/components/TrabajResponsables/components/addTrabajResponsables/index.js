import React, { useState } from "react";
import "./style/index.css";
import {  ExisteTrabajResponsabless } from "./components/existeAreaEmpresa";
import { ComponentModalFlotingBody } from "../../../../../../../../../../service/morvius-service/component/components";
import { PopModal } from "../../../../../../../../../../service/morvius-service/component/complements/componentModal/componentModal";
// import { ExisteEmpresa } from "./components/existeAreaEmpresa";

export function AddTrabajResponsabless(props){
    const [ismodalvisible, setismodalvisible] = useState(false);
    const [propinformationDataGeneral, ] = useState({});
    const { onInsert=()=>{}, propismodalvisible = ismodalvisible, propsetismodalvisible = setismodalvisible, informationDataGeneral = propinformationDataGeneral } = props;
    // const [index,setindex] = useState(0);
    const [listview,] = useState([<ExisteTrabajResponsabless onInsert = {onInsert} informationDataGeneral = {informationDataGeneral} />]);

    return (
        <>
            <PopModal namemodal = {"Enlazar un Responsable"} colorTitle={'#183152'} propismodalvisible = {propismodalvisible} propsetismodalvisible = {propsetismodalvisible}>
                <ComponentModalFlotingBody descripccion={""}>
                <div style={{height: '10px'}}></div>
                {listview[0]}
                </ComponentModalFlotingBody>
            </PopModal>
        </>
    );
}