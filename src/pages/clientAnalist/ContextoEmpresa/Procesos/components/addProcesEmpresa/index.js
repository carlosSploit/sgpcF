import React, { useEffect, useState } from "react";
import "./style/addAlumnos.css";
// import {uploudImage} from "../../../../../../service/repository/uploudimage";
// import {addadmin} from "../../../../../../service/repository/Admin";
// import { useNotification, handleNewNotification } from "../../../../../../service/Notifications/useNotificacion";
import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader } from "../../../../../../service/morvius-service/components";
// import { Forminput, ForminputArea, ForminputBotton, ForminputBottonSubmit, ForminputRadioSlice, ForminputSelectItem, Forminputnumber } from "../../../../../../service/morvius-service/form";
// import { ConsuldataLogm, getKeysesion } from "../../../../../../service/repository/mithelworks";
// import { addEmpresa, addSelectEmpresa, getEmpresas } from "../../../../../../service/repository/Empresas";
// import { EditOutlined } from "@ant-design/icons";
import { NoExisteEmpresa } from "./components/noExisteProcesEmpresa";
// import { ExisteEmpresa } from "./components/existeEmpresa";

export function AddProcesEmpresas(props){
    const [ismodalvisible, setismodalvisible] = useState(false);
    const [isinformacionGeneral, setisSinformacionGeneral] = useState(0);
        
    const { informacionGeneral = isinformacionGeneral, onInsert=()=>{}, propismodalvisible = ismodalvisible, propsetismodalvisible = setismodalvisible } = props;
    // const [index,setindex] = useState(0);
    const [listview,setlistview] = useState([<NoExisteEmpresa informacionGeneral={informacionGeneral}  onInsert = {onInsert} />]);

    useEffect(()=>{
        console.log(informacionGeneral)
        setlistview([<NoExisteEmpresa informacionGeneral={informacionGeneral}  onInsert = {onInsert} />])
    },[])

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
           <ComponentModalFloting statemode={propismodalvisible} width = {'400px'} >
                <ComponentModalFlotingHeader title="Insertar un Proceso" colorTitle={'#183152'} onClosechange={()=>{propsetismodalvisible(false);}} />
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
            </ComponentModalFloting>
        </>
    );
}