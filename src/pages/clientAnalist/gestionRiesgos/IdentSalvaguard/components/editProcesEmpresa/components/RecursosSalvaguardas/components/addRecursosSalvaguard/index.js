import React, { useState } from "react";
import "./style/index.css";
import { ExisteObjetivoEmpresa } from "./components/existeObjetivEmpresa";
import { ComponentModalFlotingBody } from "../../../../../../../../../../service/morvius-service/component/components";
import { PopModal } from "../../../../../../../../../../service/morvius-service/component/complements/componentModal/componentModal";

export function AddRecursSalvaguard(props){
    const [ismodalvisible, setismodalvisible] = useState(false);
    const [propinformationDataGeneral, ] = useState({});
    const { onInsert=()=>{}, propismodalvisible = ismodalvisible, propsetismodalvisible = setismodalvisible, informationDataGeneral = propinformationDataGeneral } = props;
    const [listview,] = useState([<ExisteObjetivoEmpresa  onInsert = {onInsert} informationDataGeneral = {informationDataGeneral} />]);

    return (
        <>
            <PopModal namemodal = {"Insertar un Recurso de Salvagaurda"} colorTitle={'#183152'} propismodalvisible = {propismodalvisible} propsetismodalvisible = {propsetismodalvisible}>
                <ComponentModalFlotingBody descripccion={""}>
                <div style={{height: '10px'}}></div>
                    {listview[0]}
                </ComponentModalFlotingBody>
            </PopModal>
        </>
    );
}