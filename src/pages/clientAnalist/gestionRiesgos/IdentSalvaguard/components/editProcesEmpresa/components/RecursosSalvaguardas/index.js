import React, { useEffect, useState } from "react";
import "./styles/index.css"
import { useNotification } from "../../../../../../../../service/Notifications/NotificationProvider";
// import { deleteObjetivEmpresa, getObjetivEmpresa } from "../../../../../../../../service/repository/RTObjetivEmpresas";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { handleNewNotification } from "../../../../../../../../service/Notifications/useNotificacion";
import { ItemObjetivEmpresa, ItemRecurSalvaguard } from "./components/itemRecursosSalvaguard";
import { AddRecursSalvaguard } from "./components/addRecursosSalvaguard";
import { deleteRecursSalvAfectAct, getRecursSalvAfectAct } from "../../../../../../../../service/repository/RTRecursSalvAfectAct";
import { OpccionActionsRecurSalvagur } from "./components/opccionActions";
import { EditarRecursoSalvag } from "./components/editRecursosSalvaguard";
export function RecurSalvaguard(props){

    const {informationDataGeneral} = props;
    const [listdata,setlistdata] = useState([]);
    const [ismodeladd,setismodeladd] = useState(false);
    const [ismodelaEdit,setismodelaEdit] = useState(false);
    const [indexOpccionObjetivEmpresa,setindexOpccionObjetivEmpresa] = useState(0);
    const [indexOpccionObjetivEmpresaD,setindexOpccionObjetivEmpresaD] = useState([]);
    const dispatch = useNotification();
    
    useEffect(()=>{
        (async()=>{
            await LoadDataResurSalvaguard();
        })();
    },[]);

    const LoadDataResurSalvaguard = async () => {
        let result = await getRecursSalvAfectAct(informationDataGeneral.id_salvAfectAct);
        console.log(result)
        setlistdata([]);
        setTimeout(() => {
            setlistdata(result);
            setindexOpccionObjetivEmpresaD([]);
        }, 500);
    }

    const AddItemDeleteRecursoSalvag = (id_objempresa) => {
        let data = indexOpccionObjetivEmpresaD.filter((item)=>{return item == id_objempresa})
        if(data.length != 0){
            setindexOpccionObjetivEmpresaD(indexOpccionObjetivEmpresaD.filter((item)=>{return item != id_objempresa}))
            return
        }
        let listdata = indexOpccionObjetivEmpresaD;
        listdata.push(id_objempresa);
        setindexOpccionObjetivEmpresaD(listdata);
    }

    const DeleteRecursSalvAfectAct = async (id_ObjetivEmpresa) => {
        console.log(id_ObjetivEmpresa)
        await deleteRecursSalvAfectAct({id_areasEmpresa: id_ObjetivEmpresa});
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
                if(parseInt(indexOpccionObjetivEmpresaD.length) === 0){
                    handleNewNotification(dispatch,'Selecciona una o varias empresas para poder eliminar', 404);
                    return
                }
                console.log(indexOpccionObjetivEmpresaD)
                for (let index = 0; index < indexOpccionObjetivEmpresaD.length; index++) {
                    const element = indexOpccionObjetivEmpresaD[index];
                    await DeleteRecursSalvAfectAct(element);
                }
                handleNewNotification(dispatch,'Se realizo la eliminacion en exito', 200);
                await LoadDataResurSalvaguard()
            }
        }
    ]

    return (
        <>
            <div className="Container_RecursSalvaguard_principal_body">
                <OpccionActionsRecurSalvagur opccionSistem={opccionSistem} />
                <div className="Container_RecursSalvaguard_principal_body_subContainer">
                    {listdata.map((item)=>{
                        return (<ItemRecurSalvaguard onSelecteItem={(index)=>{
                            AddItemDeleteRecursoSalvag(index);
                        }} onChange={(index)=>{
                            setindexOpccionObjetivEmpresa(index);
                            setismodelaEdit(true);
                        }} keyitem = {item.id_recurSalvAfectAct } subtitle={`S/. ${item.presioRecurSalvAfect}`} title = {item.nombreRecurSalvAfect } />)
                    })}
                </div>
            </div>
            <AddRecursSalvaguard informationDataGeneral = {informationDataGeneral} onInsert={async ()=>{
                await LoadDataResurSalvaguard();
            }} propismodalvisible = {ismodeladd} propsetismodalvisible = {setismodeladd} />
            {(ismodelaEdit)?<EditarRecursoSalvag informationDataGeneralEmpre={informationDataGeneral} onAction = {LoadDataResurSalvaguard} iskeyDatos = {indexOpccionObjetivEmpresa} ismodalvisible = {ismodelaEdit} setismodalvisible = {setismodelaEdit} />:<></>}
        </>
    );
}