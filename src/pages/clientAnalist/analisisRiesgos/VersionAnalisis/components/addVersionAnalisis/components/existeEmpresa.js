import React, { useEffect, useState } from "react";
import { useNotification } from "../../../../../../../service/Notifications/NotificationProvider";
// import {  addSelectEmpresa, getEmpresas } from "../../../../../../../service/repository/RTEmpresas";
// import { ConsuldataLogm, getKeysesion } from "../../../../../../../service/repository/mithelworks";
import { handleNewNotification } from "../../../../../../../service/Notifications/useNotificacion";
// import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader } from "../../../../../../../service/morvius-service/components";
import {  ForminputBotton, ForminputBottonSubmit, ForminputSelectItem } from "../../../../../../../service/morvius-service/form";
import { addVersionAnalitiv } from "../../../../../../../service/repository/RTVersionAnalitiv";

export function ExisteVersionEmpresa(props){

    const { onInsert=()=>{}, informacionProceso} = props;

    // input de contenidos
    const [idselectInscrip, setidselectInscrip] = useState(-1);
    // const [listdata,setlistdata] = useState([]);
    const dispatch = useNotification();

    // useEffect(()=>{
    //     (async()=>{
    //         await LoadDataEmpresa();
    //     })();
    // },[]);

    // const LoadDataEmpresa = async () => {
    //     let result = await getEmpresas(0);
    //     console.log(result);
    //     setlistdata([]);
    //     setTimeout(() => {
    //         let DataResult = result.map((item)=>{
    //             return {
    //                     id: item.id_empresa,
    //                     name: item.nombreempresa
    //                 }
    //         })
    //         setlistdata(DataResult);
    //     }, 500);
    // }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = {
            "id_proceso" : informacionProceso
        };
        let resulEn = await addVersionAnalitiv(data);
        handleNewNotification(dispatch,resulEn.messege, resulEn.status);
        setTimeout(() => {
            (async ()=>{await onInsert();})();
            setidselectInscrip(-1);
        }, 500);
    }

    // const onSelectItem = (json) => {
    //     setidselectInscrip(json.id);
    // }

    return (
        <>
           <form
                style={{
                    margin: "0",
                    padding: "0",
                    width: "90%",
                    paddingLeft: '5%',
                    paddingRight: '5%'
                }}
                layout="vertical"
                onSubmit={handleSubmit}
                onFinich
                autoComplete="off"
            >
                <>
                    {/* <div style={{height: '10px'}}></div>
                    <div className="container_addEmpresa_selectet_data">
                        {(listdata.length == 0)?<></>:<ForminputSelectItem  listaObj={listdata} setlistaObj = {setlistdata} keyname={"selestInscrip"} checkbox={idselectInscrip} setcheckbox={setidselectInscrip} onChangeinput={onSelectItem} />}
                    </div> */}
                </>
                <ForminputBottonSubmit label = {'Registrar'} />
                {/* <ForminputBotton label = {"Cancelar"} isInvertColor = {true} /> */}
            </form>
        </>
    );
}