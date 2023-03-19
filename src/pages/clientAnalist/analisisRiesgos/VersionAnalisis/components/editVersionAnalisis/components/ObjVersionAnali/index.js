import React, { useEffect, useState } from "react";
import "./styles/index.css"
import { useNotification } from "../../../../../../../../service/Notifications/NotificationProvider";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { handleNewNotification } from "../../../../../../../../service/Notifications/useNotificacion";
import { OpccionActions } from "../../../opccionActions";
import { deleteObjetivVersionAnalitic, getObjetivVersionAnalitic } from "../../../../../../../../service/repository/RTObjetivVersionAnalitic";
import { ItemObjetivVersionAnalitic } from "./components/itemObjVersionAnali";
import { AddObjetivVersionAnalitic } from "./components/addObjVersionAnali";
import { EditarObjetivVersionAnalitic } from "./components/editObjVersionAnali";

export function ObjetivVersionAnalitic(props){

    const {informationDataGeneral} = props;
    const [listdata,setlistdata] = useState([]);
    // const [listdataHistory,setlistdataHistory] = useState([]);
    const [ismodeladd,setismodeladd] = useState(false);
    const [ismodelaEdit,setismodelaEdit] = useState(false);
    // const [textsearch,settextsearch] = useState("");
    const [indexOpccionObjetivVersionAnalitic,setindexOpccionObjetivVersionAnalitic] = useState(0);
    const [indexOpccionObjetivVersionAnaliticD,setindexOpccionObjetivVersionAnaliticD] = useState([]);
    const dispatch = useNotification();
    
    useEffect(()=>{
        (async()=>{
            await LoadDataObjetivVersionAnalitic();
        })();
    },[]);

    const LoadDataObjetivVersionAnalitic = async () => {
        let result = await getObjetivVersionAnalitic(informationDataGeneral);
        setlistdata([]);
        // setlistdataHistory([]);
        setTimeout(() => {
            setlistdata(result);
            setindexOpccionObjetivVersionAnaliticD([]);
            // setlistdataHistory(result);
        }, 500);
    }

    const AddItemDeleteObjetivVersionAnalitic = (id_objempresa) => {
        let data = indexOpccionObjetivVersionAnaliticD.filter((item)=>{return item == id_objempresa})
        if(data.length != 0){
            setindexOpccionObjetivVersionAnaliticD(indexOpccionObjetivVersionAnaliticD.filter((item)=>{return item != id_objempresa}))
            return
        }
        let listdata = indexOpccionObjetivVersionAnaliticD;
        listdata.push(id_objempresa);
        setindexOpccionObjetivVersionAnaliticD(listdata);
    }

    const DeleteObjetivVersionAnalitic = async (id_ObjetivVersionAnalitic) => {
        console.log(id_ObjetivVersionAnalitic)
        await deleteObjetivVersionAnalitic({id_ObjetivVersionAnalitic: id_ObjetivVersionAnalitic});
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
                if(indexOpccionObjetivVersionAnaliticD.length == 0){
                    handleNewNotification(dispatch,'Selecciona una o varias empresas para poder eliminar', 404);
                    return
                }
                console.log(indexOpccionObjetivVersionAnaliticD)
                for (let index = 0; index < indexOpccionObjetivVersionAnaliticD.length; index++) {
                    const element = indexOpccionObjetivVersionAnaliticD[index];
                    await DeleteObjetivVersionAnalitic(element);
                }
                handleNewNotification(dispatch,'Se realizo la eliminacion en exito', 200);
                await LoadDataObjetivVersionAnalitic()
            }
        }
    ]

    return (
        <>
            <div className="Container_ObjetivVersionAnalitic_principal_body">
                <OpccionActions opccionSistem={opccionSistem} />
                <div className="Container_ObjetivVersionAnalitic_principal_body_subContainer">
                    {listdata.map((item)=>{
                        return (<ItemObjetivVersionAnalitic onSelecteItem={(index)=>{
                            AddItemDeleteObjetivVersionAnalitic(index);
                        }} onChange={(index)=>{
                            setindexOpccionObjetivVersionAnalitic(index);
                            setismodelaEdit(true);
                        }} keyitem = {item.id_objVersAnali} title = {item.nombreObj} />)
                    })}
                </div>
            </div>
            <AddObjetivVersionAnalitic informationDataGeneral = {informationDataGeneral} onInsert={async ()=>{
                await LoadDataObjetivVersionAnalitic();
            }} propismodalvisible = {ismodeladd} propsetismodalvisible = {setismodeladd} />
            {(ismodelaEdit)?<EditarObjetivVersionAnalitic informationDataGeneralEmpre={informationDataGeneral} onAction = {LoadDataObjetivVersionAnalitic} iskeyDatos = {indexOpccionObjetivVersionAnalitic} ismodalvisible = {ismodelaEdit} setismodalvisible = {setismodelaEdit} />:<></>}
        </>
    );
}