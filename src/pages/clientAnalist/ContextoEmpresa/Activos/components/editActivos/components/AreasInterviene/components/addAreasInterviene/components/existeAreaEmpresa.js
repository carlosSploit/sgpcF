import React, { useEffect, useState } from "react";
import './index.css';
import { useNotification } from "../../../../../../../../../../../service/Notifications/NotificationProvider";
// import { ConsuldataLogm, getKeysesion } from "../../../../../../../../../../../service/repository/mithelworks";
// import { addEmpresa } from "../../../../../../../../../../../service/repository/RTEmpresas";
import { handleNewNotification } from "../../../../../../../../../../../service/Notifications/useNotificacion";
import { ForminputBotton, ForminputBottonSubmit, ForminputSelectItem } from "../../../../../../../../../../../service/morvius-service/form";
import { addAreasEmpresa, getAresEmpresa } from "../../../../../../../../../../../service/repository/RTAreasEmpresas";
import { addAreasInteraProces } from "../../../../../../../../../../../service/repository/RTAreasInteraProces";

export function ExisteAreaInterProces(props){

    const [propinformationDataGeneral, propsetinformationDataGeneral] = useState({});
    const { onInsert=()=>{} ,informationDataGeneral = propinformationDataGeneral, informaDataEmpresa } = props;

    const [listAreasInteracProc, setlistAreasInteracProc] = useState([]);
    const [textAreasInteracProc, settextAreasInteracProc] = useState(0);
    const dispatch = useNotification();

    useEffect(()=>{
        (async()=>{
            await onLoadAreas();
        })();
    },[]);

    const onLoadAreas = async ()=>{
        let result = await getAresEmpresa(informaDataEmpresa);
        setlistAreasInteracProc([]);
        // setlistdataHistory([]);
        setTimeout(() => {
            let data = result.map((item)=>{
                return {
                    id: item.id_areempre,
                    name: item.nombrearea
                }
            })
            setlistAreasInteracProc(data)
            // setlistdataHistory(result);
        }, 500);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = {
            "id_areaEmpre" : textAreasInteracProc,
            "id_proceso": informationDataGeneral.id_proceso
        };
        let resul = await addAreasInteraProces(data);
        handleNewNotification(dispatch,resul.messege, resul.status);
        setTimeout(() => {
            (async ()=>{await onInsert();})();
            limpiartext();
            console.log(resul);
        }, 500);
    }

    const limpiartext = () =>{
        settextAreasInteracProc(0);
    }

    const onSelectItem = (json) => {
        settextAreasInteracProc(json.id);
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
                <>{/* apace cuando no se a seleccionado nada */}
                <div style={{height:'5px'}} />
                {(listAreasInteracProc.length != 0)? 
                    <div className="container_AreaInterProces_selectet_data">
                        <ForminputSelectItem  listaObj={listAreasInteracProc} setlistaObj = {setlistAreasInteracProc} keyname={"selestProcesoDep"} checkbox={textAreasInteracProc} setcheckbox={settextAreasInteracProc} onChangeinput={onSelectItem} />
                    </div>
                :<></>}
                <div style={{height: '20px'}}></div></>
                <ForminputBottonSubmit label = {'Registrar Area que Interviene'} />
                <ForminputBotton label = {'Cancelar'} isInvertColor = {true} />
                {/* <ForminputBotton label = {"Cancelar"} isInvertColor = {true} /> */}
            </form>
        </>
    );
}