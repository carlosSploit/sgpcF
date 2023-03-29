import React, { useEffect, useState } from "react";
import "./styles/index.css"
import { useNotification } from "../../../../../../../../service/Notifications/NotificationProvider";
// import { deleteTrabajRespon } from "../../../../../../../../service/repository/RTTrabajRespon";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { handleNewNotification } from "../../../../../../../../service/Notifications/useNotificacion";
import { AddTrabajResponsabless } from "./components/addTrabajResponsables";
import { ItemTrabajResponsab } from "./components/itemTrabajResponsables";
import { deleteResponSalvAfectAct, getResponSalvAfectAct } from "../../../../../../../../service/repository/RTresponSalvAfectAct";
import { OpccionActionsTrabajRes } from "./components/opccionActions";

export function TrabajResponsables(props){

    const {informationDataGeneral} = props;
    const [listdata,setlistdata] = useState([]);
    // const [listdataHistory,setlistdataHistory] = useState([]);
    const [ismodeladd,setismodeladd] = useState(false);
    const [,setismodelaEdit] = useState(false);
    // const [textsearch,settextsearch] = useState("");
    // const [indexOpccionAreasInteraProces,setindexOpccionAreasInteraProcesa] = useState(0);
    const [indexOpccionTrabajResponsablesD,setindexOpccionTrabajResponsablesD] = useState([]);
    const dispatch = useNotification();
    
    useEffect(()=>{
        (async()=>{
            await LoadDataTrabajResponsables();
        })();
    },[]);

    const LoadDataTrabajResponsables = async () => {
        let result = await getResponSalvAfectAct(informationDataGeneral.id_salvAfectAct);
        console.log(result)
        setlistdata([]);
        // setlistdataHistory([]);
        setTimeout(() => {
            setlistdata(result);
            setindexOpccionTrabajResponsablesD([]);
        }, 500);
    }

    const AddItemDeleteResponSalvaguard = (id_ResponSalvaguard) => {
        let data = indexOpccionTrabajResponsablesD.filter((item)=>{return item == id_ResponSalvaguard})
        if(parseInt(data.length) !== 0){
            setindexOpccionTrabajResponsablesD(indexOpccionTrabajResponsablesD.filter((item)=>{return item != id_ResponSalvaguard}))
            return
        }
        let listdata = indexOpccionTrabajResponsablesD;
        listdata.push(id_ResponSalvaguard);
        setindexOpccionTrabajResponsablesD(listdata);
    }

    const DeleteResponSalvAfectAct = async (id_TrabajEmpresa) => {
        await deleteResponSalvAfectAct({id_areasEmpresa:id_TrabajEmpresa});
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
                if(parseInt(indexOpccionTrabajResponsablesD.length) === 0){
                    handleNewNotification(dispatch,'Selecciona una o varias empresas para poder eliminar', 404);
                    return
                }
                console.log(indexOpccionTrabajResponsablesD)
                for (let index = 0; index < indexOpccionTrabajResponsablesD.length; index++) {
                    const element = indexOpccionTrabajResponsablesD[index];
                    await DeleteResponSalvAfectAct(element);
                }
                handleNewNotification(dispatch,'Se realizo la eliminacion en exito', 200);
                await LoadDataTrabajResponsables()
            }
        }
    ]

    return (
        <>
            <div className="Container_TrabajResponsables_principal_body">
                <OpccionActionsTrabajRes opccionSistem={opccionSistem} />
                <div className="Container_TrabajResponsables_principal_body_subContainer">
                    {listdata.map((item)=>{
                        return (<ItemTrabajResponsab onSelecteItem={(index)=>{
                            AddItemDeleteResponSalvaguard(index);
                        }} onChange={(index)=>{
                            setismodelaEdit(true);
                        }} keyitem = {item.id_responSalvAfectAct} title = {item.nombre_apellido} descrip = {item.cargo} />)
                    })}
                </div>
            </div>
            {(ismodeladd)?<AddTrabajResponsabless informationDataGeneral = {informationDataGeneral} onInsert={async ()=>{
                await LoadDataTrabajResponsables();
            }} propismodalvisible = {ismodeladd} propsetismodalvisible = {setismodeladd} />:<></>}
            {/* {(ismodelaEdit)?<EditarAreasEmpresa informationDataGeneralEmpre={informationDataGeneral} onAction = {LoadDataAreasInteraProces} iskeyDatos = {indexOpccionAreasInteraProces} ismodalvisible = {ismodelaEdit} setismodalvisible = {setismodelaEdit} />:<></>} */}
            {/* 
             */}
        </>
    );
}