import React, { useEffect, useState } from "react";
import './index.css';
// import { useNotification } from "../../../../../../../../../../../service/Notifications/NotificationProvider";
// import { ConsuldataLogm, getKeysesion } from "../../../../../../../../../../../service/repository/mithelworks";
// import { addEmpresa } from "../../../../../../../../../../../service/repository/RTEmpresas";
// import { handleNewNotification } from "../../../../../../../../../../../service/Notifications/useNotificacion";
// import { ForminputBotton, ForminputBottonSubmit, ForminputSelectItem } from "../../../../../../../../../../../service/morvius-service/form";
// import { addAreasEmpresa, getAresEmpresa } from "../../../../../../../../../../../service/repository/RTAreasEmpresas";
// import { addAreasInteraProces } from "../../../../../../../../../../../service/repository/RTAreasInteraProces";
// import { getTrabajEmpresa } from "../../../../../../../../../../../service/repository/RTTrabajEmpresas";
// import { addTrabajRespon } from "../../../../../../../../../../../service/repository/RTTrabajRespon";
// import { getActivosEmpresa } from "../../../../../../../../../../../service/repository/RTActivos";
// import { addActivosProceso } from "../../../../../../../../../../../service/repository/RTActivosProceso";
import { addDependenActivosProces, getDependenActivosProces } from "../../../../../../../../../../../../../service/repository/RTDependtActivos";
import { useNotification } from "../../../../../../../../../../../../../service/Notifications/NotificationProvider";
import { addActivosProceso } from "../../../../../../../../../../../../../service/repository/RTActivosProceso";
import { handleNewNotification } from "../../../../../../../../../../../../../service/Notifications/useNotificacion";
import { ForminputBotton, ForminputBottonSubmit, ForminputSelectItem } from "../../../../../../../../../../../../../service/morvius-service/form";

export function ExisteDependenActivosProceso(props){

    const [propinformationDataGeneral, propsetinformationDataGeneral] = useState({
        "id_activproc": 6,
        "id_activo": 2,
        "nombre_Activo": "PC",
        "descripc": "Computador que usan los trabajadores para procesos externos o para tener acceso al Sistema E-learning.",
        "id_tipoActiv": 261,
        "dependAbreb": "HW.pc"
      });
    const { onInsert=()=>{} ,informationDataGeneral = propinformationDataGeneral, informationProceses } = props;

    const [listActivosProceso, setlistActivosProceso] = useState([]);
    const [textActivosProceso, settextActivosProceso] = useState(0);
    const dispatch = useNotification();

    useEffect(()=>{
        (async()=>{
            await onLoadDependenActivProces();
        })();
    },[]);

    const onLoadDependenActivProces = async ()=>{
        let result = await getDependenActivosProces({idProces:informationProceses.id_proceso, abreb:informationDataGeneral.dependAbreb});
        console.log(informationProceses)
        // console.log(`${informationDataGeneral.dependAbreb}`)
        setlistActivosProceso([]);
        setTimeout(() => {
            let data = result.map((item)=>{
                return {
                    id: item.id_activproc,
                    name: item.nombre_Activo,
                    descr: item.dependAbreb
                }
            })
            setlistActivosProceso(data)
            // setlistdataHistory(result);
        }, 500);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(informationDataGeneral)
        let data = {
            "id_depActiv" : textActivosProceso,
            "id_activProc": informationDataGeneral.id_activproc
        };
        // console.log(data)
        let resul = await addDependenActivosProces(data);
        handleNewNotification(dispatch,resul.messege, resul.status);
        setTimeout(() => {
            (async ()=>{await onInsert();})();
            limpiartext();
            console.log(resul);
        }, 500);
    }

    const limpiartext = () =>{
        settextActivosProceso(0);
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
                        <ForminputSelectItem isVisibleDescri = { true } listaObj={listActivosProceso} setlistaObj = {setlistActivosProceso} keyname={"selestProcesoDep"} checkbox={textActivosProceso} setcheckbox={settextActivosProceso} onChangeinput={onSelectItem} />
                    </div>
                :<></>}
                <div style={{height: '20px'}}></div></>
                <ForminputBottonSubmit label = {'Registrar el Activo'} />
                <ForminputBotton label = {'Cancelar'} isInvertColor = {true} />
                {/* <ForminputBotton label = {"Cancelar"} isInvertColor = {true} /> */}
            </form>
        </>
    );
}