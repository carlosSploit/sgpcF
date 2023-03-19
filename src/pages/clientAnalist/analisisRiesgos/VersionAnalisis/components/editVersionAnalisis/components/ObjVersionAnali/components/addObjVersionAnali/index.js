import React, { useState } from "react";
import "./style/index.css";
import { ExisteObjetivVersionAnalitic } from "./components/existeObjetivEmpresa";
import { ComponentModalFlotingBody } from "../../../../../../../../../../service/morvius-service/component/components";
import { PopModal } from "../../../../../../../../../../service/morvius-service/component/complements/componentModal/componentModal";

export function AddObjetivVersionAnalitic(props){
    const [ismodalvisible, setismodalvisible] = useState(false);
    const [propinformationDataGeneral, propsetinformationDataGeneral] = useState({});
    const { onInsert=()=>{}, propismodalvisible = ismodalvisible, propsetismodalvisible = setismodalvisible, informationDataGeneral = propinformationDataGeneral } = props;
    const [listview,setlistview] = useState([<ExisteObjetivVersionAnalitic  onInsert = {onInsert} informationDataGeneral = {informationDataGeneral} />]);

    return (
        <>
            <PopModal namemodal = {"Insertar una Objetivo de la version"} colorTitle={'#183152'} propismodalvisible = {propismodalvisible} propsetismodalvisible = {propsetismodalvisible}>
                <ComponentModalFlotingBody descripccion={""}>
                <div style={{height: '10px'}}></div>
                {listview[0]}
                </ComponentModalFlotingBody>
            </PopModal>
        </>
    );
}