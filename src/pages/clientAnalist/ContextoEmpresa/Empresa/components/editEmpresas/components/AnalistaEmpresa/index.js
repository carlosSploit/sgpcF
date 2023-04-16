import React, { useEffect, useState } from "react";
import "./styles/index.css"
import { useNotification } from "../../../../../../../../service/Notifications/NotificationProvider";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { handleNewNotification } from "../../../../../../../../service/Notifications/useNotificacion";
import { OpccionActions } from "../../../../../../../../service/morvius-service/component/complements/componetOpccionActions";
import { ItemResponVersionAnali } from "./components/itemRespVersionAnali";
import { deleteEmpresa, deleteEmpresaEnlace, getEmpresasAnalis } from "../../../../../../../../service/repository/RTEmpresas";
import { AddAnalistEmpresa } from "./components/addRespVersionAnali";
// import { useNotification } from "../../../../../../../../service/Notifications/NotificationProvider";
// import { deleteActivosProceso } from "../../../../../../../../service/repository/RTActivosProceso";
// import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
// import { handleNewNotification } from "../../../../../../../../service/Notifications/useNotificacion";
// import { OpccionActions } from "../../../opccionActions";
// import { ItemActivosProces } from "../../../../../../ContextoEmpresa/Procesos/components/editProcesEmpresa/components/ActivosProceso/components/itemActivosProceso";
// import { AddActivosProceso } from "../../../../../../ContextoEmpresa/Procesos/components/editProcesEmpresa/components/ActivosProceso/components/addActivosProceso";
// import { EditarDependenActivosProceso } from "../../../../../../ContextoEmpresa/Procesos/components/editProcesEmpresa/components/ActivosProceso/components/editActivosProceso";
// import { deleteResponVersionAnalitiv, getResponVersionAnalitiv } from "../../../../../../../../service/repository/RTResponVersionAnalitiv";
// import { ItemResponVersionAnali } from "./components/itemRespVersionAnali";
// import { AddResponVersionAnalitic } from "./components/addRespVersionAnali";


export function AnalistEmpresa(props){

    const {informationDataGeneral } = props;
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
            await LoadAnalistEmpresa();
            // console.log(informaDataEmpresa)
        })();
    },[]);

    const LoadAnalistEmpresa = async () => {
        console.log(informationDataGeneral)
        // console.log(informationDataGeneral.id_empresa)
        let result = await getEmpresasAnalis(informationDataGeneral.id_empresa); 
        let filteresul = result.filter((item) => {
            return item.id_analisempresa != informationDataGeneral.id_analisempresa
        })
        // console.log(result)
        setlistdata([]);
        // setlistdataHistory([]);
        setTimeout(() => {
            setlistdata(filteresul);
            setindexOpccionActivosProcesoD([]);
            // setlistdataHistory(result);
        }, 500);
    }

    const AddItemDeleteAnalistEmpresa = (id_empresa) => {
        let data = indexOpccionActivosProcesoD.filter((item)=>{return item == id_empresa})
        if(parseInt(data.length) !== 0){
            setindexOpccionActivosProcesoD(indexOpccionActivosProcesoD.filter((item)=>{return item != id_empresa}))
            return
        }
        let listdata = indexOpccionActivosProcesoD;
        listdata.push(id_empresa);
        setindexOpccionActivosProcesoD(listdata);
    }

    const DeleteAnalisEmpresa = async (id_clienAnalit,id_empresa) => {
        await deleteEmpresaEnlace({id_clienAnalit: id_clienAnalit, id_empresa: id_empresa});
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
                    await DeleteAnalisEmpresa(element, informationDataGeneral.id_empresa);
                }
                handleNewNotification(dispatch,'Se realizo la eliminacion en exito', 200);
                await LoadAnalistEmpresa()
            }
        }
    ]

    return (
        (informationDataGeneral.permis == 'A')?
        <>
            <div className="Container_TrabajResponsables_principal_body">
                <OpccionActions opccionSistem={opccionSistem} />
                <div className="Container_TrabajResponsables_principal_body_subContainer">
                    {listdata.map((item)=>{
                        // console.log(item)
                        return (<ItemResponVersionAnali subtitle = {item.nombreRolRespon} onSelecteItem={(index)=>{
                            AddItemDeleteAnalistEmpresa(index);
                        }} onChange={(index)=>{
                            const ListObjActivProces = listdata.filter((item)=>{
                                return parseInt(item.id_activproc) === parseInt(index)
                            })
                            // console.log(ListObjActivProces)
                            const ObjActivProces = ListObjActivProces[0];
                            setSelectObjActivosProces(ObjActivProces);
                            setismodelaEdit(true);
                        }} keyitem = {item.id_cliente} title = {item.nombreClientAna}/>)
                    })}
                </div>
            </div>
            <AddAnalistEmpresa informationDataGeneral = {informationDataGeneral} onInsert={async ()=>{
                await LoadAnalistEmpresa();
            }} propismodalvisible = {ismodeladd} propsetismodalvisible = {setismodeladd} />
        </>:<>
        </>
    );
}