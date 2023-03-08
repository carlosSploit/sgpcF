import { DeleteOutlined, EditOutlined, ReadOutlined } from "@ant-design/icons";
import React, { useRef } from "react";
import { ComponentcolapsetItem, ComponentItemSecionActions } from "../../../../../../../../../../../../service/morvius-service/component/components";
import { handleNewNotification, useNotification } from "../../../../../../../../../../../../service/Notifications/useNotificacion";
import { deleteContentActiv } from "../../../../../../../../../../../../service/repository/Contenactiv";
// import { deleteContentSession } from "../../../../../../../../../../../../service/repository/Contensesion";
// import { EditContSession } from "../EditContSession/EditContSession";
import { EditContTarea } from "../EditContTarea/EditContTarea";
import { Conviewtarea } from "./components/conviewtarea/conviewtarea";

export function ItemContenttarea(props){
    const {label = "desconosido", dataac={}, onUpdate={}, onDelect={} } = props;
    const refeditcont = useRef();
    const refviewtarea = useRef();
    const dispatch = useNotification();

    // const Iconinteractor = () =>{
    //     switch (dataac.id_tipo_conte) {
    //         case 1: return VideoCameraOutlined;
    //             case 2: return FileOutlined;
    //                 case 3: return AudioOutlined;
    //         default:
    //             break;
    //     }
    // }

    const onEliminarActiv = async () => {
        let result = await deleteContentActiv(dataac.id_conte_tarea);
        handleNewNotification(dispatch,result.messege, result.status);
        console.log(result);
    }

    return (
        <>
            <div>
                <ComponentcolapsetItem Iconitem={ReadOutlined} onChange={()=>{
                    // window.open(dataac.urlconte, '_blank');
                    refviewtarea.current.click();
                }} label={label} >
                    <ComponentItemSecionActions onClickActions={()=>{refeditcont.current.click();}} colorIon={"#9686C3"} Icont={EditOutlined} />
                    <ComponentItemSecionActions onClickActions={async ()=>{
                        await onEliminarActiv();
                        await onDelect();
                    }} colorIon={"#9686C3"} Icont={DeleteOutlined} />
                </ComponentcolapsetItem>
            </div>
            <EditContTarea refaction={refeditcont} onAction={onUpdate} dataac={dataac} />
            <Conviewtarea refaction={refviewtarea} onAction={onUpdate} dataac={dataac} />
        </>
    );
}