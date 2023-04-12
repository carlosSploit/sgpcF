import React, { useEffect, useState } from "react";
import "./styles/index.css"
import { useNotification } from "../../../../../../../../service/Notifications/NotificationProvider";
// import { deleteActivosProceso } from "../../../../../../../../service/repository/RTActivosProceso";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { handleNewNotification } from "../../../../../../../../service/Notifications/useNotificacion";
import { OpccionActions } from "../../../opccionActions";
// import { ItemActivosProces } from "../../../../../../ContextoEmpresa/Procesos/components/editProcesEmpresa/components/ActivosProceso/components/itemActivosProceso";
// import { AddActivosProceso } from "../../../../../../ContextoEmpresa/Procesos/components/editProcesEmpresa/components/ActivosProceso/components/addActivosProceso";
// import { EditarDependenActivosProceso } from "../../../../../../ContextoEmpresa/Procesos/components/editProcesEmpresa/components/ActivosProceso/components/editActivosProceso";
import { deleteResponVersionAnalitiv, getResponVersionAnalitiv } from "../../../../../../../../service/repository/RTResponVersionAnalitiv";
import { ItemResponVersionAnali } from "./components/itemRespVersionAnali";
import { AddResponVersionAnalitic } from "./components/addRespVersionAnali";


export function ResponsablesEmpresa(props){

    const {informationDataGeneral, informatDataEmpre } = props;
    const [listdata,setlistdata] = useState([]);
    // const [listdataHistory,setlistdataHistory] = useState([]);
    const [ismodeladd,setismodeladd] = useState(false);
    const [,setismodelaEdit] = useState(false);
    // const [textsearch,settextsearch] = useState("");
    const [,setSelectObjActivosProces] = useState(0);
    const [indexOpccionActivosProcesoD,setindexOpccionActivosProcesoD] = useState([]);
    const dispatch = useNotification();
    
    useEffect(()=>{
        (async()=>{
            await LoadResponVersion();
            // console.log(informaDataEmpresa)
        })();
    },[]);

    const LoadResponVersion = async () => {
        // console.log(informationDataGeneral.id_empresa)
        let result = await getResponVersionAnalitiv(informationDataGeneral);
        // console.log(result)
        setlistdata([]);
        // setlistdataHistory([]);
        setTimeout(() => {
            setlistdata(result);
            setindexOpccionActivosProcesoD([]);
            // setlistdataHistory(result);
        }, 500);
    }

    const AddItemDeleteRespVersiAnali = (id_empresa) => {
        let data = indexOpccionActivosProcesoD.filter((item)=>{return item == id_empresa})
        if(parseInt(data.length) !== 0){
            setindexOpccionActivosProcesoD(indexOpccionActivosProcesoD.filter((item)=>{return item != id_empresa}))
            return
        }
        let listdata = indexOpccionActivosProcesoD;
        listdata.push(id_empresa);
        setindexOpccionActivosProcesoD(listdata);
    }

    const DeleteRespVersiAnali = async (id_ResponVersion) => {
        await deleteResponVersionAnalitiv({id_areasEmpresa:id_ResponVersion});
    }

    const opccionSistem = [
        {
            label: "Agregar",
            icon: PlusOutlined,
            onChange: () => {
                setismodeladd(true);
            }
        },
        {
            label: "Eliminar",
            icon: DeleteOutlined,
            onChange: async () => {
                if(parseInt(indexOpccionActivosProcesoD.length) === 0){
                    handleNewNotification(dispatch,'Selecciona una o varias empresas para poder eliminar', 404);
                    return
                }
                console.log(indexOpccionActivosProcesoD)
                for (let index = 0; index < indexOpccionActivosProcesoD.length; index++) {
                    const element = indexOpccionActivosProcesoD[index];
                    await DeleteRespVersiAnali(element);
                }
                handleNewNotification(dispatch,'Se realizo la eliminacion en exito', 200);
                await LoadResponVersion()
            }
        }
    ]

    return (
        <>
            <div className="Container_TrabajResponsables_principal_body">
                <OpccionActions opccionSistem={opccionSistem} />
                <div className="Container_TrabajResponsables_principal_body_subContainer">
                    {listdata.map((item)=>{
                        // console.log(item)
                        return (<ItemResponVersionAnali subtitle = {item.nombreRolRespon} onSelecteItem={(index)=>{
                            AddItemDeleteRespVersiAnali(index);
                        }} onChange={(index)=>{
                            const ListObjActivProces = listdata.filter((item)=>{
                                return parseInt(item.id_activproc) === parseInt(index)
                            })
                            // console.log(ListObjActivProces)
                            const ObjActivProces = ListObjActivProces[0];
                            setSelectObjActivosProces(ObjActivProces);
                            setismodelaEdit(true);
                        }} keyitem = {item.id_responAnalis} title = {item.nombre}/>)
                    })}
                </div>
            </div>
            <AddResponVersionAnalitic informatDataEmpre={informatDataEmpre} informationDataGeneral = {informationDataGeneral} onInsert={async ()=>{
                await LoadResponVersion();
            }} propismodalvisible = {ismodeladd} propsetismodalvisible = {setismodeladd} />
        </>
    );
}