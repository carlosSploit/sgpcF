import React, { useEffect, useState } from "react";
import { useNotification } from "../../../../../../../service/Notifications/NotificationProvider";
import {  addSelectEmpresa, getEmpresas } from "../../../../../../../service/repository/RTEmpresas";
import { ConsuldataLogm, getKeysesion } from "../../../../../../../service/repository/mithelworks";
import { handleNewNotification } from "../../../../../../../service/Notifications/useNotificacion";
// import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader } from "../../../../../../../service/morvius-service/components";
import {  ForminputBotton, ForminputBottonSubmit, ForminputSelectItem } from "../../../../../../../service/morvius-service/form";

export function ExisteEmpresa(props){

    const { onInsert=()=>{} } = props;

    // input de contenidos
    const [idselectInscrip, setidselectInscrip] = useState(-1);
    const [listdata,setlistdata] = useState([]);
    const dispatch = useNotification();

    useEffect(()=>{
        (async()=>{
            await LoadDataEmpresa();
        })();
    },[]);

    const LoadDataEmpresa = async () => {
        let result = await getEmpresas(0);
        console.log(result);
        setlistdata([]);
        setTimeout(() => {
            let DataResult = result.map((item)=>{
                return {
                        id: item.id_empresa,
                        name: item.nombreempresa
                    }
            })
            setlistdata(DataResult);
        }, 500);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const sesionKey = await getKeysesion()
        const infoUser = await ConsuldataLogm({seccionkey:sesionKey})

        if(idselectInscrip == -1){
            handleNewNotification(dispatch,'Seleccione una empresa para poder enlazarlo.', 404);
        }

        let data = {
            "id_clienAnalit" : infoUser.id_inform,
            "id_empresa" : idselectInscrip
        };
        let resulEn = await addSelectEmpresa(data);
        handleNewNotification(dispatch,resulEn.messege, resulEn.status);
        setTimeout(() => {
            (async ()=>{await onInsert();})();
            setidselectInscrip(-1);
        }, 500);
    }

    const onSelectItem = (json) => {
        setidselectInscrip(json.id);
    }

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
                    <div style={{height: '10px'}}></div>
                    <div className="container_addEmpresa_selectet_data">
                        {(listdata.length == 0)?<></>:<ForminputSelectItem  listaObj={listdata} setlistaObj = {setlistdata} keyname={"selestInscrip"} checkbox={idselectInscrip} setcheckbox={setidselectInscrip} onChangeinput={onSelectItem} />}
                    </div>
                </>
                <ForminputBottonSubmit label = {'Enlazar Empresa'} />
                {/* <ForminputBotton label = {"Cancelar"} isInvertColor = {true} /> */}
            </form>
        </>
    );
}