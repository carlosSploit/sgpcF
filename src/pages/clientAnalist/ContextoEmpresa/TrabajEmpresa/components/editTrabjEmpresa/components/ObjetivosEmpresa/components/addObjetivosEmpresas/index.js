import React, { useState } from "react";
import "./style/index.css";
// import {uploudImage} from "../../../../../../service/repository/uploudimage";
// import {addadmin} from "../../../../../../service/repository/Admin";
// import { useNotification, handleNewNotification } from "../../../../../../service/Notifications/useNotificacion";
// import { Forminput, ForminputArea, ForminputBotton, ForminputBottonSubmit, ForminputRadioSlice, ForminputSelectItem, Forminputnumber } from "../../../../../../service/morvius-service/form";
// import { ConsuldataLogm, getKeysesion } from "../../../../../../service/repository/mithelworks";
// import { addEmpresa, addSelectEmpresa, getEmpresas } from "../../../../../../service/repository/Empresas";
// import { EditOutlined } from "@ant-design/icons";
// import { NoExisteEmpresa } from "./components/noExisteEmpresa";
import { ExisteObjetivoEmpresa } from "./components/existeObjetivEmpresa";
import { ComponentModalFlotingBody } from "../../../../../../../../../../service/morvius-service/component/components";
import { PopModal } from "../../../../../../../../../../service/morvius-service/component/complements/componentModal/componentModal";
// import { ExisteEmpresa } from "./components/existeAreaEmpresa";

export function AddObjetivoEmpresas(props){
    const [ismodalvisible, setismodalvisible] = useState(false);
    const [propinformationDataGeneral, propsetinformationDataGeneral] = useState({});
    const { onInsert=()=>{}, propismodalvisible = ismodalvisible, propsetismodalvisible = setismodalvisible, informationDataGeneral = propinformationDataGeneral , setinformationDataGeneral = propsetinformationDataGeneral } = props;
    // const [index,setindex] = useState(0);
    const [listview,setlistview] = useState([<ExisteObjetivoEmpresa  onInsert = {onInsert} informationDataGeneral = {informationDataGeneral} />]);

    // const listOpt = [
    //     {
    //         id: 0,
    //         label : "No Existe",
    //         icontab : EditOutlined
    //     },{
    //         id: 1,
    //         label : "Existe",
    //         icontab : EditOutlined
    //     }
    // ];

    // const onChangeindex = (index,titletab) => {
    //     setindex(index);
    // }

    return (
        <>
            <PopModal namemodal = {"Insertar una Objetivo de Empresa"} colorTitle={'#183152'} propismodalvisible = {propismodalvisible} propsetismodalvisible = {propsetismodalvisible}>
                <ComponentModalFlotingBody descripccion={""}>
                <div style={{height: '10px'}}></div>
                {/* <ComponentModalPrincipalListtabs
                    listOptions = {listOpt}
                    onChangeindex = {onChangeindex}
                    chaindexselect = {index}
                    chasetindexselect = {setindex}
                    indexinitial = {listOpt[0].id}
                ></ComponentModalPrincipalListtabs>
                <div className="LinerSeparator"></div>
                <div style={{height: '20px'}}></div> */}
                {listview[0]}
                </ComponentModalFlotingBody>
            </PopModal>
        </>
    );
}