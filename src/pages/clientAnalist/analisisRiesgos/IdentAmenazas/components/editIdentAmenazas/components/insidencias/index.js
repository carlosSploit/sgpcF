import React, { useEffect, useState } from "react";
import "./styles/index.css"
// import { useNotification } from "../../../../../../../../service/Notifications/NotificationProvider";
import { ItemActivosProces } from "./components/itemActivosProceso";
import { getAfectaAtivInsidencia } from "../../../../../../../../service/repository/RTAfectaActiv";



export function InsidensAmenaza(props){

    const {informationDataGeneral = {
        "id_afectaActiv": 62,
        "id_activProsVerAnali": 35,
        "valoriActivCuanti": 100,
        "valoriActivCualiti": 9,
        "id_valorAfectAmen": null,
        "id_Frecuencia": null,
        "valorFrecuenCuali": null,
        "valorFrecuenCuanti": null,
        "nameFrecuencia": null,
        "valDegradCualit": null,
        "id_DegradCualit": null,
        "valImpacCualit": null,
        "valImpacCuanti": null,
        "valRiesgoCualit": null,
        "valRiesgoCuanti": null,
        "id_amenaza": 12,
        "esenario": "",
        "abreb": "I",
        "nombreAmena": "Fallo de servicios de comunicaciones",
        "id_tipoActiv": 2,
        "nombreTipoActiv": "De origen industrial"
    }, informationActivAnali} = props;
    const [listdata,setlistdata] = useState(null);
    // const [listdataHistory,setlistdataHistory] = useState([]);
    // const [ismodeladd,setismodeladd] = useState(false);
    // const [ismodelaEdit,setismodelaEdit] = useState(false);
    // // const [textsearch,settextsearch] = useState("");
    // const [indexSelectObjActivosProces,setSelectObjActivosProces] = useState(0);
    // const [indexOpccionActivosProcesoD,setindexOpccionActivosProcesoD] = useState([]);
    // const dispatch = useNotification();
    
    useEffect(()=>{
        (async()=>{
            await LoadDataActivosProceso();
        })();
    },[]);

    const LoadDataActivosProceso = async () => {
        let result = await getAfectaAtivInsidencia({id_activProsVerAnali: informationActivAnali, id_amenaza: informationDataGeneral.id_amenaza});
        setlistdata(null);
        setTimeout(() => {
            setlistdata(result);
        }, 500);
    }

    // const AddItemDeleteActivProceso = (id_empresa) => {
    //     let data = indexOpccionActivosProcesoD.filter((item)=>{return item == id_empresa})
    //     if(data.length != 0){
    //         setindexOpccionActivosProcesoD(indexOpccionActivosProcesoD.filter((item)=>{return item != id_empresa}))
    //         return
    //     }
    //     let listdata = indexOpccionActivosProcesoD;
    //     listdata.push(id_empresa);
    //     setindexOpccionActivosProcesoD(listdata);
    // }

    // const DeleteActivProces = async (id_TrabajEmpresa) => {
    //     await deleteActivosProceso({id_areasEmpresa:id_TrabajEmpresa});
    // }

    // const onUpdate = async () => {
    //     let result = await getadmins(textsearch);
    //     setlistdata(result);
    // }

    // const onInsert = async () =>{
    //     let result = await getadmins(textsearch);
    //     setlistdata(result);
    // }

    // ------------------------------------------------------------ Actions del Buscador
    // const onChangeseach = async (search) => {
    //     settextsearch(search);
    //     let result = await getadmins(search);
    //     setlistdata(result);
    // }

    // const onChangekey = async (seach) =>{
    //     if(seach == ""){
    //         settextsearch("");
    //         let result = await getadmins();
    //         setlistdata(result);
    //     }
    // }

    // const opccionSistem = [
    //     {
    //         label: "Agregar",
    //         icon: PlusOutlined,
    //         onChange: () => {
    //             setismodeladd(true);
    //         }
    //     },
    //     {
    //         label: "Eliminar",
    //         icon: DeleteOutlined,
    //         onChange: async () => {
    //             if(indexOpccionActivosProcesoD.length == 0){
    //                 handleNewNotification(dispatch,'Selecciona una o varias empresas para poder eliminar', 404);
    //                 return
    //             }
    //             console.log(indexOpccionActivosProcesoD)
    //             for (let index = 0; index < indexOpccionActivosProcesoD.length; index++) {
    //                 const element = indexOpccionActivosProcesoD[index];
    //                 await DeleteActivProces(element);
    //             }
    //             handleNewNotification(dispatch,'Se realizo la eliminacion en exito', 200);
    //             await LoadDataActivosProceso()
    //         }
    //     }
    // ]

    return (
        <>
            <div className="Container_TrabajResponsables_principal_body">
                {(listdata == null)?<></> :(listdata.length != 0)?<div className="Container_TrabajResponsables_principal_body_subContainer">
                    {listdata.map((item)=>{
                        // console.log(item)
                        return (<ItemActivosProces onSelecteItem={(index)=>{
                        }} onChange={(index)=>{
                        }} keyitem = {item.id_insidencia} title = {item.nombroInsid} descrip = {item.descrpInsid} />)
                    })}
                </div>:<div className="Container_TrabajResponsables_principal_body_error">
                    No presenta esenarios o insidencias detectadas o insertadas.
                </div>}
                {/* <OpccionActions opccionSistem={opccionSistem} /> */}
                
            </div>
            {/* <AddActivosProceso informaDataEmpresa = {informaDataEmpresa} informationDataGeneral = {informationDataGeneral} onInsert={async ()=>{
                await LoadDataActivosProceso();
            }} propismodalvisible = {ismodeladd} propsetismodalvisible = {setismodeladd} />
            {(ismodelaEdit)?<EditarDependenActivosProceso informationProceses={informationDataGeneral} iskeyDatos = {indexSelectObjActivosProces} ismodalvisible = {ismodelaEdit} setismodalvisible = {setismodelaEdit} />:<></>} */}
            {/* 
             */}
        </>
    );
}