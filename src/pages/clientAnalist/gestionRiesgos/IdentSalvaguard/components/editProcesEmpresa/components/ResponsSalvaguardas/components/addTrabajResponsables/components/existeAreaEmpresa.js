import React, { useEffect, useState } from "react";
import './index.css';
import { useNotification } from "../../../../../../../../../../../service/Notifications/NotificationProvider";
// import { ConsuldataLogm, getKeysesion } from "../../../../../../../../../../../service/repository/mithelworks";
// import { addEmpresa } from "../../../../../../../../../../../service/repository/RTEmpresas";
import { handleNewNotification } from "../../../../../../../../../../../service/Notifications/useNotificacion";
import { ForminputBotton, ForminputBottonSubmit, ForminputSelectItem } from "../../../../../../../../../../../service/morvius-service/form";
// import { addAreasEmpresa, getAresEmpresa } from "../../../../../../../../../../../service/repository/RTAreasEmpresas";
// import { addAreasInteraProces } from "../../../../../../../../../../../service/repository/RTAreasInteraProces";
import { getTrabajEmpresa } from "../../../../../../../../../../../service/repository/RTTrabajEmpresas";
import { addTrabajRespon } from "../../../../../../../../../../../service/repository/RTTrabajRespon";
import { addResponSalvAfectAct } from "../../../../../../../../../../../service/repository/RTresponSalvAfectAct";

export function ExisteTrabajResponsabless(props){

    const [propinformationDataGeneral, ] = useState({});
    const { onInsert=()=>{} ,informationDataGeneral = propinformationDataGeneral } = props;

    const [listTrabajResponsabless, setlistTrabajResponsabless] = useState([]);
    const [textTrabajResponsabless, settextTrabajResponsabless] = useState(0);
    const dispatch = useNotification();

    useEffect(()=>{
        (async()=>{
            await onLoadAreas();
        })();
    },[]);

    const onLoadAreas = async ()=>{
        let result = await getTrabajEmpresa(informationDataGeneral.id_empresa);
        setlistTrabajResponsabless([]);
        // setlistdataHistory([]);
        setTimeout(() => {
            let data = result.map((item)=>{
                return {
                    id: item.Id_trabajador,
                    name: item.nombre_apellido
                }
            })
            setlistTrabajResponsabless(data)
            // setlistdataHistory(result);
        }, 500);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = {
            "id_trabajador" : textTrabajResponsabless,
            "id_salvAfectAct": informationDataGeneral.id_salvAfectAct
        };
        let resul = await addResponSalvAfectAct(data);
        handleNewNotification(dispatch,resul.messege, resul.status);
        setTimeout(() => {
            (async ()=>{await onInsert();})();
            limpiartext();
            console.log(resul);
        }, 500);
    }

    const limpiartext = () =>{
        settextTrabajResponsabless(0);
    }

    const onSelectItem = (json) => {
        settextTrabajResponsabless(json.id);
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
                {(listTrabajResponsabless.length != 0)? 
                    <div className="container_AreaInterProces_selectet_data">
                        <ForminputSelectItem  
                            listaObj={listTrabajResponsabless} 
                            setlistaObj = {setlistTrabajResponsabless} 
                            keyname={"selestProcesoDep"} 
                            checkbox={textTrabajResponsabless} 
                            setcheckbox={settextTrabajResponsabless} 
                            onChangeinput={onSelectItem} 
                        />
                    </div>
                :<></>}
                <div style={{height: '20px'}}></div></>
                <ForminputBottonSubmit label = {'Registrar el Responsable'} />
                <ForminputBotton label = {'Cancelar'} isInvertColor = {true} />
                {/* <ForminputBotton label = {"Cancelar"} isInvertColor = {true} /> */}
            </form>
        </>
    );
}