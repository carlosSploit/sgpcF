import React, { useEffect, useState } from "react";
import './index.css';
import { useNotification } from "../../../../../../../../../../../service/Notifications/NotificationProvider";
// import { ConsuldataLogm, getKeysesion } from "../../../../../../../../../../../service/repository/mithelworks";
// import { addEmpresa } from "../../../../../../../../../../../service/repository/RTEmpresas";
import { handleNewNotification } from "../../../../../../../../../../../service/Notifications/useNotificacion";
import { ForminputBotton, ForminputBottonSubmit, ForminputComboBox, ForminputSelectItem } from "../../../../../../../../../../../service/morvius-service/form";
// import { addAreasEmpresa, getAresEmpresa } from "../../../../../../../../../../../service/repository/RTAreasEmpresas";
// import { addAreasInteraProces } from "../../../../../../../../../../../service/repository/RTAreasInteraProces";
// import { getTrabajEmpresa } from "../../../../../../../../../../../service/repository/RTTrabajEmpresas";
// import { addTrabajRespon } from "../../../../../../../../../../../service/repository/RTTrabajRespon";
// import { getActivosEmpresa } from "../../../../../../../../../../../service/repository/RTActivos";
// import { addActivosProceso } from "../../../../../../../../../../../service/repository/RTActivosProceso";
// import { getclientAnalis } from "../../../../../../../../../../../service/repository/RTclientAnalist";
import { getRolrespono } from "../../../../../../../../../../../service/repository/RTRolrespono";
import { addResponanalis } from "../../../../../../../../../../../service/repository/RTResponVersionAnalitiv";
import { getEmpresasAnalis } from "../../../../../../../../../../../service/repository/RTEmpresas";

export function ExisteActivosProceso(props){

    const [propinformationDataGeneral,] = useState({});
    const { onInsert=()=>{} ,informationDataGeneral = propinformationDataGeneral,informatDataEmpre } = props;

    const [listActivosProceso, setlistActivosProceso] = useState([]);
    const [textActivosProceso, settextActivosProceso] = useState(0);
    const [listRolesRespon, setlistRolesRespon] = useState([]);
    const [textRolesRespon, settextRolesRespon] = useState(0);
    const dispatch = useNotification();

    useEffect(()=>{
        (async()=>{
            await onLoadClientAnalitic();
            await onLoadRolesResponsable();
        })();
    },[]);

    const onLoadClientAnalitic = async ()=>{
        let result = await getEmpresasAnalis(informatDataEmpre);
        setlistActivosProceso([]);
        // setlistdataHistory([]);
        setTimeout(() => {
            let data = result.map((item)=>{
                return {
                    id: item.id_cliente,
                    name: item.nombreClientAna,
                    photo: item.photo
                }
            })
            setlistActivosProceso(data)
            // setlistdataHistory(result);
        }, 500);
    }

    const onLoadRolesResponsable = async ()=>{
        let result = await getRolrespono();
        setlistRolesRespon([]);
        // setlistdataHistory([]);
        setTimeout(() => {
            setlistRolesRespon(result)
            // setlistdataHistory(result);
        }, 500);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = {
            "id_versionAnali" : informationDataGeneral,
            "id_cliente": textActivosProceso ,
            "id_rolRespon": textRolesRespon
        };
        let resul = await addResponanalis(data);
        handleNewNotification(dispatch,resul.messege, resul.status);
        setTimeout(() => {
            (async ()=>{await onInsert();})();
            limpiartext();
            console.log(resul);
        }, 500);
    }

    const limpiartext = () =>{
        settextActivosProceso(0);
        settextRolesRespon(0);
    }

    const onSelectItem = (json) => {
        settextActivosProceso(json.id);
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
                {(listActivosProceso.length != 0)? 
                    <div className="container_AreaInterProces_selectet_data">
                        <ForminputSelectItem nameTitle={'Selecciona el Responsables Analista'} isVisibleFoto={true} listaObj={listActivosProceso} setlistaObj = {setlistActivosProceso} keyname={"selestProcesoDep"} checkbox={textActivosProceso} setcheckbox={settextActivosProceso} onChangeinput={onSelectItem} />
                    </div>
                :<></>}
                <div style={{height:'15px'}} />
                {(listRolesRespon.length != 0)? 
                    <ForminputComboBox checkbox = {textRolesRespon} setcheckbox = {settextRolesRespon} isInvert={true} width={100} height={30} keyvalue={'id_rolRespon'} keylabel={'nombreRolRespon'} datacombo={listRolesRespon} isdefault={true} onChangeinput={(jsonval)=>{
                        settextRolesRespon(jsonval.value);
                    }} />
                :<></>}
                <div style={{height: '20px'}}></div></>
                <ForminputBottonSubmit label = {'Enlazar Responsable'} />
                <ForminputBotton label = {'Cancelar'} isInvertColor = {true} />
                {/* <ForminputBotton label = {"Cancelar"} isInvertColor = {true} /> */}
            </form>
        </>
    );
}